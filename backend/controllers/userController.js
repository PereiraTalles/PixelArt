// Importa o modelo User, que contém as operações de banco de dados para usuários
const User = require('../models/User');

// Define o controlador de usuários
const userController = {
  // Registrar um novo usuário
  register: async (req, res) => {
    const { name, email, password } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Cria um novo usuário no banco de dados
      const user = await User.create(name, email, password);
      // Retorna o usuário criado com status 201 (Created)
      res.status(201).json(user);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
  },

  // Fazer login
  login: async (req, res) => {
    const { email, password } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Busca o usuário pelo e-mail
      const user = await User.findByEmail(email);
      // Verifica se o usuário existe e se a senha está correta
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'E-mail ou senha incorretos' }); // Retorna erro 401 (Unauthorized)
      }
      // Retorna o usuário com status 200 (OK)
      res.status(200).json(user);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao fazer login', error });
    }
  },

  // Buscar um usuário pelo ID
  getUserById: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    try {
      // Busca o usuário pelo ID
      const user = await User.findById(id);
      // Verifica se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' }); // Retorna erro 404 (Not Found)
      }
      // Retorna o usuário com status 200 (OK)
      res.status(200).json(user);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao buscar usuário', error });
    }
  },

  // Atualizar um usuário
  updateUser: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    const { name, email } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Atualiza o usuário no banco de dados
      const updatedUser = await User.update(id, name, email);
      // Retorna o usuário atualizado com status 200 (OK)
      res.status(200).json(updatedUser);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
  },

  // Excluir um usuário
  deleteUser: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    try {
      // Exclui o usuário do banco de dados
      const deletedUser = await User.delete(id);
      // Retorna o usuário excluído com status 200 (OK)
      res.status(200).json(deletedUser);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao excluir usuário', error });
    }
  },
};

// Exporta o controlador de usuários para ser usado em outras partes do projeto
module.exports = userController;