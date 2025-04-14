const Photo = require('../models/Photo');
const cloudinary = require('../config/cloudinary');

const photoController = {
  createPhoto: async (req, res) => {
    try {
      const { title, description, user_id } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ message: 'Nenhuma imagem enviada' });
      }

      const photo = await Photo.create(
        title, 
        description, 
        req.file.path,
        user_id
      );
      
      res.status(201).json({
        success: true,
        photo,
        message: 'Foto criada com sucesso'
      });

    } catch (error) {
      console.error('Erro ao criar foto:', error);
      res.status(500).json({
        success: false,
        message: 'Falha ao criar foto',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },
  getAllPhotos: async (req, res) => {
    try {
      const photos = await Photo.findAll();
      res.status(200).json({
        success: true,
        count: photos.length,
        photos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Falha ao carregar fotos'
      });
    }
  },

  getPhotoById: async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.id);
      
      if (!photo) {
        return res.status(404).json({
          success: false,
          message: 'Foto não encontrada'
        });
      }
      
      res.status(200).json({
        success: true,
        photo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Falha ao carregar foto'
      });
    }
  },

  updatePhoto: async (req, res) => {
    try {
      const updatedPhoto = await Photo.update(
        req.params.id,
        req.body.title,
        req.body.description
      );
      
      res.status(200).json({
        success: true,
        photo: updatedPhoto,
        message: 'Foto atualizada com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Falha ao atualizar foto'
      });
    }
  },

  deletePhoto: async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.id);
      
      if (!photo) {
        return res.status(404).json({
          success: false,
          message: 'Foto não encontrada'
        });
      }

      const publicId = photo.image_url.split('/').slice(-2).join('/').split('.')[0];
      
      await Photo.delete(req.params.id);
      
      res.status(200).json({
        success: true,
        message: 'Foto deletada com sucesso'
      });
    } catch (error) {
      console.error('Erro ao deletar foto:', error);
      res.status(500).json({
        success: false,
        message: 'Falha ao deletar foto'
      });
    }
  },

  getPhotosByUser: async (req, res) => {
    try {
      const photos = await Photo.findByUserId(req.params.userId);
      res.status(200).json({
        success: true,
        count: photos.length,
        photos
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Falha ao carregar fotos do usuário'
      });
    }
  }
};

module.exports = photoController;