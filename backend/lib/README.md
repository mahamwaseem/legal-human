# Reusable Contact Service Library

A production-ready, modular contact management service that can be integrated into any Node.js/Express application.

## Quick Start

### 1. Copy Files to Your Project

```bash
# Copy the contact service to your project
cp backend/lib/contactService.js your-project/lib/

# Optionally copy the database connection module
cp backend/src/db.js your-project/src/
```

### 2. Install Dependencies

```bash
npm install mongoose
```

### 3. Use in Your Application

```javascript
const {
  createContact,
  getContacts,
  validateContactData
} = require('./lib/contactService');

// Create a contact
const contact = await createContact({
  fullName: 'Jane Smith',
  dniNie: '87654321B',
  address: '456 Oak Street, Barcelona',
  contactNumber: '+34934567890'
});

// Get contacts
const allContacts = await getContacts();
```

## Available Functions

| Function | Parameters | Returns | Description |
|----------|-----------|---------|-------------|
| `createContact(contactData, options)` | Object, Object | Promise<Contact> | Create new contact |
| `getContacts(filter, options)` | Object, Object | Promise<Array> | Get contacts with pagination |
| `getContactById(id)` | String | Promise<Contact> | Get single contact |
| `updateContact(id, updateData)` | String, Object | Promise<Contact> | Update contact |
| `deleteContact(id)` | String | Promise<Contact> | Delete contact |
| `getContactsCount(filter)` | Object | Promise<Number> | Count contacts |
| `getContactsByStatus(status, options)` | String, Object | Promise<Array> | Get by status |
| `markAsReviewed(id)` | String | Promise<Contact> | Mark as reviewing |
| `validateContactData(data)` | Object | Object | Validate contact data |

## Required Fields

- **fullName** (String): 2-100 characters
- **dniNie** (String): Spanish DNI/NIE format (e.g., 12345678A)
- **address** (String): 5-200 characters
- **contactNumber** (String): 6-15 digits (can start with +)

## Optional Fields

- **email** (String): Valid email format
- **message** (String): Up to 2000 characters
- **service** (String): legal-consultation | documentation | representation | other
- **language** (String): en | es (default: en)

## Examples

### Create Contact with Validation
```javascript
const validation = validateContactData({
  fullName: 'John Doe',
  dniNie: '12345678A',
  address: '123 Main Street',
  contactNumber: '+34912345678'
});

if (validation.isValid) {
  const contact = await createContact(validation.data);
} else {
  console.log('Validation errors:', validation.errors);
}
```

### Get Recent Contacts
```javascript
const recentContacts = await getContacts(
  { status: 'new' },
  { skip: 0, limit: 10, sort: { createdAt: -1 } }
);
```

### Express Route Example
```javascript
const express = require('express');
const { createContactWithFallback } = require('./lib/contactService');

const app = express();
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const contact = await createContactWithFallback(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      errors: error.validationErrors 
    });
  }
});
```

## Database Setup

### MongoDB (Recommended)
```javascript
const { connectDB } = require('./src/db');

// In your server startup
await connectDB();
```

### File Storage (Fallback)
```javascript
const { createContactWithFallback } = require('./lib/contactService');

// Automatically uses file storage if MongoDB unavailable
const contact = await createContactWithFallback(contactData);
```

## File Structure

```
your-project/
├── lib/
│   └── contactService.js      // Service library
├── src/
│   └── db.js                   // MongoDB connection (optional)
├── data/
│   └── contacts.json           // File fallback (auto-created)
└── .env
    └── MONGODB_URI=mongodb://...
```

---

For detailed documentation, see [CONTACT_SERVICE_GUIDE.md](../CONTACT_SERVICE_GUIDE.md)
