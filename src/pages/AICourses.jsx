import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/email';
import { 
  FaLaptopCode, 
  FaPaintBrush, 
  FaMobileAlt, 
  FaBrain, 
  FaChartBar, 
  FaShieldAlt, 
  FaNetworkWired, 
  FaWrench, 
  FaBriefcase, 
  FaBullhorn, 
  FaPython, 
  FaLayerGroup, 
  FaClock, 
  FaGraduationCap, 
  FaTimes, 
  FaCheckCircle 
} from 'react-icons/fa';
import './AICourses.css';

const TECH_COURSES = [
  {
    id: 'web-dev',
    category: 'web',
    icon: <FaLaptopCode />,
    titleAr: 'تطوير وبرمجة المواقع الإلكترونية الكاملة (Full-Stack)',
    titleEn: 'Full-Stack Web Development Bootcamp',
    descAr: 'تعلم بناء وتطوير مواقع الويب التفاعلية والمنصات الرقمية من الصفر باستخدام HTML5, CSS3, JavaScript, React.js, و Node.js.',
    descEn: 'Master responsive front-end and modern back-end web development with HTML, CSS, JavaScript, React, and Node.js.',
    levelAr: 'مبتدئ إلى متوسط',
    levelEn: 'Beginner to Intermediate',
    durationAr: '٨ أسابيع (٦٠ ساعة تدريبية)',
    durationEn: '8 Weeks (60 Hours)'
  },
  {
    id: 'ui-ux',
    category: 'design',
    icon: <FaLayerGroup />,
    titleAr: 'تصميم واجهات وتجربة المستخدم (UI/UX Design)',
    titleEn: 'UI/UX Design & Prototyping with Figma',
    descAr: 'إتقان بحوث تجربة المستخدم وهندسة الواجهات الاحترافية وبناء النماذج التفاعلية المتقدمة وتطبيقات الموبايل عبر برنامج Figma.',
    descEn: 'Learn user research, wireframing, interactive prototyping, and design systems using industry-standard Figma.',
    levelAr: 'جميع المستويات',
    levelEn: 'All Levels',
    durationAr: '٦ أسابيع (٤٥ ساعة تدريبية)',
    durationEn: '6 Weeks (45 Hours)'
  },
  {
    id: 'graphic-design',
    category: 'design',
    icon: <FaPaintBrush />,
    titleAr: 'التصميم الجرافيكي وصناعة الهوية البصرية',
    titleEn: 'Graphic Design & Brand Identity Mastery',
    descAr: 'احتراف حزمة أدوبي (Photoshop, Illustrator) لتصميم الشعارات الإبداعية، الإعلانات الرقمية، المطبوعات، والهويات البصرية الكاملة.',
    descEn: 'Master Adobe Photoshop & Illustrator to create logos, social media visuals, print graphics, and corporate brand identities.',
    levelAr: 'مبتدئ إلى متوسط',
    levelEn: 'Beginner to Intermediate',
    durationAr: '٦ أسابيع (٤٠ ساعة تدريبية)',
    durationEn: '6 Weeks (40 Hours)'
  },
  {
    id: 'mobile-apps',
    category: 'web',
    icon: <FaMobileAlt />,
    titleAr: 'تطوير تطبيقات الهواتف الذكية (Flutter & Dart)',
    titleEn: 'Cross-Platform Mobile App Development',
    descAr: 'بناء وبرمجة تطبيقات الهاتف الذكي لأجهزة Android و iOS باستخدام إطار عمل Flutter مع ربط قواعد البيانات وخدمات السحابة.',
    descEn: 'Build high-performance mobile apps for iOS and Android from a single codebase using Flutter and Firebase.',
    levelAr: 'متوسط',
    levelEn: 'Intermediate',
    durationAr: '٨ أسابيع (٥٥ ساعة تدريبية)',
    durationEn: '8 Weeks (55 Hours)'
  },
  {
    id: 'ai-tools',
    category: 'ai_data',
    icon: <FaBrain />,
    titleAr: 'الذكاء الاصطناعي التوليدي وأتمتة الأعمال',
    titleEn: 'Generative AI & Business Automation',
    descAr: 'توظيف تقنيات الذكاء الاصطناعي (ChatGPT, Midjourney, Claude, Prompt Engineering) لأتمتة المهام اليومية ورفع الإنتاجية المهنية.',
    descEn: 'Harness generative AI models and prompt engineering to automate workflows, content creation, and data processing.',
    levelAr: 'جميع المستويات',
    levelEn: 'All Levels',
    durationAr: '٤ أسابيع (٣٠ ساعة تدريبية)',
    durationEn: '4 Weeks (30 Hours)'
  },
  {
    id: 'python-prog',
    category: 'web',
    icon: <FaPython />,
    titleAr: 'البرمجة التأسيسية للمبتدئين بلغة Python',
    titleEn: 'Python Programming from Scratch',
    descAr: 'مدخل عملي وشامل لتعلم أساسيات البرمجة، التفكير المنطقي وحل المشكلات، وبناء أولى المشاريع والبرمجيات بلغة بايثون.',
    descEn: 'A hands-on foundation in computer programming, logic, algorithms, and practical scripting with Python.',
    levelAr: 'مبتدئ تماماً',
    levelEn: 'Absolute Beginner',
    durationAr: '٥ أسابيع (٣٥ ساعة تدريبية)',
    durationEn: '5 Weeks (35 Hours)'
  },
  {
    id: 'data-analytics',
    category: 'ai_data',
    icon: <FaChartBar />,
    titleAr: 'تحليل البيانات وإعداد التقارير الاحترافية (Power BI & SQL)',
    titleEn: 'Data Analytics with SQL & Power BI',
    descAr: 'تعلم استخراج البيانات ومعالجتها وتصميم لوحات تحكم تفاعلية (Dashboards) لمساعدة الشركات على اتخاذ قرارات مبنية على البيانات.',
    descEn: 'Query relational databases with SQL and build executive interactive dashboards using Microsoft Power BI.',
    levelAr: 'متوسط',
    levelEn: 'Intermediate',
    durationAr: '٦ أسابيع (٤٥ ساعة تدريبية)',
    durationEn: '6 Weeks (45 Hours)'
  },
  {
    id: 'cybersecurity',
    category: 'security_infra',
    icon: <FaShieldAlt />,
    titleAr: 'أساسيات الأمن السيبراني وحماية الشبكات',
    titleEn: 'Cybersecurity Fundamentals & Defense',
    descAr: 'فهم أمن المعلومات، رصد واكتشاف الثغرات الأمنية، حماية الأجهزة والشبكات من الهجمات والاختراقات، ومعايير الخصوصية الرقمية.',
    descEn: 'Understand network vulnerabilities, threat mitigation, digital forensics, and fundamental cyber hygiene.',
    levelAr: 'متوسط',
    levelEn: 'Intermediate',
    durationAr: '٧ أسابيع (٥٠ ساعة تدريبية)',
    durationEn: '7 Weeks (50 Hours)'
  },
  {
    id: 'network-admin',
    category: 'security_infra',
    icon: <FaNetworkWired />,
    titleAr: 'إدارة الشبكات والسيرفرات السحابية',
    titleEn: 'Computer Networking & Cloud Essentials',
    descAr: 'تكوين وإدارة الراوترات والسويتشات، بروتوكولات الشبكات (TCP/IP, DNS, VPN)، ومبادئ الحوسبة السحابية على أنظمة Linux.',
    descEn: 'Configure networking protocols, router administration, local subnets, and foundational Linux cloud servers.',
    levelAr: 'متوسط',
    levelEn: 'Intermediate',
    durationAr: '٦ أسابيع (٤٠ ساعة تدريبية)',
    durationEn: '6 Weeks (40 Hours)'
  },
  {
    id: 'hardware-repair',
    category: 'security_infra',
    icon: <FaWrench />,
    titleAr: 'صيانة الحواسيب والأجهزة الذكية',
    titleEn: 'Hardware & Smart Device Maintenance',
    descAr: 'ورشة تطبيقية عملية في فحص وصيانة اللوحات الإلكترونية، تبديل قطع الحواسيب، وتثبيت وتأمين أنظمة التشغيل.',
    descEn: 'Practical hands-on workshop covering computer hardware diagnostics, component replacements, and OS deployment.',
    levelAr: 'مبتدئ إلى متوسط',
    levelEn: 'Beginner to Intermediate',
    durationAr: '٥ أسابيع (٣٥ ساعة تدريبية)',
    durationEn: '5 Weeks (35 Hours)'
  },
  {
    id: 'digital-marketing',
    category: 'freelancing',
    icon: <FaBullhorn />,
    titleAr: 'التسويق الرقمي وإدارة الحملات الإعلانية',
    titleEn: 'Digital Marketing & Social Media Strategy',
    descAr: 'استراتيجيات تحسين محركات البحث (SEO)، إعلانات Meta و Google Ads، وإدارة الحملات التسويقية لزيادة المبيعات والوصول.',
    descEn: 'Plan and execute paid advertising on Google & Meta, conduct SEO optimization, and grow digital brand awareness.',
    levelAr: 'جميع المستويات',
    levelEn: 'All Levels',
    durationAr: '٥ أسابيع (٣٥ ساعة تدريبية)',
    durationEn: '5 Weeks (35 Hours)'
  },
  {
    id: 'freelance-skills',
    category: 'freelancing',
    icon: <FaBriefcase />,
    titleAr: 'احتراف العمل الحر وبناء الملف الشخصي (Freelancing)',
    titleEn: 'Digital Freelancing & Remote Work Mastery',
    descAr: 'كيفية إنشاء حسابات قوية على منصات Upwork و Fiverr ومستقل، تسعير الخدمات، كتابة العروض الناجحة، واستلام الأرباح بأمان.',
    descEn: 'Create winning profiles on Upwork & Fiverr, write persuasive proposals, price your skills, and secure remote international clients.',
    levelAr: 'جميع المستويات',
    levelEn: 'All Levels',
    durationAr: '٣ أسابيع (٢٠ ساعة تدريبية)',
    durationEn: '3 Weeks (20 Hours)'
  }
];

