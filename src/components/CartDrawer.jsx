import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaTrash, 
  FaShoppingBasket, 
  FaArrowRight, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaTag, 
  FaCommentAlt 
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/email';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { isRTL } = useLanguage();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const ArrowIcon = isRTL ? FaArrowLeft : FaArrowRight;
  const BackIcon = isRTL ? FaArrowRight : FaArrowLeft;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProcessSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error(isRTL ? 'يرجى تعبئة كافة الحقول الإلزامية' : 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const itemsList = cartItems
        .map((item, idx) => `${idx + 1}. ${item.title} - الكمية: ${item.quantity} - السعر: $${item.price * item.quantity}`)
        .join('\n');

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject || (isRTL ? 'إتمام طلب سلة / تبرع جديد' : 'New Order / Donation Submission'),
        message: `تفاصيل العملية:\n${itemsList}\n\nالإجمالي الكلي: $${cartTotal}\n\nبيانات العميل:\nالاسم: ${formData.name}\nالهاتف: ${formData.phone}\nالبريد: ${formData.email}\nالموضوع: ${formData.subject}\nملاحظات وتفاصيل إضافية: ${formData.notes || 'لا يوجد'}`,
        to_email: 'RevivefoundationSyria@gmail.com'
      };

      if (!EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
        await new Promise((resolve) => setTimeout(resolve, 900));
      } else {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );
      }

      // Success
      clearCart();
      setIsCheckingOut(false);
      setIsCartOpen(false);
      setFormData({ name: '', phone: '', email: '', subject: '', notes: '' });
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(isRTL ? 'حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.' : 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              className="cartBackdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckingOut(false);
              }}
            />
            <motion.div
              className={`cartDrawer ${isRTL ? 'rtl' : 'ltr'}`}
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="cartHeader">
                <h3>
                  <FaShoppingBasket className="cartHeaderIcon" />
                  {isCheckingOut 
                    ? (isRTL ? 'إتمام العملية والبيانات' : 'COMPLETE PROCESS') 
                    : (isRTL ? 'سلة العمليات والتبرعات' : 'YOUR BASKET')}
                </h3>
                <button 
                  className="cartCloseBtn" 
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckingOut(false);
                  }}
                >
                  <FaTimes />
                </button>
              </div>

              {!isCheckingOut ? (
                /* Step 1: Cart Items */
                <>
                  <div className="cartBody">
                    {cartItems.length === 0 ? (
                      <div className="emptyCart">
                        <FaShoppingBasket className="emptyCartIcon" />
                        <p>{isRTL ? 'السلة فارغة حالياً' : 'Your basket is currently empty.'}</p>
                        <Link
                          to="/donation"
                          className="button primary"
                          onClick={() => setIsCartOpen(false)}
                        >
                          {isRTL ? 'تصفح المشاريع للتبرع' : 'EXPLORE APPEALS'}
                        </Link>
                      </div>
                    ) : (
                      <div className="cartItemsList">
                        {cartItems.map((item) => (
                          <div key={item.id} className="cartItemRow">
                            <div className="cartItemInfo">
                              <div className="cartItemTitle">{item.title}</div>
                              <div className="cartItemMeta">
                                ${item.price} × {item.quantity}
                              </div>
                            </div>
                            <div className="cartItemRight">
                              <span className="cartItemTotal">${item.price * item.quantity}</span>
                              <button
                                className="removeItemBtn"
                                onClick={() => removeFromCart(item.id)}
                                title={isRTL ? 'إزالة' : 'Remove'}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="cartFooter">
                      <div className="cartTotalRow">
                        <span>{isRTL ? 'المجموع الكلي:' : 'TOTAL:'}</span>
                        <span className="cartTotalAmount">${cartTotal}</span>
                      </div>
                      <button
                        type="button"
                        className="button don checkoutBtn"
                        onClick={() => setIsCheckingOut(true)}
                      >
                        {isRTL ? 'إتمام العملية' : 'COMPLETE PROCESS'} <ArrowIcon />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Step 2: Checkout Form */
                <form onSubmit={handleProcessSubmit} className="checkoutFormWrapper">
                  <div className="cartBody checkoutFormBody">
                    <button 
                      type="button" 
                      className="backToCartBtn"
                      onClick={() => setIsCheckingOut(false)}
                    >
                      <BackIcon /> {isRTL ? 'العودة لمحتويات السلة' : 'Back to Cart'}
                    </button>

                    <div className="checkoutSummaryMini">
                      <span>{isRTL ? 'إجمالي العملية:' : 'Order Total:'}</span>
                      <strong>${cartTotal}</strong>
                      <span className="itemsCount">({cartItems.length} {isRTL ? 'عناصر' : 'items'})</span>
                    </div>

                    <div className="checkoutFormFields">
                      <div className="formGroup">
                        <label>
                          <FaUser /> {isRTL ? 'الاسم الكامل *' : 'Full Name *'}
                        </label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          placeholder={isRTL ? 'أدخل اسمك الكريم' : 'Enter your full name'} 
                          required 
                        />
                      </div>

                      <div className="formGroup">
                        <label>
                          <FaPhone /> {isRTL ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                        </label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder={isRTL ? '+963 ... أو رقمك المباشر' : '+1234567890'} 
                          required 
                        />
                      </div>

                      <div className="formGroup">
                        <label>
                          <FaEnvelope /> {isRTL ? 'البريد الإلكتروني *' : 'Email Address *'}
                        </label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder={isRTL ? 'example@mail.com' : 'example@mail.com'} 
                          required 
                        />
                      </div>

                      <div className="formGroup">
                        <label>
                          <FaTag /> {isRTL ? 'الموضوع أو نوع الطلب' : 'Subject / Order Type'}
                        </label>
                        <input 
                          type="text" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleInputChange} 
                          placeholder={isRTL ? 'مثال: استفسار عن الخدمة / تبرع مالي / دورة' : 'e.g. Donation, Course Inquiry, Tech Service'} 
                        />
                      </div>

                      <div className="formGroup">
                        <label>
                          <FaCommentAlt /> {isRTL ? 'ملاحظات وتفاصيل إضافية' : 'Additional Notes / Message'}
                        </label>
                        <textarea 
                          name="notes" 
                          rows="3" 
                          value={formData.notes} 
                          onChange={handleInputChange} 
                          placeholder={isRTL ? 'اكتب أي تفاصيل أو متطلبات خاصة ترغب بها...' : 'Write any specific requirements or notes...'}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="cartFooter">
                    <button
                      type="submit"
                      className="button primary checkoutBtn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? (isRTL ? 'جاري إرسال الطلب...' : 'SENDING ORDER...') 
                        : (isRTL ? 'تأكيد وإرسال الطلب' : 'CONFIRM & SUBMIT')}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Confirmation Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="successModalOverlay" onClick={() => setShowSuccessModal(false)}>
            <motion.div 
              className={`successModalBox ${isRTL ? 'rtl' : 'ltr'}`}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="successModalIconWrapper">
                <FaCheckCircle className="successModalIcon" />
              </div>
              <h3>{isRTL ? 'تم استلام طلبكم بنجاح!' : 'Order Received Successfully!'}</h3>
              <p>
                {isRTL 
                  ? 'شكراً لتواصلكم مع مؤسسة إحياء REVIVE. تم إرسال تفاصيل طلبكم إلى فريقنا المختص بنجاح، وسيتم مراجعته والرد عليكم والتواصل معكم في أقرب وقت ممكن.' 
                  : 'Thank you for reaching out to REVIVE Foundation. Your order details have been successfully received by our team, and we will contact you shortly.'}
              </p>
              <div className="successContactNote">
                <span>{isRTL ? 'لأي استفسار عاجل يمكنك مراسلتنا مباشرة على:' : 'For urgent inquiries, email us at:'}</span>
                <strong>RevivefoundationSyria@gmail.com</strong>
              </div>
              <button 
                type="button" 
                className="button primary fullBtn" 
                onClick={() => setShowSuccessModal(false)}
              >
                {isRTL ? 'حسناً، تم' : 'CLOSE'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
