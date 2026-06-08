import pool from '../config/db.js';

// 1. Crear Factura (Y sus detalles al mismo tiempo)
export const procesarFactura = async (req, res) => {
    try {
        const { id_cliente, total, carrito } = req.body;
        
        // A. Guarda la factura principal
        const [resultFactura] = await pool.query('INSERT INTO facturas (Id_cliente, total) VALUES (?, ?)', [id_cliente, total]);
        const idFacturaNueva = resultFactura.insertId; // Saca el ID automático que le dio la DB

        // B. Guarda todos los productos dentro del detalle de factura
        for (let item of carrito) {
            await pool.query(
                'INSERT INTO detalles_factura (Id_factura, Id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                [idFacturaNueva, item.id, item.cantidad, item.precio, item.cantidad * item.precio]
            );
        }
        res.status(201).json({ message: 'Compra realizada con éxito', id_factura: idFacturaNueva });
    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la factura', error: error.message });
    }
};

// 2. Buscar todas las facturas
export const getFacturas = async (req, res) => {
    try {
        const query = `
            SELECT f.*, c.nombre_completo AS nombre_cliente 
            FROM facturas f
            LEFT JOIN clientes c ON f.Id_cliente = c.Id_cliente
        `;
        const [facturas] = await pool.query(query);
        res.status(200).json(facturas);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

// 3. Buscar una factura por ID (con sus detalles)
export const getFacturaById = async (req, res) => {
    try {
        const { id } = req.params;
        const queryFactura = `
            SELECT f.*, c.nombre_completo AS nombre_cliente, c.documento_identidad, c.direccion 
            FROM facturas f
            LEFT JOIN clientes c ON f.Id_cliente = c.Id_cliente
            WHERE f.Id_factura = ?
        `;
        const [factura] = await pool.query(queryFactura, [id]);
        if (factura.length === 0) return res.status(404).json({ message: 'Factura no encontrada' });
        
        const queryDetalles = `
            SELECT d.*, p.nombre AS nombre_producto 
            FROM detalles_factura d
            JOIN productos p ON d.Id_producto = p.Id_producto
            WHERE d.Id_factura = ?
        `;
        const [detalles] = await pool.query(queryDetalles, [id]);
        
        res.status(200).json({
            factura: factura[0],
            productos: detalles
        });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};


// 4. Validar cupón de descuento
export const validarCupon = async (req, res) => {
    try {
        const { codigo } = req.body;
        const [cupon] = await pool.query('SELECT * FROM cupones WHERE codigo = ? AND activo = TRUE', [codigo]);
        if (cupon.length === 0) return res.status(404).json({ message: 'Cupón no válido o expirado' });
        res.status(200).json(cupon[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al validar cupón', error: error.message });
    }
};

// 5. Cancelar factura/pedido
export const cancelarFactura = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('UPDATE facturas SET estado = ? WHERE Id_factura = ?', ['Cancelado', id]);
        res.status(200).json({ message: 'Pedido cancelado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cancelar pedido', error: error.message });
    }
};

// 6. Reporte: Total de ingresos generados
export const getTotalIngresos = async (req, res) => {
    try {
        const query = "SELECT SUM(total) as ingresos_totales FROM facturas WHERE estado != 'Cancelado'";
        const [resultado] = await pool.query(query);
        res.status(200).json({ ingresos_totales: resultado[0].ingresos_totales || 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};
