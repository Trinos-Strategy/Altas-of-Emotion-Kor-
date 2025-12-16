import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Introduction = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="min-h-screen flex items-center relative">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl relative z-10">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold leading-tight text-center">
                  감정<br />지도
                </span>
              </div>
              <div className="text-[#1a1a1a] text-xs font-bold uppercase tracking-wider leading-tight">
                ATLAS<br />OF<br />EMOTIONS
              </div>
            </motion.div>

            {/* Main Title - Large Serif */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#1a1a1a] mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              감정의 세계를<br />
              탐험해보세요
            </motion.h1>

            {/* Goal Text */}
            <motion.p
              className="text-lg text-[#4a4a4a] mb-6 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              감정을 촉발하는 요인과 반응 방식에 대한
              더 큰 통제력을 얻는 것이 목표입니다.
            </motion.p>

            {/* Learn More Link */}
            <motion.button
              onClick={() => setSidebarOpen(true)}
              className="text-[#1a1a1a] text-sm font-medium mb-10 flex items-center gap-2 hover:opacity-70 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>더 알아보기</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Begin Button - Border Style like Original */}
            <motion.button
              onClick={() => onNavigate('triggers')}
              className="group flex items-center gap-4 px-12 py-5 border-2 border-[#1a1a1a] bg-transparent text-[#1a1a1a] text-lg font-medium tracking-wide transition-all duration-300 hover:bg-[#1a1a1a] hover:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>시작하기</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>

          {/* Right Side - Empty (the circles are in the background) */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#888]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-xs tracking-wider mb-2">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-[#ccc]"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Learn More Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 overflow-y-auto shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#1a1a1a] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Sidebar Content */}
              <div className="p-8 pt-20">
                <h2 className="text-2xl font-serif font-medium text-[#1a1a1a] mb-8">
                  감정 지도에 대하여
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">
                      프로젝트 배경
                    </h3>
                    <p className="text-[#4a4a4a] leading-relaxed">
                      감정 지도는 Paul Ekman 박사와 달라이 라마의
                      오랜 우정에서 탄생했습니다.
                    </p>
                    <p className="text-[#4a4a4a] leading-relaxed mt-3">
                      Paul Ekman은 평생 감정 과학 연구에 헌신한
                      세계적으로 유명한 심리학자입니다. 그의 딸 Eve Ekman과
                      함께 이 프로젝트를 개발했습니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">
                      목표
                    </h3>
                    <p className="text-[#4a4a4a] leading-relaxed">
                      감정을 촉발하는 요인과 우리의 반응 방식에 대해
                      더 큰 통제력을 얻는 것입니다.
                    </p>
                    <p className="text-[#4a4a4a] leading-relaxed mt-3">
                      이 도구는 자신의 감정을 더 잘 이해하고,
                      건설적인 방식으로 대응하는 데 도움을 줍니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">
                      5가지 감정
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: '분노', color: '#E07B6E', desc: '목표가 방해받을 때' },
                        { name: '두려움', color: '#9B7BB8', desc: '위협을 느낄 때' },
                        { name: '혐오', color: '#6BAF8D', desc: '불쾌한 것에 대한 반응' },
                        { name: '슬픔', color: '#6B9DC4', desc: '상실에 대한 반응' },
                        { name: '즐거움', color: '#E8C547', desc: '긍정적 경험에 대한 반응' },
                      ].map((emotion) => (
                        <div key={emotion.name} className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: emotion.color }}
                          />
                          <div>
                            <span className="text-[#1a1a1a] font-medium">{emotion.name}</span>
                            <span className="text-[#888] text-sm ml-2">- {emotion.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-[#888] text-sm">
                      원본 사이트:{' '}
                      <a
                        href="https://atlasofemotions.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1a1a1a] underline"
                      >
                        atlasofemotions.org
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Introduction;
