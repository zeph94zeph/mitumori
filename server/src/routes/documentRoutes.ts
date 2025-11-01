import { Router } from 'express';
import { createDocument, downloadDocumentPdf, listDocuments } from '../controllers/documentController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.use(isAuthenticated);
router.get('/', listDocuments);
router.post('/', createDocument);
router.get('/:id/pdf', downloadDocumentPdf);

export default router;
