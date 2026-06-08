import pool from '../config/db.js';

export const getCategorias = async (req, res) => {
    try {
        const [categorias] = await pool.query('SELECT * FROM categorias');
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

export const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [categoria] = await pool.query('SELECT * FROM categorias WHERE Id_categoria = ?', [id]);
        if (categoria.length === 0) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.status(200).json(categoria[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

export const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        await pool.query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.status(201).json({ message: 'Categoría creada' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

export const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        await pool.query('UPDATE categorias SET nombre = ?, descripcion = ? WHERE Id_categoria = ?', [nombre, descripcion, id]);
        res.status(200).json({ message: 'Categoría actualizada' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};

export const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM categorias WHERE Id_categoria = ?', [id]);
        res.status(200).json({ message: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
};
