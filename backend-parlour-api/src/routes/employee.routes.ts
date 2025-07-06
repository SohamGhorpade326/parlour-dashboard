import { Router } from 'express';
import { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } from '../controllers/employee.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, getAllEmployees);
router.post('/', authenticate, authorize(['Super Admin']), addEmployee);
router.delete('/:id', authenticate, authorize(['Super Admin']), deleteEmployee);
router.put('/:id', authenticate, authorize(['Super Admin']), updateEmployee);
router.delete('/:id', authenticate, authorize(['Super Admin']), deleteEmployee);
export default router;
