import { Router } from 'express';
import { getProductos, getProductoById, crearProducto, actualizarProducto, eliminarProducto, getProductosMasVendidos, getProductosFaltantes } from '../controllers/controller.productos.js';

const router = Router();

// 5. GET para listar todos los productos
router.get('/', (req, res, next) => {
    // #swagger.tags = ['Productos']
    next();
}, getProductos);

// 6. GET para buscar un producto por ID
router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['Productos']
    next();
}, getProductoById);

// 7. POST para crear un producto
router.post('/', (req, res, next) => {
    // #swagger.tags = ['Productos']
    next();
}, crearProducto);

// 8. PUT para actualizar un producto
router.put('/:id', (req, res, next) => {
    // #swagger.tags = ['Productos']
    next();
}, actualizarProducto);

// 9. DELETE para eliminar un producto
router.delete('/:id', (req, res, next) => {
    // #swagger.tags = ['Productos']
    next();
}, eliminarProducto);

router.get('/reportes/mas-vendidos', (req, res, next) => {
    // #swagger.tags = ['Productos']
    next();
}, getProductosMasVendidos);

router.get('/reportes/faltantes', (req, res, next) => {
    // #swagger.tags = ['Productos']
    next();
}, getProductosFaltantes);

export default router;
