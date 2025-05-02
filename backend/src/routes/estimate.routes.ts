import express, { RequestHandler } from 'express'
import { estimateController } from '../controllers/estimate.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = express.Router()

// 견적서 관련 라우트
router.get('/list', authMiddleware, estimateController.getEstimateList as RequestHandler) //견적서 목록 조회
router.post('/create', authMiddleware, estimateController.createEstimate as RequestHandler) //견적서 생성
router.post('/update/:estimateId', authMiddleware, estimateController.updateEstimate as RequestHandler) //견적서 수정
router.delete('/delete/:estimateIds', authMiddleware, estimateController.deleteEstimate as RequestHandler) //견적서 삭제

export default router
