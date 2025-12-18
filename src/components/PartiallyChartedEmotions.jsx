import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { partiallyChartedEmotions } from '../data/additionalData';

// ============================================
// 탐험 섹션 - 리디자인 버전
// 전략/타임라인 섹션과 톤 통일, 고급 심리 아카이브 컨셉
// ============================================

// 감정 카드 컴포넌트
const EmotionCard = ({ emotion, index, isExpanded, onToggle }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        onClick={() => onToggle(isExpanded ? null : emotion.id)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-2xl"
        style={{ '--ring-color': emotion.color }}
        aria-expanded={isExpanded}
        aria-controls={`emotion-content-${emotion.id}`}
      >
        <div
          className={`
            relative overflow-hidden rounded-2xl p-6
            bg-white border transition-all duration-300 ease-in-out
            ${isExpanded
              ? 'shadow-lg'
              : 'shadow-sm hover:shadow-md'
            }
          `}
          style={{
            borderColor: isExpanded
              ? `${emotion.color}66`
              : undefined,
          }}
          onMouseEnter={(e) => {
            if (!isExpanded) {
              e.currentTarget.style.borderColor = `${emotion.color}33`;
            }
          }}
          onMouseLeave={(e) => {
            if (!isExpanded) {
              e.currentTarget.style.borderColor = '';
            }
          }}
        >
          {/* 상단 컬러 바 - 확장 시에만 표시 */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
            style={{
              backgroundColor: emotion.color,
              opacity: isExpanded ? 1 : 0,
            }}
          />

          {/* 헤더 영역 */}
          <div className="flex items-center gap-4">
            {/* 아이콘 */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{
                backgroundColor: `${emotion.color}15`,
              }}
            >
              <span
                className="text-lg font-bold"
                style={{ color: emotion.color }}
              >
                {emotion.name_ko.charAt(0)}
              </span>
            </div>

            {/* 제목 */}
            <div className="flex-1 min-w-0">
              <h3
                className="text-lg font-semibold text-gray-900"
                style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
              >
                {emotion.name_ko}
              </h3>
              <p className="text-xs tracking-widest uppercase text-gray-400 mt-0.5">
                {emotion.name_en}
              </p>
            </div>

            {/* 확장 아이콘 */}
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                transition-all duration-300
                ${isExpanded ? 'bg-gray-900' : 'bg-gray-100'}
              `}
            >
              <svg
                className={`w-4 h-4 transition-all duration-300 ${isExpanded ? 'text-white rotate-180' : 'text-gray-500'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* 확장 콘텐츠 */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={`emotion-content-${emotion.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3, ease: 'easeInOut' }
                }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 pb-2 border-t border-gray-100">
                  {/* 한글 설명 */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {emotion.description_ko}
                  </p>

                  {/* 영문 설명 */}
                  <p className="text-xs text-gray-400 leading-relaxed mt-4 italic">
                    {emotion.description_en}
                  </p>

                  {/* 태그 */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${emotion.color}15`,
                        color: emotion.color,
                      }}
                    >
                      부분 탐구
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      &lt;50% 합의
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.article>
  );
};

// 섹션 헤더 컴포넌트
const SectionHeader = ({ showInfo, onToggleInfo }) => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <motion.header
      ref={headerRef}
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* 배지 */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
        <span className="text-xs font-medium text-purple-700 tracking-wider uppercase">
          Partially Charted
        </span>
      </div>

      {/* 타이틀 */}
      <h1
        className="text-4xl md:text-5xl font-light text-gray-900 mb-4"
        style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
      >
        탐험하는 감정들
      </h1>

      {/* 서브타이틀 */}
      <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-6">
        아직 완전히 탐구되지 않았지만, 우리의 감정 경험에서 중요한 역할을 하는 9가지 감정
      </p>

      {/* 정보 버튼 */}
      <button
        onClick={onToggleInfo}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
        aria-expanded={showInfo}
      >
        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>왜 "부분적으로 탐구된" 감정인가요?</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${showInfo ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 정보 패널 */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 max-w-2xl mx-auto p-6 bg-amber-50 border border-amber-100 rounded-2xl text-left">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">과학적 합의 기준</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Atlas of Emotions는 <strong>248명의 감정 과학자들</strong>을 대상으로 한 설문조사를 기반으로 합니다.
                    5가지 핵심 감정은 <span className="text-purple-600 font-medium">76% 이상</span>의 과학자들이
                    보편적 감정으로 동의했습니다. 반면, 아래의 감정들은 <span className="text-pink-600 font-medium">50% 이하</span>의 합의를 얻어
                    "부분적으로 탐구된" 감정으로 분류됩니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// 인용구 컴포넌트
const QuoteSection = () => {
  const quoteRef = useRef(null);
  const isInView = useInView(quoteRef, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={quoteRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mt-16"
    >
      <div
        className="relative p-10 md:p-12 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        }}
      >
        {/* 장식 인용부호 */}
        <div
          className="absolute left-6 top-4 text-[120px] font-serif leading-none select-none pointer-events-none"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          "
        </div>

        <div className="relative z-10 text-center">
          <p
            className="text-xl md:text-2xl text-white leading-relaxed mb-6"
            style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}
          >
            감정의 세계는 아직 탐험 중입니다.
            <br />
            <span className="font-medium">열린 마음</span>으로 새로운 감정을 발견하세요.
          </p>
          <p className="text-sm text-white/70 font-medium">
            — Atlas of Emotions
          </p>
        </div>
      </div>
    </motion.section>
  );
};

// 메타 정보 컴포넌트
const MetaInfo = () => {
  const metaRef = useRef(null);
  const isInView = useInView(metaRef, { once: true });

  return (
    <motion.div
      ref={metaRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-10 text-center"
    >
      <p className="text-sm text-gray-400 tracking-wide">
        <span className="font-medium text-gray-500">9</span>개 감정
        <span className="mx-3 text-gray-300">·</span>
        <span className="font-medium text-gray-500">&lt;50%</span> 과학자 합의
        <span className="mx-3 text-gray-300">·</span>
        <span className="font-medium text-gray-500">248</span>명 참여
      </p>
    </motion.div>
  );
};

// 메인 컴포넌트
const PartiallyChartedEmotions = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <section
      className="min-h-screen py-12 px-4 md:px-8"
      style={{ backgroundColor: '#FAFAFA' }}
      role="region"
      aria-label="탐험하는 감정들"
    >
      <div className="max-w-5xl mx-auto">
        {/* 헤더 */}
        <SectionHeader
          showInfo={showInfo}
          onToggleInfo={() => setShowInfo(!showInfo)}
        />

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partiallyChartedEmotions.map((emotion, index) => (
            <EmotionCard
              key={emotion.id}
              emotion={emotion}
              index={index}
              isExpanded={expandedId === emotion.id}
              onToggle={setExpandedId}
            />
          ))}
        </div>

        {/* 인용구 */}
        <QuoteSection />

        {/* 메타 정보 */}
        <MetaInfo />
      </div>
    </section>
  );
};

export default PartiallyChartedEmotions;
