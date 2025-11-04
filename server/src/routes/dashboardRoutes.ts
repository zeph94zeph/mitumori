import { Router } from 'express';
import { dashboardSummary } from '../controllers/dashboardController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.use(isAuthenticated);
router.get('/summary', dashboardSummary);

export default router;
