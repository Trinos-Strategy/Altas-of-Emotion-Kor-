import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions, emotionOrder, dalaiLamaQuote, resources } from '../data/emotions';
import AntidotesTable from './AntidotesTable';

const Strategies = ({ selectedEmotion }) => {
  const [activeTab, setActiveTab] = useState('antidotes');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentEmotion = selectedEmotion
    ? emotions[selectedEmotion]
    : null;

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center px-4 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-medium text-[#1a1a1a] text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          감정 전략
        </motion.h2>

        <motion.p
          className="text-[#666] text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          감정을 건설적으로 다루는 방법을 배워보세요.
          각 감정에 대한 해독제와 방해물을 이해하면 더 나은 선택을 할 수 있습니다.
        </motion.p>

        {/* Dalai Lama Quote */}
        <motion.div
          className="bg-white rounded-2xl p-8 mb-12 text-center shadow-sm border border-gray-100 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#A78BCA]/10 via-transparent to-[#F5D76E]/10" />
          <div className="relative">
            <svg
              className="w-10 h-10 mx-auto mb-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl text-gray-700 italic leading-relaxed mb-4">
              "{dalaiLamaQuote.ko}"
            </p>
            <p className="text-gray-500 text-sm font-medium">— 달라이 라마</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="glass rounded-full p-1.5 flex border border-gray-200/50">
            <button
              onClick={() => setActiveTab('antidotes')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'antidotes'
                  ? 'bg-gray-800 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              방해물과 해독제
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'resources'
                  ? 'bg-gray-800 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              리소스
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'antidotes' ? (
            <motion.div
              key="antidotes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AntidotesTable
                selectedEmotion={currentEmotion}
                allEmotions={emotions}
                emotionOrder={emotionOrder}
              />
            </motion.div>
          ) : (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ResourcesList />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Additional Guidance */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-6 text-center border border-gray-200/50">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#7BA7D0]/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#7BA7D0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-gray-800 font-bold mb-2">인식하기</h3>
            <p className="text-gray-600 text-sm">
              감정을 느낄 때 잠시 멈추고 무엇을 느끼는지 이름 붙여보세요.
              인식이 변화의 첫 걸음입니다.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 text-center border border-gray-200/50">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#7DC4A5]/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#7DC4A5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-gray-800 font-bold mb-2">자기 연민</h3>
            <p className="text-gray-600 text-sm">
              모든 감정은 자연스러운 것입니다.
              자신을 판단하지 말고 친절하게 대하세요.
            </p>
          </div>

          <div className="glass rounded-2xl p-6 text-center border border-gray-200/50">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F5D76E]/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-[#E8C84A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-gray-800 font-bold mb-2">연습하기</h3>
            <p className="text-gray-600 text-sm">
              감정 조절은 기술입니다.
              규칙적인 연습으로 점점 더 자연스러워집니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ResourcesList = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
        추천 리소스
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {resources.map((resource, i) => (
          <motion.a
            key={resource.title_en}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 hover:bg-white/90 transition-all border border-gray-200/50 group block shadow-sm hover:shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      resource.type === 'YouTube'
                        ? 'bg-red-100 text-red-600'
                        : resource.type === 'Meditation'
                        ? 'bg-purple-100 text-purple-600'
                        : resource.type === 'App'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {resource.type}
                  </span>
                </div>
                <h4 className="text-gray-800 font-medium group-hover:text-gray-900">
                  {resource.title_ko}
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  {resource.title_en}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-300 group-hover:text-gray-500 flex-shrink-0 ml-4 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        className="mt-8 glass rounded-xl p-6 text-center border border-gray-200/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gray-600">
          더 많은 리소스는{' '}
          <a
            href="https://atlasofemotions.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E8857B] hover:underline font-medium"
          >
            Atlas of Emotions 공식 사이트
          </a>
          에서 확인하세요.
        </p>
      </motion.div>
    </div>
  );
};

export default Strategies;
