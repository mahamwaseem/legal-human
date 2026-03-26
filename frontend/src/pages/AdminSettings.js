import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import '../styles/AdminDashboard.css'; // ✅ SAME SIDEBAR CSS
import '../styles/AdminSettings.css';

const API_BASE = 'http://localhost:5000/api';

export default function AdminSettings() {
  const navigate = useNavigate();
  const { t } = useLang();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-login-time');
    navigate('/');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError(t.adminSettings.errors.short);
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
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(t.adminSettings.success);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          handleLogout();
        }, 1500);
      } else {
        setError(result.message || t.adminSettings.errors.fail);
      }
    } catch (err) {
      setError(t.adminSettings.errors.server);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard__wrapper">

        {/* ✅ SAME SIDEBAR */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar__header">
            <div className="admin-sidebar__text">
              <h2>LEGAL HUMAN</h2>
              <p>{t.adminDashboard.sidebar.panel}</p>
            </div>
          </div>

          <nav className="admin-sidebar__nav">
            <a
              onClick={() => navigate('/admin')}
              className="admin-sidebar__nav-item"
            >
              {t.adminDashboard.sidebar.dashboard}
            </a>

            <a className="admin-sidebar__nav-item active">
              {t.adminDashboard.sidebar.settings}
            </a>
          </nav>

          <button onClick={handleLogout} className="admin-sidebar__logout">
            {t.adminDashboard.sidebar.logout}
          </button>
        </aside>

        {/* ✅ CONTENT */}
        <div className="admin-dashboard__content">
          <div className="admin-settings__container">

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
                    className="admin-settings__input"
                    disabled={isLoading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="admin-settings__btn"
                  disabled={isLoading}
                >
                  {isLoading ? t.adminSettings.loading : t.adminSettings.button}
                </button>

              </form>

              
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}