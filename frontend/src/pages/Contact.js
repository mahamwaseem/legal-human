import React, { useEffect, useState } from 'react';
import { supabase } from "../supabaseclient";
import { useLang } from '../context/LanguageContext';
import './Contact.css';

const initialForm = { 
  fullName: '', 
  dniNie: '', 
  address: '', 
  contactNumber: ''
};

export default function Contact() {
  const { lang, t } = useLang();
  const formLabels = t.contact?.form || {};
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = lang === 'es' ? 'El nombre completo es requerido' : 'Full name is required';
    if (!form.dniNie.trim()) newErrors.dniNie = lang === 'es' ? 'DNI/NIE es requerido' : 'DNI/NIE is required';
    if (!form.address.trim()) newErrors.address = lang === 'es' ? 'La dirección es requerida' : 'Address is required';
    if (!form.contactNumber.trim()) newErrors.contactNumber = lang === 'es' ? 'El teléfono es requerido' : 'Contact number is required';

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

    try {
      const { data, error } = await supabase
        .from("users")
       .insert([
  {
    full_name: form.fullName,
    dni_nie: form.dniNie,
    address: form.address,
    contact_number: form.contactNumber
  }
]);

      if (error) {
        setStatus('error');
        setStatusMsg(lang === 'es' ? 'Error al guardar los datos ❌' : 'Error saving data ❌');
        console.log(error);
      } else {
        setStatus('success');
        setStatusMsg(lang === 'es' ? '¡Datos guardados correctamente! ✅' : 'Data saved successfully ✅');
        setForm(initialForm);

        setTimeout(() => {
          setStatus('idle');
          setStatusMsg('');
        }, 3000);
      }

    } catch (err) {
      setStatus('error');
      setStatusMsg(lang === 'es' ? 'Algo salió mal ❌' : 'Something went wrong ❌');
      console.error(err);
    }
  };

  return (
    <main className="contact">
      <div className="container">
        <h2>{t.contact?.title || 'Contact Us'}</h2>

        {status === 'success' && <p style={{color: 'green'}}>{statusMsg}</p>}
        {status === 'error' && <p style={{color: 'red'}}>{statusMsg}</p>}

        <form className="contact-form" onSubmit={handleSubmit}>

          <input
            className={`contact-form__input ${errors.fullName ? 'error' : ''}`}
            type="text"
            name="fullName"
            placeholder={formLabels.fullNamePlaceholder || 'Full Name'}
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="contact-form__error">{errors.fullName}</span>}

          <input
            className={`contact-form__input ${errors.dniNie ? 'error' : ''}`}
            type="text"
            name="dniNie"
            placeholder={formLabels.dniNiePlaceholder || 'DNI/NIE'}
            value={form.dniNie}
            onChange={handleChange}
          />
          {errors.dniNie && <span className="contact-form__error">{errors.dniNie}</span>}

          <input
            className={`contact-form__input ${errors.address ? 'error' : ''}`}
            type="text"
            name="address"
            placeholder={formLabels.addressPlaceholder || 'Address'}
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <span className="contact-form__error">{errors.address}</span>}

          <input
            className={`contact-form__input ${errors.contactNumber ? 'error' : ''}`}
            type="tel"
            name="contactNumber"
            placeholder={formLabels.contactNumberPlaceholder || 'Contact Number'}
            value={form.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <span className="contact-form__error">{errors.contactNumber}</span>}

          <button className="contact-form__submit" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? (lang === 'es' ? 'Guardando...' : 'Saving...') : (formLabels.submit || 'Submit')}
          </button>

        </form>
      </div>
    </main>
  );
}