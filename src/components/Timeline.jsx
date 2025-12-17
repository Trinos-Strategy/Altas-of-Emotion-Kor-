import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions, emotionOrder, emotionTriggersResponses } from '../data/emotions';

// ============================================
// LUXURY TIMELINE - 2025 Premium Design
// Inspired by: Louis Vuitton, Hermès, Apple, Stripe
// ============================================

// Premium Color Palette
const COLORS = {
  primary: '#000000',
  secondary: '#F8F9FA',
  accent: '#C9A227', // Luxury Gold
  text: '#1A1A1A',
  textLight: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
};

// ============================================
// HOW DOES THIS HAPPEN Modal - Premium Style
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ borderRadius: '2px' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <div className="px-16 py-10 flex items-center justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">How Does This Happen?</p>
              <h2 className="text-3xl font-light text-gray-900 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                어떻게 이런 일이 일어나는가
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-300"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-16 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <div className="p-8 border border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
                  style={{ borderRadius: '2px' }}>
                  <div className="flex items-start gap-6">
                    <span className="text-4xl font-light text-gray-200 group-hover:text-gray-900 transition-colors duration-300"
                      style={{ fontFamily: 'Georgia, serif' }}>
                      {String(step.id).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-1">{step.name_ko}</h4>
                      <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">{step.name_en}</p>
                      <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Insight */}
          <div className="mt-16 p-12 bg-gray-50 text-center" style={{ borderRadius: '2px' }}>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Key Insight</p>
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
              "감정은 선택하지 않지만, <span className="text-gray-900 font-medium">반응은 선택</span>할 수 있습니다."
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// Triggers & Responses Modal
// ============================================
const TriggersResponsesModal = ({ isOpen, onClose, emotion, emotionData }) => {
  if (!isOpen || !emotionData) return null;

  const getTypeStyle = (type) => {
    switch (type) {
      case 'constructive': return { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' };
      case 'destructive': return { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' };
      default: return { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' };
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        style={{ borderRadius: '2px' }}
      >
        <div className="px-16 py-10 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">Triggers & Responses</p>
            <h2 className="text-3xl font-light text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              트리거와 반응
            </h2>
            <p className="text-gray-400 mt-2">{emotion?.name_ko} • {emotion?.name_en}</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-16 space-y-16">
          {/* Triggers */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-8">Triggers — 트리거</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {emotionData.triggers?.map((trigger, i) => (
                <div key={i} className="p-6 border border-gray-100 hover:border-gray-300 transition-colors" style={{ borderRadius: '2px' }}>
                  <p className="text-gray-700">{trigger.text_ko}</p>
                  <p className="text-gray-400 text-sm mt-2">{trigger.text_en}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Intrinsic Actions */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-8">Intrinsic Actions — 본능적 반응</h3>
            <div className="flex flex-wrap gap-3">
              {emotionData.intrinsicActions?.map((action, i) => {
                const style = getTypeStyle(action.type);
                return (
                  <span key={i} className="px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
                    style={{ backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}`, borderRadius: '2px' }}>
                    {action.text_ko}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Intentional Actions */}
          <div>
            <h3 className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-8">Intentional Actions — 의도적 반응</h3>
            <div className="flex flex-wrap gap-3">
              {emotionData.intentionalActions?.map((action, i) => {
                const style = getTypeStyle(action.type);
                return (
                  <span key={i} className="px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
                    style={{ backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}`, borderRadius: '2px' }}>
                    {action.text_ko}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-8 pt-8 border-t border-gray-100">
            <span className="text-xs text-gray-400 uppercase tracking-wider">Legend</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-100 border border-green-200" style={{ borderRadius: '1px' }} />
              <span className="text-sm text-gray-500">건설적</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-red-100 border border-red-200" style={{ borderRadius: '1px' }} />
              <span className="text-sm text-gray-500">파괴적</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-100 border border-amber-200" style={{ borderRadius: '1px' }} />
              <span className="text-sm text-gray-500">상황에 따라</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// Signal & Message Modal
// ============================================
const SignalMessageModal = ({ isOpen, onClose, emotion, emotionData }) => {
  if (!isOpen || !emotionData) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

      <motion.div
        className="relative w-full max-w-2xl bg-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        style={{ borderRadius: '2px' }}
      >
        <div className="px-16 py-10 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">Signal & Message</p>
            <h2 className="text-3xl font-light text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>신호와 메시지</h2>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-16 space-y-12">
          <div>
            <h3 className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">Signal — 신호</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{emotionData.signal?.text_ko}</p>
            <p className="text-gray-400 mt-3">{emotionData.signal?.text_en}</p>
          </div>

          <div className="p-10 bg-gray-50 text-center" style={{ borderRadius: '2px' }}>
            <h3 className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">Message — 메시지</h3>
            <p className="text-2xl text-gray-900 font-light" style={{ fontFamily: 'Georgia, serif' }}>
              "{emotionData.message?.text_ko}"
            </p>
            <p className="text-gray-400 mt-4">"{emotionData.message?.text_en}"</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// Moods Modal
// ============================================
const MoodsModal = ({ isOpen, onClose, emotion }) => {
  if (!isOpen) return null;

  const moodsData = {
    anger: { mood_ko: "짜증나는", mood_en: "Irritable", trait_ko: "적대적인", trait_en: "Hostile", psycho: ["간헐적 폭발 장애", "만성 적대감"] },
    fear: { mood_ko: "불안한", mood_en: "Apprehensive", trait_ko: "소심한", trait_en: "Timid", psycho: ["사회불안장애", "PTSD", "공황장애"] },
    disgust: { mood_ko: "까다로운", mood_en: "Sour", trait_ko: "예민한", trait_en: "Squeamish", psycho: ["신경성 식욕부진증", "강박장애"] },
    sadness: { mood_ko: "우울한", mood_en: "Dysphoric", trait_ko: "비관적인", trait_en: "Pessimistic", psycho: ["주요우울장애", "지속성우울장애"] },
    enjoyment: { mood_ko: "들뜬", mood_en: "Elated", trait_ko: "낙관적인", trait_en: "Optimistic", psycho: ["조증 삽화"] }
  };

  const data = moodsData[emotion?.id] || moodsData.anger;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

      <motion.div
        className="relative w-full max-w-2xl bg-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        style={{ borderRadius: '2px' }}
      >
        <div className="px-16 py-10 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-3">Moods & Psychopathology</p>
            <h2 className="text-3xl font-light text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>기분과 정신병리</h2>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-16 space-y-10">
          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 border border-gray-100" style={{ borderRadius: '2px' }}>
              <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">Mood — 기분</p>
              <p className="text-2xl font-light text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>{data.mood_ko}</p>
              <p className="text-gray-400 mt-2">{data.mood_en}</p>
            </div>
            <div className="p-8 border border-gray-100" style={{ borderRadius: '2px' }}>
              <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">Trait — 성격</p>
              <p className="text-2xl font-light text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>{data.trait_ko}</p>
              <p className="text-gray-400 mt-2">{data.trait_en}</p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-6">Psychopathology — 정신병리</p>
            <div className="flex flex-wrap gap-3">
              {data.psycho.map((item, i) => (
                <span key={i} className="px-5 py-2.5 bg-gray-50 text-gray-700 text-sm border border-gray-100" style={{ borderRadius: '2px' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 bg-amber-50 border border-amber-100" style={{ borderRadius: '2px' }}>
            <p className="text-sm text-amber-800">
              이 정보는 교육 목적으로 제공됩니다. 정신 건강 관련 우려가 있다면 전문가와 상담하세요.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// Main Timeline Component - Luxury Design
// ============================================
const Timeline = ({ selectedEmotion }) => {
  const [currentEmotionId, setCurrentEmotionId] = useState(selectedEmotion || 'anger');
  const [showHowModal, setShowHowModal] = useState(false);
  const [showTriggersModal, setShowTriggersModal] = useState(false);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [showMoodsModal, setShowMoodsModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (selectedEmotion) setCurrentEmotionId(selectedEmotion);
  }, [selectedEmotion]);

  const emotion = emotions[currentEmotionId];
  const emotionData = emotionTriggersResponses?.[currentEmotionId];

  const timelineSteps = [
    { id: 1, name_ko: '사전 조건', name_en: 'PRE-CONDITION', desc: '과거 경험과 현재 상태' },
    { id: 2, name_ko: '이벤트', name_en: 'EVENT', desc: '외부 또는 내부 자극' },
    { id: 3, name_ko: '트리거', name_en: 'TRIGGER', desc: '자동 평가와 매칭' },
    { id: 4, name_ko: '경험', name_en: 'EXPERIENCE', desc: '신체적·심리적 변화' },
    { id: 5, name_ko: '반응', name_en: 'RESPONSE', desc: '건설적 또는 파괴적' },
  ];

  const learnMoreCards = [
    { id: 'how', title: '어떻게 이런 일이?', subtitle: 'How Does This Happen?', desc: '10단계 감정 프로세스', onClick: () => setShowHowModal(true) },
    { id: 'triggers', title: '트리거와 반응', subtitle: 'Triggers & Responses', desc: '무엇이 감정을 유발하는가', onClick: () => setShowTriggersModal(true) },
    { id: 'signal', title: '신호와 메시지', subtitle: 'Signal & Message', desc: '감정이 전달하는 것', onClick: () => setShowSignalModal(true) },
    { id: 'moods', title: '기분과 정신병리', subtitle: 'Moods & Psychopathology', desc: '감정의 지속 상태', onClick: () => setShowMoodsModal(true) },
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header with Emotion Selector */}
        <motion.div
          className="pt-24 pb-8 flex items-center justify-between border-b border-gray-100"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase">Emotional Episode</p>
          </div>

          {/* Emotion Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-6 py-3 border border-gray-200 hover:border-gray-400 transition-colors duration-300"
              style={{ borderRadius: '2px' }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: emotion?.color }} />
              <span className="text-sm font-medium text-gray-700">{emotion?.name_ko}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-xl z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ borderRadius: '2px', minWidth: '180px' }}
                >
                  {emotionOrder.map((id) => (
                    <button
                      key={id}
                      onClick={() => { setCurrentEmotionId(id); setDropdownOpen(false); }}
                      className={`w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors ${currentEmotionId === id ? 'bg-gray-50' : ''}`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: emotions[id].color }} />
                      <span className="text-sm text-gray-700">{emotions[id].name_ko}</span>
                      <span className="text-xs text-gray-400 ml-auto">{emotions[id].name_en}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          className="py-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="text-5xl lg:text-7xl font-light text-gray-900 tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            감정 에피소드 타임라인
          </h1>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gray-300" />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.accent }} />
            <div className="w-16 h-px bg-gray-300" />
          </div>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            감정적 경험은 일련의 단계를 거칩니다.<br />
            각 단계를 이해하면 더 큰 통제력을 얻을 수 있습니다.
          </p>

          {/* Learn More Button */}
          <motion.button
            onClick={() => setShowHowModal(true)}
            className="mt-12 inline-flex items-center gap-3 px-10 py-4 border border-gray-900 text-gray-900 text-sm font-medium tracking-wider uppercase hover:bg-gray-900 hover:text-white transition-all duration-300"
            style={{ borderRadius: '2px' }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Learn More</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* 5-Step Timeline */}
        <motion.div
          className="py-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative flex items-stretch justify-between">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2 z-0" />

              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative z-10 flex-1 px-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <div className="group bg-white border border-gray-100 p-8 text-center hover:border-gray-300 hover:shadow-xl transition-all duration-500 cursor-pointer"
                    style={{ borderRadius: '2px' }}>
                    {/* Step Number */}
                    <div className="text-5xl font-light text-gray-100 group-hover:text-gray-200 transition-colors mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                      {String(step.id).padStart(2, '0')}
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{step.name_ko}</h3>
                    <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">{step.name_en}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-500">{step.desc}</p>

                    {/* Accent Dot */}
                    <div className="mt-6 w-2 h-2 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: emotion?.color }} />
                  </div>

                  {/* Arrow */}
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300 z-20">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-4">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-start gap-6 p-6 border border-gray-100"
                style={{ borderRadius: '2px' }}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="text-3xl font-light text-gray-200" style={{ fontFamily: 'Georgia, serif' }}>
                  {String(step.id).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{step.name_ko}</h3>
                  <p className="text-xs tracking-[0.15em] text-gray-400 uppercase mt-1">{step.name_en}</p>
                  <p className="text-sm text-gray-500 mt-3">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learn More Section */}
        <motion.div
          className="py-24 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Explore Further</p>
            <h2 className="text-3xl font-light text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>더 알아보기</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learnMoreCards.map((card, index) => (
              <motion.button
                key={card.id}
                onClick={card.onClick}
                className="group text-left p-10 border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-500"
                style={{ borderRadius: '2px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Icon placeholder */}
                <div className="w-12 h-12 border border-gray-200 group-hover:border-gray-400 flex items-center justify-center mb-8 transition-colors" style={{ borderRadius: '2px' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: emotion?.color }} />
                </div>

                <h4 className="text-lg font-medium text-gray-900 mb-2">{card.title}</h4>
                <p className="text-xs tracking-[0.15em] text-gray-400 uppercase mb-4">{card.subtitle}</p>
                <p className="text-sm text-gray-500 mb-8">{card.desc}</p>

                <span className="inline-flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-900 transition-colors">
                  <span>더 보기</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bottom Spacer */}
        <div className="h-24" />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showHowModal && <HowDoesThisHappenModal isOpen={showHowModal} onClose={() => setShowHowModal(false)} emotion={emotion} />}
        {showTriggersModal && <TriggersResponsesModal isOpen={showTriggersModal} onClose={() => setShowTriggersModal(false)} emotion={emotion} emotionData={emotionData} />}
        {showSignalModal && <SignalMessageModal isOpen={showSignalModal} onClose={() => setShowSignalModal(false)} emotion={emotion} emotionData={emotionData} />}
        {showMoodsModal && <MoodsModal isOpen={showMoodsModal} onClose={() => setShowMoodsModal(false)} emotion={emotion} />}
      </AnimatePresence>
    </section>
  );
};

export default Timeline;
