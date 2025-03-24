import { supabase } from '../config/supabase'
import { transformData } from '../utils'
import { jwtUtils } from '../utils/jwt.utils'
import { TokenPayload, AuthResponse } from '../interfaces/auth.interface'

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

    async createData(tableName: string, data: any) {
        console.log(transformData.toSnakeCase(data))
        const { data: result, error } = await supabase.from(tableName).insert(transformData.toSnakeCase(data)).select()
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

    async login(email: string, password: string): Promise<AuthResponse> {
        const { data, error } = await supabase
            .from('TEST_MEMBER')
            .select('*')
            .eq('email', email)
            .eq('password', password) // 실제 구현시에는 반드시 비밀번호 해시화 비교 로직 필요
            .single()

        if (error) {
            throw new Error('로그인 실패: 이메일 또는 비밀번호가 일치하지 않습니다.')
        }
        if (!data) {
            throw new Error('사용자를 찾을 수 없습니다.')
        }

        // 토큰 페이로드 생성
        const tokenPayload: TokenPayload = {
            user_id: data.id,
            userType: data.user_type,
        }

        // 토큰 생성
        const { accessToken, refreshToken } = jwtUtils.generateTokens(tokenPayload)

        // 리프레시 토큰을 데이터베이스에 저장 (선택사항)
        await this.updateData('TEST_MEMBER', data.id, {
            refresh_token: refreshToken,
            last_login_at: new Date(),
        })

        return {
            user: transformData.toCamelCase(data),
            accessToken,
            refreshToken,
        }
    },
}
