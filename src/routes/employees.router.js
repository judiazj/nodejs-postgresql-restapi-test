import {Router} from 'express';
import {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    updateEmployeePartial,
    deleteEmployee
} from '../controllers/employees.controller.js';

const router = Router();

router.get('/employees', getEmployee)
router.get('/employees/:id', getEmployeeById)

router.post('/employees', createEmployee)

router.put('/employees/:id', updateEmployee)
router.patch('/employees/:id', updateEmployeePartial)

router.delete('/employees/:id', deleteEmployee)

export default router;