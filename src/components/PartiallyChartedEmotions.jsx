import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { partiallyChartedEmotions } from '../data/additionalData';

// ============================================
// 탐험 섹션 - 2025 Ultra Premium Interactive Design
// 3D 효과, 패럴랙스, 마이크로 인터랙션, 고급 애니메이션
// ============================================

// 마우스 추적 3D 카드 컴포넌트
const Card3D = ({ emotion, index, isSelected, onSelect }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        onClick={() => onSelect(isSelected ? null : emotion)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="relative cursor-pointer"
        whileTap={{ scale: 0.98 }}
      >
        {/* 글로우 이펙트 */}
        <motion.div
          className="absolute -inset-1 rounded-3xl opacity-0"
          style={{
            background: `linear-gradient(135deg, ${emotion.color}60 0%, ${emotion.color}20 50%, ${emotion.color}60 100%)`,
            filter: 'blur(20px)',
          }}
          animate={{ opacity: isHovered || isSelected ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* 메인 카드 */}
        <div
          className={`
            relative overflow-hidden rounded-3xl p-8 md:p-10 lg:p-12
            backdrop-blur-xl border transition-all duration-500
            ${isSelected
              ? 'bg-white/95 border-white/80 shadow-2xl'
              : 'bg-white/60 border-white/40 hover:bg-white/80 hover:border-white/60'}
          `}
          style={{
            boxShadow: isSelected
              ? `0 30px 60px -15px ${emotion.color}40, 0 0 0 1px ${emotion.color}30`
              : isHovered
                ? `0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px ${emotion.color}20`
                : '0 10px 40px -15px rgba(0,0,0,0.1)',
          }}
        >
          {/* 상단 그라데이션 악센트 */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
            style={{
              background: `linear-gradient(90deg, ${emotion.color} 0%, ${emotion.color}80 50%, ${emotion.color} 100%)`
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isSelected || isHovered ? 1 : 0,
              opacity: isSelected || isHovered ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* 배경 패턴 */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(${emotion.color} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* 플로팅 오브 */}
          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 rounded-full"
            style={{
              background: `radial-gradient(circle, ${emotion.color}30 0%, transparent 70%)`,
            }}
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? 0.8 : 0.3,
            }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          />

          <div className="relative z-10">
            {/* 헤더 */}
            <div className="flex items-start gap-5 mb-6">
              {/* 아이콘 */}
              <motion.div
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${emotion.color} 0%, ${emotion.color}cc 100%)`,
                    boxShadow: `0 10px 30px ${emotion.color}50`,
                  }}
                >
                  <span className="text-3xl md:text-4xl text-white font-bold">
                    {emotion.name_ko.charAt(0)}
                  </span>
                </div>
                {/* 반짝이 효과 */}
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg viewBox="0 0 24 24" fill={emotion.color}>
                    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/>
                  </svg>
                </motion.div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 tracking-tight"
                  style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
                >
                  {emotion.name_ko}
                </h3>
                <p className="text-xs tracking-[0.3em] text-gray-400 uppercase font-medium">
                  {emotion.name_en}
                </p>
              </div>

              {/* 확장 아이콘 */}
              <motion.div
                className="w-10 h-10 rounded-full bg-gray-100/80 flex items-center justify-center flex-shrink-0"
                animate={{
                  rotate: isSelected ? 180 : 0,
                  backgroundColor: isSelected ? emotion.color : 'rgba(243,244,246,0.8)'
                }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-5 h-5 transition-colors duration-300"
                  fill="none"
                  stroke={isSelected ? 'white' : '#666'}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>

            {/* 확장 콘텐츠 */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <motion.div
                    className="pt-6 border-t border-gray-200/50"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-gray-700 text-sm md:text-base mb-5" style={{ lineHeight: '1.9' }}>
                      {emotion.description_ko}
                    </p>
                    <p className="text-gray-400 text-xs md:text-sm italic" style={{ lineHeight: '1.8' }}>
                      {emotion.description_en}
                    </p>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-3 mt-6">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${emotion.color}20`,
                          color: emotion.color
                        }}
                      >
                        부분 탐구
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        &lt;50% 합의
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 파티클 배경 컴포넌트
const ParticleBackground = () => {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `rgba(147, 51, 234, ${0.1 + Math.random() * 0.2})`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// 인터랙티브 통계 카드
const StatCard = ({ value, label, delay, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 hover:border-white/60 transition-all hover:shadow-xl">
        <motion.p
          className="text-4xl md:text-5xl font-light mb-2"
          style={{ color }}
          animate={isVisible ? { scale: [0.5, 1.1, 1] } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          {value}
        </motion.p>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

// 메인 컴포넌트
const PartiallyChartedEmotions = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const progressBar = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* 진행 바 */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{
          scaleX: progressBar,
          background: 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
        }}
      />

      {/* 프리미엄 배경 */}
      <div className="fixed inset-0 -z-10">
        {/* 베이스 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/50 to-pink-50/60" />

        {/* 파티클 */}
        <ParticleBackground />

        {/* 동적 블롭들 */}
        <motion.div
          className="absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-60 -left-60 w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        />

        {/* 노이즈 텍스처 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />

        {/* 그리드 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* 히어로 섹션 */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* 플로팅 배지 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-purple-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-semibold text-purple-700 tracking-wider uppercase">
              Partially Charted Emotions
            </span>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <span
              className="block text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-gray-900 mb-4"
              style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
            >
              탐험하는
            </span>
            <span
              className="block text-5xl md:text-7xl lg:text-8xl font-light tracking-tight"
              style={{
                fontFamily: "'Noto Serif KR', Georgia, serif",
                background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              감정들
            </span>
          </motion.h1>

          {/* 서브타이틀 */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto mt-8 leading-relaxed font-light"
          >
            아직 완전히 탐구되지 않았지만,
            <br className="hidden md:block" />
            우리의 감정 경험에서 <span className="text-gray-700 font-medium">중요한 역할</span>을 하는 9가지 감정
          </motion.p>

          {/* 정보 버튼 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => setShowInfo(!showInfo)}
            className="mt-10 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 text-gray-700 text-sm font-medium shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 group"
          >
            <motion.div
              animate={{ rotate: showInfo ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <span>왜 "부분적으로 탐구된" 감정인가요?</span>
            <svg className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* 정보 팝업 */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="mt-8 max-w-2xl mx-auto"
              >
                <div className="p-6 md:p-8 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-bold text-lg mb-2">과학적 합의 기준</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Atlas of Emotions는 <strong>248명의 감정 과학자들</strong>을 대상으로 한 설문조사를 기반으로 합니다.
                        5가지 핵심 감정은 <span className="text-purple-600 font-semibold">76% 이상</span>의 과학자들이
                        보편적 감정으로 동의했습니다. 반면, 아래의 감정들은 <span className="text-pink-600 font-semibold">50% 이하</span>의 합의를 얻어
                        "부분적으로 탐구된" 감정으로 분류됩니다.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowInfo(false)}
                      className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 스크롤 힌트 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="text-sm font-medium text-gray-400 mb-3 tracking-widest uppercase">Explore</span>
              <motion.div
                className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center pt-2"
              >
                <motion.div
                  className="w-1.5 h-3 rounded-full bg-gray-400"
                  animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 감정 카드 그리드 */}
      <section className="relative px-4 md:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          {/* 섹션 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-4xl font-light text-gray-900 mb-4"
              style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
            >
              9가지 감정 탐색하기
            </h2>
            <p className="text-gray-500">카드를 클릭하여 자세히 알아보세요</p>
          </motion.div>

          {/* 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {partiallyChartedEmotions.map((emotion, index) => (
              <Card3D
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

      {/* 인용구 섹션 */}
      <section className="relative py-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-10 md:p-16 rounded-[40px] bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl overflow-hidden">
            {/* 장식 요소 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <motion.svg
                className="w-12 h-12 mx-auto mb-8 text-purple-300"
                fill="currentColor"
                viewBox="0 0 24 24"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </motion.svg>

              <p
                className="text-2xl md:text-3xl lg:text-4xl text-gray-800 leading-relaxed mb-8"
                style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
              >
                감정의 세계는 아직 탐험 중입니다.
                <br />
                <span
                  className="font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  열린 마음
                </span>
                으로 새로운 감정을 발견하세요.
              </p>

              <p className="text-sm text-gray-400 font-medium tracking-wider">— Atlas of Emotions</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 통계 섹션 */}
      <section className="relative py-20 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-light text-center text-gray-900 mb-12"
            style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
          >
            연구 배경
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              value="9"
              label="탐험 중인 감정"
              delay={0}
              color="#8b5cf6"
            />
            <StatCard
              value="<50%"
              label="과학자 합의율"
              delay={0.1}
              color="#ec4899"
            />
            <StatCard
              value="248"
              label="참여 과학자"
              delay={0.2}
              color="#3b82f6"
            />
          </div>
        </div>
      </section>

      {/* 푸터 그라데이션 */}
      <div className="h-32 bg-gradient-to-t from-white/50 to-transparent" />
    </div>
  );
};

export default PartiallyChartedEmotions;
