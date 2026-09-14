import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/email';
import InstantDonateForm from '../components/InstantDonateForm';
import { 
  FaUsers, 
  FaProjectDiagram, 
  FaHandsHelping, 
  FaArrowRight, 
  FaArrowLeft,
  FaPlay,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFileAlt,
  FaShoppingBasket,
  FaBullhorn
} from 'react-icons/fa';

import logo from '../assets/logo.png';
import fieldTeam from '../assets/field-team.jpeg';
import fieldStreet from '../assets/field-street.jpeg';
import fieldAlley from '../assets/field-alley.jpeg';
import fieldChild from '../assets/field-child.jpeg';
import fieldCommunity from '../assets/field-community.jpeg';
import fieldOutreach from '../assets/field-outreach.jpeg';
import fieldBanner from '../assets/field-banner.jpeg';
import fieldCamp from '../assets/field-camp.jpeg';
import fieldMen from '../assets/field-men.jpeg';
import fieldConference from '../assets/field-conference.jpeg';
import fieldBanner2 from '../assets/field-banner2.jpeg';
import './Home.css';

const techWorkshopImg = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80';

const AnimatedCounter = ({ target, duration = 1400, prefix = '', suffix = '', trigger }) => {
  const [count, setCount] = useState(0);
  const localRef = useRef(null);
  const localInView = useInView(localRef, { amount: 0.3, once: false });
  const active = trigger !== undefined ? trigger : localInView;

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    const end = parseInt(target, 10);
    let startTime = null;
    let animId;

    const update = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * end);
      setCount(current);

      if (progress < 1) {
        animId = requestAnimationFrame(update);
      } else {
        setCount(end);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [active, target, duration]);

  return (
    <span ref={localRef} className="counterNumber" dir="ltr">
      {prefix}{count}{suffix}
    </span>
  );
};

const heroSlides = [
  {
    titleEn: "YOUTH EMPOWERMENT & EDUCATION",
    titleAr: "تمكين الشباب والتعليم",
    descEn: "Building a brighter future for the next generation through education and skill-building programs.",
    descAr: "بناء مستقبل مشرق للأجيال القادمة من خلال برامج التعليم وتنمية المهارات الأساسية.",
    linkTextEn: "LEARN ABOUT OUR PROGRAMS",
    linkTextAr: "تعرف على برامجنا",
    link: '/programs'
  },
  {
    titleEn: "HEALTHCARE & COMMUNITY WELLBEING",
    titleAr: "الرعاية الصحية وسلامة المجتمع",
    descEn: "Ensuring communities have access to essential medical services and psychological support.",
    descAr: "ضمان حصول المجتمعات على الخدمات الطبية الأساسية والدعم النفسي اللازم لتعافيها.",
    linkTextEn: "SUPPORT OUR MISSION",
    linkTextAr: "ادعم رسالتنا",
    link: '/donation'
  },
  {
    titleEn: "WOMEN EMPOWERMENT & TRAINING",
    titleAr: "تمكين المرأة والتدريب المهني",
    descEn: "Providing specialized workshops for women to build their skills and support financial independence.",
    descAr: "توفير ورش عمل متخصصة لبناء القدرات المهنية ودعم الاستقلال المالي للمرأة في المجتمع.",
    linkTextEn: "LEARN MORE",
    linkTextAr: "اعرف المزيد",
    link: '/programs'
  },
  {
    titleEn: "EDUCATION & COGNITIVE DEVELOPMENT",
    titleAr: "التعليم والتطوير المعرفي",
    descEn: "Fostering creative thinking and cognitive development through interactive learning and digital literacy.",
    descAr: "تعزيز التفكير الإبداعي والتطور المعرفي من خلال التعلم التفاعلي وتطوير المهارات الرقمية.",
    linkTextEn: "VIEW OUR PROGRAMS",
    linkTextAr: "عرض برامجنا التعليمية",
    link: '/programs'
  }
];

