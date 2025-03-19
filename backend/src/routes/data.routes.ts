import express from 'express';
import { dataController } from '../controllers/data.controller';

const router = express.Router();

router.get('/:table', dataController.getData);
router.post('/:table', dataController.createData);
router.put('/:table/:id', dataController.updateData);
router.delete('/:table/:id', dataController.deleteData);

export default router; 