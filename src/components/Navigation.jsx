import { motion } from 'framer-motion';
import { sectionNames } from '../data/emotions';

const Navigation = ({ activeSection, onSectionChange }) => {
  const sections = ['introduction', 'triggers', 'continents', 'actions', 'links'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.span
              className="text-xl font-bold text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              감정 지도
            </motion.span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {sections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => onSectionChange(section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sectionNames[section].ko}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white/60 text-sm">한국어</span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-white/10">
        <div className="flex overflow-x-auto px-2 py-2 space-x-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === section
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white'
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
