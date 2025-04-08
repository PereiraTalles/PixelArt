// Importa a classe Pool do pacote 'pg' para gerenciar a conexão com o PostgreSQL
const { Pool } = require('pg');

// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres', // Usuário do PostgreSQL (usa o valor do .env ou 'postgres' como padrão)
  host: process.env.DB_HOST || 'localhost', // Endereço do banco de dados (usa o valor do .env ou 'localhost' como padrão)
  database: process.env.DB_NAME || 'galeriabrassil', // Nome do banco de dados (usa o valor do .env ou 'galeriabrassil' como padrão)
  password: process.env.DB_PASSWORD || 'sua_senha', // Senha do usuário (usa o valor do .env ou 'sua_senha' como padrão)
  port: process.env.DB_PORT || 5432, // Porta do PostgreSQL (usa o valor do .env ou 5432 como padrão)
});

// Testar a conexão com o banco de dados
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    // Se houver erro, exibe uma mensagem de erro no console
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    // Se a conexão for bem-sucedida, exibe a data e hora atuais
    console.log('Conexão com o banco de dados estabelecida:', res.rows[0]);
  }
});

// Exporta o pool de conexões para ser usado em outros arquivos
module.exports = pool;