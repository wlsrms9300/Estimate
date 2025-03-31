/**
 * @interface SignupForm
 * @description 회원가입 폼
 */
export interface SignupForm {
    agreeTermsOfAge: boolean
    agreeTermsOfUse: boolean
    agreeTermsOfPersonal: boolean
    agreeTermsOfMarketing: boolean
    userId: string
    password: string
}

/**
 * @interface LoginForm
 * @description 로그인 폼
 */
export interface LoginForm {
    userId: string
    password: string
}
