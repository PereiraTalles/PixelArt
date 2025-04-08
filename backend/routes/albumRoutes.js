// routes/albumRoutes.js
const express = require('express');
const albumController = require('../controllers/albumController');

const router = express.Router();

// Criar um novo álbum
router.post('/', albumController.createAlbum);

// Buscar todos os álbuns
router.get('/', albumController.getAllAlbums);

// Buscar um álbum pelo ID
router.get('/:id', albumController.getAlbumById);

// Atualizar um álbum
router.put('/:id', albumController.updateAlbum);

// Excluir um álbum
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;