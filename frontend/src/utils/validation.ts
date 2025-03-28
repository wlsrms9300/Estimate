export const validationPatterns = {
    email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    certNo: /^[0-9]{6}$/, // 6자리 숫자
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}:;"'<>,.?~`-]{8,14}$/, // 영문 + 숫자 조합, 8~14자
}

export const validateEmail = (email: string): boolean => {
    if (!email) return false
    return validationPatterns.email.test(email)
}

export const validateCertNo = (code: string): boolean => {
    if (!code) return false
    return validationPatterns.certNo.test(code)
}

export const validatePassword = (password: string): boolean => {
    if (!password) return false
    return validationPatterns.password.test(password)
}

// 아래로 validation 함수 추가