const introItems = [
  {
    titleEn: "EMERGENCIES",
    titleAr: "الطوارئ والإغاثة العاجلة",
    descEn: "When emergencies strike, we act and mobilise. We respond immediately to ensure the most vulnerable are protected and lives are saved.",
    descAr: "عندما تقع الكوارث نتحرك فوراً للاستجابة العاجلة وتأمين الاحتياجات الأساسية وإنقاذ الأرواح.",
    overlay: "rgba(0, 0, 0, 0.6)",
    image: fieldTeam
  },
  {
    titleEn: "FOOD & WATER",
    titleAr: "الأغذية والمياه النظيفة",
    descEn: "Supplying food and clean water globally, building bread factories, water pumps, desalination plants, and deep wells.",
    descAr: "توفير السلال الغذائية والمياه الصالحة للشرب، وإنشاء مخابز الآلية وآبار المياه ومحطات التحليلة.",
    overlay: "rgba(230, 81, 0, 0.6)",
    image: fieldStreet
  },
  {
    titleEn: "SHELTER & HOMES",
    titleAr: "المأوى والمجمعات السكنية",
    descEn: "Constructing secure housing, refugee villages, and weather-proof shelters for victims of conflict and disasters.",
    descAr: "بناء المجمعات السكنية والقرى النموذجية وتوفير الخيام والمخيمات الآمنة للعائلات النازحة.",
    overlay: "rgba(21, 101, 192, 0.6)",
    image: fieldAlley
  },
  {
    titleEn: "EDUCATION & SCHOOLS",
    titleAr: "التعليم ورعاية المدارس",
    descEn: "Supporting schools, rebuilding classrooms, providing supplies, and sponsoring students for a brighter future.",
    descAr: "ترميم المدارس وتجهيز الصفوف وتأمين المستلزمات التعليمية ودعم الطلاب لضمان مستقبل أفضل.",
    overlay: "rgba(46, 125, 50, 0.6)",
    image: fieldCamp
  }
];

