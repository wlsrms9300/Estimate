import { Request, Response } from 'express'
import { memberService } from '../services/member.service'
import { EM_MEMBER } from '../interfaces/member.interface'

export const memberController = {
    //회원가입
    async signup(req: Request, res: Response) {
        try {
            const result = await memberService.signup('EM_MEMBER', req.body)

            res.json(result)
        } catch (error: any) {
            res.json({
                resultCd: 500,
                resultMsg: '회원가입 처리 중 오류가 발생했습니다.' + '[' + error.message + ']',
            })
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { userId, password } = req.body as unknown as EM_MEMBER
            const result = await memberService.login({ userId, password })

            res.json(result)
        } catch (error: any) {
            res.json({
                resultCd: 500,
                resultMsg: '로그인 중 오류가 발생했습니다.' + '[' + error.message + ']',
            })
        }
    },

    //이메일 인증번호 발송
    async emailCertSend(req: Request, res: Response) {
        try {
            const { userId } = req.body
            const result = await memberService.emailCertSend(userId)
            res.json(result)
        } catch (error: any) {
            res.json({
                resultCd: 500,
                resultMsg: '이메일 인증번호 발송 중 오류가 발생했습니다.' + '[' + error.message + ']',
            })
        }
    },

    //이메일 인증번호 인증
    async emailCertCheck(req: Request, res: Response) {
        try {
            const { userId, certNo } = req.body
            const result = await memberService.emailCertCheck(userId, certNo)
            res.json(result)
        } catch (error: any) {
            res.json({
                resultCd: 500,
                resultMsg: '이메일 인증번호 인증 중 오류가 발생했습니다.' + '[' + error.message + ']',
            })
        }
    },

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body

        if (!refreshToken) {
            return res.json({
                resultCd: 400,
                resultMsg: '리프레시 토큰이 필요합니다.',
            })
        }

        try {
            // 리프레시 토큰 검증 및 새로운 접근 토큰 발급
            const { accessToken, error } = await memberService.refreshAccessToken(refreshToken)

            if (error) {
                return res.json({
                    resultCd: '401',
                    resultMsg: '리프레시 토큰이 유효하지 않습니다.' + '[' + error + ']',
                })
            }

            res.json({
                resultCd: 200,
                resultMsg: '토큰 재발급 성공',
                accessToken,
            })
        } catch (error) {
            res.json({
                resultCd: 500,
                resultMsg: '토큰 재발급 중 오류가 발생했습니다.' + '[' + error + ']',
            })
        }
    },
}
