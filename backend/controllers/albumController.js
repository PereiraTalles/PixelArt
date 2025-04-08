// Importa o modelo Album, que contém as operações de banco de dados para álbuns
const Album = require('../models/Album');

// Define o controlador de álbuns
const albumController = {
  // Criar um novo álbum
  createAlbum: async (req, res) => {
    const { name, description, user_id } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Cria um novo álbum no banco de dados
      const album = await Album.create(name, description, user_id);

      // Retorna o álbum criado com status 201 (Created)
      res.status(201).json(album);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao criar álbum', error });
    }
  },

  // Buscar todos os álbuns
  getAllAlbums: async (req, res) => {
    try {
      // Busca todos os álbuns no banco de dados
      const albums = await Album.findAll();

      // Retorna a lista de álbuns com status 200 (OK)
      res.status(200).json(albums);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao buscar álbuns', error });
    }
  },

  // Buscar um álbum pelo ID
  getAlbumById: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    try {
      // Busca o álbum pelo ID
      const album = await Album.findById(id);

      // Verifica se o álbum foi encontrado
      if (!album) {
        return res.status(404).json({ message: 'Álbum não encontrado' }); // Retorna erro 404 (Not Found)
      }

      // Retorna o álbum encontrado com status 200 (OK)
      res.status(200).json(album);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao buscar álbum', error });
    }
  },

  // Atualizar um álbum
  updateAlbum: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    const { name, description } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Atualiza o álbum no banco de dados
      const updatedAlbum = await Album.update(id, name, description);

      // Retorna o álbum atualizado com status 200 (OK)
      res.status(200).json(updatedAlbum);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao atualizar álbum', error });
    }
  },

  // Excluir um álbum
  deleteAlbum: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    try {
      // Exclui o álbum do banco de dados
      const deletedAlbum = await Album.delete(id);

      // Retorna o álbum excluído com status 200 (OK)
      res.status(200).json(deletedAlbum);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao excluir álbum', error });
    }
  },
};

// Exporta o controlador de álbuns para ser usado em outras partes do projeto
module.exports = albumController;