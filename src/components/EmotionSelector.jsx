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
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide">
            {/* All emotions button */}
            <button
              onClick={() => onEmotionSelect(null)}
              className={`px-4 py-2 text-sm font-medium transition-all whitespace-nowrap border-2 ${
                selectedEmotion === null
                  ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              전체
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200" />

            {/* Individual emotion buttons */}
            {emotionOrder.map((emotionId) => {
              const emotion = emotions[emotionId];
              const isSelected = selectedEmotion === emotionId;

              return (
                <button
                  key={emotionId}
                  onClick={() => onEmotionSelect(emotionId)}
                  className={`px-4 py-2 text-sm font-medium transition-all whitespace-nowrap border-2 flex items-center gap-2 ${
                    isSelected
                      ? 'text-white'
                      : 'bg-transparent hover:opacity-80'
                  }`}
                  style={{
                    borderColor: emotion.color,
                    backgroundColor: isSelected ? emotion.color : 'transparent',
                    color: isSelected ? 'white' : emotion.color,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isSelected ? 'white' : emotion.color,
                    }}
                  />
                  {emotion.name_ko}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmotionSelector;
