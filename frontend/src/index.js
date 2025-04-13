import React from 'react';
import { createRoot } from 'react-dom/client'; // <- Forma atualizada
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // Cria a raiz

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);