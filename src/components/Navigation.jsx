import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionNames } from '../data/emotions';

const Navigation = ({ activeSection, onSectionChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sections = ['introduction', 'triggers', 'continents', 'actions', 'links'];
  const isIntroduction = activeSection === 'introduction';

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-md border-b border-gray-200/50'
            : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        role="navigation"
        aria-label="메인 네비게이션"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.button
              onClick={() => onSectionChange('introduction')}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="홈으로 이동"
            >
              <div className="relative w-11 h-11 bg-gray-900 rounded-full flex items-center justify-center overflow-hidden group-hover:bg-gray-800 transition-colors">
                <span className="text-white text-[9px] font-bold leading-tight text-center tracking-tight">
                  감정<br />지도
                </span>
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="text-gray-900 text-xs font-bold uppercase tracking-wider">
                  Atlas
                </span>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider ml-1">
                  of Emotions
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {sections.slice(1).map((section, index) => {
                const isActive = activeSection === section;
                return (
                  <motion.button
                    key={section}
                    onClick={() => onSectionChange(section)}
                    className={`relative px-4 py-2.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActive
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {sectionNames[section].ko}
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gray-900 rounded-full"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Language & Mobile Menu */}
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-gray-400 text-sm font-medium">
                한국어
              </span>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="메뉴 열기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-3 space-y-1">
                {sections.slice(1).map((section) => {
                  const isActive = activeSection === section;
                  return (
                    <button
                      key={section}
                      onClick={() => {
                        onSectionChange(section);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{sectionNames[section].ko}</span>
                        {isActive && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
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
