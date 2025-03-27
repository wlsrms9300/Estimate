import { Request, Response, NextFunction } from 'express'
import { jwtUtils } from '../utils/jwt/jwt.utils'

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Authorization 헤더에서 토큰 추출
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: '인증 토큰이 필요합니다.' })
        }

        // Bearer 제거하고 토큰만 추출
        const token = authHeader.split(' ')[1]

        // 토큰 검증
        const result = jwtUtils.verifyToken(token)

        if (!result.valid) {
            return res.status(401).json({
                message: result.error,
                isExpired: result.isExpired,
            })
        }

        // 검증된 사용자 정보를 요청 객체에 저장
        //req.user = result.decoded
        next()
    } catch (error) {
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' })
    }
}
