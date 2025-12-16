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

    // Initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when section changes
  const handleSectionChange = (section) => {
    window.location.hash = section;
    setActiveSection(section);
  };

  // Render current section
  const renderSection = () => {
    const variants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
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

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="pt-16 pb-20">
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      {/* Emotion Selector */}
      <EmotionSelector
        selectedEmotion={selectedEmotion}
        onEmotionSelect={setSelectedEmotion}
      />

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-3xl"
          style={{
            background: selectedEmotion
              ? `radial-gradient(circle, var(--color-${selectedEmotion}), transparent)`
              : 'radial-gradient(circle, #9B59B6, transparent)'
          }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-3xl"
          style={{
            background: selectedEmotion
              ? `radial-gradient(circle, var(--color-${selectedEmotion}-light), transparent)`
              : 'radial-gradient(circle, #F1C40F, transparent)'
          }}
        />
      </div>
    </div>
  );
}

export default App;
