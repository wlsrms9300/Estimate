import { Request, Response } from 'express'
import { memberService } from '../services/member.service'
import { EM_MEMBER } from '../interfaces/member.interface'
import { jwtUtils } from '../utils/index'
import { createResponse } from '../utils/helper/responseHelper'

export const memberController = {
    //회원가입
    async signup(req: Request, res: Response) {
        try {
            const result = await memberService.signup('EM_MEMBER', req.body)
            res.status(result.resultCd === 201 ? 201 : 400).json(result)
        } catch (error: any) {
            res.status(500).json(createResponse(null, 0, 500, '회원가입 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { userId, password } = req.body as unknown as EM_MEMBER
            const result = await memberService.login({ userId, password })

            if (result.resultCd === 201 && result.data) {
                const { refreshToken, cookieOptions, ...rest } = result.data as any
                if (refreshToken && cookieOptions) {
                    // refresh token을 쿠키로 설정
                    res.cookie('refreshToken', refreshToken, {
                        ...cookieOptions,
                        sameSite: cookieOptions.sameSite as 'strict' | 'lax' | 'none',
                    })

                    result.data = rest
                }
                res.status(201).json(result)
            } else {
                res.status(400).json(result)
            }
        } catch (error: any) {
            res.status(500).json(createResponse(null, 0, 500, '로그인 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },

    //이메일 인증번호 발송
    async emailCertSend(req: Request, res: Response) {
        try {
            const { userId } = req.body
            const result = await memberService.emailCertSend(userId)
            res.status(result.resultCd === 201 ? 201 : 400).json(result)
        } catch (error: any) {
            res.status(500).json(createResponse(null, 0, 500, '이메일 인증번호 발송 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },

    //이메일 인증번호 인증
    async emailCertCheck(req: Request, res: Response) {
        try {
            const { userId, certNo } = req.body
            const result = await memberService.emailCertCheck(userId, certNo)
            res.status(result.resultCd === 201 ? 201 : 400).json(result)
        } catch (error: any) {
            res.status(500).json(createResponse(null, 0, 500, '이메일 인증번호 인증 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },

    // 토큰 재발급
    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken

            if (!refreshToken) {
                // 쿠키 제거
                res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                })
                return res.status(401).json(createResponse(null, 0, 401, '리프레시 토큰이 없습니다. 다시 로그인해주세요.'))
            }

            // 리프레시 토큰 검증
            const verifyResult = jwtUtils.verifyToken(refreshToken)
            if (verifyResult.resultCd !== 201) {
                // 쿠키 제거
                res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                })
                return res.status(403).json(verifyResult)
            }

            // 새로운 접근 토큰 발급
            const result = await memberService.refreshAccessToken(verifyResult?.data?.userId)
            res.status(result.resultCd === 201 ? 201 : 400).json(result)
        } catch (error: any) {
            // 에러 발생 시에도 쿠키 제거
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
            })
            res.status(500).json(createResponse(null, 0, 500, '토큰 재발급 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },

    // // 프로필 조회
    // async getProfile(req: Request, res: Response) {
    //     try {
    //         const userId = req.user?.userId
    //         if (!userId) {
    //             return res.status(401).json(createResponse(null, 0, 401, '인증되지 않은 사용자입니다.'))
    //         }

    //         const result = await memberService.getProfile(userId)
    //         res.status(result.resultCd === 201 ? 200 : 400).json(result)
    //     } catch (error: any) {
    //         res.status(500).json(createResponse(null, 0, 500, '프로필 조회 중 오류가 발생했습니다.' + '[' + error.message + ']'))
    //     }
    // },

    // // 프로필 수정
    // async updateProfile(req: Request, res: Response) {
    //     try {
    //         const userId = req.user?.userId
    //         if (!userId) {
    //             return res.status(401).json(createResponse(null, 0, 401, '인증되지 않은 사용자입니다.'))
    //         }

    //         const result = await memberService.updateProfile(userId, req.body)
    //         res.status(result.resultCd === 201 ? 200 : 400).json(result)
    //     } catch (error: any) {
    //         res.status(500).json(createResponse(null, 0, 500, '프로필 수정 중 오류가 발생했습니다.' + '[' + error.message + ']'))
    //     }
    // },

    // // 프로필 삭제
    // async deleteProfile(req: Request, res: Response) {
    //     try {
    //         const userId = req.user?.userId
    //         if (!userId) {
    //             return res.status(401).json(createResponse(null, 0, 401, '인증되지 않은 사용자입니다.'))
    //         }

    //         const result = await memberService.deleteProfile(userId)
    //         res.status(result.resultCd === 201 ? 200 : 400).json(result)
    //     } catch (error: any) {
    //         res.status(500).json(createResponse(null, 0, 500, '프로필 삭제 중 오류가 발생했습니다.' + '[' + error.message + ']'))
    //     }
    // },
}
