import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';

// 원본 사이트 분석 기반 - 감정별 크기 비율
const emotionSizes = {
  fear: 420,        // 가장 큰 원형 (보라)
  enjoyment: 380,   // 두번째로 큰 원형 (노랑)
  anger: 320,       // 중간 크기 (빨강)
  disgust: 300,     // 중간 크기 (초록)
  sadness: 260      // 가장 작은 원형 (파랑)
};

// 감정별 위치 (중앙 기준 오프셋)
const emotionPositions = {
  enjoyment: { x: 0, y: -60 },      // 상단 중앙
  fear: { x: 150, y: 30 },          // 오른쪽
  anger: { x: -130, y: 50 },        // 왼쪽
  sadness: { x: 60, y: 130 },       // 오른쪽 아래
  disgust: { x: -80, y: 120 }       // 왼쪽 아래
};

// 감정별 색상 데이터
const emotionColors = {
  anger: {
    primary: '#E85A4F',
    light: '#FF8C82',
    dark: '#C4423A',
    name_ko: '분노',
    name_en: 'ANGER'
  },
  fear: {
    primary: '#9B7BB8',
    light: '#C4A8E0',
    dark: '#6D28D9',
    name_ko: '두려움',
    name_en: 'FEAR'
  },
  disgust: {
    primary: '#10B981',
    light: '#34D399',
    dark: '#059669',
    name_ko: '혐오',
    name_en: 'DISGUST'
  },
  sadness: {
    primary: '#3B82F6',
    light: '#60A5FA',
    dark: '#1D4ED8',
    name_ko: '슬픔',
    name_en: 'SADNESS'
  },
  enjoyment: {
    primary: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    name_ko: '즐거움',
    name_en: 'ENJOYMENT'
  }
};

// 동심원 레이어 생성 함수
const ConcentricCircle = ({ emotion, size, position, isSelected, onClick, delay = 0 }) => {
  const colors = emotionColors[emotion];
  const layers = [
    { scale: 1, opacity: 0.15 },
    { scale: 0.85, opacity: 0.25 },
    { scale: 0.70, opacity: 0.40 },
    { scale: 0.50, opacity: 0.65 },
    { scale: 0.30, opacity: 0.90 }
  ];

  return (
    <motion.g
      className="emotion-circle-group"
      style={{ cursor: 'pointer' }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={() => onClick(emotion)}
    >
      {/* 외부 글로우 효과 */}
      <defs>
        <filter id={`glow-${emotion}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id={`gradient-${emotion}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={colors.light} stopOpacity="1" />
          <stop offset="50%" stopColor={colors.primary} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.dark} stopOpacity="0.7" />
        </radialGradient>
      </defs>

      {/* 동심원 레이어들 - 바깥에서 안쪽으로 */}
      {layers.map((layer, index) => (
        <motion.circle
          key={index}
          cx={position.x}
          cy={position.y}
          r={(size / 2) * layer.scale}
          fill={colors.primary}
          fillOpacity={layer.opacity}
          stroke={index === layers.length - 1 ? colors.dark : 'none'}
          strokeWidth={index === layers.length - 1 ? 2 : 0}
          filter={index === 0 ? `url(#glow-${emotion})` : undefined}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      ))}

      {/* 선택 표시 링 */}
      {isSelected && (
        <motion.circle
          cx={position.x}
          cy={position.y}
          r={size / 2 + 10}
          fill="none"
          stroke={colors.primary}
          strokeWidth="3"
          strokeDasharray="10 5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{
            opacity: { duration: 0.3 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
      )}

      {/* 감정 레이블 */}
      <motion.text
        x={position.x}
        y={position.y - 5}
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="700"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
          pointerEvents: 'none'
        }}
      >
        {colors.name_ko}
      </motion.text>
      <motion.text
        x={position.x}
        y={position.y + 15}
        textAnchor="middle"
        fill="rgba(255,255,255,0.8)"
        fontSize="10"
        fontWeight="500"
        letterSpacing="1"
        style={{
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
          pointerEvents: 'none'
        }}
      >
        {colors.name_en}
      </motion.text>
    </motion.g>
  );
};

