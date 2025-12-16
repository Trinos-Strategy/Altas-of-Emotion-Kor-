import { motion } from 'framer-motion';

const Introduction = ({ onNavigate }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          감정 지도에 오신 것을 환영합니다
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-white/60 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          달라이 라마 후원
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-lg sm:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          감정 지도는 당신의 감정 어휘를 구축하고 감정 세계를 밝혀주는 대화형 도구입니다.
          5가지 주요 감정을 탐험하고, 그것이 어떻게 발생하며, 어떻게 대응할 수 있는지 알아보세요.
        </motion.p>

        {/* Start Button */}
        <motion.button
          onClick={() => onNavigate('triggers')}
          className="px-8 py-4 bg-gradient-to-r from-[#E74C3C] via-[#9B59B6] to-[#F1C40F] text-white font-bold text-lg rounded-full hover:shadow-lg hover:shadow-white/20 transition-shadow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          시작하기
        </motion.button>

        {/* 5 Emotion Circles Preview */}
        <motion.div
          className="mt-16 flex justify-center items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {[
            { color: '#E74C3C', name: '분노' },
            { color: '#9B59B6', name: '두려움' },
            { color: '#27AE60', name: '혐오' },
            { color: '#3498DB', name: '슬픔' },
            { color: '#F1C40F', name: '즐거움' }
          ].map((emotion, index) => (
            <motion.div
              key={emotion.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-70"
                style={{ backgroundColor: emotion.color }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <span className="text-xs sm:text-sm text-white/60 mt-2">{emotion.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* About Section */}
      <motion.div
        className="mt-24 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          감정 지도에 대하여
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">Paul Ekman 박사</h3>
            <p className="text-white/70 leading-relaxed">
              감정과 표정 연구의 세계적 권위자로, 40년 이상 인간의 감정을 연구해왔습니다.
              그의 연구는 기본 감정 이론의 토대가 되었으며, FBI, CIA 등 다양한 기관에서
              활용되고 있습니다.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">Eve Ekman 박사</h3>
            <p className="text-white/70 leading-relaxed">
              감정 과학과 명상의 교차점을 연구하는 학자로, Greater Good Science Center의
              선임 연구원입니다. 감정 지도 프로젝트의 핵심 개발자로서 과학과 실용적
              응용을 연결합니다.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 bg-white/5 rounded-2xl p-6 backdrop-blur-sm"
          whileHover={{ scale: 1.01 }}
        >
          <h3 className="text-xl font-semibold text-white mb-3">달라이 라마의 비전</h3>
          <p className="text-white/70 leading-relaxed">
            달라이 라마 성하께서는 감정 교육이 세계 평화의 핵심이라고 믿으십니다.
            그분은 이 프로젝트를 후원하시며, 모든 사람이 자신의 감정을 이해하고
            더 건설적으로 대응할 수 있도록 돕고자 하셨습니다. 감정 지도는 그 비전의 결실입니다.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Introduction;
