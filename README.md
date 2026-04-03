# ⚖️ Legal Human – Tax & Immigration Law Website

A professional, bilingual (English/Spanish) law firm website built with **React** (frontend) and **Node.js/Express** (backend) with **MongoDB** database integration.

**Status:** ✅ Production Ready | **Version:** 2.0.0

---

## 🎯 What's New (v2.0)

✅ **MongoDB Integration** - Cloud or local database support  
✅ **Contact Form Overhaul** - Captures Full Name, DNI/NIE, Address, Contact Number  
✅ **Contact Management** - Admin endpoints to view/manage submissions  
✅ **Reusable Contact Service** - Library can be used in other projects  
✅ **Full Validation** - Spanish DNI/NIE format, phone validation, field-level errors  
✅ **Rate Limiting** - 5 submissions per 15 minutes protection  

---

## 📁 Project Structure

```
legal-human/
├── frontend/                    # React app (Port 3000)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, etc.
│   │   ├── context/
│   │   │   └── LanguageContext.js   # EN/ES translations
│   │   ├── pages/
│   │   │   ├── Home.js         # Hero + Services
│   │   │   ├── About.js        # Team profiles
│   │   │   ├── Services.js     # Tax & Immigration
│   │   │   ├── Contact.js      # ✅ UPDATED - New fields
│   │   │   ├── Privacy.js
│   │   │   └── LegalNotice.js
│   │   └── App.js
│
├── backend/                     # Node.js/Express (Port 5000)
│   ├── src/
│   │   ├── server.js           # ✅ UPDATED - MongoDB + contacts
│   │   ├── db.js               # ✅ NEW - MongoDB connection
│   │   └── dataManager.js      # Banner management
│   ├── lib/
│   │   └── contactService.js   # ✅ NEW - Reusable contact library
│   ├── package.json            # ✅ UPDATED - mongoose added
│   ├── .env                    # ✅ NEW - Configuration
│   └── .env.example            # ✅ UPDATED
│
└── README.md                    (This file)
```

---

## 🚀 Quick Start (5 Minutes)

### 1️⃣ Setup MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `backend/.env` with MONGODB_URI

### 2️⃣ Install & Configure

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Configure backend
cd backend
cp .env.example .env
```

### 3️⃣ Start Development Servers

**Terminal 1 - Backend**
```bash
cd backend
npm start
```

**Expected Output:**
```
✅ MongoDB connected successfully
⚡ Legal Human API running on port 5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm start
```

### 4️⃣ Test Contact Form

1. Go to Contact page
2. Fill test data:
   - Full Name: John Doe
   - DNI/NIE: 12345678A
   - Address: 123 Main Street, Madrid
   - Contact: +34912345678
3. Click "Send" ✅

---

## 📋 Contact Form Fields

### Required ⭐
| Field | Format | Example |
|-------|--------|---------|
| Full Name | 2-100 chars | John Doe |
| DNI/NIE | 12345678A or Y12345678 | 12345678A |
| Address | 5-200 chars | 123 Main St |
| Contact Number | 6-15 digits, +optional | +34912345678 |

### Optional
| Field | Format |
|-------|--------|
| Email | Valid email |
| Service | legal-consultation, documentation, representation, other |
| Message | Up to 2000 chars |

---

## 🔗 Backend API

### Create Contact (Public)
**POST** `/api/contact`

**Request:**
```json
{
  "fullName": "John Doe",
  "dniNie": "12345678A",
  "address": "123 Main St, Madrid",
  "contactNumber": "+34912345678",
  "email": "john@example.com",        // optional
  "service": "legal-consultation",    // optional
  "message": "Need legal help...",    // optional
  "lang": "en"                        // en or es
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "timestamp": "2024-04-03T10:00:00.000Z"
  }
}
```

**Features:**
- ✅ Full validation
- ✅ Rate limiting (5/15 min)
- ✅ MongoDB storage + file fallback
- ✅ Bilingual errors
- ✅ Field-level error messages

**Test with cURL:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","dniNie":"12345678A","address":"123 Main","contactNumber":"+34912345678"}'
```

---

### Admin Endpoints

**Get All Contacts**
```
GET /api/contacts?status=new&skip=0&limit=50
```

**Get Single Contact**
```
GET /api/contacts/:contactId
```

**Update Contact**
```
PUT /api/contacts/:contactId
{
  "status": "reviewing",
  "notes": "Initial consultation scheduled"
}
```

**Delete Contact**
```
DELETE /api/contacts/:contactId
```

---

## 🗄️ Database

### MongoDB Schema
```javascript
{
  fullName: String,           // Required
  dniNie: String,             // Required: Spanish format
  address: String,            // Required
  contactNumber: String,      // Required
  email: String,              // Optional
  message: String,            // Optional
  service: String,            // Optional
  status: String,             // new|reviewing|contacted|resolved
  language: String,           // en|es
  ipAddress: String,          // Auto-captured
  userAgent: String,          // Auto-captured
  notes: String,              // Admin notes
  createdAt: DateTime,        // Auto-generated
  updatedAt: DateTime         // Auto-generated
}
```

### Fallback Storage
If MongoDB unavailable: `backend/data/contacts.json`

---

## 🌐 Pages

| Page | Route | Features |
|------|-------|----------|
| Home | `/` | Hero, stats, services, CTA |
| About | `/about` | Team profiles, values |
| Services | `/services` | Tax, IntlTax, Immigration |
| Contact | `/contact` | ✅ New form with validation |
| Privacy | `/privacy` | GDPR policy |
| Legal | `/legal-notice` | Spanish legal |

