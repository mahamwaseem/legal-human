/**
 * Contact Service Library
 * Reusable service for managing contact submissions across projects
 * Supports both MongoDB and file-based storage fallback
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// ============ CONTACT SCHEMA ============

const ContactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    dniNie: {
      type: String,
      required: [true, 'DNI/NIE is required'],
      trim: true,
      match: [/^[0-9XYZ]{1}[0-9]{7}[A-Z]{1}$|^[0-9]{8}[A-Z]?$/, 'Invalid DNI/NIE format']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      minlength: [5, 'Address must be at least 5 characters'],
      maxlength: [200, 'Address cannot exceed 200 characters']
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
      match: [/^[+]?[0-9]{6,15}$/, 'Invalid contact number format']
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
    },
    message: {
      type: String,
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters']
    },
    service: {
      type: String,
      trim: true,
      enum: {
        values: ['legal-consultation', 'documentation', 'representation', 'other', ''],
        message: 'Invalid service type'
      }
    },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'contacted', 'resolved'],
      default: 'new'
    },
    language: {
      type: String,
      enum: ['es', 'en'],
      default: 'en'
    },
    ipAddress: String,
    userAgent: String,
    notes: String
  },
  {
    timestamps: true
  }
);

// Create model (avoid re-creating if already exists)
let Contact;
try {
  Contact = mongoose.model('Contact');
} catch {
  Contact = mongoose.model('Contact', ContactSchema);
}

// ============ VALIDATION HELPERS ============

function validateContactData(data) {
  const errors = {};

  // Full Name validation
  if (!data.fullName || !data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }

  // DNI/NIE validation (Spanish format)
  if (!data.dniNie || !data.dniNie.trim()) {
    errors.dniNie = 'DNI/NIE is required';
  } else if (!/^[0-9XYZ]{1}[0-9]{7}[A-Z]{1}$|^[0-9]{8}[A-Z]?$/.test(data.dniNie.trim())) {
    errors.dniNie = 'Invalid DNI/NIE format (e.g., 12345678A or Y12345678)';
  }

  // Address validation
  if (!data.address || !data.address.trim()) {
    errors.address = 'Address is required';
  } else if (data.address.trim().length < 5) {
    errors.address = 'Address must be at least 5 characters';
  }

  // Contact number validation
  if (!data.contactNumber || !data.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!/^[+]?[0-9]{6,15}$/.test(data.contactNumber.trim())) {
    errors.contactNumber = 'Contact number must be 6-15 digits (can start with +)';
  }

  // Email validation (optional but validated if provided)
  if (data.email && data.email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errors.email = 'Invalid email format';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// ============ CRUD OPERATIONS ============

/**
 * Create a new contact submission
 * @param {Object} contactData - Contact data object
 * @param {Object} options - Additional options (ipAddress, userAgent, etc.)
 * @returns {Promise<Object>} Created contact object
 */
async function createContact(contactData, options = {}) {
  try {
    // Validate data
    const validation = validateContactData(contactData);
    if (!validation.isValid) {
      const error = new Error('Validation failed');
      error.validationErrors = validation.errors;
      throw error;
    }

    const contact = new Contact({
      fullName: contactData.fullName.trim(),
      dniNie: contactData.dniNie.trim(),
      address: contactData.address.trim(),
      contactNumber: contactData.contactNumber.trim(),
      email: contactData.email?.trim() || '',
      message: contactData.message?.trim() || '',
      service: contactData.service || '',
      language: contactData.language || 'en',
      ipAddress: options.ipAddress,
      userAgent: options.userAgent,
      notes: options.notes || ''
    });

    await contact.save();
    return contact;
  } catch (error) {
    throw error;
  }
}

/**
 * Get all contacts with optional filtering
 * @param {Object} filter - MongoDB filter object
 * @param {Object} options - Pagination and sorting options
 * @returns {Promise<Array>} Array of contacts
 */
async function getContacts(filter = {}, options = {}) {
  try {
    const {
      skip = 0,
      limit = 50,
      sort = { createdAt: -1 }
    } = options;

    const contacts = await Contact.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    return contacts;
  } catch (error) {
    throw error;
  }
}

