import React, { useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import './About.css';
import yasminaImg from '../assets/yasmina.png';
import danaImg from '../assets/Dana.png';

const values = ['human', 'expert', 'commitment', 'trust'];


export default function About() {
  const { t, lang } = useLang();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="about page-enter">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-subtitle">{lang === 'es' ? 'Nuestro Equipo' : 'Our Team'}</p>
          <h1 className="section-title">{t.about.title}</h1>
          <div className="divider"></div>
          <p className="page-header__subtitle">{t.about.subtitle}</p>
        </div>
      </section>

      {/* Team */}
     <section className="team-section">
  <div className="container">
    <div className="team-grid">

      {/* Yasmina */}
      <div className="team-card">
        <div className="team-card__photo-wrap">
          <div className="team-card__photo">
            <img src={yasminaImg} alt="Yasmina" className="team-card__img" />
          </div>
          <div className="team-card__badge">
            <span>{lang === 'es' ? 'Asesora Fiscal' : 'Tax Advisor'}</span>
          </div>
        </div>

        <div className="team-card__content">
          <h2 className="team-card__name">{t.about.yasmina.name}</h2>
          <p className="team-card__role">{t.about.yasmina.role}</p>
          <div className="divider"></div>
          <p className="team-card__bio">{t.about.yasmina.bio}</p>
          <p className="team-card__details">{t.about.yasmina.details}</p>
          <div className="team-card__tags">
            {t.about.yasmina.tags.map(tag => (
              <span className="team-card__tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Dana */}
      <div className="team-card">
        <div className="team-card__photo-wrap">
          <div className="team-card__photo">
            <img src={danaImg} alt="Dana" className="team-card__img" />
          </div>
          <div className="team-card__badge">
            <span>{lang === 'es' ? 'Experta en Inmigración' : 'Immigration Expert'}</span>
          </div>
        </div>

        <div className="team-card__content">
          <h2 className="team-card__name">{t.about.dana.name}</h2>
          <p className="team-card__role">{t.about.dana.role}</p>
          <div className="divider"></div>
          <p className="team-card__bio">{t.about.dana.bio}</p>
          <p className="team-card__details">{t.about.dana.details}</p>
          <div className="team-card__tags">
            {t.about.dana.tags.map(tag => (
              <span className="team-card__tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
    {/* Values */ }
    < section className = "values-section" >
      <div className="container">
        <div className="values-section__header">
          <p className="section-subtitle">{lang === 'es' ? 'Lo Que Nos Guía' : 'What Guides Us'}</p>
          <h2 className="section-title">{t.about.values.title}</h2>
          <div className="divider divider-center"></div>
        </div>
        <div className="values-grid">
          {values.map((key, i) => (
            <div className="value-card" key={key} style={{ animationDelay: `${i * 0.1}s` }}>
              <h3 className="value-card__title">{t.about.values[key].title}</h3>
              <p className="value-card__desc">{t.about.values[key].desc}</p>
            </div>
          ))}
        </div>
      </div>
  </section >

    {/* Mission */ }
    < section className = "mission-section" >
      <div className="container">
        <div className="mission-section__inner">
          <div className="mission-section__emblem">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="37" y="10" width="6" height="42" rx="3" fill="currentColor" />
              <rect x="24" y="14" width="6" height="38" rx="3" fill="currentColor" />
              <rect x="50" y="14" width="6" height="38" rx="3" fill="currentColor" />
              <rect x="16" y="52" width="48" height="5" rx="2.5" fill="currentColor" />
              <rect x="10" y="59" width="60" height="5" rx="2.5" fill="currentColor" />
              <rect x="30" y="6" width="20" height="6" rx="3" fill="currentColor" />
            </svg>
          </div>
          <blockquote className="mission-section__quote">
            {lang === 'es'
              ? '"Nuestro objetivo es ofrecerte un servicio integral que combine experiencia jurídica, compromiso social y un enfoque centrado en las personas."'
              : '"Our goal is to offer you a comprehensive service that combines legal expertise, social commitment, and a human-centered approach."'}
            <cite>— Legal Human</cite>
          </blockquote>
        </div>
      </div>
  </section >
    </main >
  );
}
