import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <div className="footer__logo-icon">
                  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="28" y="10" width="4" height="28" rx="2" fill="currentColor"/>
                    <rect x="18" y="12" width="4" height="26" rx="2" fill="currentColor"/>
                    <rect x="38" y="12" width="4" height="26" rx="2" fill="currentColor"/>
                    <rect x="12" y="38" width="36" height="3" rx="1.5" fill="currentColor"/>
                    <rect x="8" y="43" width="44" height="3" rx="1.5" fill="currentColor"/>
                    <rect x="22" y="6" width="16" height="4" rx="2" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p className="footer__logo-main">LEGAL HUMAN</p>
                  <p className="footer__logo-sub">{t.footer.tagline}</p>
                </div>
              </div>
              <p className="footer__desc">
                Experts in Tax and Immigration Law in Spain. Providing personalized legal services with a human-centered approach.
              </p>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Contact</h4>
              <div className="footer__contact-list">
                <a href="tel:+34665127758" className="footer__contact-item">
                  <span className="footer__contact-icon">📞</span>
                  +34 665 12 77 58
                </a>
                <a href="tel:+34653546475" className="footer__contact-item">
                  <span className="footer__contact-icon">📞</span>
                  +34 653 54 64 75
                </a>
                <a href="mailto:asesorialegalhuman@gmail.com" className="footer__contact-item">
                  <span className="footer__contact-icon">✉️</span>
                  asesorialegalhuman@gmail.com
                </a>
              </div>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Navigation</h4>
              <nav className="footer__nav">
                <Link to="/" className="footer__nav-link">Home</Link>
                <Link to="/about" className="footer__nav-link">About Us</Link>
                <Link to="/services" className="footer__nav-link">Services</Link>
                <Link to="/contact" className="footer__nav-link">Contact</Link>
              </nav>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">Legal</h4>
              <nav className="footer__nav">
                <Link to="/privacy" className="footer__nav-link">{t.footer.privacy}</Link>
                <Link to="/legal-notice" className="footer__nav-link">{t.footer.legal}</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p className="footer__copy">
            © {new Date().getFullYear()} Legal Human. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
