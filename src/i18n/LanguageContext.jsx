import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ar');

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    const titles = {
      ar: 'مؤسسة REVIVE للخدمات الاجتماعية',
      en: 'REVIVE Social Services',
      tr: 'REVIVE Sosyal Hizmetler',
      de: 'REVIVE Soziale Dienste',
      es: 'REVIVE Servicios Sociales'
    };
    document.title = titles[language] || titles['en'];
  }, [language]);

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isRTL = language === 'ar';

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language] || translations['en'];
    for (let k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // fallback to key
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
