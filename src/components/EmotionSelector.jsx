import { motion } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

const EmotionSelector = ({ selectedEmotion, onEmotionSelect }) => {
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
            {/* All emotions button */}
            <motion.button
              onClick={() => onEmotionSelect(null)}
              className="flex flex-col items-center gap-2 flex-shrink-0"
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

            {/* Individual emotion buttons */}
            {emotionOrder.map((emotionId) => {
              const emotion = emotions[emotionId];
              const isSelected = selectedEmotion === emotionId;

              return (
                <motion.button
                  key={emotionId}
                  onClick={() => onEmotionSelect(emotionId)}
                  className="flex flex-col items-center gap-2 flex-shrink-0"
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
