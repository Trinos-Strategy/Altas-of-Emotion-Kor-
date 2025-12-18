import { motion, AnimatePresence } from 'framer-motion';
import { signalAndMessage, moodsDetailed, personalityTraitsDetailed, psychopathologyDetailed, scientificBasis } from '../data/additionalData';

const LearnMoreSidebar = ({ isOpen, onClose, emotion }) => {
  if (!emotion) return null;

  // 감정별 신호와 메시지 데이터
  const emotionSignalMessage = signalAndMessage[emotion.id] || {};
  
  // 감정별 상세 기분 데이터
  const emotionMood = Object.values(moodsDetailed).find(m => m.emotion === emotion.id);
  
  // 감정별 상세 성격 특성 데이터
  const emotionTrait = personalityTraitsDetailed[emotion.id];
  
  // 감정별 상세 정신병리 데이터
  const emotionPsychopathology = psychopathologyDetailed[emotion.id] || [];

  const sections = [
    {
      title: '과학적 근거',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {emotion.name_ko}는 진화적으로 중요한 기능을 합니다. 이 감정은 특정 상황에 대한 우리의 반응을 조절하고, 생존과 사회적 상호작용에 필수적인 역할을 합니다.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-blue-800 font-medium mb-2">연구 결과</p>
            <p className="text-sm text-blue-700">
              248명의 감정 과학자 중 {emotion.id === 'anger' ? '91%' : emotion.id === 'fear' ? '90%' : emotion.id === 'disgust' ? '86%' : emotion.id === 'sadness' ? '80%' : '76%'}가 {emotion.name_ko}를 보편적 감정으로 인정했습니다.
            </p>
          </div>
        </div>
      )
    },
    {
      title: '신호와 메시지',
      content: (
        <div className="space-y-4">
          {/* 신호 (Signal) */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: emotion.color }} />
              신호 (Signal)
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {emotionSignalMessage.signal_ko || '이 감정은 얼굴과 목소리를 통해 표현됩니다.'}
            </p>
          </div>
          
          {/* 메시지 (Message) */}
          <div 
            className="rounded-lg p-4 border-l-4"
            style={{ 
              backgroundColor: emotion.color + '15',
              borderColor: emotion.color 
            }}
          >
            <p className="text-sm font-semibold text-gray-800 mb-2">메시지 (Message)</p>
            <p className="text-lg font-medium" style={{ color: emotion.colorDark }}>
              "{emotionSignalMessage.message_ko || emotion.name_ko + '의 메시지'}"
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {emotionSignalMessage.message_en}
            </p>
          </div>

          {/* 기존 신호 목록 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">주요 신호</p>
            <ul className="space-y-2">
              {emotion.signals?.map((signal, i) => (
                <li key={i} className="flex items-center">
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: emotion.color }}
                  />
                  <span className="text-gray-600">{signal.name_ko}</span>
                  <span className="text-gray-400 text-sm ml-2">({signal.name_en})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      title: '기분 (Mood)',
      content: (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-semibold text-gray-800 text-lg">{emotionMood?.name_ko || emotion.mood_ko}</span>
              <span className="text-gray-400 ml-2">({emotionMood?.name_en || emotion.mood_en})</span>
            </div>
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: emotion.color }}
            />
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {emotionMood?.description_ko || `기분은 감정보다 오래 지속되며, 특정 트리거 없이도 나타날 수 있습니다. ${emotion.name_ko}와 관련된 기분이 지속되면 세상을 그 렌즈로 보게 됩니다.`}
          </p>
          <div className="bg-white rounded p-3 border border-gray-200">
            <p className="text-xs text-gray-500">
              💡 기분은 명확한 트리거 없이도 반복적으로 관련 감정을 느끼게 합니다.
            </p>
          </div>
        </div>
      )
    },
    {
      title: '성격 특성',
      content: (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="font-semibold text-gray-800 text-lg">{emotionTrait?.trait_ko || emotion.trait_ko}</span>
              <span className="text-gray-400 ml-2">({emotionTrait?.trait_en || emotion.trait_en})</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {emotionTrait?.description_ko || `이 특성이 강한 사람은 ${emotion.name_ko}를 더 자주, 더 쉽게 경험하는 경향이 있습니다.`}
          </p>
        </div>
      )
    },
    {
      title: '정신병리',
      content: (
        <div className="space-y-3">
          <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
            <p className="text-sm text-amber-800 mb-3">
              {emotion.name_ko}가 극단적이거나 지속적으로 통제 불능일 때 나타날 수 있는 관련 장애들입니다.
            </p>
          </div>
          
          {emotionPsychopathology.length > 0 ? (
            <div className="space-y-2">
              {emotionPsychopathology.map((disorder, i) => (
                <div 
                  key={i}
                  className="bg-white rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start">
                    <span 
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0"
                      style={{ 
                        backgroundColor: emotion.color + '20',
                        color: emotion.color 
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{disorder.name_ko}</p>
                      <p className="text-gray-400 text-xs">{disorder.name_en}</p>
                      {disorder.description_ko && (
                        <p className="text-gray-500 text-sm mt-1">{disorder.description_ko}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700">{emotion.psychopathology_ko}</p>
              <p className="text-gray-400 text-sm mt-2">({emotion.psychopathology_en})</p>
            </div>
          )}
          
          <p className="text-gray-500 text-sm mt-3 p-3 bg-gray-50 rounded-lg">
            ⚠️ 이러한 증상이 지속된다면 전문가의 도움을 구하는 것이 좋습니다.
          </p>
        </div>
      )
    },
    {
      title: '행동 유형',
      content: (
        <div className="space-y-4">
          {/* 본능적 행동 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
              본능적 행동 (Intrinsic)
            </p>
            <p className="text-gray-500 text-xs mb-2">자동적으로 발생하는 반응</p>
            <div className="flex flex-wrap gap-2">
              {emotion.actions?.filter(a => a.type === 'intrinsic').map((action, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm border border-orange-200"
                >
                  {action.name_ko}
                </span>
              ))}
            </div>
          </div>
          
          {/* 의도적 행동 */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              의도적 행동 (Intentional)
            </p>
            <p className="text-gray-500 text-xs mb-2">의식적으로 선택하는 반응</p>
            <div className="flex flex-wrap gap-2">
              {emotion.actions?.filter(a => a.type === 'intentional').map((action, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
                >
                  {action.name_ko}
                </span>
              ))}
            </div>
          </div>
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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-50 overflow-y-auto shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="sticky top-0 p-6 border-b border-gray-200 bg-white z-10"
              style={{
                background: `linear-gradient(135deg, ${emotion.colorLight}40, white)`
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3 shadow-sm"
                    style={{ backgroundColor: emotion.color }}
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {emotion.name_ko}
                    </h2>
                    <p className="text-sm text-gray-500">{emotion.name_en}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 hover:text-gray-600"
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
                  transition={{ delay: i * 0.08 }}
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span 
                      className="w-1 h-5 rounded mr-2"
                      style={{ backgroundColor: emotion.color }}
                    />
                    {section.title}
                  </h3>
                  {typeof section.content === 'string' ? (
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  ) : (
                    section.content
                  )}
                </motion.div>
              ))}

              {/* States Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span 
                    className="w-1 h-5 rounded mr-2"
                    style={{ backgroundColor: emotion.color }}
                  />
                  감정 강도 스펙트럼
                </h3>
                <div className="space-y-2">
                  {emotion.states.map((state, i) => (
                    <div
                      key={state.name_en}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100 hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <span className="text-gray-800 font-medium">{state.name_ko}</span>
                        <span className="text-gray-400 text-sm ml-2">
                          ({state.name_en})
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(7)].map((_, j) => (
                          <div
                            key={j}
                            className={`w-2 h-2 rounded-full transition-all ${
                              j < state.intensity ? '' : 'bg-gray-200'
                            }`}
                            style={{
                              backgroundColor:
                                j < state.intensity ? emotion.color : undefined,
                              opacity: j < state.intensity ? 0.3 + (j * 0.1) : 1
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
