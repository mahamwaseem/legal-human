import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBanners } from '../context/BannerContext';
import '../styles/AdminDashboard.css';
import { useLang } from '../context/LanguageContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { banners, addBanner, editBanner, deleteBanner, toggleBannerStatus } = useBanners();
  const { t } = useLang(); // ✅ ADDED

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'info',
    active: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert(t.adminDashboard.alert.required); // ✅
      return;
    }

    if (editingId) {
      editBanner(editingId, formData);
      setEditingId(null);
    } else {
      addBanner(formData);
    }

    setFormData({ title: '', description: '', type: 'info', active: true });
    setShowAddForm(false);
  };

  const handleEdit = (banner) => {
    setFormData({
      title: banner.title,
      description: banner.description,
      type: banner.type,
      active: banner.active,
    });
    setEditingId(banner.id);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ title: '', description: '', type: 'info', active: true });
  };

  const filteredBanners = banners.filter(banner => {
    const matchesSearch =
      banner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      banner.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && banner.active) ||
      (filterStatus === 'inactive' && !banner.active);

    const matchesType =
      filterType === 'all' || banner.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <main className="admin-dashboard page-enter">
      <div className="admin-dashboard__wrapper">

        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar__header">
            <div className="admin-sidebar__logo">
              <svg viewBox="0 0 60 60" fill="none">
                <rect x="28" y="10" width="4" height="28" rx="2" fill="currentColor" />
                <rect x="18" y="12" width="4" height="26" rx="2" fill="currentColor" />
                <rect x="38" y="12" width="4" height="26" rx="2" fill="currentColor" />
              </svg>
            </div>
            <div className="admin-sidebar__text">
              <h2>LEGAL HUMAN</h2>
              <p>{t.adminDashboard.sidebar.panel}</p>
            </div>
          </div>

          <nav className="admin-sidebar__nav">
            <a className="admin-sidebar__nav-item active">
              {t.adminDashboard.sidebar.dashboard}
            </a>
            <a onClick={() => navigate('/admin/settings')} className="admin-sidebar__nav-item">
              {t.adminDashboard.sidebar.settings}
            </a>
          </nav>

          <button onClick={handleLogout} className="admin-sidebar__logout">
            {t.adminDashboard.sidebar.logout}
          </button>
        </aside>

        {/* Content */}
        <div className="admin-dashboard__content">
          <div className="admin-dashboard__container">

            {/* Top */}
            <div className="admin-top">
              <div>
                <h1 className="admin-top__title">{t.adminDashboard.top.title}</h1>
                <p className="admin-top__subtitle">{t.adminDashboard.top.subtitle}</p>
              </div>
              <button onClick={() => setShowAddForm(true)} className="admin-top__btn">
                + {t.adminDashboard.top.new}
              </button>
            </div>

            {/* Stats */}
            <div className="admin-stats">
              <div className="admin-stat">
                <span className="admin-stat__value">{banners.length}</span>
                <span className="admin-stat__label">
                  {t.adminDashboard.stats.total}
                </span>
              </div>

              <div className="admin-stat admin-stat--active">
                <span className="admin-stat__value">
                  {banners.filter(b => b.active).length}
                </span>
                <span className="admin-stat__label">
                  {t.adminDashboard.stats.active}
                </span>
              </div>

              <div className="admin-stat admin-stat--inactive">
                <span className="admin-stat__value">
                  {banners.filter(b => !b.active).length}
                </span>
                <span className="admin-stat__label">
                  {t.adminDashboard.stats.inactive}
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="admin-controls">
              <div className="admin-search">
                <input
                  type="text"
                  placeholder={t.adminDashboard.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search__input"
                />
              </div>

              <div className="admin-filters">
                <div className="admin-filter-group">
                  <button
                    className={`admin-filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('all')}
                  >
                    {t.adminDashboard.filters.all}
                  </button>

                  <button
                    className={`admin-filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('active')}
                  >
                    {t.adminDashboard.filters.active}
                  </button>

                  <button
                    className={`admin-filter-btn ${filterStatus === 'inactive' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('inactive')}
                  >
                    {t.adminDashboard.filters.inactive}
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            {showAddForm && (
              <div className="admin-dashboard__form-section">
                <div className="admin-form">
                  <h2 className="admin-form__title">
                    {editingId ? t.adminDashboard.form.edit : t.adminDashboard.form.add}
                  </h2>

                  <form onSubmit={handleSubmit} className="admin-form__content">

                    {/* Title */}
                    <div className="admin-form__group">
                      <label className="admin-form__label">
                        {t.adminDashboard.form.title}
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Special Offer - Free Consultation"
                        className="admin-form__input"
                        maxLength="100"
                      />
                    </div>

                    {/* Description */}
                    <div className="admin-form__group">
                      <label className="admin-form__label">
                        {t.adminDashboard.form.description}
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="admin-form__textarea"
                        rows="3"
                        maxLength="300"
                      />
                    </div>

                    {/* Type */}
                    <div className="admin-form__group">
                      <label className="admin-form__label">
                        {t.adminDashboard.form.type}
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="admin-form__select"
                      >
                        <option value="info">📢 Important Notice</option>
                        <option value="warning">⚠️ Warning</option>
                        <option value="alert">🔔 Alert</option>
                      </select>
                    </div>

                    {/* Active */}
                    <div className="admin-form__group admin-form__group--checkbox">
                      <label className="admin-form__checkbox-label">
                        <input
                          type="checkbox"
                          name="active"
                          checked={formData.active}
                          onChange={handleInputChange}
                          className="admin-form__checkbox"
                        />
                        <span>{t.adminDashboard.form.active}</span>
                      </label>
                    </div>

                    {/* Buttons */}
                    <div className="admin-form__actions">
                      <button
                        type="submit"
                        className="admin-form__btn admin-form__btn--submit"
                      >
                        {editingId
                          ? t.adminDashboard.form.update
                          : t.adminDashboard.form.create}
                      </button>

                      <button
                        type="button"
                        onClick={handleCancel}
                        className="admin-form__btn admin-form__btn--cancel"
                      >
                        {t.adminDashboard.form.cancel}
                      </button>
                    </div>

                  </form>
                </div>
              </div>
            )}
            {/* List */}
            <div className="admin-dashboard__banners">
              <div className="admin-banners__header">
                <h2>{t.adminDashboard.list.title}</h2>
                <span className="admin-banners__count">
                  {filteredBanners.length} total
                </span>
              </div>

              {filteredBanners.length === 0 ? (
                <div className="admin-dashboard__empty">
                  <p>{t.adminDashboard.list.empty}</p>
                </div>
              ) : (
                <div className="admin-banners__list">
                  {filteredBanners.map(banner => (
                    <div
                      key={banner.id}
                      className={`admin-banner ${banner.active ? 'active' : 'inactive'
                        }`}
                    >
                      {/* LEFT */}
                      <div className="admin-banner__left">
                        <div
                          className={`admin-banner__indicator admin-banner__indicator--${banner.type}`}
                        ></div>

                        <div className="admin-banner__info">
                          <h3 className="admin-banner__title">
                            {banner.title}
                          </h3>

                          {banner.description && (
                            <p className="admin-banner__description">
                              {banner.description}
                            </p>
                          )}

                          <p className="admin-banner__meta">
                            {banner.type.charAt(0).toUpperCase() +
                              banner.type.slice(1)}{" "}
                            • Created{" "}
                            {new Date(banner.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT ACTIONS */}
                      <div className="admin-banner__actions">

                        {/* Toggle */}
                        <button
                          onClick={() => toggleBannerStatus(banner.id)}
                          className="admin-banner__action-btn"
                          title="Toggle Status"
                        >
                          {banner.active ? '●' : '○'}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => {
                            setFormData(banner);
                            setEditingId(banner.id);
                            setShowAddForm(true);
                          }}
                          className="admin-banner__action-btn"
                        >
                          ✏️
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => deleteBanner(banner.id)}
                          className="admin-banner__action-btn admin-banner__action-btn--delete"
                        >
                         🗑️
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}