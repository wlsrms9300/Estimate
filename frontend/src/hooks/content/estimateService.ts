import { useMutation, useQuery } from '@tanstack/react-query'
import { createEstimate, deleteEstimate, getEstimateList, getEstimateDetail } from '../../services/content/estimateService'
import useCustomNotification from '../notification'
// types
import { EstimateForm, EstimateItem } from '../../types/content/estimate'
// context
import { useAuth } from '../../context/AuthContext'

/**
 * @query useGetEstimateList
 * @get /estimate/list
 * @description 견적서 목록 조회
 */
export const useGetEstimateList = () => {
    const { openNotification } = useCustomNotification()

    return useQuery({
        queryKey: ['estimateList'],
        queryFn: async () => {
            try {
                const response = await getEstimateList()
                return response?.data
            } catch (error: any) {
                openNotification('error', '견적서 목록 조회 실패', error.response?.data?.resultMsg)
                throw error
            }
        },
    })
}

/**
 * @query useGetEstimateDetail
 * @get /estimate/detail/:estimateId
 * @description 견적서 상세 조회
 */
export const useGetEstimateDetail = (estimateId: string) => {
    const { openNotification } = useCustomNotification()

    return useQuery({
        queryKey: ['estimateDetail', estimateId],
        queryFn: async () => {
            try {
                const response = await getEstimateDetail(estimateId)
                return response?.data
            } catch (error: any) {
                openNotification('error', '견적서 상세 조회 실패', error.response?.data?.resultMsg)
                throw error
            }
        },
        enabled: !!estimateId,
    })
}
/**
 * @mutation useCreateEstimate
 * @post /estimate/create
 * @description 견적서 등록/수정
 */
export const useCreateEstimate = () => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: createEstimate,
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                openNotification('success', '견적서 저장 성공', response.resultMsg)
            }
        },
        onError: (error) => {
            console.error('견적서 저장 실패:', error)
            openNotification('error', '견적서 저장 실패', '견적서 저장에 실패했습니다.')
        },
    })
}

/**
 * @mutation useUpdateEstimate
 * @post /estimate/update/:estimateId
 * @description 견적서 수정
 */
// export const useUpdateEstimate = () => {
//     const { openNotification } = useCustomNotification()

//     return useMutation({
//         mutationFn: ({ estimateId, data }: { estimateId: string; data: any }) => updateEstimate(estimateId, data),
//         onSuccess: (response) => {
//             if (response.resultCd === 201) {
//                 openNotification('success', '견적서 수정 성공', response.resultMsg)
//             }
//         },
//     })
// }

/**
 * @mutation useDeleteEstimate
 * @delete /estimate/delete/:estimateIds
 * @description 견적서 삭제
 */
export const useDeleteEstimate = () => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: deleteEstimate,
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                openNotification('success', '견적서 삭제 성공', response.resultMsg)
            }
        },
    })
}
