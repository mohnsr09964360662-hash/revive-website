import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/email';
import './Contact.css';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      if (
        !EMAILJS_CONFIG.SERVICE_ID ||
        EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID'
      ) {
        // Fallback for demo when EmailJS is not configured yet
        await new Promise((resolve) => setTimeout(resolve, 800));
        toast.info('يرجى ضبط إعدادات EmailJS لتلقي الرسائل مباشرة على بريدك الإلكتروني.');
      } else {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
      }

      toast.success(t('contact.successMsg') || 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error(t('contact.errorMsg') || 'حدث خطأ أثناء الإرسال. الرجاء المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp}>{t('contact.title')}</motion.h1>
        </div>
      </div>

      <section className="contact-section section-padding bg-light">
        <div className="container">
          <div className="contact-wrapper">
            <motion.div className="contact-info" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideIn}>
              <h2>{t('contact.info')}</h2>
              
              <div className="info-item">
                <div className="info-icon"><FaPhoneAlt /></div>
                <div>
                  <h4>{t('contact.phone')}</h4>
                  <p>{t('contact.phoneNum')}</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><FaEnvelope /></div>
                <div>
                  <h4>{t('contact.email')}</h4>
                  <p>{t('contact.emailAddr')}</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><FaMapMarkerAlt /></div>
                <div>
                  <h4>{t('contact.location')}</h4>
                  <p>{t('contact.location')}</p>
                </div>
              </div>

              <div className="contact-social">
                <a href="https://www.facebook.com/share/1F8ixtdMZx/" target="_blank" rel="noopener noreferrer" className="social-circle fb"><FaFacebookF /></a>
                <a href="https://www.instagram.com/reviverelief?igsi=MWVtY3NqMmo3aGNwYw==" target="_blank" rel="noopener noreferrer" className="social-circle ig"><FaInstagram /></a>
                <a href="https://whatsapp.com/channel/0029Vb8ItIE8qIzn6G7s8r2L" target="_blank" rel="noopener noreferrer" className="social-circle wa"><FaWhatsapp /></a>
              </div>
            </motion.div>

            <motion.div className="contact-form-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{t('contact.name')}</label>
                  <input type="text" placeholder={t('contact.name')} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                </div>
                
                <div className="form-group">
                  <label>{t('contact.email')}</label>
                  <input type="email" placeholder={t('contact.email')} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                
                <div className="form-group">
                  <label>{t('contact.subject')}</label>
                  <input type="text" placeholder={t('contact.subject')} value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
                </div>
                
                <div className="form-group">
                  <label>{t('contact.message')}</label>
                  <textarea rows="5" placeholder={t('contact.message')} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
                </div>
                
                <button type="submit" className="btn-primary" style={{ width: '100%', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                  {loading ? 'جاري الإرسال...' : t('contact.send')}
                </button>
              </form>
            </motion.div>
          </div>
          
          <motion.div className="contact-map" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ marginTop: '50px', borderRadius: '10px', overflow: 'hidden', height: '400px' }}>
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.27593994140626%2C33.48625298514801%2C36.33155822753907%2C33.52554743431608&amp;layer=mapnik" 
              style={{ border: 0 }}
              title="Revive Location Map"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
