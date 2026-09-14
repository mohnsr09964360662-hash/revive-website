import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import './NotFound.css';

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>{t('notfound.title') || 'Page Not Found'}</h2>
        <p>{t('notfound.desc') || 'The page you are looking for does not exist or has been moved.'}</p>
        <Link to="/" className="btn-primary">
          {t('notfound.back') || 'Back to Home'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
