import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { BannerProvider } from './context/BannerContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import LegalNotice from './pages/LegalNotice';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import NotFound from './pages/NotFound';
import './index.css';


// 🔐 Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin-token');

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}


function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Hide Navbar on Admin صفحات */}
      {!isAdminPage && <Navbar />}

      <div style={{ flex: 1, paddingTop: isAdminPage ? '0' : '80px' }}>
        <Routes>

          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/legal-notice" element={<LegalNotice />} />

          {/* 🔐 Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />

          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } 
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>

      {/* Hide Footer on Admin صفحات */}
      {!isAdminPage && <Footer />}
    </div>
  );
}


export default function App() {
  return (
    <LanguageProvider>
      <BannerProvider>
        <Router>
          <AppContent />
        </Router>
      </BannerProvider>
    </LanguageProvider>
  );
}