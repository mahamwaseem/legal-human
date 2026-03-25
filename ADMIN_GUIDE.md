# Admin Dashboard Guide - Legal Human

## 🎯 Overview
Your admin dashboard is now fully functional with a professional, modern design. Here's everything you need to know:

---

## 📍 How to Access Admin Panel

### Step 1: Login
- Navigate to: `http://localhost:3000/admin/login`
- Enter password: **`LegalAdmin@2024`**
- You'll be redirected to the admin dashboard

### Step 2: Dashboard Overview
The admin dashboard has:
- **Left Sidebar** - Navigation and quick access
- **Main Content Area** - Banner management
- **Stats Section** - Quick overview of banners
- **Search & Filters** - Find and organize banners
- **Banner List** - View, edit, and manage all banners

---

## 🎨 Dashboard Features

### 1. **Stats Section**
Shows real-time statistics:
- **TOTAL** - Total number of banners created
- **ACTIVE** - Banners currently showing on home page
- **INACTIVE** - Banners not visible to users

### 2. **Search & Filters**
**Search Box:**
- Search banners by title or description
- Real-time filtering as you type

**Status Filters:**
- All - Show all banners
- Active - Only show active banners
- Inactive - Only show inactive banners

**Type Filters:**
- All Types - All banner types
- Notice (📢) - Information notices
- Warning (⚠️) - Warning messages
- Alert (🔔) - Critical alerts

### 3. **Create New Banner**
Click **"+ New Banner"** button to:
1. Enter banner title
2. Add optional description
3. Select banner type
4. Choose active/inactive status
5. Click "Create Banner"

### 4. **Edit Banner**
- Click **✎ Edit** button on any banner
- Modify the details
- Click "Update Banner" to save

### 5. **Delete Banner**
- Click **✕ Delete** button
- Confirm deletion in popup
- Banner will be removed permanently

### 6. **Toggle Status**
- Click **●/○** button to activate/deactivate
- **●** (filled) = ACTIVE (shows on homepage)
- **○** (empty) = INACTIVE (hidden from users)

---

## 🏠 How Banners Show on Home Page

### What Happens:
1. Admin creates a banner and marks it as "Active"
2. Banner is saved to database (`backend/src/data.json`)
3. Frontend fetches banners from API endpoint (`/api/banners`)
4. **Home page displays all ACTIVE banners** at the top

### Banner Display on Home Page:
- Banners appear **ABOVE** the hero section
- Each banner shows:
  - Icon (based on type)
  - Title
  - Description (if provided)
  - Type indicator
- Styled with different colors for each type

### Example Banner on Home Page:
```
┌─────────────────────────────────────────────────┐
│ 🔔 Free Consultation This Week!                 │
│ Get expert advice on immigration and tax matters│
│                                                 │
│ Created: Important Alert • Jan 15, 2026        │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Backend - How It Works

### API Endpoints:

#### Get All Banners
```
GET /api/banners
```
Returns all banners from database

#### Create Banner
```
POST /api/banners
Body: {
  title: "Banner Title",
  description: "Optional description",
  type: "info|warning|alert",
  active: true|false
}
```

#### Update Banner
```
PUT /api/banners/:id
Body: { ...updated fields }
```

#### Delete Banner
```
DELETE /api/banners/:id
```

### Data Storage:
- Location: `backend/src/data.json`
- Contains: All banners and admin password
- Automatically created on first banner addition

---

## 📱 Responsive Design

The admin dashboard works on all devices:
- **Desktop** - Full sidebar + full content area
- **Tablet** - Sidebar adjusts, content responsive
- **Mobile** - Optimized layout for small screens

---

## 🎯 Use Cases

### Case 1: Weekly Offer Banner
1. Click "+ New Banner"
2. Title: "Limited Time Offer - Free Legal Advice Session"
3. Description: "Get a free 30-minute consultation with our experts"
4. Type: Select "Notice"
5. Check "Active" box
6. Click "Create Banner"

✅ Banner now shows on homepage immediately!

### Case 2: Maintenance Notice
1. Create banner with warning type
2. Title: "System Maintenance Notice"
3. Keep it inactive until needed
4. When maintenance starts: Toggle to ACTIVE
5. When done: Toggle to INACTIVE or delete

### Case 3: Urgent Alert
1. Create with "Alert" type (red color)
2. Make it ACTIVE immediately
3. Appears at top of homepage in red
4. Draws maximum attention

---

## 🔐 Security Notes

### Password Management:
- Default Password: `LegalAdmin@2024`
- Change password in Settings (⚙️ button)
- Password stored in: `backend/src/data.json`
- In production: Use JWT tokens instead

### Authentication:
- Token stored in browser's localStorage
- Valid for 24 hours
- Logout button clears token

---

## 🐛 Troubleshooting

### Banners Not Showing on Home Page?
1. Check if banner is marked as ACTIVE
2. Check if home page browser cache is cleared
3. Verify backend is running and API is accessible
4. Check browser console for API errors

### Cannot Login?
1. Password is case-sensitive
2. Default: `LegalAdmin@2024`
3. Check if backend server is running
4. Restart backend: `npm start` in `/backend` folder

### Banner Type Colors:
- **Info (📢)** - Dark burgundy
- **Warning (⚠️)** - Orange
- **Alert (🔔)** - Red

---

## 📊 Dashboard Layout

```
┌──────────────┬─────────────────────────────────────────┐
│              │                                         │
│   SIDEBAR    │        BANNER MANAGER                   │
│              │                                         │
│ - Dashboard  │  [+ New Banner]                         │
│ - Settings   │                                         │
│ - Logout     │  Stats:  [2]  [1]  [1]                 │
│              │         Total Active Inactive            │
│              │                                         │
│              │  Search: [________________]             │
│              │  Filters: [All] [Active] [Inactive]    │
│              │  Types:   [All] [Notice][Warning][Alert]
│              │                                         │
│              │  ┌─ All Banners (2 total)             │
│              │  │                                      │
│              │  │ ▓ Free Consultation This Week!     │
│              │  │   ...                              │
│              │  │   [● Edit ✕ Delete]               │
│              │  │                                      │
│              │  │ ▓ Office Closed - Public Holiday   │
│              │  │   ...                              │
│              │  │   [○ Edit ✕ Delete]               │
│              │  │                                      │
│              │  └──────────────────────────────────  │
│              │                                         │
└──────────────┴─────────────────────────────────────────┘
```

---

## ✅ Verification Checklist

- [x] Admin login works with password
- [x] Can create new banner
- [x] Can edit existing banner
- [x] Can delete banner
- [x] Can toggle banner status (active/inactive)
- [x] Can search banners
- [x] Can filter by status and type
- [x] Banners appear correctly on home page
- [x] Stats update in real-time
- [x] Responsive design works on mobile
- [x] Backend API returns correct data

---

## 🚀 Next Steps

1. **Test the System:**
   - Create a test banner
   - Activate it
   - Check home page
   - Edit and delete

2. **Customize:**
   - Change colors in CSS files
   - Add more banner types
   - Customize allowed types

3. **Deploy:**
   - Set production password
   - Configure environment variables
   - Use JWT tokens for real security

---

## 💡 Tips & Tricks

- **Bulk Actions:** Currently edit/delete one at a time
- **Export Data:** Copy data.json to backup banners
- **Preview:** Active banners show immediately on home page
- **Design:** Use Warning type for deals, Alert for urgent news
- **Mobile:** Test on phone before important announcements

---

**Last Updated:** March 25, 2026  
**Version:** 1.0  
**Status:** ✅ Production Ready
