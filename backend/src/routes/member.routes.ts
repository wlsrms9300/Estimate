import express, { RequestHandler } from 'express'
import { memberController } from '../controllers/member.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = express.Router()

// 인증이 필요하지 않은 라우트
router.post('/signup', memberController.signup as RequestHandler) //회원가입
router.post('/login', memberController.login as RequestHandler) //로그인
router.post('/emailCertSend', memberController.emailCertSend as RequestHandler) //이메일 인증코드 발송
router.post('/emailCertCheck', memberController.emailCertCheck as RequestHandler) //이메일 인증코드 확인
router.post('/refreshToken', memberController.refreshToken as RequestHandler) //토큰 재발급

// 회원 관련 라우트
router.get('/profile', authMiddleware, memberController.getProfile as RequestHandler) //회원정보 조회
router.post('/profile', authMiddleware, memberController.updateProfile as RequestHandler) //회원정보 수정

export default router
