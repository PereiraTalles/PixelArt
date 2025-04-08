// routes/commentRoutes.js
const express = require('express');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Criar um novo comentário
router.post('/', commentController.createComment);

// Buscar todos os comentários de uma foto
router.get('/photo/:photo_id', commentController.getCommentsByPhotoId);

// Excluir um comentário
router.delete('/:id', commentController.deleteComment);

module.exports = router;