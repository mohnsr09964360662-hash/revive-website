import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { FaTools, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ComingSoon.css';

const ComingSoon = () => {
  const { isRTL } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <motion.div 
        className="coming-soon-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="icon-wrapper">
          <FaTools className="pulse-icon" />
        </div>
        <h1>{isRTL ? 'قريباً...' : 'Coming Soon...'}</h1>
        <p>
          {isRTL 
            ? 'نعمل بشغف على تجهيز هذه الصفحة والخدمات لتقديم أفضل تجربة لكم. يرجى زيارتنا لاحقاً!' 
            : 'We are passionately working on this page and our services to provide you with the best experience. Check back soon!'}
        </p>
        
        <div className="coming-soon-actions">
          <button onClick={() => navigate(-1)} className="btn-outline">
            {isRTL ? <FaArrowRight /> : <FaArrowLeft />}
            {isRTL ? 'الرجوع للسابق' : 'Go Back'}
          </button>
          <Link to="/" className="btn-primary">
            {isRTL ? 'الصفحة الرئيسية' : 'Home Page'}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
