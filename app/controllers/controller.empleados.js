import pool from '../config/db.js';

// 1. Obtener todos
export const getEmpleados = async (req, res) => {
    try {
        const [empleados] = await pool.query('SELECT Id_empleado, nombre_completo, email, cargo, salario FROM empleados');
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// 2. Obtener por ID
export const getEmpleadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [empleado] = await pool.query('SELECT Id_empleado, nombre_completo, email, cargo, salario FROM empleados WHERE Id_empleado = ?', [id]);
        if (empleado.length === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.status(200).json(empleado[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// 3. Crear
export const crearEmpleado = async (req, res) => {
    try {
        const { nombre_completo, email, password, cargo, salario } = req.body;
        await pool.query(
            'INSERT INTO empleados (nombre_completo, email, password, cargo, salario) VALUES (?, ?, ?, ?, ?)',
            [nombre_completo, email, password, cargo, salario]
        );
        res.status(201).json({ message: 'Empleado creado' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// 4. Modificar
export const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_completo, email, cargo, salario } = req.body;
        await pool.query(
            'UPDATE empleados SET nombre_completo = ?, email = ?, cargo = ?, salario = ? WHERE Id_empleado = ?',
            [nombre_completo, email, cargo, salario, id]
        );
        res.status(200).json({ message: 'Empleado actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// 5. Eliminar
export const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM empleados WHERE Id_empleado = ?', [id]);
        res.status(200).json({ message: 'Empleado eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};
