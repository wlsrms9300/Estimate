import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.config'
import { TokenPayload } from '../../interfaces/auth.interface'
import { createResponse } from '../helper/responseHelper'

export const jwtUtils = {
    generateTokens(payload: TokenPayload): { accessToken: string; refreshToken: string } {
        try {
            // 액세스 토큰: 필요한 모든 정보 포함
            const accessToken = jwt.sign(
                {
                    id: payload.id,
                    userId: payload.userId,
                    tokenType: 'access',
                },
                jwtConfig.secretKey,
                { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions,
            )

            // 리프레시 토큰: 최소한의 정보만 포함
            const refreshToken = jwt.sign(
                {
                    id: payload.id,
                    userId: payload.userId,
                    tokenType: 'refresh',
                },
                jwtConfig.secretKey,
                { expiresIn: jwtConfig.refreshExpiresIn } as jwt.SignOptions,
            )

            return { accessToken, refreshToken }
        } catch (error) {
            throw new Error('토큰 생성 중 오류가 발생했습니다.' + '[' + error + ']')
        }
    },
    // 토큰 검증
    verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, jwtConfig.secretKey) as jwt.JwtPayload
            return {
                resultCd: 201,
                resultMsg: '토큰 검증 성공',
                data: decoded,
                status: 201,
            }
        } catch (error) {
            // JWT 검증 실패 시 에러 타입 구분
            if (error instanceof jwt.TokenExpiredError) {
                return {
                    resultCd: 403,
                    resultMsg: '토큰이 만료되었습니다.',
                    data: null,
                    status: 403,
                }
            }
            return {
                resultCd: 403,
                resultMsg: '유효하지 않은 토큰입니다.',
                data: null,
                status: 403,
            }
        }
    },
}
