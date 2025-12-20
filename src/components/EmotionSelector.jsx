import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

const EmotionSelector = ({ selectedEmotion, onEmotionSelect }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Swipe handler for emotion navigation
  const handleSwipe = (event, info) => {
    if (Math.abs(info.velocity.x) > 300) {
      const currentIndex = selectedEmotion ? emotionOrder.indexOf(selectedEmotion) : -1;
      if (info.velocity.x > 0) {
        // Swipe right - go to previous
        if (currentIndex > 0) {
          onEmotionSelect(emotionOrder[currentIndex - 1]);
        } else if (currentIndex === 0) {
          onEmotionSelect(null);
        }
      } else {
        // Swipe left - go to next
        if (currentIndex === -1) {
          onEmotionSelect(emotionOrder[0]);
        } else if (currentIndex < emotionOrder.length - 1) {
          onEmotionSelect(emotionOrder[currentIndex + 1]);
        }
      }
    }
  };

  // Mobile collapsed view
  if (isMobile && !isExpanded) {
    return (
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="glass border-t border-gray-200/60 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
          <div className="px-4 py-3">
            {/* Expand handle */}
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full flex items-center justify-center mb-2"
              aria-label="감정 선택기 확장"
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </button>

            {/* Horizontal scroll with swipe support */}
            <motion.div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1"
              drag="x"
              dragConstraints={{ left: -200, right: 0 }}
              onPanEnd={handleSwipe}
            >
              {/* All emotions button - 44px+ touch target */}
              <motion.button
                onClick={() => onEmotionSelect(null)}
                className="flex-shrink-0 min-w-[48px] min-h-[48px] flex items-center justify-center"
                whileTap={{ scale: 0.92 }}
                aria-pressed={selectedEmotion === null}
                aria-label="모든 감정 보기"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 ${
                    selectedEmotion === null
                      ? 'bg-gray-900 shadow-lg'
                      : 'bg-gray-100'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${selectedEmotion === null ? 'text-white' : 'text-gray-500'}`}>
                    전체
                  </span>
                </div>
              </motion.button>

              <div className="h-8 w-px bg-gray-200 flex-shrink-0" aria-hidden="true" />

              {emotionOrder.map((emotionId) => {
                const emotion = emotions[emotionId];
                const isSelected = selectedEmotion === emotionId;

                return (
                  <motion.button
                    key={emotionId}
                    onClick={() => onEmotionSelect(emotionId)}
                    className="flex-shrink-0 min-w-[48px] min-h-[48px] flex items-center justify-center"
                    whileTap={{ scale: 0.92 }}
                    aria-pressed={isSelected}
                    aria-label={`${emotion.name_ko} 감정 선택`}
                  >
                    <motion.div
                      className="rounded-full"
                      style={{
                        width: isSelected ? '44px' : '40px',
                        height: isSelected ? '44px' : '40px',
                        background: `radial-gradient(circle at 30% 30%, ${emotion.colorLight}, ${emotion.color})`,
                        boxShadow: isSelected
                          ? `0 4px 16px ${emotion.color}60`
                          : `0 2px 8px ${emotion.color}30`,
                      }}
                    />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Mobile expanded view
  if (isMobile && isExpanded) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsExpanded(false)}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl safe-area-bottom"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.velocity.y > 300 || info.offset.y > 100) {
              setIsExpanded(false);
            }
          }}
        >
          {/* Drag handle */}
          <div className="flex justify-center py-3">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="px-6 pb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">감정 선택</h3>

            <div className="grid grid-cols-3 gap-4">
              {/* All emotions button */}
              <motion.button
                onClick={() => {
                  onEmotionSelect(null);
                  setIsExpanded(false);
                }}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-colors"
                style={{
                  backgroundColor: selectedEmotion === null ? 'rgba(0,0,0,0.08)' : 'transparent'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    selectedEmotion === null
                      ? 'bg-gray-900'
                      : 'bg-gray-100'
                  }`}
                >
                  <span className={`text-sm font-bold ${selectedEmotion === null ? 'text-white' : 'text-gray-500'}`}>
                    전체
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">모두 보기</span>
              </motion.button>

              {emotionOrder.map((emotionId) => {
                const emotion = emotions[emotionId];
                const isSelected = selectedEmotion === emotionId;

                return (
                  <motion.button
                    key={emotionId}
                    onClick={() => {
                      onEmotionSelect(emotionId);
                      setIsExpanded(false);
                    }}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-colors"
                    style={{
                      backgroundColor: isSelected ? `${emotion.color}15` : 'transparent'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="w-14 h-14 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${emotion.colorLight}, ${emotion.color})`,
                        boxShadow: isSelected
                          ? `0 6px 20px ${emotion.color}50`
                          : `0 3px 12px ${emotion.color}25`,
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">{emotion.name_ko}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Desktop view
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      role="navigation"
      aria-label="감정 선택기"
    >
      <div className="glass border-t border-gray-200/60 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-5">
          <div className="flex items-center justify-center gap-3 sm:gap-5 overflow-x-auto scrollbar-hide">
            {/* All emotions button - 48px+ touch target */}
            <motion.button
              onClick={() => onEmotionSelect(null)}
              className="flex flex-col items-center gap-2 flex-shrink-0 min-w-[48px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={selectedEmotion === null}
              aria-label="모든 감정 보기"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedEmotion === null
                    ? 'bg-gray-900 shadow-lg shadow-gray-900/25'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className={`text-xs font-bold ${selectedEmotion === null ? 'text-white' : 'text-gray-500'}`}>
                  전체
                </span>
              </div>
              <span className={`text-[11px] font-semibold uppercase tracking-wide ${
                selectedEmotion === null ? 'text-gray-900' : 'text-gray-400'
              }`}>
                All
              </span>
            </motion.button>

            {/* Divider */}
            <div className="h-12 w-px bg-gray-200 flex-shrink-0" aria-hidden="true" />

            {/* Individual emotion buttons - 48px+ touch target */}
            {emotionOrder.map((emotionId) => {
              const emotion = emotions[emotionId];
              const isSelected = selectedEmotion === emotionId;

              return (
                <motion.button
                  key={emotionId}
                  onClick={() => onEmotionSelect(emotionId)}
                  className="flex flex-col items-center gap-2 flex-shrink-0 min-w-[48px]"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={isSelected}
                  aria-label={`${emotion.name_ko} 감정 선택`}
                >
                  <motion.div
                    className="rounded-full transition-all duration-300 flex items-center justify-center"
                    style={{
                      width: isSelected ? '56px' : '48px',
                      height: isSelected ? '56px' : '48px',
                      background: `radial-gradient(circle at 30% 30%, ${emotion.colorLight}, ${emotion.color})`,
                      boxShadow: isSelected
                        ? `0 8px 24px ${emotion.color}50, 0 0 0 3px ${emotion.colorLight}40`
                        : `0 4px 12px ${emotion.color}30`,
                    }}
                    animate={{
                      scale: isSelected ? [1, 1.03, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isSelected ? Infinity : 0,
                      repeatType: 'reverse',
                    }}
                  />
                  <span
                    className={`text-[11px] font-semibold transition-colors ${
                      isSelected ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {emotion.name_ko}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmotionSelector;