---

## 🌍 Bilingual Support (EN / ES)

- Toggle via navbar **EN | ES** switcher
- Instant switching (no reload)
- Form labels in both languages
- Error messages bilingual
- Supported: English (en), Spanish (es)

---

## 🎨 Design System

### Colors
| Variable | Hex | Usage |
|----------|-----|-------|
| Primary | `#7A4F5B` | Buttons, links |
| Primary Dark | `#5C3542` | Headings |
| Accent | `#C9A96E` | Gold accents |
| Background | `#F5F0EC` | Page bg |

### Typography
- **Headings:** Cormorant Garamond (serif)
- **Body:** Jost (sans-serif)

### Responsive
- ✅ Desktop (1920px+)
- ✅ Tablet (768px-1024px)
- ✅ Mobile (< 768px)

---

## 🔒 Security

### Implemented
- ✅ Input validation
- ✅ Rate limiting (5/15 min)
- ✅ Helmet.js headers
- ✅ CORS protection
- ✅ XSS protection

### For Production
- [ ] Add admin authentication
- [ ] Use HTTPS/SSL
- [ ] Email verification
- [ ] GDPR compliance
- [ ] Monitoring & logging

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
# Server
PORT=5000
CLIENT_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/legal-human
# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/legal-human

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend (`frontend/.env` - Optional)
```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 📧 Email Setup (Optional)

1. Get Gmail App Password at https://myaccount.google.com/apppasswords
2. Add to `backend/.env`:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your@gmail.com
   EMAIL_PASS=your_16_char_password
   ```
3. Uncomment email code in `backend/src/server.js`

---

## 🚢 Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy build/ folder
```

**Set:** `REACT_APP_API_URL=https://your-backend.com`

### Backend (Railway / Render)
```bash
cd backend
npm start
```

**Set environment variables** in hosting dashboard

### Database
- Create MongoDB Atlas cluster
- Get connection string
- Add to `MONGODB_URI` in production

---

## 🧪 Testing

### Form Validation
- ✅ Required fields error if empty
- ✅ DNI format: 12345678A or Y12345678
- ✅ Address min 5 chars
- ✅ Contact 6-15 digits
- ✅ Errors clear on input
- ✅ Bilingual errors

### API Tests
```bash
# Test successful submission
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","dniNie":"12345678A","address":"123 Main","contactNumber":"+34912345678"}'

# Test validation (missing field)
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"dniNie":"12345678A","address":"123 Main"}'
```

---

## 🎯 Services

### Taxation
- Income Tax (IRPF)
- Self-Employed (Autónomos)
- Wealth Tax
- Tax Planning
- AEAT Management
- Tax Inspections

### International Tax
- Beckham Law
- Double Taxation
- Forms 720/721
- Non-Residents (IRNR)

### Immigration
- Residence Permits
- Work Visas
- Family Reunification
- EU Permits
- Spanish Nationality
- Digital Nomad Visa
- Student Visas
- Asylum

---

## 📞 Contact

- 📞 +34 665 12 77 58
- 📞 +34 653 54 64 75
- ✉️ asorialegalhuman@gmail.com
- 📍 Spain

---

## 🛠️ Reusable Contact Service

Use `backend/lib/contactService.js` in other projects:

```bash
cp backend/lib/contactService.js your-project/lib/
cp backend/src/db.js your-project/src/
npm install mongoose
```

**Usage:**
```javascript
const { createContact, getContacts, validateContactData } = require('./lib/contactService');

// Validate
const validation = validateContactData({ fullName, dniNie, address, contactNumber });

// Create
const contact = await createContact({ fullName, dniNie, address, contactNumber });

// Get
const contacts = await getContacts({ status: 'new' });
```

---

## 🐛 Troubleshooting

### MongoDB Failed
- Start MongoDB: `mongod`
- Or verify MONGODB_URI in `.env`
- App uses JSON fallback automatically

### Too Many Requests
- Rate limit: 5 requests per 15 minutes
- Wait 15 minutes to try again

### Invalid DNI/NIE
- Use: 8 digits + 1 letter (e.g., 12345678A)
- Or: Letter + 7 digits + letter (e.g., Y1234567A)

### CORS Error
- Ensure backend running on port 5000
- Check CORS_ORIGIN in `.env`
- Frontend has proxy in package.json

---

## 📝 Updated Files (v2.0)

### New Files ✅
- `backend/src/db.js` - MongoDB connection
- `backend/lib/contactService.js` - Contact service
- `backend/.env` - Configuration

### Updated Files ✅
- `backend/src/server.js` - Contact endpoints
- `backend/package.json` - mongoose added
- `frontend/src/pages/Contact.js` - New form
- `frontend/src/pages/Contact.css` - Error styles
- `frontend/src/context/LanguageContext.js` - Translations
- `backend/.env.example` - MongoDB template

---

## 📚 Tech Stack

**Frontend:**
- React 18
- React Router
- CSS3 + Variables
- Context API

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Helmet (Security)
- Rate Limiter
- CORS

**Database:**
- MongoDB (Cloud & Local)
- JSON File (Fallback)

---

**Status:** ✅ Production Ready  
**Version:** 2.0.0  
**Last Updated:** April 3, 2024  

*Built with ❤️ for Legal Human — Extranjería y Fiscalidad*
