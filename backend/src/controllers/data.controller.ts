import { Request, Response } from 'express';
import { dataService } from '../services/data.service';

export const dataController = {
    async getData(req: Request, res: Response) {
        try {
            const { table } = req.params;
            console.log(table);
            const data = await dataService.getData(table);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async createData(req: Request, res: Response) {
        try {
            const { table } = req.params;
            const data = await dataService.createData(table, req.body);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateData(req: Request, res: Response) {
        try {
            const { table, id } = req.params;
            const data = await dataService.updateData(table, Number(id), req.body);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteData(req: Request, res: Response) {
        try {
            const { table, id } = req.params;
            await dataService.deleteData(table, Number(id));
            res.json({ success: true });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    },

    async getMembers(req: Request, res: Response) {
        try {
            const { user_type, grade } = req.query;
            const data = await dataService.getData('TEST_MEMBER', { user_type: user_type as string, grade: grade as string  });
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ 
                error: error.message || '멤버 데이터 조회 중 오류가 발생했습니다.' 
            });
        }
    },  
    
};