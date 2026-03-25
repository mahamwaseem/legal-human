const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

// Read data from file
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { banners: [], admin: { password: 'LegalAdmin@2024' } };
  }
}

// Write data to file
function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
}

// Get all banners
function getAllBanners() {
  const data = readData();
  return data.banners || [];
}

// Get banner by ID
function getBannerById(id) {
  const data = readData();
  return data.banners.find(b => b.id === parseInt(id));
}

// Create banner
function createBanner(banner) {
  const data = readData();
  const newBanner = {
    id: Date.now(),
    ...banner,
    createdAt: new Date().toISOString()
  };
  data.banners.push(newBanner);
  writeData(data);
  return newBanner;
}

// Update banner
function updateBanner(id, updates) {
  const data = readData();
  const bannerIndex = data.banners.findIndex(b => b.id === parseInt(id));
  if (bannerIndex === -1) return null;
  
  data.banners[bannerIndex] = { ...data.banners[bannerIndex], ...updates };
  writeData(data);
  return data.banners[bannerIndex];
}

// Delete banner
function deleteBanner(id) {
  const data = readData();
  const bannerIndex = data.banners.findIndex(b => b.id === parseInt(id));
  if (bannerIndex === -1) return false;
  
  data.banners.splice(bannerIndex, 1);
  writeData(data);
  return true;
}

// Get admin password
function getAdminPassword() {
  const data = readData();
  return data.admin?.password || 'LegalAdmin@2024';
}

// Update admin password
function updateAdminPassword(newPassword) {
  const data = readData();
  data.admin = data.admin || {};
  data.admin.password = newPassword;
  return writeData(data);
}

module.exports = {
  readData,
  writeData,
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  getAdminPassword,
  updateAdminPassword
};
