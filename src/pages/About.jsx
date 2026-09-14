import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

import imgCamp from '../assets/field-camp.jpeg';
import imgCommunity from '../assets/field-community.jpeg';
import imgTeam from '../assets/field-team.jpeg';
import imgChild from '../assets/field-child.jpeg';
import imgOutreach from '../assets/field-outreach.jpeg';
import imgMen from '../assets/field-men.jpeg';
import imgStreet from '../assets/field-street.jpeg';

export default function About() {
  const { isRTL, language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="about-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* 1. Page Hero Banner */}
      <section 
        className="about-hero" 
        style={{ backgroundImage: `url(${imgCamp})` }}
      >
        <div className="about-hero-content">
          <motion.h1 
            className="about-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isAr ? 'عن مؤسسة إحياء' : 'ABOUT REVIVE'}
          </motion.h1>
          <motion.p 
            className="about-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isAr ? 'مؤسسة إحياء للخدمات الاجتماعية' : 'Revive Foundation for Social Services'}
          </motion.p>
        </div>
      </section>

      {/* 2. Our Mission Section */}
      <section className="mission-section">
        <motion.div 
          className="mission-text"
          initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mission-title">{isAr ? 'مهمتنا' : 'Our Mission'}</h2>
          <p className="mission-description">
            {isAr 
              ? 'تعمل إحياء في سوريا على استعادة الفرص والكرامة والأمل للسوريين واللاجئين الفلسطينيين من خلال الاستثمار في الأفراد وتعزيز المجتمعات. عبر التعليم والصحة والرفاه والخدمات الاجتماعية والتمكين الاقتصادي والبرامج الثقافية، نزود الأفراد بالمعرفة والمهارات والموارد والثقة لتجاوز التحديات وبناء حياة مستقلة والمساهمة في مجتمعات أقوى وأكثر مرونة.'
              : 'Revive works in Syria to restore opportunity, dignity, and hope for Syrians and Palestinian refugees by investing in people and strengthening communities. Through education, health and well-being, social services, economic empowerment, and cultural programs, we equip individuals with the knowledge, skills, resources, and confidence to overcome challenges, build independent lives, and contribute to stronger, more resilient communities.'
            }
          </p>
        </motion.div>
        <motion.div 
          className="mission-image-wrapper"
          initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src={imgCommunity} alt="Our Mission" className="mission-image" />
        </motion.div>
      </section>

      {/* 3. Our Vision Section */}
      <section className="vision-section">
        <motion.div 
          className="vision-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="vision-title">{isAr ? 'رؤيتنا' : 'Our Vision'}</h2>
          <p className="vision-text">
            {isAr
              ? 'نحلم بعالم يملك فيه كل إنسان الفرصة ليتجاوز ظروفه ويحقق إمكاناته ويصنع مستقبلاً يعرّفه الكرامة والفرصة والهدف. نحلم بأفراد ممكّنين للتعلم والتعافي والإبداع والمساهمة، وعائلات مجهزة لبناء مستقبل آمن ومليء بالأمل، ومجتمعات تمتلك المعرفة والمرونة والقوة الجماعية لتحويل المحن إلى فرص. رؤيتنا ليست مجرد استعادة ما فُقد، بل المساعدة في صنع ما سيأتي — مستقبل لا يُعرَّف فيه الناس بالأزمات أو الظروف، بل بإمكاناتهم وقدرتهم على تشكيل العالم من حولهم.'
              : 'We envision a world where every person has the opportunity to rise beyond their circumstances, realize their potential, and shape a future defined by dignity, opportunity, and purpose. We envision individuals empowered to learn, heal, create, and contribute; families equipped to build secure and hopeful futures; and communities with the knowledge, resilience, and collective strength to transform adversity into opportunity. Our vision is not simply to restore what has been lost, but to help create what comes next—a future where people are not defined by crisis or circumstance, but by their potential and their ability to shape the world around them.'
            }
          </p>
        </motion.div>
      </section>

      {/* 4. Core Values Section */}
      <section className="values-section">
        <h2 className="values-title">{isAr ? 'قيمنا الأساسية' : 'Core Values'}</h2>
        <div className="values-grid">
          {[
            {
              icon: <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>,
              titleEn: 'Compassion', titleAr: 'الرحمة',
              descEn: 'We put people at the heart of our work.', descAr: 'نضع الإنسان في صميم عملنا.'
            },
            {
              icon: <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
              titleEn: 'Integrity', titleAr: 'النزاهة',
              descEn: 'We earn trust through how we work.', descAr: 'نكسب الثقة من خلال طريقة عملنا.'
            },
            {
              icon: <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
              titleEn: 'Empowerment', titleAr: 'التمكين',
              descEn: "We believe in people's potential.", descAr: 'نؤمن بقدرات الناس وإمكاناتهم.'
            },
            {
              icon: <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.606 2-5 2.224-.394 4.5.3 5 2.5.5 2.2 0 4.143-2 5-1.5.643-2.5 1.5-2.5 3"></path><path d="M8.5 14.5L6 17a3.535 3.535 0 005 5l2.5-2.5"></path><path d="M15.5 9.5L18 7a3.535 3.535 0 00-5-5L10.5 4.5"></path></svg>,
              titleEn: 'Collaboration', titleAr: 'التعاون',
              descEn: 'We believe lasting change is built together.', descAr: 'نؤمن أن التغيير الدائم يُبنى معاً.'
            },
            {
              icon: <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 1 8.3C19.24 16.56 15 20 11 20z"></path><line x1="11" y1="20" x2="14" y2="15"></line></svg>,
              titleEn: 'Sustainability', titleAr: 'الاستدامة',
              descEn: 'We build for tomorrow, not only for today.', descAr: 'نبني للغد وليس لليوم فقط.'
            }
          ].map((val, idx) => (
            <motion.div 
              className="value-card" 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="value-icon">{val.icon}</div>
              <h3 className="value-card-title">{isAr ? val.titleAr : val.titleEn}</h3>
              <p className="value-card-desc">{isAr ? val.descAr : val.descEn}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Guiding Philosophy Section */}
      <section className="philosophy-section">
        <motion.h2 
          className="philosophy-big-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {isAr ? 'نُمكّن... نُعيد... نُحيي' : 'Empower. Rebuild. Revive.'}
        </motion.h2>
        <div className="philosophy-grid">
          <div className="philosophy-item">
            <h3>{isAr ? 'نُمكّن' : 'Empower'}</h3>
            <p>{isAr ? 'بناء القدرات والثقة لمستقبل أفضل.' : 'Building capacity and confidence for a better future.'}</p>
          </div>
          <div className="philosophy-item">
            <h3>{isAr ? 'نُعيد' : 'Rebuild'}</h3>
            <p>{isAr ? 'استعادة الأمل والمجتمعات من جديد.' : 'Restoring hope and communities anew.'}</p>
          </div>
          <div className="philosophy-item">
            <h3>{isAr ? 'نُحيي' : 'Revive'}</h3>
            <p>{isAr ? 'خلق فرص مستدامة للحياة.' : 'Creating sustainable opportunities for life.'}</p>
          </div>
        </div>
        <motion.div 
          className="philosophy-quote-box"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          "{isAr ? 'كل إنسان هو قصة إحياء تنتظر أن تُروى' : 'Every human is a revival story waiting to be told.'}"
        </motion.div>
      </section>

      {/* 6. Image Gallery Strip */}
      <section className="gallery-strip">
        <img src={imgTeam} alt="Field Team" className="gallery-image" />
        <img src={imgChild} alt="Field Child" className="gallery-image" />
        <img src={imgOutreach} alt="Field Outreach" className="gallery-image" />
        <img src={imgMen} alt="Field Men" className="gallery-image" />
        <img src={imgStreet} alt="Field Street" className="gallery-image" />
      </section>
    </div>
  );
}