const Home = () => {
  const { isRTL, t, language } = useLanguage();
  const isAr = language === 'ar';
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIntro, setCurrentIntro] = useState(0);
  const [currentVideoText, setCurrentVideoText] = useState(0);
  const statsSectionRef = useRef(null);
  const areStatsInView = useInView(statsSectionRef, { amount: 0.25, once: false });

  const ArrowIcon = isRTL ? FaArrowLeft : FaArrowRight;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const videoTexts = [
    {
      titleEn: 'WHO WE ARE',
      titleAr: 'من نحن',
      textEn: 'REVIVE Foundation for Social Services works in Syria to restore opportunity, dignity, and hope for Syrians and Palestinian refugees through education, health, economic empowerment, and building resilient communities.',
      textAr: 'مؤسسة إحياء للخدمات الاجتماعية تعمل في سوريا لاستعادة الفرص والكرامة والأمل للسوريين واللاجئين الفلسطينيين.'
    },
    {
      titleEn: 'OUR MISSION',
      titleAr: 'رسالتنا',
      textEn: 'Through education, health and well-being, social services, economic empowerment, and cultural programs, we equip individuals with the knowledge, skills, resources, and confidence to overcome challenges.',
      textAr: 'عبر التعليم والصحة والرفاه والخدمات الاجتماعية والتمكين الاقتصادي، نزود الأفراد بالمعرفة والمهارات والموارد لتجاوز التحديات.'
    },
    {
      titleEn: 'OUR VISION',
      titleAr: 'رؤيتنا',
      textEn: 'We envision a world where every person has the opportunity to rise beyond their circumstances, realize their potential, and shape a future defined by dignity and purpose.',
      textAr: 'نحلم بعالم يملك فيه كل إنسان الفرصة ليتجاوز ظروفه ويحقق إمكاناته ويصنع مستقبلاً يعرّفه الكرامة والهدف.'
    },
    {
      titleEn: 'OUR VALUES',
      titleAr: 'قيمنا',
      textEn: 'Compassion, Integrity, Empowerment, Collaboration, and Sustainability — these are the principles that guide every initiative and decision we make.',
      textAr: 'الرحمة، النزاهة، التمكين، التعاون، والاستدامة — هذه المبادئ التي توجه كل مبادراتنا وقراراتنا.'
    },
    {
      titleEn: 'EMPOWER. REBUILD. REVIVE.',
      titleAr: 'نُمكّن... نُعيد... نُحيي',
      textEn: 'Every human is a revival story waiting to be told. Join us in writing the next chapter of hope and transformation.',
      textAr: 'كل إنسان هو قصة إحياء تنتظر أن تُروى. انضم إلينا في كتابة الفصل التالي من الأمل والتغيير.'
    }
  ];

  useEffect(() => {
    const videoTimer = setInterval(() => {
      setCurrentVideoText((prev) => (prev + 1) % videoTexts.length);
    }, 5000);
    return () => clearInterval(videoTimer);
  }, []);

  const handlePackageAdd = (pkgTitle, amount) => {
    addToCart({
      id: `pkg-${pkgTitle}-${amount}`,
      title: pkgTitle,
      price: amount,
      quantity: 1
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
        await new Promise((resolve) => setTimeout(resolve, 800));
      } else {
        await emailjs.sendForm(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          e.target,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
      }
      toast.success(isRTL ? 'شكراً لاهتمامك! سنتواصل معك قريباً.' : 'Thank you for your interest! We will contact you soon.');
      e.target.reset();
    } catch (error) {
      console.error('Email error:', error);
      toast.error(isRTL ? 'حدث خطأ. يرجى المحاولة لاحقاً.' : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`homeContainer ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* ================= 1. HERO SECTION WITH INSTANT DONATE FORM ================= */}
      <section className="heroSection">
        <div className="heroLogoWatermark">
          <img src={logo} alt="Revive Logo Watermark" />
        </div>
        <div className="heroOverlay"></div>

        <div className="auto__container heroMainContainer">
          <div className="heroContentWrapper">
            
            {/* Left/Main Hero Content */}
            <div className="heroTextSide">
              {heroSlides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`heroSlide ${index === currentSlide ? 'active' : ''}`}
                >
                  <div className="heroLogoBadge">
                    <img src={logo} alt="REVIVE" className="heroBadgeImg" />
                  </div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
                    transition={{ duration: 0.6 }}
                    className="heroTitle"
                  >
                    {isRTL ? slide.titleAr : slide.titleEn}
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="heroDesc"
                  >
                    {isRTL ? slide.descAr : slide.descEn}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Link to={slide.link} className="button primary heroCtaBtn">
                      {isRTL ? slide.linkTextAr : slide.linkTextEn} <ArrowIcon />
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Right Side Overlay Instant Donation Widget */}
            <div className="heroDonateWidgetSide">
              <InstantDonateForm />
            </div>

          </div>

          {/* Hero Nav Tabs */}
          <div className="heroNavTabs">
            {heroSlides.map((slide, index) => (
              <button
                key={index}
                className={`heroTabBtn ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              >
                <h5>{isRTL ? slide.titleAr : slide.titleEn}</h5>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 1.5. MISSION & PHILOSOPHY SHOWCASE ================= */}
      <section className="homeMissionSection">
        <div className="auto__container">
          <motion.div 
            className="homePhilosophyHeader"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{t('about.philosophyBig')}</h2>
            <p className="philosophyQuote">"{t('about.quote')}"</p>
          </motion.div>

          <div className="homeMissionGrid">
            <motion.div 
              className="homeMissionCard"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>{t('about.mission')}</h3>
              <p>{t('about.missionDesc')}</p>
            </motion.div>
            
            <motion.div 
              className="homeMissionCard"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>{t('about.values')}</h3>
              <p>{t('about.valuesDesc')}</p>
            </motion.div>

            <motion.div 
              className="homeMissionCard visionCard"
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3>{t('about.vision')}</h3>
              <p>{t('about.visionDesc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 2. APPEALS FEATURED CARDS ================= */}
      <section className="appealsSection">
        <div className="auto__container">
          <div className="appealsGrid">
            
            <div className="appealsCard">
              <div className="appealsImage">
                <img src={fieldTeam} alt="Foundation Introduction" />
              </div>
              <div className="appealsCardBody">
                <h3>{isRTL ? 'التعريف بمؤسسة إحياء' : 'INTRODUCTION TO REVIVE'}</h3>
                <p>{isRTL ? 'تعرف أكثر على رؤيتنا وأهدافنا التنموية ومشاريعنا المستدامة لدعم وتمكين مجتمعنا.' : 'Learn more about our vision, developmental goals, and sustainable projects to support our community.'}</p>
                <Link to="/about" className="appealsLink">
                  {isRTL ? 'اقرأ المزيد عنا' : 'LEARN MORE ABOUT US'} <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="appealsCard">
              <div className="appealsImage">
                <img src={fieldChild} alt="Community Outreach" />
              </div>
              <div className="appealsCardBody">
                <h3>{isRTL ? 'جولات تفاعلية مع المجتمع المحلي' : 'INTERACTIVE COMMUNITY TOURS'}</h3>
                <p>{isRTL ? 'نعمل جنباً إلى جنب مع أفراد المجتمع، ننظم ورش عمل تفاعلية ونعزز روح التكافل والتطوع.' : 'We work side by side with community members, organizing interactive workshops and fostering a spirit of solidarity.'}</p>
                <Link to="/programs" className="appealsLink">
                  {isRTL ? 'اكتشف برامجنا' : 'DISCOVER OUR PROGRAMS'} <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ================= 3.5. VOLUNTEER WITH US CTA ================= */}
      <section className="volunteerCtaSection">
        <div className="auto__container">
          <div className="volunteerCtaGrid">
            <motion.div 
              className="volunteerCtaText"
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>{isRTL ? 'تطوع معنا' : 'VOLUNTEER WITH US'}</h2>
              <p>{isRTL 
                ? 'انضم إلى فريقنا التطوعي وكن جزءاً من التغيير. سواء كنت تمتلك مهارات تقنية أو تعليمية أو إدارية، يمكنك المساهمة في بناء مستقبل أفضل لمجتمعنا.'
                : 'Join our volunteer team and be part of the change. Whether you have technical, educational, or administrative skills, you can contribute to building a brighter future for our community.'
              }</p>
              <div className="volunteerStats" ref={statsSectionRef}>
                <div className="volStat">
                  <strong><AnimatedCounter target={20} suffix="+" trigger={areStatsInView} /></strong>
                  <span>{isRTL ? 'متطوع نشط' : 'Active Volunteers'}</span>
                </div>
                <div className="volStat">
                  <strong><AnimatedCounter target={3} suffix="+" trigger={areStatsInView} /></strong>
                  <span>{isRTL ? 'مشاريع تطوعية' : 'Volunteer Projects'}</span>
                </div>
                <div className="volStat">
                  <strong><AnimatedCounter target={8} trigger={areStatsInView} /></strong>
                  <span>{isRTL ? 'مجالات تطوع' : 'Volunteer Areas'}</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="volunteerCtaForm"
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>{isRTL ? 'قدّم طلب تطوع' : 'SUBMIT VOLUNTEER APPLICATION'}</h3>
              <form onSubmit={handleVolunteerSubmit}>
                <input type="text" name="user_name" placeholder={isRTL ? 'الاسم الكامل' : 'Full Name'} required />
                <input type="email" name="user_email" placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'} required />
                <input type="tel" name="user_phone" placeholder={isRTL ? 'رقم الهاتف' : 'Phone Number'} required />
                <select name="volunteer_area" required defaultValue="">
                  <option value="" disabled>{isRTL ? 'اختر مجال التطوع' : 'Select Volunteer Area'}</option>
                  <option value="Education">{isRTL ? 'التعليم والتدريب' : 'Education & Training'}</option>
                  <option value="Tech">{isRTL ? 'التكنولوجيا والبرمجة' : 'Technology & Programming'}</option>
                  <option value="Healthcare">{isRTL ? 'الرعاية الصحية' : 'Healthcare'}</option>
                  <option value="Marketing">{isRTL ? 'التسويق والإعلام' : 'Marketing & Media'}</option>
                  <option value="Admin">{isRTL ? 'الإدارة والتنظيم' : 'Administration'}</option>
                  <option value="Psychosocial">{isRTL ? 'الدعم النفسي والاجتماعي' : 'Psychosocial Support'}</option>
                </select>
                <textarea name="message" placeholder={isRTL ? 'رسالة قصيرة (اختياري)' : 'Brief message (optional)'} rows="3"></textarea>
                <button type="submit" className="button primary fullBtn" disabled={isSubmitting}>
                  {isSubmitting ? (isRTL ? 'جاري الإرسال...' : 'SENDING...') : (isRTL ? 'أرسل طلب التطوع' : 'SUBMIT APPLICATION')}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 3.8. PROJECTS & PROGRESS ================= */}
      <section className="projectsProgressSection">
        <div className="auto__container">
          <div className="sectionHeader">
            <h2>{isRTL ? 'مشاريعنا ونسب الإنجاز' : 'OUR PROJECTS & DONATION PROGRESS'}</h2>
            <p>{isRTL ? 'تابع تقدم مشاريعنا الإنسانية والتنموية وتأثير تبرعاتكم المنقذة للحياة على أرض الواقع.' : 'Track the progress of our humanitarian projects and the real-world impact of your life-saving donations.'}</p>
          </div>

          <div className="projectsGrid">
            {/* Project 1: Women Empowerment */}
            <motion.div className="projectCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="projectImg">
                <img src={fieldCommunity} alt="Women Empowerment" />
                <span className="projectStatus active">{isRTL ? 'قيد التنفيذ' : 'In Progress'}</span>
              </div>
              <div className="projectBody">
                <h3>{isRTL ? 'دعم المرأة وتمكينها' : 'Women Empowerment & Training'}</h3>
                <p>{isRTL ? 'توفير ورش عمل متخصصة للنساء لبناء قدراتهن المهنية ودعم استقلالهن المالي في مجتمعاتهن.' : 'Providing specialized workshops for women to build their vocational skills and support financial independence.'}</p>
                <div className="progressArea">
                  <div className="progressLabels">
                    <span className="progressFunded">{isRTL ? '0% تم التمويل - $0 / $30,000' : '0% Funded - $0 / $30,000'}</span>
                  </div>
                  <div className="progressBarBg">
                    <motion.div 
                      className="progressFill" 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '0%' }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <Link to="/donation?project=women_empowerment" className="button primary fullBtn">{isRTL ? 'تبرع للمشروع' : 'DONATE NOW'}</Link>
              </div>
            </motion.div>

            {/* Project 2: Technical Courses */}
            <motion.div className="projectCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="projectImg">
                <img src={techWorkshopImg} alt="Technical Courses" />
                <span className="projectStatus active">{isRTL ? 'مشروع مستمر' : 'Active Project'}</span>
              </div>
              <div className="projectBody">
                <h3>{isRTL ? 'الدورات التقنية والمهنية' : 'Technical & Vocational Courses'}</h3>
                <p>{isRTL ? 'تأهيل الشباب لسوق العمل من خلال دورات متقدمة في البرمجة والتكنولوجيا وصيانة الأجهزة الذكية.' : 'Equipping youth for the job market through advanced courses in programming, tech, and hardware maintenance.'}</p>
                <div className="progressArea">
                  <div className="progressLabels">
                    <span className="progressFunded">{isRTL ? '0% تم التمويل - $0 / $25,000' : '0% Funded - $0 / $25,000'}</span>
                  </div>
                  <div className="progressBarBg">
                    <motion.div 
                      className="progressFill" 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '0%' }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <Link to="/donation?project=technical_courses" className="button primary fullBtn">{isRTL ? 'تبرع للمشروع' : 'DONATE NOW'}</Link>
              </div>
            </motion.div>

            {/* Project 3: Children Education */}
            <motion.div className="projectCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="projectImg">
                <img src={fieldChild} alt="Children Education" />
                <span className="projectStatus pending">{isRTL ? 'قيد الانتظار' : 'Pending Funding'}</span>
              </div>
              <div className="projectBody">
                <h3>{isRTL ? 'متابعة الأطفال في الدراسة' : 'Children\'s Academic Support'}</h3>
                <p>{isRTL ? 'تقديم فصول دراسية إضافية، مستلزمات قرطاسية، ودعم نفسي لضمان استمرار تعليم الأطفال المتضررين.' : 'Providing extra classes, school supplies, and psychological support to ensure children continue their education.'}</p>
                <div className="progressArea">
                  <div className="progressLabels">
                    <span className="progressFunded">{isRTL ? '0% تم التمويل - $0 / $20,000' : '0% Funded - $0 / $20,000'}</span>
                  </div>
                  <div className="progressBarBg">
                    <motion.div 
                      className="progressFill" 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '0%' }} 
                      viewport={{ once: true }} 
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <Link to="/donation?project=children_education" className="button primary fullBtn">{isRTL ? 'تبرع للمشروع' : 'DONATE NOW'}</Link>
              </div>
            </motion.div>

            {/* Project 4: Restoring Schools */}
            <motion.div className="projectCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="projectImg">
                <img src={fieldStreet} alt="Restoring Schools" />
                <span className="projectStatus pending">{isRTL ? 'الهدف الجديد' : 'New Goal'}</span>
              </div>
              <div className="projectBody">
                <h3>{isRTL ? 'ترميم المدارس في مخيم اليرموك' : 'Restoring Yarmouk Schools'}</h3>
                <p>{isRTL ? 'إعادة بناء وتجهيز الفصول الدراسية في المدارس المتضررة لتهيئة بيئة تعليمية آمنة للطلاب في المخيم.' : 'Rebuilding and equipping damaged classrooms to create a safe learning environment for students in the camp.'}</p>
                <div className="progressArea">
                  <div className="progressLabels">
                    <span className="progressFunded">{isRTL ? '0% تم التمويل - $0 / $150,000' : '0% Funded - $0 / $150,000'}</span>
                  </div>
                  <div className="progressBarBg">
                    <motion.div 
                      className="progressFill" 
                      initial={{ width: 0 }} 
                      whileInView={{ width: '0%' }} 
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <Link to="/donation?project=restoring_schools" className="button primary fullBtn">{isRTL ? 'تبرع للمشروع' : 'DONATE NOW'}</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 4. VIDEO BACKGROUND WITH ROTATING ABOUT TEXT ================= */}
      <section className="videoAboutSection">
        <div className="videoAboutBg">
          <iframe 
            src="https://www.youtube-nocookie.com/embed/VbfpW0pbvaU?autoplay=1&mute=1&loop=1&playlist=VbfpW0pbvaU&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1" 
            title="Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
        <div className="videoAboutOverlay"></div>
        <div className="videoAboutContent auto__container">
          {videoTexts.map((item, idx) => (
            <div key={idx} className={`videoTextSlide ${idx === currentVideoText ? 'activeSlide' : ''}`}>
              <h2 className="videoAboutTitle">
                {isRTL ? item.titleAr : item.titleEn}
              </h2>
              <p className="videoAboutText">
                {isRTL ? item.textAr : item.textEn}
              </p>
            </div>
          ))}
          <div className="videoAboutDots">
            {videoTexts.map((_, idx) => (
              <button 
                key={idx} 
                className={`videoDot ${idx === currentVideoText ? 'activeDot' : ''}`}
                onClick={() => setCurrentVideoText(idx)}
              />
            ))}
          </div>
          <Link to="/about" className="button primary videoAboutBtn">
            {isRTL ? 'اعرف المزيد عنا' : 'LEARN MORE ABOUT US'}
          </Link>
        </div>
      </section>

      {/* ================= 5. TECH SERVICES & PRODUCTS ================= */}
      <section className="techServicesSection" id="tech-services">
        <div className="auto__container">
          <div className="sectionHeader">
            <h2>{isRTL ? 'خدماتنا ومنتجاتنا' : 'OUR SERVICES & PRODUCTS'}</h2>
            <p>{isRTL ? 'ندعم المجتمع من خلال تقديم خدمات تقنية احترافية وعرض منتجات يدوية وحرفية مميزة يعود ريعها لدعم برامجنا الخيرية.' : 'We support the community by providing professional tech services and offering unique handmade crafts, with proceeds supporting our charity programs.'}</p>
          </div>

          <div className="techGrid">
            
            {/* Tech Services */}
            <motion.div className="techCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="techCardImg">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Web Development" />
              </div>
              <div className="techCardContent">
                <h3>{isRTL ? 'تطوير المواقع والتطبيقات' : 'Web & App Development'}</h3>
                <p>{isRTL ? 'تصميم وتطوير مواقع وتطبيقات احترافية باستخدام أحدث التقنيات.' : 'Professional website and mobile app design & development using cutting-edge technologies.'}</p>
                <span className="techPrice">{isRTL ? 'يبدأ من $100' : 'Starting from $100'}</span>
                <Link to="/contact" className="techBtn">{isRTL ? 'اطلب الخدمة' : 'REQUEST SERVICE'}</Link>
              </div>
            </motion.div>

            <motion.div className="techCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="techCardImg">
                <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80" alt="AI Solutions" />
              </div>
              <div className="techCardContent">
                <h3>{isRTL ? 'حلول الذكاء الاصطناعي' : 'AI Solutions & Automation'}</h3>
                <p>{isRTL ? 'أنظمة متقدمة تشمل روبوتات محادثة وتحليل بيانات وأتمتة العمليات.' : 'Advanced systems including chatbots, data analytics, and process automation.'}</p>
                <span className="techPrice">{isRTL ? 'يبدأ من $100' : 'Starting from $100'}</span>
                <Link to="/contact" className="techBtn">{isRTL ? 'اطلب الخدمة' : 'REQUEST SERVICE'}</Link>
              </div>
            </motion.div>

            <motion.div className="techCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="techCardImg">
                <img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80" alt="Digital Marketing" />
              </div>
              <div className="techCardContent">
                <h3>{isRTL ? 'التسويق الرقمي' : 'Digital Marketing'}</h3>
                <p>{isRTL ? 'إدارة شاملة لحملات التسويق الرقمي وحسابات التواصل الاجتماعي.' : 'Comprehensive management of digital marketing campaigns and social media.'}</p>
                <span className="techPrice">{isRTL ? 'يبدأ من $100' : 'Starting from $100'}</span>
                <Link to="/contact" className="techBtn">{isRTL ? 'اطلب الخدمة' : 'REQUEST SERVICE'}</Link>
              </div>
            </motion.div>

            <motion.div className="techCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
              <div className="techCardImg">
                <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80" alt="Graphic Design" />
              </div>
              <div className="techCardContent">
                <h3>{isRTL ? 'التصميم الجرافيكي' : 'Graphic Design'}</h3>
                <p>{isRTL ? 'تصميم هوية بصرية كاملة تشمل الشعارات والمطبوعات الاحترافية.' : 'Complete visual identity design including logos and professional print materials.'}</p>
                <span className="techPrice">{isRTL ? 'يبدأ من $100' : 'Starting from $100'}</span>
                <Link to="/contact" className="techBtn">{isRTL ? 'اطلب الخدمة' : 'REQUEST SERVICE'}</Link>
              </div>
            </motion.div>

            {/* Handmade Products */}
            <motion.div className="techCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
              <div className="techCardImg">
                <img src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=600&q=80" alt="Resin Crafts" />
              </div>
              <div className="techCardContent">
                <h3>{isRTL ? 'مشغولات الريزن الفنية' : 'Resin Art Crafts'}</h3>
                <p>{isRTL ? 'تحف وإكسسوارات ريزن يدوية الصنع بأيدي حرفيين محليين لدعم الأسر المنتجة.' : 'Handmade resin art and accessories crafted by local artisans to support families.'}</p>
                <span className="techPrice">{isRTL ? 'يبدأ من $100' : 'Starting from $100'}</span>
                <button className="techBtn" onClick={() => handlePackageAdd(isRTL ? 'منتج ريزن' : 'Resin Craft', 100)}>{isRTL ? 'أضف للسلة' : 'ADD TO BASKET'}</button>
              </div>
            </motion.div>

            <motion.div className="techCard" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
              <div className="techCardImg">
                <img src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80" alt="Wool Products" />
              </div>
              <div className="techCardContent">
                <h3>{isRTL ? 'منتجات الصوف اليدوية' : 'Handmade Wool'}</h3>
                <p>{isRTL ? 'ألبسة وقطع صوفية محاكة بحب وإتقان توفر الدفء وتدعم المشاريع النسائية.' : 'Lovingly knitted wool garments and pieces providing warmth and supporting women.'}</p>
                <span className="techPrice">{isRTL ? 'يبدأ من $100' : 'Starting from $100'}</span>
                <button className="techBtn" onClick={() => handlePackageAdd(isRTL ? 'منتج صوف' : 'Wool Craft', 100)}>{isRTL ? 'أضف للسلة' : 'ADD TO BASKET'}</button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= 6. CORE SECTORS INTRO SLIDER ================= */}
      <section className="introSectorsSection">
        <div className="introSlideContainer">
          <div
            className="introSlideItem"
            style={{ backgroundImage: `url(${introItems[currentIntro].image})` }}
          >
            <div className="introOverlay" style={{ backgroundColor: introItems[currentIntro].overlay }}></div>
            <div className="auto__container introContent">
              <h2>{isRTL ? introItems[currentIntro].titleAr : introItems[currentIntro].titleEn}</h2>
              <p>{isRTL ? introItems[currentIntro].descAr : introItems[currentIntro].descEn}</p>
              <Link to="/programs" className="button outline lightBtn">
                {isRTL ? 'اعرف المزيد عن البرامج' : 'LEARN MORE'} <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="introControls auto__container">
            <button className="introCtrlBtn" onClick={() => setCurrentIntro((prev) => (prev === 0 ? introItems.length - 1 : prev - 1))}>
              <FaArrowLeft /> {isRTL ? 'السابق' : 'PREVIOUS'}
            </button>
            <button className="introCtrlBtn" onClick={() => setCurrentIntro((prev) => (prev + 1) % introItems.length)}>
              {isRTL ? 'التالي' : 'NEXT'} <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ================= 7. STORIES & BLOGS ================= */}
      <section className="blogsSection">
        <div className="auto__container">
          <div className="sectionHeader">
            <h2>{isRTL ? 'القصص والتقارير الميدانية' : 'STORIES AND FIELD BLOGS'}</h2>
            <p>{isRTL ? 'معاً نستمر في تغيير حياة الآلاف ونقل صورة المعاناة والأمل من الميدان.' : 'Together we continue to change lives and share powerful stories of hope.'}</p>
          </div>

          <div className="blogsGrid">
            
            <div className="blogCard">
              <div className="blogImg">
                <img src={fieldBanner2} alt="Field Report" />
              </div>
              <div className="blogBody">
                <div className="blogDate">06 Aug 2026 | 5 min read</div>
                <h3>{isRTL ? 'كيف تغير برامج التعليم حياة أطفال المخيمات' : 'How Education Programs Are Changing Lives in Camps'}</h3>
                <p>{isRTL ? 'تقرير ميداني يوثق أثر برامجنا التعليمية في تحسين مستقبل الأطفال وتمكينهم من مواصلة تعليمهم.' : 'A field report documenting how our education programs are improving children\'s futures.'}</p>
                <Link to="/about" className="blogLink">
                  {isRTL ? 'اقرأ القصة بالكامل' : 'READ MORE'} <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="blogCard">
              <div className="blogImg">
                <img src={fieldOutreach} alt="Community Outreach" />
              </div>
              <div className="blogBody">
                <div className="blogDate">04 Aug 2026 | 4 min read</div>
                <h3>{isRTL ? 'جولة ميدانية: توزيع المستلزمات المدرسية والدعم المجتمعي' : 'Field Tour: Distributing School Supplies & Community Support'}</h3>
                <p>{isRTL ? 'فريق المتطوعين يوثق توزيع الطرود المدرسية والمواد الأساسية على الأسر المحتاجة.' : 'Our volunteer team documents the distribution of school supplies and essentials to families in need.'}</p>
                <Link to="/about" className="blogLink">
                  {isRTL ? 'اقرأ القصة بالكامل' : 'READ MORE'} <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="blogCard">
              <div className="blogImg">
                <img src={fieldChild} alt="Children Support" />
              </div>
              <div className="blogBody">
                <div className="blogDate">22 Jul 2026 | 6 min read</div>
                <h3>{isRTL ? 'دعم 150 أسرة من خلال برنامج المساعدات المباشرة' : 'Supporting 150 Families Through Direct Assistance Program'}</h3>
                <p>{isRTL ? 'تقديم الدعم المباشر للأسر لتغطية الاحتياجات العاجلة من تعليم ورعاية صحية.' : 'Providing direct support to families to cover urgent needs including education and healthcare.'}</p>
                <Link to="/about" className="blogLink">
                  {isRTL ? 'اقرأ القصة بالكامل' : 'READ MORE'} <ArrowIcon />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 8. OVERALL IMPACT NUMBERS ================= */}
      <section className="overallImpactSection">
        <div className="auto__container">
          <h2 className="overallTitle">{isRTL ? '6 أشخاص يتلقون الدعم والدعم الطبي كل دقيقة' : '6 PEOPLE SUPPORTED EVERY MINUTE'}</h2>
          
          <div className="overallGrid">
            <div className="overallCard">
              <div className="bigNum red">200+</div>
              <h3>{isRTL ? 'مشروع إنساني' : 'ACTIVE PROJECTS'}</h3>
              <p>{isRTL ? 'ننفذ مئات المشاريع في مجالات التعليم والصحة والإغاثة والمياه.' : 'Implementing hundreds of projects across 15+ countries.'}</p>
            </div>

            <div className="overallCard">
              <div className="bigNum red">16M+</div>
              <h3>{isRTL ? 'مستفيد ومستفيدة' : 'BENEFICIARIES REACHED'}</h3>
              <p>{isRTL ? 'قدمنا المساعدات والخدمات الاجتماعية لأكثر من 16 مليون شخص منذ تأسيسنا.' : 'Provided humanitarian aid to over 16 million people since 2011.'}</p>
            </div>

            <div className="overallCard">
              <div className="bigNum">14+</div>
              <h3>{isRTL ? 'عاماً من العطاء' : 'YEARS OF IMPACT'}</h3>
              <p>{isRTL ? 'نقف بجانب المجتمعات في المتأثرة بالأزمات لمساعدتها على التعافي والبناء.' : 'Supporting communities in crisis, helping them survive, rebuild, and recover.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. JOIN A CHALLENGE / EVENTS ================= */}
      <section className="challengesSection">
        <div className="auto__container">
          <div className="sectionHeader">
            <h2>{isRTL ? 'انضم إلى التحديات والفعاليات الخيرية' : 'JOIN OUR CHALLENGES & COMMUNITY EVENTS'}</h2>
            <p>{isRTL ? 'مغامرات وفعاليات ومبادرات مجتمعية على مدار العام لدعم المحتاجين وترك أثر دائم.' : 'Community events and volunteer initiatives year-round to make a lasting difference.'}</p>
          </div>

          <motion.div 
            className="upcomingEventsNoticeBox"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="noticeIconWrap">
              <FaCalendarAlt className="noticeMainIcon" />
            </div>
            <div className="noticeContent">
              <span className="noticeBadge">{isRTL ? 'ترقبوا قريباً' : 'COMING SOON'}</span>
              <h3>{isRTL ? 'المزيد من الفعاليات والأحداث قادمة...' : 'More Events & Activities Coming Soon...'}</h3>
              <p>
                {isRTL 
                  ? 'يعمل فريق مؤسسة إحياء حالياً على إعداد وتنسيق سلسلة متميزة من الفعاليات الميدانية والأنشطة المجتمعية والتطوعية الهادفة. ترقبوا الإعلان عن مواعيدها وتفاصيل المشاركة قريباً جداً.'
                  : 'The REVIVE Foundation team is currently preparing a distinguished series of field events, community activities, and volunteer workshops. Stay tuned for dates and participation details!'
                }
              </p>
              <div className="noticeActions">
                <Link to="/contact" className="button primary">
                  <FaBullhorn /> {isRTL ? 'اقترح فعالية أو تواصل معنا' : 'Suggest an Event / Contact Us'}
                </Link>
                <Link to="/programs" className="button outline">
                  <FaHandsHelping /> {isRTL ? 'استكشف برامجنا الحالية' : 'Explore Our Programs'}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= 10. NEWSLETTER SIGNUP ================= */}
      <section className="newsletterSection">
        <div className="auto__container">
          <div className="newsletterBox">
            <h2>{isRTL ? 'احصل على التحديثات والتقارير الميدانية مباشرة' : 'GET UPDATES STRAIGHT TO YOUR INBOX'}</h2>
            <p>{isRTL ? 'اشترك في النشرة الإخبارية لتصلك آخر أخبار الحملات والقصص الميدانية فور حدوثها.' : 'Stay informed, inspired, and connected with our humanitarian work worldwide.'}</p>

            <form onSubmit={(e) => { e.preventDefault(); toast.success(isRTL ? 'شكراً لاشتراككم!' : 'Thank you for subscribing!'); e.target.reset(); }} className="newsletterForm">
              <div className="inputRow">
                <input type="text" placeholder={isRTL ? 'الاسم الأول' : 'First Name'} required />
                <input type="text" placeholder={isRTL ? 'الاسم الأخير' : 'Last Name'} required />
                <input type="email" placeholder={isRTL ? 'البريد الإلكتروني' : 'Email Address'} required />
              </div>
              <button type="submit" className="button don newsletterSubmit">
                {isRTL ? 'اشترك الآن' : 'SIGN UP NOW'}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

