import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// 인터랙티브 감정 오브 컴포넌트
const EmotionOrb = ({ emotion, index, isHovered, onHover, onLeave, onClick }) => {
  const orbRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setMousePos({ x: x * 20, y: y * 20 });
  };

  return (
    <motion.div
      ref={orbRef}
      className="relative cursor-pointer group"
      initial={{ opacity: 0, scale: 0, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.8 + index * 0.1,
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => { onLeave(); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)` : 'none'
      }}
    >
      {/* 글로우 이펙트 */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{ backgroundColor: emotion.color }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.4 : 0.2
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 메인 오브 */}
      <motion.div
        className="relative w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${emotion.colorLight || emotion.color}dd, ${emotion.color})`,
          boxShadow: isHovered
            ? `0 20px 60px ${emotion.color}60, inset 0 -10px 30px rgba(0,0,0,0.2), inset 0 10px 30px rgba(255,255,255,0.3)`
            : `0 10px 40px ${emotion.color}40, inset 0 -5px 20px rgba(0,0,0,0.1), inset 0 5px 20px rgba(255,255,255,0.2)`
        }}
      >
        {/* 광택 오버레이 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
          }}
        />

        {/* 아이콘 */}
        <span className="text-2xl md:text-3xl relative z-10">{emotion.icon}</span>
      </motion.div>

      {/* 라벨 */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
        animate={{
          opacity: isHovered ? 1 : 0.7,
          y: isHovered ? -5 : 0
        }}
      >
        <span className="text-sm font-bold text-gray-800 block">{emotion.name}</span>
        <span className="text-xs text-gray-400">{emotion.name_en}</span>
      </motion.div>

      {/* 호버 시 설명 카드 */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-14 w-48 md:w-56 p-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 z-20"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-600 text-sm leading-relaxed">{emotion.desc}</p>
            <div className="mt-3 flex items-center gap-2 text-xs font-medium" style={{ color: emotion.color }}>
              <span>자세히 보기</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 통계 카드 컴포넌트
const StatCard = ({ number, label, delay }) => (
  <motion.div
    className="text-center p-6 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-lg"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}
  >
    <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{number}</div>
    <div className="text-sm text-gray-500 font-medium">{label}</div>
  </motion.div>
);

// 기능 카드 컴포넌트
const FeatureCard = ({ icon, title, desc, color, delay }) => (
  <motion.div
    className="relative p-6 rounded-3xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-lg overflow-hidden group cursor-pointer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}
  >
    <div
      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
      style={{ backgroundColor: color, transform: 'translate(30%, -30%)' }}
    />
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
      style={{ backgroundColor: `${color}20` }}
    >
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

// 메인 히어로 그라디언트 배경
const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* 베이스 그라디언트 */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50/30" />

    {/* 애니메이팅 오브들 */}
    <motion.div
      className="absolute -top-[40%] -right-[20%] w-[80%] h-[80%] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(244,162,97,0.15) 0%, rgba(244,162,97,0.05) 50%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
    />

    <motion.div
      className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(107,76,154,0.12) 0%, rgba(107,76,154,0.04) 50%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.15, 1],
        x: [0, -20, 0],
        y: [0, 30, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
    />

    <motion.div
      className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(74,111,165,0.1) 0%, transparent 60%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        y: [0, 40, 0],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
    />

    {/* 그리드 패턴 오버레이 */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }}
    />
  </div>
);

const Introduction = ({ onNavigate }) => {
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const emotions = [
    { name: '분노', name_en: 'ANGER', color: '#E63946', colorLight: '#FF6B6B', icon: '🔥', desc: '목표가 방해받거나 부당한 대우를 받을 때 느끼는 강렬한 감정입니다.' },
    { name: '두려움', name_en: 'FEAR', color: '#6B4C9A', colorLight: '#9B7FBF', icon: '👁️', desc: '위험이나 위협을 감지했을 때 자신을 보호하기 위한 감정입니다.' },
    { name: '혐오', name_en: 'DISGUST', color: '#4A7C59', colorLight: '#7CB890', icon: '🍃', desc: '불쾌하거나 해로운 것을 피하려는 본능적 반응입니다.' },
    { name: '슬픔', name_en: 'SADNESS', color: '#4A6FA5', colorLight: '#7BA3D0', icon: '💧', desc: '상실이나 실망에 대한 반응으로, 회복의 시간이 필요함을 알려줍니다.' },
    { name: '즐거움', name_en: 'ENJOYMENT', color: '#F4A261', colorLight: '#FFD089', icon: '✨', desc: '긍정적 경험에서 느끼는 만족과 행복의 감정입니다.' },
  ];

  const features = [
    { icon: '🎯', title: '트리거 이해하기', desc: '무엇이 감정을 유발하는지 알아보세요', color: '#E63946' },
    { icon: '🌊', title: '감정의 강도', desc: '같은 감정도 다양한 강도로 나타납니다', color: '#4A6FA5' },
    { icon: '⚡', title: '반응 선택하기', desc: '건설적인 대응 방법을 배워보세요', color: '#F4A261' },
    { icon: '💡', title: '전략 세우기', desc: '감정을 다루는 해독제를 발견하세요', color: '#6B4C9A' },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* 히어로 섹션 */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <HeroBackground />

        {/* 메인 콘텐츠 */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
          {/* 로고 헤더 */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-2xl"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <span className="text-white text-[10px] font-black leading-tight text-center tracking-tight">
                  감정<br/>지도
                </span>
              </motion.div>
              <motion.div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-orange-400 to-purple-500 opacity-30 blur-lg"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.p
              className="text-sm md:text-base font-semibold text-gray-400 tracking-[0.3em] uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Atlas of Emotions
            </motion.p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight leading-[0.9] mb-6">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                감정을
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                탐험하다
              </motion.span>
            </h1>
            <motion.p
              className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              감정을 촉발하는 요인과 반응 방식에 대해
              <span className="text-gray-900 font-semibold"> 더 큰 통제력</span>을 얻으세요
            </motion.p>
          </motion.div>

          {/* 감정 오브 그리드 */}
          <div className="flex justify-center items-end gap-4 md:gap-8 mb-12 flex-wrap px-4">
            {emotions.map((emotion, i) => (
              <EmotionOrb
                key={emotion.name}
                emotion={emotion}
                index={i}
                isHovered={hoveredEmotion === i}
                onHover={setHoveredEmotion}
                onLeave={() => setHoveredEmotion(null)}
                onClick={() => onNavigate('continents')}
              />
            ))}
          </div>

          {/* CTA 버튼 */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.button
              onClick={() => onNavigate('triggers')}
              className="group relative px-10 py-5 bg-gray-900 text-white text-lg font-bold rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-3">
                탐험 시작하기
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.button>

            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="group px-8 py-5 text-gray-600 text-lg font-semibold rounded-full border-2 border-gray-200 hover:border-gray-400 hover:text-gray-900 transition-all"
              whileHover={{ scale: 1.02 }}
            >
              <span className="flex items-center gap-2">
                프로젝트 소개
                <svg className="w-4 h-4 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-xs font-medium tracking-widest uppercase">더 알아보기</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* 통계 섹션 */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50/50 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-orange-500 tracking-widest uppercase mb-4 block">
              과학적 연구 기반
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              전 세계가 인정한 감정 과학
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              248명의 감정 과학자들의 연구와 합의를 기반으로 제작되었습니다
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="5" label="보편적 감정" delay={0.1} />
            <StatCard number="88%" label="과학자 합의율" delay={0.2} />
            <StatCard number="248" label="참여 과학자" delay={0.3} />
            <StatCard number="50+" label="감정 상태" delay={0.4} />
          </div>
        </div>
      </section>

      {/* 기능 미리보기 섹션 */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-orange-50/20" />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-bold text-purple-500 tracking-widest uppercase mb-4 block">
              무엇을 배울 수 있나요?
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
              감정의 모든 것을 탐험하세요
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* 인용문 섹션 */}
      <section className="py-24 px-6 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px]" />
        </div>

        <motion.div
          className="max-w-4xl mx-auto text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl md:text-8xl text-white/10 font-serif mb-4">"</div>
          <blockquote className="text-2xl md:text-4xl text-white font-medium leading-relaxed mb-8">
            감정의 세계를 아는 것이
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> 마음의 평화</span>로 가는 길입니다
          </blockquote>
          <cite className="text-gray-400 text-lg not-italic">
            — 달라이 라마
          </cite>
        </motion.div>
      </section>

      {/* 최종 CTA 섹션 */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-500 mb-10">
            당신의 감정을 이해하고 더 나은 삶을 만들어가세요
          </p>

          <motion.button
            onClick={() => onNavigate('triggers')}
            className="group relative px-14 py-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(244,162,97,0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 2, opacity: 0.1 }}
              transition={{ duration: 0.4 }}
              style={{ borderRadius: '100%' }}
            />
            <span className="relative flex items-center gap-4">
              감정 탐험 시작
              <motion.svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
        </motion.div>
      </section>

      {/* 사이드바 */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[520px] bg-white z-[9999] overflow-y-auto shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-10 pt-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-sm font-bold text-orange-500 tracking-widest uppercase">About</span>
                  <h2 className="text-4xl font-black text-gray-900 mt-2 mb-8">
                    감정의 지도
                  </h2>

                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>🎯</span> 프로젝트 배경
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        감정 지도는 <strong>Paul Ekman 박사</strong>와 <strong>달라이 라마</strong>의
                        오랜 우정에서 탄생했습니다. 평생 감정 과학 연구에 헌신한 세계적 심리학자의 통찰이 담겨있습니다.
                      </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>🎓</span> 목표
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        감정을 촉발하는 요인과 우리의 반응 방식에 대해
                        <strong> 더 큰 통제력</strong>을 얻는 것입니다.
                        자신의 감정을 더 잘 이해하고, 건설적인 방식으로 대응하도록 돕습니다.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span>🌈</span> 5가지 보편적 감정
                      </h3>
                      <div className="space-y-3">
                        {emotions.map((emotion) => (
                          <div
                            key={emotion.name}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                            onClick={() => { setSidebarOpen(false); onNavigate('continents'); }}
                          >
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform"
                              style={{ backgroundColor: emotion.color }}
                            >
                              {emotion.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-900 font-bold">{emotion.name}</span>
                                <span className="text-gray-400 text-sm">{emotion.name_en}</span>
                              </div>
                              <p className="text-gray-500 text-sm">{emotion.desc.slice(0, 30)}...</p>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">
                      원본 사이트:{' '}
                      <a
                        href="https://atlasofemotions.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-600 font-medium"
                      >
                        atlasofemotions.org ↗
                      </a>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Introduction;
