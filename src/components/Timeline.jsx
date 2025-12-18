import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';
import { emotionalEpisodeTimelineDetailed } from '../data/additionalData';

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

// Learn More 라이트 모달 - 10단계 상세 설명 포함 (가독성 개선)
const LearnMoreModal = ({ isOpen, onClose, emotion }) => {
  const [selectedStep, setSelectedStep] = useState(null);

  if (!isOpen) return null;

  const steps = emotionalEpisodeTimelineDetailed.steps;

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
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      />

      {/* 모달 - 흰색 배경으로 변경 */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
      >
        {/* 헤더 - 라이트 테마 */}
        <div className="sticky top-0 z-10 px-8 py-6 border-b border-gray-200 flex justify-between items-center"
          style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(10px)' }}>
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase mb-1" style={{ color: emotion?.color || '#666' }}>
              Emotional Episode Timeline
            </p>
            <h3 className="text-xl text-gray-900 font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
              감정 에피소드의 10단계
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 콘텐츠 - 라이트 테마 */}
        <div className="p-8">
          {/* 설명 */}
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            {emotionalEpisodeTimelineDetailed.description_ko}
          </p>

          {/* 10단계 그리드 - 라이트 테마 */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {steps.map((step, i) => (
              <motion.button
                key={step.id}
                onClick={() => setSelectedStep(selectedStep?.id === step.id ? null : step)}
                className={`p-4 rounded-xl border transition-all group text-left ${
                  selectedStep?.id === step.id
                    ? 'border-gray-300 bg-gray-50 shadow-md'
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50 bg-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <span
                  className={`text-2xl font-extralight block mb-2 transition-colors`}
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: selectedStep?.id === step.id ? (emotion?.color || '#333') : '#ddd'
                  }}
                >
                  {String(step.id).padStart(2, '0')}
                </span>
                <p className="text-gray-800 text-sm font-medium">{step.name_ko}</p>
                <p className="text-[9px] tracking-[0.15em] text-gray-400 uppercase mt-1">{step.name_en}</p>
              </motion.button>
            ))}
          </div>

          {/* 선택된 단계 상세 설명 - 라이트 테마 */}
          <AnimatePresence mode="wait">
            {selectedStep && (
              <motion.div
                key={selectedStep.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 border border-gray-200 rounded-xl mb-8 bg-gradient-to-br from-white to-gray-50 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-4xl font-extralight"
                    style={{ fontFamily: 'Georgia, serif', color: emotion?.color || '#666' }}
                  >
                    {String(selectedStep.id).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h4 className="text-lg text-gray-900 font-semibold mb-1">{selectedStep.name_ko}</h4>
                    <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-4">{selectedStep.name_en}</p>
                    <p className="text-gray-700 leading-relaxed">{selectedStep.description_ko}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 단계 선택 안내 - 라이트 테마 */}
          {!selectedStep && (
            <div className="p-6 border border-gray-100 rounded-xl text-center mb-8 bg-gray-50">
              <p className="text-gray-500 text-sm">
                위의 단계를 클릭하여 상세 설명을 확인하세요
              </p>
            </div>
          )}

          {/* 인용구 - 라이트 테마 */}
          <div className="p-6 border border-gray-100 rounded-xl text-center bg-gradient-to-r from-gray-50 to-white">
            <p className="text-gray-600 font-light" style={{ fontFamily: 'Georgia, serif' }}>
              "감정은 선택하지 않지만, <span className="text-gray-900 font-medium">반응은 선택</span>할 수 있습니다."
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
