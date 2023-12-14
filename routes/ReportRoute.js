import express from 'express';
import { getReports, getReportById, createReport, updateReport, deleteReport } from '../controllers/Reports.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/reports', verifyUser, getReports);
router.get('/reports/:id', verifyUser, getReportById);
router.post('/reports', verifyUser, createReport);
router.patch('/reports/:id', verifyUser, updateReport);
router.delete('/reports/:id', verifyUser, deleteReport);

export default router;
