# ⚖️ Legal Human – Tax & Immigration Law Website

A professional, bilingual (English/Spanish) law firm website built with **React** (frontend) and **Node.js/Express** (backend).

---

## 📁 Project Structure

```
legal-human/
├── frontend/              # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js / Navbar.css
│   │   │   └── Footer.js / Footer.css
│   │   ├── context/
│   │   │   └── LanguageContext.js   # EN/ES translations + provider
│   │   ├── pages/
│   │   │   ├── Home.js / Home.css
│   │   │   ├── About.js / About.css
│   │   │   ├── Services.js / Services.css
│   │   │   ├── Contact.js / Contact.css
│   │   │   ├── Privacy.js
│   │   │   ├── LegalNotice.js
│   │   │   ├── NotFound.js
│   │   │   └── Legal.css
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── backend/               # Node.js / Express API
│   ├── src/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── package.json           # Root (runs both with concurrently)
└── README.md
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
# From the project root
npm install          # installs concurrently
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure environment variables

```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your SMTP credentials
```

### 3. Run in development

```bash
# From root – starts both frontend (port 3000) and backend (port 5000)
npm run dev

# OR separately:
npm run dev:frontend   # React on http://localhost:3000
npm run dev:backend    # Express on http://localhost:5000
```

---

## 🌐 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, stats, about intro, service features, CTA |
| About | `/about` | Team profiles (Yasmina & Dana), values, mission quote |
| Services | `/services` | Filterable cards: Taxation, International Tax, Immigration |
| Contact | `/contact` | Form with validation, info panel, language badges |
| Privacy | `/privacy` | GDPR-compliant privacy policy (EN + ES) |
| Legal Notice | `/legal-notice` | Spanish legal notice (EN + ES) |
| 404 | `*` | Custom not-found page |

---

## 🌍 Bilingual Support (EN / ES)

All UI text is managed through `src/context/LanguageContext.js`.

- Toggle language via the **EN | ES** switcher in the navbar
- All pages, labels, placeholders and alerts switch instantly
- No page reload required – context-based state management

To add more languages, extend the `translations` object with a new key (e.g., `fr`, `ar`).

---

## 🎨 Design System

### Color Palette (Advocate-inspired)
| Variable | Value | Usage |
|----------|-------|-------|
| `--clr-primary` | `#7A4F5B` | Burgundy-rose – buttons, accents |
| `--clr-primary-dark` | `#5C3542` | Deep maroon – headings, logo |
| `--clr-accent` | `#C9A96E` | Gold – decorative dividers, hover |
| `--clr-bg` | `#F5F0EC` | Warm parchment – main background |
| `--clr-footer` | `#7A4F5B` | Footer background |

### Typography
- **Display / Headings**: Cormorant Garamond (serif, elegant)
- **Body / UI**: Jost (geometric sans-serif, clean)

---

## 🔧 Backend API

### `POST /api/contact`

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+34 600 000 000",
  "service": "Digital Nomad Visa",
  "message": "I need help with...",
  "lang": "en"
}
```

**Response:**
```json
{ "success": true, "message": "Message sent successfully!" }
```

**Features:**
- Input validation (required fields, email format)
- Rate limiting (5 requests per 15 minutes per IP)
- Helmet security headers
- CORS configured for frontend origin
- Ready for Nodemailer integration (see server.js comments)

### `GET /api/health`
Returns `{ status: "OK", timestamp: "..." }` — useful for uptime checks.

---

## 📧 Email Setup (Production)

In `backend/src/server.js`, uncomment and configure the Nodemailer block:

```js
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,    // smtp.gmail.com
  port: process.env.EMAIL_PORT,    // 587
  auth: {
    user: process.env.EMAIL_USER,  // asorialegalhuman@gmail.com
    pass: process.env.EMAIL_PASS,  // Gmail App Password
  }
});

await transporter.sendMail({
  from: `"${name}" <${email}>`,
  to: 'asorialegalhuman@gmail.com',
  subject: `New enquiry: ${service || 'General'}`,
  text: message,
  html: `<p><strong>From:</strong> ${name} (${email})<br>
         <strong>Phone:</strong> ${phone}<br>
         <strong>Service:</strong> ${service}<br><br>
         ${message}</p>`
});
```

For Gmail, use an **App Password** (not your main password): [Google App Passwords](https://myaccount.google.com/apppasswords)

---

## 🚢 Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend && npm run build
# Deploy the build/ folder
```

Set environment variable: `REACT_APP_API_URL=https://your-backend.com`

Update fetch calls in Contact.js:
```js
const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, { ... });
```

### Backend (Railway / Render / VPS)
```bash
cd backend && npm start
```

Set environment variables in your hosting dashboard using `.env.example` as reference.

---

## 📋 Services Covered

**Taxation:** Income Tax, Self-Employed Tax, Wealth Tax, AEAT Management, Tax Inspections

**International Taxation:** Beckham Law, Double Taxation Agreements, Forms 720/721, Non-Residents IRNR

**Immigration:** Residence Permits, Family Reunification, EU Resident Permits, Spanish Nationality, Digital Nomad Visa, Asylum

---

## 📞 Contact Details (Pre-configured)

- 📞 +34 665 12 77 58
- 📞 +34 653 54 64 75  
- ✉️ asorialegalhuman@gmail.com

---

*Built with ❤️ for Legal Human — Extranjería y Fiscalidad*
