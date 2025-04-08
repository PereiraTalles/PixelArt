// routes/likeRoutes.js
const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

// Curtir uma foto
router.post('/', likeController.likePhoto);

// Descurtir uma foto
router.delete('/', likeController.unlikePhoto);

// Verificar se o usuário curtiu a foto
router.get('/check/:user_id/:photo_id', likeController.checkLike);

module.exports = router;