import { Router } from 'express';
import { 
    getEmpleados, 
    getEmpleadoById, 
    crearEmpleado, 
    actualizarEmpleado, 
    eliminarEmpleado 
} from '../controllers/controller.empleados.js';

const router = Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Empleados']
    next();
}, getEmpleados);

router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['Empleados']
    next();
}, getEmpleadoById);

router.post('/', (req, res, next) => {
    // #swagger.tags = ['Empleados']
    next();
}, crearEmpleado);

router.put('/:id', (req, res, next) => {
    // #swagger.tags = ['Empleados']
    next();
}, actualizarEmpleado);

router.delete('/:id', (req, res, next) => {
    // #swagger.tags = ['Empleados']
    next();
}, eliminarEmpleado);

export default router;
