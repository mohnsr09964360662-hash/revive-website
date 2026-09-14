import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaStar, 
  FaRegStar, 
  FaComments, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaClock, 
  FaUsers, 
  FaShieldAlt, 
  FaSyncAlt, 
  FaSmile, 
  FaArrowRight, 
  FaArrowLeft 
} from 'react-icons/fa';
import './Feedback.css';

export default function Feedback() {
  const { t, isRTL, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General',
    rating: 5,
    message: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'General', label_ar: 'عام', label_en: 'General Inquiry' },
    { value: 'Programs', label_ar: 'البرامج والمشاريع', label_en: 'Programs & Projects' },
    { value: 'Website', label_ar: 'الموقع الإلكتروني والمنصة', label_en: 'Website & Digital Platform' },
    { value: 'Services', label_ar: 'الخدمات الميدانية والتدريب', label_en: 'Field Services & Training' },
    { value: 'Complaint', label_ar: 'شكوى أو ملاحظة', label_en: 'Complaint / Issue' },
    { value: 'Suggestion', label_ar: 'اقتراح تطويري', label_en: 'Improvement Suggestion' },
  ];

  const ratingLabels = {
    1: { ar: 'بحاجة لتحسين كبير', en: 'Needs Improvement' },
    2: { ar: 'مقبول', en: 'Fair' },
    3: { ar: 'جيد', en: 'Good' },
    4: { ar: 'جيد جداً', en: 'Very Good' },
    5: { ar: 'ممتاز وفوق التوقعات', en: 'Excellent & Outstanding' },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(isRTL ? 'يرجى تعبئة كافة الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    toast.success(
      isRTL 
        ? 'شكراً جزيلاً لمشاركتنا رأيك! تم استلام ملاحظاتك وسيتم مراجعتها من قبل فريق الجودة والتطوير.' 
        : 'Thank you for your valuable feedback! Our quality team will review your submission shortly.'
    );

    setFormData({
      name: '',
      email: '',
      category: 'General',
      rating: 5,
      message: '',
    });
    setHoverRating(0);
    setLoading(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const stats = [
    {
      id: 1,
      number: '98%',
      label: isRTL ? 'نسبة رضا المستفيدين' : 'Satisfaction Rate',
      subtext: isRTL ? 'تقييمات إيجابية لخدماتنا وبرامجنا' : 'Positive community feedback',
      icon: <FaSmile />
    },
    {
      id: 2,
      number: '+500',
      label: isRTL ? 'ملاحظة تم استقبالها' : 'Feedbacks Received',
      subtext: isRTL ? 'ساهمت في تحسين وتطوير مبادراتنا' : 'Driving continuous improvements',
      icon: <FaUsers />
    },
    {
      id: 3,
      number: '24h',
      label: isRTL ? 'متوسط وقت الرد' : 'Average Response Time',
      subtext: isRTL ? 'متابعة مباشرة من فريق إدارة الجودة' : 'Direct follow-up by our quality desk',
      icon: <FaClock />
    },
  ];

  return (
    <div className="feedback-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* 1. Page Header */}
      <section className="page-header feedback-hero">
        <div className="container">
          <motion.div 
            className="hero-header-content"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="hero-badge">
              <FaComments /> {isRTL ? 'صوت المجتمع وشركاء الأثر' : 'Community Voice'}
            </span>
            <h1 className="page-title">
              {isRTL ? 'ملاحظاتك تهمنا' : 'Your Feedback Matters'}
            </h1>
            <p className="hero-subtitle">
              {isRTL 
                ? 'نسعى باستمرار لتطوير جودة خدماتنا ومبادراتنا الإنسانية. شاركنا تجربتك، اقتراحاتك، أو أي ملاحظات لمساعدتنا على تقديم الأفضل لمجتمعاتنا.'
                : 'We continuously refine our humanitarian initiatives and community programs. Share your thoughts, suggestions, and experiences to help us serve better.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Feedback Stats Banner */}
      <section className="feedback-stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat) => (
              <motion.div key={stat.id} className="stat-card" variants={fadeInUp}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-subtext">{stat.subtext}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Main Feedback Form & Commitment Column */}
      <section className="feedback-main-section">
        <div className="container">
          <div className="feedback-layout">
            
            {/* Form Column */}
            <motion.div 
              className="feedback-form-box"
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
                  <h2>{isRTL ? 'نموذج إرسال الملاحظات والتقييم' : 'Submit Feedback or Suggestion'}</h2>
                  <p>{isRTL ? 'جميع الملاحظات تُدرس بعناية وسرية تامة من قبل الإدارة.' : 'Every submission is carefully and confidentially reviewed.'}</p>
                </div>
              </div>

              <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="form-row-2col">
                  <div className="form-group">
                    <label>{isRTL ? 'الاسم الكامل *' : 'Full Name *'}</label>
                    <input 
                      type="text" 
                      placeholder={isRTL ? 'أدخل اسمك الكريم' : 'Enter your name'} 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
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
                </div>

                <div className="form-group">
                  <label>{isRTL ? 'تصنيف الملاحظة *' : 'Feedback Category *'}</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {isRTL ? cat.label_ar : cat.label_en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Star Rating Section */}
                <div className="rating-form-group">
                  <label className="rating-label">
                    {isRTL ? 'ما هو تقييمك العام لتجربتك معنا؟ *' : 'Overall Experience Rating *'}
                  </label>
                  
                  <div className="stars-wrapper">
                    <div className="stars-list">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const current = hoverRating || formData.rating;
                        const isFilled = star <= current;
                        return (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${isFilled ? 'filled' : ''}`}
                            onClick={() => setFormData({ ...formData, rating: star })}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            aria-label={`Rate ${star} star`}
                          >
                            <FaStar />
                          </button>
                        );
                      })}
                    </div>
                    <span className="rating-status-text">
                      {isRTL 
                        ? ratingLabels[hoverRating || formData.rating]?.ar 
                        : ratingLabels[hoverRating || formData.rating]?.en}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label>{isRTL ? 'تفاصيل الملاحظة أو الاقتراح *' : 'Your Message / Feedback Details *'}</label>
                  <textarea 
                    rows="6" 
                    placeholder={isRTL 
                      ? 'يرجى كتابة ملاحظاتك، استفساراتك، أو أي تفاصيل تساعدنا على تحسين خدماتنا...'
                      : 'Please describe your thoughts, experience, or specific suggestions...'} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="feedback-privacy-note">
                  <FaShieldAlt className="shield-icon" />
                  <p>
                    {isRTL 
                      ? 'نحن نضمن سرية بياناتك الشخصية بالكامل ولن يتم استخدامها إلا لمتابعة ملاحظتك والارتقاء بجودة العمل الإنساني.'
                      : 'Your personal information is strictly protected and used solely to follow up on your feedback and enhance our services.'}
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="feedback-submit-btn"
                  disabled={loading}
                >
                  <span>
                    {loading 
                      ? (isRTL ? 'جاري الإرسال...' : 'Submitting...') 
                      : (isRTL ? 'إرسال الملاحظات الآن' : 'Submit Feedback')}
                  </span>
                  {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
                </button>
              </form>
            </motion.div>

            {/* Sidebar / Commitments Column */}
            <div className="feedback-sidebar">
              <motion.div 
                className="sidebar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="sub-tag">{isRTL ? 'ميثاق الجودة' : 'OUR COMMITMENT'}</span>
                <h3>{isRTL ? 'كيف نتعامل مع ملاحظاتكم؟' : 'How We Process Your Feedback'}</h3>
                
                <div className="commitments-list">
                  <div className="commitment-item">
                    <div className="com-icon"><FaCheckCircle /></div>
                    <div>
                      <h4>{isRTL ? 'استماع فاعل واهتمام مباشر' : 'Attentive Listening'}</h4>
                      <p>{isRTL ? 'تصل جميع الملاحظات مباشرة إلى مسؤولي البرامج والجودة دون وسيط.' : 'Submissions are reviewed directly by our project and quality managers.'}</p>
                    </div>
                  </div>

                  <div className="commitment-item">
                    <div className="com-icon"><FaSyncAlt /></div>
                    <div>
                      <h4>{isRTL ? 'تطوير مستمر للخدمات' : 'Continuous Evolution'}</h4>
                      <p>{isRTL ? 'نترجم المقترحات البناءة إلى خطط عمل واقعية ترفع كفاءة الاستجابة الميدانية.' : 'We transform actionable ideas into tangible operational enhancements on the ground.'}</p>
                    </div>
                  </div>

                  <div className="commitment-item">
                    <div className="com-icon"><FaClock /></div>
                    <div>
                      <h4>{isRTL ? 'استجابة سريعة ومتابعة' : 'Prompt Resolution'}</h4>
                      <p>{isRTL ? 'نلتزم بالرد على الملاحظات العاجلة والشكاوى خلال مدة أقصاها 24-48 ساعة.' : 'We aim to respond to urgent inquiries and concerns within 24 to 48 business hours.'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="direct-contact-cta"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4>{isRTL ? 'هل لديك مسألة عاجلة؟' : 'Need Immediate Assistance?'}</h4>
                <p>{isRTL ? 'يمكنك التواصل المباشر مع مكتب الدعم والتنسيق الميداني عبر صفحة الاتصال.' : 'Connect directly with our central coordination desk via our Contact page.'}</p>
                <Link to="/contact" className="direct-cta-link">
                  {isRTL ? 'الانتقال إلى صفحة التواصل' : 'Go to Contact Page'} {isRTL ? '←' : '→'}
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
