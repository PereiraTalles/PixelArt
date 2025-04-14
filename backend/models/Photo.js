const pool = require('../config/db');

const Photo = {
  create: async (title, description, image_url, user_id) => {
    const query = `
      INSERT INTO photos (title, description, image_url, user_id, created_at)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *;
    `;
    const values = [title, description, image_url, user_id];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error('Erro ao criar foto:', error);
      throw new Error('Falha ao criar foto no banco de dados');
    }
  },

  findAll: async () => {
    const query = `
      SELECT id, title, description, image_url, user_id, created_at
      FROM photos
      ORDER BY created_at DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  findById: async (id) => {
    const query = `
      SELECT id, title, description, image_url, user_id, created_at
      FROM photos
      WHERE id = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  },

  update: async (id, title, description) => {
    const query = `
      UPDATE photos
      SET title = $1, description = $2, updated_at = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const values = [title, description, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id) => {
    const photo = await Photo.findById(id);
    if (!photo) return null;

    const query = 'DELETE FROM photos WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    
    return {
      deletedPhoto: rows[0],
      imageUrl: photo.image_url 
    };
  },

  findByUserId: async (user_id) => {
    const query = 'SELECT * FROM photos WHERE user_id = $1 ORDER BY created_at DESC;';
    const { rows } = await pool.query(query, [user_id]);
    return rows;
  }
};

module.exports = Photo;