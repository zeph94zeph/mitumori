import { Router } from 'express';
import { createVehicle, deleteVehicle, listVehicles, updateVehicle } from '../controllers/vehicleController';
import { isAuthenticated, requireRole } from '../middleware/auth';

const router = Router();

router.use(isAuthenticated);

router.get('/', listVehicles);
router.post('/', requireRole(['ADMIN']), createVehicle);
router.put('/:id', requireRole(['ADMIN']), updateVehicle);
router.delete('/:id', requireRole(['ADMIN']), deleteVehicle);

export default router;
