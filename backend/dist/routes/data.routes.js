"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_controller_1 = require("../controllers/data.controller");
const router = express_1.default.Router();
router.get('/test_member', data_controller_1.dataController.getData);
router.post('/:table', data_controller_1.dataController.createData);
router.put('/:table/:id', data_controller_1.dataController.updateData);
router.delete('/:table/:id', data_controller_1.dataController.deleteData);
exports.default = router;
