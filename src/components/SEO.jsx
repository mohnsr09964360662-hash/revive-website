import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../i18n/LanguageContext';

const SEO = ({ title, description, name, type, url, image }) => {
  const { isRTL } = useLanguage();
  
  const siteName = isRTL ? 'مؤسسة إحياء للتنمية' : 'REVIVE Development Foundation';
  const defaultTitle = isRTL ? 'إحياء | نحو غدٍ أفضل' : 'REVIVE | Towards a Better Tomorrow';
  const defaultDesc = isRTL 
    ? 'مؤسسة إحياء تقدم حلولاً تنموية وإغاثية مستدامة.' 
    : 'REVIVE provides sustainable development and relief solutions.';
    
  const currentTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const currentDesc = description || defaultDesc;
  const currentUrl = url || window.location.href;
  const currentImage = image || `${window.location.origin}/logo.png`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{currentTitle}</title>
      <meta name='description' content={currentDesc} />
      
      {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDesc} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={currentImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name || siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDesc} />
      <meta name="twitter:image" content={currentImage} />
    </Helmet>
  );
};

export default SEO;
