import express from 'express';
import { loginUsuario } from '../controllers/controller.login.js';

const router = express.Router();

router.post('/', (req, res, next) => {
    // #swagger.tags = ['Autenticación']
    next();
}, loginUsuario); // Ruta pública para iniciar sesión

export default router;


