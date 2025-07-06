import { Router } from 'express';
import { getAllTasks, addTask, updateTask, deleteTask } from '../controllers/task.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, getAllTasks);
router.post('/', authenticate, authorize(['Super Admin']), addTask);
router.delete('/:id', authenticate, authorize(['Super Admin']), deleteTask);
router.put('/:id', authenticate, authorize(['Super Admin']), updateTask);
export default router;
