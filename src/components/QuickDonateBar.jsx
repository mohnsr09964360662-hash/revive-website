import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { FaHeart, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './QuickDonateBar.css';

const QuickDonateBar = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleBar = () => setIsOpen(!isOpen);

  const amounts = [10, 25, 50];

  const handleDonate = () => {
    navigate('/donation');
  };

  const titleText = language === 'ar' ? 'تبرع سريع' : 'Quick Donate';
  const btnText = language === 'ar' ? 'تبرع الآن' : 'DONATE NOW';

  return (
    <div className={`quick-donate-bar ${isOpen ? 'open' : ''}`}>
      <div className="qdb-header" onClick={toggleBar}>
        <div className="qdb-title">
          <FaHeart className="qdb-heart" />
          <span>{titleText}</span>
        </div>
        <div className="qdb-toggle">
          {isOpen ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>
      <div className="qdb-body">
        <div className="qdb-amounts">
          {amounts.map((amount) => (
            <button key={amount} className="qdb-amount-btn" onClick={handleDonate}>
              ${amount}
            </button>
          ))}
        </div>
        <button className="qdb-donate-btn" onClick={handleDonate}>
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default QuickDonateBar;
