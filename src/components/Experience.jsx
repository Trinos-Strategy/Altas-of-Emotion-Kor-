import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';

// 각 감정별 산봉우리 데이터
const mountainData = {
  anger: {
    name_ko: '분노',
    name_en: 'ANGER',
    description_ko: '분노는 목표 달성을 방해하는 것에 대한 반응입니다. 가벼운 짜증부터 격렬한 분노까지 다양한 강도로 나타납니다.',
    color: '#E07B4E',
    colorLight: '#F5A882',
    states: [
      { id: 1, name_en: 'ANNOYANCE', name_ko: '짜증', intensity: 1, description: '가벼운 불편함이나 성가심' },
      { id: 2, name_en: 'FRUSTRATION', name_ko: '좌절', intensity: 2, description: '목표 달성이 막혔을 때의 느낌' },
      { id: 3, name_en: 'EXASPERATION', name_ko: '격분', intensity: 3, description: '참을 수 없는 짜증' },
      { id: 4, name_en: 'ARGUMENTATIVENESS', name_ko: '논쟁적', intensity: 4, description: '싸우고 싶은 충동' },
      { id: 5, name_en: 'BITTERNESS', name_ko: '원한', intensity: 5, description: '불공정함에 대한 분노' },
      { id: 6, name_en: 'VENGEFULNESS', name_ko: '복수심', intensity: 6, description: '앙갚음하고 싶은 욕구' },
      { id: 7, name_en: 'FURY', name_ko: '격노', intensity: 7, description: '통제할 수 없는 격렬한 분노' }
    ],
    generatePath: (width, height) => {
      const baseY = height - 50;
      const peaks = [
        { x: width * 0.1, peakY: baseY - 80 },
        { x: width * 0.22, peakY: baseY - 150 },
        { x: width * 0.35, peakY: baseY - 220 },
        { x: width * 0.48, peakY: baseY - 300 },
        { x: width * 0.61, peakY: baseY - 380 },
        { x: width * 0.76, peakY: baseY - 460 },
        { x: width * 0.9, peakY: baseY - 550 }
      ];
      return peaks.map((peak, i) => {
        const spread = 60 + i * 8;
        return {
          path: `M ${peak.x - spread},${baseY} L ${peak.x},${peak.peakY} L ${peak.x + spread},${baseY} Z`,
          labelX: peak.x,
          labelY: peak.peakY - 15
        };
      });
    }
  },
  fear: {
    name_ko: '두려움',
    name_en: 'FEAR',
    description_ko: '두려움은 위험에 대한 반응입니다. 가벼운 불안에서 극도의 공포까지 다양하게 나타납니다.',
    color: '#9B7BB8',
    colorLight: '#C4A8E0',
    states: [
      { id: 1, name_en: 'TREPIDATION', name_ko: '불안', intensity: 1, description: '약간의 걱정이나 두려움' },
      { id: 2, name_en: 'NERVOUSNESS', name_ko: '초조', intensity: 2, description: '긴장되고 불안한 상태' },
      { id: 3, name_en: 'ANXIETY', name_ko: '근심', intensity: 3, description: '미래에 대한 걱정' },
      { id: 4, name_en: 'DREAD', name_ko: '두려움', intensity: 4, description: '다가오는 위험에 대한 공포' },
      { id: 5, name_en: 'DESPERATION', name_ko: '절망', intensity: 5, description: '탈출구가 없다는 느낌' },
      { id: 6, name_en: 'PANIC', name_ko: '공황', intensity: 6, description: '압도적인 두려움' },
      { id: 7, name_en: 'HORROR', name_ko: '공포', intensity: 7, description: '충격적인 두려움' },
      { id: 8, name_en: 'TERROR', name_ko: '경악', intensity: 8, description: '극도의 공포' }
    ],
    generatePath: (width, height) => {
      const baseY = height - 50;
      const peaks = [
        { x: width * 0.08, peakY: baseY - 60 },
        { x: width * 0.18, peakY: baseY - 100 },
        { x: width * 0.28, peakY: baseY - 160 },
        { x: width * 0.38, peakY: baseY - 230 },
        { x: width * 0.50, peakY: baseY - 300 },
        { x: width * 0.62, peakY: baseY - 380 },
        { x: width * 0.76, peakY: baseY - 470 },
        { x: width * 0.92, peakY: baseY - 600 }
      ];
      return peaks.map((peak, i) => {
        const spread = 45 + i * 6;
        return {
          path: `M ${peak.x - spread},${baseY} L ${peak.x},${peak.peakY} L ${peak.x + spread},${baseY} Z`,
          labelX: peak.x,
          labelY: peak.peakY - 15
        };
      });
    }
  },
  disgust: {
    name_ko: '혐오',
    name_en: 'DISGUST',
    description_ko: '혐오는 불쾌하거나 역겨운 것에 대한 반응입니다. 가벼운 싫음에서 극도의 혐오까지 나타납니다.',
    color: '#6BAF8D',
    colorLight: '#98D4B5',
    states: [
      { id: 1, name_en: 'DISLIKE', name_ko: '싫음', intensity: 1, description: '가벼운 반감' },
      { id: 2, name_en: 'AVERSION', name_ko: '기피', intensity: 2, description: '피하고 싶은 느낌' },
      { id: 3, name_en: 'DISTASTE', name_ko: '불쾌', intensity: 3, description: '불쾌함' },
      { id: 4, name_en: 'REPUGNANCE', name_ko: '역겨움', intensity: 4, description: '강한 반감' },
      { id: 5, name_en: 'REVULSION', name_ko: '구역질', intensity: 5, description: '신체적 거부 반응' },
      { id: 6, name_en: 'ABHORRENCE', name_ko: '증오', intensity: 6, description: '극도의 혐오' },
      { id: 7, name_en: 'LOATHING', name_ko: '혐오감', intensity: 7, description: '깊은 혐오와 경멸' }
    ],
    generatePath: (width, height) => {
      const baseY = height - 50;
      const peaks = [
        { x: width * 0.1, peakY: baseY - 70, spread: 50 },
        { x: width * 0.22, peakY: baseY - 110, spread: 55 },
        { x: width * 0.34, peakY: baseY - 160, spread: 60 },
        { x: width * 0.46, peakY: baseY - 220, spread: 65 },
        { x: width * 0.58, peakY: baseY - 290, spread: 70 },
        { x: width * 0.72, peakY: baseY - 400, spread: 80 },
        { x: width * 0.88, peakY: baseY - 580, spread: 90 }
      ];
      return peaks.map((peak) => ({
        path: `M ${peak.x - peak.spread},${baseY} L ${peak.x},${peak.peakY} L ${peak.x + peak.spread},${baseY} Z`,
        labelX: peak.x,
        labelY: peak.peakY - 15
      }));
    }
  },
  sadness: {
    name_ko: '슬픔',
    name_en: 'SADNESS',
    description_ko: '슬픔은 상실이나 실망에 대한 반응입니다. 부드러운 곡선으로 표현되며, 가벼운 실망에서 깊은 절망까지 나타납니다.',
    color: '#6B9DC4',
    colorLight: '#A8C8E0',
    states: [
      { id: 1, name_en: 'DISAPPOINTMENT', name_ko: '실망', intensity: 1, description: '기대가 충족되지 않음' },
      { id: 2, name_en: 'DISCOURAGEMENT', name_ko: '낙담', intensity: 2, description: '자신감 상실' },
      { id: 3, name_en: 'DISTRAUGHT', name_ko: '비탄', intensity: 3, description: '매우 걱정되는 상태' },
      { id: 4, name_en: 'RESIGNATION', name_ko: '체념', intensity: 4, description: '포기의 느낌' },
      { id: 5, name_en: 'HELPLESSNESS', name_ko: '무력감', intensity: 5, description: '어떻게 할 수 없다는 느낌' },
      { id: 6, name_en: 'MISERY', name_ko: '비참함', intensity: 6, description: '극심한 불행' },
      { id: 7, name_en: 'DESPAIR', name_ko: '절망', intensity: 7, description: '희망의 완전한 상실' }
    ],
    generatePath: (width, height) => {
      const baseY = height - 50;
      const peaks = [
        { x: width * 0.12, peakY: baseY - 80 },
        { x: width * 0.26, peakY: baseY - 140 },
        { x: width * 0.40, peakY: baseY - 210 },
        { x: width * 0.54, peakY: baseY - 290 },
        { x: width * 0.68, peakY: baseY - 380 },
        { x: width * 0.82, peakY: baseY - 480 },
        { x: width * 0.94, peakY: baseY - 560 }
      ];
      return peaks.map((peak, i) => {
        const spread = 55 + i * 5;
        return {
          path: `M ${peak.x - spread},${baseY} Q ${peak.x - spread/2},${peak.peakY + 30} ${peak.x},${peak.peakY} Q ${peak.x + spread/2},${peak.peakY + 30} ${peak.x + spread},${baseY} Z`,
          labelX: peak.x,
          labelY: peak.peakY - 15
        };
      });
    }
  },
  enjoyment: {
    name_ko: '즐거움',
    name_en: 'ENJOYMENT',
    description_ko: '즐거움은 긍정적인 경험에 대한 반응입니다. 둥근 언덕 형태로 표현되며, 가벼운 기쁨에서 황홀경까지 나타납니다.',
    color: '#E8C547',
    colorLight: '#F5E08A',
    states: [
      { id: 1, name_en: 'SENSORY PLEASURE', name_ko: '감각적 쾌감', intensity: 1, description: '감각을 통한 즐거움' },
      { id: 2, name_en: 'REJOICING', name_ko: '기쁨', intensity: 2, description: '좋은 일에 대한 기쁨' },
      { id: 3, name_en: 'COMPASSION', name_ko: '연민', intensity: 3, description: '타인의 고통에 대한 공감' },
      { id: 4, name_en: 'AMUSEMENT', name_ko: '즐거움', intensity: 4, description: '재미있는 것에 대한 반응' },
      { id: 5, name_en: 'SCHADENFREUDE', name_ko: '고소함', intensity: 5, description: '타인의 불행에서 느끼는 기쁨' },
      { id: 6, name_en: 'RELIEF', name_ko: '안도', intensity: 6, description: '걱정이 사라진 후의 느낌' },
      { id: 7, name_en: 'PEACE', name_ko: '평화', intensity: 7, description: '내적 고요함' },
      { id: 8, name_en: 'PRIDE', name_ko: '자부심', intensity: 8, description: '성취에 대한 만족' },
      { id: 9, name_en: 'FIERO', name_ko: '환희', intensity: 9, description: '어려운 과제 달성의 기쁨' },
      { id: 10, name_en: 'ECSTASY', name_ko: '황홀경', intensity: 10, description: '압도적인 기쁨' }
    ],
    generatePath: (width, height) => {
      const baseY = height - 50;
      const peaks = [
        { x: width * 0.08, peakY: baseY - 60 },
        { x: width * 0.17, peakY: baseY - 90 },
        { x: width * 0.26, peakY: baseY - 130 },
        { x: width * 0.36, peakY: baseY - 170 },
        { x: width * 0.46, peakY: baseY - 220 },
        { x: width * 0.56, peakY: baseY - 280 },
        { x: width * 0.66, peakY: baseY - 340 },
        { x: width * 0.76, peakY: baseY - 410 },
        { x: width * 0.86, peakY: baseY - 490 },
        { x: width * 0.95, peakY: baseY - 560 }
      ];
      return peaks.map((peak, i) => {
        const spread = 40 + i * 3;
        return {
          path: `M ${peak.x - spread},${baseY} C ${peak.x - spread},${peak.peakY + 50} ${peak.x - spread/3},${peak.peakY} ${peak.x},${peak.peakY} C ${peak.x + spread/3},${peak.peakY} ${peak.x + spread},${peak.peakY + 50} ${peak.x + spread},${baseY} Z`,
          labelX: peak.x,
          labelY: peak.peakY - 12
        };
      });
    }
  }
};

