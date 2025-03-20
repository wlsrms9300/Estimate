import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL // 백엔드 서버 주소

export interface Member {
    id: number
    user_id: string
    name: string
    email: string
}

export const getMembers = async (): Promise<Member[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/members`)
        return response.data
    } catch (error) {
        console.error('멤버 목록을 가져오는데 실패했습니다:', error)
        throw error
    }
}
