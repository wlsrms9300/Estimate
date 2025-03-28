import { useMutation } from '@tanstack/react-query'
import { sendVerificationCode, verifyCertNo, signup } from '../../services/account/authService'

/**
 * @mutation useSendVerificationCode
 * @post /member/emailCertSend
 * @description 이메일 인증 코드 전송
 */
export const useSendVerificationCode = (onSuccess: (response: any) => void, onError: (error: any) => void) => {
    return useMutation({
        mutationFn: sendVerificationCode,
        onSuccess: (response) => {
            onSuccess(response)
        },
        onError: (error) => {
            onError(error)
        },
    })
}

/**
 * @mutation useVerifyCertNo
 * @post /member/emailCertCheck
 * @description 이메일 인증 코드 확인
 */
export const useVerifyCertNo = (onSuccess: (response: any) => void, onError: (error: any) => void) => {
    return useMutation({
        mutationFn: verifyCertNo,
        onSuccess: (response) => {
            onSuccess(response)
        },
        onError: (error) => {
            onError(error)
        },
    })
}

/**
 * @mutation useSignup
 * @post /member/signup
 * @description 회원가입
 */
export const useSignup = (onSuccess: (response: any) => void, onError: (error: any) => void) => {
    return useMutation({
        mutationFn: signup,
        onSuccess: (response) => {
            onSuccess(response)
        },
        onError: (error) => {
            onError(error)
        },
    })
}
