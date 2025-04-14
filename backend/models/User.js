const pool = require('../config/db');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const User = {
  // Cria usuário com senha criptografada
  create: async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const query = `
      INSERT INTO users (name, email, password, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, name, email, created_at;
    `;
    const { rows } = await pool.query(query, [name, email, hashedPassword]);
    return rows[0];
  },

  // Busca por email (com verificação de senha)
  findByEmail: async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1 LIMIT 1;';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  // Busca por ID (sem senha)
  findById: async (id) => {
    const query = 'SELECT id, name, email, created_at FROM users WHERE id = $1;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // Atualiza dados (com validação opcional de senha)
  update: async (id, updates) => {
    const { name, email, password } = updates;
    let query, values;
    
    if (password) {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      query = `
        UPDATE users 
        SET name = $1, email = $2, password = $3 
        WHERE id = $4 
        RETURNING id, name, email;
      `;
      values = [name, email, hashedPassword, id];
    } else {
      query = `
        UPDATE users 
        SET name = $1, email = $2 
        WHERE id = $3 
        RETURNING id, name, email;
      `;
      values = [name, email, id];
    }

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Remove usuário
  delete: async (id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id;';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  // Verifica credenciais
  verifyCredentials: async (email, password) => {
    const user = await User.findByEmail(email);
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
  }
};

module.exports = User;