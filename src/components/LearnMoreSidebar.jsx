import { motion, AnimatePresence } from 'framer-motion';

const LearnMoreSidebar = ({ isOpen, onClose, emotion }) => {
  if (!emotion) return null;

  const sections = [
    {
      title: '과학적 근거',
      content: `${emotion.name_ko}는 진화적으로 중요한 기능을 합니다. 이 감정은 특정 상황에 대한 우리의 반응을 조절하고, 생존과 사회적 상호작용에 필수적인 역할을 합니다.`
    },
    {
      title: '신호와 메시지',
      content: (
        <ul className="space-y-2">
          {emotion.signals?.map((signal, i) => (
            <li key={i} className="flex items-center">
              <span
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: emotion.color }}
              />
              <span className="text-white/70">{signal.name_ko}</span>
              <span className="text-white/40 text-sm ml-2">({signal.name_en})</span>
            </li>
          ))}
        </ul>
      )
    },
    {
      title: '기분 (Mood)',
      content: (
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-white/70">
            <span className="font-semibold text-white">{emotion.mood_ko}</span>
            <span className="text-white/40 ml-2">({emotion.mood_en})</span>
          </p>
          <p className="text-white/50 text-sm mt-2">
            기분은 감정보다 오래 지속되며, 특정 트리거 없이도 나타날 수 있습니다.
            {emotion.name_ko}와 관련된 기분이 지속되면 세상을 그 렌즈로 보게 됩니다.
          </p>
        </div>
      )
    },
    {
      title: '성격 특성',
      content: (
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-white/70">
            <span className="font-semibold text-white">{emotion.trait_ko}</span>
            <span className="text-white/40 ml-2">({emotion.trait_en})</span>
          </p>
          <p className="text-white/50 text-sm mt-2">
            이 특성이 강한 사람은 {emotion.name_ko}를 더 자주, 더 쉽게 경험하는 경향이 있습니다.
          </p>
        </div>
      )
    },
    {
      title: '정신병리',
      content: (
        <div className="bg-white/5 rounded-lg p-4 border-l-4 border-yellow-500/50">
          <p className="text-white/70">{emotion.psychopathology_ko}</p>
          <p className="text-white/40 text-sm mt-2">
            ({emotion.psychopathology_en})
          </p>
          <p className="text-white/50 text-sm mt-3">
            감정이 극단적이거나 지속적으로 통제 불능일 때, 전문가의 도움을 구하는 것이 좋습니다.
          </p>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-[#1a1a2e] z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="sticky top-0 p-6 border-b border-white/10"
              style={{
                background: `linear-gradient(135deg, ${emotion.color}20, transparent)`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: emotion.color }}
                  />
                  <h2 className="text-xl font-bold text-white">
                    {emotion.name_ko} 더 알아보기
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-white/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {section.title}
                  </h3>
                  {typeof section.content === 'string' ? (
                    <p className="text-white/60 leading-relaxed">{section.content}</p>
                  ) : (
                    section.content
                  )}
                </motion.div>
              ))}

              {/* States Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  상태 요약
                </h3>
                <div className="space-y-2">
                  {emotion.states.map((state, i) => (
                    <div
                      key={state.name_en}
                      className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                    >
                      <div>
                        <span className="text-white">{state.name_ko}</span>
                        <span className="text-white/40 text-sm ml-2">
                          ({state.name_en})
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(7)].map((_, j) => (
                          <div
                            key={j}
                            className={`w-2 h-2 rounded-full ${
                              j < state.intensity ? '' : 'bg-white/20'
                            }`}
                            style={{
                              backgroundColor:
                                j < state.intensity ? emotion.color : undefined
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LearnMoreSidebar;
