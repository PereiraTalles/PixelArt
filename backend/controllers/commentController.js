// Importa o modelo Comment, que contém as operações de banco de dados para comentários
const Comment = require('../models/Comment');

// Define o controlador de comentários
const commentController = {
  // Criar um novo comentário
  createComment: async (req, res) => {
    const { content, user_id, photo_id } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Cria um novo comentário no banco de dados
      const comment = await Comment.create(content, user_id, photo_id);

      // Retorna o comentário criado com status 201 (Created)
      res.status(201).json(comment);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao criar comentário', error });
    }
  },

  // Buscar todos os comentários de uma foto
  getCommentsByPhotoId: async (req, res) => {
    const { photo_id } = req.params; // Extrai o ID da foto dos parâmetros da requisição
    try {
      // Busca todos os comentários associados à foto
      const comments = await Comment.findByPhotoId(photo_id);

      // Retorna a lista de comentários com status 200 (OK)
      res.status(200).json(comments);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao buscar comentários', error });
    }
  },

  // Excluir um comentário
  deleteComment: async (req, res) => {
    const { id } = req.params; // Extrai o ID do comentário dos parâmetros da requisição
    try {
      // Exclui o comentário do banco de dados
      const deletedComment = await Comment.delete(id);

      // Retorna o comentário excluído com status 200 (OK)
      res.status(200).json(deletedComment);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao excluir comentário', error });
    }
  },
};

// Exporta o controlador de comentários para ser usado em outras partes do projeto
module.exports = commentController;