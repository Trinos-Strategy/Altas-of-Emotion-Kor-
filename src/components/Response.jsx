import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';
import ActionsGraph from './ActionsGraph';

const Response = ({ selectedEmotion }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showActionTypes, setShowActionTypes] = useState(false);

  const currentEmotion = selectedEmotion
    ? emotions[selectedEmotion]
    : emotions.enjoyment;

  const intrinsicActions = currentEmotion.actions.filter(a => a.type === 'intrinsic');
  const intentionalActions = currentEmotion.actions.filter(a => a.type === 'intentional');

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          감정 반응
        </motion.h2>

        <motion.p
          className="text-white/60 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          감정은 행동으로 이어집니다. {currentEmotion.name_ko}를 느낄 때
          우리는 본능적 또는 의도적으로 반응합니다.
        </motion.p>

        {/* Emotion indicator */}
        {!selectedEmotion && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/10 rounded-full px-4 py-2 flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: currentEmotion.color }}
              />
              <span className="text-white/70 text-sm">
                아래 감정 버튼을 선택하여 다른 반응을 확인하세요
              </span>
            </div>
          </motion.div>
        )}

        {/* Actions Graph */}
        <ActionsGraph
          emotion={currentEmotion}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
        />

        {/* Action Types Explanation */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowActionTypes(!showActionTypes)}
            className="w-full flex items-center justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
          >
            <span className="text-white font-medium">
              본능적 행동 vs 의도적 행동
            </span>
            <motion.svg
              className="w-5 h-5 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: showActionTypes ? 180 : 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {showActionTypes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  {/* Intrinsic Actions */}
                  <div
                    className="bg-white/5 rounded-xl p-6"
                    style={{ borderTop: `3px solid ${currentEmotion.color}` }}
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">
                      본능적 행동 (Intrinsic)
                    </h4>
                    <p className="text-white/60 text-sm mb-4">
                      자동적으로 발생하는 반응으로, 의식적 통제 없이 나타납니다.
                      진화적으로 프로그래밍된 행동입니다.
                    </p>
                    <ul className="space-y-2">
                      {intrinsicActions.map((action, i) => (
                        <motion.li
                          key={action.name_en}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span
                            className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                            style={{ backgroundColor: currentEmotion.color }}
                          />
                          <div>
                            <span className="text-white">{action.name_ko}</span>
                            <span className="text-white/40 text-sm ml-2">
                              ({action.name_en})
                            </span>
                            {action.description_ko && (
                              <p className="text-white/50 text-sm mt-1">
                                {action.description_ko}
                              </p>
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Intentional Actions */}
                  <div
                    className="bg-white/5 rounded-xl p-6"
                    style={{ borderTop: `3px solid ${currentEmotion.colorLight}` }}
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">
                      의도적 행동 (Intentional)
                    </h4>
                    <p className="text-white/60 text-sm mb-4">
                      의식적으로 선택하는 반응으로, 감정을 건설적으로 다루는 방법입니다.
                      학습과 연습을 통해 발달시킬 수 있습니다.
                    </p>
                    <ul className="space-y-2">
                      {intentionalActions.map((action, i) => (
                        <motion.li
                          key={action.name_en}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span
                            className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                            style={{ backgroundColor: currentEmotion.colorLight }}
                          />
                          <div>
                            <span className="text-white">{action.name_ko}</span>
                            <span className="text-white/40 text-sm ml-2">
                              ({action.name_en})
                            </span>
                            {action.description_ko && (
                              <p className="text-white/50 text-sm mt-1">
                                {action.description_ko}
                              </p>
                            )}
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Selected Action Detail */}
        <AnimatePresence>
          {selectedAction && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/60"
                onClick={() => setSelectedAction(null)}
              />
              <motion.div
                className="relative bg-[#252540] rounded-2xl p-6 max-w-md w-full"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                style={{
                  borderLeft: `4px solid ${
                    selectedAction.type === 'intrinsic'
                      ? currentEmotion.color
                      : currentEmotion.colorLight
                  }`
                }}
              >
                <button
                  onClick={() => setSelectedAction(null)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center mb-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      selectedAction.type === 'intrinsic'
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}
                  >
                    {selectedAction.type === 'intrinsic' ? '본능적' : '의도적'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedAction.name_ko}
                  <span className="text-white/40 text-sm ml-2">
                    ({selectedAction.name_en})
                  </span>
                </h3>

                <p className="text-white/70 leading-relaxed">
                  {selectedAction.description_ko}
                </p>

                {selectedAction.type === 'intentional' && (
                  <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                    <p className="text-green-300/80 text-sm">
                      의도적 행동은 연습을 통해 더 자연스럽게 할 수 있습니다.
                      처음에는 의식적 노력이 필요하지만, 점차 자동적으로 됩니다.
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Response;
