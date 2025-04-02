import { Request, Response, NextFunction } from 'express'
import { jwtUtils } from '../utils/jwt/jwt.utils'
import { createResponse } from '../utils/helper/responseHelper'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Authorization 헤더에서 토큰 추출
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json(createResponse(null, 0, 401, '인증 토큰이 없습니다.'))
            return
        }

        const accessToken = authHeader.split(' ')[1]
        // 토큰 검증
        const verifyResult = jwtUtils.verifyToken(accessToken)
        if (verifyResult.resultCd !== 201) {
            res.status(verifyResult.status).json(verifyResult)
            return
        }

        // 검증된 사용자 정보를 request에 추가
        req.user = verifyResult.data || undefined
        next()
    } catch (error: any) {
        res.status(500).json(createResponse(null, 0, 500, '인증 처리 중 오류가 발생했습니다.' + '[' + error.message + ']'))
    }
}
