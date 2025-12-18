import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions, emotionOrder, emotionTriggersResponses } from '../data/emotions';

// ============================================
// TIMELINE - 원본 atlasofemotions.org 100% 복제
// ============================================

// Timeline Steps Data
const TIMELINE_STEPS = [
  {
    id: 'precondition',
    name_ko: '사전 조건',
    name_en: 'PRE-CONDITION',
    description_ko: '과거 경험, 현재 기분, 성격 특성이 다음 자극에 대한 반응 방식을 형성합니다.',
    description_en: 'Past experiences, current mood, and personality traits shape how we respond to the next stimulus.',
    details: [
      { title_ko: '기분', title_en: 'Mood', desc_ko: '현재의 감정 상태가 새로운 자극을 해석하는 방식에 영향' },
      { title_ko: '성격 특성', title_en: 'Personality Trait', desc_ko: '지속적인 성격 특성이 감정 반응 패턴을 형성' },
      { title_ko: '과거 경험', title_en: 'Past Experience', desc_ko: '이전 경험이 유사한 상황에 대한 반응을 조건화' },
    ]
  },
  {
    id: 'event',
    name_ko: '이벤트',
    name_en: 'EVENT',
    description_ko: '외부 세계에서 일어나거나 마음속에서 떠오르는 사건입니다.',
    description_en: 'Something happens in the world or arises in the mind.',
    details: [
      { title_ko: '외부 자극', title_en: 'External Stimulus', desc_ko: '환경에서 오는 감각적 입력' },
      { title_ko: '내부 자극', title_en: 'Internal Stimulus', desc_ko: '생각, 기억, 상상' },
    ]
  },
  {
    id: 'trigger',
    name_ko: '트리거',
    name_en: 'TRIGGER',
    description_ko: '자동 평가 시스템이 밀리초 단위로 무의식적으로 감정 스크립트와 매칭합니다.',
    description_en: 'The automatic appraisal system unconsciously matches emotion scripts in milliseconds.',
    details: [
      { title_ko: '자동 평가', title_en: 'Automatic Appraisal', desc_ko: '무의식적이고 즉각적인 평가 과정' },
      { title_ko: '지각 데이터베이스', title_en: 'Perceptual Database', desc_ko: '보편적 테마와 개인적 변형의 저장소' },
    ]
  },
  {
    id: 'experience',
    name_ko: '경험',
    name_en: 'EXPERIENCE',
    description_ko: '신체적, 심리적 변화가 일어나며 감정을 경험합니다.',
    description_en: 'Physical and psychological changes occur as we experience the emotion.',
    details: [
      { title_ko: '신체적 변화', title_en: 'Physical Changes', desc_ko: '심박수, 호흡, 근육 긴장 등' },
      { title_ko: '심리적 변화', title_en: 'Psychological Changes', desc_ko: '주의, 사고, 동기의 변화' },
      { title_ko: '상태', title_en: 'State', desc_ko: '감정의 질적 경험 자체' },
    ]
  },
  {
    id: 'response',
    name_ko: '반응',
    name_en: 'RESPONSE',
    description_ko: '건설적이거나 파괴적인 방식으로 감정을 표현합니다. 이 단계에서 선택이 가능합니다.',
    description_en: 'We express emotion constructively or destructively. Choice is possible at this stage.',
    details: [
      { title_ko: '본능적 반응', title_en: 'Intrinsic Actions', desc_ko: '자동적이고 본능적인 반응' },
      { title_ko: '의도적 반응', title_en: 'Intentional Actions', desc_ko: '의식적으로 선택한 반응' },
    ]
  },
];

