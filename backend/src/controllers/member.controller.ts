import { Request, Response } from 'express'
import { memberService } from '../services/member.service'
import { EM_MEMBER } from '../interfaces/member.interface'

export const memberController = {
    async getMembers(req: Request, res: Response) {
        try {
            const { userType, grade } = req.query as unknown as EM_MEMBER
            console.log(userType, grade)
            const data = await memberService.getData('TEST_MEMBER', { userType, grade })
            res.json(data)
        } catch (error: any) {
            res.status(500).json({
                error: error.message || '멤버 데이터 조회 중 오류가 발생했습니다.',
            })
        }
    },

    async signup(req: Request, res: Response) {
        try {
            const { userId, userName, password } = req.body as unknown as EM_MEMBER
            console.log(userId, userName, password)
            const data = await memberService.createData('TEST_MEMBER', {
                userId,
                userName,
                password,
            })
            res.json({ success: true, data })
            console.log(data)
        } catch (error: any) {
            res.status(500).json({
                error: error.message || '회원가입 중 오류가 발생했습니다.',
            })
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const user = await memberService.login(email, password)
            res.json({ success: true, user })
        } catch (error: any) {
            res.status(401).json({
                error: error.message || '로그인 중 오류가 발생했습니다.',
            })
        }
    },
}
