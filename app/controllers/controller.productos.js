import pool from '../config/db.js';

export const getProductos = async (req, res) => {
    try {
        const [productos] = await pool.query('SELECT * FROM productos');
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

export const getProductoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [producto] = await pool.query('SELECT * FROM productos WHERE Id_producto = ?', [id]);
        if (producto.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(producto[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

export const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, stock } = req.body;
        await pool.query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock]);
        res.status(201).json({ message: 'Producto creado' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock } = req.body;
        await pool.query('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE Id_producto = ?', [nombre, precio, stock, id]);
        res.status(200).json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM productos WHERE Id_producto = ?', [id]);
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};


// 6. Reporte: Productos más vendidos
export const getProductosMasVendidos = async (req, res) => {
    try {
        const query = `
            SELECT p.Id_producto, p.nombre, SUM(d.cantidad) as total_vendido 
            FROM detalles_factura d 
            JOIN productos p ON d.Id_producto = p.Id_producto 
            JOIN facturas f ON d.Id_factura = f.Id_factura 
            WHERE f.estado != 'Cancelado' 
            GROUP BY p.Id_producto, p.nombre 
            ORDER BY total_vendido DESC 
            LIMIT 10
        `;
        const [productos] = await pool.query(query);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// 7. Reporte: Productos faltantes o con bajo stock
export const getProductosFaltantes = async (req, res) => {
    try {
        const [productos] = await pool.query('SELECT * FROM productos WHERE stock < 10 ORDER BY stock ASC');
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};
