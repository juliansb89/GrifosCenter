import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API Grifos Center',
    description: 'Documentación automática de los endpoints para el módulo de ventas',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  
  
  tags: [
    { name: 'Autenticación', description: 'Endpoints para el ingreso al sistema' },
    { name: 'Clientes', description: 'Gestión de clientes de la empresa' },
    { name: 'Empleados', description: 'Gestión del personal y nómina' },
    { name: 'Productos', description: 'Inventario de grifos y artículos' },
    { name: 'Categorías', description: 'Clasificación de productos'  },
    { name: 'Facturas' }
  ]
};

const outputFile = './swagger-output.json';
// AQUÍ LE DECIMOS QUE LEA EL INDEX PRINCIPAL, ÉL SE ENCARGARÁ DE RASTREAR TODO LO DEMÁS
const endpointsFiles = ['./index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);                