import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

const Timeline = ({ selectedEmotion }) => {
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  const timelineSteps = [
    { id: 1, name_ko: '사전 조건', name_en: 'PRECONDITION', color: '#f5f5f5', textColor: '#525252' },
    { id: 2, name_ko: '사건', name_en: 'EVENT', color: '#FFE5D4', textColor: '#171717' },
    { id: 3, name_ko: '트리거', name_en: 'TRIGGER', color: emotion.colorLight, textColor: '#171717' },
    { id: 4, name_ko: '경험', name_en: 'EXPERIENCE', color: emotion.color, textColor: '#fff' },
    { id: 5, name_ko: '반응', name_en: 'RESPONSE', color: emotion.colorLight, textColor: '#171717' },
  ];

  const stepDescriptions = {
    1: '과거 경험, 기분, 성격 특성 등이 감정 반응에 영향을 미칩니다.',
    2: '감정을 유발할 수 있는 외부 또는 내부 사건이 발생합니다.',
    3: '사건이 개인적으로 의미 있는 것으로 평가될 때 감정이 촉발됩니다.',
    4: '감정이 신체적, 심리적으로 경험됩니다.',
    5: '감정에 대한 행동적, 표현적 반응이 나타납니다.',
  };

  return (
    <section ref={sectionRef} className="min-h-screen px-6 py-16 md:py-20" role="region" aria-label="감정 에피소드 타임라인">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-gray-900 mb-4">
            감정 에피소드 타임라인
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            감정적 경험은 일련의 단계를 거칩니다. 각 단계를 이해하면
            감정에 대한 더 큰 통제력을 얻을 수 있습니다.
          </p>
        </motion.header>

        {/* Timeline Diagram */}
        <motion.div
          className="mb-16 md:mb-20 overflow-x-auto pb-6 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center min-w-[800px] px-4 md:px-8">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Step Node */}
                <motion.div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                  onFocus={() => setActiveStep(step.id)}
                  onBlur={() => setActiveStep(null)}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${step.name_ko}: ${stepDescriptions[step.id]}`}
                >
                  {/* Step Label Top */}
                  <div className="text-center mb-3">
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                      Step {step.id}
                    </span>
                  </div>

                  {/* Circle */}
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: step.color,
                      boxShadow: activeStep === step.id
                        ? `0 12px 40px ${step.color === '#f5f5f5' ? 'rgba(0,0,0,0.12)' : `${emotion.color}40`}`
                        : step.color === '#f5f5f5' ? 'inset 0 0 0 2px #e5e5e5' : '0 4px 16px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div className="text-center px-2">
                      <div
                        className="text-[10px] font-bold mb-1.5 tracking-wide uppercase"
                        style={{ color: step.textColor, opacity: 0.7 }}
                      >
                        {step.name_en}
                      </div>
                      <div
                        className="text-sm md:text-base font-semibold"
                        style={{ color: step.textColor }}
                      >
                        {step.name_ko}
                      </div>
                    </div>
                  </div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {activeStep === step.id && (
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-white rounded-xl shadow-xl p-4 z-10 border border-gray-100"
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />
                        <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                          {stepDescriptions[step.id]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Arrow */}
                {index < timelineSteps.length - 1 && (
                  <motion.div
                    className="mx-3 md:mx-5"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    aria-hidden="true"
                  >
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Current Emotion Display */}
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEmotionId}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center mb-6"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${emotion.colorLight}, ${emotion.color})`,
                boxShadow: `0 16px 48px ${emotion.color}40`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center">
                <div className="text-white/80 text-sm mb-1 font-medium">현재 감정</div>
                <div className="text-white font-bold text-2xl md:text-3xl">{emotion.name_ko}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Emotion dots selector */}
          {!selectedEmotion && (
            <div className="flex gap-3" role="tablist" aria-label="감정 선택">
              {emotionOrder.map((id, index) => (
                <button
                  key={id}
                  onClick={() => setCurrentEmotionIndex(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    backgroundColor: emotions[id].color,
                    transform: index === currentEmotionIndex ? 'scale(1.4)' : 'scale(1)',
                    opacity: index === currentEmotionIndex ? 1 : 0.4,
                    boxShadow: index === currentEmotionIndex ? `0 4px 12px ${emotions[id].color}60` : 'none',
                  }}
                  role="tab"
                  aria-selected={index === currentEmotionIndex}
                  aria-label={emotions[id].name_ko}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Triggers and Responses Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Triggers */}
          <div className="card p-6 md:p-8">
            <h3
              className="text-lg md:text-xl font-serif font-medium mb-5 flex items-center gap-3"
              style={{ color: emotion.color }}
            >
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: emotion.color }}
                aria-hidden="true"
              />
              {emotion.name_ko}의 트리거
            </h3>
            <ul className="space-y-4" role="list">
              {emotion.triggers.map((t, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-gray-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="leading-relaxed">{t.text_ko}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Responses */}
          <div className="card p-6 md:p-8">
            <h3
              className="text-lg md:text-xl font-serif font-medium mb-5 flex items-center gap-3"
              style={{ color: emotion.color }}
            >
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: emotion.color }}
                aria-hidden="true"
              />
              {emotion.name_ko}의 반응
            </h3>
            <ul className="space-y-4" role="list">
              {emotion.responses.map((r, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-gray-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="leading-relaxed">{r.text_ko}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
