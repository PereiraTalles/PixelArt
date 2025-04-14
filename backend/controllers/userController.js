const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Helper para gerar token
const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = {
  // Registro de novo usuário
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Validações básicas
      if (!name || !email || !password) {
        return res.status(400).json({ 
          success: false,
          message: 'Todos os campos são obrigatórios' 
        });
      }

      // Verifica se usuário já existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ 
          success: false,
          message: 'Email já cadastrado' 
        });
      }

      // Cria usuário
      const newUser = await User.create(name, email, password);
      const token = generateToken(newUser.id, newUser.email);

      res.status(201).json({
        success: true,
        user: newUser,
        token,
        message: 'Cadastro realizado com sucesso!'
      });

    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({
        success: false,
        message: 'Erro no servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Verifica credenciais
      const isValid = await User.verifyCredentials(email, password);
      if (!isValid) {
        return res.status(401).json({ 
          success: false,
          message: 'Email ou senha incorretos' 
        });
      }

      // Gera token
      const user = await User.findByEmail(email);
      const token = generateToken(user.id, user.email);

      res.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        success: false,
        message: 'Erro no servidor'
      });
    }
  },

  // Obter perfil
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ 
          success: false,
          message: 'Usuário não encontrado' 
        });
      }
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao buscar usuário' 
      });
    }
  },

  // Atualizar perfil
  updateProfile: async (req, res) => {
    try {
      const updates = req.body;
      const updatedUser = await User.update(req.user.userId, updates);
      
      res.json({
        success: true,
        user: updatedUser,
        message: 'Perfil atualizado!'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao atualizar perfil' 
      });
    }
  },

  // Deletar conta
  deleteAccount: async (req, res) => {
    try {
      await User.delete(req.user.userId);
      res.json({ 
        success: true,
        message: 'Conta removida com sucesso' 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Erro ao remover conta' 
      });
    }
  }
};