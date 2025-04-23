import axios from 'axios'
import { resetAllStores } from '../../utils/store'

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('at')}`,
    },
    withCredentials: true,
    timeout: 5000,
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('at')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response?.status
        const originalRequest = error.config

        switch (status) {
            case 401:
                // 인증되지 않은 요청 - introduce 화면으로 이동
                console.error('인증되지 않은 요청')
                // 로컬 스토리지 초기화
                localStorage.clear()
                // store 초기화
                resetAllStores()
                // introduce 페이지로 리다이렉션
                window.location.href = '/auth/expire'
                break
            case 403:
                // 토큰 만료 - 토큰 갱신 시도
                if (!originalRequest._retry) {
                    try {
                        const response = await instance.post('/member/refreshToken')
                        if (response.status === 201 && response.data.resultCd === 201) {
                            const newAccessToken = response.data.data.accessToken
                            // 새로운 토큰을 localStorage에 저장
                            localStorage.setItem('at', newAccessToken)

                            // 원래 요청의 헤더 업데이트
                            originalRequest._retry = true
                            originalRequest.headers = {
                                ...originalRequest.headers,
                                Authorization: `Bearer ${newAccessToken}`,
                            }

                            // 새로운 인스턴스로 요청 재시도
                            return axios(originalRequest)
                        }
                    } catch (error) {
                        console.error('토큰 재발급 실패')
                        // 로컬 스토리지 초기화
                        localStorage.clear()
                        // store 초기화
                        resetAllStores()
                        // introduce 페이지로 리다이렉션
                        window.location.href = '/auth/expire'
                    }
                }
                break
            case 500:
                // 서버 오류 - 에러 메시지 표시
                console.error('서버 오류:', error.response?.data)
                break
            default:
                // 기타 에러 - 에러 메시지 표시
                console.error('오류 발생:', error.response?.data)
                break
        }

        return Promise.reject(error)
    },
)

export default instance
