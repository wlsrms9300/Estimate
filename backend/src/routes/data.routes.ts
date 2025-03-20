import express from 'express';
import { dataController } from '../controllers/data.controller';

const router = express.Router();

router.get('/', function (req, res) { res.send('테스트입니다.'); });
router.get('/members', dataController.getMembers);

export default router; 