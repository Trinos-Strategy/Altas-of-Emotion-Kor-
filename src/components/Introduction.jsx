import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// 럭셔리 감정 아이템 컴포넌트 (모바일 최적화)
const EmotionItem = ({ emotion, index, isActive, onHover, onLeave, onClick }) => {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 + index * 0.12, duration: 1 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
        {/* 넘버링 */}
        <span className="text-[10px] sm:text-[11px] text-gray-300 tracking-[0.2em] font-light w-6 sm:w-8">
          0{index + 1}
        </span>

        {/* 컬러 인디케이터 */}
        <motion.div
          className="relative flex-shrink-0"
          animate={{ scale: isActive ? 1.15 : 1 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <div
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
            style={{ backgroundColor: emotion.color }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: emotion.color }}
            animate={{
              scale: isActive ? 2.5 : 1,
              opacity: isActive ? 0.15 : 0
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* 텍스트 */}
        <div className="flex items-baseline gap-3 sm:gap-4 md:gap-6">
          <motion.span
            className="text-xl sm:text-2xl md:text-3xl tracking-[-0.02em]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            animate={{
              color: isActive ? '#1a1a1a' : '#9ca3af'
            }}
            transition={{ duration: 0.4 }}
          >
            {emotion.name}
          </motion.span>
          <motion.span
            className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase"
            animate={{
              color: isActive ? '#6b7280' : '#d1d5db',
              x: isActive ? 4 : 0
            }}
            transition={{ duration: 0.4 }}
          >
            {emotion.name_en}
          </motion.span>
        </div>
      </div>

      {/* 설명 - 호버 시 표시 */}
      <AnimatePresence>
        {isActive && (
          <motion.p
            className="mt-3 sm:mt-4 ml-[52px] sm:ml-[72px] md:ml-[88px] text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm sm:max-w-md"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            {emotion.desc}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Introduction = ({ onNavigate }) => {
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const emotions = [
    { name: '분노', name_en: 'Anger', color: '#C41E3A', desc: '목표가 방해받거나 부당한 대우를 받을 때 자연스럽게 느끼는 감정' },
    { name: '두려움', name_en: 'Fear', color: '#5B4B8A', desc: '위험을 감지했을 때 스스로를 보호하기 위해 느끼는 감정' },
    { name: '혐오', name_en: 'Disgust', color: '#2D5A3D', desc: '해롭거나 불쾌한 것으로부터 멀어지려는 본능적 반응' },
    { name: '슬픔', name_en: 'Sadness', color: '#3D5A80', desc: '상실을 경험했을 때 느끼는 감정으로, 회복의 시간이 필요함을 알림' },
    { name: '즐거움', name_en: 'Enjoyment', color: '#C17F59', desc: '긍정적인 경험에서 느끼는 만족과 행복의 감정' },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#FAFAF8]">

      {/* ============ 히어로 섹션 ============ */}
      <motion.section
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* 배경 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-2/3 sm:w-1/2 h-full bg-gradient-to-l from-[#F5F0EB] to-transparent opacity-60" />
          <div className="absolute bottom-0 left-0 w-1/2 sm:w-1/3 h-1/2 bg-gradient-to-tr from-[#EDE8E3] to-transparent opacity-40" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center min-h-screen py-24 sm:py-28 md:py-32">

            {/* 왼쪽: 메인 카피 */}
            <div className="order-2 lg:order-1">
              {/* 브랜드 마크 */}
              <motion.div
                className="mb-10 sm:mb-12 md:mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
              >
                <div className="inline-flex items-center gap-3 sm:gap-4">
                  <div className="w-px h-6 sm:h-8 bg-gray-300" />
                  <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 uppercase">
                    Atlas of Emotions
                  </span>
                </div>
              </motion.div>

              {/* 메인 타이틀 */}
              <motion.h1
                className="mb-8 sm:mb-10 md:mb-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                <span
                  className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-[1.15] tracking-[-0.03em] mb-2 sm:mb-4"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  감정의 지도
                </span>
                <span
                  className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] tracking-[-0.03em]"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#C17F59'
                  }}
                >
                  마음을 읽다
                </span>
              </motion.h1>

              {/* 서브 카피 */}
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-500 leading-[1.75] sm:leading-[1.8] mb-10 sm:mb-12 md:mb-16 max-w-md lg:max-w-lg"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                감정을 촉발하는 요인과 반응 방식에 대해
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                더 깊은 이해와 통제력을 얻으세요
              </motion.p>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 md:gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <motion.button
                  onClick={() => onNavigate('triggers')}
                  className="group flex items-center gap-3 sm:gap-4"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase text-gray-900 font-medium">
                    탐험 시작
                  </span>
                  <span className="w-10 sm:w-12 h-px bg-gray-900 group-hover:w-16 sm:group-hover:w-20 transition-all duration-500" />
                </motion.button>

                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-xs sm:text-sm tracking-[0.08em] sm:tracking-[0.1em] text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  프로젝트 소개
                </button>
              </motion.div>
            </div>

            {/* 오른쪽: 감정 목록 */}
            <motion.div
              className="order-1 lg:order-2 space-y-5 sm:space-y-6 md:space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="mb-8 sm:mb-10 md:mb-12">
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 uppercase">
                  Five Universal Emotions
                </span>
              </div>

              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {emotions.map((emotion, i) => (
                  <EmotionItem
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
            </motion.div>
          </div>
        </div>

        {/* 스크롤 표시 - 모바일에서 숨김 */}
        <motion.div
          className="absolute bottom-8 sm:bottom-12 left-6 sm:left-8 md:left-12 lg:left-24 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              className="w-px h-12 sm:h-16 bg-gray-300 origin-top"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 uppercase rotate-90 origin-left translate-x-2 sm:translate-x-3">
              Scroll
            </span>
          </div>
        </motion.div>
      </motion.section>

      {/* ============ 철학 섹션 ============ */}
      <section className="py-20 sm:py-32 md:py-40 lg:py-48 px-6 sm:px-8 md:px-12 lg:px-24 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* 라벨 */}
            <div className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
              <div className="w-8 sm:w-12 h-px bg-gray-700" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-gray-500 uppercase">
                Philosophy
              </span>
            </div>

            {/* 인용문 */}
            <blockquote
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.35] sm:leading-[1.4] tracking-[-0.02em] mb-10 sm:mb-12 md:mb-16"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              감정의 세계를 아는 것이
              <br />
              <span className="text-[#C17F59]">마음의 평화</span>로 가는 길입니다
            </blockquote>

            <cite className="text-xs sm:text-sm text-gray-500 tracking-[0.08em] sm:tracking-[0.1em] not-italic">
              — 달라이 라마
            </cite>
          </motion.div>
        </div>
      </section>

      {/* ============ 과학 섹션 ============ */}
      <section className="py-20 sm:py-32 md:py-40 lg:py-48 px-6 sm:px-8 md:px-12 lg:px-24 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 md:gap-20 lg:gap-24 items-start">
            {/* 왼쪽: 타이틀 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="w-8 sm:w-12 h-px bg-gray-300" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 uppercase">
                  Scientific Foundation
                </span>
              </div>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-[1.2] tracking-[-0.02em] mb-6 sm:mb-8"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                과학이 밝힌
                <br />
                감정의 본질
              </h2>

              <p className="text-sm sm:text-base text-gray-500 leading-[1.8] sm:leading-[1.9] max-w-md">
                Paul Ekman 박사와 248명의 감정 과학자들이 참여한 연구를 기반으로,
                인류 보편적 감정의 체계를 탐험합니다.
              </p>
            </motion.div>

            {/* 오른쪽: 숫자들 */}
            <motion.div
              className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {[
                { num: '5', label: '보편적 감정' },
                { num: '88%', label: '과학자 합의' },
                { num: '248', label: '참여 연구자' },
                { num: '50+', label: '감정 상태' },
              ].map((stat, i) => (
                <div key={stat.label} className="border-t border-gray-200 pt-5 sm:pt-6 md:pt-8">
                  <div
                    className="text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-2 sm:mb-3 md:mb-4 tracking-[-0.03em]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.15em] text-gray-400 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ 탐험 프리뷰 ============ */}
      <section className="py-20 sm:py-32 md:py-40 lg:py-48 px-6 sm:px-8 md:px-12 lg:px-24 bg-[#F5F0EB]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 uppercase block mb-4 sm:mb-6">
              The Journey
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl text-gray-900 tracking-[-0.02em]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              탐험의 여정
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {[
              { num: '01', title: '트리거', desc: '감정의 시작점' },
              { num: '02', title: '경험', desc: '강도의 스펙트럼' },
              { num: '03', title: '반응', desc: '행동의 선택' },
              { num: '04', title: '전략', desc: '균형의 해독제' },
            ].map((item) => (
              <div key={item.num} className="bg-[#F5F0EB] p-6 sm:p-8 md:p-10 lg:p-12 text-center">
                <span className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 block mb-4 sm:mb-5 md:mb-6">
                  {item.num}
                </span>
                <h3
                  className="text-lg sm:text-xl md:text-2xl text-gray-900 mb-2 sm:mb-3 tracking-[-0.01em]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ 최종 CTA ============ */}
      <section className="py-20 sm:py-32 md:py-40 lg:py-48 px-6 sm:px-8 md:px-12 lg:px-24 bg-[#FAFAF8]">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.2] tracking-[-0.02em] mb-6 sm:mb-8"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            당신의 감정을
            <br />
            이해하는 여정
          </h2>

          <p className="text-base sm:text-lg text-gray-500 mb-10 sm:mb-12 md:mb-16 leading-[1.75] sm:leading-[1.8]">
            지금 시작하세요
          </p>

          <motion.button
            onClick={() => onNavigate('triggers')}
            className="inline-flex items-center gap-4 sm:gap-6 px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-[#1A1A1A] text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs sm:text-sm tracking-[0.12em] sm:tracking-[0.15em] uppercase">
              탐험 시작
            </span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </section>

      {/* ============ 푸터 ============ */}
      <footer className="py-10 sm:py-12 md:py-16 px-6 sm:px-8 md:px-12 lg:px-24 border-t border-gray-200 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8">
          <div className="text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 uppercase">
            © Atlas of Emotions
          </div>
          <a
            href="https://atlasofemotions.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.15em] text-gray-400 hover:text-gray-600 transition-colors uppercase"
          >
            Original Project →
          </a>
        </div>
      </footer>

      {/* ============ 사이드바 ============ */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] md:w-[520px] bg-[#FAFAF8] z-[9999] overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-6 sm:top-8 md:top-10 right-6 sm:right-8 md:right-10 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 sm:p-12 md:p-16 pt-20 sm:pt-24 md:pt-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="w-8 sm:w-12 h-px bg-gray-300" />
                    <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 uppercase">
                      About
                    </span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl text-gray-900 mb-10 sm:mb-12 md:mb-16 tracking-[-0.02em]"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    감정의 지도
                  </h2>

                  <div className="space-y-10 sm:space-y-12 md:space-y-16">
                    <div>
                      <h3 className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 uppercase mb-4 sm:mb-5 md:mb-6">
                        프로젝트
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-[1.85] sm:leading-[2]">
                        감정 지도는 Paul Ekman 박사와 달라이 라마의 오랜 우정에서 탄생했습니다.
                        평생 감정 과학 연구에 헌신한 세계적 심리학자의 통찰이 담겨있습니다.
                      </p>
                    </div>

                    <div className="h-px bg-gray-200" />

                    <div>
                      <h3 className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 uppercase mb-4 sm:mb-5 md:mb-6">
                        목표
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-[1.85] sm:leading-[2]">
                        감정을 촉발하는 요인과 우리의 반응 방식에 대해 더 큰 통제력을 얻는 것입니다.
                        자신의 감정을 더 잘 이해하고, 건설적인 방식으로 대응하도록 돕습니다.
                      </p>
                    </div>

                    <div className="h-px bg-gray-200" />

                    <div>
                      <h3 className="text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 uppercase mb-5 sm:mb-6 md:mb-8">
                        다섯 가지 감정
                      </h3>
                      <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        {emotions.map((emotion, i) => (
                          <div
                            key={emotion.name}
                            className="flex items-center gap-4 sm:gap-5 md:gap-6 cursor-pointer group"
                            onClick={() => { setSidebarOpen(false); onNavigate('continents'); }}
                          >
                            <div
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: emotion.color }}
                            />
                            <span className="text-sm sm:text-base text-gray-600 group-hover:text-gray-900 transition-colors">
                              {emotion.name}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-gray-400 tracking-wider">
                              {emotion.name_en}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
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
