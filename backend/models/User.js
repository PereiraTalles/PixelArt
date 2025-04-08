// models/User.js
const pool = require('../config/db');

const User = {
  // Criar um novo usuário
  create: async (name, email, password) => {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Buscar um usuário pelo e-mail
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  // Buscar um usuário pelo ID
  findById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // Atualizar um usuário
  update: async (id, name, email) => {
    const query = `
      UPDATE users
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [name, email, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Excluir um usuário
  delete: async (id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};

module.exports = User;