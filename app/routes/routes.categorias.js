import { Router } from 'express';
import { getCategorias, getCategoriaById, crearCategoria, actualizarCategoria, eliminarCategoria } from '../controllers/controller.categorias.js';

const router = Router();

router.get('/', (req, res, next) => {
    // #swagger.tags = ['Categorías']
    next();
}, getCategorias);

router.get('/:id', (req, res, next) => {
    // #swagger.tags = ['Categorías']
    next();
}, getCategoriaById);

router.post('/', (req, res, next) => {
    // #swagger.tags = ['Categorías']
    next();
}, crearCategoria);

router.put('/:id', (req, res, next) => {
    // #swagger.tags = ['Categorías']
    next();
}, actualizarCategoria);

router.delete('/:id', (req, res, next) => {
    // #swagger.tags = ['Categorías']
    next();
}, eliminarCategoria);

export default router;