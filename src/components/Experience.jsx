import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';
import ContinentsView from './ContinentsView';
import StatesGraph from './StatesGraph';
import LearnMoreSidebar from './LearnMoreSidebar';

const Experience = ({ selectedEmotion }) => {
  const [viewMode, setViewMode] = useState('continents'); // 'continents' or 'states'
  const [activeState, setActiveState] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredContinent, setHoveredContinent] = useState(null);

  const handleContinentClick = (emotionId) => {
    if (emotionId) {
      setViewMode('states');
    }
  };

  const handleBackToContinents = () => {
    setViewMode('continents');
    setActiveState(null);
  };

  const currentEmotion = selectedEmotion ? emotions[selectedEmotion] : null;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          감정 경험
        </motion.h2>

        <motion.p
          className="text-gray-600 text-center mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {viewMode === 'continents'
            ? '5가지 감정 대륙을 탐험하세요. 각 대륙을 클릭하면 다양한 감정 상태를 볼 수 있습니다.'
            : `${currentEmotion?.name_ko || '감정'}의 다양한 상태를 강도별로 살펴보세요.`}
        </motion.p>

        {/* View Toggle */}
        {selectedEmotion && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glass rounded-full p-1.5 flex border border-gray-200/50">
              <button
                onClick={() => setViewMode('continents')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'continents'
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                대륙 보기
              </button>
              <button
                onClick={() => setViewMode('states')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === 'states'
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                상태 보기
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {viewMode === 'continents' && !selectedEmotion ? (
              <motion.div
                key="continents"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ContinentsView
                  onContinentClick={handleContinentClick}
                  hoveredContinent={hoveredContinent}
                  setHoveredContinent={setHoveredContinent}
                />
              </motion.div>
            ) : (
              <motion.div
                key="states"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {!selectedEmotion && (
                  <button
                    onClick={handleBackToContinents}
                    className="mb-6 flex items-center text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    대륙으로 돌아가기
                  </button>
                )}

                <StatesGraph
                  emotion={currentEmotion || emotions[hoveredContinent] || emotions.enjoyment}
                  activeState={activeState}
                  setActiveState={setActiveState}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Learn More Button */}
        {selectedEmotion && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              더 알아보기
            </button>
          </motion.div>
        )}

        {/* State Popup */}
        <AnimatePresence>
          {activeState && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setActiveState(null)}
              />
              <motion.div
                className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                style={{
                  borderLeft: `4px solid ${currentEmotion?.color || '#888'}`
                }}
              >
                <button
                  onClick={() => setActiveState(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {activeState.name_ko}
                  <span className="text-gray-400 text-sm ml-2">({activeState.name_en})</span>
                </h3>

                <div className="flex items-center mb-4">
                  <span className="text-gray-500 text-sm mr-2">강도:</span>
                  <div className="flex space-x-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < activeState.intensity
                            ? ''
                            : 'bg-gray-200'
                        }`}
                        style={{
                          backgroundColor: i < activeState.intensity ? currentEmotion?.color : undefined
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {activeState.description_ko}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Learn More Sidebar */}
      <LearnMoreSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        emotion={currentEmotion}
      />
    </section>
  );
};

export default Experience;
