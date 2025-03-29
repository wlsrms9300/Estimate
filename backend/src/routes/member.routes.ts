import express, { RequestHandler } from 'express'
import { memberController } from '../controllers/member.controller'

const router = express.Router()

// 회원가입
router.post('/signup', memberController.signup as RequestHandler)
// 로그인
router.post('/login', memberController.login as RequestHandler)

// 이메일 인증번호 발송 및 확인
router.post('/emailCertSend', memberController.emailCertSend as RequestHandler)
router.post('/emailCertCheck', memberController.emailCertCheck as RequestHandler)

// 리프레시 토큰을 이용한 재발급
router.post('/refreshToken', memberController.refreshToken as RequestHandler)

export default router
