import React, { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import './Contact.css';

const initialForm = { name: '', email: '', phone: '', service: '', message: '' };

export default function Contact() {
  const { t, lang } = useLang();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setStatusMsg(data.message || t.contact.success);
        setForm(initialForm);
      } else {
        setStatus('error');
        setStatusMsg(data.message || t.contact.error);
      }
    } catch {
      setStatus('error');
      setStatusMsg(t.contact.error);
    }
  };

  return (
    <main className="contact page-enter">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <p className="section-subtitle">{lang === 'es' ? 'Estamos Aquí Para Ti' : 'We Are Here For You'}</p>
          <h1 className="section-title">{t.contact.title}</h1>
          <div className="divider"></div>
          <p className="page-header__subtitle">{t.contact.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      
            
            {/* Form */}
            <div className="contact-form-wrap">
              <h2 className="contact-form-wrap__title">
                {lang === 'es' ? 'Envíanos un Mensaje' : 'Send Us a Message'}
              </h2>

              {status === 'success' && (
                <div className="contact-alert contact-alert--success">
                  <span>✅</span>
                  <p>{statusMsg}</p>
                </div>
              )}

              {status === 'error' && (
                <div className="contact-alert contact-alert--error">
                  <span>❌</span>
                  <p>{statusMsg}</p>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label className="contact-form__label">
                      {t.contact.form.name} <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="contact-form__input"
                      placeholder={t.contact.form.namePlaceholder}
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">
                      {t.contact.form.email} <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="contact-form__input"
                      placeholder={t.contact.form.emailPlaceholder}
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label className="contact-form__label">{t.contact.form.phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      className="contact-form__input"
                      placeholder={t.contact.form.phonePlaceholder}
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">{t.contact.form.service}</label>
                    <select
                      name="service"
                      className="contact-form__input contact-form__select"
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">{t.contact.form.servicePlaceholder}</option>
                      {t.contact.form.services.map((s, i) => (
                        <option key={i} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label">
                    {t.contact.form.message} <span className="required">*</span>
                  </label>
                  <textarea
                    name="message"
                    className="contact-form__input contact-form__textarea"
                    placeholder={t.contact.form.messagePlaceholder}
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary contact-form__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <span className="contact-form__spinner"></span>
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.form.submit}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
         
     
    </main>
  );
}
