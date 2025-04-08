// models/Comment.js
const pool = require('../config/db');

const Comment = {
  // Criar um novo comentário
  create: async (content, user_id, photo_id) => {
    const query = `
      INSERT INTO comments (content, user_id, photo_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [content, user_id, photo_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Buscar todos os comentários de uma foto
  findByPhotoId: async (photo_id) => {
    const query = 'SELECT * FROM comments WHERE photo_id = $1;';
    const { rows } = await pool.query(query, [photo_id]);
    return rows;
  },

  // Excluir um comentário
  delete: async (id) => {
    const query = 'DELETE FROM comments WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};

module.exports = Comment;