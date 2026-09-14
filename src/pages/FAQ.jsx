import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaQuestionCircle, 
  FaChevronDown, 
  FaSearch, 
  FaHandsHelping, 
  FaHeart, 
  FaGraduationCap, 
  FaHandshake, 
  FaHeadset, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaArrowRight, 
  FaArrowLeft 
} from 'react-icons/fa';
import './FAQ.css';

export default function FAQ() {
  const { t, isRTL, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = [
    {
      id: 1,
      category: 'about',
      q_ar: 'ما هي مؤسسة إحياء؟',
      q_en: 'What is REVIVE?',
      a_ar: 'مؤسسة إحياء للخدمات الاجتماعية هي منظمة إنسانية وتنموية غير ربحية مكرسة لاستعادة الأمل والكرامة والفرص للمجتمعات المتضررة في سوريا والمنطقة. نعمل على الاستثمار في الإنسان من خلال منظومة برامج متكاملة تشمل التعليم، الرعاية الصحية، التمكين الاقتصادي، والأنشطة المجتمعية المستدامة.',
      a_en: 'REVIVE Foundation for Social Services is a non-profit humanitarian and developmental organization dedicated to restoring hope, dignity, and opportunities for affected communities in Syria and the surrounding region. We invest in human potential through integrated programs spanning education, healthcare, sustainable livelihoods, and community resilience.'
    },
    {
      id: 2,
      category: 'about',
      q_ar: 'أين تعمل مؤسسة إحياء؟',
      q_en: 'Where does REVIVE operate?',
      a_ar: 'تتركز عملياتنا الميدانية المباشرة في شتى المحافظات السورية ومخيمات اللاجئين الفلسطينيين، مع التركيز على المناطق الأشد فقراً وتضرراً. كما نمتلك شبكة تمثيل وشراكات تنسيقية إقليمية ودولية تدعم عملنا الإغاثي والتنموي على الأرض.',
      a_en: 'Our direct field operations are focused across Syrian governorates and Palestinian refugee camps, prioritizing the most vulnerable and underserved areas. We also maintain a global network of partners and liaison offices to coordinate and empower our humanitarian relief on the ground.'
    },
    {
      id: 3,
      category: 'donation',
      q_ar: 'كيف يمكنني التبرع؟',
      q_en: 'How can I donate?',
      a_ar: 'يمكنك التبرع بكل يسر وأمان عبر منصة التبرع الرقمية على موقعنا باستخدام البطاقات الائتمانية العالمية، أو عبر التحويلات البنكية المباشرة لحسابات المؤسسة الرسمية. كما نوفر خيارات التبرع السريع لحملات الإغاثة العاجلة وكفالة البرامج التعليمية والطبية.',
      a_en: 'You can securely donate online via our digital portal using major credit cards, direct bank wire transfers, or approved regional payment channels. We also offer fast one-click donation options for emergency relief campaigns and ongoing educational or healthcare sponsorships.'
    },
    {
      id: 4,
      category: 'donation',
      q_ar: 'هل تبرعي معفى من الضرائب؟',
      q_en: 'Is my donation tax-deductible?',
      a_ar: 'نعم، مؤسسة إحياء مسجلة رسمياً كمنظمة خيرية وإنسانية معتمدة ومطابقة للمعايير القانونية الدولية المنظمة للعمل غير الربحي. نقوم بإصدار إيصالات تبرع رسمية وشهادات ضريبية سنوية معتمدة لجميع المتبرعين الأفراد والمؤسسات لتسهيل الإعفاءات الضريبية.',
      a_en: 'Yes, REVIVE Foundation operates as a legally registered charitable organization complying with international non-profit regulatory frameworks. We issue verified donation receipts and annual tax-deductible contribution certificates to individual and corporate donors.'
    },
    {
      id: 5,
      category: 'donation',
      q_ar: 'كيف تُستخدم التبرعات؟',
      q_en: 'How are donations used?',
      a_ar: 'نلتزم بأعلى معايير الحوكمة والنزاهة المالية، حيث يوجه أكثر من 90% من إجمالي التبرعات مباشرة نحو المشاريع الميدانية ومستحقي الدعم الإنساني. كما نخضع لتدقيق مالي سنوي مستقل من قبل مكاتب تدقيق معتمدة وننشر تقارير الشفافية المالية بشكل دوري.',
      a_en: 'We adhere to the highest standards of financial integrity and stewardship, directing over 90% of all contributions directly to field projects and frontline beneficiaries. Our accounts are audited annually by independent certified accounting firms, and our transparency reports are published publicly.'
    },
    {
      id: 6,
      category: 'volunteering',
      q_ar: 'هل يمكنني التطوع؟',
      q_en: 'Can I volunteer?',
      a_ar: 'نعم بكل تأكيد، نرحب دائماً بالمتطوعين المتحمسين والشغوفين بصنع الفارق من جميع أنحاء العالم. يمكنك التطوع ميدانياً في فرق الاستجابة والتوزيع، أو التطوع عن بُعد في مجالات التعليم، التدريب المهني، الترجمة، إدارة المحتوى الرقمي، والحلول البرمجية والتقنية.',
      a_en: 'Absolutely! We actively welcome dedicated volunteers from across the globe. You can participate in hands-on field relief and distribution, or contribute remotely in specialized areas including teaching, digital media, professional translation, software engineering, and community mentorship.'
    },
    {
      id: 7,
      category: 'programs',
      q_ar: 'ما هي البرامج التي تقدمونها؟',
      q_en: 'What programs do you offer?',
      a_ar: 'نقدم حزمة شاملة من البرامج تشمل: التعليم الأساسي والمهني، الرعاية الطبية والدعم النفسي، التمكين الاقتصادي والمشاريع الصغيرة للمرأة والشباب، وبرامج محو الأمية الرقمية والذكاء الاصطناعي، إضافة إلى برامج الإغاثة الطارئة وحفظ التراث الثقافي.',
      a_en: 'We provide a comprehensive ecosystem of programs including primary and vocational education, medical care, psycho-social wellness, micro-enterprise funding for women and youth, cutting-edge AI & digital literacy courses, emergency winterization, and cultural heritage initiatives.'
    },
    {
      id: 8,
      category: 'about',
      q_ar: 'كيف أتواصل مع مؤسسة إحياء؟',
      q_en: 'How do I contact REVIVE?',
      a_ar: 'يمكنك التواصل معنا عبر نموذج الاتصال المباشر على الموقع الإلكتروني، أو بمراسلتنا على البريد info@revive-foundation.org. كما يمكنكم الاتصال بفريق الدعم عبر الهاتف أو خدمة واتساب على الرقم المخصص خلال ساعات العمل الرسمية.',
      a_en: 'You can reach us directly via the contact form on our website or by emailing info@revive-foundation.org. You can also connect with our coordination desk via dedicated telephone and WhatsApp support lines available throughout standard operating hours.'
    },
    {
      id: 9,
      category: 'programs',
      q_ar: 'هل تقدمون خدمات تقنية؟',
      q_en: 'Do you provide tech services?',
      a_ar: 'نعم، تمتلك إحياء مساراً تقنياً متقدماً يقدم دورات تدريبية متخصصة في الذكاء الاصطناعي، البرمجة، وعلم البيانات للشباب الطموحين. كما نوفر حلول التحول الرقمي والاستشارات التقنية للمؤسسات غير الربحية الشريكة لرفع كفاءة أدائها الميداني.',
      a_en: 'Yes, REVIVE has a dedicated technology track offering specialized courses in Artificial Intelligence, software programming, and data science for youth. We also deliver digital transformation consulting and technical enablement for partner grassroots NGOs to maximize their operational impact.'
    },
    {
      id: 10,
      category: 'volunteering',
      q_ar: 'كيف يمكن للمؤسسات الشراكة مع إحياء؟',
      q_en: 'How can organizations partner with REVIVE?',
      a_ar: 'نرحب بالشراكات الاستراتيجية مع الوكالات الإنسانية، الجامعات، والشركات المهتمة بالمسؤولية الاجتماعية. يمكن للمؤسسات تقديم طلب الشراكة عبر بريد علاقات الشركاء، حيث يقوم فريق التخطيط بدراسة مقترح التعاون وعقد جلسات تنسيقية لتوحيد الجهود وإطلاق المشاريع المشتركة.',
      a_en: 'We actively collaborate with international humanitarian agencies, academic institutions, and corporate CSR programs. Organizations can submit institutional partnership inquiries via our partnership desk, after which our executive team coordinates exploratory meetings to co-design impactful joint initiatives.'
    }
  ];

  const categories = [
    { id: 'all', label_ar: 'جميع الأسئلة', label_en: 'All Questions' },
    { id: 'about', label_ar: 'المؤسسة والرسالة', label_en: 'About & Mission' },
    { id: 'donation', label_ar: 'التبرعات والشفافية', label_en: 'Donations & Trust' },
    { id: 'programs', label_ar: 'البرامج والخدمات التقنية', label_en: 'Programs & Tech' },
    { id: 'volunteering', label_ar: 'الشراكات والتطوع', label_en: 'Partners & Volunteer' }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const qText = isRTL ? item.q_ar : item.q_en;
    const aText = isRTL ? item.a_ar : item.a_en;
    const matchesSearch = 
      qText.toLowerCase().includes(searchTerm.toLowerCase()) || 
      aText.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="faq-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* 1. Page Header */}
      <section className="page-header faq-hero">
        <div className="container">
          <motion.div 
            className="hero-header-content"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="hero-badge">
              <FaQuestionCircle /> {isRTL ? 'مركز المساعدة والاستفسارات' : 'Help & Knowledge Base'}
            </span>
            <h1 className="page-title">
              {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h1>
            <p className="hero-subtitle">
              {isRTL 
                ? 'إجابات شاملة ومفصلة حول رسالة مؤسسة إحياء، طرق التبرع، آليات الشفافية، برامج التمكين، وكيفية التطوع والشراكة معنا.'
                : 'Clear, detailed answers covering REVIVE Foundation’s mission, donation governance, community programs, volunteering, and institutional partnerships.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Interactive Search and Category Filters */}
      <section className="faq-controls-section">
        <div className="container">
          <div className="faq-controls-wrapper">
            
            {/* Search Bar */}
            <div className="faq-search-box">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder={isRTL ? 'ابحث عن سؤال أو كلمة مفتاحية...' : 'Search for questions, keywords, or topics...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                  {isRTL ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="faq-categories-pills">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`category-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {isRTL ? cat.label_ar : cat.label_en}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. FAQ Accordion Section */}
      <section className="faq-accordion-section">
        <div className="container">
          <div className="faq-list-container">
            {filteredFaqs.length === 0 ? (
              <div className="faq-no-results">
                <FaQuestionCircle className="no-results-icon" />
                <h3>{isRTL ? 'لم يتم العثور على نتائج مطابقة' : 'No Matching Questions Found'}</h3>
                <p>{isRTL ? 'جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً.' : 'Try searching with different keywords or select another category.'}</p>
                <button 
                  className="reset-filter-btn" 
                  onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                >
                  {isRTL ? 'عرض جميع الأسئلة' : 'Show All Questions'}
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === faq.id;
                return (
                  <motion.div 
                    key={faq.id} 
                    className={`faq-accordion-card ${isOpen ? 'is-open' : ''}`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                  >
                    <button 
                      className="faq-question-btn" 
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="question-number">0{faq.id}</span>
                      <span className="question-title">{isRTL ? faq.q_ar : faq.q_en}</span>
                      <div className={`chevron-wrap ${isOpen ? 'rotated' : ''}`}>
                        <FaChevronDown />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          className="faq-answer-wrapper"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                        >
                          <div className="faq-answer-content">
                            <p>{isRTL ? faq.a_ar : faq.a_en}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* 4. Bottom Contact CTA Section */}
      <section className="faq-contact-cta">
        <div className="container">
          <div className="cta-card-box">
            <div className="cta-content">
              <span className="cta-tag">{isRTL ? 'هل ما زال لديك استفسار؟' : 'STILL HAVE QUESTIONS?'}</span>
              <h2>{isRTL ? 'فريقنا متاح دائماً للإجابة وتقديم المساعدة' : 'We are here to assist and collaborate'}</h2>
              <p>
                {isRTL 
                  ? 'إذا لم تجد الإجابة التي تبحث عنها، يمكنك مراسلتنا مباشرة وسيقوم أحد ممثلينا بالتواصل معك في أقرب وقت.'
                  : 'If your question wasn’t answered here, reach out directly and our team will get back to you promptly.'}
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="cta-button primary-cta">
                <FaHeadset />
                <span>{isRTL ? 'تواصل مع فريقنا' : 'Contact Support Desk'}</span>
                {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
              </Link>
              <Link to="/donation" className="cta-button secondary-cta">
                <FaHeart />
                <span>{isRTL ? 'دعم برامجنا' : 'Support Our Mission'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
