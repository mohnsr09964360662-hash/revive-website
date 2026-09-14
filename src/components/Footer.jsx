import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaTwitter, 
  FaLinkedinIn, 
  FaYoutube, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className={`footer ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Top Helpline Bar in Footer */}
      <div className="footerTopBar">
        <div className="auto__container footerTopInner">
          <div className="helplineCol">
            <h6>{isRTL ? 'خط الطوارئ والاستفسارات المباشر:' : 'UK & Emergency Helpline:'}</h6>
            <div className="contactsFlex">
              <a href="tel:+441618600163">
                <FaPhoneAlt /> +44 (0) 161 860 0163
              </a>
              <a href="mailto:RevivefoundationSyria@gmail.com">
                <FaEnvelope /> RevivefoundationSyria@gmail.com
              </a>
            </div>
          </div>
          <div className="footerSocialIcons">
            <a href="https://www.facebook.com/share/1F8ixtdMZx/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/reviverelief?igsi=MWVtY3NqMmo3aGNwYw==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://whatsapp.com/channel/0029Vb8ItIE8qIzn6G7s8r2L" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="auto__container footerMain">
        <div className="footerGrid">
          
          {/* Col 1: About & Mission */}
          <div className="footerCol">
            <img src={logo} alt="Revive Logo" className="footerLogo" />
            <p className="footerAboutText">
              {isRTL 
                ? 'مؤسسة إنسانية عالمية تسعى إلى تقديم الإغاثة الطارئة وتطوير المجتمعات من خلال التعليم والتمكين المستدام والمبادرات التنموية.' 
                : 'A global humanitarian organization delivering emergency relief, sustainable education, empowerment, and community development worldwide.'}
            </p>
            <div className="charityCreds">
              <span>{isRTL ? 'منظمة خيرية مسجلة رسمياً' : 'Registered Charity No. 1154880'}</span>
            </div>
          </div>

          {/* Col 2: Donation & Support */}
          <div className="footerCol">
            <h5 className="footerTitle">{isRTL ? 'التبرع والدعم' : 'DONATE & SUPPORT'}</h5>
            <ul className="footerLinks">
              <li><Link to="/donation">{isRTL ? 'تبرع لمشاريعنا' : 'Donate to Our Projects'}</Link></li>
              <li><Link to="/donation">{isRTL ? 'دعم التعليم والمدارس' : 'Support Education'}</Link></li>
              <li><Link to="/donation">{isRTL ? 'تمكين المرأة' : 'Women Empowerment'}</Link></li>
              <li><Link to="/donation">{isRTL ? 'الرعاية الصحية' : 'Healthcare Support'}</Link></li>
              <li><Link to="/donation">{isRTL ? 'التبرع العام' : 'General Donation'}</Link></li>
            </ul>
          </div>

          {/* Col 3: Our Work & Programs */}
          <div className="footerCol">
            <h5 className="footerTitle">{isRTL ? 'برامجنا ومجالاتنا' : 'OUR WORK'}</h5>
            <ul className="footerLinks">
              <li><Link to="/programs">{isRTL ? 'تمكين الشباب والتدريب المهني' : 'Youth Empowerment'}</Link></li>
              <li><Link to="/programs">{isRTL ? 'التعليم الرقمي والمهارات' : 'Digital Education'}</Link></li>
              <li><Link to="/programs">{isRTL ? 'تمكين المرأة والمشاريع الصغيرة' : 'Women Empowerment'}</Link></li>
              <li><Link to="/ai-courses">{isRTL ? 'دورات الذكاء الاصطناعي والتكنولوجيا' : 'AI & Tech Courses'}</Link></li>
              <li><Link to="/about">{isRTL ? 'الاستجابة الإنسانية للكوارث' : 'Emergency Response'}</Link></li>
            </ul>
          </div>

          {/* Col 4: Support & Info */}
          <div className="footerCol">
            <h5 className="footerTitle">{isRTL ? 'الدعم والمعلومات' : 'SUPPORT & INFO'}</h5>
            <ul className="footerLinks">
              <li><Link to="/events">{isRTL ? 'الفعاليات والأنشطة' : 'Events & Activities'}</Link></li>
              <li><Link to="/contact">{isRTL ? 'تواصل معنا' : 'Contact Us'}</Link></li>
              <li><Link to="/newsletter">{isRTL ? 'النشرة البريدية' : 'Newsletter'}</Link></li>
              <li><Link to="/faq">{isRTL ? 'الأسئلة الشائعة' : 'FAQ'}</Link></li>
              <li><Link to="/feedback">{isRTL ? 'ملاحظات واقتراحات' : 'Feedback'}</Link></li>
              <li><Link to="/about">{isRTL ? 'عن المؤسسة' : 'About Us'}</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footerBottom">
        <div className="auto__container footerBottomInner">
          <p>© 2026 REVIVE Organization. All Rights Reserved. Designed to Action For Humanity standard.</p>
          <div className="legalLinks">
            <Link to="/faq">{isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link> | 
            <Link to="/faq">{isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
