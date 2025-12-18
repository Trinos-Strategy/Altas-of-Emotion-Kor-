import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { partiallyChartedEmotions } from '../data/additionalData';

const PartiallyChartedEmotions = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            탐험하는 감정들
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-6">
            아래의 9가지 감정은 과학자들 사이에서 50% 이하의 합의만 이루어진 감정들입니다.
            이 감정들은 아직 완전히 탐구되지 않았지만, 우리의 감정 경험에서 중요한 역할을 합니다.
          </p>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-sm text-slate-400 hover:text-white transition-colors underline"
          >
            {showInfo ? '설명 닫기' : '왜 "부분적으로 탐구된" 감정인가요?'}
          </button>
          
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-slate-800/50 rounded-lg text-left max-w-2xl mx-auto"
              >
                <p className="text-slate-300 text-sm">
                  Atlas of Emotions는 248명의 감정 과학자들을 대상으로 한 설문조사를 기반으로 합니다.
                  5가지 핵심 감정(분노, 두려움, 혐오, 슬픔, 즐거움)은 76% 이상의 과학자들이 보편적 감정으로 동의했습니다.
                  반면, 아래의 감정들은 50% 이하의 합의를 얻어 "부분적으로 탐구된" 감정으로 분류됩니다.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 감정 그리드 */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {partiallyChartedEmotions.map((emotion, index) => (
            <motion.button
              key={emotion.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedEmotion(selectedEmotion?.id === emotion.id ? null : emotion)}
              className={`
                relative p-4 md:p-6 rounded-2xl transition-all duration-300
                ${selectedEmotion?.id === emotion.id 
                  ? 'ring-2 ring-white shadow-lg scale-105' 
                  : 'hover:scale-102 hover:shadow-md'}
              `}
              style={{
                backgroundColor: emotion.color + '20',
                borderColor: emotion.color,
                borderWidth: '2px'
              }}
            >
              <div
                className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: emotion.color }}
              >
                <span className="text-2xl md:text-3xl text-white font-bold">
                  {emotion.name_ko.charAt(0)}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                {emotion.name_ko}
              </h3>
              <p className="text-xs md:text-sm text-slate-400">
                {emotion.name_en}
              </p>
            </motion.button>
          ))}
        </div>

        {/* 선택된 감정 상세 정보 */}
        <AnimatePresence mode="wait">
          {selectedEmotion && (
            <motion.div
              key={selectedEmotion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border"
              style={{ borderColor: selectedEmotion.color }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: selectedEmotion.color }}
                >
                  <span className="text-3xl text-white font-bold">
                    {selectedEmotion.name_ko.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {selectedEmotion.name_ko}
                  </h3>
                  <p className="text-slate-400">{selectedEmotion.name_en}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    설명
                  </h4>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedEmotion.description_ko}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmotion(null)}
                className="mt-6 text-sm text-slate-400 hover:text-white transition-colors"
              >
                닫기 ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 안내 메시지 */}
        {!selectedEmotion && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-400 mt-8"
          >
            감정을 선택하여 자세한 설명을 확인하세요
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PartiallyChartedEmotions;
