import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder, emotionTriggersResponses } from '../data/emotions';

// ============================================
// TIMELINE 2025 - Ultra Premium Cinematic Design
// Inspired by: Apple, Louis Vuitton, Awwwards Winners
// ============================================

// Cinematic Step Component - 100vh Full Screen
const CinematicStep = ({ step, emotion, index }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5, rootMargin: '-10% 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* Background Number - Massive */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.03 : 0 }}
        transition={{ duration: 1.2 }}
      >
        <span
          className="text-[40vw] font-thin tracking-tighter"
          style={{
            fontFamily: 'Georgia, serif',
            color: emotion?.color || '#fff',
          }}
        >
          {String(step.id).padStart(2, '0')}
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Step Number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <span
            className="text-sm tracking-[0.5em] uppercase"
            style={{ color: emotion?.color || '#888' }}
          >
            Step {String(step.id).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Korean Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight mb-4"
          style={{
            fontFamily: 'Georgia, serif',
            color: '#f0f0f0',
            lineHeight: 1.1,
          }}
        >
          {step.name_ko}
        </motion.h2>

        {/* English Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs tracking-[0.4em] uppercase mb-12"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {step.name_en}
        </motion.p>

        {/* Minimal Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl font-light max-w-xl mx-auto"
          style={{
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8,
          }}
        >
          {step.desc}
        </motion.p>

        {/* Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 mx-auto h-px w-24"
          style={{
            background: `linear-gradient(90deg, transparent, ${emotion?.color || '#fff'}, transparent)`,
          }}
        />
      </div>

      {/* Scroll Hint (only first step) */}
      {index === 0 && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

// Premium Modal Component
const PremiumModal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(20px)',
        }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[85vh] mx-4 overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'linear-gradient(145deg, rgba(30,30,30,0.95), rgba(20,20,20,0.98))',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '2px',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-10 py-8 border-b border-white/5 flex justify-between items-start"
          style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(10px)' }}>
          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-2">{subtitle}</p>
            <h3 className="text-2xl font-light text-white/90" style={{ fontFamily: 'Georgia, serif' }}>{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(85vh-100px)]">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// How Does This Happen Modal Content
const HowModal = ({ isOpen, onClose, emotion }) => {
  const steps = [
    { id: 1, ko: "사전 조건", en: "PRE-CONDITION", desc: "과거 경험과 현재 상태가 반응을 형성" },
    { id: 2, ko: "이벤트", en: "EVENT", desc: "외부 또는 내부 자극 발생" },
    { id: 3, ko: "트리거", en: "TRIGGER", desc: "무의식적 자동 평가" },
    { id: 4, ko: "데이터베이스", en: "DATABASE", desc: "감정 기억과 매칭" },
    { id: 5, ko: "신체 변화", en: "PHYSICAL", desc: "자율신경계 반응" },
    { id: 6, ko: "상태", en: "STATE", desc: "감정 경험" },
    { id: 7, ko: "심리 변화", en: "PSYCHOLOGICAL", desc: "인지적 변화" },
    { id: 8, ko: "행동", en: "ACTION", desc: "외적 표현" },
    { id: 9, ko: "사후 조건", en: "POST-CONDITION", desc: "다음 에피소드에 영향" },
    { id: 10, ko: "선택적 필터", en: "FILTER", desc: "감정 일치 정보만 수용" },
  ];

  return (
    <PremiumModal isOpen={isOpen} onClose={onClose} title="어떻게 이런 일이 일어나는가" subtitle="How Does This Happen?">
      <div className="p-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 border border-white/5 hover:border-white/15 transition-all duration-300 group"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <span className="text-2xl font-extralight text-white/10 group-hover:text-white/20 transition-colors"
                style={{ fontFamily: 'Georgia, serif' }}>
                {String(step.id).padStart(2, '0')}
              </span>
              <h4 className="text-white/80 text-sm font-medium mt-3 mb-1">{step.ko}</h4>
              <p className="text-[9px] tracking-[0.2em] text-white/30 uppercase">{step.en}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 p-8 text-center border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <p className="text-white/50 text-lg font-light" style={{ fontFamily: 'Georgia, serif' }}>
            "감정은 선택하지 않지만, <span className="text-white/80">반응은 선택</span>할 수 있습니다."
          </p>
        </div>
      </div>
    </PremiumModal>
  );
};

// Triggers Modal
const TriggersModal = ({ isOpen, onClose, emotion, data }) => {
  if (!data) return null;

  const getTagColor = (type) => {
    switch (type) {
      case 'constructive': return 'bg-emerald-500/10 text-emerald-400/80 border-emerald-500/20';
      case 'destructive': return 'bg-rose-500/10 text-rose-400/80 border-rose-500/20';
      default: return 'bg-amber-500/10 text-amber-400/80 border-amber-500/20';
    }
  };

  return (
    <PremiumModal isOpen={isOpen} onClose={onClose} title="트리거와 반응" subtitle="Triggers & Responses">
      <div className="p-10 space-y-10">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-6">Triggers</p>
          <div className="grid md:grid-cols-2 gap-3">
            {data.triggers?.slice(0, 6).map((t, i) => (
              <div key={i} className="p-4 border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <p className="text-white/70 text-sm">{t.text_ko}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-6">Responses</p>
          <div className="flex flex-wrap gap-2">
            {data.intrinsicActions?.map((a, i) => (
              <span key={i} className={`px-4 py-2 text-xs border ${getTagColor(a.type)}`}>{a.text_ko}</span>
            ))}
            {data.intentionalActions?.map((a, i) => (
              <span key={`int-${i}`} className={`px-4 py-2 text-xs border ${getTagColor(a.type)}`}>{a.text_ko}</span>
            ))}
          </div>
        </div>
      </div>
    </PremiumModal>
  );
};

// Signal Modal
const SignalModal = ({ isOpen, onClose, emotion, data }) => {
  if (!data) return null;

  return (
    <PremiumModal isOpen={isOpen} onClose={onClose} title="신호와 메시지" subtitle="Signal & Message">
      <div className="p-10 space-y-10">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-4">Signal</p>
          <p className="text-white/60 leading-relaxed">{data.signal?.text_ko}</p>
        </div>
        <div className="p-10 text-center border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-4">Message</p>
          <p className="text-2xl text-white/80 font-light" style={{ fontFamily: 'Georgia, serif' }}>
            "{data.message?.text_ko}"
          </p>
        </div>
      </div>
    </PremiumModal>
  );
};

// Moods Modal
const MoodsModal = ({ isOpen, onClose, emotion }) => {
  const data = {
    anger: { mood: "짜증나는", trait: "적대적인", psycho: ["간헐적 폭발 장애"] },
    fear: { mood: "불안한", trait: "소심한", psycho: ["공황장애", "PTSD"] },
    disgust: { mood: "까다로운", trait: "예민한", psycho: ["강박장애"] },
    sadness: { mood: "우울한", trait: "비관적인", psycho: ["우울장애"] },
    enjoyment: { mood: "들뜬", trait: "낙관적인", psycho: ["조증"] }
  }[emotion?.id] || { mood: "-", trait: "-", psycho: [] };

  return (
    <PremiumModal isOpen={isOpen} onClose={onClose} title="기분과 정신병리" subtitle="Moods & Psychopathology">
      <div className="p-10">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-8 border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-3">Mood</p>
            <p className="text-xl text-white/80 font-light" style={{ fontFamily: 'Georgia, serif' }}>{data.mood}</p>
          </div>
          <div className="p-8 border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-3">Trait</p>
            <p className="text-xl text-white/80 font-light" style={{ fontFamily: 'Georgia, serif' }}>{data.trait}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-4">Psychopathology</p>
          <div className="flex flex-wrap gap-2">
            {data.psycho.map((p, i) => (
              <span key={i} className="px-4 py-2 text-sm text-white/50 border border-white/10">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </PremiumModal>
  );
};

// ============================================
// Main Timeline Component
// ============================================
const Timeline = ({ selectedEmotion }) => {
  const [currentEmotionId, setCurrentEmotionId] = useState(selectedEmotion || 'anger');
  const [activeModal, setActiveModal] = useState(null);
  const [pillOpen, setPillOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectedEmotion) setCurrentEmotionId(selectedEmotion);
  }, [selectedEmotion]);

  const emotion = emotions[currentEmotionId];
  const emotionData = emotionTriggersResponses?.[currentEmotionId];

  const steps = [
    { id: 1, name_ko: '사전 조건', name_en: 'PRE-CONDITION', desc: '과거의 경험과 현재의 기분이 우리의 반응을 형성합니다.' },
    { id: 2, name_ko: '이벤트', name_en: 'EVENT', desc: '세상에서 무언가가 일어나거나, 마음속에서 생각이 떠오릅니다.' },
    { id: 3, name_ko: '트리거', name_en: 'TRIGGER', desc: '밀리초 안에 무의식적으로 감정이 활성화됩니다.' },
    { id: 4, name_ko: '경험', name_en: 'EXPERIENCE', desc: '신체와 마음에서 감정을 느낍니다.' },
    { id: 5, name_ko: '반응', name_en: 'RESPONSE', desc: '건설적 또는 파괴적 방식으로 표현합니다.' },
  ];

  const cards = [
    { id: 'how', title: '어떻게', sub: 'How?', modal: 'how' },
    { id: 'triggers', title: '트리거', sub: 'Triggers', modal: 'triggers' },
    { id: 'signal', title: '신호', sub: 'Signal', modal: 'signal' },
    { id: 'moods', title: '기분', sub: 'Moods', modal: 'moods' },
  ];

  return (
    <div ref={containerRef} className="bg-[#0d0d0d]">
      {/* Fixed Emotion Selector */}
      <div className="fixed top-6 right-6 z-50">
        <div className="relative">
          <motion.button
            onClick={() => setPillOpen(!pillOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-white/20 transition-all"
            style={{ background: 'rgba(20,20,20,0.8)', backdropFilter: 'blur(10px)', borderRadius: '100px' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotion?.color }} />
            <span className="text-xs text-white/60">{emotion?.name_ko}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`text-white/30 transition-transform ${pillOpen ? 'rotate-180' : ''}`}>
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.button>

          <AnimatePresence>
            {pillOpen && (
              <motion.div
                className="absolute top-full right-0 mt-2 overflow-hidden"
                style={{ background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', minWidth: '140px' }}
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
              >
                {emotionOrder.map((id) => (
                  <button
                    key={id}
                    onClick={() => { setCurrentEmotionId(id); setPillOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-colors ${currentEmotionId === id ? 'bg-white/5' : ''}`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: emotions[id].color }} />
                    <span className="text-xs text-white/60">{emotions[id].name_ko}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center relative px-8">
        <motion.div
          className="text-center max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase mb-8"
            style={{ color: emotion?.color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Emotional Episode Timeline
          </motion.p>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-6"
            style={{ fontFamily: 'Georgia, serif', color: '#f0f0f0', lineHeight: 1.1 }}
          >
            감정 에피소드
          </h1>

          <p className="text-lg md:text-xl text-white/30 font-light max-w-md mx-auto">
            각 단계를 이해하면 더 큰 통제력을 얻습니다.
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Cinematic Steps */}
      {steps.map((step, index) => (
        <CinematicStep key={step.id} step={step} emotion={emotion} index={index} />
      ))}

      {/* Learn More Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 py-32">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] tracking-[0.5em] text-white/30 uppercase mb-4">Learn More</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-white/90" style={{ fontFamily: 'Georgia, serif' }}>
            더 알아보기
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
          {cards.map((card, i) => (
            <motion.button
              key={card.id}
              onClick={() => setActiveModal(card.modal)}
              className="group relative p-8 md:p-10 text-center border border-white/5 hover:border-white/15 transition-all duration-500"
              style={{ background: 'rgba(255,255,255,0.02)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, background: 'rgba(255,255,255,0.04)' }}
            >
              <div
                className="w-2 h-2 rounded-full mx-auto mb-6 opacity-50 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: emotion?.color }}
              />
              <h3 className="text-lg text-white/80 mb-1" style={{ fontFamily: 'Georgia, serif' }}>{card.title}</h3>
              <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase">{card.sub}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'how' && <HowModal isOpen={true} onClose={() => setActiveModal(null)} emotion={emotion} />}
        {activeModal === 'triggers' && <TriggersModal isOpen={true} onClose={() => setActiveModal(null)} emotion={emotion} data={emotionData} />}
        {activeModal === 'signal' && <SignalModal isOpen={true} onClose={() => setActiveModal(null)} emotion={emotion} data={emotionData} />}
        {activeModal === 'moods' && <MoodsModal isOpen={true} onClose={() => setActiveModal(null)} emotion={emotion} />}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
