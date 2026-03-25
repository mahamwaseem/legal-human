import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminSettings.css';

const API_BASE = 'http://localhost:5000/api';

export default function AdminSettings() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Check if admin is authenticated
    const token = localStorage.getItem('admin-token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate new password
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password.');
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
        setSuccess('✅ Password changed successfully! Redirecting...');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        // Clear auth token and redirect to login
        setTimeout(() => {
          localStorage.removeItem('admin-token');
          localStorage.removeItem('admin-login-time');
          navigate('/admin/login');
        }, 1500);
      } else {
        setError(result.message || 'Failed to change password');
      }
    } catch (err) {
      console.error('Password change error:', err);
      setError('Error connecting to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-settings page-enter">
      <div className="admin-settings__container">
        <div className="admin-settings__header">
          <button onClick={() => navigate('/admin')} className="admin-settings__back">
            ← Back to Dashboard
          </button>
        </div>

        <div className="admin-settings__card">
          <div className="admin-settings__title-section">
            <h1 className="admin-settings__title">Admin Settings</h1>
            <p className="admin-settings__subtitle">Change your admin password</p>
          </div>

          <form onSubmit={handleChangePassword} className="admin-settings__form">
            {error && <div className="admin-settings__error">{error}</div>}
            {success && <div className="admin-settings__success">{success}</div>}

            <div className="admin-settings__field">
              <label htmlFor="currentPassword" className="admin-settings__label">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="admin-settings__input"
                disabled={isLoading}
                required
              />
            </div>

            <div className="admin-settings__field">
              <label htmlFor="newPassword" className="admin-settings__label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min. 6 characters)"
                className="admin-settings__input"
                disabled={isLoading}
                required
              />
            </div>

            <div className="admin-settings__field">
              <label htmlFor="confirmPassword" className="admin-settings__label">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
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
              {isLoading ? 'Updating...' : 'Change Password'}
            </button>
          </form>

          <div className="admin-settings__info">
            <h3 className="admin-settings__info-title">Default Password</h3>
            <p className="admin-settings__info-text">
              If you haven't changed your password yet, the default password is: <code>LegalAdmin@2024</code>
            </p>
            <p className="admin-settings__info-note">
              We recommend changing the password immediately for security reasons.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
