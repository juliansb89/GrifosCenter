import { Router } from 'express';
import { procesarFactura, getFacturas, getFacturaById, validarCupon, cancelarFactura, getTotalIngresos } from '../controllers/controller.facturas.js';

const router = Router();
router.get('/', (req, res, next) => {
    // #swagger.tags = ['Facturas']
    next();
}, getFacturas); // Buscar todas

router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['Facturas']
    next();
}, getFacturaById); // Buscar una específica

router.post('/', (req, res, next) => {
    // #swagger.tags = ['Facturas']
    next();
}, procesarFactura); // Crear una venta nueva


router.post('/cupones/validar', (req, res, next) => {
    // #swagger.tags = ['Facturas']
    next();
}, validarCupon);

router.put('/:id/cancelar', (req, res, next) => {
    // #swagger.tags = ['Facturas']
    next();
}, cancelarFactura);

router.get('/reportes/ingresos', (req, res, next) => {
    // #swagger.tags = ['Facturas']
    next();
}, getTotalIngresos);

export default router;
