"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataController = void 0;
const data_service_1 = require("../services/data.service");
exports.dataController = {
    async getData(req, res) {
        try {
            const { table } = req.params;
            console.log(table);
            const data = await data_service_1.dataService.getData(table);
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async createData(req, res) {
        try {
            const { table } = req.params;
            const data = await data_service_1.dataService.createData(table, req.body);
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async updateData(req, res) {
        try {
            const { table, id } = req.params;
            const data = await data_service_1.dataService.updateData(table, Number(id), req.body);
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async deleteData(req, res) {
        try {
            const { table, id } = req.params;
            await data_service_1.dataService.deleteData(table, Number(id));
            res.json({ success: true });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getMembers(req, res) {
        try {
            const { user_type, grade } = req.query;
            const data = await data_service_1.dataService.getData('TEST_MEMBER', { user_type: user_type, grade: grade });
            res.json(data);
        }
        catch (error) {
            res.status(500).json({
                error: error.message || '멤버 데이터 조회 중 오류가 발생했습니다.'
            });
        }
    },
};
