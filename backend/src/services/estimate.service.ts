import { supabase } from '../config/supabase'
import { transformData, jwtUtils, createResponse } from '../utils'
import { TokenPayload } from '../interfaces/auth.interface'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

export const estimateService = {
    // 견적서 생성
    async createEstimate(id: string, estimateData: any) {
        try {
            const { data, error } = await supabase
                .from('EM_ESTIMATE')
                .insert({
                    ...transformData.toSnakeCase(estimateData),
                    member_id: id,
                })
                .select()
                .single()

            if (error) {
                return createResponse(null, 0, 500, '견적서 생성 중 오류가 발생했습니다.' + '[' + error.message + ']')
            }

            return createResponse(transformData.toCamelCase(data), 0, 201, '견적서 생성 성공')
        } catch (error: any) {
            return createResponse(null, 0, 500, '견적서 생성 중 오류가 발생했습니다.' + '[' + error.message + ']')
        }
    },

    // 견적서 수정
    async updateEstimate(id: string, estimateId: string, updateData: any) {
        try {
            const { data, error } = await supabase
                .from('EM_ESTIMATE')
                .update(transformData.toSnakeCase(updateData))
                .eq('id', estimateId)
                .eq('member_id', id)
                .select()
                .single()

            if (error) {
                return createResponse(null, 0, 500, '견적서 수정 중 오류가 발생했습니다.' + '[' + error.message + ']')
            }

            if (!data) {
                return createResponse(null, 0, 400, '견적서를 찾을 수 없거나 권한이 없습니다.')
            }

            return createResponse(transformData.toCamelCase(data), 0, 201, '견적서 수정 성공')
        } catch (error: any) {
            return createResponse(null, 0, 500, '견적서 수정 중 오류가 발생했습니다.' + '[' + error.message + ']')
        }
    },

    // 견적서 삭제
    async deleteEstimate(id: string, estimateId: string) {
        try {
            const { data, error } = await supabase.from('EM_ESTIMATE').delete().eq('id', estimateId).eq('member_id', id)

            if (error) {
                return createResponse(null, 0, 500, '견적서 삭제 중 오류가 발생했습니다.' + '[' + error.message + ']')
            }

            return createResponse(null, 0, 201, '견적서 삭제 성공')
        } catch (error: any) {
            return createResponse(null, 0, 500, '견적서 삭제 중 오류가 발생했습니다.' + '[' + error.message + ']')
        }
    },
}
