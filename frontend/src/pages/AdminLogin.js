import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import '../styles/AdminLogin.css';

const API_BASE = 'http://localhost:5000/api';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useLang();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    // ✅ Auto redirect if already logged in
    const token = localStorage.getItem('admin-token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

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
        // ✅ Save token
        localStorage.setItem('admin-token', result.token);
        localStorage.setItem('admin-login-time', new Date().toISOString());

        // ✅ Redirect FIXED
        navigate('/admin/dashboard');
      } else {
        setError(result.message || t.adminLogin.error);
        setPassword('');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t.adminLogin.error);
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
            <h1 className="admin-login__title">{t.adminLogin.title}</h1>
            <p className="admin-login__subtitle">{t.adminLogin.subtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login__form">

            {error && <div className="admin-login__error">{error}</div>}

            <div className="admin-login__field">
              <label htmlFor="password" className="admin-login__label">
                {t.adminLogin.passwordLabel}
              </label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.adminLogin.placeholder}
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
              {isLoading ? t.adminLogin.loading : t.adminLogin.button}
            </button>

          </form>

        </div>
      </div>
    </main>
  );
}