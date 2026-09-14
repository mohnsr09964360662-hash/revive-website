import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext';
import { FaHeart, FaShoppingBasket } from 'react-icons/fa';
import './InstantDonateForm.css';

const InstantDonateForm = () => {
  const { addToCart } = useCart();
  const { isRTL } = useLanguage();

  const [frequency, setFrequency] = useState('single');
  const [cause, setCause] = useState('general');
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');

  const causesList = [
    { id: 'general', nameEn: 'General Donation', nameAr: 'التبرع العام للمؤسسة' },
    { id: 'education', nameEn: 'Education & Schools', nameAr: 'دعم التعليم والمدارس' },
    { id: 'women', nameEn: 'Women Empowerment', nameAr: 'دعم وتمكين المرأة' },
    { id: 'water', nameEn: 'Clean Water Project', nameAr: 'مشروع المياه الصالحة للشرب' },
    { id: 'health', nameEn: 'Healthcare & Medical', nameAr: 'الدعم الصحي والطبي' }
  ];

  const handleDonate = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (!finalAmount || finalAmount <= 0) return;

    const selectedCauseObj = causesList.find((c) => c.id === cause);
    const title = `${isRTL ? selectedCauseObj.nameAr : selectedCauseObj.nameEn} (${frequency === 'monthly' ? (isRTL ? 'شهري' : 'Monthly') : (isRTL ? 'مرة واحدة' : 'Single')})`;

    addToCart({
      id: `${cause}-${frequency}-${finalAmount}`,
      title,
      price: finalAmount,
      quantity: 1
    });
  };

  return (
    <div className={`instantDonateCard ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="instantHeader">
        <FaHeart className="instantHeartIcon" />
        <h4>{isRTL ? 'تبرّع الآن فوراً' : 'QUICK DONATION'}</h4>
      </div>

      <form onSubmit={handleDonate} className="instantForm">
        {/* Frequency */}
        <div className="frequencyBtns">
          <button
            type="button"
            className={`freqBtn ${frequency === 'single' ? 'active' : ''}`}
            onClick={() => setFrequency('single')}
          >
            {isRTL ? 'مرة واحدة' : 'SINGLE'}
          </button>
          <button
            type="button"
            className={`freqBtn ${frequency === 'monthly' ? 'active' : ''}`}
            onClick={() => setFrequency('monthly')}
          >
            {isRTL ? 'شهرياً' : 'MONTHLY'}
          </button>
        </div>

        {/* Cause Selector */}
        <div className="formGroup">
          <label>{isRTL ? 'اختر المشروع أو القضية:' : 'Select Cause / Appeal:'}</label>
          <select value={cause} onChange={(e) => setCause(e.target.value)} className="causeSelect">
            {causesList.map((c) => (
              <option key={c.id} value={c.id}>
                {isRTL ? c.nameAr : c.nameEn}
              </option>
            ))}
          </select>
        </div>

        {/* Amounts */}
        <div className="amountGrid">
          {[20, 50, 100, 250].map((val) => (
            <button
              key={val}
              type="button"
              className={`amtBtn ${amount === val && !customAmount ? 'active' : ''}`}
              onClick={() => {
                setAmount(val);
                setCustomAmount('');
              }}
            >
              ${val}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="customAmtInput">
          <span className="currencySymbol">$</span>
          <input
            type="number"
            placeholder={isRTL ? 'مبلغ آخر' : 'Custom Amount'}
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
            }}
          />
        </div>

        {/* Submit */}
        <button type="submit" className="button don addBasketSubmitBtn">
          <FaShoppingBasket />
          {isRTL ? 'إضافة إلى السلة' : 'ADD TO BASKET'}
        </button>
      </form>
    </div>
  );
};

export default InstantDonateForm;
