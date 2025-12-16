import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder, emotionalEpisodeTimeline } from '../data/emotions';
import Modal from './common/Modal';

const Timeline = ({ selectedEmotion }) => {
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-rotate through emotions if none selected
  useEffect(() => {
    if (selectedEmotion) return;

    const interval = setInterval(() => {
      setCurrentEmotionIndex((prev) => (prev + 1) % emotionOrder.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedEmotion]);

  const activeEmotionId = selectedEmotion || emotionOrder[currentEmotionIndex];
  const emotion = emotions[activeEmotionId];

  // Get random trigger and response for display
  const trigger = emotion.triggers[0];
  const response = emotion.responses[0];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          감정 타임라인
        </motion.h2>

        <motion.p
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          감정은 트리거에서 시작하여 경험을 거쳐 반응으로 이어집니다.
          각 감정이 어떻게 작동하는지 살펴보세요.
        </motion.p>

        {/* Timeline Flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12">
          <AnimatePresence mode="wait">
            {/* Trigger Box */}
            <motion.div
              key={`trigger-${activeEmotionId}`}
              className="glass rounded-2xl p-6 w-full md:w-64 text-center border border-gray-200/50 shadow-sm"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-500 text-sm font-medium mb-2">트리거</div>
              <div className="text-gray-800 text-lg font-medium">{trigger.text_ko}</div>
            </motion.div>
          </AnimatePresence>

          {/* Arrow */}
          <motion.div
            className="hidden md:block text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* Mobile Arrow */}
          <motion.div
            className="md:hidden text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-8 h-8 rotate-90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Emotion Circle */}
            <motion.div
              key={`emotion-${activeEmotionId}`}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${emotion.colorLight}, ${emotion.color})`,
                }}
                animate={{
                  boxShadow: [
                    `0 8px 30px ${emotion.color}40`,
                    `0 12px 40px ${emotion.color}60`,
                    `0 8px 30px ${emotion.color}40`
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <div className="text-center">
                  <div className="text-white/80 text-xs mb-1">당신은</div>
                  <div className="text-white font-bold text-lg md:text-xl">{emotion.name_ko}</div>
                  <div className="text-white/80 text-xs mt-1">을(를) 느낀다</div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Arrow */}
          <motion.div
            className="hidden md:block text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* Mobile Arrow */}
          <motion.div
            className="md:hidden text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg className="w-8 h-8 rotate-90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Response Box */}
            <motion.div
              key={`response-${activeEmotionId}`}
              className="glass rounded-2xl p-6 w-full md:w-64 text-center border border-gray-200/50 shadow-sm"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-gray-500 text-sm font-medium mb-2">반응</div>
              <div className="text-gray-800 text-lg font-medium">{response.text_ko}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Emotion Selector Dots (when no emotion selected) */}
        {!selectedEmotion && (
          <motion.div
            className="flex justify-center space-x-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {emotionOrder.map((id, index) => (
              <button
                key={id}
                onClick={() => setCurrentEmotionIndex(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  index === currentEmotionIndex
                    ? 'scale-125 shadow-lg'
                    : 'opacity-50 hover:opacity-75'
                }`}
                style={{
                  backgroundColor: emotions[id].color,
                  boxShadow: index === currentEmotionIndex ? `0 4px 12px ${emotions[id].color}50` : undefined
                }}
              />
            ))}
          </motion.div>
        )}

        {/* Learn More Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            어떻게 이런 일이 일어나나요?
          </button>
        </motion.div>

        {/* Additional Triggers and Responses */}
        <motion.div
          className="mt-16 grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="glass rounded-2xl p-6 border border-gray-200/50">
            <h3 className="text-xl font-bold mb-4" style={{ color: emotion.color }}>
              {emotion.name_ko}의 트리거들
            </h3>
            <ul className="space-y-3">
              {emotion.triggers.map((t, i) => (
                <motion.li
                  key={i}
                  className="flex items-center text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: emotion.color }}
                  />
                  {t.text_ko}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 border border-gray-200/50">
            <h3 className="text-xl font-bold mb-4" style={{ color: emotion.color }}>
              {emotion.name_ko}의 반응들
            </h3>
            <ul className="space-y-3">
              {emotion.responses.map((r, i) => (
                <motion.li
                  key={i}
                  className="flex items-center text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0"
                    style={{ backgroundColor: emotion.color }}
                  />
                  {r.text_ko}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Timeline Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={emotionalEpisodeTimeline.title_ko}
      >
        <TimelineModalContent />
      </Modal>
    </section>
  );
};

const TimelineModalContent = () => {
  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-8">
        감정 에피소드는 여러 단계를 거칩니다. 각 단계를 이해하면 감정을 더 잘 관리할 수 있습니다.
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Steps */}
        <div className="space-y-6">
          {emotionalEpisodeTimeline.steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative flex items-start pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Step number */}
              <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#E8857B] to-[#A78BCA] flex items-center justify-center text-white text-sm font-bold shadow-md">
                {step.id}
              </div>

              {/* Content */}
              <div className="bg-gray-50 rounded-xl p-4 flex-1 border border-gray-100">
                <h4 className="text-gray-800 font-semibold mb-1">{step.name_ko}</h4>
                <p className="text-gray-500 text-sm">{step.description_ko}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-[#E8857B]/10 to-[#A78BCA]/10 rounded-xl border border-gray-100">
        <h4 className="text-gray-800 font-semibold mb-2">핵심 인사이트</h4>
        <p className="text-gray-600 text-sm">
          감정 에피소드에서 가장 중요한 순간은 <strong className="text-gray-800">인식</strong>과{' '}
          <strong className="text-gray-800">반응 선택</strong> 단계입니다.
          이 순간에 우리는 자동적 반응을 멈추고 의식적으로 더 건설적인 반응을 선택할 수 있습니다.
          이것이 감정 지능의 핵심입니다.
        </p>
      </div>
    </div>
  );
};

export default Timeline;
