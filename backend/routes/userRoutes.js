// Importa o framework Express para criar as rotas
const express = require('express');

// Importa o controlador de usuários, que contém a lógica das operações
const userController = require('../controllers/userController');

// Cria um roteador do Express
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', userController.register);

// Rota para fazer login
router.post('/login', userController.login);

// Rota para buscar um usuário pelo ID
router.get('/:id', userController.getUserById);

// Rota para atualizar um usuário
router.put('/:id', userController.updateUser);

// Rota para excluir um usuário
router.delete('/:id', userController.deleteUser);

// Exporta o roteador para ser usado em outras partes do projeto (ex: server.js)
module.exports = router;