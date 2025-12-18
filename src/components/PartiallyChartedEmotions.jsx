import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { partiallyChartedEmotions } from '../data/additionalData';

// ============================================
// 탐험 섹션 - Premium 2025 UX/UI 디자인
// 타임라인, 경험 섹션과 동일한 수준의 고급스러운 스타일
// ============================================

// 개별 감정 카드 컴포넌트
const EmotionCard = ({ emotion, index, isSelected, onSelect }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        onClick={() => onSelect(isSelected ? null : emotion)}
        className={`
          relative w-full p-6 md:p-8 rounded-3xl text-left transition-all duration-500
          backdrop-blur-xl border overflow-hidden group
          ${isSelected
            ? 'bg-white/90 border-white/60 shadow-2xl scale-[1.02]'
            : 'bg-white/40 border-white/30 hover:bg-white/60 hover:border-white/50 hover:shadow-xl'}
        `}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* 배경 글로우 효과 */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${emotion.color}15 0%, transparent 70%)`
          }}
        />

        {/* 상단 악센트 라인 */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: emotion.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isSelected ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        <div className="relative z-10">
          {/* 이모션 아이콘 */}
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${emotion.color} 0%, ${emotion.color}dd 100%)`,
                boxShadow: `0 8px 32px ${emotion.color}40`
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-2xl md:text-3xl text-white font-bold">
                {emotion.name_ko.charAt(0)}
              </span>
            </motion.div>

            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1"
                  style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                {emotion.name_ko}
              </h3>
              <p className="text-xs tracking-[0.2em] text-gray-400 uppercase">
                {emotion.name_en}
              </p>
            </div>

            {/* 화살표 아이콘 */}
            <motion.div
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              animate={{ rotate: isSelected ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>

          {/* 확장된 설명 */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-200/50">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {emotion.description_ko}
                  </p>
                  <p className="text-gray-500 leading-relaxed text-xs md:text-sm mt-3 italic">
                    {emotion.description_en}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.div>
  );
};

// 정보 팝업 컴포넌트
const InfoPopup = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="mt-6 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl max-w-2xl mx-auto"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 font-semibold mb-2">과학적 합의 기준</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Atlas of Emotions는 248명의 감정 과학자들을 대상으로 한 설문조사를 기반으로 합니다.
              5가지 핵심 감정(분노, 두려움, 혐오, 슬픔, 즐거움)은 <strong>76% 이상</strong>의 과학자들이
              보편적 감정으로 동의했습니다. 반면, 아래의 감정들은 <strong>50% 이하</strong>의 합의를 얻어
              "부분적으로 탐구된" 감정으로 분류됩니다.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// 메인 컴포넌트
const PartiallyChartedEmotions = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const heroRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(scrollY / docHeight, 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 스크롤 진행 표시 */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 z-50"
        style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
      />

      {/* 프리미엄 배경 */}
      <div className="fixed inset-0 -z-10">
        {/* 메인 그라디언트 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/40" />

        {/* 동적 블롭들 */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 6,
          }}
        />

        {/* 노이즈 오버레이 */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* 히어로 섹션 */}
      <section ref={heroRef} className="relative pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 라벨 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.5em] uppercase text-purple-500 mb-6"
          >
            Partially Charted Emotions
          </motion.p>

          {/* 메인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6"
            style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
          >
            탐험하는 감정들
          </motion.h1>

          {/* 서브타이틀 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            아직 완전히 탐구되지 않았지만,<br className="hidden md:block" />
            우리의 감정 경험에서 중요한 역할을 하는 9가지 감정
          </motion.p>

          {/* 정보 버튼 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setShowInfo(!showInfo)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-lg border border-white/50 text-gray-600 text-sm font-medium hover:bg-white/80 hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            왜 "부분적으로 탐구된" 감정인가요?
          </motion.button>

          <InfoPopup isOpen={showInfo} onClose={() => setShowInfo(false)} />
        </div>
      </section>

      {/* 감정 카드 그리드 */}
      <section className="relative px-4 md:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {partiallyChartedEmotions.map((emotion, index) => (
              <EmotionCard
                key={emotion.id}
                emotion={emotion}
                index={index}
                isSelected={selectedEmotion?.id === emotion.id}
                onSelect={setSelectedEmotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 하단 인용구 섹션 */}
      <section className="relative py-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="p-8 md:p-12 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-xl">
            <svg className="w-10 h-10 mx-auto mb-6 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p
              className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6"
              style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
            >
              감정의 세계는 아직 탐험 중입니다.<br />
              <span className="text-gray-900 font-medium">열린 마음</span>으로 새로운 감정을 발견하세요.
            </p>
            <p className="text-sm text-gray-400">— Atlas of Emotions</p>
          </div>
        </motion.div>
      </section>

      {/* 통계 섹션 */}
      <section className="relative py-16 px-4 md:px-8 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-8 text-center"
          >
            <div>
              <p className="text-3xl md:text-4xl font-light text-purple-600 mb-2">9</p>
              <p className="text-sm text-gray-500">탐험 중인 감정</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-light text-pink-500 mb-2">&lt;50%</p>
              <p className="text-sm text-gray-500">과학자 합의율</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-light text-indigo-500 mb-2">248</p>
              <p className="text-sm text-gray-500">참여 과학자</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartiallyChartedEmotions;
