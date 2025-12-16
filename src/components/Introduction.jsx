import { motion } from 'framer-motion';

const Introduction = ({ onNavigate }) => {
  const emotionPreviews = [
    { color: '#E8857B', lightColor: '#F5B8B2', name: '분노' },
    { color: '#A78BCA', lightColor: '#D4C4E8', name: '두려움' },
    { color: '#7DC4A5', lightColor: '#B5DEC9', name: '혐오' },
    { color: '#7BA7D0', lightColor: '#B3CFE8', name: '슬픔' },
    { color: '#F5D76E', lightColor: '#FAE9A8', name: '즐거움' }
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
            달라이 라마 후원
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
            감정 지도에 오신 것을
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8857B] via-[#A78BCA] to-[#F5D76E]">
              환영합니다
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          감정 지도는 당신의 감정 어휘를 구축하고 감정 세계를 밝혀주는 대화형 도구입니다.
          5가지 주요 감정을 탐험하고, 그것이 어떻게 발생하며, 어떻게 대응할 수 있는지 알아보세요.
        </motion.p>

        {/* Start Button */}
        <motion.button
          onClick={() => onNavigate('triggers')}
          className="px-10 py-4 bg-gray-800 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          탐험 시작하기
        </motion.button>

        {/* 5 Emotion Circles Preview */}
        <motion.div
          className="mt-16 flex justify-center items-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          {emotionPreviews.map((emotion, index) => (
            <motion.div
              key={emotion.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${emotion.lightColor}, ${emotion.color})`,
                }}
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    `0 4px 20px ${emotion.color}40`,
                    `0 8px 30px ${emotion.color}60`,
                    `0 4px 20px ${emotion.color}40`
                  ]
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
              <span className="text-sm font-medium text-gray-600 mt-3">{emotion.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* About Section */}
      <motion.div
        className="mt-28 max-w-5xl mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10">
          감정 지도에 대하여
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="glass rounded-3xl p-8 border border-gray-200/50 shadow-sm"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E8857B] to-[#A78BCA] mb-4 flex items-center justify-center">
              <span className="text-white text-xl">👨‍🔬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Paul Ekman 박사</h3>
            <p className="text-gray-600 leading-relaxed">
              감정과 표정 연구의 세계적 권위자로, 40년 이상 인간의 감정을 연구해왔습니다.
              그의 연구는 기본 감정 이론의 토대가 되었으며, FBI, CIA 등 다양한 기관에서
              활용되고 있습니다.
            </p>
          </motion.div>

          <motion.div
            className="glass rounded-3xl p-8 border border-gray-200/50 shadow-sm"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A78BCA] to-[#7BA7D0] mb-4 flex items-center justify-center">
              <span className="text-white text-xl">👩‍🔬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Eve Ekman 박사</h3>
            <p className="text-gray-600 leading-relaxed">
              감정 과학과 명상의 교차점을 연구하는 학자로, Greater Good Science Center의
              선임 연구원입니다. 감정 지도 프로젝트의 핵심 개발자로서 과학과 실용적
              응용을 연결합니다.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 glass rounded-3xl p-8 border border-gray-200/50 shadow-sm"
          whileHover={{ scale: 1.01, y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F5D76E] to-[#E8857B] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl">🙏</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">달라이 라마의 비전</h3>
              <p className="text-gray-600 leading-relaxed">
                달라이 라마 성하께서는 감정 교육이 세계 평화의 핵심이라고 믿으십니다.
                그분은 이 프로젝트를 후원하시며, 모든 사람이 자신의 감정을 이해하고
                더 건설적으로 대응할 수 있도록 돕고자 하셨습니다. 감정 지도는 그 비전의 결실입니다.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Introduction;
