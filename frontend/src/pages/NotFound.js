import React from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './NotFound.css';

export default function NotFound() {
  const { lang } = useLang();
  return (
    <main className="notfound page-enter">
      <div className="container">
        <div className="notfound__inner">
          <div className="notfound__emblem">⚖️</div>
          <h1 className="notfound__code">404</h1>
          <h2 className="notfound__title">
            {lang === 'es' ? 'Página No Encontrada' : 'Page Not Found'}
          </h2>
          <p className="notfound__desc">
            {lang === 'es'
              ? 'La página que buscas no existe o ha sido movida.'
              : 'The page you are looking for does not exist or has been moved.'}
          </p>
          <Link to="/" className="btn-primary">
            {lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </main>
  );
}
