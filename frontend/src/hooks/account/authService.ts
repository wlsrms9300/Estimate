import { useMutation } from '@tanstack/react-query'
import { sendVerificationCode, verifyCertNo, signup } from '../../services/account/authService'
import { openNotification } from '../common'

/**
 * @mutation useSendVerificationCode
 * @post /member/emailCertSend
 * @description 이메일 인증 코드 전송
 */
export const useSendVerificationCode = (onSuccess: () => void) => {
    return useMutation({
        mutationFn: sendVerificationCode,
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                openNotification('이메일 인증코드 발송', response.resultMsg, 'success')
                onSuccess()
            } else {
                openNotification('이메일 인증코드 발송 실패', '이메일을 확인해 주세요.', 'error')
            }
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
            if (response.resultCd === 201) {
                openNotification('인증코드 확인 성공', response.resultMsg, 'success')
                onSuccess()
            } else {
                openNotification('인증코드 확인 실패', '인증코드를 확인 해주세요.', 'error')
            }
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
            if (response.resultCd === 201) {
                openNotification('회원가입 성공', response.resultMsg, 'success')
                onSuccess()
            } else {
                openNotification('회원가입 실패', '회원정보를 확인 해주세요.', 'error')
            }
        },
    })
}
