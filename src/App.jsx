import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import EmotionSelector from './components/EmotionSelector';
import Introduction from './components/Introduction';
import Timeline from './components/Timeline';
import Experience from './components/Experience';
import Response from './components/Response';
import Strategies from './components/Strategies';
import PartiallyChartedEmotions from './components/PartiallyChartedEmotions';

function App() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'introduction';
      setActiveSection(hash);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionChange = (section) => {
    window.location.hash = section;
    setActiveSection(section);
  };

  const renderSection = () => {
    const variants = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.5 } },
      exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    switch (activeSection) {
      case 'introduction':
        return (
          <motion.div key="introduction" {...variants}>
            <Introduction onNavigate={handleSectionChange} />
          </motion.div>
        );
      case 'triggers':
      case 'timeline':
        return (
          <motion.div key="timeline" {...variants}>
            <Timeline selectedEmotion={selectedEmotion} />
          </motion.div>
        );
      case 'continents':
      case 'experience':
        return (
          <motion.div key="experience" {...variants}>
            <Experience selectedEmotion={selectedEmotion} />
          </motion.div>
        );
      case 'actions':
      case 'response':
        return (
          <motion.div key="response" {...variants}>
            <Response selectedEmotion={selectedEmotion} />
          </motion.div>
        );
      case 'links':
      case 'strategies':
        return (
          <motion.div key="strategies" {...variants}>
            <Strategies selectedEmotion={selectedEmotion} />
          </motion.div>
        );
      case 'explore':
      case 'partially-charted':
        return (
          <motion.div key="explore" {...variants}>
            <PartiallyChartedEmotions />
          </motion.div>
        );
      default:
        return (
          <motion.div key="introduction" {...variants}>
            <Introduction onNavigate={handleSectionChange} />
          </motion.div>
        );
    }
  };

  const isIntroduction = activeSection === 'introduction';
  const isExplore = activeSection === 'explore' || activeSection === 'partially-charted';

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      {/* Multiple Emotion Circles - Original Atlas Style */}
      {isIntroduction && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Enjoyment - 오른쪽 위 (가장 큰 피치/살구색) */}
          <motion.div
            className="absolute"
            style={{
              top: '-250px',
              right: '-350px',
              width: '1100px',
              height: '1100px',
              background: 'radial-gradient(circle at 40% 40%, #FFE5D4 0%, #FFD4B8 40%, #FFCBB0 60%, rgba(255,203,176,0) 100%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              opacity: 0.85,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Disgust - 왼쪽 아래 (초록색) */}
          <motion.div
            className="absolute"
            style={{
              left: '-350px',
              bottom: '-350px',
              width: '900px',
              height: '900px',
              background: 'radial-gradient(circle at 60% 40%, #D4F1E8 0%, #B8E6D8 40%, rgba(184,230,216,0) 100%)',
              borderRadius: '50%',
              filter: 'blur(70px)',
              opacity: 0.6,
            }}
            animate={{
              x: [0, 20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 7,
            }}
          />

          {/* Sadness/Fear - 오른쪽 중간 (파란색) */}
          <motion.div
            className="absolute"
            style={{
              right: '-150px',
              top: '200px',
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle at 30% 50%, #D4E8F7 0%, #B8D8EC 40%, rgba(184,216,236,0) 100%)',
              borderRadius: '50%',
              filter: 'blur(60px)',
              opacity: 0.5,
            }}
            animate={{
              x: [0, -25, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 14,
            }}
          />
        </div>
      )}

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content - 네비게이션 높이(72px) 고려한 padding-top */}
      <main style={{ paddingTop: isIntroduction ? '0' : '72px', paddingBottom: '96px' }}>
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      {/* Emotion Selector - only show on non-intro and non-explore pages */}
      {!isIntroduction && !isExplore && (
        <EmotionSelector
          selectedEmotion={selectedEmotion}
          onEmotionSelect={setSelectedEmotion}
        />
      )}
    </div>
  );
}

export default App;
