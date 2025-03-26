import { Request, Response } from 'express'
import { memberService } from '../services/member.service'
import { EM_MEMBER } from '../interfaces/member.interface'

export const memberController = {
    async getMembers(req: Request, res: Response) {
        try {
            const { userType, grade } = req.query as unknown as EM_MEMBER
            console.log(userType, grade)
            const data = await memberService.getData('EM_MEMBER', { userType, grade })
            res.json(data)
        } catch (error: any) {
            res.status(500).json({
                error: error.message || '멤버 데이터 조회 중 오류가 발생했습니다.',
            })
        }
    },

    //회원가입
    async signup(req: Request, res: Response) {
        try {
            const result = await memberService.signup('EM_MEMBER', req.body)

            if (!result.success) {
                return res.status(400).json(result)
            }

            res.status(201).json(result)
        } catch (error) {
            console.error('회원가입 에러:', error)
            res.status(500).json({
                success: false,
                message: '회원가입 처리 중 오류가 발생했습니다.',
                error: error instanceof Error ? error.message : '알 수 없는 오류',
            })
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { userId, password } = req.body as unknown as EM_MEMBER
            const result = await memberService.login({ userId, password })

            res.json({
                success: true,
                data: {
                    user: result.user,
                    accessToken: result.accessToken,
                },
            })
        } catch (error: any) {
            res.status(401).json({
                success: false,
                error: error.message || '로그인 중 오류가 발생했습니다.',
            })
        }
    },

    //이메일 인증번호 발송
    async emailCertSend(req: Request, res: Response) {
        try {
            const { userId } = req.body
            const result = await memberService.emailCertSend(userId)
            res.status(200).json(result)
        } catch (error) {
            console.error('이메일 인증 발송 에러:', error)
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : '이메일 인증번호 발송 중 오류가 발생했습니다.',
            })
        }
    },

    //이메일 인증번호 인증
    async emailCertCheck(req: Request, res: Response) {
        try {
            const { userId, certNo } = req.body
            const result = await memberService.emailCertCheck(userId, certNo)
            res.status(200).json(result)
        } catch (error) {
            console.error('이메일 인증 인증 에러:', error)
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : '이메일 인증번호 인증 중 오류가 발생했습니다.',
            })
        }
    },
}
