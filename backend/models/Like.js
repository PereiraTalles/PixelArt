// models/Like.js
const pool = require('../config/db');

const Like = {
  // Adicionar uma curtida
  create: async (user_id, photo_id) => {
    const query = `
      INSERT INTO likes (user_id, photo_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [user_id, photo_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Remover uma curtida
  delete: async (user_id, photo_id) => {
    const query = `
      DELETE FROM likes
      WHERE user_id = $1 AND photo_id = $2
      RETURNING *;
    `;
    const values = [user_id, photo_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Verificar se o usuário já curtiu a foto
  findByUserAndPhoto: async (user_id, photo_id) => {
    const query = `
      SELECT * FROM likes
      WHERE user_id = $1 AND photo_id = $2;
    `;
    const values = [user_id, photo_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
};

module.exports = Like;