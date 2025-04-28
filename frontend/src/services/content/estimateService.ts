import axios from '../api/axios'

/**
 * @mutation getEstimateList
 * @get /estimate/list
 * @description 견적서 목록 조회
 */
export const getEstimateList = async () => {
    const response = await axios.get('/estimate/list')
    return response.data
}

/**
 * @mutation createEstimate
 * @post /estimate/create
 * @description 견적서 생성
 */
export const createEstimate = async (data: any) => {
    const response = await axios.post('/estimate/create', data)
    return response.data
}

/**
 * @mutation updateEstimate
 * @post /estimate/update/:estimateId
 * @description 견적서 수정
 */
export const updateEstimate = async (estimateId: string, data: any) => {
    const response = await axios.post(`/estimate/update/${estimateId}`, data)
    return response.data
}

/**
 * @mutation deleteEstimate
 * @delete /estimate/delete/:estimateId
 * @description 견적서 삭제
 */
export const deleteEstimate = async (estimateId: string) => {
    const response = await axios.delete(`/estimate/delete/${estimateId}`)
    return response.data
}
