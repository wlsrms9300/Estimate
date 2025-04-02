import express, { RequestHandler } from 'express'
import { memberController } from '../controllers/member.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = express.Router()

// 인증이 필요하지 않은 라우트
router.post('/signup', memberController.signup as RequestHandler)
router.post('/login', memberController.login as RequestHandler)
router.post('/emailCertSend', memberController.emailCertSend as RequestHandler)
router.post('/emailCertCheck', memberController.emailCertCheck as RequestHandler)
router.post('/refreshToken', memberController.refreshToken as RequestHandler)

// 인증이 필요한 라우트
// router.get('/profile', authMiddleware, memberController.getProfile as RequestHandler)
// router.put('/profile', authMiddleware, memberController.updateProfile as RequestHandler)
// router.delete('/profile', authMiddleware, memberController.deleteProfile as RequestHandler)

export default router
