const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'mi_secreto';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No autorizado (falta token)' });
  }
  
  const token = authHeader.split(' ')[1]; // Formato "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'No autorizado (token inválido)' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach userId (y cualquier otro dato) a la request
    req.user = decoded;  // { userId: 123, email: '...' }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
