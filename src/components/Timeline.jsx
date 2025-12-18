import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder, emotionTriggersResponses } from '../data/emotions';

// ============================================
// TIMELINE - PR #13 Premium Dark Mode Cinematic
// 극도의 미니멀리즘 + 시네마틱 스크롤
// ============================================

// 5단계 타임라인 데이터
const STEPS = [
  { id: 1, ko: '사전 조건', en: 'PRE-CONDITION', short: '과거와 현재가 반응을 형성합니다' },
  { id: 2, ko: '이벤트', en: 'EVENT', short: '세상에서 무언가가 일어납니다' },
  { id: 3, ko: '트리거', en: 'TRIGGER', short: '밀리초 안에 감정이 활성화됩니다' },
  { id: 4, ko: '경험', en: 'EXPERIENCE', short: '몸과 마음에서 감정을 느낍니다' },
  { id: 5, ko: '반응', en: 'RESPONSE', short: '선택의 순간입니다' },
];

// 시네마틱 스텝 컴포넌트 (100vh 풀스크린)
const CinematicStep = ({ step, emotion, index }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="h-screen w-full flex items-center justify-center relative"
      style={{ background: '#1a1a1a' }}
    >
      {/* 배경 대형 숫자 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <span
          className="text-[35vw] md:text-[40vw] font-thin"
          style={{
            fontFamily: 'Georgia, serif',
            color: emotion?.color || '#fff',
            opacity: 0.04,
          }}
        >
          {String(step.id).padStart(2, '0')}
        </span>
      </motion.div>

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center px-8 max-w-3xl">
        {/* Step 라벨 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[11px] tracking-[0.5em] uppercase mb-8"
          style={{ color: emotion?.color || '#888' }}
        >
          Step {String(step.id).padStart(2, '0')}
        </motion.p>

        {/* 한글 제목 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight mb-4"
          style={{ fontFamily: 'Georgia, serif', color: '#f0f0f0' }}
        >
          {step.ko}
        </motion.h2>

        {/* 영문 서브타이틀 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs tracking-[0.4em] uppercase mb-12"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {step.en}
        </motion.p>

        {/* 짧은 설명 */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl font-light"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {step.short}
        </motion.p>

        {/* 악센트 라인 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 mx-auto h-px w-16"
          style={{ background: emotion?.color || '#fff' }}
        />
      </div>
    </section>
  );
};

// Learn More 다크 모달
const LearnMoreModal = ({ isOpen, onClose, emotion }) => {
  if (!isOpen) return null;

  const fullSteps = [
    { id: 1, ko: '사전 조건', en: 'PRE-CONDITION' },
    { id: 2, ko: '이벤트', en: 'EVENT' },
    { id: 3, ko: '트리거', en: 'TRIGGER' },
    { id: 4, ko: '지각 데이터베이스', en: 'PERCEPTUAL DATABASE' },
    { id: 5, ko: '신체적 변화', en: 'PHYSICAL CHANGES' },
    { id: 6, ko: '상태', en: 'STATE' },
    { id: 7, ko: '심리적 변화', en: 'PSYCHOLOGICAL CHANGES' },
    { id: 8, ko: '행동', en: 'ACTION' },
    { id: 9, ko: '사후 조건', en: 'POST-CONDITION' },
    { id: 10, ko: '선택적 필터 기간', en: 'REFRACTORY PERIOD' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 배경 */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)' }}
        onClick={onClose}
      />

      {/* 모달 */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-auto"
        style={{
          background: 'linear-gradient(180deg, #1f1f1f 0%, #151515 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
        }}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        {/* 헤더 */}
        <div className="sticky top-0 z-10 px-8 py-6 border-b border-white/10 flex justify-between items-center"
          style={{ background: 'rgba(21,21,21,0.95)', backdropFilter: 'blur(10px)' }}>
          <div>
            <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-1">Emotional Episode</p>
            <h3 className="text-xl text-white/90 font-light" style={{ fontFamily: 'Georgia, serif' }}>
              타임라인 전체 과정
            </h3>
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

        {/* 콘텐츠 */}
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {fullSteps.map((step, i) => (
              <motion.div
                key={step.id}
                className="p-4 border border-white/5 hover:border-white/15 transition-all group"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <span
                  className="text-2xl font-extralight text-white/10 group-hover:text-white/20 transition-colors block mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {String(step.id).padStart(2, '0')}
                </span>
                <p className="text-white/70 text-sm font-medium">{step.ko}</p>
                <p className="text-[9px] tracking-[0.15em] text-white/30 uppercase mt-1">{step.en}</p>
              </motion.div>
            ))}
          </div>

          {/* 인용구 */}
          <div className="mt-8 p-6 border border-white/5 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-white/50 font-light" style={{ fontFamily: 'Georgia, serif' }}>
              "감정은 선택하지 않지만, <span className="text-white/80">반응은 선택</span>할 수 있습니다."
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 하단 감정 Pill 선택기
const EmotionPills = ({ current, onSelect, emotion }) => (
  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
    {emotionOrder.map((id) => {
      const em = emotions[id];
      const isActive = current === id;
      return (
        <motion.button
          key={id}
          onClick={() => onSelect(id)}
          className="flex items-center gap-2 px-3 py-2 rounded-full transition-all"
          style={{
            background: isActive ? em.color : 'rgba(255,255,255,0.05)',
            border: `1px solid ${isActive ? em.color : 'rgba(255,255,255,0.1)'}`,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: isActive ? '#fff' : em.color }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}
          >
            {em.name_ko}
          </span>
        </motion.button>
      );
    })}
  </div>
);

// 메인 Timeline 컴포넌트
const Timeline = ({ selectedEmotion }) => {
  const [currentEmotionId, setCurrentEmotionId] = useState(selectedEmotion || 'fear');
  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    if (selectedEmotion) setCurrentEmotionId(selectedEmotion);
  }, [selectedEmotion]);

  const emotion = emotions[currentEmotionId];

  return (
    <div className="bg-[#1a1a1a]">
      {/* 히어로 섹션 */}
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
            style={{ fontFamily: 'Georgia, serif', color: '#f0f0f0' }}
          >
            감정 에피소드
          </h1>

          <p className="text-lg md:text-xl font-light mb-12" style={{ color: 'rgba(255,255,255,0.4)' }}>
            각 단계를 이해하면 더 큰 통제력을 얻습니다
          </p>

          {/* Learn More 버튼 */}
          <motion.button
            onClick={() => setShowLearnMore(true)}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
            }}
            whileHover={{
              background: 'rgba(255,255,255,0.1)',
              borderColor: 'rgba(255,255,255,0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Learn More</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* 스크롤 힌트 */}
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
            <span className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* 시네마틱 스텝들 */}
      {STEPS.map((step, index) => (
        <CinematicStep key={step.id} step={step} emotion={emotion} index={index} />
      ))}

      {/* 마지막 섹션 */}
      <section className="h-screen flex flex-col items-center justify-center px-8" style={{ background: '#1a1a1a' }}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p
            className="text-2xl md:text-3xl font-light mb-8"
            style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.6)' }}
          >
            "감정은 선택하지 않지만,<br />
            <span style={{ color: '#f0f0f0' }}>반응은 선택</span>할 수 있습니다."
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>— Paul Ekman</p>
        </motion.div>
      </section>

      {/* 감정 선택기 */}
      <EmotionPills current={currentEmotionId} onSelect={setCurrentEmotionId} emotion={emotion} />

      {/* Learn More 모달 */}
      <AnimatePresence>
        {showLearnMore && (
          <LearnMoreModal isOpen={showLearnMore} onClose={() => setShowLearnMore(false)} emotion={emotion} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
