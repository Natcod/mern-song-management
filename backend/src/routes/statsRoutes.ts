import { Router } from 'express';
import { statsController } from '../controllers/statsController';

const router = Router();

// GET /stats - Get all statistics
router.get('/', statsController.getStatistics);

export default router;
