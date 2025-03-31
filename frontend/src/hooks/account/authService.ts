import { useMutation } from '@tanstack/react-query'
import { sendVerificationCode, verifyCertNo, signup } from '../../services/account/authService'
import useCustomNotification from '../notification'
import { SHA256 } from 'crypto-js'
import { SignupForm } from '../../types/account/auth'

/**
 * @mutation useSendVerificationCode
 * @post /member/emailCertSend
 * @description 이메일 인증 코드 전송
 */
export const useSendVerificationCode = (onSuccess?: () => void) => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: sendVerificationCode,
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                openNotification('success', '이메일 인증코드 발송', response.resultMsg)
                onSuccess?.()
            } else {
                openNotification('error', '이메일 인증코드 발송 실패', '이메일을 확인해 주세요.')
            }
        },
    })
}

/**
 * @mutation useVerifyCertNo
 * @post /member/emailCertCheck
 * @description 이메일 인증 코드 확인
 */
export const useVerifyCertNo = (onSuccess?: () => void) => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: verifyCertNo,
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                openNotification('success', '인증코드 확인 성공', response.resultMsg)
                onSuccess?.()
            } else {
                openNotification('error', '인증코드 확인 실패', '인증코드를 확인 해주세요.')
            }
        },
    })
}

/**
 * @mutation useSignup
 * @post /member/signup
 * @description 회원가입
 */
export const useSignup = (onSuccess?: () => void) => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: (data: SignupForm) => {
            const copyData = { ...data, password: SHA256(data.password).toString() }

            return signup(copyData)
        },
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                openNotification('success', '회원가입 성공', response.resultMsg)
                onSuccess?.()
            } else {
                openNotification('error', '회원가입 실패', '회원정보를 확인 해주세요.')
            }
        },
    })
}
