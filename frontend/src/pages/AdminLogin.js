import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';

const API_BASE = 'http://localhost:5000/api';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const result = await response.json();

      if (result.success) {
        // Save auth token to localStorage
        localStorage.setItem('admin-token', result.token);
        localStorage.setItem('admin-login-time', new Date().toISOString());
        navigate('/admin');
      } else {
        setError(result.message || 'Invalid password. Please try again.');
        setPassword('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error connecting to server. Please try again.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-login page-enter">
      <div className="admin-login__container">
        <div className="admin-login__card">
          <div className="admin-login__header">
            <h1 className="admin-login__title">Admin Panel</h1>
            <p className="admin-login__subtitle">Legal Human Management System</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login__form">
            {error && <div className="admin-login__error">{error}</div>}

            <div className="admin-login__field">
              <label htmlFor="password" className="admin-login__label">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="admin-login__input"
                disabled={isLoading}
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="admin-login__btn"
              disabled={isLoading || !password}
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          
        </div>
      </div>
    </main>
  );
}
