import { Router } from 'express';
import { listUsers, me } from '../controllers/userController';
import { isAuthenticated, requireRole } from '../middleware/auth';

const router = Router();

router.use(isAuthenticated);
router.get('/me', me);
router.get('/', requireRole(['ADMIN']), listUsers);

export default router;
