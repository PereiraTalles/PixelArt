// models/Photo.js
const pool = require('../config/db');

const Photo = {
  // Criar uma nova foto
  create: async (title, description, image_url, user_id) => {
    const query = `
      INSERT INTO photos (title, description, image_url, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [title, description, image_url, user_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Buscar todas as fotos
  findAll: async () => {
    const query = 'SELECT * FROM photos;';
    const { rows } = await pool.query(query);
    return rows;
  },

  // Buscar uma foto pelo ID
  findById: async (id) => {
    const query = 'SELECT * FROM photos WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // Atualizar uma foto
  update: async (id, title, description) => {
    const query = `
      UPDATE photos
      SET title = $1, description = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [title, description, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Excluir uma foto
  delete: async (id) => {
    const query = 'DELETE FROM photos WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};

module.exports = Photo;