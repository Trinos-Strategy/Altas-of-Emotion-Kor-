import { motion } from 'framer-motion';

const Introduction = ({ onNavigate }) => {
  return (
    <section className="min-h-screen flex items-center relative">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
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

            {/* Description */}
            <motion.p
              className="text-lg text-[#4a4a4a] mb-10 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              감정 지도는 Paul Ekman 박사와 달라이 라마가 함께 만든 대화형 도구입니다.
              당신의 감정을 이해하고, 더 나은 선택을 할 수 있도록 도와드립니다.
            </motion.p>

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

            {/* Credit */}
            <motion.p
              className="mt-12 text-sm text-[#888]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              달라이 라마 후원 프로젝트
            </motion.p>
          </div>

          {/* Right Side - Empty (the peach circle is in the background) */}
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
    </section>
  );
};

export default Introduction;
