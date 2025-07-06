import { Router } from 'express';
import { getAttendanceLogs } from '../controllers/attendance.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
router.get('/', authenticate, getAttendanceLogs);

export default router;
