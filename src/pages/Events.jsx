import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/email';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaTicketAlt, 
  FaShareAlt, 
  FaCheckCircle, 
  FaTimes, 
  FaFilter, 
  FaArrowRight, 
  FaArrowLeft, 
  FaVideo, 
  FaHandHoldingHeart, 
  FaGraduationCap, 
  FaHandsHelping, 
  FaSearch,
  FaCalendarPlus,
  FaBullhorn
} from 'react-icons/fa';

import imgConference from '../assets/field-conference.jpeg';
import imgCommunity from '../assets/field-community.jpeg';
import imgTeam from '../assets/field-team.jpeg';
import imgOutreach from '../assets/field-outreach.jpeg';
import imgCamp from '../assets/field-camp.jpeg';
import imgMen from '../assets/field-men.jpeg';
import imgStreet from '../assets/field-street.jpeg';

import './Events.css';

export default function Events() {
  const { isRTL, language } = useLanguage();
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState('upcoming'); // 'all', 'upcoming', 'past'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // RSVP Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rsvpData, setRsvpData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attendees: '1',
    attendanceType: 'in-person',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'all', labelEn: 'All Categories', labelAr: 'جميع التصنيفات' },
    { id: 'gala', labelEn: 'Gala & Fundraising', labelAr: 'حفلات خيرية وجمع تبرعات' },
    { id: 'tech', labelEn: 'Tech & Youth Bootcamps', labelAr: 'معسكرات تقنية وشبابية' },
    { id: 'community', labelEn: 'Community & Volunteer', labelAr: 'مبادرات مجتمعية وتطوعية' },
    { id: 'women', labelEn: 'Women Empowerment', labelAr: 'تمكين المرأة والريادة' }
  ];

  const eventsData = [
    {
      id: 'gala-2026',
      titleEn: 'Annual Charity Gala & Hope for Yarmouk',
      titleAr: 'الحفل الخيري السنوي: نبض الأمل لليارموك',
      category: 'gala',
      status: 'upcoming',
      featured: true,
      image: imgConference,
      day: '15',
      monthEn: 'OCT 2026',
      monthAr: 'أكتوبر ٢٠٢٦',
      fullDateEn: 'Thursday, October 15, 2026',
      fullDateAr: 'الخميس، ١٥ أكتوبر ٢٠٢٦',
      timeEn: '06:00 PM – 10:00 PM (GMT+3)',
      timeAr: '٠٦:٠٠ مساءً – ١٠:٠٠ مساءً (توقيت دمشق)',
      locationEn: 'REVIVE Central Cultural Center, Damascus / Live Global Stream',
      locationAr: 'المركز الثقافي المركزي لمؤسسة إحياء، دمشق / بث عالمي مباشر',
      formatEn: 'Hybrid (In-Person & Live Stream)',
      formatAr: 'حضوري وبث مباشر عبر الإنترنت',
      capacityEn: '250 In-person Seats • Unlimited Virtual',
      capacityAr: '٢٥٠ مقعداً حضورياً • حضور افتراضي مفتوح',
      descEn: 'Join community leaders, humanitarian pioneers, and generous supporters for an inspiring evening celebrating resilience, community impact, and launching our 2027 Sustainable Relief Fund.',
      descAr: 'أمسية إنسانية ملهمة تجمع قادة العمل الإنساني والداعمين للاحتفاء بقصص الصمود والإنجاز، وإطلاق صندوق الإغاثة والتمكين المستدام لعام ٢٠٢٧.',
      highlightsEn: ['Keynote speakers & live musical performances', 'Annual impact report premiere', 'Silent charity auction for education scholarships'],
      highlightsAr: ['كلمات افتتاحية وفقرات فنية ملهمة', 'عرض التقرير السنوي الميداني للإنجازات', 'مزاد خيري مخصص للمنح الدراسية والمهنية']
    },
    {
      id: 'tech-bootcamp-2026',
      titleEn: 'Youth Tech Bootcamp: AI & Web Development',
      titleAr: 'المعسكر التقني للشباب: الذكاء الاصطناعي وتطوير الويب',
      category: 'tech',
      status: 'upcoming',
      featured: false,
      image: imgTeam,
      day: '22',
      monthEn: 'NOV 2026',
      monthAr: 'نوفمبر ٢٠٢٦',
      fullDateEn: 'Sunday – Thursday, Nov 22–26, 2026',
      fullDateAr: 'الأحد – الخميس، ٢٢–٢٦ نوفمبر ٢٠٢٦',
      timeEn: '09:00 AM – 03:00 PM Daily',
      timeAr: '٠٩:٠٠ صباحاً – ٠٣:٠٠ عصراً يومياً',
      locationEn: 'REVIVE Innovation & Digital Lab, Yarmouk Hub',
      locationAr: 'مختبر إحياء الرقمي والابتكار، مخيم اليرموك',
      formatEn: 'Hands-on Intensive Workshop',
      formatAr: 'ورشة عمل وتدريب عملي مكثف',
      capacityEn: '40 Certified Trainee Seats',
      capacityAr: '٤٠ مقعداً تدريبياً معتمداً',
      descEn: 'An intensive 5-day bootcamp empowering 40 talented young men and women with practical coding, generative AI workflows, and freelance digital marketplace strategies.',
      descAr: 'معسكر تدريبي مكثف لمدة ٥ أيام لتأهيل ٤٠ شاباً وشابة على مهارات البرمجة الحديثة، تطبيقات الذكاء الاصطناعي، واستراتيجيات العمل الحر عبر الإنترنت.',
      highlightsEn: ['Hands-on project mentorship with tech professionals', 'Free certified hardware kit & tools', 'Internship opportunities with partner software firms'],
      highlightsAr: ['توجيه وإشراف مباشر من خبراء برمجيات', 'حقيبة أدوات برمجية وعتاد مجاني للمشاركين', 'فرص تدريب عملي لدى شركات تقنية شريكة']
    },
    {
      id: 'community-cleanup-2026',
      titleEn: 'Green Yarmouk: Community Cleanup & Tree Planting',
      titleAr: 'مبادرة اليرموك الأخضر: حملة النظافة والتشجير المجتمعية',
      category: 'community',
      status: 'upcoming',
      featured: false,
      image: imgStreet,
      day: '05',
      monthEn: 'DEC 2026',
      monthAr: 'ديسمبر ٢٠٢٦',
      fullDateEn: 'Saturday, December 5, 2026',
      fullDateAr: 'السبت، ٥ ديسمبر ٢٠٢٦',
      timeEn: '08:00 AM – 02:00 PM',
      timeAr: '٠٨:٠٠ صباحاً – ٠٢:٠٠ ظهراً',
      locationEn: 'Yarmouk Camp Main Street & Al-Fidda District',
      locationAr: 'الشارع الرئيسي وحي الفداء، مخيم اليرموك',
      formatEn: 'Volunteer Field Day',
      formatAr: 'يوم تطوعي ميداني مفتوح',
      capacityEn: 'Open to 150+ Volunteers & Families',
      capacityAr: 'مفتوح لأكثر من ١٥٠ متطوعاً وعائلة',
      descEn: 'Bring your energy and volunteer spirit! Together we will rehabilitate community streets, plant 300 olive and shade trees, and restore local recreational parks.',
      descAr: 'شاركنا همتك وعطاءك في يوم تطوعي لإعادة تأهيل الشوارع الحيوية، وزراعة ٣٠٠ شجرة زيتون وظل، وتجميل الساحات العامة للأطفال والعائلات.',
      highlightsEn: ['Volunteer safety gear & refreshments provided', 'Eco-friendly neighborhood awareness station', 'Community lunch & certificate of appreciation'],
      highlightsAr: ['تأمين كامل معدات السلامة والضيافة', 'محطة توعية بيئية واستدامة مجتمعية', 'غداء جماعي وشهادات تقدير للمتطوعين']
    },
    {
      id: 'women-market-2026',
      titleEn: 'Women Artisans & Micro-Entrepreneurs Bazaar',
      titleAr: 'بازار رائدات الأعمال والحرف اليدوية النسائية',
      category: 'women',
      status: 'upcoming',
      featured: false,
      image: imgOutreach,
      day: '18',
      monthEn: 'DEC 2026',
      monthAr: 'ديسمبر ٢٠٢٦',
      fullDateEn: 'Friday & Saturday, Dec 18–19, 2026',
      fullDateAr: 'الجمعة والسبت، ١٨–١٩ ديسمبر ٢٠٢٦',
      timeEn: '10:00 AM – 08:00 PM',
      timeAr: '١٠:٠٠ صباحاً – ٠٨:٠٠ مساءً',
      locationEn: 'REVIVE Community Courtyard & Exhibition Hall',
      locationAr: 'باحة وقاعة المعارض بمؤسسة إحياء، دمشق',
      formatEn: 'Public Exhibition & Marketplace',
      formatAr: 'معرض وسوق مفتوح للجمهور',
      capacityEn: '60 Booths • Open Public Entry',
      capacityAr: '٦٠ جناحاً إنتاجياً • دخول مجاني للعموم',
      descEn: 'A vibrant weekend exhibition showcasing handmade crafts, organic food products, textiles, and tech services created by graduates of REVIVE Women Empowerment Programs.',
      descAr: 'معرض حيوي يبرز إبداعات ومنتجات خريجات برنامج تمكين المرأة بمؤسسة إحياء، من الحرف التراثية والخياطة والأغذية الصحية إلى الخدمات الرقمية.',
      highlightsEn: ['Direct support to 60+ micro-business owners', 'Live artisan demonstrations & craft workshops', 'Family activities and networking zone'],
      highlightsAr: ['دعم مباشر لأكثر من ٦٠ صاحبة مشروع صغير', 'عروض حية للحرف وصناعة المنتجات التراثية', 'أنشطة عائلية ومنطقة تواصل ريادي']
    },
    {
      id: 'winter-warmth-2025',
      titleEn: 'Winter Warmth & Shelter Relief Distribution',
      titleAr: 'حملة دفء الشتاء وتوزيع المساعدات الإغاثية',
      category: 'community',
      status: 'past',
      featured: false,
      image: imgCamp,
      day: '12',
      monthEn: 'JAN 2026',
      monthAr: 'يناير ٢٠٢٦',
      fullDateEn: 'January 12, 2026',
      fullDateAr: '١٢ يناير ٢٠٢٦',
      timeEn: 'Completed • 1,200 Families Reached',
      timeAr: 'تم بنجاح • تم الوصول إلى ١,٢٠٠ عائلة',
      locationEn: 'Yarmouk Camp & Surrounding Settlements',
      locationAr: 'مخيم اليرموك والمناطق المجاورة',
      formatEn: 'Emergency Humanitarian Relief',
      formatAr: 'إغاثة إنسانية ميدانية طارئة',
      capacityEn: '1,200 Heating Kits Distributed',
      capacityAr: 'توزيع ١,٢٠٠ سلة تدفئة وكسوة شتوية',
      descEn: 'Mobilized emergency heating fuels, thermal blankets, and winter clothing kits to protect vulnerable families and children against freezing temperatures.',
      descAr: 'حملة ميدانية استهدفت تأمين وسائل التدفئة والبطانيات والملابس الشتوية لحماية الأسر الأكثر هشاشة والأطفال من موجات الصقيع.',
      highlightsEn: ['1,200 families supported with heating packages', 'Direct doorstep delivery to elderly & injured individuals', 'Collaborative execution with 85 community volunteers'],
      highlightsAr: ['تأمين الدفء لأكثر من ١,٢٠٠ عائلة محتاجة', 'توصيل مباشر لمنازل كبار السن وذوي الاحتياجات', 'تنفيذ ميداني بمشاركة ٨٥ متطوعاً ومتطوعة']
    },
    {
      id: 'youth-hackathon-2025',
      titleEn: 'Smart Camp Hackathon: Tech for Good',
      titleAr: 'هاكاثون المخيم الذكي: التكنولوجيا لخدمة المجتمع',
      category: 'tech',
      status: 'past',
      featured: false,
      image: imgMen,
      day: '20',
      monthEn: 'FEB 2026',
      monthAr: 'فبراير ٢٠٢٦',
      fullDateEn: 'February 20–21, 2026',
      fullDateAr: '٢٠–٢١ فبراير ٢٠٢٦',
      timeEn: 'Completed • 18 Prototype Solutions Created',
      timeAr: 'تم بنجاح • تطوير ١٨ حلاً رقمياً ونموذجاً أولياً',
      locationEn: 'REVIVE Tech Hub & Virtual Pitch Rooms',
      locationAr: 'مركز إحياء للتكنولوجيا ومنصات التحكيم الرقمية',
      formatEn: '48-Hour Innovation Hackathon',
      formatAr: 'هاكاثون ابتكار متواصل على مدى ٤٨ ساعة',
      capacityEn: '75 Innovators & Developers',
      capacityAr: '٧٥ مبتكراً ومطور برمجيات',
      descEn: 'A 48-hour competitive innovation marathon where youth designed water distribution monitoring sensors, digital aid portals, and emergency alert apps.',
      descAr: 'ماراثون ابتكاري شبابي على مدار ٤٨ ساعة لتصميم حلول تقنية لمعالجة تحديات توزيع المياه، بوابات التكافل الرقمية، وتطبيقات الاستجابة للطوارئ.',
      highlightsEn: ['3 winning projects awarded micro-grants of $5,000 each', 'Mentorship from international software engineers', 'Ongoing incubation inside REVIVE tech incubator'],
      highlightsAr: ['فوز ٣ مشاريع بمنح تمويلية وتأسيسية', 'إرشاد من مهندسي برمجيات عالميين', 'احتضان المشاريع الفائزة داخل حاضنة إحياء']
    }
  ];

  // Filtering logic
  const filteredEvents = eventsData.filter((event) => {
    // Tab filter
    if (activeTab === 'upcoming' && event.status !== 'upcoming') return false;
    if (activeTab === 'past' && event.status !== 'past') return false;

    // Category filter
    if (selectedCategory !== 'all' && event.category !== selectedCategory) return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchEn = event.titleEn.toLowerCase().includes(q) || event.descEn.toLowerCase().includes(q) || event.locationEn.toLowerCase().includes(q);
      const matchAr = event.titleAr.includes(q) || event.descAr.includes(q) || event.locationAr.includes(q);
      if (!matchEn && !matchAr) return false;
    }

    return true;
  });

  const featuredEvent = eventsData.find((e) => e.featured);

  const openRsvpModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeRsvpModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setRsvpData({
      fullName: '',
      email: '',
      phone: '',
      attendees: '1',
      attendanceType: 'in-person',
      notes: ''
    });
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpData.fullName || !rsvpData.email || !rsvpData.phone) {
      toast.error(isAr ? 'يرجى ملء جميع الحقول الإلزامية للتسجيل' : 'Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const templateParams = {
        from_name: rsvpData.fullName,
        from_email: rsvpData.email,
        subject: `Event Registration: ${isAr ? selectedEvent?.titleAr : selectedEvent?.titleEn}`,
        message: `Phone: ${rsvpData.phone}\nAttendees: ${rsvpData.attendees}\nType: ${rsvpData.attendanceType}\nNotes: ${rsvpData.notes}`,
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
        isAr 
          ? `تم تأكيد تسجيلك بنجاح في "${selectedEvent?.titleAr}". تم إرسال تذكرة الحضور إلى بريدك الإلكتروني!`
          : `RSVP successfully confirmed for "${selectedEvent?.titleEn}". Your pass and details have been sent to your email!`
      );
      closeRsvpModal();
    } catch (error) {
      toast.error(isAr ? 'حدث خطأ أثناء التسجيل. يرجى المحاولة لاحقاً.' : 'Error during registration. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEventShareLink = (event) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/events#' + event.id);
      toast.info(isAr ? 'تم نسخ رابط الفعالية للمشاركة!' : 'Event link copied to clipboard!');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className={`events-page ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* 1. Hero Section */}
      <section 
        className="events-hero"
        style={{ backgroundImage: `url(${imgConference})` }}
      >
        <div className="events-hero-overlay"></div>
        <div className="auto__container events-hero-container">
          <motion.div 
            className="events-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="events-badge-top">
              <FaBullhorn className="badge-icon" />
              <span>{isAr ? 'برامج ولقاءات إحياء التنموية' : 'REVIVE COMMUNITY GATHERINGS & INITIATIVES'}</span>
            </div>
            
            <h1 className="events-hero-title">
              {isAr ? 'الفعاليات والأنشطة المجتمعية' : 'Community Events & Gatherings'}
            </h1>
            
            <p className="events-hero-subtitle">
              {isAr
                ? 'شاركنا في بناء مستقبل أكثر إشراقاً. انضم إلى ورش العمل التقنية، الفعاليات التنموية، والحملات الإغاثية والخيرية في مخيم اليرموك وحول العالم.'
                : 'Join hands with us to build a brighter future. Participate in technical workshops, community initiatives, charity galas, and youth empowerment events worldwide.'}
            </p>

            {/* Quick Hero Stats */}
            <div className="events-hero-stats">
              <div className="hero-stat-card">
                <span className="stat-number">50+</span>
                <span className="stat-label">{isAr ? 'فعالية ولقاء مجتمعي' : 'Events Organized'}</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-number">4,200+</span>
                <span className="stat-label">{isAr ? 'مستفيد وحاضر' : 'Community Attendees'}</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">{isAr ? 'مبادرات مجانية وغير ربحية' : 'Community Driven'}</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-number">12+</span>
                <span className="stat-label">{isAr ? 'شراكة تنموية وأكاديمية' : 'Partner Hubs'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Events Directory & Controls */}
      <section className="events-main-section">
        <div className="auto__container">
          
          {/* Controls Bar: Tabs, Search & Filters */}
          <div className="events-controls-box">
            
            {/* Tabs: All / Upcoming / Past */}
            <div className="events-tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                {isAr ? 'الفعاليات القادمة' : 'Upcoming Events'}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                onClick={() => setActiveTab('past')}
              >
                {isAr ? 'الفعاليات السابقة والأرشيف' : 'Past Events'}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                {isAr ? 'جميع الفعاليات' : 'All Events'}
              </button>
            </div>

            {/* Filter by Category & Search */}
            <div className="filter-and-search-row">
              <div className="category-filters-scroll">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`category-filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {isAr ? cat.labelAr : cat.labelEn}
                  </button>
                ))}
              </div>

              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input 
                  type="text"
                  placeholder={isAr ? 'ابحث عن فعالية، تدريب، أو مكان...' : 'Search events, topics, or location...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button className="clear-search" onClick={() => setSearchQuery('')}>
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Upcoming Events State */}
          <motion.div 
            className="upcoming-events-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="upcoming-main-banner">
              <div className="upcoming-icon-wrap">
                <FaCalendarPlus className="upcoming-icon" />
              </div>
              <span className="upcoming-badge">
                {isAr ? 'ترقبوا فعالياتنا الجديدة' : 'STAY TUNED • UPCOMING EVENTS'}
              </span>
              <h2>
                {isAr ? 'الفعاليات القادمة قيد الإعداد والتنظيم' : 'Exciting Events Coming Soon!'}
              </h2>
              <p className="upcoming-main-desc">
                {isAr
                  ? 'يعمل فريق مؤسسة إحياء REVIVE الميداني بالتعاون مع شركائنا المحليين والدوليين على إعداد باقة متكاملة من الفعاليات الهادفة، المعسكرات التدريبية، والمبادرات المجتمعية التي سيتم الإعلان عنها قريباً.'
                  : 'Our team at REVIVE is actively planning an exciting lineup of community gatherings, youth bootcamps, and volunteer initiatives that will be announced shortly.'}
              </p>

              {/* Upcoming Highlights Grid */}
              <div className="upcoming-tracks-grid">
                <div className="track-card">
                  <div className="track-icon"><FaGraduationCap /></div>
                  <h4>{isAr ? 'معسكرات تقنية وشبابية' : 'Youth Tech Bootcamps'}</h4>
                  <p>{isAr ? 'دورات برمجة مكثفة، تطبيقات الذكاء الاصطناعي، وتأهيل لسوق العمل الحر.' : 'Intensive coding bootcamps, generative AI tools, and freelancing skills.'}</p>
                </div>

                <div className="track-card">
                  <div className="track-icon"><FaHandsHelping /></div>
                  <h4>{isAr ? 'مبادرات مجتمعية وتطوعية' : 'Community Volunteer Days'}</h4>
                  <p>{isAr ? 'حملات تشجير وتأهيل بيئي، وأنشطة ترفيهية وتعليمية للأطفال في المخيمات.' : 'Environmental greening, playground renovations, and children field activities.'}</p>
                </div>

                <div className="track-card">
                  <div className="track-icon"><FaHandHoldingHeart /></div>
                  <h4>{isAr ? 'تمكين المرأة والريادة' : 'Women Empowerment & Bazaars'}</h4>
                  <p>{isAr ? 'معارض الحرف والمشغولات اليدوية، وورش تدريب مهني لدعم الأسر المنتجة.' : 'Artisan craft bazaars and entrepreneurship workshops supporting local women.'}</p>
                </div>

                <div className="track-card">
                  <div className="track-icon"><FaBullhorn /></div>
                  <h4>{isAr ? 'حملات ولقاءات إنسانية' : 'Advocacy & Community Dialogues'}</h4>
                  <p>{isAr ? 'جلسات حوارية وندوات توعوية حول التنمية المستدامة والتعليم المجتمعي.' : 'Interactive dialogues, awareness forums, and sustainable impact presentations.'}</p>
                </div>
              </div>

              {/* Newsletter & Notification Box */}
              <div className="upcoming-notify-box">
                <div className="notify-text">
                  <strong>{isAr ? 'كن أول من يعلم عند فتح باب التسجيل لأي فعالية جديدة!' : 'Be the first to know when registrations open!'}</strong>
                  <span>{isAr ? 'اشترك في نشرتنا البريدية لتصلك مواعيد الفعاليات والأماكن مباشرة إلى بريدك الإلكتروني.' : 'Subscribe to our newsletter to receive event schedules and updates straight to your inbox.'}</span>
                </div>
                <div className="notify-actions">
                  <Link to="/newsletter" className="button don notify-btn">
                    {isAr ? 'اشترك في النشرة الإخبارية' : 'SUBSCRIBE NOW'}
                  </Link>
                  <Link to="/contact" className="button outline notify-btn-outline">
                    {isAr ? 'تواصل معنا واقترح فعالية' : 'PROPOSE AN EVENT'}
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. Host a Community Event / Partner CTA */}
      <section className="events-cta-banner">
        <div className="auto__container">
          <div className="cta-inner-box">
            <div className="cta-text-content">
              <span className="cta-tag">{isAr ? 'شراكات ومبادرات' : 'COMMUNITY PARTNERSHIPS'}</span>
              <h2 className="cta-title">
                {isAr 
                  ? 'هل ترغب في تنظيم ورشة عمل أو رعاية فعالية مجتمعية؟'
                  : 'Want to organize a workshop or co-host an event with REVIVE?'}
              </h2>
              <p className="cta-desc">
                {isAr
                  ? 'نرحب بجميع المبادرات الشبابية، المؤسسات التعليمية، والشركاء الراغبين في تقديم تدريبات مجانية، مخيمات برمجية، أو مبادرات إغاثية داخل مراكزنا.'
                  : 'We welcome collaborative proposals from universities, grassroots organizers, tech experts, and community leaders to empower youth and families.'}
              </p>
            </div>
            
            <div className="cta-action-buttons">
              <Link to="/contact" className="button primary cta-btn">
                {isAr ? 'قدم اقتراح فعالية' : 'Submit Event Proposal'} {isRTL ? <FaArrowLeft /> : <FaArrowRight />}
              </Link>
              <Link to="/feedback" className="button outline cta-btn-outline">
                {isAr ? 'شاركنا اقتراحاتك' : 'Share Feedback'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive RSVP Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <div className="modal-backdrop" onClick={closeRsvpModal}>
            <motion.div 
              className="rsvp-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Modal Header */}
              <div className="modal-header">
                <div>
                  <span className="modal-eyebrow">{isAr ? 'تأكيد الحضور والتسجيل المجاني' : 'FREE EVENT REGISTRATION / RSVP'}</span>
                  <h3 className="modal-title">{isAr ? selectedEvent.titleAr : selectedEvent.titleEn}</h3>
                  <p className="modal-subtitle">
                    <FaCalendarAlt /> {isAr ? selectedEvent.fullDateAr : selectedEvent.fullDateEn} • <FaClock /> {isAr ? selectedEvent.timeAr : selectedEvent.timeEn}
                  </p>
                </div>
                <button className="modal-close-btn" onClick={closeRsvpModal} aria-label="Close">
                  <FaTimes />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleRsvpSubmit} className="rsvp-form">
                <div className="form-grid">
                  
                  <div className="form-group">
                    <label>{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
                    <input 
                      type="text" 
                      required
                      placeholder={isAr ? 'مثال: أحمد العلي' : 'e.g. Sarah Jenkins'}
                      value={rsvpData.fullName}
                      onChange={(e) => setRsvpData({ ...rsvpData, fullName: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@example.com"
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>{isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+963 ... / +44 ..."
                      value={rsvpData.phone}
                      onChange={(e) => setRsvpData({ ...rsvpData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>{isAr ? 'عدد الحضور' : 'Number of Attendees'}</label>
                    <select 
                      value={rsvpData.attendees}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendees: e.target.value })}
                    >
                      <option value="1">1 {isAr ? 'شخص (أنا فقط)' : 'Person (Solo)'}</option>
                      <option value="2">2 {isAr ? 'شخصان' : 'Persons'}</option>
                      <option value="3">3 {isAr ? '٣ أشخاص' : 'Persons'}</option>
                      <option value="4">4 {isAr ? '٤ أشخاص' : 'Persons'}</option>
                      <option value="5">5 {isAr ? '٥ أشخاص أو عائلة' : 'Persons (Group / Family)'}</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>{isAr ? 'نوع الحضور المفضل' : 'Preferred Attendance Format'}</label>
                    <div className="radio-group-row">
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          name="attendanceType" 
                          value="in-person"
                          checked={rsvpData.attendanceType === 'in-person'}
                          onChange={() => setRsvpData({ ...rsvpData, attendanceType: 'in-person' })}
                        />
                        <span>{isAr ? 'حضور شخصي في المركز (دمشق/مخيم اليرموك)' : 'In-Person (On-Site Venue)'}</span>
                      </label>
                      <label className="radio-label">
                        <input 
                          type="radio" 
                          name="attendanceType" 
                          value="virtual"
                          checked={rsvpData.attendanceType === 'virtual'}
                          onChange={() => setRsvpData({ ...rsvpData, attendanceType: 'virtual' })}
                        />
                        <span>{isAr ? 'حضور افتراضي (بث مباشر وتفاعل أونلاين)' : 'Virtual (Live Stream / Zoom)'}</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>{isAr ? 'ملاحظات خاصة أو احتياجات إمكانية الوصول (اختياري)' : 'Special Requests or Accessibility Notes (Optional)'}</label>
                    <textarea 
                      rows="2"
                      placeholder={isAr ? 'أي متطلبات خاصة أو استفسارات...' : 'Any special accessibility needs or dietary requirements...'}
                      value={rsvpData.notes}
                      onChange={(e) => setRsvpData({ ...rsvpData, notes: e.target.value })}
                    />
                  </div>

                </div>

                <div className="modal-footer">
                  <button type="button" className="button outline" onClick={closeRsvpModal}>
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button type="submit" className="button primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      isAr ? 'جاري التأكيد...' : 'Confirming...'
                    ) : (
                      <>
                        <FaCheckCircle /> {isAr ? 'تأكيد التسجيل المجاني' : 'Confirm Registration'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
