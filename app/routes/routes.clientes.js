import { Router } from 'express';
import { 
    getClientes, 
    getClienteById, 
    crearCliente, 
    actualizarCliente, 
    eliminarCliente 
} from '../controllers/controller.clientes.js';

const router = Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Clientes']
    next();
}, getClientes); // Para buscar todos (GET)

router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['Clientes']
    next();
}, getClienteById); // Para buscar a uno solo (GET)

router.post('/', (req, res, next) => {
    // #swagger.tags = ['Clientes']
    next();
}, crearCliente); // Para agregar (POST)

router.put('/:id', (req, res, next) => {
    // #swagger.tags = ['Clientes']
    next();
}, actualizarCliente); // Para modificar a uno solo (PUT)

router.delete('/:id', (req, res, next) => {
    // #swagger.tags = ['Clientes']
    next();
}, eliminarCliente); // Para borrar (DELETE)

export default router;
