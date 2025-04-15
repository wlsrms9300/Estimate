/**
 * @function maskPhone
 * @description 전화번호, 핸드폰번호에 하이픈(-) 추가
 * @param phone 전화번호 문자열
 */
export const maskPhone = (phone: string) => {
    if (!phone) return ''

    // 숫자만 추출
    const numbers = phone.replace(/[^0-9]/g, '')

    // 길이에 따라 다른 형식 적용
    if (numbers.length === 11) {
        // 휴대폰 번호 (01012345678 => 010-1234-5678)
        return numbers.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
    } else if (numbers.length === 10) {
        if (numbers.startsWith('02')) {
            // 서울 지역번호 (0212345678 => 02-1234-5678)
            return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
        } else {
            // 휴대폰 또는 지방 번호 (01012345678, 03112345678 => 010-123-4567, 031-123-4567)
            return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        }
    } else if (numbers.length === 9) {
        if (numbers.startsWith('02')) {
            // 서울 지역번호 (021234567 => 02-123-4567)
            return numbers.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')
        }
    } else if (numbers.length === 8) {
        // 지역번호 없는 일반전화 (12345678 => 1234-5678)
        return numbers.replace(/(\d{4})(\d{4})/, '$1-$2')
    }

    // 그 외 형식은 원래 입력값 반환
    return phone
}
