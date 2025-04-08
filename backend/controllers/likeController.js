// Importa o modelo Like, que contém as operações de banco de dados para curtidas
const Like = require('../models/Like');

// Define o controlador de curtidas
const likeController = {
  // Curtir uma foto
  likePhoto: async (req, res) => {
    const { user_id, photo_id } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Cria uma nova curtida no banco de dados
      const like = await Like.create(user_id, photo_id);

      // Retorna a curtida criada com status 201 (Created)
      res.status(201).json(like);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao curtir foto', error });
    }
  },

  // Descurtir uma foto
  unlikePhoto: async (req, res) => {
    const { user_id, photo_id } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Remove a curtida do banco de dados
      const like = await Like.delete(user_id, photo_id);

      // Retorna a curtida removida com status 200 (OK)
      res.status(200).json(like);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao descurtir foto', error });
    }
  },

  // Verificar se o usuário curtiu a foto
  checkLike: async (req, res) => {
    const { user_id, photo_id } = req.params; // Extrai os IDs dos parâmetros da requisição
    try {
      // Busca a curtida no banco de dados
      const like = await Like.findByUserAndPhoto(user_id, photo_id);

      // Retorna um objeto indicando se o usuário curtiu a foto (true/false)
      res.status(200).json({ liked: !!like });
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao verificar curtida', error });
    }
  },
};

// Exporta o controlador de curtidas para ser usado em outras partes do projeto
module.exports = likeController;