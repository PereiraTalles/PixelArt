require('dotenv').config();
const cloudinary = require('cloudinary').v2;

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Credenciais do Cloudinary não configuradas no .env');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true 
});

cloudinary.api.ping()
  .then(() => console.log('✅ Conexão com Cloudinary estabelecida'))
  .catch(err => console.error('❌ Erro ao conectar ao Cloudinary:', err.message));

module.exports = cloudinary;