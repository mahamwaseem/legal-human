import React, { createContext, useContext, useState, useEffect } from 'react';

const BannerContext = createContext();
const API_BASE = 'http://localhost:5000/api';

export function BannerProvider({ children }) {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch banners from API on mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/banners`);
      const result = await response.json();
      if (result.success) {
        setBanners(result.data);
      } else {
        setError('Failed to fetch banners');
      }
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError('Error fetching banners');
    } finally {
      setLoading(false);
    }
  };

  const addBanner = async (banner) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/banners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(banner)
      });
      const result = await response.json();
      if (result.success) {
        setBanners([...banners, result.data]);
        return result.data;
      } else {
        setError(result.message);
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('Error adding banner:', err);
      setError('Error adding banner');
      throw err;
    }
  };

  const editBanner = async (id, updatedBanner) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBanner)
      });
      const result = await response.json();
      if (result.success) {
        setBanners(banners.map(b => b.id === id ? result.data : b));
        return result.data;
      } else {
        setError(result.message);
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('Error updating banner:', err);
      setError('Error updating banner');
      throw err;
    }
  };

  const deleteBanner = async (id) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/banners/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const result = await response.json();
      if (result.success) {
        setBanners(banners.filter(b => b.id !== id));
        return true;
      } else {
        setError(result.message);
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('Error deleting banner:', err);
      setError('Error deleting banner');
      throw err;
    }
  };

  const toggleBannerStatus = async (id) => {
    const banner = banners.find(b => b.id === id);
    if (!banner) return;
    
    try {
      return await editBanner(id, { active: !banner.active });
    } catch (err) {
      console.error('Error toggling banner status:', err);
      setError('Error toggling banner status');
      throw err;
    }
  };

  return (
    <BannerContext.Provider value={{
      banners,
       activeBanners: banners.filter(b => b.active), 
      loading,
      error,
      addBanner,
      editBanner,
      deleteBanner,
      toggleBannerStatus,
      fetchBanners
    }}>
      {children}
    </BannerContext.Provider>
  );
}

export function useBanners() {
  return useContext(BannerContext);
}
