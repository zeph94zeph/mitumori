import { Router } from 'express';
import { createInspection, listInspections } from '../controllers/inspectionController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.use(isAuthenticated);
router.get('/', listInspections);
router.post('/', createInspection);

export default router;