const Experience = ({ selectedEmotion }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const emotionKey = selectedEmotion || 'enjoyment';
  const emotionInfo = mountainData[emotionKey] || mountainData.enjoyment;
  const currentEmotion = emotions[emotionKey] || emotions.enjoyment;

  const svgWidth = 900;
  const svgHeight = 650;

  const mountainPaths = emotionInfo.generatePath(svgWidth, svgHeight);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col lg:flex-row"
      role="region"
      aria-label="감정 경험 시각화"
    >
      {/* 왼쪽 사이드바 - Premium */}
      <motion.aside
        className="lg:w-[400px] bg-gray-50 p-8 md:p-10 lg:p-12 flex flex-col border-r border-gray-200"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex-1">
          <h2 className="text-3xl lg:text-4xl font-serif font-medium text-gray-900 mb-4 pb-4 border-b-2 border-gray-900">
            우리의 경험
          </h2>
          <p className="text-gray-500 text-base lg:text-lg mb-10 mt-6 leading-relaxed">
            하나의 감정 안에서 다양한 상태와 강도를 탐험합니다.
          </p>

          <h3 className="text-sm font-bold text-gray-900 tracking-widest mb-5 uppercase">
            {emotionInfo.name_en}의 상태
          </h3>

          <p className="text-gray-600 text-base leading-relaxed mb-8">
            {emotionInfo.description_ko}
          </p>

          <p className="text-gray-400 text-base italic">
            산봉우리를 클릭하여 각 상태에 대해 알아보세요.
          </p>

          {/* 현재 감정 표시 */}
          <div className="mt-8 flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div
              className="w-12 h-12 rounded-full shadow-md"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${emotionInfo.colorLight}, ${emotionInfo.color})`
              }}
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-gray-900">{emotionInfo.name_ko}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{emotionInfo.name_en}</p>
            </div>
          </div>
        </div>

        {/* 프리미엄 CTA 버튼 - 더 알아보기 */}
        <motion.button
          onClick={() => setSidebarOpen(true)}
          className="btn-cta-outline mt-10 w-full group"
          aria-label="더 알아보기 사이드바 열기"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-base">더 알아보기</span>
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </motion.aside>

      {/* 시각화 영역 */}
      <motion.div
        className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-gray-100/50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[70vh]"
          style={{ maxWidth: '900px' }}
          role="img"
          aria-label={`${emotionInfo.name_ko} 감정의 강도별 상태를 보여주는 산 시각화`}
        >
          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id={`mountain-gradient-${emotionKey}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={emotionInfo.color} stopOpacity="0.3" />
              <stop offset="40%" stopColor={emotionInfo.color} stopOpacity="0.6" />
              <stop offset="70%" stopColor={emotionInfo.colorLight} stopOpacity="0.8" />
              <stop offset="100%" stopColor={emotionInfo.colorLight} stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id={`mountain-gradient-hover-${emotionKey}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={emotionInfo.color} stopOpacity="0.5" />
              <stop offset="50%" stopColor={emotionInfo.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={emotionInfo.colorLight} stopOpacity="1" />
            </linearGradient>

            {/* 그림자 필터 */}
            <filter id="mountainShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15"/>
            </filter>
          </defs>

          {/* X축 */}
          <line
            x1="50"
            y1={svgHeight - 40}
            x2={svgWidth - 50}
            y2={svgHeight - 40}
            stroke="#d4d4d4"
            strokeWidth="2"
          />

          {/* 축 레이블 */}
          <text x="50" y={svgHeight - 15} fill="#737373" fontSize="12" fontWeight="500" fontFamily="var(--font-display)">
            낮은 강도
          </text>
          <text x={svgWidth - 120} y={svgHeight - 15} fill="#737373" fontSize="12" fontWeight="500" fontFamily="var(--font-display)">
            높은 강도
          </text>

          {/* 산봉우리들 */}
          {mountainPaths.map((mountain, index) => {
            const state = emotionInfo.states[index];
            const isHovered = hoveredState === index;
            const isSelected = selectedState === index;

            return (
              <g key={index}>
                <motion.path
                  d={mountain.path}
                  fill={isHovered || isSelected
                    ? `url(#mountain-gradient-hover-${emotionKey})`
                    : `url(#mountain-gradient-${emotionKey})`
                  }
                  stroke={emotionInfo.color}
                  strokeWidth={isHovered || isSelected ? "3" : "1.5"}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? {
                    opacity: hoveredState !== null && !isHovered ? 0.4 : 1,
                    scaleY: 1
                  } : {}}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    opacity: { duration: 0.2 }
                  }}
                  style={{
                    transformOrigin: 'bottom',
                    cursor: 'pointer',
                    filter: isHovered ? 'url(#mountainShadow)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredState(index)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => setSelectedState(isSelected ? null : index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedState(isSelected ? null : index);
                    }
                  }}
                  aria-label={state ? `${state.name_ko}: ${state.description}` : ''}
                />

                {/* 상태 레이블 */}
                {state && (
                  <motion.text
                    x={mountain.labelX}
                    y={mountain.labelY}
                    fill={emotionInfo.color}
                    fontSize="11"
                    fontWeight="600"
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={isInView ? {
                      opacity: hoveredState === null || isHovered ? 1 : 0.3
                    } : {}}
                    transition={{ delay: index * 0.08 + 0.3 }}
                    style={{
                      pointerEvents: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontFamily: 'var(--font-display)'
                    }}
                  >
                    {state.name_en}
                  </motion.text>
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* 상태 상세 팝업 */}
      <AnimatePresence>
        {selectedState !== null && emotionInfo.states[selectedState] && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="state-dialog-title"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedState(null)}
              aria-hidden="true"
            />
            <motion.div
              className="relative bg-white rounded-2xl p-6 lg:p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ borderTop: `4px solid ${emotionInfo.color}` }}
            >
              <button
                onClick={() => setSelectedState(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                aria-label="닫기"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: emotionInfo.color }}
                >
                  {selectedState + 1}
                </div>
                <div>
                  <h3 id="state-dialog-title" className="text-xl font-bold text-gray-900">
                    {emotionInfo.states[selectedState].name_ko}
                  </h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {emotionInfo.states[selectedState].name_en}
                  </p>
                </div>
              </div>

              {/* 강도 표시 */}
              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-2">강도</p>
                <div className="flex gap-1">
                  {[...Array(emotionInfo.states.length)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-full flex-1 transition-colors"
                      style={{
                        backgroundColor: i <= selectedState ? emotionInfo.color : '#e5e5e5'
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-[15px]">
                {emotionInfo.states[selectedState].description}
              </p>

              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: emotionInfo.color }} aria-hidden="true" />
                  {emotionInfo.name_ko} 감정의 {selectedState + 1}번째 상태
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learn More 사이드바 */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-full sm:w-[440px] bg-white z-50 overflow-y-auto shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label={`${emotionInfo.name_ko}에 대하여`}
            >
              <div className="p-6 lg:p-8">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="사이드바 닫기"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-serif font-medium mb-6 pb-4 border-b-2 border-gray-900">
                  {emotionInfo.name_ko}에 대하여
                </h2>

                <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
                  {emotionInfo.description_ko}
                </p>

                <h3 className="font-bold text-gray-900 mb-5 uppercase tracking-widest text-xs">
                  {emotionInfo.states.length}가지 상태
                </h3>

                <div className="space-y-2">
                  {emotionInfo.states.map((state, index) => (
                    <button
                      key={state.id}
                      className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                      onClick={() => {
                        setSelectedState(index);
                        setSidebarOpen(false);
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                        style={{ backgroundColor: emotionInfo.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{state.name_ko}</p>
                        <p className="text-xs text-gray-500 uppercase">{state.name_en}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
