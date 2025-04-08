// Importa a configuração do Cloudinary para upload de imagens
const cloudinary = require('../config/cloudinary');

// Importa o modelo Photo, que contém as operações de banco de dados para fotos
const Photo = require('../models/Photo');

// Importa o middleware de upload (Multer + Cloudinary)
const upload = require('../middlewares/upload');

// Define o controlador de fotos
const photoController = {
  // Criar uma nova foto
  createPhoto: [
    upload.single('image'), // Middleware para processar o upload de uma única imagem (campo 'image')
    async (req, res) => {
      const { title, description, user_id } = req.body; // Extrai os dados do corpo da requisição

      try {
        // Faz o upload da imagem para o Cloudinary, usando o caminho local da imagem
        const result = await cloudinary.uploader.upload(req.file.path);

        // Obtém a URL segura da imagem hospedada no Cloudinary
        const image_url = result.secure_url;

        // Cria uma nova foto no banco de dados com a URL da imagem no Cloudinary
        const photo = await Photo.create(title, description, image_url, user_id);

        // Retorna a foto criada com status 201 (Created)
        res.status(201).json(photo);
      } catch (error) {
        // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ message: 'Erro ao criar foto', error });
      }
    },
  ],

  // Buscar todas as fotos
  getAllPhotos: async (req, res) => {
    try {
      // Busca todas as fotos no banco de dados
      const photos = await Photo.findAll();

      // Retorna a lista de fotos com status 200 (OK)
      res.status(200).json(photos);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao buscar fotos', error });
    }
  },

  // Buscar uma foto pelo ID
  getPhotoById: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    try {
      // Busca a foto pelo ID
      const photo = await Photo.findById(id);

      // Verifica se a foto foi encontrada
      if (!photo) {
        return res.status(404).json({ message: 'Foto não encontrada' }); // Retorna erro 404 (Not Found)
      }

      // Retorna a foto encontrada com status 200 (OK)
      res.status(200).json(photo);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao buscar foto', error });
    }
  },

  // Atualizar uma foto
  updatePhoto: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    const { title, description } = req.body; // Extrai os dados do corpo da requisição
    try {
      // Atualiza a foto no banco de dados
      const updatedPhoto = await Photo.update(id, title, description);

      // Retorna a foto atualizada com status 200 (OK)
      res.status(200).json(updatedPhoto);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao atualizar foto', error });
    }
  },

  // Excluir uma foto
  deletePhoto: async (req, res) => {
    const { id } = req.params; // Extrai o ID dos parâmetros da requisição
    try {
      // Exclui a foto do banco de dados
      const deletedPhoto = await Photo.delete(id);

      // Retorna a foto excluída com status 200 (OK)
      res.status(200).json(deletedPhoto);
    } catch (error) {
      // Se houver erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
      res.status(500).json({ message: 'Erro ao excluir foto', error });
    }
  },
};

// Exporta o controlador de fotos para ser usado em outras partes do projeto
module.exports = photoController;