import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBanners } from '../context/BannerContext';
import '../styles/AdminDashboard.css';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const { banners, addBanner, editBanner, deleteBanner, toggleBannerStatus } = useBanners();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  const [filterType, setFilterType] = useState('all'); // all, info, warning, alert
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'info',
    active: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    // Check if admin is authenticated
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
      alert('Please enter a banner title');
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

  // Filter banners based on search and filters
  const filteredBanners = banners.filter(banner => {
    // Search filter
    const matchesSearch = banner.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      banner.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && banner.active) ||
      (filterStatus === 'inactive' && !banner.active);

    // Type filter
    const matchesType = filterType === 'all' || banner.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <main className="admin-dashboard page-enter">
      <div className="admin-dashboard__wrapper">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar__header">
            <div className="admin-sidebar__logo">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="28" y="10" width="4" height="28" rx="2" fill="currentColor" />
                <rect x="18" y="12" width="4" height="26" rx="2" fill="currentColor" />
                <rect x="38" y="12" width="4" height="26" rx="2" fill="currentColor" />
                <rect x="12" y="38" width="36" height="3" rx="1.5" fill="currentColor" />
                <rect x="8" y="43" width="44" height="3" rx="1.5" fill="currentColor" />
                <rect x="22" y="6" width="16" height="4" rx="2" fill="currentColor" />
              </svg>
            </div>
            <div className="admin-sidebar__text">
              <h2>LEGAL HUMAN</h2>
              <p>Admin Panel</p>
            </div>
          </div>

          <nav className="admin-sidebar__nav">
            <a href="#dashboard" className="admin-sidebar__nav-item active">
              Dashboard
            </a>
            <a href="#settings" onClick={() => navigate('/admin/settings')} className="admin-sidebar__nav-item">
              Settings
            </a>
          </nav>

          <button onClick={handleLogout} className="admin-sidebar__logout">
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <div className="admin-dashboard__content">
          <div className="admin-dashboard__container">
            {/* Top Section */}
            <div className="admin-top">
              <div>
                <h1 className="admin-top__title">Banner Manager</h1>
                <p className="admin-top__subtitle">Create and manage homepage announcement banners</p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="admin-top__btn"
              >
                + New Banner
              </button>
            </div>

            {/* Stats */}
            <div className="admin-stats">
              <div className="admin-stat">
                <span className="admin-stat__value">{banners.length}</span>
                <span className="admin-stat__label">TOTAL</span>
              </div>
              <div className="admin-stat admin-stat--active">
                <span className="admin-stat__value">{banners.filter(b => b.active).length}</span>
                <span className="admin-stat__label">ACTIVE</span>
              </div>
              <div className="admin-stat admin-stat--inactive">
                <span className="admin-stat__value">{banners.filter(b => !b.active).length}</span>
                <span className="admin-stat__label">INACTIVE</span>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="admin-controls">
              <div className="admin-search">
                <input
                  type="text"
                  placeholder="Search banners..."
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
                    All
                  </button>
                  <button
                    className={`admin-filter-btn ${filterStatus === 'active' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('active')}
                  >
                    Active
                  </button>
                  <button
                    className={`admin-filter-btn ${filterStatus === 'inactive' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('inactive')}
                  >
                    Inactive
                  </button>
                </div>

                
              </div>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="admin-dashboard__form-section">
                <div className="admin-form">
                  <h2 className="admin-form__title">
                    {editingId ? 'Edit Banner' : 'Add New Banner'}
                  </h2>

                  <form onSubmit={handleSubmit} className="admin-form__content">
                    <div className="admin-form__group">
                      <label htmlFor="title" className="admin-form__label">
                        Banner Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Special Offer - Free Consultation"
                        className="admin-form__input"
                        maxLength="100"
                      />
                    </div>

                    <div className="admin-form__group">
                      <label htmlFor="description" className="admin-form__label">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Additional banner details"
                        className="admin-form__textarea"
                        rows="3"
                        maxLength="300"
                      />
                    </div>

                    <div className="admin-form__group">
                      <label htmlFor="type" className="admin-form__label">
                        Banner Type
                      </label>
                      <select
                        id="type"
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

                    <div className="admin-form__group admin-form__group--checkbox">
                      <label htmlFor="active" className="admin-form__checkbox-label">
                        <input
                          type="checkbox"
                          id="active"
                          name="active"
                          checked={formData.active}
                          onChange={handleInputChange}
                          className="admin-form__checkbox"
                        />
                        <span>Active (show on home page)</span>
                      </label>
                    </div>

                    <div className="admin-form__actions">
                      <button type="submit" className="admin-form__btn admin-form__btn--submit">
                        {editingId ? 'Update Banner' : 'Create Banner'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="admin-form__btn admin-form__btn--cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Banners List */}
            <div className="admin-dashboard__banners">
              <div className="admin-banners__header">
                <h2>All Banners</h2>
                <span className="admin-banners__count">{filteredBanners.length} total</span>
              </div>

              {filteredBanners.length === 0 ? (
                <div className="admin-dashboard__empty">
                  <p>No banners found. Create one to get started!</p>
                </div>
              ) : (
                <div className="admin-banners__list">
                  {filteredBanners.map(banner => (
                    <div key={banner.id} className={`admin-banner ${banner.active ? 'active' : 'inactive'}`}>
                      <div className="admin-banner__left">
                        <div className={`admin-banner__indicator admin-banner__indicator--${banner.type}`}></div>
                        <div className="admin-banner__info">
                          <h3 className="admin-banner__title">{banner.title}</h3>
                          {banner.description && (
                            <p className="admin-banner__description">{banner.description}</p>
                          )}
                          <p className="admin-banner__meta">
                            {banner.type.charAt(0).toUpperCase() + banner.type.slice(1)} • Created {new Date(banner.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="admin-banner__actions">
                       <button 
                        onClick={() => toggleBannerStatus(banner.id)}
                        className="admin-banner__action-btn"
                        title="Toggle Status"
                      >
                        {banner.active ? '●' : '○'}
                      </button>

                      {/* Edit Button (Pencil Icon) */}
                      <button 
                        onClick={() => { setFormData(banner); setEditingId(banner.id); setShowAddForm(true); }}
                        className="admin-banner__action-btn"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>

                      {/* Delete Button (X Icon) */}
                      <button 
                        onClick={() => deleteBanner(banner.id)}
                        className="admin-banner__action-btn admin-banner__action-btn--delete"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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
