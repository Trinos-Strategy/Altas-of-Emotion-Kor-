import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import EmotionSelector from './components/EmotionSelector';
import Introduction from './components/Introduction';
import Timeline from './components/Timeline';
import Experience from './components/Experience';
import Response from './components/Response';
import Strategies from './components/Strategies';

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
        return (
          <motion.div key="triggers" {...variants}>
            <Timeline selectedEmotion={selectedEmotion} />
          </motion.div>
        );
      case 'continents':
        return (
          <motion.div key="continents" {...variants}>
            <Experience selectedEmotion={selectedEmotion} />
          </motion.div>
        );
      case 'actions':
        return (
          <motion.div key="actions" {...variants}>
            <Response selectedEmotion={selectedEmotion} />
          </motion.div>
        );
      case 'links':
        return (
          <motion.div key="links" {...variants}>
            <Strategies selectedEmotion={selectedEmotion} />
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
      {/* Single Large Peach Gradient Circle - Original Atlas Style */}
      {isIntroduction && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Main peach gradient circle - positioned top-right, partially off-screen */}
          <div
            className="absolute"
            style={{
              top: '-200px',
              right: '-300px',
              width: '1000px',
              height: '1000px',
              background: 'radial-gradient(circle at 40% 40%, #FFE5D4 0%, #FFD4B8 40%, #FFC9A8 70%, transparent 100%)',
              borderRadius: '50%',
              opacity: 0.9,
            }}
          />
          {/* Subtle inner glow */}
          <div
            className="absolute"
            style={{
              top: '-100px',
              right: '-200px',
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle at 50% 50%, #FFE8DC 0%, transparent 60%)',
              borderRadius: '50%',
              opacity: 0.6,
            }}
          />
        </div>
      )}

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className={isIntroduction ? 'pt-0' : 'pt-16 pb-24'}>
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      {/* Emotion Selector - only show on non-intro pages */}
      {!isIntroduction && (
        <EmotionSelector
          selectedEmotion={selectedEmotion}
          onEmotionSelect={setSelectedEmotion}
        />
      )}
    </div>
  );
}

export default App;
