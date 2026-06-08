import jwt from 'jsonwebtoken';

const SECRET_KEY = 'grifos_center_secreto_super_seguro';

export const verificarToken = (req, res, next) => {
    // 1. Obtener el token de la cabecera (Header: Authorization)
    const authHeader = req.headers['authorization'];
    
    // El formato es "Bearer eyJhbGci..."
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'Acceso denegado: No se proporcionó un token.' });
    }

    try {
        // 2. Verificar que el token sea auténtico y no haya expirado
        const payloadDecodificado = jwt.verify(token, SECRET_KEY);
        
        // 3. Guardamos los datos del usuario en la petición y lo dejamos pasar
        req.usuario = payloadDecodificado;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};
