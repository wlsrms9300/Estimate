import { Request, Response, NextFunction } from 'express'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    res.status(500).json({
        error: error.message || '서버 에러가 발생했습니다.',
    })
}
