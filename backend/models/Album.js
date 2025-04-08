// models/Album.js
const pool = require('../config/db');

const Album = {
  // Criar um novo álbum
  create: async (name, description, user_id) => {
    const query = `
      INSERT INTO albums (name, description, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, description, user_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Buscar todos os álbuns
  findAll: async () => {
    const query = 'SELECT * FROM albums;';
    const { rows } = await pool.query(query);
    return rows;
  },

  // Buscar um álbum pelo ID
  findById: async (id) => {
    const query = 'SELECT * FROM albums WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // Atualizar um álbum
  update: async (id, name, description) => {
    const query = `
      UPDATE albums
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [name, description, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Excluir um álbum
  delete: async (id) => {
    const query = 'DELETE FROM albums WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};

module.exports = Album;