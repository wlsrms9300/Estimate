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

export default router
