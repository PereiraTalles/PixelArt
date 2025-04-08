// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o SDK do Cloudinary (versão 2)
const cloudinary = require('cloudinary').v2;

// Configura o Cloudinary com as credenciais fornecidas no arquivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Nome da nuvem no Cloudinary
  api_key: process.env.CLOUDINARY_API_KEY, // Chave de API do Cloudinary
  api_secret: process.env.CLOUDINARY_API_SECRET, // Segredo da API do Cloudinary
});

// Exporta o módulo configurado do Cloudinary para ser usado em outros arquivos
module.exports = cloudinary;