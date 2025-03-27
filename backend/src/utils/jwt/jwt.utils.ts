import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.config'
import { TokenPayload } from '../../interfaces/auth.interface'

export const jwtUtils = {
    generateTokens(payload: TokenPayload): { accessToken: string; refreshToken: string } {
        try {
            // 액세스 토큰: 필요한 모든 정보 포함
            const accessToken = jwt.sign(
                {
                    userId: payload.userId,
                    password: payload.password,
                    tokenType: 'access',
                    expiresIn: jwtConfig.expiresIn,
                },
                jwtConfig.secretKey,
            )

            // 리프레시 토큰: 최소한의 정보만 포함
            const refreshToken = jwt.sign(
                {
                    userId: payload.userId,
                    tokenType: 'refresh',
                    expiresIn: jwtConfig.refreshExpiresIn,
                },
                jwtConfig.secretKey,
            )

            return { accessToken, refreshToken }
        } catch (error) {
            console.error('Token generation error:', error)
            throw new Error('토큰 생성 중 오류가 발생했습니다.')
        }
    },
    // 토큰 검증
    verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, jwtConfig.secretKey) as jwt.JwtPayload
            console.log('decoded', decoded)
            // 토큰 만료 시간 확인
            const currentTime = Math.floor(Date.now() / 1000)
            if (decoded.exp && decoded.exp < currentTime) {
                return {
                    valid: false,
                    error: '토큰이 만료되었습니다.',
                    isExpired: true,
                }
            }

            return { valid: true, decoded }
        } catch (error) {
            // JWT 검증 실패 시 에러 타입 구분
            if (error instanceof jwt.TokenExpiredError) {
                return {
                    valid: false,
                    error: '토큰이 만료되었습니다.',
                    isExpired: true,
                }
            }
            return {
                valid: false,
                error: '유효하지 않은 토큰입니다.',
                isExpired: false,
            }
        }
    },
}
