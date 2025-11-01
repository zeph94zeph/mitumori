import { Router } from 'express';
import { exportData, importData } from '../controllers/backupController';
import { isAuthenticated, requireRole } from '../middleware/auth';

const router = Router();

router.use(isAuthenticated, requireRole(['ADMIN']));
router.post('/export', exportData);
router.post('/import', importData);

export default router;
