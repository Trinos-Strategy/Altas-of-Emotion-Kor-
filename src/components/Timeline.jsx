import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';
import { emotionalEpisodeTimelineDetailed } from '../data/additionalData';

// 강제 재빌드 트리거 - 2025-12-19

// ============================================
// TIMELINE - 개선된 버전
// 10단계 상세 설명 포함 + 시네마틱 스크롤
// ============================================

// 5단계 메인 타임라인 데이터 (간략 버전)
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

/* 타임라인 모달 - 아코디언 방식으로 개선 */
// Learn More 라이트 모달 - 10단계 상세 설명 포함
const LearnMoreModal = ({ isOpen, onClose, emotion }) => {
  const [expandedStep, setExpandedStep] = useState(null);

  if (!isOpen) return null;

  const steps = emotionalEpisodeTimelineDetailed.steps;

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 배경 */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(12px)'
        }}
        onClick={onClose}
      />

      {/* 모달 */}
      <motion.div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: '24px',
          boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.08)'
        }}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        {/* 헤더 */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            padding: '24px 28px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '6px', color: emotion?.color || '#666' }}>
              Emotional Episode Timeline
            </p>
            <h3 style={{ fontSize: '22px', color: '#111827', fontWeight: '600', fontFamily: 'Georgia, serif', margin: 0 }}>
              감정 에피소드의 10단계
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 콘텐츠 */}
        <div style={{ padding: '28px' }}>
          {/* 설명 */}
          <p style={{ color: '#4b5563', fontSize: '16px', marginBottom: '28px', lineHeight: '1.8' }}>
            {emotionalEpisodeTimelineDetailed.description_ko}
          </p>

          {/* 10단계 아코디언 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {steps.map((step, i) => {
              const isExpanded = expandedStep === step.id;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  style={{
                    borderRadius: '16px',
                    border: isExpanded ? '2px solid #e5e7eb' : '1px solid #f3f4f6',
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    boxShadow: isExpanded ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {/* 단계 헤더 (클릭 가능) */}
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '24px',
                        fontWeight: '300',
                        fontFamily: 'Georgia, serif',
                        color: isExpanded ? (emotion?.color || '#333') : '#d1d5db',
                        minWidth: '36px',
                        transition: 'color 0.25s ease'
                      }}
                    >
                      {String(step.id).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#1f2937', fontSize: '16px', fontWeight: '600', margin: 0 }}>{step.name_ko}</p>
                      <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', margin: '4px 0 0' }}>{step.name_en}</p>
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* 확장된 설명 */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          padding: '0 24px 24px 76px',
                          borderTop: '1px solid #f3f4f6'
                        }}>
                          <p style={{
                            color: '#374151',
                            fontSize: '15px',
                            lineHeight: '1.8',
                            margin: '20px 0 0'
                          }}>
                            {step.description_ko}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* 인용구 */}
          <div style={{
            marginTop: '32px',
            padding: '28px',
            border: '1px solid #f3f4f6',
            borderRadius: '20px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f9fafb 0%, #fff 100%)'
          }}>
            <p style={{ color: '#4b5563', fontSize: '18px', fontWeight: '300', fontFamily: 'Georgia, serif', lineHeight: '1.7', margin: 0 }}>
              "감정은 선택하지 않지만, <span style={{ color: '#111827', fontWeight: '500' }}>반응은 선택</span>할 수 있습니다."
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

          <p className="text-xl md:text-2xl font-light tracking-wider mb-12" style={{ color: 'rgba(255,255,255,0.4)' }}>
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
            <span>10단계 상세 보기</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* 스크롤 힌트 - 더 눈에 띄게 */}
        <motion.div
          className="absolute bottom-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            {/* 스크롤 텍스트 - 더 크고 눈에 띄게 */}
            <span
              className="text-sm md:text-base font-medium tracking-[0.4em] uppercase mb-4"
              style={{
                color: emotion?.color || 'rgba(255,255,255,0.6)',
                textShadow: '0 0 20px rgba(255,255,255,0.3)'
              }}
            >
              Scroll
            </span>
            {/* 마우스 아이콘 */}
            <motion.div
              className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
              style={{ borderColor: emotion?.color || 'rgba(255,255,255,0.4)' }}
            >
              <motion.div
                className="w-1.5 h-3 rounded-full"
                style={{ background: emotion?.color || 'rgba(255,255,255,0.6)' }}
                animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            {/* 아래 화살표 */}
            <motion.svg
              className="w-6 h-6 mt-3"
              fill="none"
              stroke={emotion?.color || 'rgba(255,255,255,0.4)'}
              viewBox="0 0 24 24"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
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
