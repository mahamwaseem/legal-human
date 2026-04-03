import React, { useEffect, useState } from 'react';
import { useLang } from '../context/LanguageContext';
import './Contact.css';

const initialForm = { 
  fullName: '', 
  dniNie: '', 
  address: '', 
  contactNumber: '', 
  email: '', 
  service: '', 
  message: '' 
};

export default function Contact() {
  const { t, lang } = useLang();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.dniNie.trim()) newErrors.dniNie = 'DNI/NIE is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('sending');
    setErrors({});
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          fullName: form.fullName,
          dniNie: form.dniNie,
          address: form.address,
          contactNumber: form.contactNumber,
          email: form.email,
          service: form.service,
          message: form.message,
          lang 
        }),
      });
      const data = await res.json();
      
      if (data.success) {
        setStatus('success');
        setStatusMsg(data.message || t.contact.success);
        setForm(initialForm);
        // Clear success message after 3 seconds
        setTimeout(() => {
          setStatus('idle');
          setStatusMsg('');
        }, 3000);
      } else {
        setStatus('error');
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatusMsg(data.message || t.contact.error);
      }
    } catch (err) {
      setStatus('error');
      setStatusMsg(t.contact.error);
      console.error('Contact form error:', err);
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
      <div className="container">
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
            {/* Full Name and DNI/NIE */}
            <div className="contact-form__row">
              <div className="contact-form__group">
                <label className="contact-form__label">
                  {t.contact.form.fullName} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  className={`contact-form__input ${errors.fullName ? 'error' : ''}`}
                  placeholder={t.contact.form.fullNamePlaceholder}
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
                {errors.fullName && <span className="contact-form__error">{errors.fullName}</span>}
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label">
                  {t.contact.form.dniNie} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="dniNie"
                  className={`contact-form__input ${errors.dniNie ? 'error' : ''}`}
                  placeholder={t.contact.form.dniNiePlaceholder}
                  value={form.dniNie}
                  onChange={handleChange}
                  pattern="^[0-9XYZ]{1}[0-9]{7}[A-Z]{1}$|^[0-9]{8}[A-Z]?$"
                  required
                />
                {errors.dniNie && <span className="contact-form__error">{errors.dniNie}</span>}
              </div>
            </div>

            {/* Address and Contact Number */}
            <div className="contact-form__row">
              <div className="contact-form__group">
                <label className="contact-form__label">
                  {t.contact.form.address} <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  className={`contact-form__input ${errors.address ? 'error' : ''}`}
                  placeholder={t.contact.form.addressPlaceholder}
                  value={form.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && <span className="contact-form__error">{errors.address}</span>}
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label">
                  {t.contact.form.contactNumber} <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  className={`contact-form__input ${errors.contactNumber ? 'error' : ''}`}
                  placeholder={t.contact.form.contactNumberPlaceholder}
                  value={form.contactNumber}
                  onChange={handleChange}
                  required
                />
                {errors.contactNumber && <span className="contact-form__error">{errors.contactNumber}</span>}
              </div>
            </div>

            {/* Email and Service */}
            <div className="contact-form__row">
              <div className="contact-form__group">
                <label className="contact-form__label">{t.contact.form.email}</label>
                <input
                  type="email"
                  name="email"
                  className={`contact-form__input ${errors.email ? 'error' : ''}`}
                  placeholder={t.contact.form.emailPlaceholder}
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="contact-form__error">{errors.email}</span>}
              </div>
              <div className="contact-form__group">
                <label className="contact-form__label">{t.contact.form.service}</label>
                <select
                  name="service"
                  className={`contact-form__input contact-form__select ${errors.service ? 'error' : ''}`}
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">{t.contact.form.servicePlaceholder}</option>
                  {t.contact.form.services.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service && <span className="contact-form__error">{errors.service}</span>}
              </div>
            </div>

            {/* Message */}
            <div className="contact-form__group">
              <label className="contact-form__label">{t.contact.form.message}</label>
              <textarea
                name="message"
                className={`contact-form__input contact-form__textarea ${errors.message ? 'error' : ''}`}
                placeholder={t.contact.form.messagePlaceholder}
                value={form.message}
                onChange={handleChange}
                rows={5}
              />
              {errors.message && <span className="contact-form__error">{errors.message}</span>}
            </div>

            {/* Submit Button */}
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
      </div>
    </main>
  );
}
