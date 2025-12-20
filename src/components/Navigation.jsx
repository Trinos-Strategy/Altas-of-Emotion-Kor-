import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionNames } from '../data/emotions';

const Navigation = ({ activeSection, onSectionChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sections = ['introduction', 'triggers', 'continents', 'actions', 'links', 'explore', 'korean-emotions'];
  const isIntroduction = activeSection === 'introduction';

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on section change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection]);

  // Don't show nav on introduction page
  if (isIntroduction) {
    return null;
  }

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        role="navigation"
        aria-label="메인 네비게이션"
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            {/* Logo */}
            <motion.button
              onClick={() => onSectionChange('introduction')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="홈으로 이동"
            >
              <div style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#1a1a1a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: '700',
                  lineHeight: '1.2',
                  textAlign: 'center'
                }}>
                  감정<br />지도
                </span>
              </div>
              <div className="hidden sm:block">
                <span style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Atlas
                </span>
                <span style={{ color: '#888', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '4px' }}>
                  of Emotions
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {sections.slice(1).map((section, index) => {
                const isActive = activeSection === section || 
                  (section === 'explore' && activeSection === 'partially-charted');
                const sectionInfo = sectionNames[section];
                
                return (
                  <motion.button
                    key={section}
                    onClick={() => onSectionChange(section)}
                    style={{
                      position: 'relative',
                      padding: '12px 20px',
                      fontSize: '18px',
                      fontWeight: isActive ? '700' : '600',
                      color: isActive ? '#1a1a1a' : '#666',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      letterSpacing: '0.5px',
                      transition: 'all 0.2s ease'
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    aria-current={isActive ? 'page' : undefined}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#1a1a1a';
                        e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {sectionInfo?.ko || section}
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        style={{
                          position: 'absolute',
                          bottom: '4px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '24px',
                          height: '3px',
                          backgroundColor: '#1a1a1a',
                          borderRadius: '2px'
                        }}
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
            )}

            {/* Language & Mobile Menu */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {!isMobile && (
                <span style={{ color: '#888', fontSize: '16px', fontWeight: '500' }}>
                  한국어
                </span>
              )}

              {/* Mobile Menu Button (Hamburger) */}
              {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  padding: '8px',
                  marginRight: '-8px',
                  color: '#333',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                aria-expanded={mobileMenuOpen}
                aria-label="메뉴 열기"
              >
                <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div
              style={{
                borderTop: '1px solid rgba(0,0,0,0.08)',
                backgroundColor: 'rgba(255,255,255,0.98)',
                backdropFilter: 'blur(8px)'
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div style={{ padding: '16px' }}>
                {sections.slice(1).map((section, index) => {
                  const isActive = activeSection === section ||
                    (section === 'explore' && activeSection === 'partially-charted');
                  const sectionInfo = sectionNames[section];

                  return (
                    <motion.button
                      key={section}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1]
                      }}
                      onClick={() => {
                        onSectionChange(section);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        fontSize: '18px',
                        fontWeight: isActive ? '700' : '600',
                        backgroundColor: isActive ? '#1a1a1a' : 'transparent',
                        color: isActive ? '#fff' : '#333',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '4px',
                        transition: 'background-color 0.25s ease, color 0.25s ease'
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{sectionInfo?.ko || section}</span>
                        {isActive && (
                          <motion.svg
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 15 }}
                            style={{ width: '20px', height: '20px' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </motion.svg>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.2)',
              zIndex: 40
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
