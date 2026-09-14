import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGlobe, 
  FaBars, 
  FaTimes, 
  FaShoppingBasket, 
  FaHeart, 
  FaPhoneAlt, 
  FaEnvelope,
  FaChevronDown 
} from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languageConfig = {
    ar: { name: 'العربية', flag: '🇸🇾' },
    en: { name: 'English', flag: '🇬🇧' },
    tr: { name: 'Türkçe', flag: '🇹🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    es: { name: 'Español', flag: '🇪🇸' }
  };

  const navItems = [
    { 
      label: isRTL ? 'الرئيسية' : 'Home', 
      to: '/' 
    },
    {
      label: isRTL ? 'من نحن' : 'About Us',
      children: [
        { label: isRTL ? 'رؤيتنا ورسالتنا' : 'Vision & Mission', to: '/about' },
        { label: isRTL ? 'الأسئلة الشائعة' : 'FAQ', to: '/faq' },
      ],
    },
    {
      label: isRTL ? 'برامجنا ومشاريعنا' : 'Programs & Projects',
      children: [
        { label: isRTL ? 'البرامج الحالية' : 'Current Programs', to: '/programs' },
        { label: isRTL ? 'دورات التكنولوجيا' : 'Tech Courses', to: '/ai-courses' },
      ],
    },
    {
      label: isRTL ? 'منتجاتنا' : 'Products',
      children: [
        { label: isRTL ? 'الخدمات التقنية' : 'Tech Services', to: '/coming-soon' },
        { label: isRTL ? 'منتجات يدوية' : 'Handmade Crafts', to: '/coming-soon' },
      ],
    },
    {
      label: isRTL ? 'تفاعل معنا' : 'Engage',
      children: [
        { label: isRTL ? 'الأحداث والفعاليات' : 'Events', to: '/events' },
        { label: isRTL ? 'تواصل معنا' : 'Contact Us', to: '/contact' },
        { label: isRTL ? 'ملاحظات واقتراحات' : 'Feedback', to: '/feedback' },
      ],
    },
  ];

  const isDropdownActive = (children) => {
    if (!children) return false;
    return children.some((child) => {
      const path = child.to.split('#')[0];
      return path && path !== '/' && location.pathname === path;
    });
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const isHome = location.pathname === '/';
  const isHeaderSolid = isScrolled || !isHome;

  return (
    <header className={`headerWrapper ${isHeaderSolid ? 'scrolled' : ''} ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Top Helpline Bar */}
      <div className="topHelplineBar">
        <div className="auto__container topBarInner">
          <div className="helplineItem">
            <FaPhoneAlt className="helplineIcon" />
            <span>{isRTL ? 'خط الطوارئ المباشر:' : 'Emergency Helpline:'} <b>+44 (0) 161 860 0163</b></span>
          </div>
          <div className="helplineItem">
            <FaEnvelope className="helplineIcon" />
            <span>RevivefoundationSyria@gmail.com</span>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo-link">
            <img src={logo} alt="Revive Logo" className="navbar-logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-links">
            {navItems.map((item, index) => {
              if (!item.children) {
                return (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                );
              }

              const isActiveDropdown = isDropdownActive(item.children);

              return (
                <div key={index} className={`nav-dropdown ${isActiveDropdown ? 'active' : ''}`}>
                  <button 
                    type="button" 
                    className={`nav-dropdown-toggle ${isActiveDropdown ? 'active' : ''}`}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <FaChevronDown className="dropdown-chevron" />
                  </button>

                  <div className="dropdown-menu">
                    {item.children.map((child, cIdx) => (
                      <NavLink
                        key={cIdx}
                        to={child.to}
                        className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side Actions */}
          <div className="navbar-actions">
            {/* Language Dropdown */}
            <div className="nav-dropdown lang-dropdown">
              <button 
                type="button" 
                className="nav-dropdown-toggle navbar-lang-toggle"
                aria-haspopup="true"
              >
                <FaGlobe />
                <span>{languageConfig[language]?.flag} {language.toUpperCase()}</span>
                <FaChevronDown className="dropdown-chevron" />
              </button>
              <div className="dropdown-menu">
                {Object.entries(languageConfig).map(([code, { name, flag }]) => (
                  <button 
                    key={code} 
                    className={`dropdown-item lang-item ${language === code ? 'active' : ''}`}
                    onClick={() => setLanguage(code)}
                  >
                    {flag} {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart / Basket Button */}
            <button className="basketBtn" onClick={() => setIsCartOpen(true)} title="View Basket">
              <FaShoppingBasket />
              {cartCount > 0 && <span className="basketBadge">{cartCount}</span>}
            </button>
            
            <Link to="/donation" className="navbar-zakat">
              ZAKAT
            </Link>

            <Link to="/donation" className="navbar-donate">
              {t('nav.donate') || 'DONATE'} <FaHeart className="donateHeartIcon" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle" 
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                if (isMobileMenuOpen) setOpenMobileDropdown(null);
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: isRTL ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item, index) => {
                if (!item.children) {
                  return (
                    <NavLink
                      key={index}
                      to={item.to}
                      className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={handleMobileNavClick}
                    >
                      {item.label}
                    </NavLink>
                  );
                }

                const isOpen = openMobileDropdown === index;
                const isActiveDropdown = isDropdownActive(item.children);

                return (
                  <div key={index} className={`mobile-accordion ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className={`mobile-accordion-toggle ${isOpen ? 'expanded' : ''} ${isActiveDropdown ? 'active' : ''}`}
                      onClick={() => setOpenMobileDropdown(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown className={`mobile-chevron ${isOpen ? 'rotated' : ''}`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="mobile-accordion-dropdown"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="mobile-accordion-items">
                            {item.children.map((child, cIdx) => (
                              <NavLink
                                key={cIdx}
                                to={child.to}
                                className={({ isActive }) => `mobile-dropdown-item ${isActive ? 'active' : ''}`}
                                onClick={handleMobileNavClick}
                              >
                                {child.label}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link 
                to="/donation" 
                className="mobile-donate"
                onClick={handleMobileNavClick}
              >
                {t('nav.donate') || 'DONATE'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
