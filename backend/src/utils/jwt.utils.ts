import jwt from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.config'
import { TokenPayload } from '../interfaces/auth.interface'

export const jwtUtils = {
    generateTokens(payload: TokenPayload): { accessToken: string; refreshToken: string } {
        try {
            const accessToken = jwt.sign(payload, jwtConfig.secretKey)

            const refreshToken = jwt.sign(payload, jwtConfig.secretKey)

            return { accessToken, refreshToken }
        } catch (error) {
            console.error('Token generation error:', error)
            throw new Error('토큰 생성 중 오류가 발생했습니다.')
        }
    },

    verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, jwtConfig.secretKey)
            return { valid: true, decoded }
        } catch (error) {
            return { valid: false, error: (error as Error).message }
        }
    },
}
