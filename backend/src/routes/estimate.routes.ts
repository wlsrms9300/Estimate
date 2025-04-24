import express, { RequestHandler } from 'express'
import { estimateController } from '../controllers/estimate.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = express.Router()

// 견적서 관련 라우트
router.post('/estimate/create', authMiddleware, estimateController.createEstimate as RequestHandler) //견적서 생성
router.post('/estimate/update/:estimateId', authMiddleware, estimateController.updateEstimate as RequestHandler) //견적서 수정
router.delete('/estimate/delete/:estimateId', authMiddleware, estimateController.deleteEstimate as RequestHandler) //견적서 삭제

export default router