/**
 * Get a single contact by ID
 * @param {String} contactId - MongoDB contact ID
 * @returns {Promise<Object>} Contact object
 */
async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      const error = new Error('Contact not found');
      error.code = 'NOT_FOUND';
      throw error;
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a contact
 * @param {String} contactId - MongoDB contact ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated contact object
 */
async function updateContact(contactId, updateData) {
  try {
    // Only allow updating specific fields
    const allowedUpdates = ['status', 'notes', 'email', 'contactNumber'];
    const updates = {};
    
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });

    const contact = await Contact.findByIdAndUpdate(
      contactId,
      updates,
      { new: true, runValidators: true }
    );

    if (!contact) {
      const error = new Error('Contact not found');
      error.code = 'NOT_FOUND';
      throw error;
    }

    return contact;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a contact
 * @param {String} contactId - MongoDB contact ID
 * @returns {Promise<Object>} Deleted contact object
 */
async function deleteContact(contactId) {
  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      const error = new Error('Contact not found');
      error.code = 'NOT_FOUND';
      throw error;
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

/**
 * Get contacts count
 * @param {Object} filter - MongoDB filter object
 * @returns {Promise<Number>} Count of contacts
 */
async function getContactsCount(filter = {}) {
  try {
    return await Contact.countDocuments(filter);
  } catch (error) {
    throw error;
  }
}

/**
 * Get contacts by status
 * @param {String} status - Contact status
 * @param {Object} options - Pagination options
 * @returns {Promise<Array>} Array of contacts
 */
async function getContactsByStatus(status, options = {}) {
  return getContacts({ status }, options);
}

/**
 * Mark contact as reviewed
 * @param {String} contactId - MongoDB contact ID
 * @returns {Promise<Object>} Updated contact
 */
async function markAsReviewed(contactId) {
  return updateContact(contactId, { status: 'reviewing' });
}

// ============ FILE FALLBACK (For projects without MongoDB) ============

function getContactsFilePath() {
  return path.join(process.cwd(), 'data', 'contacts.json');
}

function ensureContactsFileExists() {
  const filePath = getContactsFilePath();
  const dir = path.dirname(filePath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ contacts: [] }, null, 2));
  }
}

function getContactsFromFile() {
  try {
    ensureContactsFileExists();
    const data = fs.readFileSync(getContactsFilePath(), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts file:', error);
    return { contacts: [] };
  }
}

function saveContactsToFile(data) {
  try {
    ensureContactsFileExists();
    fs.writeFileSync(getContactsFilePath(), JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving contacts file:', error);
    return false;
  }
}

/**
 * Create contact with fallback to file storage
 * @param {Object} contactData - Contact data
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Created contact
 */
async function createContactWithFallback(contactData, options = {}) {
  try {
    // Try MongoDB first
    return await createContact(contactData, options);
  } catch (error) {
    console.warn('MongoDB save failed, falling back to file storage:', error.message);
    
    // Fallback to file storage
    try {
      const validation = validateContactData(contactData);
      if (!validation.isValid) {
        throw new Error('Validation failed: ' + JSON.stringify(validation.errors));
      }

      const data = getContactsFromFile();
      const newContact = {
        id: Date.now().toString(),
        fullName: contactData.fullName.trim(),
        dniNie: contactData.dniNie.trim(),
        address: contactData.address.trim(),
        contactNumber: contactData.contactNumber.trim(),
        email: contactData.email?.trim() || '',
        message: contactData.message?.trim() || '',
        service: contactData.service || '',
        language: contactData.language || 'en',
        status: 'new',
        ipAddress: options.ipAddress || '',
        createdAt: new Date().toISOString()
      };

      data.contacts.push(newContact);
      saveContactsToFile(data);
      return newContact;
    } catch (fallbackError) {
      throw new Error(`Failed to save contact: ${fallbackError.message}`);
    }
  }
}

module.exports = {
  // Schema and Model
  ContactSchema,
  Contact,

  // CRUD Operations
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactsCount,
  getContactsByStatus,
  markAsReviewed,

  // Utilities
  validateContactData,
  createContactWithFallback,

  // File fallback utilities (for non-MongoDB setups)
  getContactsFromFile,
  saveContactsToFile,
  ensureContactsFileExists
};
