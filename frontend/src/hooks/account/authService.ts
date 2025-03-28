import { useMutation } from '@tanstack/react-query'
import { sendVerificationCode, verifyCertNo, signup } from '../../services/account/authService'

/**
 * @mutation useSendVerificationCode
 * @post /member/emailCertSend
 * @description 이메일 인증 코드 전송
 */
export const useSendVerificationCode = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: sendVerificationCode,
        onSuccess: (response) => {
            console.log('response', response)
            onSuccess()
        },
        onError: (error) => {
            console.error('Error sending email:', error)
        },
    })
}

/**
 * @mutation useVerifyCertNo
 * @post /member/emailCertCheck
 * @description 이메일 인증 코드 확인
 */
export const useVerifyCertNo = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: verifyCertNo,
        onSuccess: (response) => {
            console.log('response', response)
            onSuccess()
        },
        onError: (error) => {
            console.error('Error verifying auth code:', error)
        },
    })
}

/**
 * @mutation useSignup
 * @post /member/signup
 * @description 회원가입
 */
export const useSignup = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: signup,
        onSuccess: (response) => {
            console.log('response', response)
            onSuccess()
        },
        onError: (error) => {
            console.error('Error signing up:', error)
        },
    })
}
