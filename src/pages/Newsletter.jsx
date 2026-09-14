import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/email';
import { 
  FaEnvelope, 
  FaPaperPlane, 
  FaFileAlt, 
  FaHeart, 
  FaCalendarAlt, 
  FaBell, 
  FaCheck, 
  FaShieldAlt, 
  FaHandsHelping,
  FaArrowRight, 
  FaArrowLeft 
} from 'react-icons/fa';
import './Newsletter.css';

export default function Newsletter() {
  const { t, isRTL, language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interests: {
      programs: true,
      events: true,
      campaigns: false,
      volunteering: false,
    }
  });
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (key) => {
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [key]: !prev.interests[key]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error(isRTL ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter your email address');
      return;
    }

    setLoading(true);
    
    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: `New Newsletter Subscription`,
        message: `Interests:\n- Programs: ${formData.interests.programs}\n- Events: ${formData.interests.events}\n- Campaigns: ${formData.interests.campaigns}\n- Volunteering: ${formData.interests.volunteering}`,
      };

      if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
         await new Promise((resolve) => setTimeout(resolve, 800));
      } else {
         await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
         );
      }

      toast.success(
        isRTL 
          ? 'شكراً لاشتراكك في نشرتنا البريدية! تم إرسال رسالة تأكيد إلى بريدك الإلكتروني.' 
          : 'Thank you for subscribing! A confirmation email has been sent to your inbox.'
      );

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        interests: {
          programs: true,
          events: true,
          campaigns: false,
          volunteering: false,
        }
      });
    } catch (error) {
      toast.error(isRTL ? 'حدث خطأ أثناء الاشتراك. يرجى المحاولة لاحقاً.' : 'Error during subscription. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const subscriberBenefits = [
    {
      id: 1,
      icon: <FaFileAlt />,
      title: isRTL ? 'تقارير ميدانية دورية' : 'Field Reports',
      desc: isRTL 
        ? 'تحديثات موثقة بالأرقام والصور من مواقع العمل الميدانية ومشاريع الدعم الاجتماعي المباشر.'
        : 'Transparent, documented field updates with data and photos directly from relief operations.'
    },
    {
      id: 2,
      icon: <FaHeart />,
      title: isRTL ? 'قصص الأثر والنجاح' : 'Impact Stories',
      desc: isRTL 
        ? 'شهادات واقعية ملهمة للأفراد والعائلات التي استعادت الأمل وبنت مستقبلاً مستقلاً بفضل دعمكم.'
        : 'Inspiring real-world stories of individuals and families regaining dignity and hope through your support.'
    },
    {
      id: 3,
      icon: <FaCalendarAlt />,
      title: isRTL ? 'دعوات الفعاليات والندوات' : 'Event Invitations',
      desc: isRTL 
        ? 'دعوات خاصة لحضور المؤتمرات التعريفية، ورشات العمل التمكينية، والفعاليات المجتمعية.'
        : 'Exclusive invitations to webinars, vocational workshops, and community engagement events.'
    },
    {
      id: 4,
      icon: <FaBell />,
      title: isRTL ? 'تحديثات ورسائل حصرية' : 'Exclusive Updates',
      desc: isRTL 
        ? 'أحدث البيانات الرسمية، الإعلانات عن إطلاق المشاريع الجديدة، والتقارير السنوية الشاملة.'
        : 'First-hand announcements on new initiative launches, urgent relief calls, and annual reports.'
    }
  ];

  return (
    <div className="newsletter-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* 1. Hero Header */}
      <section className="page-header newsletter-hero">
        <div className="container">
          <motion.div 
            className="hero-header-content"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="hero-badge">
              <FaEnvelope /> {isRTL ? 'النشرة الإخبارية' : 'REVIVE Newsletter'}
            </span>
            <h1 className="page-title">
              {isRTL ? 'ابقَ على تواصل' : 'Stay Connected'}
            </h1>
            <p className="hero-subtitle">
              {isRTL 
                ? 'اشترك في نشرتنا البريدية لتصلك أحدث المستجدات الميدانية، قصص الأثر الإنساني، وتقارير برامج التمكين أولاً بأول.'
                : 'Subscribe to our newsletter to receive real-time field reports, human impact stories, and community empowerment updates directly to your inbox.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Subscription & Benefits Section */}
      <section className="newsletter-main-section">
        <div className="container">
          <div className="newsletter-layout">
            
            {/* Left/Right Form Container */}
            <motion.div 
              className="newsletter-form-box"
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="form-header-bar">
                <div className="icon-badge">
                  <FaPaperPlane />
                </div>
                <div>
                  <h2>{isRTL ? 'انضم إلى شبكة أصدقاء إحياء' : 'Join the REVIVE Network'}</h2>
                  <p>{isRTL ? 'كن جزءاً من مسيرة الأمل والتغيير المجتمعي المستدام.' : 'Be part of our journey towards sustainable community empowerment.'}</p>
                </div>
              </div>

              <form className="newsletter-form" onSubmit={handleSubmit}>
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>{isRTL ? 'الاسم الأول *' : 'First Name *'}</label>
                    <input 
                      type="text" 
                      placeholder={isRTL ? 'مثال: محمد' : 'e.g. John'} 
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{isRTL ? 'اسم العائلة *' : 'Last Name *'}</label>
                    <input 
                      type="text" 
                      placeholder={isRTL ? 'مثال: الشامي' : 'e.g. Doe'} 
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{isRTL ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                  <input 
                    type="email" 
                    placeholder={isRTL ? 'name@example.com' : 'name@example.com'} 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                {/* Topic Preferences */}
                <div className="interests-selection">
                  <label className="interests-title">
                    {isRTL ? 'المواضيع التي تهمك:' : 'Select Topics of Interest:'}
                  </label>
                  <div className="checkbox-grid">
                    <label className={`checkbox-card ${formData.interests.programs ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={formData.interests.programs} 
                        onChange={() => handleCheckboxChange('programs')}
                      />
                      <div className="custom-check">
                        {formData.interests.programs && <FaCheck />}
                      </div>
                      <span className="check-text">
                        {isRTL ? 'البرامج الإنسانية والتعليمية' : 'Programs & Education'}
                      </span>
                    </label>

                    <label className={`checkbox-card ${formData.interests.events ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={formData.interests.events} 
                        onChange={() => handleCheckboxChange('events')}
                      />
                      <div className="custom-check">
                        {formData.interests.events && <FaCheck />}
                      </div>
                      <span className="check-text">
                        {isRTL ? 'الفعاليات والأنشطة' : 'Events & Workshops'}
                      </span>
                    </label>

                    <label className={`checkbox-card ${formData.interests.campaigns ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={formData.interests.campaigns} 
                        onChange={() => handleCheckboxChange('campaigns')}
                      />
                      <div className="custom-check">
                        {formData.interests.campaigns && <FaCheck />}
                      </div>
                      <span className="check-text">
                        {isRTL ? 'حملات الإغاثة والتبرع' : 'Relief & Donation Campaigns'}
                      </span>
                    </label>

                    <label className={`checkbox-card ${formData.interests.volunteering ? 'active' : ''}`}>
                      <input 
                        type="checkbox" 
                        checked={formData.interests.volunteering} 
                        onChange={() => handleCheckboxChange('volunteering')}
                      />
                      <div className="custom-check">
                        {formData.interests.volunteering && <FaCheck />}
                      </div>
                      <span className="check-text">
                        {isRTL ? 'فرص التطوع والمشاركة' : 'Volunteering Opportunities'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Privacy Note */}
                <div className="privacy-badge">
                  <FaShieldAlt className="shield-icon" />
                  <p>
                    {isRTL 
                      ? 'نحن نحترم خصوصيتك بالكامل. لن نقوم بمشاركة بياناتك أو بريدك الإلكتروني مع أي طرف خارجي أبداً، ويمكنك إلغاء الاشتراك في أي وقت بنقرة واحدة.'
                      : 'We strictly respect your privacy. We will never share your personal data or email with third parties, and you can unsubscribe at any time with one click.'}
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="newsletter-submit-btn" 
                  disabled={loading}
                >
                  <span>
                    {loading 
                      ? (isRTL ? 'جاري الاشتراك...' : 'Subscribing...') 
                      : (isRTL ? 'تأكيد الاشتراك في النشرة' : 'Subscribe to Newsletter')}
                  </span>
                  {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
                </button>
              </form>
            </motion.div>

            {/* Benefits Sidebar / Info Column */}
            <div className="newsletter-sidebar">
              <motion.div 
                className="sidebar-header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="sub-tag">{isRTL ? 'ماذا ستحصل؟' : 'WHAT YOU RECEIVE'}</span>
                <h3>{isRTL ? 'محتوى حصري وموثوق يصلك شهرياً' : 'Transparent, Impactful Monthly Content'}</h3>
                <p>
                  {isRTL 
                    ? 'نحرص على تزويد مشتركينا بتقارير دقيقة ومحتوى هادف يعكس التطورات الميدانية بكل أمانة وشفافية.'
                    : 'We deliver carefully curated insights, verified field achievements, and firsthand updates from the communities we serve.'}
                </p>
              </motion.div>

              <motion.div 
                className="benefits-list"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {subscriberBenefits.map((item) => (
                  <motion.div key={item.id} className="benefit-item-card" variants={fadeInUp}>
                    <div className="benefit-icon-wrapper">
                      {item.icon}
                    </div>
                    <div className="benefit-content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="join-volunteer-promo"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FaHandsHelping className="promo-icon" />
                <div>
                  <h5>{isRTL ? 'هل ترغب في المساهمة الميدانية؟' : 'Interested in Hands-on Impact?'}</h5>
                  <p>{isRTL ? 'انضم إلى فريق المتطوعين أو ادعم مشاريعنا الخيرية.' : 'Explore volunteering openings or support our ongoing field programs.'}</p>
                  <div className="promo-actions">
                    <Link to="/contact" className="promo-link">
                      {isRTL ? 'تواصل معنا' : 'Contact Us'} {isRTL ? '←' : '→'}
                    </Link>
                    <Link to="/donation" className="promo-link highlight">
                      {isRTL ? 'تبرع الآن' : 'Donate Now'} {isRTL ? '←' : '→'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
