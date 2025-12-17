import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';
import ActionsGraph from './ActionsGraph';

const Response = ({ selectedEmotion }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showActionTypes, setShowActionTypes] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentEmotion = selectedEmotion
    ? emotions[selectedEmotion]
    : emotions.enjoyment;

  const intrinsicActions = currentEmotion.actions.filter(a => a.type === 'intrinsic');
  const intentionalActions = currentEmotion.actions.filter(a => a.type === 'intentional');

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 md:py-32"
      role="region"
      aria-label="감정 반응"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Premium Section Header */}
        <motion.header
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <h2>
            감정 반응
          </h2>

          <p>
            감정은 행동으로 이어집니다. <span className="font-semibold" style={{ color: currentEmotion.color }}>{currentEmotion.name_ko}</span>를 느낄 때
            우리는 본능적 또는 의도적으로 반응합니다.
          </p>
        </motion.header>

        {/* Emotion indicator */}
        {!selectedEmotion && (
          <motion.div
            className="flex justify-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass rounded-full px-5 py-2.5 flex items-center border border-gray-200/60 shadow-sm">
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: currentEmotion.color }}
                aria-hidden="true"
              />
              <span className="text-gray-600 text-sm font-medium">
                아래 감정 버튼을 선택하여 다른 반응을 확인하세요
              </span>
            </div>
          </motion.div>
        )}

        {/* Actions Graph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ActionsGraph
            emotion={currentEmotion}
            selectedAction={selectedAction}
            setSelectedAction={setSelectedAction}
          />
        </motion.div>

        {/* Action Types Explanation */}
        <motion.div
          className="mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowActionTypes(!showActionTypes)}
            className="w-full flex items-center justify-between glass rounded-xl p-5 hover:bg-white/90 transition-all border border-gray-200/60 shadow-sm"
            aria-expanded={showActionTypes}
          >
            <span className="text-gray-800 font-semibold text-base">
              본능적 행동 vs 의도적 행동
            </span>
            <motion.svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: showActionTypes ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden="true"
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
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {/* Intrinsic Actions */}
                  <div
                    className="card p-8 md:p-10"
                    style={{ borderTop: `4px solid ${currentEmotion.color}` }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-50">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">
                        본능적 행동
                      </h4>
                    </div>
                    <p className="text-gray-500 text-base mb-6 leading-relaxed">
                      자동적으로 발생하는 반응으로, 의식적 통제 없이 나타납니다.
                      진화적으로 프로그래밍된 행동입니다.
                    </p>
                    <ul className="space-y-3" role="list">
                      {intrinsicActions.map((action, i) => (
                        <motion.li
                          key={action.name_en}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full mt-1.5 mr-3 flex-shrink-0"
                            style={{ backgroundColor: currentEmotion.color }}
                            aria-hidden="true"
                          />
                          <div>
                            <span className="text-gray-800 font-medium">{action.name_ko}</span>
                            <span className="text-gray-400 text-sm ml-2">
                              ({action.name_en})
                            </span>
                            {action.description_ko && (
                              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
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
                    className="card p-8 md:p-10"
                    style={{ borderTop: `4px solid ${currentEmotion.colorLight}` }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-50">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">
                        의도적 행동
                      </h4>
                    </div>
                    <p className="text-gray-500 text-base mb-6 leading-relaxed">
                      의식적으로 선택하는 반응으로, 감정을 건설적으로 다루는 방법입니다.
                      학습과 연습을 통해 발달시킬 수 있습니다.
                    </p>
                    <ul className="space-y-3" role="list">
                      {intentionalActions.map((action, i) => (
                        <motion.li
                          key={action.name_en}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full mt-1.5 mr-3 flex-shrink-0"
                            style={{ backgroundColor: currentEmotion.colorLight }}
                            aria-hidden="true"
                          />
                          <div>
                            <span className="text-gray-800 font-medium">{action.name_ko}</span>
                            <span className="text-gray-400 text-sm ml-2">
                              ({action.name_en})
                            </span>
                            {action.description_ko && (
                              <p className="text-gray-500 text-sm mt-1 leading-relaxed">
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

        {/* Selected Action Detail Modal */}
        <AnimatePresence>
          {selectedAction && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="action-dialog-title"
            >
              <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setSelectedAction(null)}
                aria-hidden="true"
              />
              <motion.div
                className="relative bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
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
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                  aria-label="닫기"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      selectedAction.type === 'intrinsic'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {selectedAction.type === 'intrinsic' ? '본능적' : '의도적'}
                  </span>
                </div>

                <h3 id="action-dialog-title" className="text-xl font-bold text-gray-800 mb-2">
                  {selectedAction.name_ko}
                  <span className="text-gray-400 text-sm font-normal ml-2">
                    ({selectedAction.name_en})
                  </span>
                </h3>

                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {selectedAction.description_ko}
                </p>

                {selectedAction.type === 'intentional' && (
                  <div className="mt-5 p-4 bg-green-50 rounded-xl border border-green-100">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p className="text-green-700 text-sm leading-relaxed">
                        의도적 행동은 연습을 통해 더 자연스럽게 할 수 있습니다.
                        처음에는 의식적 노력이 필요하지만, 점차 자동적으로 됩니다.
                      </p>
                    </div>
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
