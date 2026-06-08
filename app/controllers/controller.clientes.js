import pool from '../config/db.js';

// 1. Obtener todos los clientes (GET /api/clientes)
export const getClientes = async (req, res) => {
    try {
        const [clientes] = await pool.query('SELECT * FROM clientes');
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
    }
};

// 2. Obtener un cliente por su ID (GET /api/clientes/:id)
export const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const [cliente] = await pool.query('SELECT * FROM clientes WHERE Id_cliente = ?', [id]);
        
        if (cliente.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar el cliente', error: error.message });
    }
};

// 3. Crear un cliente nuevo (POST /api/clientes)
export const crearCliente = async (req, res) => {
    try {
        const { nombre_completo, email, password, telefono, direccion } = req.body;
        await pool.query(
            'INSERT INTO clientes (nombre_completo, email, password, telefono, direccion) VALUES (?, ?, ?, ?, ?)',
            [nombre_completo, email, password, telefono, direccion]
        );
        res.status(201).json({ message: 'Cliente creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cliente', error: error.message });
    }
};

// 4. Modificar un cliente (PUT /api/clientes/:id)
export const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_completo, email, telefono, direccion } = req.body;
        await pool.query(
            'UPDATE clientes SET nombre_completo = ?, email = ?, telefono = ?, direccion = ? WHERE Id_cliente = ?',
            [nombre_completo, email, telefono, direccion, id]
        );
        res.status(200).json({ message: 'Cliente actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
};

// 5. Eliminar un cliente (DELETE /api/clientes/:id)
export const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM clientes WHERE Id_cliente = ?', [id]);
        res.status(200).json({ message: 'Cliente eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
    }
};
