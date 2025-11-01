import { Router } from 'express';
import { maintenanceReport, vehicleReport } from '../controllers/reportController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.use(isAuthenticated);
router.get('/maintenance', maintenanceReport);
router.get('/vehicles', vehicleReport);

export default router;
