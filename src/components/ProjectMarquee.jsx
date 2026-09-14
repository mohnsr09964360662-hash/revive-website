import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import './ProjectMarquee.css';

import program1 from '../assets/field-team.jpeg';
import program2 from '../assets/field-child.jpeg';
import program3 from '../assets/field-community.jpeg';
import program4 from '../assets/field-camp.jpeg';

const ProjectMarquee = () => {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';

  const projects = [
    { id: 1, img: program1, title: t('programs.youth.title'), desc: t('programs.youth.desc') },
    { id: 2, img: program2, title: t('programs.children.title'), desc: t('programs.children.desc') },
    { id: 3, img: program3, title: t('programs.women.title'), desc: t('programs.women.desc') },
    { id: 4, img: program4, title: t('programs.community.title'), desc: t('programs.community.desc') },
  ];

  const baseX = useMotionValue(0);
  
  // The user wants it to move to the RIGHT continuously.
  // In Framer Motion, a positive X translation means moving right.
  const baseVelocity = isRtl ? -1.5 : 1.5; 

  // We duplicate the array to allow for seamless infinite scrolling
  const duplicatedProjects = [...projects, ...projects, ...projects];

  useAnimationFrame((time, delta) => {
    let moveBy = baseVelocity * (delta / 16.666);
    
    // As it moves right, we need to wrap it. 
    // We assume each card + gap is roughly 350px. 
    // With 4 original cards, one full set is 1400px.
    // Wrap between -1400 and 0. 
    // Since we are moving right, the value increases. When it hits 0, wrap it back to -1400.
    // Or simpler, just use Framer Motion's `wrap` function.
    let currentX = baseX.get() + moveBy;
    
    // We want it to wrap seamlessly.
    // The width of the original set is 4 cards * 350px = 1400px (approx).
    // Let's use a percentage-based wrap if possible, but pixels are easier.
    // Wrap from -1400 to 0.
    const maxScroll = -1400; // Adjust this based on actual width in CSS
    
    if (baseVelocity > 0) { // Moving Right
      if (currentX >= 0) {
        currentX = maxScroll;
      }
    } else { // Moving Left (RTL)
      if (currentX <= maxScroll) {
        currentX = 0;
      }
    }
    
    baseX.set(currentX);
  });

  // Convert the motion value to a transform string
  const x = useTransform(baseX, (v) => `${v}px`);

  return (
    <div className="marquee-section">
      <div className="marquee-header">
        <h2 className="section-title text-gradient">{t('nav.programs') || 'Our Projects'}</h2>
        <div className="section-underline"></div>
      </div>
      
      <div className="marquee-container">
        <motion.div 
          className="marquee-track" 
          style={{ x }}
        >
          {duplicatedProjects.map((project, index) => (
            <div key={`${project.id}-${index}`} className="marquee-card solid-panel">
              <div className="marquee-img-wrapper">
                <img src={project.img} alt={project.title} className="marquee-img" />
              </div>
              <div className="marquee-content">
                <h3 className="marquee-title">{project.title}</h3>
                <p className="marquee-desc">{project.desc}</p>
                <Link to="/programs" className="marquee-link text-primary">
                  {isRtl ? 'اقرأ المزيد ←' : 'Read More →'}
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradients on edges for smooth fade out */}
        <div className="marquee-fade marquee-fade-left"></div>
        <div className="marquee-fade marquee-fade-right"></div>
      </div>
    </div>
  );
};

export default ProjectMarquee;
