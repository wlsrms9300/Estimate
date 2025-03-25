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
            const { userId, userName, password } = req.body as unknown as EM_MEMBER
            const data = await memberService.createMemberData('EM_MEMBER', {
                userId,
                userName,
                password,
            })
            res.json({ success: true, data })
        } catch (error: any) {
            res.status(500).json({
                error: error.message || '회원가입 중 오류가 발생했습니다.',
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
}
