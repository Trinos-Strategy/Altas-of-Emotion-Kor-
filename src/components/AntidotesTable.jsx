import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AntidotesTable = ({ selectedEmotion, allEmotions, emotionOrder }) => {
  const [expandedEmotion, setExpandedEmotion] = useState(
    selectedEmotion?.id || null
  );

  const emotionsToShow = selectedEmotion
    ? [selectedEmotion]
    : emotionOrder.map(id => allEmotions[id]);

  return (
    <div className="space-y-4">
      {!selectedEmotion && (
        <p className="text-white/60 text-center mb-6">
          각 감정을 클릭하여 해독제를 확인하세요
        </p>
      )}

      {emotionsToShow.map((emotion, index) => (
        <motion.div
          key={emotion.id}
          className="bg-white/5 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Emotion Header */}
          <button
            onClick={() => setExpandedEmotion(
              expandedEmotion === emotion.id ? null : emotion.id
            )}
            className={`w-full flex items-center justify-between p-4 transition-colors ${
              selectedEmotion ? 'cursor-default' : 'hover:bg-white/5'
            }`}
            style={{
              borderLeft: `4px solid ${emotion.color}`
            }}
          >
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: emotion.color }}
              />
              <span className="text-white font-medium text-lg">
                {emotion.name_ko}
              </span>
              <span className="text-white/40 text-sm ml-2">
                ({emotion.name_en})
              </span>
            </div>
            {!selectedEmotion && (
              <motion.svg
                className="w-5 h-5 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: expandedEmotion === emotion.id ? 180 : 0 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            )}
          </button>

          {/* Antidotes Content */}
          <AnimatePresence>
            {(expandedEmotion === emotion.id || selectedEmotion) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0">
                  {/* Antidotes */}
                  {emotion.antidotes && emotion.antidotes.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-green-400 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        해독제 (Antidotes)
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-2 px-3 text-white/50 text-sm font-medium">상태</th>
                              <th className="text-left py-2 px-3 text-white/50 text-sm font-medium">해독제</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emotion.antidotes.map((antidote, i) => (
                              <motion.tr
                                key={antidote.state_ko}
                                className="border-b border-white/5 hover:bg-white/5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <td className="py-3 px-3">
                                  <span className="text-white">{antidote.state_ko}</span>
                                  <span className="text-white/30 text-xs ml-1">
                                    ({antidote.state_en})
                                  </span>
                                </td>
                                <td className="py-3 px-3">
                                  <span className="text-green-300/80">{antidote.antidote_ko}</span>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Obstacles (for enjoyment) */}
                  {emotion.obstacles && emotion.obstacles.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-red-400 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        방해물 (Obstacles)
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-2 px-3 text-white/50 text-sm font-medium">대상</th>
                              <th className="text-left py-2 px-3 text-white/50 text-sm font-medium">방해물</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emotion.obstacles.map((obstacle, i) => (
                              <motion.tr
                                key={obstacle.state_ko}
                                className="border-b border-white/5 hover:bg-white/5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <td className="py-3 px-3">
                                  <span className="text-white">{obstacle.state_ko}</span>
                                </td>
                                <td className="py-3 px-3">
                                  <span className="text-red-300/80">{obstacle.obstacle_ko}</span>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <p className="text-white/60 text-sm leading-relaxed">
                      {emotion.id === 'enjoyment' ? (
                        <>
                          <strong className="text-white">즐거움</strong>의 경우, 해독제보다는
                          즐거움을 방해하는 요소들이 더 중요합니다. 집착, 비관주의, 부정성은
                          긍정적 감정을 경험하는 것을 막을 수 있습니다. 또한 자부심에 대한
                          겸손, 샤덴프로이데에 대한 자비심이 필요합니다.
                        </>
                      ) : (
                        <>
                          <strong className="text-white">{emotion.name_ko}</strong>를 느낄 때,
                          위의 해독제들을 시도해보세요. 처음에는 어렵겠지만, 연습하면
                          점점 자연스러워집니다. 핵심은 감정을 억누르는 것이 아니라,
                          건설적으로 다루는 것입니다.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Summary Card */}
      {!selectedEmotion && (
        <motion.div
          className="mt-8 bg-gradient-to-r from-[#27AE60]/10 to-[#3498DB]/10 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-white font-semibold mb-3">공통적인 해독제</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-[#27AE60] mt-1.5 mr-2 flex-shrink-0" />
              <div>
                <span className="text-white">마음챙김</span>
                <p className="text-white/50">현재 순간에 집중하기</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-[#3498DB] mt-1.5 mr-2 flex-shrink-0" />
              <div>
                <span className="text-white">연민</span>
                <p className="text-white/50">자신과 타인에 대한 친절</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-[#F1C40F] mt-1.5 mr-2 flex-shrink-0" />
              <div>
                <span className="text-white">관점 전환</span>
                <p className="text-white/50">다른 시각에서 바라보기</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AntidotesTable;
