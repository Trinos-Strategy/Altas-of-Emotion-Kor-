import { motion } from 'framer-motion';
import { sectionNames } from '../data/emotions';

const Navigation = ({ activeSection, onSectionChange }) => {
  const sections = ['introduction', 'triggers', 'continents', 'actions', 'links'];
  const isIntroduction = activeSection === 'introduction';

  // Don't show nav on introduction page (logo is in the intro itself)
  if (isIntroduction) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            onClick={() => onSectionChange('introduction')}
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
              <span className="text-white text-[8px] font-bold leading-tight text-center">
                감정<br />지도
              </span>
            </div>
            <span className="text-[#1a1a1a] text-xs font-bold uppercase tracking-wider hidden sm:block">
              Atlas of Emotions
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {sections.slice(1).map((section, index) => (
              <motion.button
                key={section}
                onClick={() => onSectionChange(section)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeSection === section
                    ? 'text-[#1a1a1a] border-b-2 border-[#1a1a1a]'
                    : 'text-[#666] hover:text-[#1a1a1a]'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {sectionNames[section].ko}
              </motion.button>
            ))}
          </div>

          {/* Language */}
          <div className="hidden md:block">
            <span className="text-[#888] text-sm">한국어</span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-100">
        <div className="flex overflow-x-auto px-4 py-2 gap-2 scrollbar-hide">
          {sections.slice(1).map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                activeSection === section
                  ? 'text-[#1a1a1a] border-b-2 border-[#1a1a1a]'
                  : 'text-[#666]'
              }`}
            >
              {sectionNames[section].ko}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
