import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useBanners } from '../context/BannerContext';
import HomeBanner from '../components/HomeBanner';
import './Home.css';

const stats = [
  { value: '10+', keyEn: 'statsYears' },
  { value: '500+', keyEn: 'statsClients' },
  { value: '20+', keyEn: 'statsServices' },
  { value: '15+', keyEn: 'statsCountries' },
];

const features = [
  {
    titleEn: 'Tax Law',
    titleEs: 'Derecho Fiscal',
    descEn: 'Expert tax planning and optimization for individuals and businesses in Spain.',
    descEs: 'Planificación fiscal experta para particulares y empresas en España.'
  },
  {
    titleEn: 'Immigration',
    titleEs: 'Inmigración',
    descEn: 'Full support for residence permits, visas, and nationality processes.',
    descEs: 'Apoyo completo para permisos de residencia, visados y procesos de nacionalidad.'
  },
  {
    
    titleEn: 'International Tax',
    titleEs: 'Fiscalidad Internacional',
    descEn: 'Cross-border tax strategies including the Beckham Law and digital nomad visa.',
    descEs: 'Estrategias fiscales transfronterizas incluyendo la Ley Beckham y visado nómada digital.'
  },
  {
    
    titleEn: 'Legal Defense',
    titleEs: 'Defensa Legal',
    descEn: 'Appeals, claims and representation before Spanish administrative bodies.',
    descEs: 'Recursos, reclamaciones y representación ante organismos administrativos españoles.'
  }
];

export default function Home() {
  const { t, lang } = useLang();
  
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  return (
    <main className="home page-enter">
      {/* Banners Section */}
      <HomeBanner />
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg-decor">
          <div className="hero__circle hero__circle--1"></div>
          <div className="hero__circle hero__circle--2"></div>
          <div className="hero__scales">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.04">
              <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="2"/>
              <line x1="100" y1="30" x2="100" y2="170" stroke="currentColor" strokeWidth="2"/>
              <line x1="30" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="1"/>
              <circle cx="60" cy="100" r="25" stroke="currentColor" strokeWidth="2"/>
              <circle cx="140" cy="100" r="25" stroke="currentColor" strokeWidth="2"/>
              <line x1="60" y1="75" x2="100" y2="45" stroke="currentColor" strokeWidth="2"/>
              <line x1="140" y1="75" x2="100" y2="45" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>

        <div className="container">
          <div className="hero__content">
            <div className="hero__badge">
             
              <span>Legal Human — {lang === 'es' ? 'Extranjería y Fiscalidad' : 'Immigration & Tax Law'}</span>
            </div>

            <h1 className="hero__title">
              <span className="hero__title-line">{lang === 'es' ? 'Expertos en' : 'Experts in'}</span>
              <span className="hero__title-accent">{lang === 'es' ? 'Derecho Fiscal' : 'Tax & Immigration'}</span>
              <span className="hero__title-line">{lang === 'es' ? 'e Inmigración' : 'Law in Spain'}</span>
            </h1>

            <div className="divider"></div>

            <p className="hero__lead">{t.home.tagline}</p>

            <div className="hero__actions">
              <Link to="/contact" className="btn-primary">
                {t.home.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/services" className="btn-secondary">{t.home.ctaSecondary}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-bar__grid">
            {stats.map((stat, i) => (
              <div className="stats-bar__item" key={i}>
                <span className="stats-bar__value">{stat.value}</span>
                <span className="stats-bar__label">{t.home[stat.keyEn]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About intro */}
      <section className="home-about">
        <div className="container">
          <div className="home-about__grid">
            <div className="home-about__visual">
              <div className="home-about__emblem">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4"/>
                  <rect x="56" y="20" width="8" height="56" rx="4" fill="currentColor"/>
                  <rect x="36" y="24" width="8" height="52" rx="4" fill="currentColor"/>
                  <rect x="76" y="24" width="8" height="52" rx="4" fill="currentColor"/>
                  <rect x="24" y="76" width="72" height="6" rx="3" fill="currentColor"/>
                  <rect x="16" y="86" width="88" height="6" rx="3" fill="currentColor"/>
                  <rect x="44" y="12" width="32" height="8" rx="4" fill="currentColor"/>
                </svg>
              </div>
             
            </div>

            <div className="home-about__text">
              <p className="section-subtitle">{lang === 'es' ? 'Quiénes Somos' : 'Who We Are'}</p>
              <h2 className="section-title">{lang === 'es' ? 'Un Enfoque Legal Centrado en las Personas' : 'A Human-Centered Legal Approach'}</h2>
              <div className="divider"></div>

              <p className="home-about__para">{t.home.intro1}</p>
              <p className="home-about__para">{t.home.intro2}</p>
              <p className="home-about__para">{t.home.intro3}</p>
              <p className="home-about__para">{t.home.intro4}</p>

              <Link to="/about" className="btn-secondary" style={{ marginTop: '1.5rem' }}>
                {lang === 'es' ? 'Conoce al Equipo' : 'Meet Our Team'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Features */}
      <section className="home-features">
        <div className="container">
          <div className="home-features__header">
            <p className="section-subtitle">{lang === 'es' ? 'Nuestras Áreas de Práctica' : 'Our Practice Areas'}</p>
            <h2 className="section-title">{lang === 'es' ? '¿Cómo Podemos Ayudarte?' : 'How Can We Help You?'}</h2>
            <div className="divider divider-center"></div>
          </div>
          <div className="home-features__grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-card__icon">{f.icon}</div>
                <h3 className="feature-card__title">{lang === 'es' ? f.titleEs : f.titleEn}</h3>
                <p className="feature-card__desc">{lang === 'es' ? f.descEs : f.descEn}</p>
                <Link to="/services" className="feature-card__link">
                  {lang === 'es' ? 'Ver Más' : 'Learn More'} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta__inner">
            <div className="home-cta__text">
              <h2 className="home-cta__title">
                {lang === 'es' ? '¿Listo para Resolver tu Situación Legal?' : 'Ready to Resolve Your Legal Situation?'}
              </h2>
              <p className="home-cta__sub">
                {lang === 'es'
                  ? 'Contáctanos hoy para una consulta personalizada con nuestros expertos.'
                  : 'Contact us today for a personalized consultation with our experts.'}
              </p>
            </div>
            <div className="home-cta__actions">
              <a href="tel:+34665127758" className="home-cta__phone">
                📞 +34 665 12 77 58
              </a>
              <Link to="/contact" className="btn-primary">
                {lang === 'es' ? 'Escribirnos' : 'Send a Message'}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
