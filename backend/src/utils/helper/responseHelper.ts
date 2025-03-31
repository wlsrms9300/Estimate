// 응답 객체의 타입
interface ApiResponse<T> {
    data: T | null
    code: number
    resultCd: number
    resultMsg: string
}

// 응답 객체 생성
export const createResponse = <T>(
    data: T | null,
    code: number,
    resultCd: number = 201, // get 200, post 201
    resultMsg: string = '요청이 성공적으로 처리되었습니다',
): ApiResponse<T> => {
    return {
        data,
        code,
        resultCd,
        resultMsg,
    }
}