const AICourses = () => {
  const { isRTL, language } = useLanguage();
  const isAr = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'all', labelAr: 'جميع الدورات والمسارات', labelEn: 'All Courses' },
    { id: 'web', labelAr: 'البرمجة وتطوير الويب', labelEn: 'Web & Programming' },
    { id: 'design', labelAr: 'التصميم وتجربة المستخدم', labelEn: 'Design & UI/UX' },
    { id: 'ai_data', labelAr: 'الذكاء الاصطناعي والبيانات', labelEn: 'AI & Data Science' },
    { id: 'security_infra', labelAr: 'الشبكات وأمن المعلومات', labelEn: 'Networks & Security' },
    { id: 'freelancing', labelAr: 'العمل الحر والتسويق', labelEn: 'Freelancing & Marketing' }
  ];

  const filteredCourses = selectedCategory === 'all'
    ? TECH_COURSES
    : TECH_COURSES.filter(c => c.category === selectedCategory);

  const openRegisterModal = (course) => {
    setSelectedCourse(course);
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
    setSelectedCourse(null);
    setFormData({ name: '', phone: '', email: '', notes: '' });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error(isAr ? 'يرجى ملء جميع الحقول الإلزامية' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: `تسجيل جديد في دورة: ${selectedCourse ? selectedCourse.titleAr : 'دورة تقنية'}`,
        message: `طلب تسجيل في دورة تقنية:\nالدورة: ${selectedCourse ? selectedCourse.titleAr : ''} (${selectedCourse ? selectedCourse.titleEn : ''})\nالاسم: ${formData.name}\nرقم الهاتف: ${formData.phone}\nالبريد: ${formData.email}\nملاحظات: ${formData.notes || 'لا يوجد'}`,
        to_email: 'RevivefoundationSyria@gmail.com'
      };

      if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
        await new Promise(res => setTimeout(res, 800));
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
          ? 'تم استلام طلب تسجيلكم بنجاح! سيتواصل معكم فريق التدريب بالتفاصيل وموعد الدورة القادمة.' 
          : 'Registration received successfully! Our training team will contact you with details soon.'
      );
      closeRegisterModal();
    } catch (err) {
      console.error(err);
      toast.error(isAr ? 'حدث خطأ، يرجى المحاولة لاحقاً' : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className={`techCoursesPage ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Page Header with REVIVE brand styling */}
      <section className="coursesHeaderSection">
        <div className="auto__container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="coursesHeaderContent">
            <span className="coursesSubBadge">
              <FaGraduationCap /> {isAr ? 'مسارات التأهيل والتمكين التقني' : 'Technical Empowerment Tracks'}
            </span>
            <h1>{isAr ? 'الدورات والمعسكرات التقنية' : 'Technical & Vocational Courses'}</h1>
            <p>
              {isAr 
                ? 'برامج تدريبية وتطبيقية متقدمة تهدف إلى تأهيل الشباب والفتيات لسوق العمل الرقمي الحر والتوظيف المباشر في مجالات البرمجة، التصميم، والتقنيات الحديثة.' 
                : 'Advanced hands-on training programs preparing youth for the global digital economy in software engineering, design, and modern technologies.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="coursesCatalogSection">
        <div className="auto__container">
          
          {/* Category Filter Tabs */}
          <div className="courseFilterBar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filterTabBtn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <motion.div 
            className="coursesGridModern"
            initial="hidden" 
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
          >
            {filteredCourses.map((course) => (
              <motion.div 
                key={course.id} 
                className="courseCardModern" 
                variants={fadeInUp}
              >
                <div className="courseCardTop">
                  <div className="courseIconBox">
                    {course.icon}
                  </div>
                  <span className="courseLevelBadge">
                    {isAr ? course.levelAr : course.levelEn}
                  </span>
                </div>

                <div className="courseCardBody">
                  <h3>{isAr ? course.titleAr : course.titleEn}</h3>
                  <p>{isAr ? course.descAr : course.descEn}</p>
                </div>

                <div className="courseCardFooter">
                  <div className="courseDurationInfo">
                    <FaClock /> <span>{isAr ? course.durationAr : course.durationEn}</span>
                  </div>
                  <button 
                    type="button" 
                    className="courseRegisterBtn"
                    onClick={() => openRegisterModal(course)}
                  >
                    {isAr ? 'سجل في الدورة' : 'Enroll Now'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {isRegisterModalOpen && selectedCourse && (
          <div className="courseModalBackdrop" onClick={closeRegisterModal}>
            <motion.div 
              className={`courseModalBox ${isRTL ? 'rtl' : 'ltr'}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="courseModalHeader">
                <div>
                  <span className="modalSmallTag">{isAr ? 'طلب تسجيل مبدئي' : 'Course Registration'}</span>
                  <h3>{isAr ? selectedCourse.titleAr : selectedCourse.titleEn}</h3>
                </div>
                <button className="modalCloseBtn" onClick={closeRegisterModal}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="courseModalForm">
                <div className="modalFormGroup">
                  <label>{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isAr ? 'أدخل اسمك الكريم' : 'Your full name'} 
                  />
                </div>

                <div className="modalFormGroup">
                  <label>{isAr ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone} 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={isAr ? 'رقم الواتساب للتواصل' : '+123456789'} 
                  />
                </div>

                <div className="modalFormGroup">
                  <label>{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@mail.com" 
                  />
                </div>

                <div className="modalFormGroup">
                  <label>{isAr ? 'ملاحظات أو أسئلة إضافية (اختياري)' : 'Additional Notes (Optional)'}</label>
                  <textarea 
                    rows="3" 
                    value={formData.notes} 
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={isAr ? 'اكتب أي ملاحظة أو مستوى خبرتك الحالي...' : 'Write any questions or prior experience...'}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="button primary modalSubmitBtn"
                  disabled={isSubmitting}
                >
                  {isSubmitting 
                    ? (isAr ? 'جاري الإرسال...' : 'SUBMITTING...') 
                    : (isAr ? 'تأكيد التسجيل في الدورة' : 'CONFIRM REGISTRATION')}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AICourses;
