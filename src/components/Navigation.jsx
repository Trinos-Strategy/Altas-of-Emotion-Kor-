import { motion } from 'framer-motion';
import { sectionNames } from '../data/emotions';

const Navigation = ({ activeSection, onSectionChange }) => {
  const sections = ['introduction', 'triggers', 'continents', 'actions', 'links'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8857B] via-[#A78BCA] to-[#F5D76E] p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#E8857B] to-[#A78BCA] font-bold text-sm">
                      AE
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold text-gray-800">
                  감정 지도
                </span>
              </motion.div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => onSectionChange(section)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === section
                      ? 'bg-gray-800 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sectionNames[section].ko}
                </motion.button>
              ))}
            </div>

            {/* Language Indicator */}
            <div className="hidden md:flex items-center">
              <span className="text-gray-500 text-sm font-medium px-3 py-1.5 rounded-full bg-gray-100">
                한국어
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden glass border-b border-gray-200/30">
        <div className="flex overflow-x-auto px-3 py-2.5 space-x-2 scrollbar-hide">
          {sections.map((section) => (
            <motion.button
              key={section}
              onClick={() => onSectionChange(section)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeSection === section
                  ? 'bg-gray-800 text-white shadow-md'
                  : 'text-gray-600 bg-white/50 hover:bg-white'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {sectionNames[section].ko}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
