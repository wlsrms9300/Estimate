import express from 'express';
import { dataController } from '../controllers/data.controller';

const router = express.Router();

router.get('/members', dataController.getMembers);

export default router; 