const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // Obtém token do header
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Acesso não autorizado' 
    });
  }

  // Verifica token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        message: 'Token inválido ou expirado' 
      });
    }
    
    req.user = decoded; // Adiciona dados do usuário à requisição
    next();
  });
};