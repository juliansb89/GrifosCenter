import pool from '../config/db.js';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'grifos_center_secreto_super_seguro';

export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Intentando buscar al cliente:", email, "con clave:", password);


        const [empleados] = await pool.query(
            'SELECT * FROM empleados WHERE email = ? AND password = ?',
            [email, password]
        );

        if (empleados.length > 0) {
            const usuario = empleados[0];
            const token = jwt.sign(
                { id: usuario.Id_empleado, role: usuario.cargo, email: usuario.email }, 
                SECRET_KEY, { expiresIn: '2h' }
            );

            return res.status(200).json({
                message: 'Login exitoso',
                token: token,
                role: usuario.cargo,
                name: usuario.nombre_completo,
                userId: usuario.Id_empleado
            });
        }

        const [clientes] = await pool.query(
            'SELECT * FROM clientes WHERE email = ? AND password = ?',
            [email, password]
        );

        if (clientes.length > 0) {
            const usuario = clientes[0];
            const token = jwt.sign(
                { id: usuario.Id_cliente, role: 'Cliente', email: usuario.email }, 
                SECRET_KEY, { expiresIn: '2h' }
            );

            return res.status(200).json({
                message: 'Login exitoso',
                token: token,
                role: 'Cliente',
                name: usuario.nombre_completo,
                userId: usuario.Id_cliente
            });
        }

        return res.status(401).json({ message: 'Credenciales inválidas' });

    } catch (error) {
        console.error("🚨 ERROR FATAL EN EL BACKEND:", error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
