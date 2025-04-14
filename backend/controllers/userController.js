const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await User.create(name, email, password);
      
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback_secret_key',
        { expiresIn: '1h' }
      );

      res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email
          // Não inclua a senha!
        },
        token
      });
    } catch (error) {
      if (error.message.includes('duplicate')) {
        return res.status(400).json({ message: 'E-mail já cadastrado' });
      }
      res.status(500).json({ 
        message: 'Erro ao registrar usuário',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback_secret_key',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        },
        token
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Erro no servidor ao fazer login',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      const { password, ...safeUser } = user;
      res.status(200).json(safeUser);
    } catch (error) {
      res.status(500).json({ 
        message: 'Erro ao buscar usuário',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      if (req.user.userId !== id) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      const updatedUser = await User.update(id, name, email);
      res.status(200).json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Erro ao atualizar usuário',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      if (req.user.userId !== id) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      await User.delete(id);
      res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Erro ao excluir usuário',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }
};

module.exports = userController;