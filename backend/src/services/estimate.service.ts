import { supabase } from '../config/supabase'
import { transformData, createResponse } from '../utils'

export const estimateService = {
    // 견적서 목록 조회
    async getEstimateList(id: string) {
        try {
            const { data, error } = await supabase.from('EM_ESTIMATE').select('*').eq('create_user_id', id)

            if (error) {
                return createResponse(null, 0, 500, '견적서 목록 조회 중 오류가 발생했습니다.' + '[' + error.message + ']')
            }

            return createResponse(transformData.toCamelCase(data), 0, 200, '견적서 목록 조회 성공')
        } catch (error: any) {
            return createResponse(null, 0, 500, '견적서 목록 조회 중 오류가 발생했습니다.' + '[' + error.message + ']')
        }
    },

    // 견적서 상세 조회
    async getEstimateDetail(id: string, estimateId: string) {
        try {
            const { data, error } = await supabase.from('EM_ESTIMATE').select('*').eq('estimate_id', estimateId).eq('create_user_id', id).single()

            const { data: itemData, error: itemError } = await supabase
                .from('EM_ESTIMATE_ITEM')
                .select('*')
                .eq('estimate_id', estimateId)
                .eq('create_user_id', id)

            if (error) {
                return createResponse(null, 0, 500, '견적서 상세 조회 중 오류가 발생했습니다.' + '[' + error.message + ']')
            }

            if (itemError) {
                return createResponse(null, 0, 500, '견적서 항목 조회 중 오류가 발생했습니다.' + '[' + itemError.message + ']')
            }

            const result = {
                estimateDetail: data ? transformData.toCamelCase(data) : null,
                estimateItems: itemData ? transformData.toCamelCase(itemData) : null,
            }

            return createResponse(result, 0, 200, '견적서 상세 조회 성공')
        } catch (error: any) {
            return createResponse(null, 0, 500, '견적서 상세 조회 중 오류가 발생했습니다.' + '[' + error.message + ']')
        }
    },

    // 견적서 생성/수정
    async createEstimate(id: string, estimateData: any) {
        try {
            const { items, ...basicData } = estimateData
            if (basicData.estimateId) {
                const { data, error } = await supabase
                    .from('EM_ESTIMATE')
                    .update(transformData.toSnakeCase(basicData))
                    .eq('estimate_id', basicData.estimateId)
                    .select()
                    .single()

                const { data: prevItems, error: prevError } = await supabase
                    .from('EM_ESTIMATE_ITEM')
                    .delete()
                    .eq('estimate_id', basicData.estimateId)
                    .eq('create_user_id', id)

                const { data: itemData, error: itemError } = await supabase
                    .from('EM_ESTIMATE_ITEM')
                    .insert(transformData.toSnakeCase(items))
                    .eq('estimate_id', basicData.estimateId)
                    .eq('create_user_id', id)

                if (prevError || itemError) {
                    return createResponse(null, 0, 500, '견적서 항목 업데이트 중 오류가 발생했습니다.')
                }

                if (error) {
                    return createResponse(null, 0, 500, '견적서 수정 중 오류가 발생했습니다.')
                }

                if (!data) {
                    return createResponse(null, 0, 400, '견적서를 찾을 수 없습니다.')
                }

                return createResponse(transformData.toCamelCase(data), 0, 201, '견적서 수정 성공')
            } else {
                const { data, error } = await supabase
                    .from('EM_ESTIMATE')
                    .insert({
                        ...transformData.toSnakeCase(basicData),
                        create_user_id: id,
                    })
                    .select()
                    .single()

                if (error) {
                    return createResponse(null, 0, 500, '견적서 생성 중 오류가 발생했습니다.')
                }

                const estimateId = data.estimate_id
                if (items && items.length > 0) {
                    const itemInserts = items.map((item: any) => ({
                        ...transformData.toSnakeCase(item),
                        estimate_id: estimateId,
                        create_user_id: id,
                    }))

                    const { error: itemError } = await supabase.from('EM_ESTIMATE_ITEM').insert(itemInserts)

                    if (itemError) {
                        return createResponse(null, 0, 500, '견적서 항목 생성 중 오류가 발생했습니다.')
                    }
                }
                return createResponse(transformData.toCamelCase(data), 0, 201, '견적서 등록 성공')
            }
        } catch (error: any) {
            return createResponse(null, 0, 500, '견적서 생성 중 오류가 발생했습니다.')
        }
    },

    // // 견적서 수정
    // async updateEstimate(id: string, estimateId: string, updateData: any) {
    //     try {
    //         const { data, error } = await supabase
    //             .from('EM_ESTIMATE')
    //             .update(transformData.toSnakeCase(updateData))
    //             .eq('id', estimateId)
    //             .eq('member_id', id)
    //             .select()
    //             .single()

    //         if (error) {
    //             return createResponse(null, 0, 500, '견적서 수정 중 오류가 발생했습니다.' + '[' + error.message + ']')
    //         }

    //         if (!data) {
    //             return createResponse(null, 0, 400, '견적서를 찾을 수 없거나 권한이 없습니다.')
    //         }

    //         return createResponse(transformData.toCamelCase(data), 0, 201, '견적서 수정 성공')
    //     } catch (error: any) {
    //         return createResponse(null, 0, 500, '견적서 수정 중 오류가 발생했습니다.' + '[' + error.message + ']')
    //     }
    // },

    // 견적서 삭제
    async deleteEstimate(id: string, estimateIds: string) {
        try {
            const estimateIdArray = estimateIds.split(',').map((id) => id.trim())

            // 먼저 견적서 항목 삭제
            const { error: itemsError } = await supabase.from('EM_ESTIMATE_ITEM').delete().in('estimate_id', estimateIdArray)

            if (itemsError) {
                return createResponse(null, 0, 500, '견적서 항목 삭제 중 오류가 발생했습니다.')
            }

            // 견적서 삭제
            const { data, error } = await supabase.from('EM_ESTIMATE').delete().in('estimate_id', estimateIdArray).eq('create_user_id', id)

            if (error) {
                return createResponse(null, 0, 500, '견적서 삭제 중 오류가 발생했습니다.')
            }

            return createResponse(null, 0, 201, '견적서 삭제 성공')
        } catch (error: any) {
            return createResponse(null, 0, 500, '견적서 삭제 중 오류가 발생했습니다.')
        }
    },
}
