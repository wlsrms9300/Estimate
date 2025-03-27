import { create } from 'zustand'

interface AuthState {
    email: string
    authCode: string
    password: string
    agreeTermsOfAge: boolean // 만 14세 이상 동의
    agreeTermsOfUse: boolean // 이용약관 동의
    agreeTermsOfPersonal: boolean // 개인정보 수집 및 이용 동의
    agreeTermsOfMarketing: boolean // 마케팅 동의
    setEmail: (email: string) => void
    setAuthCode: (authCode: string) => void
    setPassword: (password: string) => void
    setAgreeTermsOfAge: (agreeTermsOfAge: boolean) => void
    setAgreeTermsOfUse: (agreeTermsOfUse: boolean) => void
    setAgreeTermsOfPersonal: (agreeTermsOfPersonal: boolean) => void
    setAgreeTermsOfMarketing: (agreeTermsOfMarketing: boolean) => void
    reset: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    email: '',
    authCode: '',
    password: '',
    name: '',
    agreeTermsOfAge: false,
    agreeTermsOfUse: false,
    agreeTermsOfPersonal: false,
    agreeTermsOfMarketing: false,
    setEmail: (email) => set({ email }),
    setAuthCode: (authCode) => set({ authCode }),
    setPassword: (password) => set({ password }),
    setAgreeTermsOfAge: (agreeTermsOfAge) => set({ agreeTermsOfAge }),
    setAgreeTermsOfUse: (agreeTermsOfUse) => set({ agreeTermsOfUse }),
    setAgreeTermsOfPersonal: (agreeTermsOfPersonal) => set({ agreeTermsOfPersonal }),
    setAgreeTermsOfMarketing: (agreeTermsOfMarketing) => set({ agreeTermsOfMarketing }),
    reset: () =>
        set({
            email: '',
            authCode: '',
            password: '',
            agreeTermsOfAge: false,
            agreeTermsOfUse: false,
            agreeTermsOfPersonal: false,
            agreeTermsOfMarketing: false,
        }),
}))
