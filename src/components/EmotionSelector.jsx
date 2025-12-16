import { motion } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

const EmotionSelector = ({ selectedEmotion, onEmotionSelect }) => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
            {/* All emotions button */}
            <motion.button
              onClick={() => onEmotionSelect(null)}
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedEmotion === null
                    ? 'bg-[#1a1a1a] shadow-lg'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <span className={`text-xs font-bold ${selectedEmotion === null ? 'text-white' : 'text-[#666]'}`}>
                  전체
                </span>
              </div>
              <span className={`text-xs font-medium ${selectedEmotion === null ? 'text-[#1a1a1a]' : 'text-[#888]'}`}>
                ALL
              </span>
            </motion.button>

            {/* Divider */}
            <div className="h-12 w-px bg-gray-200" />

            {/* Individual emotion buttons */}
            {emotionOrder.map((emotionId) => {
              const emotion = emotions[emotionId];
              const isSelected = selectedEmotion === emotionId;

              return (
                <motion.button
                  key={emotionId}
                  onClick={() => onEmotionSelect(emotionId)}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: isSelected ? '60px' : '48px',
                      height: isSelected ? '60px' : '48px',
                      background: `radial-gradient(circle at 30% 30%, ${emotion.colorLight}, ${emotion.color})`,
                      boxShadow: isSelected
                        ? `0 4px 20px ${emotion.color}60`
                        : `0 2px 8px ${emotion.color}30`,
                    }}
                    animate={{
                      scale: isSelected ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isSelected ? Infinity : 0,
                      repeatType: 'reverse',
                    }}
                  />
                  <span
                    className={`text-xs font-medium transition-colors ${
                      isSelected ? 'text-[#1a1a1a]' : 'text-[#888]'
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
