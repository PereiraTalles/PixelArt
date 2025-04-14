import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const baseUrl = 'http://localhost:5000'; 
      const endpoint = isLogin ? '/api/users/login' : '/api/users/register';
      const url = baseUrl + endpoint;
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro na autenticação');
      }
      if (!data.token) {
        throw new Error('Token não recebido do servidor');
      }

      localStorage.setItem('token', data.token);
      navigate('/album');
      
    } catch (err) {
      console.error('Erro:', err);
      setError(err.message || 'Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              minLength="6"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            {isLogin ? 'To enter' : 'Register'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? 'Create a new account ' : 'Already have an account? '}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-button"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;