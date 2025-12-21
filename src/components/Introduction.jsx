import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// 미니멀한 감정 카드 컴포넌트
const EmotionCard = ({ emotion, index, isActive, onHover, onLeave, onClick }) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1 + index * 0.15,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={{
          y: isActive ? -12 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* 감정 원 */}
        <motion.div
          className="relative mb-6"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          {/* 글로우 */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ backgroundColor: emotion.color }}
            animate={{
              opacity: isActive ? 0.4 : 0.15,
              scale: isActive ? 1.3 : 1,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* 메인 원 */}
          <div
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(145deg, ${emotion.colorLight || emotion.color}, ${emotion.color})`,
              boxShadow: `0 20px 50px ${emotion.color}30`
            }}
          >
            <span className="text-3xl md:text-4xl">{emotion.icon}</span>
          </div>
        </motion.div>

        {/* 텍스트 */}
        <motion.div
          className="text-center"
          animate={{ opacity: isActive ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 tracking-tight">
            {emotion.name}
          </h3>
          <p className="text-xs text-gray-400 tracking-widest uppercase">
            {emotion.name_en}
          </p>
        </motion.div>
      </motion.div>

      {/* 호버 시 설명 */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-8 w-64 md:w-72"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">
                {emotion.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 숫자 통계 컴포넌트 (미니멀)
const StatItem = ({ number, label, delay }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
  >
    <div className="text-5xl md:text-6xl font-extralight text-gray-900 mb-3 tracking-tight">
      {number}
    </div>
    <div className="text-sm text-gray-400 tracking-wider">
      {label}
    </div>
  </motion.div>
);

// 기능 아이템 컴포넌트 (미니멀)
const FeatureItem = ({ icon, title, desc, delay }) => (
  <motion.div
    className="text-center md:text-left"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">
      {title}
    </h3>
    <p className="text-gray-500 leading-relaxed">
      {desc}
    </p>
  </motion.div>
);

const Introduction = ({ onNavigate }) => {
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const emotions = [
    { name: '분노', name_en: 'ANGER', color: '#E63946', colorLight: '#FF8A8A', icon: '🔥', desc: '목표가 방해받거나 부당한 대우를 받을 때 자연스럽게 느끼는 감정입니다.' },
    { name: '두려움', name_en: 'FEAR', color: '#6B4C9A', colorLight: '#A78BCC', icon: '👁️', desc: '위험을 감지했을 때 스스로를 보호하기 위해 느끼는 감정입니다.' },
    { name: '혐오', name_en: 'DISGUST', color: '#4A7C59', colorLight: '#7FB892', icon: '🍃', desc: '해롭거나 불쾌한 것으로부터 멀어지려는 본능적 반응입니다.' },
    { name: '슬픔', name_en: 'SADNESS', color: '#4A6FA5', colorLight: '#7BA3D0', icon: '💧', desc: '상실을 경험했을 때 느끼는 감정으로, 회복의 시간이 필요함을 알립니다.' },
    { name: '즐거움', name_en: 'ENJOYMENT', color: '#F4A261', colorLight: '#FFD089', icon: '✨', desc: '긍정적인 경험에서 느끼는 만족과 행복의 감정입니다.' },
  ];

  const features = [
    { icon: '🎯', title: '트리거 이해', desc: '감정을 유발하는 요인을 파악합니다' },
    { icon: '🌊', title: '강도 인식', desc: '같은 감정도 다양한 강도로 나타납니다' },
    { icon: '⚡', title: '반응 선택', desc: '건설적으로 대응하는 방법을 배웁니다' },
    { icon: '💡', title: '전략 수립', desc: '감정을 다루는 해독제를 발견합니다' },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#FAFAFA]">
      {/* ========== 히어로 섹션 ========== */}
      <motion.section
        className="min-h-screen flex flex-col items-center justify-center relative"
        style={{ opacity: heroOpacity }}
      >
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(244,162,97,0.2) 0%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-1/2 -left-1/4 w-full h-full rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(107,76,154,0.15) 0%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.08, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-20">
          {/* 로고 */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center shadow-2xl">
              <span className="text-white text-[9px] font-bold leading-tight text-center tracking-tight">
                감정<br/>지도
              </span>
            </div>
          </motion.div>

          {/* 메인 카피 */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.p
              className="text-sm text-gray-400 tracking-[0.4em] uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Atlas of Emotions
            </motion.p>

            <h1 className="mb-10">
              <motion.span
                className="block text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                감정을
              </motion.span>
              <motion.span
                className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #F4A261 0%, #E76F51 50%, #6B4C9A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                이해하다
              </motion.span>
            </h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-xl mx-auto font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              감정을 촉발하는 요인과 반응 방식에 대해
              <br className="hidden md:block" />
              <span className="text-gray-800 font-medium">더 큰 통제력</span>을 얻으세요
            </motion.p>
          </motion.div>

          {/* 감정 카드들 */}
          <div className="flex justify-center items-start gap-6 md:gap-12 lg:gap-16 mb-24 flex-wrap">
            {emotions.map((emotion, i) => (
              <EmotionCard
                key={emotion.name}
                emotion={emotion}
                index={i}
                isActive={hoveredEmotion === i}
                onHover={setHoveredEmotion}
                onLeave={() => setHoveredEmotion(null)}
                onClick={() => onNavigate('continents')}
              />
            ))}
          </div>

          {/* CTA 버튼 */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.button
              onClick={() => onNavigate('triggers')}
              className="px-12 py-5 bg-gray-900 text-white text-lg font-medium rounded-full shadow-xl hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-4">
                탐험 시작하기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>

            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-900 text-lg font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              프로젝트 소개 →
            </motion.button>
          </motion.div>
        </div>

        {/* 스크롤 표시 */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3 text-gray-300 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <div className="w-px h-12 bg-gradient-to-b from-gray-300 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ========== 통계 섹션 ========== */}
      <section className="py-40 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm text-gray-400 tracking-[0.3em] uppercase mb-6">
              Scientific Foundation
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              과학적 연구에 기반합니다
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-8">
            <StatItem number="5" label="보편적 감정" delay={0.1} />
            <StatItem number="88%" label="과학자 합의" delay={0.2} />
            <StatItem number="248" label="참여 연구자" delay={0.3} />
            <StatItem number="50+" label="감정 상태" delay={0.4} />
          </div>
        </div>
      </section>

      {/* ========== 구분선 ========== */}
      <div className="max-w-xs mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ========== 기능 섹션 ========== */}
      <section className="py-40 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm text-gray-400 tracking-[0.3em] uppercase mb-6">
              What You'll Learn
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              감정의 모든 것을 탐험하세요
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
            {features.map((feature, i) => (
              <FeatureItem key={feature.title} {...feature} delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 인용문 섹션 ========== */}
      <section className="py-40 px-8 bg-gray-900">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-8xl text-white/5 font-serif mb-8">"</div>

          <blockquote className="text-2xl md:text-4xl text-white font-light leading-relaxed mb-12 tracking-tight">
            감정의 세계를 아는 것이
            <br />
            <span className="text-orange-300">마음의 평화</span>로 가는 길입니다
          </blockquote>

          <cite className="text-gray-500 text-lg not-italic tracking-wider">
            — 달라이 라마
          </cite>
        </motion.div>
      </section>

      {/* ========== 최종 CTA ========== */}
      <section className="py-48 px-8 bg-[#FAFAFA]">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
            지금 시작하세요
          </h2>

          <p className="text-xl text-gray-500 mb-16 leading-relaxed">
            당신의 감정을 이해하고
            <br />
            더 나은 삶을 만들어가세요
          </p>

          <motion.button
            onClick={() => onNavigate('triggers')}
            className="px-16 py-6 bg-gray-900 text-white text-xl font-medium rounded-full shadow-2xl"
            whileHover={{ scale: 1.03, boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-4">
              감정 탐험 시작
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </section>

      {/* ========== 사이드바 ========== */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-[9999] overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-12 pt-28">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <p className="text-sm text-gray-400 tracking-[0.2em] uppercase mb-4">About</p>
                  <h2 className="text-4xl font-bold text-gray-900 mb-12 tracking-tight">
                    감정의 지도
                  </h2>

                  <div className="space-y-10">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        프로젝트 배경
                      </h3>
                      <p className="text-gray-500 leading-loose">
                        감정 지도는 <span className="text-gray-800">Paul Ekman 박사</span>와
                        <span className="text-gray-800"> 달라이 라마</span>의 오랜 우정에서 탄생했습니다.
                        평생 감정 과학 연구에 헌신한 세계적 심리학자의 통찰이 담겨있습니다.
                      </p>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        목표
                      </h3>
                      <p className="text-gray-500 leading-loose">
                        감정을 촉발하는 요인과 우리의 반응 방식에 대해
                        <span className="text-gray-800"> 더 큰 통제력</span>을 얻는 것입니다.
                        자신의 감정을 더 잘 이해하고, 건설적인 방식으로 대응하도록 돕습니다.
                      </p>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        5가지 보편적 감정
                      </h3>
                      <div className="space-y-4">
                        {emotions.map((emotion) => (
                          <div
                            key={emotion.name}
                            className="flex items-center gap-5 p-4 -mx-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group"
                            onClick={() => { setSidebarOpen(false); onNavigate('continents'); }}
                          >
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                              style={{ backgroundColor: emotion.color }}
                            >
                              {emotion.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3">
                                <span className="text-gray-900 font-medium">{emotion.name}</span>
                                <span className="text-gray-400 text-xs tracking-wider">{emotion.name_en}</span>
                              </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-16 pt-8 border-t border-gray-100">
                    <p className="text-gray-400 text-sm">
                      원본:{' '}
                      <a
                        href="https://atlasofemotions.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        atlasofemotions.org
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
