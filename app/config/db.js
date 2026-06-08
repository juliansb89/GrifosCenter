import mysql from 'mysql2/promise'; // Aquí agregamos /promise

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Js891206',
    database: 'grifos center',
    port: 3307,
});

console.log('✅ Conectado a la Base de Datos grifos center (Promesas activas)');

export default pool;
