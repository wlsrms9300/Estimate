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
