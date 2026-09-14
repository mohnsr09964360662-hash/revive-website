import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaComments, 
  FaRedo, 
  FaMinus, 
  FaHandsHelping,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhoneAlt
} from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';
import './AIChatBot.css';

const GEMINI_API_KEY = 'AIzaSyDhMMCuIcLgJqOH3S8sLge9LFH8sb-aR70';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTION = `أنت "مساعد إحياء الذكي" (REVIVE AI Assistant)، المساعد الرقمي الرسمي لمؤسسة إحياء للخدمات الاجتماعية والتنموية (REVIVE Foundation).

فلسفة المؤسسة وشعارها: "نُمكّن... نبني... نُحيي" (Empower. Build. Revive.)

معلومات عن المؤسسة:
- مؤسسة تنموية وإنسانية غير ربحية مستقلة تهدف لتمكين المجتمع، الشباب، الفتيات، والأسر المحتاجة.
- مكان ونطاق العمل الميداني: سوريا ومخيم اليرموك والمناطق والمجتمعات الأكثر حاجة للدعم التنموي والإغاثي.
- برامج ومسارات العمل الرئيسية:
  1. التعليم ورعاية المدارس: ترميم الصفوف المدرسية، دعم الطلاب، توفير الحقائب والمستلزمات التعليمية.
  2. التمكين التقني والمعسكرات البرمجية: تقديم 12 مسار تدريبي متقدم للشباب (تطوير المواقع Full-Stack، تطبيقات الموبايل Flutter، تصميم UI/UX بـ Figma، التصميم الجرافيكي، الذكاء الاصطناعي التوليدي، برمجة بايثون، تحليل البيانات Power BI & SQL، الأمن السيبراني، إدارة الشبكات والسيرفرات، صيانة الأجهزة والحواسيب، التسويق الرقمي، واحتراف العمل الحر الدولي Freelancing).
  3. تمكين المرأة والريادة: ورش تدريب مهني، مشغولات الصوف والريزن اليدوية، معارض الحرف، ودعم المشاريع الصغيرة للأمهات.
  4. المبادرات المجتمعية والتطوعية: حملات النظافة والتشجير، تجميل المساحات العامة، الجولات التفاعلية، وبرامج المساعدات المباشرة.
  5. خدمات تقنية ومنتجات يدوية: تقديم خدمات تطوير وتصميم وبيع تحف وحرف يدوية يعود ريعها كاملاً لدعم برامج المؤسسة الخيرية.
- إحصائيات التطوع:
  - أكثر من 20 متطوعاً نشطاً في الميدان.
  - 3 مشاريع ومبادرات تطوعية نشطة حالياً.
  - 8 مجالات تطوعية رئيسية متنوعة.

بيانات التواصل الرسمية:
- البريد الإلكتروني: RevivefoundationSyria@gmail.com
- خط الطوارئ والمكالمات المباشر: +44 (0) 161 860 0163
- صفحة الفيسبوك الرسمية: https://www.facebook.com/share/1F8ixtdMZx/
- إنستغرام الرسمي: https://www.instagram.com/reviverelief?igsi=MWVtY3NqMmo3aGNwYw==
- قناة واتساب الرسمية: https://whatsapp.com/channel/0029Vb8ItIE8qIzn6G7s8r2L

تعليمات الأسلوب والإجابة:
- أجب دائماً بأدب ولطف ودفء واعتزاز بمهمة إحياء الإنسانية.
- تحدث باللغة العربية الفصحى البسيطة والواضحة، أو باللغة التي يخاطبك بها الزائر (الإنجليزية، التركية، الألمانية، الإسبانية).
- كن مختصراً ومباشراً وقسّم الإجابة إلى نقاط أو أسطر منظمة لتسهيل القراءة.
- شجع الزوار دائماً على التطوع عبر نموذج التطوع في الرئيسية، أو التبرع للمشاريع عبر صفحة التبرعات، أو التسجيل في الدورات التقنية.`;

