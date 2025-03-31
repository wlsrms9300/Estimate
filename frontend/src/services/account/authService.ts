import api from '../api/axios'

/**
 * @mutation sendVerificationCode
 * @post /member/emailCertSend
 * @description 이메일 인증 코드 전송
 */
export const sendVerificationCode = async (email: string) => {
    const response = await api.post('/member/emailCertSend', { userId: email })
    return response.data
}

/**
 * @mutation verifyCertNo
 * @post /member/emailCertCheck
 * @description 이메일 인증 코드 확인
 */
export const verifyCertNo = async ({ email, certNo }: { email: string; certNo: string }) => {
    const response = await api.post('/member/emailCertCheck', { userId: email, certNo })
    return response.data
}

/**
 * @mutation signup
 * @post /member/signup
 * @description 회원가입
 */
export const signup = async (data: any) => {
    const response = await api.post('/member/signup', data)
    return response.data
}

/**
 * @mutation login
 * @post /member/login
 * @description 로그인
 */
export const login = async (data: any) => {
    const response = await api.post('/member/login', data)
    return response.data
}
