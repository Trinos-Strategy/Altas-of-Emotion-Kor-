import { motion } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

const EmotionSelector = ({ selectedEmotion, onEmotionSelect }) => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm border-t border-white/10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center space-x-2 overflow-x-auto">
          {/* All emotions button */}
          <motion.button
            onClick={() => onEmotionSelect(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedEmotion === null
                ? 'bg-white text-[#1a1a2e]'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            전체
          </motion.button>

          {/* Individual emotion buttons */}
          {emotionOrder.map((emotionId, index) => {
            const emotion = emotions[emotionId];
            const isSelected = selectedEmotion === emotionId;

            return (
              <motion.button
                key={emotionId}
                onClick={() => onEmotionSelect(emotionId)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                style={{
                  backgroundColor: isSelected ? emotion.color : 'rgba(255,255,255,0.1)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: isSelected ? emotion.color : emotion.colorLight + '40'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {emotion.name_ko}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default EmotionSelector;
