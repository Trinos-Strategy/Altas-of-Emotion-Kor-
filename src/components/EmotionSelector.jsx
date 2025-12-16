import { motion } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

const EmotionSelector = ({ selectedEmotion, onEmotionSelect }) => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className="glass border-t border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-1">
            {/* All emotions button */}
            <motion.button
              onClick={() => onEmotionSelect(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedEmotion === null
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              전체 감정
            </motion.button>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block" />

            {/* Individual emotion buttons */}
            {emotionOrder.map((emotionId, index) => {
              const emotion = emotions[emotionId];
              const isSelected = selectedEmotion === emotionId;

              return (
                <motion.button
                  key={emotionId}
                  onClick={() => onEmotionSelect(emotionId)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${
                    isSelected
                      ? 'text-white border-transparent shadow-lg'
                      : 'bg-white border-gray-200 hover:border-transparent'
                  }`}
                  style={{
                    backgroundColor: isSelected ? emotion.color : undefined,
                    boxShadow: isSelected ? `0 4px 15px ${emotion.color}50` : undefined,
                    color: isSelected ? 'white' : emotion.color,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: isSelected ? emotion.color : emotion.colorLight,
                    borderColor: 'transparent',
                    color: isSelected ? 'white' : emotion.colorDark,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: isSelected ? 'white' : emotion.color,
                        opacity: isSelected ? 0.8 : 1
                      }}
                    />
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
