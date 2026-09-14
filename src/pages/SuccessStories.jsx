import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import './SuccessStories.css';

const SuccessStories = () => {
  const { t, language } = useLanguage();

  const stories = [
    {
      id: 1,
      name: language === 'ar' ? 'أحمد العبدلله' : 'Ahmed Al-Abdullah',
      program: language === 'ar' ? 'المسار المهني التقني' : 'Technical Track',
      quote: language === 'ar' ? 'بفضل دورة صيانة الهواتف، تمكنت من افتتاح مشروعي الخاص الصغير وبدأت أعتمد على نفسي مالياً.' : 'Thanks to the smartphone repair course, I opened my own small business and became financially independent.',
      date: '2025'
    },
    {
      id: 2,
      name: language === 'ar' ? 'سارة المحمد' : 'Sarah Al-Mohammad',
      program: language === 'ar' ? 'تمكين المرأة - ريادة الأعمال' : 'Women Empowerment',
      quote: language === 'ar' ? 'لم أكن أتخيل أن أمتلك المهارات اللازمة لتسويق منتجاتي اليدوية. الآن لدي متجر إلكتروني يحقق مبيعات جيدة.' : 'I never imagined having the skills to market my handmade products. Now I have an e-store with great sales.',
      date: '2024'
    },
    {
      id: 3,
      name: language === 'ar' ? 'يوسف الحريري' : 'Yousef Al-Hariri',
      program: language === 'ar' ? 'التعليم الرقمي للأطفال' : 'Digital Education for Children',
      quote: language === 'ar' ? 'تعلمت البرمجة باستخدام سكراتش، وصنعت أول لعبة لي. أحلم أن أصبح مهندس برمجيات في المستقبل.' : 'I learned programming with Scratch and made my first game. I dream of becoming a software engineer.',
      date: '2026'
    },
    {
      id: 4,
      name: language === 'ar' ? 'ليلى الكردي' : 'Laila Al-Kurdi',
      program: language === 'ar' ? 'التوعية المجتمعية' : 'Community Awareness',
      quote: language === 'ar' ? 'ندوات الدعم النفسي ساعدتني كثيراً في تخطي الصعوبات والتعامل مع ضغوط الحياة في المخيم بإيجابية.' : 'The psychological support seminars helped me greatly in overcoming difficulties and dealing with life pressures positively.',
      date: '2025'
    },
    {
      id: 5,
      name: language === 'ar' ? 'محمد سعيد' : 'Mohammed Saeed',
      program: language === 'ar' ? 'المسار الأكاديمي' : 'Academic Track',
      quote: language === 'ar' ? 'دروس التقوية في اللغة الإنجليزية مكنتني من الحصول على منحة دراسية لاستكمال دراستي الجامعية.' : 'The English language tutoring enabled me to get a scholarship to complete my university studies.',
      date: '2024'
    },
    {
      id: 6,
      name: language === 'ar' ? 'فاطمة الحسن' : 'Fatima Al-Hassan',
      program: language === 'ar' ? 'الفنون والترفيه' : 'Arts & Entertainment',
      quote: language === 'ar' ? 'ورش الرسم أعطتني مساحة للتعبير عن مشاعري واكتشاف موهبتي التي لم أكن أعرف بوجودها.' : 'Drawing workshops gave me a space to express my feelings and discover a talent I didn\'t know I had.',
      date: '2026'
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="success-page">
      <div className="page-header">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp}>{t('success.title')}</motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} className="header-desc">{t('success.desc')}</motion.p>
        </div>
      </div>

      <section className="stories-section section-padding bg-light">
        <div className="container">
          <motion.div className="stories-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {stories.map(story => (
              <motion.div key={story.id} className="story-card" variants={fadeInUp}>
                <div className="story-header">
                  <div className="story-avatar">
                    {story.name.charAt(0)}
                  </div>
                  <div className="story-meta">
                    <h4>{story.name}</h4>
                    <span className="story-program">{story.program}</span>
                  </div>
                </div>
                <div className="story-body">
                  <p>"{story.quote}"</p>
                </div>
                <div className="story-footer">
                  <span className="story-date">{story.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
