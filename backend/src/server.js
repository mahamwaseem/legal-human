const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { getAllBanners, getBannerById, createBanner, updateBanner, deleteBanner, getAdminPassword, updateAdminPassword } = require('./dataManager');
const { connectDB, isConnected } = require('./db');
const { createContactWithFallback, getContacts, getContactById, updateContact, deleteContact, getContactsCount, validateContactData } = require('../lib/contactService');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Too many requests. Please try again later.' }
});

// ===== CONTACT FORM ENDPOINTS =====

// Create new contact submission
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { fullName, dniNie, address, contactNumber, email, message, service, lang } = req.body;
  const language = lang || 'en';

  try {
    // Validate input
    const validation = validateContactData({
      fullName,
      dniNie,
      address,
      contactNumber,
      email,
      message,
      service
    });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: language === 'es'
          ? 'Error de validación: ' + Object.values(validation.errors).join(', ')
          : 'Validation error: ' + Object.values(validation.errors).join(', '),
        errors: validation.errors
      });
    }

    // Create contact with database or file fallback
    const contact = await createContactWithFallback(
      {
        fullName,
        dniNie,
        address,
        contactNumber,
        email,
        message,
        service,
        language
      },
      {
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      }
    );

    // Log the submission
    console.log('✅ New contact submission received:', {
      id: contact._id || contact.id,
      fullName,
      email,
      timestamp: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: language === 'es'
        ? '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.'
        : 'Message sent successfully! We will contact you soon.',
      data: {
        id: contact._id || contact.id,
        timestamp: contact.createdAt || new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Error creating contact:', error);
    
    const language = req.body.lang || 'en';
    const errorMessage = error.message === 'Validation failed'
      ? 'Validation error'
      : 'Error processing contact submission';
    
    res.status(500).json({
      success: false,
      message: language === 'es'
        ? 'Error al procesar el mensaje. Por favor intenta más tarde.'
        : errorMessage,
      errors: error.validationErrors
    });
  }
});

// Get all contacts (admin only)
app.get('/api/contacts', async (req, res) => {
  try {
    const { status, skip = 0, limit = 50 } = req.query;
    const filter = status ? { status } : {};
    
    const contacts = await getContacts(filter, {
      skip: parseInt(skip),
      limit: parseInt(limit)
    });
    const total = await getContactsCount(filter);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        skip: parseInt(skip),
        limit: parseInt(limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Error fetching contacts' });
  }
});

// Get single contact by ID (admin only)
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);
    res.json({ success: true, data: contact });
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    console.error('Error fetching contact:', error);
    res.status(500).json({ success: false, message: 'Error fetching contact' });
  }
});

// Update contact status or notes (admin only)
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updates = {};
    
    if (status) updates.status = status;
    if (notes) updates.notes = notes;

    const contact = await updateContact(req.params.id, updates);
    res.json({ success: true, data: contact });
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    console.error('Error updating contact:', error);
    res.status(500).json({ success: false, message: 'Error updating contact' });
  }
});

// Delete contact (admin only)
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await deleteContact(req.params.id);
    res.json({ success: true, message: 'Contact deleted successfully', data: contact });
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    console.error('Error deleting contact:', error);
    res.status(500).json({ success: false, message: 'Error deleting contact' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ===== BANNER ENDPOINTS =====

// Get all banners
app.get('/api/banners', (req, res) => {
  try {
    const banners = getAllBanners();
    res.json({ success: true, data: banners });
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ success: false, message: 'Error fetching banners' });
  }
});

// Get single banner
app.get('/api/banners/:id', (req, res) => {
  try {
    const banner = getBannerById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, data: banner });
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ success: false, message: 'Error fetching banner' });
  }
});

// Create banner
app.post('/api/banners', (req, res) => {
  try {
    const { title, description, type, active } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Banner title is required' });
    }

    if (!['info', 'warning', 'alert'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid banner type' });
    }

    const banner = createBanner({
      title: title.trim(),
      description: description || '',
      type,
      active: active !== false
    });

    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    console.error('Error creating banner:', error);
    res.status(500).json({ success: false, message: 'Error creating banner' });
  }
});

// Update banner
app.put('/api/banners/:id', (req, res) => {
  try {
    const { title, description, type, active } = req.body;
    const banner = getBannerById(req.params.id);

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }

    // Validation
    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ success: false, message: 'Banner title cannot be empty' });
    }

    if (type && !['info', 'warning', 'alert'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid banner type' });
    }

    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description;
    if (type !== undefined) updates.type = type;
    if (active !== undefined) updates.active = active;

    const updatedBanner = updateBanner(req.params.id, updates);
    res.json({ success: true, data: updatedBanner });
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ success: false, message: 'Error updating banner' });
  }
});

// Delete banner
app.delete('/api/banners/:id', (req, res) => {
  try {
    const deleted = deleteBanner(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    res.json({ success: true, message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).json({ success: false, message: 'Error deleting banner' });
  }
});

// ===== AUTH ENDPOINTS =====

// Admin login
app.post('/api/auth/login', (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const correctPassword = getAdminPassword();
    if (password !== correctPassword) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Generate simple token (in production, use JWT)
    const token = Buffer.from(`admin-${Date.now()}-${Math.random()}`).toString('base64');
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      tokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Error during login' });
  }
});

// Change password
app.post('/api/auth/change-password', (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }

    const correctPassword = getAdminPassword();
    if (currentPassword !== correctPassword) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ success: false, message: 'New password must be different from current password' });
    }

    updateAdminPassword(newPassword);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Error changing password' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Initialize server
async function startServer() {
  try {
    // Connect to MongoDB (optional, with fallback to file storage)
    await connectDB();
    
    app.listen(PORT, () => {
      const dbStatus = isConnected() ? '✅ MongoDB' : '📁 File-based';
      console.log(`⚡ Legal Human API running on port ${PORT}`);
      console.log(`📊 Database: ${dbStatus} storage`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
