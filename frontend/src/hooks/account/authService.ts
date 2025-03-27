import { useMutation } from '@tanstack/react-query'
import { sendVerificationCode } from '../../services/account/authService'

/**
 * @mutation useSendVerificationCode
 * @post /member/emailCertSend
 * @description 이메일 인증 코드 전송
 */
export const useSendVerificationCode = (onSuccess: () => void, onError: (error: any) => void) => {
    return useMutation({
        mutationFn: sendVerificationCode,
        onSuccess: () => {
            onSuccess()
        },
        onError: (error) => {
            onError(error)
        },
    })
}
