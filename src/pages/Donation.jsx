import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import './Donation.css';

import imgWomen from '../assets/field-community.jpeg';
import imgTech from '../assets/field-team.jpeg';
import imgChildren from '../assets/field-child.jpeg';
import imgYarmouk from '../assets/field-alley.jpeg';

const techWorkshopImg = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80';

const PROJECT_DATA = [
  {
    id: 'women_empowerment',
    name: {
      en: 'Women Empowerment',
      ar: 'دعم المرأة'
    },
    description: {
      en: 'Empowering women through vocational training, psychological support, and economic opportunities to build a sustainable future.',
      ar: 'تمكين المرأة من خلال التدريب المهني والدعم النفسي وتوفير الفرص الاقتصادية لبناء مستقبل مستدام.'
    },
    image: imgWomen
  },
  {
    id: 'technical_courses',
    name: {
      en: 'Technical Courses',
      ar: 'الدورات التقنية'
    },
    description: {
      en: 'Providing specialized technical courses to youth, equipping them with modern skills demanded by the current job market.',
      ar: 'توفير دورات تقنية متخصصة للشباب لتزويدهم بالمهارات الحديثة المطلوبة في سوق العمل الحالي.'
    },
    image: techWorkshopImg
  },
  {
    id: 'children_education',
    name: {
      en: "Children's Education Follow-up",
      ar: 'متابعة الاطفال في الدراسة'
    },
    description: {
      en: 'Ensuring children stay in school by providing supplementary education, school supplies, and continuous follow-up.',
      ar: 'ضمان استمرار الأطفال في المدارس من خلال توفير التعليم الإضافي واللوازم المدرسية والمتابعة المستمرة.'
    },
    image: imgChildren
  },
  {
    id: 'restoring_schools',
    name: {
      en: 'Restoring Damaged Schools in Yarmouk',
      ar: 'ترميم المدارس المتضررة في مخيم اليرموك'
    },
    description: {
      en: 'Rehabilitating and repairing damaged schools in Yarmouk Camp to provide a safe and healthy learning environment for students.',
      ar: 'إعادة تأهيل وترميم المدارس المتضررة في مخيم اليرموك لتوفير بيئة تعليمية آمنة وصحية للطلاب.'
    },
    image: imgYarmouk
  }
];

const Donation = () => {
  const { t, language, isRTL } = useLanguage();
  const { addToCart } = useCart();
  const location = useLocation();

  const [selectedProjectId, setSelectedProjectId] = useState(PROJECT_DATA[0].id);
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectParam = params.get('project');
    if (projectParam && PROJECT_DATA.some(p => p.id === projectParam)) {
      setSelectedProjectId(projectParam);
    }
  }, [location]);

  const selectedProject = PROJECT_DATA.find(p => p.id === selectedProjectId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;

    addToCart({
      id: `don-${selectedProjectId}-${Date.now()}`,
      title: selectedProject.name[language] || selectedProject.name.en,
      price: parseFloat(amount),
      quantity: 1,
      image: selectedProject.image
    });

    setAmount('');
    setDonorName('');
    setDonorEmail('');
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="donation-page">
      <div className="page-header">
        <div className="auto__container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp}>
            {t('donation.title') || (isRTL ? 'تبرع الآن' : 'Donate Now')}
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} className="header-desc">
            {t('donation.desc') || (isRTL ? 'مساهمتك تصنع فرقاً حقيقياً في حياة الكثيرين. اختر المشروع الذي ترغب بدعمه.' : 'Your contribution makes a real difference. Choose a project to support.')}
          </motion.p>
        </div>
      </div>

      <section className="donation-section section-padding">
        <div className="auto__container">
          <div className="donation-split-layout">
            <motion.div 
              className="donation-project-info"
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedProject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="project-info-card"
                >
                  <div className="project-image-wrapper">
                    <img src={selectedProject.image} alt={selectedProject.name[language] || selectedProject.name.en} className="project-image" />
                    <div className="image-overlay">
                      <h3>{selectedProject.name[language] || selectedProject.name.en}</h3>
                    </div>
                  </div>
                  <div className="project-desc">
                    <p>{selectedProject.description[language] || selectedProject.description.en}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div 
              className="donation-form-wrapper"
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="donation-form-container">
                <h2>{t('donation.formTitle') || (isRTL ? 'تفاصيل التبرع' : 'Donation Details')}</h2>
                
                {showSuccess && (
                  <div className="success-message">
                    {isRTL ? 'تمت إضافة التبرع إلى السلة بنجاح!' : 'Donation added to cart successfully!'}
                  </div>
                )}

                <form className="donation-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>{t('donation.projectName') || (isRTL ? 'المشروع' : 'Project')}</label>
                    <select 
                      value={selectedProjectId} 
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                      required
                    >
                      {PROJECT_DATA.map(project => (
                        <option key={project.id} value={project.id}>
                          {project.name[language] || project.name.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>{t('donation.amount') || (isRTL ? 'المبلغ' : 'Amount')}</label>
                    <div className="amount-input-wrapper">
                      <span className="currency-symbol">$</span>
                      <input 
                        type="number" 
                        min="1" 
                        placeholder="50" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>{t('donation.name') || (isRTL ? 'الاسم' : 'Name')}</label>
                    <input 
                      type="text" 
                      placeholder={isRTL ? 'الاسم الكامل' : 'Full Name'}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>{t('donation.email') || (isRTL ? 'البريد الإلكتروني' : 'Email')}</label>
                    <input 
                      type="email" 
                      placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'} 
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      required 
                    />
                  </div>

                  <button type="submit" className="button primary donate-submit-btn">
                    {t('donation.donateBtn') || (isRTL ? 'تبرع الآن' : 'Donate Now')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donation;
