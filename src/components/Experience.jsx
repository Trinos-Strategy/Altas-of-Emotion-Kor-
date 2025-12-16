import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';

// 각 감정별 산봉우리 데이터
const mountainData = {
  anger: {
    name_ko: '분노',
    name_en: 'ANGER',
    description_ko: '분노는 목표 달성을 방해하는 것에 대한 반응입니다. 가벼운 짜증부터 격렬한 분노까지 다양한 강도로 나타납니다.',
    color: '#D32F2F',
    colorLight: '#EF5350',
    states: [
      { id: 1, name_en: 'ANNOYANCE', name_ko: '짜증', intensity: 1, description: '가벼운 불편함이나 성가심' },
      { id: 2, name_en: 'FRUSTRATION', name_ko: '좌절', intensity: 2, description: '목표 달성이 막혔을 때의 느낌' },
      { id: 3, name_en: 'EXASPERATION', name_ko: '격분', intensity: 3, description: '참을 수 없는 짜증' },
      { id: 4, name_en: 'ARGUMENTATIVENESS', name_ko: '논쟁적', intensity: 4, description: '싸우고 싶은 충동' },
      { id: 5, name_en: 'BITTERNESS', name_ko: '원한', intensity: 5, description: '불공정함에 대한 분노' },
      { id: 6, name_en: 'VENGEFULNESS', name_ko: '복수심', intensity: 6, description: '앙갚음하고 싶은 욕구' },
      { id: 7, name_en: 'FURY', name_ko: '격노', intensity: 7, description: '통제할 수 없는 격렬한 분노' }
    ],
    // 뾰족한 삼각형 산들 - 왼쪽에서 오른쪽으로 점점 높아짐
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
    color: '#7B1FA2',
    colorLight: '#AB47BC',
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
    color: '#388E3C',
    colorLight: '#66BB6A',
    states: [
      { id: 1, name_en: 'DISLIKE', name_ko: '싫음', intensity: 1, description: '가벼운 반감' },
      { id: 2, name_en: 'AVERSION', name_ko: '기피', intensity: 2, description: '피하고 싶은 느낌' },
      { id: 3, name_en: 'DISTASTE', name_ko: '불쾌', intensity: 3, description: '불쾌함' },
      { id: 4, name_en: 'REPUGNANCE', name_ko: '역겨움', intensity: 4, description: '강한 반감' },
      { id: 5, name_en: 'REVULSION', name_ko: '구역질', intensity: 5, description: '신체적 거부 반응' },
      { id: 6, name_en: 'ABHORRENCE', name_ko: '증오', intensity: 6, description: '극도의 혐오' },
      { id: 7, name_en: 'LOATHING', name_ko: '혐오감', intensity: 7, description: '깊은 혐오와 경멸' }
    ],
    // 왼쪽 작은 산들 + 오른쪽 거대한 봉우리
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
    color: '#1976D2',
    colorLight: '#42A5F5',
    states: [
      { id: 1, name_en: 'DISAPPOINTMENT', name_ko: '실망', intensity: 1, description: '기대가 충족되지 않음' },
      { id: 2, name_en: 'DISCOURAGEMENT', name_ko: '낙담', intensity: 2, description: '자신감 상실' },
      { id: 3, name_en: 'DISTRAUGHT', name_ko: '비탄', intensity: 3, description: '매우 걱정되는 상태' },
      { id: 4, name_en: 'RESIGNATION', name_ko: '체념', intensity: 4, description: '포기의 느낌' },
      { id: 5, name_en: 'HELPLESSNESS', name_ko: '무력감', intensity: 5, description: '어떻게 할 수 없다는 느낌' },
      { id: 6, name_en: 'MISERY', name_ko: '비참함', intensity: 6, description: '극심한 불행' },
      { id: 7, name_en: 'DESPAIR', name_ko: '절망', intensity: 7, description: '희망의 완전한 상실' }
    ],
    // 부드러운 곡선 산
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
        // 곡선형 산 (quadratic bezier)
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
    color: '#FFA726',
    colorLight: '#FFB74D',
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
    // 둥근 언덕들
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
        // 둥근 형태 (cubic bezier)
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

  // 기본 감정 또는 선택된 감정
  const emotionKey = selectedEmotion || 'enjoyment';
  const emotionInfo = mountainData[emotionKey] || mountainData.enjoyment;
  const currentEmotion = emotions[emotionKey] || emotions.enjoyment;

  // SVG 크기
  const svgWidth = 900;
  const svgHeight = 650;

  // 산봉우리 경로 생성
  const mountainPaths = emotionInfo.generatePath(svgWidth, svgHeight);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col lg:flex-row">
      {/* 왼쪽 사이드바 */}
      <motion.div
        className="lg:w-[320px] bg-[#FAFAFA] p-6 lg:p-10 flex flex-col border-r border-gray-200"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1">
          <h2 className="text-2xl lg:text-3xl font-serif font-medium text-[#1a1a1a] mb-2 pb-3 border-b-2 border-[#1a1a1a]">
            우리의 경험
          </h2>
          <p className="text-[#555] text-sm lg:text-base mb-6 mt-4 leading-relaxed">
            하나의 감정 안에서 다양한 상태와 강도를 탐험합니다.
          </p>

          <h3 className="text-sm lg:text-base font-bold text-[#1a1a1a] tracking-wider mb-3 uppercase">
            {emotionInfo.name_en}의 상태
          </h3>

          <p className="text-[#666] text-sm leading-relaxed mb-6">
            {emotionInfo.description_ko}
          </p>

          <p className="text-[#888] text-sm italic">
            산봉우리를 클릭하여 각 상태에 대해 알아보세요.
          </p>

          {/* 현재 감정 표시 */}
          <div className="mt-8 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${emotionInfo.colorLight}, ${emotionInfo.color})`
              }}
            />
            <div>
              <p className="font-medium text-[#1a1a1a]">{emotionInfo.name_ko}</p>
              <p className="text-xs text-[#888] uppercase">{emotionInfo.name_en}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="mt-6 px-6 py-3 border-2 border-[#1a1a1a] text-[#1a1a1a] font-medium hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
        >
          더 알아보기 →
        </button>
      </motion.div>

      {/* 시각화 영역 */}
      <motion.div
        className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-[#F5F5F5] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[70vh]"
          style={{ maxWidth: '900px' }}
        >
          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id={`mountain-gradient-${emotionKey}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={emotionInfo.color} stopOpacity="0.3" />
              <stop offset="40%" stopColor={emotionInfo.color} stopOpacity="0.6" />
              <stop offset="70%" stopColor={emotionInfo.colorLight} stopOpacity="0.8" />
              <stop offset="100%" stopColor={emotionInfo.colorLight} stopOpacity="0.95" />
            </linearGradient>

            {/* 호버 시 밝은 그라데이션 */}
            <linearGradient id={`mountain-gradient-hover-${emotionKey}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={emotionInfo.color} stopOpacity="0.5" />
              <stop offset="50%" stopColor={emotionInfo.color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={emotionInfo.colorLight} stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* X축 */}
          <line
            x1="50"
            y1={svgHeight - 40}
            x2={svgWidth - 50}
            y2={svgHeight - 40}
            stroke="#ccc"
            strokeWidth="2"
          />

          {/* 축 레이블 */}
          <text x="50" y={svgHeight - 15} fill="#888" fontSize="12" fontWeight="500">
            낮은 강도
          </text>
          <text x={svgWidth - 120} y={svgHeight - 15} fill="#888" fontSize="12" fontWeight="500">
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
                    filter: isHovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'none'
                  }}
                  onMouseEnter={() => setHoveredState(index)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => setSelectedState(isSelected ? null : index)}
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
                      letterSpacing: '0.5px'
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
          >
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setSelectedState(null)}
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
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: emotionInfo.color }}
                >
                  {selectedState + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a1a]">
                    {emotionInfo.states[selectedState].name_ko}
                  </h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {emotionInfo.states[selectedState].name_en}
                  </p>
                </div>
              </div>

              {/* 강도 표시 */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">강도</p>
                <div className="flex gap-1">
                  {[...Array(emotionInfo.states.length)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full flex-1"
                      style={{
                        backgroundColor: i <= selectedState ? emotionInfo.color : '#e5e5e5'
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {emotionInfo.states[selectedState].description}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  <span style={{ color: emotionInfo.color }}>●</span> {emotionInfo.name_ko} 감정의 {selectedState + 1}번째 상태
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
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-full sm:w-[420px] bg-white z-50 overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 lg:p-8">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-serif font-medium mb-6 pb-3 border-b-2 border-[#1a1a1a]">
                  {emotionInfo.name_ko}에 대하여
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {emotionInfo.description_ko}
                </p>

                <h3 className="font-bold text-[#1a1a1a] mb-4 uppercase tracking-wide text-sm">
                  {emotionInfo.states.length}가지 상태
                </h3>

                <div className="space-y-3">
                  {emotionInfo.states.map((state, index) => (
                    <div
                      key={state.id}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedState(index);
                        setSidebarOpen(false);
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                        style={{ backgroundColor: emotionInfo.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-[#1a1a1a]">{state.name_ko}</p>
                        <p className="text-xs text-gray-500 uppercase">{state.name_en}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
