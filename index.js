import express from 'express';
import cors from 'cors';

// 1. IMPORTAR TODAS LAS RUTAS
import loginRoutes from './app/routes/routes.login.js';
import clientesRoutes from './app/routes/routes.clientes.js';
import empleadosRoutes from './app/routes/routes.empleados.js';
import productosRoutes from './app/routes/routes.productos.js';
import categoriasRoutes from './app/routes/routes.categorias.js';
import facturasRoutes from './app/routes/routes.facturas.js';

// COMPATIBILIDAD PARA LEER EL JSON EN MÓDULOS ES
import swaggerUi from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger-output.json');

// INICIALIZACIÓN DE EXPRESS Y PUERTO
const app = express();
const PORT = 3000;

// 2. MIDDLEWARES
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. CONECTAR LAS RUTAS
app.use('/api/login', loginRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/facturas', facturasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Servidor Backend de Grifos Center funcionando al 100%' });
});

// 4. ENCENDER EL MOTOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando impecable en http://localhost:${PORT}`);
});