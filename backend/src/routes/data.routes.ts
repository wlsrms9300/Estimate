import express from 'express'
import { memberController } from '../controllers/member.controller'

const router = express.Router()

// 회원 인증 관련 라우트 추가
router.post('/signup', memberController.signup)
router.post('/login', memberController.login)

export default router
