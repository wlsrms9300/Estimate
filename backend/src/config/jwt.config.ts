const getJwtSecretKey = (): string => {
    const key = process.env.JWT_SECRET_KEY
    if (!key) {
        throw new Error('JWT_SECRET_KEY 환경변수가 설정되지 않았습니다.')
    }
    return key
}

export const jwtConfig = {
    secretKey: getJwtSecretKey(),
    expiresIn: '1h', // 토큰 만료 시간
    refreshExpiresIn: '1d', // 리프레시 토큰 만료 시간
}
