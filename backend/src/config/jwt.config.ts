export const jwtConfig = {
    secretKey: process.env.JWT_SECRET_KEY || 'your-secret-key',
    expiresIn: '24h', // 토큰 만료 시간
    refreshExpiresIn: '7d', // 리프레시 토큰 만료 시간
}