const Experience = ({ selectedEmotion }) => {
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [localSelectedEmotion, setLocalSelectedEmotion] = useState(selectedEmotion);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });

  // 반응형 크기 조정
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const scaledWidth = Math.min(width - 40, 900);
        const scaledHeight = Math.min(scaledWidth * 0.85, 750);
        setDimensions({ width: scaledWidth, height: scaledHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 외부 선택 동기화
  useEffect(() => {
    if (selectedEmotion) {
      setLocalSelectedEmotion(selectedEmotion);
    }
  }, [selectedEmotion]);

  const handleEmotionClick = (emotion) => {
    setLocalSelectedEmotion(localSelectedEmotion === emotion ? null : emotion);
  };

  // 현재 선택된 감정 정보
  const currentEmotion = localSelectedEmotion
    ? emotions[localSelectedEmotion]
    : null;
  const currentColors = localSelectedEmotion
    ? emotionColors[localSelectedEmotion]
    : null;

  // 크기 스케일 계산 (화면 크기에 맞게)
  const scale = Math.min(dimensions.width / 900, dimensions.height / 750);
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  // 감정별 위치 계산 (스케일 적용)
  const getScaledPosition = (emotion) => {
    const pos = emotionPositions[emotion];
    return {
      x: centerX + pos.x * scale,
      y: centerY + pos.y * scale
    };
  };

  // 감정별 크기 계산 (스케일 적용)
  const getScaledSize = (emotion) => {
    return emotionSizes[emotion] * scale;
  };

  // 렌더링 순서 (작은 것이 위에 오도록)
  const renderOrder = ['fear', 'enjoyment', 'anger', 'disgust', 'sadness'];

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
            감정의 대륙
          </h2>
          <p className="text-gray-500 text-base lg:text-lg mb-10 mt-6 leading-relaxed">
            다섯 가지 핵심 감정이 서로 연결되어 있습니다. 원을 클릭하여 각 감정을 탐험하세요.
          </p>

          {/* 현재 선택된 감정 정보 */}
          {currentEmotion ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h3 className="text-sm font-bold text-gray-900 tracking-widest mb-5 uppercase">
                {currentColors.name_en}
              </h3>

              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {currentEmotion.description_ko}
              </p>

              {/* 상태 목록 */}
              <div className="space-y-2">
                {currentEmotion.states && currentEmotion.states.slice(0, 5).map((state, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: currentColors.primary }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{state.name_ko}</p>
                      <p className="text-xs text-gray-400 uppercase">{state.name_en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="text-gray-400 text-base italic">
              감정 원을 클릭하여 자세한 정보를 확인하세요.
            </div>
          )}

          {/* 현재 감정 표시 */}
          {localSelectedEmotion && (
            <div className="mt-8 flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div
                className="w-12 h-12 rounded-full shadow-md"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${currentColors.light}, ${currentColors.primary})`
                }}
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-gray-900">{currentColors.name_ko}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wide">{currentColors.name_en}</p>
              </div>
            </div>
          )}
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
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-gray-100/50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <svg
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          className="w-full h-auto max-h-[75vh]"
          style={{ maxWidth: `${dimensions.width}px` }}
          role="img"
          aria-label="다섯 가지 감정이 서로 겹치는 동심원 시각화"
        >
          {/* 배경 그라데이션 */}
          <defs>
            <radialGradient id="bg-gradient" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(245,245,245,0)" />
            </radialGradient>
          </defs>
          <circle
            cx={centerX}
            cy={centerY}
            r={Math.min(dimensions.width, dimensions.height) * 0.45}
            fill="url(#bg-gradient)"
          />

          {/* 감정 동심원들 - 큰 것부터 렌더링 (작은 것이 위에 오도록) */}
          {renderOrder.map((emotion, index) => (
            <ConcentricCircle
              key={emotion}
              emotion={emotion}
              size={getScaledSize(emotion)}
              position={getScaledPosition(emotion)}
              isSelected={localSelectedEmotion === emotion}
              onClick={handleEmotionClick}
              delay={0.1 + index * 0.1}
            />
          ))}

          {/* 안내 텍스트 */}
          <text
            x={centerX}
            y={dimensions.height - 30}
            textAnchor="middle"
            fill="#9CA3AF"
            fontSize="14"
            fontFamily="var(--font-display)"
          >
            각 감정 원을 클릭하여 탐험하세요
          </text>
        </svg>
      </motion.div>

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
              aria-label="감정에 대하여"
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
                  다섯 가지 핵심 감정
                </h2>

                <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
                  폴 에크먼 박사의 연구에 기반한 다섯 가지 보편적 감정입니다.
                  각 감정은 고유한 촉발요인, 경험 상태, 반응, 그리고 다른 감정과의 관계를 가지고 있습니다.
                </p>

                <h3 className="font-bold text-gray-900 mb-5 uppercase tracking-widest text-xs">
                  모든 감정
                </h3>

                <div className="space-y-2">
                  {Object.keys(emotionColors).map((emotionKey) => {
                    const colors = emotionColors[emotionKey];
                    const emotion = emotions[emotionKey];
                    return (
                      <button
                        key={emotionKey}
                        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left"
                        onClick={() => {
                          setLocalSelectedEmotion(emotionKey);
                          setSidebarOpen(false);
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                          style={{
                            background: `radial-gradient(circle at 30% 30%, ${colors.light}, ${colors.primary})`
                          }}
                        >
                          <span className="text-white text-xs font-bold">{colors.name_ko.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{colors.name_ko}</p>
                          <p className="text-xs text-gray-500 uppercase">{colors.name_en}</p>
                        </div>
                        <div
                          className="w-6 h-6 rounded-full opacity-60"
                          style={{ backgroundColor: colors.primary }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* 크기 범례 */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    원의 크기 의미
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    각 감정 원의 크기는 해당 감정의 영향력과 경험의 깊이를 나타냅니다.
                    원들이 겹치는 부분은 감정들 사이의 상호작용을 표현합니다.
                  </p>
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
