// Importa o framework Express para criar as rotas
const express = require('express');

// Importa o controlador de fotos, que contém a lógica das operações
const photoController = require('../controllers/photoController');

// Cria um roteador do Express
const router = express.Router();

// Rota para criar uma nova foto
router.post('/', photoController.createPhoto);

// Rota para buscar todas as fotos
router.get('/', photoController.getAllPhotos);

// Rota para buscar uma foto pelo ID
router.get('/:id', photoController.getPhotoById);

// Rota para atualizar uma foto
router.put('/:id', photoController.updatePhoto);

// Rota para excluir uma foto
router.delete('/:id', photoController.deletePhoto);

// Exporta o roteador para ser usado em outras partes do projeto (ex: server.js)
module.exports = router;