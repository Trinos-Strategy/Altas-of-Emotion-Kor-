import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Introduction = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const emotionColors = [
    { name: '분노', color: '#E07B6E', desc: '목표가 방해받을 때' },
    { name: '두려움', color: '#9B7BB8', desc: '위협을 느낄 때' },
    { name: '혐오', color: '#6BAF8D', desc: '불쾌한 것에 대한 반응' },
    { name: '슬픔', color: '#6B9DC4', desc: '상실에 대한 반응' },
    { name: '즐거움', color: '#E8C547', desc: '긍정적 경험에 대한 반응' },
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden" role="main">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        메인 콘텐츠로 건너뛰기
      </a>

      <div id="main-content" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="max-w-xl relative z-10">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-4 mb-10 md:mb-14"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-[10px] md:text-xs font-bold leading-tight text-center">
                  감정<br />지도
                </span>
              </div>
              <div className="text-gray-900 text-xs font-bold uppercase tracking-wider leading-tight">
                ATLAS<br />OF<br />EMOTIONS
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 mb-6 md:mb-8 leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
            >
              감정의 세계를<br />
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text">
                탐험해보세요
              </span>
            </motion.h1>

            {/* Goal Text */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              감정을 촉발하는 요인과 반응 방식에 대한
              <span className="text-gray-800 font-medium"> 더 큰 통제력</span>을 얻는 것이 목표입니다.
            </motion.p>

            {/* Learn More Link */}
            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-700 text-sm font-semibold mb-10 flex items-center gap-2 group hover:text-gray-900 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              aria-label="더 알아보기 사이드바 열기"
            >
              <span className="border-b border-gray-400 group-hover:border-gray-700 transition-colors pb-0.5">
                더 알아보기
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Begin Button */}
            <motion.button
              onClick={() => onNavigate('triggers')}
              className="group flex items-center gap-4 px-8 md:px-12 py-4 md:py-5 border-2 border-gray-900 bg-transparent text-gray-900 text-base md:text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-gray-900 hover:text-white rounded-xl shadow-sm hover:shadow-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>시작하기</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>

            {/* Quick emotion preview - Mobile */}
            <motion.div
              className="mt-10 lg:hidden flex gap-2 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {emotionColors.map((emotion, i) => (
                <motion.div
                  key={emotion.name}
                  className="w-8 h-8 rounded-full shadow-md"
                  style={{ backgroundColor: emotion.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 300 }}
                  title={emotion.name}
                />
              ))}
            </motion.div>
          </div>

          {/* Right Side - Emotion Circles Preview (Desktop) */}
          <motion.div
            className="hidden lg:flex items-center justify-center relative h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Decorative emotion circles */}
            {emotionColors.map((emotion, i) => {
              const positions = [
                { top: '10%', left: '60%', size: 100 },
                { top: '25%', left: '20%', size: 80 },
                { top: '55%', left: '70%', size: 120 },
                { top: '70%', left: '30%', size: 90 },
                { top: '40%', left: '45%', size: 140 },
              ];
              return (
                <motion.div
                  key={emotion.name}
                  className="absolute rounded-full opacity-80"
                  style={{
                    backgroundColor: emotion.color,
                    top: positions[i].top,
                    left: positions[i].left,
                    width: positions[i].size,
                    height: positions[i].size,
                    filter: 'blur(1px)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 0.7,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    scale: { delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 },
                    y: { delay: 1.2 + i * 0.2, duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest mb-3 uppercase font-medium">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Learn More Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-full sm:w-[440px] bg-white z-50 overflow-y-auto shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="감정 지도에 대하여"
            >
              {/* Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                aria-label="사이드바 닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Sidebar Content */}
              <div className="p-8 md:p-10 pt-20">
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-8">
                  감정 지도에 대하여
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                      프로젝트 배경
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      감정 지도는 Paul Ekman 박사와 달라이 라마의
                      오랜 우정에서 탄생했습니다.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-3 text-[15px]">
                      Paul Ekman은 평생 감정 과학 연구에 헌신한
                      세계적으로 유명한 심리학자입니다. 그의 딸 Eve Ekman과
                      함께 이 프로젝트를 개발했습니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                      목표
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                      감정을 촉발하는 요인과 우리의 반응 방식에 대해
                      더 큰 통제력을 얻는 것입니다.
                    </p>
                    <p className="text-gray-600 leading-relaxed mt-3 text-[15px]">
                      이 도구는 자신의 감정을 더 잘 이해하고,
                      건설적인 방식으로 대응하는 데 도움을 줍니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">
                      5가지 감정
                    </h3>
                    <div className="space-y-3">
                      {emotionColors.map((emotion) => (
                        <div key={emotion.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div
                            className="w-10 h-10 rounded-full shadow-md flex-shrink-0"
                            style={{ backgroundColor: emotion.color }}
                          />
                          <div>
                            <span className="text-gray-900 font-semibold text-[15px]">{emotion.name}</span>
                            <p className="text-gray-500 text-sm">{emotion.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">
                      원본 사이트:{' '}
                      <a
                        href="https://atlasofemotions.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 underline underline-offset-2 transition-colors"
                      >
                        atlasofemotions.org
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Introduction;
