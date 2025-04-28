import { Request, Response } from 'express'
import { estimateService } from '../services/estimate.service'
import { createResponse } from '../utils/helper/responseHelper'

export const estimateController = {
    // 견적서 목록 조회
    async getEstimateList(req: Request, res: Response) {
        try {
            const id = req.user?.id
            if (!id) {
                return res.status(401).json(createResponse(null, 0, 401, '인증되지 않은 사용자입니다.'))
            }

            const result = await estimateService.getEstimateList(id)
            res.status(result.resultCd === 200 ? 200 : 400).json(result)
        } catch (error: any) {
            res.status(500).json(createResponse(null, 0, 500, '견적서 목록 조회 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },

    // 견적서 생성
    async createEstimate(req: Request, res: Response) {
        try {
            const id = req.user?.id
            if (!id) {
                return res.status(401).json(createResponse(null, 0, 401, '인증되지 않은 사용자입니다.'))
            }

            const result = await estimateService.createEstimate(id, req.body)
            res.status(result.resultCd === 201 ? 201 : 400).json(result)
        } catch (error: any) {
            res.status(500).json(createResponse(null, 0, 500, '견적서 생성 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },

    // 견적서 수정
    async updateEstimate(req: Request, res: Response) {
        try {
            const id = req.user?.id
            if (!id) {
                return res.status(401).json(createResponse(null, 0, 401, '인증되지 않은 사용자입니다.'))
            }

            const { estimateId } = req.params
            const result = await estimateService.updateEstimate(id, estimateId, req.body)
            res.status(result.resultCd === 201 ? 200 : 400).json(result)
        } catch (error: any) {
            res.status(500).json(createResponse(null, 0, 500, '견적서 수정 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },

    // 견적서 삭제
    async deleteEstimate(req: Request, res: Response) {
        try {
            const id = req.user?.id
            if (!id) {
                return res.status(401).json(createResponse(null, 0, 401, '인증되지 않은 사용자입니다.'))
            }

            const { estimateId } = req.params
            const result = await estimateService.deleteEstimate(id, estimateId)
            res.status(result.resultCd === 201 ? 200 : 400).json(result)
        } catch (error: any) {
            res.status(500).json(createResponse(null, 0, 500, '견적서 삭제 중 오류가 발생했습니다.' + '[' + error.message + ']'))
        }
    },
}