// Learn More Modal - Full Emotional Episode Timeline
const LearnMoreModal = ({ isOpen, onClose, emotion }) => {
  if (!isOpen) return null;

  const fullSteps = [
    { id: 1, ko: '사전 조건', en: 'PRE-CONDITION', desc: '과거 경험, 기분, 성격이 반응 방식을 형성' },
    { id: 2, ko: '이벤트', en: 'EVENT', desc: '외부 또는 내부에서 자극이 발생' },
    { id: 3, ko: '트리거', en: 'TRIGGER', desc: '자동 평가 시스템이 감정 스크립트와 매칭' },
    { id: 4, ko: '지각 데이터베이스', en: 'PERCEPTUAL DATABASE', desc: '보편적/개인적 감정 기억 저장소' },
    { id: 5, ko: '신체적 변화', en: 'PHYSICAL CHANGES', desc: '자율신경계 반응 (심박수, 호흡 등)' },
    { id: 6, ko: '상태', en: 'STATE', desc: '감정의 질적 경험 (몇 초~몇 분)' },
    { id: 7, ko: '심리적 변화', en: 'PSYCHOLOGICAL CHANGES', desc: '주의, 사고, 동기의 변화' },
    { id: 8, ko: '행동', en: 'ACTION', desc: '본능적/의도적 반응으로 표현' },
    { id: 9, ko: '사후 조건', en: 'POST-CONDITION', desc: '행동 결과가 다음 에피소드에 영향' },
    { id: 10, ko: '선택적 필터 기간', en: 'REFRACTORY PERIOD', desc: '현재 감정과 일치하는 정보만 수용' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-5xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow-2xl"
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Emotional Episode Timeline</h2>
              <p className="text-gray-500 mt-1">감정 에피소드의 전체 과정</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Timeline visualization */}
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />

              {/* Steps */}
              <div className="space-y-6">
                {fullSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="relative flex items-start gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {/* Step Number */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 flex-shrink-0"
                      style={{ backgroundColor: emotion?.color || '#6366f1' }}
                    >
                      {step.id}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{step.ko}</h3>
                        <span className="text-xs tracking-wider text-gray-400 uppercase">{step.en}</span>
                      </div>
                      <p className="text-gray-600">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Insight */}
            <div className="mt-10 p-6 bg-gray-50 rounded-lg text-center">
              <p className="text-lg text-gray-700">
                "감정은 선택하지 않지만, <span className="font-bold text-gray-900">반응은 선택</span>할 수 있습니다."
              </p>
              <p className="text-sm text-gray-500 mt-2">— Paul Ekman</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Content - Step Visualization
const StepVisualization = ({ step, emotion }) => {
  if (!step) return null;

  return (
    <motion.div
      key={step.id}
      className="h-full flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Large Step Number */}
      <motion.div
        className="text-[200px] font-extralight leading-none mb-4"
        style={{ color: `${emotion?.color}20` }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        {TIMELINE_STEPS.findIndex(s => s.id === step.id) + 1}
      </motion.div>

      {/* Step Title */}
      <h2 className="text-4xl font-bold text-gray-900 mb-2">{step.name_ko}</h2>
      <p className="text-sm tracking-[0.3em] text-gray-400 uppercase mb-8">{step.name_en}</p>

      {/* Description */}
      <p className="text-xl text-gray-600 text-center max-w-xl mb-12 leading-relaxed">
        {step.description_ko}
      </p>

      {/* Details */}
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
        {step.details.map((detail, i) => (
          <motion.div
            key={i}
            className="px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <h4 className="font-semibold text-gray-900 mb-1">{detail.title_ko}</h4>
            <p className="text-sm text-gray-500">{detail.desc_ko}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Bottom Emotion Selector (원본 사이트와 동일)
const EmotionSelector = ({ currentEmotion, onSelect }) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
      {emotionOrder.map((id) => {
        const em = emotions[id];
        const isActive = currentEmotion === id;

        return (
          <motion.button
            key={id}
            onClick={() => onSelect(id)}
            className="flex flex-col items-center gap-2 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: em.color,
                boxShadow: isActive ? `0 0 0 4px ${em.color}40, 0 4px 12px ${em.color}60` : 'none',
                transform: isActive ? 'scale(1.2)' : 'scale(1)',
              }}
            />
            <span className={`text-xs font-medium transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
              {em.name_ko}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

// Main Timeline Component
const Timeline = ({ selectedEmotion }) => {
  const [currentStep, setCurrentStep] = useState(TIMELINE_STEPS[0]);
  const [currentEmotionId, setCurrentEmotionId] = useState(selectedEmotion || 'fear');
  const [showLearnMore, setShowLearnMore] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (selectedEmotion) setCurrentEmotionId(selectedEmotion);
  }, [selectedEmotion]);

  const emotion = emotions[currentEmotionId];
  const emotionData = emotionTriggersResponses?.[currentEmotionId];

  const handleRestart = () => {
    setCurrentStep(TIMELINE_STEPS[0]);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#f5f5f5] relative"
    >
      <div className="flex h-screen">
        {/* Left Sidebar - 원본과 동일 */}
        <motion.aside
          className="w-80 bg-white border-r border-gray-200 flex flex-col h-full"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900 mb-1">The Timeline</h1>
            <p className="text-sm text-gray-500">타임라인</p>
          </div>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="mx-6 mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors text-left flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            restart
          </button>

          {/* Step List */}
          <div className="flex-1 overflow-y-auto p-4">
            {TIMELINE_STEPS.map((step, index) => {
              const isActive = currentStep.id === step.id;
              const isPast = TIMELINE_STEPS.findIndex(s => s.id === currentStep.id) > index;

              return (
                <motion.button
                  key={step.id}
                  onClick={() => setCurrentStep(step)}
                  className={`w-full text-left p-4 rounded-lg mb-2 transition-all ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : isPast
                        ? 'bg-gray-100 text-gray-600'
                        : 'hover:bg-gray-50 text-gray-700'
                  }`}
                  whileHover={{ x: isActive ? 0 : 4 }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isActive ? 'bg-white text-gray-900' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step.name_ko}</p>
                      <p className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
                        {step.name_en}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Learn More Button */}
          <div className="p-4 border-t border-gray-100">
            <motion.button
              onClick={() => setShowLearnMore(true)}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: emotion?.color || '#6366f1' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Learn More</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Step Visualization */}
          <AnimatePresence mode="wait">
            <StepVisualization
              key={currentStep.id}
              step={currentStep}
              emotion={emotion}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute bottom-24 right-8 flex gap-2">
            <button
              onClick={() => {
                const idx = TIMELINE_STEPS.findIndex(s => s.id === currentStep.id);
                if (idx > 0) setCurrentStep(TIMELINE_STEPS[idx - 1]);
              }}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={TIMELINE_STEPS.findIndex(s => s.id === currentStep.id) === 0}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => {
                const idx = TIMELINE_STEPS.findIndex(s => s.id === currentStep.id);
                if (idx < TIMELINE_STEPS.length - 1) setCurrentStep(TIMELINE_STEPS[idx + 1]);
              }}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={TIMELINE_STEPS.findIndex(s => s.id === currentStep.id) === TIMELINE_STEPS.length - 1}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Bottom Emotion Selector */}
          <EmotionSelector
            currentEmotion={currentEmotionId}
            onSelect={setCurrentEmotionId}
          />
        </div>
      </div>

      {/* Learn More Modal */}
      <LearnMoreModal
        isOpen={showLearnMore}
        onClose={() => setShowLearnMore(false)}
        emotion={emotion}
      />
    </section>
  );
};

export default Timeline;
