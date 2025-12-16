import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import EmotionSelector from './components/EmotionSelector';
import Introduction from './components/Introduction';
import Timeline from './components/Timeline';
import Experience from './components/Experience';
import Response from './components/Response';
import Strategies from './components/Strategies';

// Emotion colors for background blobs
const emotionColors = {
  anger: { main: '#E8857B', light: '#F5B8B2' },
  fear: { main: '#A78BCA', light: '#D4C4E8' },
  disgust: { main: '#7DC4A5', light: '#B5DEC9' },
  sadness: { main: '#7BA7D0', light: '#B3CFE8' },
  enjoyment: { main: '#F5D76E', light: '#FAE9A8' }
};

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
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Organic Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Large decorative blobs */}
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] blob pulse-glow"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${emotionColors.enjoyment.light}80, ${emotionColors.enjoyment.main}40, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute top-1/4 -left-48 w-[500px] h-[500px] blob blob-delay-1 pulse-glow"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${emotionColors.fear.light}70, ${emotionColors.fear.main}30, transparent 70%)`,
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute top-1/2 right-0 w-[450px] h-[450px] blob blob-delay-2 pulse-glow"
          style={{
            background: `radial-gradient(circle at 30% 70%, ${emotionColors.anger.light}60, ${emotionColors.anger.main}25, transparent 70%)`,
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute -bottom-32 left-1/4 w-[550px] h-[550px] blob blob-delay-3 pulse-glow"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${emotionColors.sadness.light}70, ${emotionColors.sadness.main}30, transparent 70%)`,
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] blob pulse-glow"
          style={{
            background: `radial-gradient(circle at 60% 40%, ${emotionColors.disgust.light}60, ${emotionColors.disgust.main}25, transparent 70%)`,
          }}
          animate={{
            x: [0, 15, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/30" />
      </div>

      {/* Navigation */}
      <Navigation
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Main Content */}
      <main className="pt-20 pb-28 relative z-10">
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      {/* Emotion Selector */}
      <EmotionSelector
        selectedEmotion={selectedEmotion}
        onEmotionSelect={setSelectedEmotion}
      />
    </div>
  );
}

export default App;
