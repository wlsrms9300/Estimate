import { supabase } from '../config/supabase'
import { transformData, jwtUtils } from '../utils'
import { TokenPayload } from '../interfaces/auth.interface'

export const memberService = {
    async getData(tableName: string, filters?: { userType?: string; grade?: string }) {
        let query = supabase.from(tableName).select('*')
        if (filters) {
            if (filters.userType) {
                query = query.eq('user_type', filters.userType)
            }
            if (filters.grade) {
                query = query.eq('grade', filters.grade)
            }
        }

        const { data, error } = await query
        if (error) throw error
        return transformData.toCamelCase(data)
    },

    //회원가입
    async createMemberData(tableName: string, memberData: any) {
        const { data: result, error } = await supabase.from(tableName).insert(transformData.toSnakeCase(memberData)).select()
        if (error) throw error
        return transformData.toCamelCase(result)
    },

    async updateData(tableName: string, id: number, data: any) {
        const { data: result, error } = await supabase.from(tableName).update(data).eq('id', id).select()
        if (error) throw error
        return result
    },

    async deleteData(tableName: string, id: number) {
        const { error } = await supabase.from(tableName).delete().eq('id', id)
        if (error) throw error
        return true
    },

    async login(memberData: any) {
        const { data, error } = await supabase
            .from('EM_MEMBER')
            .select('*')
            .eq('user_id', memberData.userId)
            .eq('password', memberData.password) // 실제 구현시에는 반드시 비밀번호 해시화 비교 로직 필요
            .single()

        if (error) {
            throw new Error('로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.')
        }
        if (!data) {
            throw new Error('사용자를 찾을 수 없습니다.')
        }

        // 토큰 페이로드 생성
        const tokenPayload: TokenPayload = {
            userId: data.user_id,
            password: data.password,
        }

        // 토큰 생성
        const { accessToken, refreshToken } = jwtUtils.generateTokens(tokenPayload)

        await this.updateUserLoginInfo(data.user_id, refreshToken)
        return {
            user: transformData.toCamelCase(data),
            accessToken,
            refreshToken,
        }
    },

    async updateUserLoginInfo(userId: string, refreshToken: string) {
        try {
            // 현재 시간 설정
            const currentTimestamp = new Date().toISOString()
            // 리프레시 토큰 만료 시간 설정 (현재 시간 + 1일)
            const expiresTimestamp = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

            // em_member 테이블 last_login_at 업데이트
            const { data: result, error: memberUpdateError } = await supabase
                .from('EM_MEMBER')
                .update({ last_login_at: currentTimestamp })
                .eq('user_id', userId)
            if (memberUpdateError) {
                throw new Error(`Failed to update last_login_at: ${memberUpdateError.message}`)
            }

            // em_member_refresh_token 테이블 upsert 수행
            const { error: tokenUpsertError } = await supabase.from('EM_MEMBER_REFRESH_TOKEN').upsert(
                {
                    user_id: userId,
                    refresh_token: refreshToken,
                    created_at: currentTimestamp,
                    expires_at: expiresTimestamp,
                },
                {
                    onConflict: 'user_id',
                    ignoreDuplicates: false,
                },
            )

            if (tokenUpsertError) {
                throw new Error(`Failed to upsert refresh token: ${tokenUpsertError.message}`)
            }

            return true
        } catch (error) {
            console.error('Error updating user login info:', error)
            throw error
        }
    },
}
