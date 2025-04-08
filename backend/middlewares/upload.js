// Importa o Multer, que é um middleware para lidar com uploads de arquivos
const multer = require('multer');

// Importa o SDK do Cloudinary (versão 2)
const cloudinary = require('cloudinary').v2;

// Importa o CloudinaryStorage, que é uma integração do Multer com o Cloudinary
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuração do Multer com Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Passa a instância configurada do Cloudinary
  params: {
    folder: 'galeriabrasil', // Define a pasta no Cloudinary onde as imagens serão armazenadas
    allowed_formats: ['jpg', 'jpeg', 'png'], // Define os formatos de imagem permitidos
  },
});

// Cria uma instância do Multer com a configuração de armazenamento no Cloudinary
const upload = multer({ storage: storage });

// Exporta o middleware de upload para ser usado em outras partes do projeto
module.exports = upload;