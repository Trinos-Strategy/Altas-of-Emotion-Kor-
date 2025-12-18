import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { emotions, emotionOrder, emotionTriggersResponses } from '../data/emotions';

// ============================================
// TIMELINE 2025 - Dark Mode Scroll Storytelling
// Inspired by: Linear, Stripe, Are.na, Awwwards
// ============================================

// ============================================
// Modals (기존 유지)
// ============================================
const HowDoesThisHappenModal = ({ isOpen, onClose, emotion }) => {
  const steps = [
    { id: 1, name_ko: "사전 조건", name_en: "PRE-CONDITION", desc: "과거 경험, 현재 기분, 성격 특성이 다음 자극에 대한 반응 방식을 형성합니다." },
    { id: 2, name_ko: "이벤트", name_en: "EVENT", desc: "외부 또는 내부에서 마주치는 사람, 장소, 상황, 이미지, 생각입니다." },
    { id: 3, name_ko: "트리거", name_en: "TRIGGER", desc: "자동 평가 시스템이 밀리초 단위로 무의식적으로 감정 스크립트와 매칭합니다." },
    { id: 4, name_ko: "지각 데이터베이스", name_en: "PERCEPTION DATABASE", desc: "보편적 감정 기억과 개인적 경험이 저장된 무의식적 영역입니다." },
    { id: 5, name_ko: "신체적 변화", name_en: "PHYSICAL CHANGES", desc: "심박수, 호흡, 근육 긴장 등 자율신경계의 자동 반응입니다." },
    { id: 6, name_ko: "상태", name_en: "STATE", desc: "감정 자체를 경험하는 단계로, 몇 초에서 몇 분간 지속됩니다." },
    { id: 7, name_ko: "심리적 변화", name_en: "PSYCHOLOGICAL CHANGES", desc: "감정의 질적 경험, 생각과 주의 집중의 변화입니다." },
    { id: 8, name_ko: "행동", name_en: "ACTION", desc: "건설적 또는 파괴적 반응으로 나타나는 감정적 표현입니다." },
    { id: 9, name_ko: "사후 조건", name_en: "POST-CONDITION", desc: "행동의 결과가 다음 감정 에피소드의 사전 조건이 됩니다." },
    { id: 10, name_ko: "선택적 필터", name_en: "SELECTIVE FILTER", desc: "현재 감정과 일치하는 정보만 받아들이는 기간입니다." },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#111] border border-white/10 rounded-sm"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.4 }}
      >
        <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-sm border-b border-white/10 px-10 py-8 flex justify-between items-start">
          <div>
            <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-2">How Does This Happen?</p>
            <h2 className="text-2xl text-white/90 font-light">어떻게 이런 일이 일어나는가</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-10 grid md:grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="p-6 border border-white/5 hover:border-white/20 bg-white/[0.02] transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-extralight text-white/20">{String(step.id).padStart(2, '0')}</span>
                <div>
                  <h4 className="text-white/90 font-medium mb-1">{step.name_ko}</h4>
                  <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-3">{step.name_en}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mx-10 mb-10 p-8 bg-white/[0.03] border border-white/5 text-center">
          <p className="text-white/60 leading-relaxed">
            "감정은 선택하지 않지만, <span className="text-white/90">반응은 선택</span>할 수 있습니다."
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const TriggersResponsesModal = ({ isOpen, onClose, emotion, emotionData }) => {
  if (!isOpen || !emotionData) return null;
  const getStyle = (type) => {
    switch (type) {
      case 'constructive': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'destructive': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-[#111] border border-white/10 rounded-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
      >
        <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-sm border-b border-white/10 px-10 py-8 flex justify-between items-start">
          <div>
            <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-2">Triggers & Responses</p>
            <h2 className="text-2xl text-white/90 font-light">트리거와 반응</h2>
            <p className="text-white/30 text-sm mt-1">{emotion?.name_ko}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-10 space-y-10">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-5">Triggers</p>
            <div className="grid md:grid-cols-2 gap-3">
              {emotionData.triggers?.map((t, i) => (
                <div key={i} className="p-4 border border-white/5 bg-white/[0.02]">
                  <p className="text-white/70 text-sm">{t.text_ko}</p>
                  <p className="text-white/30 text-xs mt-1">{t.text_en}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-5">Intrinsic Actions</p>
            <div className="flex flex-wrap gap-2">
              {emotionData.intrinsicActions?.map((a, i) => (
                <span key={i} className={`px-4 py-2 text-sm border ${getStyle(a.type)}`}>{a.text_ko}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-5">Intentional Actions</p>
            <div className="flex flex-wrap gap-2">
              {emotionData.intentionalActions?.map((a, i) => (
                <span key={i} className={`px-4 py-2 text-sm border ${getStyle(a.type)}`}>{a.text_ko}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SignalMessageModal = ({ isOpen, onClose, emotion, emotionData }) => {
  if (!isOpen || !emotionData) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-xl bg-[#111] border border-white/10 rounded-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
      >
        <div className="px-10 py-8 border-b border-white/10 flex justify-between items-start">
          <div>
            <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-2">Signal & Message</p>
            <h2 className="text-2xl text-white/90 font-light">신호와 메시지</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-10 space-y-8">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">Signal</p>
            <p className="text-white/70 leading-relaxed">{emotionData.signal?.text_ko}</p>
          </div>
          <div className="p-8 bg-white/[0.03] border border-white/5 text-center">
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">Message</p>
            <p className="text-xl text-white/90 font-light">"{emotionData.message?.text_ko}"</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MoodsModal = ({ isOpen, onClose, emotion }) => {
  if (!isOpen) return null;
  const data = {
    anger: { mood: "짜증나는", trait: "적대적인", psycho: ["간헐적 폭발 장애", "만성 적대감"] },
    fear: { mood: "불안한", trait: "소심한", psycho: ["사회불안장애", "PTSD", "공황장애"] },
    disgust: { mood: "까다로운", trait: "예민한", psycho: ["신경성 식욕부진증", "강박장애"] },
    sadness: { mood: "우울한", trait: "비관적인", psycho: ["주요우울장애", "지속성우울장애"] },
    enjoyment: { mood: "들뜬", trait: "낙관적인", psycho: ["조증 삽화"] }
  }[emotion?.id] || { mood: "-", trait: "-", psycho: [] };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        className="relative w-full max-w-xl bg-[#111] border border-white/10 rounded-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
      >
        <div className="px-10 py-8 border-b border-white/10 flex justify-between items-start">
          <div>
            <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mb-2">Moods & Psychopathology</p>
            <h2 className="text-2xl text-white/90 font-light">기분과 정신병리</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 border border-white/5 bg-white/[0.02]">
              <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">Mood</p>
              <p className="text-xl text-white/80 font-light">{data.mood}</p>
            </div>
            <div className="p-6 border border-white/5 bg-white/[0.02]">
              <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">Trait</p>
              <p className="text-xl text-white/80 font-light">{data.trait}</p>
            </div>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">Psychopathology</p>
            <div className="flex flex-wrap gap-2">
              {data.psycho.map((p, i) => (
                <span key={i} className="px-4 py-2 text-sm text-white/60 border border-white/10 bg-white/[0.02]">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// Step Section Component
// ============================================
const StepSection = ({ step, index, emotion, isActive }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative px-8"
      style={{ paddingTop: index === 0 ? '0' : '20vh', paddingBottom: '20vh' }}
    >
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 60 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Giant Step Number */}
        <div className="relative mb-8">
          <span
            className="text-[180px] md:text-[240px] lg:text-[300px] font-extralight leading-none select-none"
            style={{
              color: 'transparent',
              WebkitTextStroke: `1px ${emotion?.color}30`,
            }}
          >
            {String(step.id).padStart(2, '0')}
          </span>

          {/* Accent Line */}
          <motion.div
            className="absolute bottom-8 left-0 h-[1px]"
            style={{ backgroundColor: emotion?.color }}
            initial={{ width: 0 }}
            animate={isVisible ? { width: '120px' } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="pl-4 md:pl-8">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl text-white/90 font-light mb-4 tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {step.name_ko}
          </motion.h2>

          <motion.p
            className="text-[11px] tracking-[0.3em] text-white/30 uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {step.name_en}
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {step.desc}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// Scroll Progress Indicator
// ============================================
const ScrollProgress = ({ steps, activeStep, emotion }) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3">
      {steps.map((step, i) => (
        <motion.div
          key={step.id}
          className="relative group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: activeStep === i ? emotion?.color : 'rgba(255,255,255,0.2)',
              transform: activeStep === i ? 'scale(1.5)' : 'scale(1)',
            }}
          />
          {/* Tooltip */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-sm whitespace-nowrap">
              <span className="text-xs text-white/70">{step.name_ko}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================
// Main Timeline Component
// ============================================
const Timeline = ({ selectedEmotion }) => {
  const [currentEmotionId, setCurrentEmotionId] = useState(selectedEmotion || 'anger');
  const [activeStep, setActiveStep] = useState(0);
  const [showHowModal, setShowHowModal] = useState(false);
  const [showTriggersModal, setShowTriggersModal] = useState(false);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [showMoodsModal, setShowMoodsModal] = useState(false);
  const [pillOpen, setPillOpen] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    if (selectedEmotion) setCurrentEmotionId(selectedEmotion);
  }, [selectedEmotion]);

  const emotion = emotions[currentEmotionId];
  const emotionData = emotionTriggersResponses?.[currentEmotionId];

  const timelineSteps = [
    { id: 1, name_ko: '사전 조건', name_en: 'PRE-CONDITION', desc: '과거 경험, 현재의 기분 상태, 성격 특성이 다음에 오는 자극에 대한 반응 방식을 형성합니다.' },
    { id: 2, name_ko: '이벤트', name_en: 'EVENT', desc: '세상에서 무언가가 일어나거나, 마음속에서 생각이 떠오릅니다. 외부 또는 내부 자극이 감지됩니다.' },
    { id: 3, name_ko: '트리거', name_en: 'TRIGGER', desc: '자동 평가 시스템이 밀리초 단위로 무의식적으로 작동하여 감정 데이터베이스와 매칭합니다.' },
    { id: 4, name_ko: '경험', name_en: 'EXPERIENCE', desc: '심박수 증가, 호흡 변화, 근육 긴장 등 신체적 변화와 함께 감정의 질적 경험이 나타납니다.' },
    { id: 5, name_ko: '반응', name_en: 'RESPONSE', desc: '건설적이거나 파괴적인 행동으로 이어집니다. 이 단계에서 우리는 선택할 수 있습니다.' },
  ];

  const learnMoreCards = [
    { id: 'how', title: '어떻게 이런 일이?', sub: 'How Does This Happen?', onClick: () => setShowHowModal(true) },
    { id: 'triggers', title: '트리거와 반응', sub: 'Triggers & Responses', onClick: () => setShowTriggersModal(true) },
    { id: 'signal', title: '신호와 메시지', sub: 'Signal & Message', onClick: () => setShowSignalModal(true) },
    { id: 'moods', title: '기분과 정신병리', sub: 'Moods & Psychopathology', onClick: () => setShowMoodsModal(true) },
  ];

  // Track active step based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const stepIndex = Math.min(Math.floor(v * (timelineSteps.length + 1)), timelineSteps.length - 1);
      setActiveStep(stepIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, timelineSteps.length]);

  return (
    <div ref={containerRef} className="bg-[#0A0A0A] min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-8">
        {/* Emotion Pill Selector */}
        <motion.div
          className="absolute top-8 right-8 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <button
              onClick={() => setPillOpen(!pillOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              style={{ borderRadius: '100px' }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotion?.color }} />
              <span className="text-sm text-white/70">{emotion?.name_ko}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-white/40 transition-transform ${pillOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {pillOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 bg-[#111] border border-white/10 overflow-hidden"
                  style={{ borderRadius: '12px', minWidth: '160px' }}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                >
                  {emotionOrder.map((id) => (
                    <button
                      key={id}
                      onClick={() => { setCurrentEmotionId(id); setPillOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${currentEmotionId === id ? 'bg-white/5' : ''}`}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotions[id].color }} />
                      <span className="text-sm text-white/70">{emotions[id].name_ko}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-[11px] tracking-[0.4em] text-white/30 uppercase mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Emotional Episode Timeline
          </motion.p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl text-white/90 font-extralight tracking-tight mb-8 leading-[1.1]">
            감정 에피소드
            <br />
            <span className="text-white/40">타임라인</span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-xl mx-auto">
            감정적 경험은 일련의 단계를 거치며 전개됩니다.
            <br />
            각 단계를 이해하면 더 큰 통제력을 얻을 수 있습니다.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase mb-4">Scroll</span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* Scroll Progress */}
      <ScrollProgress steps={timelineSteps} activeStep={activeStep} emotion={emotion} />

      {/* Steps */}
      {timelineSteps.map((step, index) => (
        <StepSection
          key={step.id}
          step={step}
          index={index}
          emotion={emotion}
          isActive={activeStep === index}
        />
      ))}

      {/* Learn More Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-32">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <p className="text-[11px] tracking-[0.3em] text-white/30 uppercase mb-4">Learn More</p>
          <h2 className="text-3xl md:text-4xl text-white/90 font-light">더 알아보기</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
          {learnMoreCards.map((card, i) => (
            <motion.button
              key={card.id}
              onClick={card.onClick}
              className="group p-8 md:p-10 text-left border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: emotion?.color }} />
              </div>
              <h3 className="text-lg text-white/80 mb-2">{card.title}</h3>
              <p className="text-[11px] tracking-[0.2em] text-white/30 uppercase">{card.sub}</p>
            </motion.button>
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-24" />
      </section>

      {/* Modals */}
      <AnimatePresence>
        {showHowModal && <HowDoesThisHappenModal isOpen={showHowModal} onClose={() => setShowHowModal(false)} emotion={emotion} />}
        {showTriggersModal && <TriggersResponsesModal isOpen={showTriggersModal} onClose={() => setShowTriggersModal(false)} emotion={emotion} emotionData={emotionData} />}
        {showSignalModal && <SignalMessageModal isOpen={showSignalModal} onClose={() => setShowSignalModal(false)} emotion={emotion} emotionData={emotionData} />}
        {showMoodsModal && <MoodsModal isOpen={showMoodsModal} onClose={() => setShowMoodsModal(false)} emotion={emotion} />}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