const AIChatBot = () => {
  const { isRTL, language } = useLanguage();
  const isAr = language === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: isAr
        ? 'أهلاً بك في مؤسسة إحياء REVIVE! 🌿\nأنا مساعدك الذكي، يسعدني الإجابة عن كافة استفساراتك حول مشاريعنا، الدورات التقنية، أو كيفية التطوع والتبرع. كيف يمكنني مساعدتك؟'
        : 'Welcome to REVIVE Foundation! 🌿\nI am your smart assistant. How can I help you learn about our programs, tech courses, volunteering, or donations today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickSuggestions = [
    { label: isAr ? 'ما هي أهداف المؤسسة ومكانها؟' : 'What is REVIVE and where does it operate?', query: isAr ? 'أخبرني عن أهداف مؤسسة إحياء ومكان عملها' : 'Tell me about REVIVE Foundation goals and location' },
    { label: isAr ? 'ما هي الدورات التقنية المتاحة؟' : 'What tech courses do you offer?', query: isAr ? 'ما هي الدورات التدريبية والتقنية المتاحة لديكم؟' : 'What technical and vocational courses are available?' },
    { label: isAr ? 'كيف يمكنني التطوع معكم؟' : 'How can I volunteer?', query: isAr ? 'كيف يمكنني الانضمام والتطوع في مؤسسة إحياء؟' : 'How can I volunteer with REVIVE?' },
    { label: isAr ? 'بيانات التواصل وحسابات المؤسسة' : 'Contact details & official channels', query: isAr ? 'ما هي وسائل التواصل والروابط الرسمية للمؤسسة؟' : 'What are the official contact channels and social links?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage = { role: 'user', text: query };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Build conversation history payload for Gemini
      const contents = newMessages.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }]
          },
          contents: contents
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || (isAr ? 'عذراً، لم أستطع فهم طلبك تماماً. يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني.' : 'Sorry, I could not generate an answer. Please contact us directly.');

      setMessages(prev => [...prev, { role: 'model', text: botReply }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'model', 
          text: isAr 
            ? 'عذراً، حدث خطأ مؤقت في الاتصال بالمساعد الذكي. يمكنك مراسلتنا مباشرة عبر البريد الإلكتروني: RevivefoundationSyria@gmail.com أو خط الطوارئ: +44 161 860 0163' 
            : 'Sorry, a temporary network error occurred. Please feel free to email us directly at RevivefoundationSyria@gmail.com'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: 'model',
        text: isAr
          ? 'تم بدء محادثة جديدة! 🌿\nأنا جاهز للإجابة عن كل ما ترغب بمعرفته حول مؤسسة إحياء ومبادراتها.'
          : 'New conversation started! 🌿\nAsk me anything about REVIVE Foundation and our initiatives.'
      }
    ]);
  };

  return (
    <div className={`aiChatWidgetContainer ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Floating Toggle Button */}
      <motion.button 
        type="button"
        className="aiChatFloatBtn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        title={isAr ? 'مساعد إحياء الذكي' : 'REVIVE Smart AI Assistant'}
      >
        <span className="pulseRing"></span>
        {isOpen ? <FaTimes className="btnIcon" /> : <FaRobot className="btnIcon" />}
        <span className="aiBtnBadge">AI</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="aiChatBox"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="aiChatHeader">
              <div className="aiHeaderLeft">
                <div className="aiAvatarWrap">
                  <FaRobot />
                  <span className="onlineStatus"></span>
                </div>
                <div className="aiHeaderTitles">
                  <h4>{isAr ? 'مساعد إحياء الذكي' : 'REVIVE AI Assistant'}</h4>
                  <span>{isAr ? 'مدعوم بتقنية Google Gemini' : 'Powered by Google Gemini'}</span>
                </div>
              </div>
              <div className="aiHeaderActions">
                <button 
                  type="button" 
                  className="aiHeaderBtn" 
                  onClick={handleReset} 
                  title={isAr ? 'إعادة ضبط المحادثة' : 'Restart Chat'}
                >
                  <FaRedo />
                </button>
                <button 
                  type="button" 
                  className="aiHeaderBtn" 
                  onClick={() => setIsOpen(false)} 
                  title={isAr ? 'إغلاق' : 'Close'}
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="aiChatBody">
              {messages.map((msg, index) => (
                <div key={index} className={`aiMsgRow ${msg.role === 'user' ? 'userRow' : 'botRow'}`}>
                  {msg.role === 'model' && (
                    <div className="msgAvatar"><FaRobot /></div>
                  )}
                  <div className="msgBubble">
                    {msg.text.split('\n').map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="aiMsgRow botRow">
                  <div className="msgAvatar"><FaRobot /></div>
                  <div className="msgBubble typingBubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            {messages.length <= 2 && (
              <div className="aiSuggestionsScroll">
                {quickSuggestions.map((sug, idx) => (
                  <button 
                    key={idx} 
                    type="button" 
                    className="suggestionChip"
                    onClick={() => handleSendMessage(sug.query)}
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="aiChatInputBar">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isAr ? 'اكتب سؤالك أو استفسارك هنا...' : 'Type your question here...'}
                disabled={loading}
              />
              <button 
                type="submit" 
                className="aiSendBtn"
                disabled={!input.trim() || loading}
                title={isAr ? 'إرسال' : 'Send'}
              >
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AIChatBot;