import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import './FloatingDonate.css';

const FloatingDonate = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <motion.div
      className={`floating-donate ${isRtl ? 'rtl' : 'ltr'}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <Link to="/donation" className="floating-donate-btn">
        <span className="floating-donate-icon">❤️</span>
        <span className="floating-donate-text">{t('nav.donation') || 'Donate Now'}</span>
      </Link>
    </motion.div>
  );
};

export default FloatingDonate;
