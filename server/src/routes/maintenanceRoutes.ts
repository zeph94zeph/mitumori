import { Router } from 'express';
import { createMaintenance, listMaintenance } from '../controllers/maintenanceController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.use(isAuthenticated);

router.get('/', listMaintenance);
router.post('/', createMaintenance);

export default router;
