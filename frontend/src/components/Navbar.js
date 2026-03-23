import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="28" y="10" width="4" height="28" rx="2" fill="currentColor"/>
              <rect x="18" y="12" width="4" height="26" rx="2" fill="currentColor"/>
              <rect x="38" y="12" width="4" height="26" rx="2" fill="currentColor"/>
              <rect x="12" y="38" width="36" height="3" rx="1.5" fill="currentColor"/>
              <rect x="8" y="43" width="44" height="3" rx="1.5" fill="currentColor"/>
              <rect x="22" y="6" width="16" height="4" rx="2" fill="currentColor"/>
            </svg>
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-main">LEGAL HUMAN</span>
            <span className="navbar__logo-sub">Extranjería y Fiscalidad</span>
          </div>
        </Link>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {[
            { to: '/', label: t.nav.home },
            { to: '/about', label: t.nav.about },
            { to: '/services', label: t.nav.services },
            { to: '/contact', label: t.nav.contact },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <div className="navbar__lang-mobile">
            <button
              className={`navbar__lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >🇬🇧 EN</button>
            <span className="navbar__lang-divider">|</span>
            <button
              className={`navbar__lang-btn ${lang === 'es' ? 'active' : ''}`}
              onClick={() => setLang('es')}
            >🇪🇸 ES</button>
          </div>
        </nav>

        <div className="navbar__right">
          <div className="navbar__lang">
            <button
              className={`navbar__lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >🇬🇧 EN</button>
            <span className="navbar__lang-divider">|</span>
            <button
              className={`navbar__lang-btn ${lang === 'es' ? 'active' : ''}`}
              onClick={() => setLang('es')}
            >🇪🇸 ES</button>
          </div>

          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
