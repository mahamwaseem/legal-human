import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT US',
      services: 'SERVICES',
      contact: 'CONTACT',
    },
    home: {
      tagline: 'Experts in Tax and Immigration Law.',
      intro1: 'At Legal Human, we provide tax advice to individuals and self-employed professionals to help reduce their tax burden and achieve maximum savings legally. We plan assets and design the most efficient tax strategy, tailored to each client.',
      intro2: 'In the field of immigration law, we support migrants and their families at every stage. We offer legal advice, answer questions, and handle all the administrative procedures in Spain: residence permits, nationality applications, and asylum processes.',
      intro3: 'Our goal is to offer you a comprehensive service that combines legal expertise, social commitment, and a human-centered approach, so you can live and work in Spain with peace of mind and full legal support.',
      intro4: 'Additionally, at Legal Human we specialize in international taxation and the processing of the digital nomad visa. We offer a complete service for those who wish to work remotely from Spain.',
      cta: 'Schedule a Consultation',
      ctaSecondary: 'Our Services',
      statsYears: 'Years Experience',
      statsClients: 'Clients Served',
      statsServices: 'Legal Services',
      statsCountries: 'Countries Covered',
    },
    about: {
      title: 'About Us',
      subtitle: 'Meet our team of dedicated legal professionals',
      yasmina: {
        name: 'Yasmina Maini',
        role: 'Tax Lawyer & Advisor',
        bio: 'Lawyer and tax advisor specializing in tax planning, optimization, and international taxation.',
        details: 'With extensive experience in Spanish tax law, Yasmina helps individuals and businesses minimize their fiscal burden through legal and efficient strategies. She provides expert guidance on income tax, wealth tax, and international tax agreements.'
      },
      dana: {
        name: 'Dana Maini',
        role: 'Human Rights & Immigration Expert',
        bio: 'Human rights and European law expert with extensive experience providing legal advice to migrants.',
        details: 'Dana specializes in immigration law, helping migrants and their families navigate the Spanish legal system. Her expertise covers residence permits, nationality applications, asylum processes, and EU resident permits.'
      },
      values: {
        title: 'Our Values',
        human: { title: 'Human-Centered', desc: 'Every client deserves personalized attention and care throughout their legal journey.' },
        expert: { title: 'Expert Guidance', desc: 'Our lawyers bring deep expertise in both tax law and immigration to every case.' },
        commitment: { title: 'Social Commitment', desc: 'We believe in making quality legal services accessible to all, regardless of background.' },
        trust: { title: 'Trust & Transparency', desc: 'We communicate clearly and honestly, keeping you informed at every step.' }
      }
    },
    services: {
      title: 'Services',
      subtitle: 'How can we help you?',
      contactUs: 'CONTACT US',
      taxation: {
        title: 'Taxation',
        items: [
          'Income Tax Returns',
          'Self-Employed (Freelancers) Tax Management',
          'Wealth Tax',
          'Special Taxes',
          'Local Taxes',
          'Management of AEAT (Spanish Tax Agency) Notifications',
          'Economic-Administrative Claims and Appeals',
          'Tax Inspections',
        ]
      },
      international: {
        title: 'International Taxation',
        items: [
          'Investment Strategies and Tax Planning',
          'Double Taxation Agreements',
          'Forms 720 and 721',
          '"Impatriate Regime" (Beckham Law)',
          'Non-Residents: IRNR Form 210',
          'Due Diligence',
        ]
      },
      immigration: {
        title: 'Immigration',
        items: [
          'Temporary Residence and Work Permits',
          'Residence Permits for Exceptional Circumstances',
          'Long-Term Residence Permits',
          'Family Reunification',
          'Renewals',
          'EU Resident Permits',
          'Student Visa and Student Card',
          'Degree Recognition and Validation',
          'Spanish Nationality by Residence',
          'Spanish Nationality by Option or Marriage',
          'Appeals Against Denials',
          'Digital Nomad Visa',
        ]
      }
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get in touch with our legal team',
      form: {
        name: 'Full Name',
        namePlaceholder: 'Your full name',
        email: 'Email Address',
        emailPlaceholder: 'your@email.com',
        phone: 'Phone Number',
        phonePlaceholder: '+34 000 000 000',
        service: 'Service of Interest',
        servicePlaceholder: 'Select a service',
        message: 'Message',
        messagePlaceholder: 'Describe your legal situation...',
        submit: 'Send Message',
        sending: 'Sending...',
        services: [
          'Income Tax Returns',
          'Immigration & Residence',
          'Digital Nomad Visa',
          'International Taxation',
          'Beckham Law',
          'Spanish Nationality',
          'Family Reunification',
          'Other',
        ]
      },
      info: {
        address: 'Spain',
        hours: 'Mon–Fri: 9:00 AM – 6:00 PM',
      },
      success: 'Message sent successfully! We will contact you soon.',
      error: 'Error sending message. Please try again.'
    },
    footer: {
      tagline: 'Immigration and taxation',
      privacy: 'Privacy Policy',
      legal: 'Legal Notice',
      rights: 'All rights reserved.',
    }
  },
  es: {
    nav: {
      home: 'INICIO',
      about: 'SOBRE NOSOTROS',
      services: 'SERVICIOS',
      contact: 'CONTACTO',
    },
    home: {
      tagline: 'Expertos en Derecho Fiscal e Inmigración.',
      intro1: 'En Legal Human, ofrecemos asesoría fiscal a particulares y autónomos para reducir su carga tributaria y lograr el máximo ahorro legal. Planificamos el patrimonio y diseñamos la estrategia fiscal más eficiente, adaptada a cada cliente.',
      intro2: 'En el ámbito del derecho de extranjería, apoyamos a migrantes y sus familias en cada etapa. Ofrecemos asesoría legal, respondemos preguntas y gestionamos todos los trámites administrativos en España: permisos de residencia, solicitudes de nacionalidad y procesos de asilo.',
      intro3: 'Nuestro objetivo es ofrecerte un servicio integral que combine experiencia jurídica, compromiso social y un enfoque centrado en las personas, para que puedas vivir y trabajar en España con tranquilidad y pleno apoyo legal.',
      intro4: 'Además, en Legal Human nos especializamos en fiscalidad internacional y en la tramitación del visado de nómada digital. Ofrecemos un servicio completo para quienes desean trabajar en remoto desde España.',
      cta: 'Consulta Gratuita',
      ctaSecondary: 'Nuestros Servicios',
      statsYears: 'Años de Experiencia',
      statsClients: 'Clientes Atendidos',
      statsServices: 'Servicios Legales',
      statsCountries: 'Países Cubiertos',
    },
    about: {
      title: 'Sobre Nosotros',
      subtitle: 'Conoce a nuestro equipo de profesionales legales',
      yasmina: {
        name: 'Yasmina Maini',
        role: 'Abogada y Asesora Fiscal',
        bio: 'Abogada y asesora fiscal especializada en planificación fiscal, optimización y fiscalidad internacional.',
        details: 'Con amplia experiencia en derecho fiscal español, Yasmina ayuda a particulares y empresas a minimizar su carga fiscal mediante estrategias legales y eficientes. Ofrece orientación experta en IRPF, impuesto sobre el patrimonio y convenios fiscales internacionales.'
      },
      dana: {
        name: 'Dana Maini',
        role: 'Experta en Derechos Humanos e Inmigración',
        bio: 'Experta en derechos humanos y derecho europeo con amplia experiencia asesorando a migrantes.',
        details: 'Dana está especializada en derecho de extranjería, ayudando a migrantes y sus familias a navegar el sistema legal español. Su experiencia abarca permisos de residencia, solicitudes de nacionalidad, procesos de asilo y permisos de residente europeo.'
      },
      values: {
        title: 'Nuestros Valores',
        human: { title: 'Enfoque Humano', desc: 'Cada cliente merece atención personalizada y cuidado durante todo su proceso legal.' },
        expert: { title: 'Orientación Experta', desc: 'Nuestros abogados aportan profunda experiencia en derecho fiscal y migratorio.' },
        commitment: { title: 'Compromiso Social', desc: 'Creemos en hacer accesibles los servicios legales de calidad a todos, sin importar su origen.' },
        trust: { title: 'Confianza y Transparencia', desc: 'Comunicamos con claridad y honestidad, manteniéndote informado en cada paso.' }
      }
    },
    services: {
      title: 'Servicios',
      subtitle: '¿Cómo podemos ayudarte?',
      contactUs: 'CONTÁCTANOS',
      taxation: {
        title: 'Fiscalidad',
        items: [
          'Declaraciones de la Renta (IRPF)',
          'Gestión Fiscal para Autónomos',
          'Impuesto sobre el Patrimonio',
          'Impuestos Especiales',
          'Impuestos Locales',
          'Gestión de Notificaciones de la AEAT',
          'Reclamaciones y Recursos Económico-Administrativos',
          'Inspecciones Fiscales',
        ]
      },
      international: {
        title: 'Fiscalidad Internacional',
        items: [
          'Estrategias de Inversión y Planificación Fiscal',
          'Convenios de Doble Imposición',
          'Modelos 720 y 721',
          '"Régimen de Impatriados" (Ley Beckham)',
          'No Residentes: Modelo 210 (IRNR)',
          'Due Diligence',
        ]
      },
      immigration: {
        title: 'Extranjería',
        items: [
          'Permisos de Residencia y Trabajo Temporales',
          'Permisos de Residencia por Circunstancias Excepcionales',
          'Permisos de Residencia de Larga Duración',
          'Reagrupación Familiar',
          'Renovaciones',
          'Permisos de Residente Europeo',
          'Visado de Estudiante y Tarjeta de Estudiante',
          'Reconocimiento y Homologación de Títulos',
          'Nacionalidad Española por Residencia',
          'Nacionalidad Española por Opción o Matrimonio',
          'Recursos contra Denegaciones',
          'Visado de Nómada Digital',
        ]
      }
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Ponte en contacto con nuestro equipo legal',
      form: {
        name: 'Nombre Completo',
        namePlaceholder: 'Tu nombre completo',
        email: 'Correo Electrónico',
        emailPlaceholder: 'tu@correo.com',
        phone: 'Número de Teléfono',
        phonePlaceholder: '+34 000 000 000',
        service: 'Servicio de Interés',
        servicePlaceholder: 'Selecciona un servicio',
        message: 'Mensaje',
        messagePlaceholder: 'Describe tu situación legal...',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        services: [
          'Declaración de la Renta',
          'Inmigración y Residencia',
          'Visado de Nómada Digital',
          'Fiscalidad Internacional',
          'Ley Beckham',
          'Nacionalidad Española',
          'Reagrupación Familiar',
          'Otro',
        ]
      },
      info: {
        address: 'España',
        hours: 'Lun–Vie: 9:00 – 18:00',
      },
      success: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.',
      error: 'Error al enviar el mensaje. Por favor intenta más tarde.'
    },
    footer: {
      tagline: 'Inmigración y fiscalidad',
      privacy: 'Política de Privacidad',
      legal: 'Aviso Legal',
      rights: 'Todos los derechos reservados.',
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
