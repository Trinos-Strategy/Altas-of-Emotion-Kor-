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
import KoreanEmotions from './components/KoreanEmotions';

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
    // Improved animation variants with refined easing
    const variants = {
      initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth ease-out
          staggerChildren: 0.08
        }
      },
      exit: {
        opacity: 0,
        y: -10,
        scale: 0.99,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 1, 1] // ease-in for exit
        }
      }
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
      case 'korean-emotions':
        return (
          <motion.div key="korean-emotions" {...variants}>
            <KoreanEmotions />
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
  const isKoreanEmotions = activeSection === 'korean-emotions';

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content - 네비게이션 높이(72px) 고려한 padding-top */}
      <main style={{ paddingTop: isIntroduction ? '0' : '72px', paddingBottom: isIntroduction ? '0' : '96px' }}>
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      {/* Emotion Selector - only show on non-intro, non-explore, and non-korean-emotions pages */}
      {!isIntroduction && !isExplore && !isKoreanEmotions && (
        <EmotionSelector
          selectedEmotion={selectedEmotion}
          onEmotionSelect={setSelectedEmotion}
        />
      )}
    </div>
  );
}

export default App;
