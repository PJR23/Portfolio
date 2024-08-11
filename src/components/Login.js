import React, { useState } from 'react';
import axios from 'axios';
import Particle from './Particle'; // Importiere die Partikel-Komponente
import { Container } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { useTranslation } from 'react-i18next';

function Login({ setToken, particlesEnabled }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //const API_BASE_URL =  'http://localhost:3000'; 
  const API_BASE_URL =  process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, { username, password });
      localStorage.setItem('token', response.data.token); // Token speichern
      setToken(response.data.token); // Token setzen
    } catch (err) {
      console.error('Login Error:', err.response ? err.response.data : err.message);
      setError(t('login_error')); // Verwende die übersetzte Fehlermeldung
    }
  };

  return (
    <Container fluid className="resume-section">
      {particlesEnabled && <Particle />} 
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h1>{t('login_title')}</h1>
            <div>
              <label>{t('username')}</label>
              <input
                type="text"
                value={username}
                placeholder={t('username_placeholder')}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>{t('password')}</label>
              <input
                type="password"
                value={password}
                placeholder={t('password_placeholder')}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              className="button"
            >
              {t('login_button')}
            </Button>
            {error && <p>{error}</p>}
          </form>
        </div>
    </Container>
  );
}

export default Login;
