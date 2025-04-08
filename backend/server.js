// Importa o framework Express para criar o servidor
const express = require('express');

// Importa o middleware CORS para permitir requisições de diferentes origens para o frontend
const cors = require('cors');

// Importa o dotenv para carregar variáveis de ambiente do arquivo .env
const dotenv = require('dotenv');

// Importa as rotas da API
const userRoutes = require('./routes/userRoutes'); // Rotas relacionadas a usuários
const photoRoutes = require('./routes/photoRoutes'); // Rotas relacionadas a fotos
const albumRoutes = require('./routes/albumRoutes'); // Rotas relacionadas a álbuns
const commentRoutes = require('./routes/commentRoutes'); // Rotas relacionadas a comentários
const likeRoutes = require('./routes/likeRoutes'); // Rotas relacionadas a curtidas

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria uma instância do Express
const app = express();

// Middlewares
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

// Rotas da API
app.use('/api/users', userRoutes); // Define as rotas de usuários sob o prefixo /api/users
app.use('/api/photos', photoRoutes); // Define as rotas de fotos sob o prefixo /api/photos
app.use('/api/albums', albumRoutes); // Define as rotas de álbuns sob o prefixo /api/albums
app.use('/api/comments', commentRoutes); // Define as rotas de comentários sob o prefixo /api/comments
app.use('/api/likes', likeRoutes); // Define as rotas de curtidas sob o prefixo /api/likes

// Rota de teste para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Backend da GaleriaBrasil está rodando!'); // Responde com uma mensagem simples
});

// Define a porta do servidor
const PORT = process.env.PORT || 5000; // Usa a porta definida no .env ou a porta 5000 como padrão

// Inicia o servidor e escuta na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); // Exibe uma mensagem no console quando o servidor inicia
});