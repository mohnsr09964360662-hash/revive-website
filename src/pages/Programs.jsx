import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FaLaptopCode, FaPalette, FaSchool, FaSeedling, FaGlobe, FaHandHoldingHeart, FaHeartbeat, FaBalanceScale } from 'react-icons/fa';
import './Programs.css';
import img1 from '../assets/field-team.jpeg';
import img2 from '../assets/field-child.jpeg';
import img3 from '../assets/field-outreach.jpeg';
import img4 from '../assets/field-street.jpeg';

const Programs = () => {
  const { t } = useLanguage();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="programs-page">
      <div className="page-header">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp}>{t('programs.title')}</motion.h1>
        </div>
      </div>

      <section className="program-section bg-light" id="youth">
        <div className="container section-container">
          <motion.div className="program-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <img src={img1} alt={t('programs.youth.title')} />
          </motion.div>
          <motion.div className="program-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="section-title">{t('programs.youth.title')}</h2>
            <p className="section-desc">{t('programs.youth.desc')}</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <h3>{t('programs.youth.techTrack')}</h3>
                <p>{t('programs.youth.techDesc')}</p>
              </div>
              <div className="feature-card">
                <h3>{t('programs.youth.adminTrack')}</h3>
                <p>{t('programs.youth.adminDesc')}</p>
              </div>
              <div className="feature-card">
                <h3>{t('programs.youth.acadTrack')}</h3>
                <p>{t('programs.youth.acadDesc')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="program-section" id="children">
        <div className="container section-container row-reverse">
          <motion.div className="program-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <img src={img2} alt={t('programs.children.title')} />
          </motion.div>
          <motion.div className="program-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="section-title">{t('programs.children.title')}</h2>
            <p className="section-desc">{t('programs.children.desc')}</p>
            
            <ul className="styled-list">
              <li>
                <div className="icon-box"><FaLaptopCode /></div>
                <div className="list-text">
                  <h4>{t('programs.children.digitalEd')}</h4>
                  <p>{t('programs.children.digitalDesc')}</p>
                </div>
              </li>
              <li>
                <div className="icon-box"><FaPalette /></div>
                <div className="list-text">
                  <h4>{t('programs.children.arts')}</h4>
                  <p>{t('programs.children.artsDesc')}</p>
                </div>
              </li>
              <li>
                <div className="icon-box"><FaSchool /></div>
                <div className="list-text">
                  <h4>{t('programs.children.school')}</h4>
                  <p>{t('programs.children.schoolDesc')}</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="program-section bg-light" id="women">
        <div className="container section-container">
          <motion.div className="program-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <img src={img3} alt={t('programs.women.title')} />
          </motion.div>
          <motion.div className="program-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="section-title">{t('programs.women.title')}</h2>
            <p className="section-desc">{t('programs.women.desc')}</p>
            
            <div className="cards-wrapper">
              <div className="info-card">
                <div className="card-icon"><FaSeedling /></div>
                <div>
                  <h4>{t('programs.women.entrepreneurship')}</h4>
                  <p>{t('programs.women.entDesc')}</p>
                </div>
              </div>
              <div className="info-card">
                <div className="card-icon"><FaGlobe /></div>
                <div>
                  <h4>{t('programs.women.digital')}</h4>
                  <p>{t('programs.women.digDesc')}</p>
                </div>
              </div>
              <div className="info-card">
                <div className="card-icon"><FaHandHoldingHeart /></div>
                <div>
                  <h4>{t('programs.women.development')}</h4>
                  <p>{t('programs.women.devDesc')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="program-section" id="community">
        <div className="container section-container row-reverse">
          <motion.div className="program-image" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>
            <img src={img4} alt={t('programs.community.title')} />
          </motion.div>
          <motion.div className="program-content" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="section-title">{t('programs.community.title')}</h2>
            <p className="section-desc">{t('programs.community.desc')}</p>
            
            <div className="accordion">
              <div className="accordion-item">
                <div className="accordion-header">
                  <h3><FaHeartbeat /> {t('programs.community.health')}</h3>
                </div>
                <div className="accordion-body">
                  <p>{t('programs.community.healthDesc')}</p>
                </div>
              </div>
              <div className="accordion-item">
                <div className="accordion-header">
                  <h3><FaBalanceScale /> {t('programs.community.civic')}</h3>
                </div>
                <div className="accordion-body">
                  <p>{t('programs.community.civicDesc')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
