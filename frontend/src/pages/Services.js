import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './Services.css';

export default function Services() {
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tabs = [
    { key: 'all', label: lang === 'es' ? 'Todos' : 'All' },
    { key: 'taxation', label: lang === 'es' ? 'Fiscalidad' : 'Taxation' },
    { key: 'international', label: lang === 'es' ? 'Internacional' : 'International' },
    { key: 'immigration', label: lang === 'es' ? 'Inmigración' : 'Immigration' },
  ];

  const sections = [
    {
      key: 'taxation',
      color: '#7A4F5B',
      title: t.services.taxation.title,
      items: t.services.taxation.items,
    },
    {
      key: 'international',
      color: '#C9A96E',
      title: t.services.international.title,
      items: t.services.international.items,
    },
    {
      key: 'immigration',
      color: '#5C3542',
      title: t.services.immigration.title,
      items: t.services.immigration.items,
    },
  ];

  const visible = activeTab === 'all' ? sections : sections.filter(s => s.key === activeTab);

  return (
    <main className="services page-enter">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="section-title">{t.services.title}</h1>
          <div className="divider"></div>
          <p className="page-header__subtitle">{t.services.subtitle}</p>
        </div>
      </section>

      {/* Tab filter */}
      <section className="services-filter">
        <div className="container">
          <div className="services-filter__tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`services-filter__tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services cards */}
      <section className="services-main">
        <div className="container">
          <div className={`services-grid services-grid--${visible.length}`}>
            {visible.map((section) => (
              <div className="service-card" key={section.key}>
                <div className="service-card__header" style={{ background: section.color }}>
                  <div className="service-card__icon">{section.icon}</div>
                  <h2 className="service-card__title">{section.title}</h2>
                  <span className="service-card__count">
                    {section.items.length} {lang === 'es' ? 'servicios' : 'services'}
                  </span>
                </div>
                <div className="service-card__body">
                  <ul className="service-card__list">
                    {section.items.map((item, i) => (
                      <li className="service-card__item" key={i}>
                        <span className="service-card__bullet">⚖</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works">
        <div className="container">
          <div className="how-it-works__header">
            <p className="section-subtitle">{lang === 'es' ? 'Nuestro Proceso' : 'Our Process'}</p>
            <h2 className="section-title">{lang === 'es' ? 'Cómo Trabajamos' : 'How We Work'}</h2>
            <div className="divider divider-center"></div>
          </div>
          <div className="process-steps">
            {[
              {
                num: '01',
                titleEn: 'Initial Consultation',
                titleEs: 'Consulta Inicial',
                descEn: 'Tell us about your legal situation. We assess your needs and explain the best approach.',
                descEs: 'Cuéntanos tu situación legal. Evaluamos tus necesidades y explicamos el mejor enfoque.'
              },
              {
                num: '02',
                titleEn: 'Legal Strategy',
                titleEs: 'Estrategia Legal',
                descEn: 'We design a tailored plan — whether tax optimization or immigration procedure.',
                descEs: 'Diseñamos un plan a medida — sea optimización fiscal o procedimiento migratorio.'
              },
              {
                num: '03',
                titleEn: 'Execution',
                titleEs: 'Ejecución',
                descEn: 'We handle all paperwork, filings, and communications with Spanish authorities.',
                descEs: 'Gestionamos toda la documentación y comunicaciones con las autoridades españolas.'
              },
              {
                num: '04',
                titleEn: 'Resolution',
                titleEs: 'Resolución',
                descEn: 'We guide you through to a successful conclusion with ongoing support as needed.',
                descEs: 'Te guiamos hasta una resolución exitosa con apoyo continuo cuando sea necesario.'
              }
            ].map((step, i) => (
              <div className="process-step" key={i}>
                <div className="process-step__num">{step.num}</div>
                <h3 className="process-step__title">{lang === 'es' ? step.titleEs : step.titleEn}</h3>
                <p className="process-step__desc">{lang === 'es' ? step.descEs : step.descEn}</p>
                {i < 3 && <div className="process-step__arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <div className="container">
          <div className="services-cta__inner">
            <h2 className="services-cta__title">
              {lang === 'es' ? '¿No encuentras lo que buscas?' : "Don't see what you need?"}
            </h2>
            <p className="services-cta__sub">
              {lang === 'es'
                ? 'Contáctanos directamente. Nuestros abogados evaluarán tu caso de forma personalizada.'
                : 'Contact us directly. Our lawyers will evaluate your case on a personal basis.'}
            </p>
            <Link to="/contact" className="btn-primary" style={{ marginTop: '1.5rem' }}>
              {t.services.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
