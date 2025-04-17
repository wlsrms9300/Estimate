import { useMutation, useQuery } from '@tanstack/react-query'
import { sendVerificationCode, verifyCertNo, signup, login, getProfile, updateProfile } from '../../services/account/authService'
import useCustomNotification from '../notification'
import { SHA256 } from 'crypto-js'
import { SignupForm, LoginForm } from '../../types/account/auth'

/**
 * @mutation useSendVerificationCode
 * @post /member/emailCertSend
 * @description 이메일 인증 코드 전송
 */
export const useSendVerificationCode = () => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: sendVerificationCode,
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                if (response.code !== 10000) {
                    alert('인증번호: ' + response.data.certNo)
                    openNotification('success', '이메일 인증코드 발송', response.resultMsg)
                }
                // onSuccess?.(response.code === 10000 ? 5 : 0)
            } else {
                openNotification('error', '이메일 인증코드 발송 실패', '이메일을 확인해 주세요.')
            }
        },
        onError: (error: any) => {
            openNotification('error', '이메일 인증코드 발송 실패', error.response?.data?.resultMsg)
        },
    })
}

/**
 * @mutation useVerifyCertNo
 * @post /member/emailCertCheck
 * @description 이메일 인증 코드 확인
 */
export const useVerifyCertNo = () => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: verifyCertNo,
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                openNotification('success', '인증코드 확인 성공', response.resultMsg)
            } else {
                openNotification('error', '인증코드 확인 실패', '인증코드를 확인 해주세요.')
            }
        },
        onError: (error: any) => {
            openNotification('error', '인증코드 확인 실패', error.response?.data?.resultMsg)
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
        onError: (error: any) => {
            openNotification('error', '회원가입 실패', error.response?.data?.resultMsg)
        },
    })
}

/**
 * @mutation useLogin
 * @post /member/login
 * @description 로그인
 */
export const useLogin = (onSuccess?: () => void) => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: (data: LoginForm) => {
            const copyData = { ...data, password: SHA256(data.password).toString() }

            return login(copyData)
        },
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                // openNotification('success', '로그인 성공', response.resultMsg)
                localStorage.setItem('at', response.data.accessToken)
                onSuccess?.()
            } else {
                openNotification('error', '로그인 실패', response.resultMsg)
            }
        },
        onError: (error: any) => {
            openNotification('error', '로그인 실패', error.response?.data?.resultMsg)
        },
    })
}

/**
 * @query useGetProfile
 * @get /member/profile
 * @description 프로필 조회
 */
export const useGetProfile = () => {
    const { openNotification } = useCustomNotification()

    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            try {
                const response = await getProfile()
                return response?.data
            } catch (error: any) {
                openNotification('error', '프로필 조회 실패', error.response?.data?.resultMsg)
                throw error
            }
        },
        // staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선하게 유지
        // retry: 3, // 실패 시 3번까지 재시도
        // refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리프레시 비활성화
    })
}

/**
 * @mutation useUpdateProfile
 * @post /member/profile
 * @description 프로필 수정
 */
export const useUpdateProfile = () => {
    const { openNotification } = useCustomNotification()

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (response) => {
            if (response.resultCd === 201) {
                openNotification('success', '프로필 수정 성공', response.resultMsg)
            } else {
                openNotification('error', '프로필 수정 실패', response.resultMsg)
            }
        },
        onError: (error: any) => {
            openNotification('error', '프로필 수정 실패', error.response?.data?.resultMsg)
        },
    })
}
