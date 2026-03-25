import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminSettings.css';
import { useLang } from '../context/LanguageContext';

const API_BASE = 'http://localhost:5000/api';

export default function AdminSettings() {
  const navigate = useNavigate();
  const { t } = useLang(); // ✅ ADDED

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('admin-token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError(t.adminSettings.errors.length);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t.adminSettings.errors.match);
      return;
    }

    if (currentPassword === newPassword) {
      setError(t.adminSettings.errors.same);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword
        })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(t.adminSettings.success);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          localStorage.removeItem('admin-token');
          localStorage.removeItem('admin-login-time');
          navigate('/admin/login');
        }, 1500);
      } else {
        setError(result.message || t.adminSettings.errors.failed);
      }
    } catch (err) {
      console.error(err);
      setError(t.adminSettings.errors.server);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-settings page-enter">
      <div className="admin-settings__container">

        <div className="admin-settings__header">
          <button
            onClick={() => navigate('/admin')}
            className="admin-settings__back"
          >
            ← {t.adminSettings.back}
          </button>
        </div>

        <div className="admin-settings__card">

          <div className="admin-settings__title-section">
            <h1 className="admin-settings__title">
              {t.adminSettings.title}
            </h1>
            <p className="admin-settings__subtitle">
              {t.adminSettings.subtitle}
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="admin-settings__form">
            {error && <div className="admin-settings__error">{error}</div>}
            {success && <div className="admin-settings__success">{success}</div>}

            <div className="admin-settings__field">
              <label className="admin-settings__label">
                {t.adminSettings.current}
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={t.adminSettings.placeholders.current}
                className="admin-settings__input"
                disabled={isLoading}
                required
              />
            </div>

            <div className="admin-settings__field">
              <label className="admin-settings__label">
                {t.adminSettings.new}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t.adminSettings.placeholders.new}
                className="admin-settings__input"
                disabled={isLoading}
                required
              />
            </div>

            <div className="admin-settings__field">
              <label className="admin-settings__label">
                {t.adminSettings.confirm}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t.adminSettings.placeholders.confirm}
                className="admin-settings__input"
                disabled={isLoading}
                required
              />
            </div>

            <button
              type="submit"
              className="admin-settings__btn"
              disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
            >
              {isLoading ? t.adminSettings.loading : t.adminSettings.button}
            </button>
          </form>

          <div className="admin-settings__info">
            <h3 className="admin-settings__info-title">
              {t.adminSettings.defaultTitle}
            </h3>
            <p className="admin-settings__info-text">
              {t.adminSettings.defaultText} <code>LegalAdmin@2024</code>
            </p>
            <p className="admin-settings__info-note">
              {t.adminSettings.note}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}