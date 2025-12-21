import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

const ContinentsView = ({ onContinentClick, hoveredContinent, setHoveredContinent }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLegendExpanded, setIsLegendExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Position config - 충분한 간격으로 분산 배치 (겹침 방지)
  // viewBox 100x100 기준, 원 반지름 14 고려하여 최소 30 이상 간격 확보
  const positions = [
    { x: 50, y: 18, scale: 1.0, floatDuration: 6, floatDelay: 0 },      // anger - 최상단 중앙
    { x: 15, y: 45, scale: 0.95, floatDuration: 7, floatDelay: 1 },     // fear - 좌측 중앙
    { x: 85, y: 45, scale: 0.95, floatDuration: 5, floatDelay: 2 },     // disgust - 우측 중앙
    { x: 25, y: 78, scale: 1.0, floatDuration: 8, floatDelay: 0.5 },    // sadness - 좌측 하단
    { x: 75, y: 78, scale: 1.0, floatDuration: 6.5, floatDelay: 1.5 },  // enjoyment - 우측 하단
  ];

  // Floating animation variants - 부드러운 움직임
  const floatVariants = (duration, delay) => ({
    animate: {
      y: [0, -2, 0, 2, 0],
      x: [0, 1.5, 0, -1.5, 0],
      transition: {
        y: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        },
        x: {
          duration: duration * 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay
        }
      }
    }
  });

  // Responsive base radius - 더 작게 조정하여 겹침 방지
  const baseRadius = isMobile ? 12 : 14;

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] md:h-[600px]">
      {/* SVG Container */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {emotionOrder.map((emotionId) => {
            const emotion = emotions[emotionId];
            return (
              <radialGradient
                key={`gradient-${emotionId}`}
                id={`gradient-${emotionId}`}
                cx="30%"
                cy="30%"
                r="70%"
              >
                <stop offset="0%" stopColor={emotion.colorLight} stopOpacity="0.95" />
                <stop offset="60%" stopColor={emotion.color} stopOpacity="0.85" />
                <stop offset="100%" stopColor={emotion.colorDark || emotion.color} stopOpacity="0.7" />
              </radialGradient>
            );
          })}

          {/* Enhanced drop shadow filter */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.35"/>
          </filter>

          {/* Glow filter for hover */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Emotion Circles with Floating Animation */}
        {emotionOrder.map((emotionId, index) => {
          const emotion = emotions[emotionId];
          const pos = positions[index];
          const isHovered = hoveredContinent === emotionId;
          const radius = baseRadius * pos.scale;
          const hoverRadius = radius * 1.15;

          return (
            <motion.g
              key={emotionId}
              variants={floatVariants(pos.floatDuration, pos.floatDelay)}
              animate="animate"
              style={{
                cursor: 'pointer',
                // hover 시 z-index 올리기
                zIndex: isHovered ? 100 : index
              }}
            >
              {/* 투명한 히트 영역 (터치/클릭 영역 확대) */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={radius + 5}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredContinent(emotionId)}
                onMouseLeave={() => setHoveredContinent(null)}
                onClick={() => onContinentClick(emotionId)}
                style={{ touchAction: 'manipulation' }}
              />

              {/* 실제 감정 원 */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                fill={`url(#gradient-${emotionId})`}
                stroke={emotion.color}
                strokeWidth={isHovered ? 1.5 : 0.5}
                filter={isHovered ? "url(#glow)" : "url(#shadow)"}
                className="cursor-pointer"
                initial={{ r: 0, opacity: 0 }}
                animate={{
                  r: isHovered ? hoverRadius : radius,
                  opacity: 1,
                }}
                transition={{
                  r: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity: { duration: 0.8, delay: index * 0.12 }
                }}
                onMouseEnter={() => setHoveredContinent(emotionId)}
                onMouseLeave={() => setHoveredContinent(null)}
                onClick={() => onContinentClick(emotionId)}
                style={{ touchAction: 'manipulation' }}
              />

              {/* Emotion Label - 한국어 */}
              <motion.text
                x={pos.x}
                y={pos.y - 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                fill="white"
                fontSize={isMobile ? 3 : 3.5}
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  fontSize: isHovered ? (isMobile ? 3.5 : 4) : (isMobile ? 3 : 3.5)
                }}
                transition={{ delay: 0.4 + index * 0.1 }}
                style={{
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  letterSpacing: '0.05em'
                }}
              >
                {emotion.name_ko}
              </motion.text>

              {/* Emotion Label - 영어 (작게) */}
              <motion.text
                x={pos.x}
                y={pos.y + (isMobile ? 3 : 3.5)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                fill="white"
                fillOpacity={isHovered ? 0.9 : 0.6}
                fontSize={isMobile ? 1.5 : 1.8}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
              >
                ({emotion.name_en})
              </motion.text>

              {/* 클릭 안내 아이콘 (hover 시) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <circle
                      cx={pos.x + radius * 0.7}
                      cy={pos.y - radius * 0.7}
                      r={2.5}
                      fill="white"
                      fillOpacity={0.9}
                    />
                    <text
                      x={pos.x + radius * 0.7}
                      y={pos.y - radius * 0.7 + 0.3}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={emotion.color}
                      fontSize={2}
                      fontWeight="bold"
                    >
                      →
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.g>
          );
        })}
      </svg>

      {/* Hover Info Card - 개선된 디자인 */}
      <AnimatePresence>
        {hoveredContinent && (
          <motion.div
            className={`absolute left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-2xl p-5 max-w-sm w-[calc(100%-2rem)] shadow-xl ${
              isMobile ? 'bottom-3' : 'bottom-6'
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              borderLeft: `4px solid ${emotions[hoveredContinent].color}`
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full shadow-inner"
                style={{ backgroundColor: emotions[hoveredContinent].color }}
              />
              <h3 className="text-gray-900 font-semibold text-lg">
                {emotions[hoveredContinent].name_ko}
                <span className="text-gray-400 font-normal text-sm ml-2">
                  ({emotions[hoveredContinent].name_en})
                </span>
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {emotions[hoveredContinent].description_ko}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span
                className="px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: emotions[hoveredContinent].color }}
              >
                클릭하여 상세 보기
              </span>
              <span className="text-gray-400">
                {emotions[hoveredContinent].states?.length || 0}개 상태
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend - 개선된 디자인 */}
      <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg ${isMobile ? 'p-2' : 'p-3'}`}>
        {isMobile ? (
          <>
            <button
              onClick={() => setIsLegendExpanded(!isLegendExpanded)}
              className="flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center px-2"
              aria-label={isLegendExpanded ? '범례 접기' : '범례 펼치기'}
              aria-expanded={isLegendExpanded}
            >
              <div className="flex -space-x-1">
                {emotionOrder.slice(0, 3).map((emotionId) => (
                  <div
                    key={emotionId}
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: emotions[emotionId].color }}
                  />
                ))}
              </div>
              <motion.span
                animate={{ rotate: isLegendExpanded ? 180 : 0 }}
                className="text-gray-400 text-sm ml-1"
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {isLegendExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 pt-2 border-t border-gray-100"
                >
                  <div className="space-y-1">
                    {emotionOrder.map((emotionId) => (
                      <button
                        key={emotionId}
                        className="flex items-center space-x-3 w-full cursor-pointer active:bg-gray-50 rounded-lg px-2 py-2 min-h-[44px] transition-colors"
                        onClick={() => {
                          setHoveredContinent(emotionId);
                          setTimeout(() => onContinentClick(emotionId), 300);
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full shadow-sm flex-shrink-0"
                          style={{ backgroundColor: emotions[emotionId].color }}
                        />
                        <span className="text-gray-700 text-sm font-medium">
                          {emotions[emotionId].name_ko}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            <p className="text-gray-500 text-xs mb-3 font-semibold tracking-wide">감정 대륙</p>
            <div className="space-y-1">
              {emotionOrder.map((emotionId) => (
                <div
                  key={emotionId}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-all duration-200"
                  onMouseEnter={() => setHoveredContinent(emotionId)}
                  onMouseLeave={() => setHoveredContinent(null)}
                  onClick={() => onContinentClick(emotionId)}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full shadow-sm transition-transform duration-200"
                    style={{
                      backgroundColor: emotions[emotionId].color,
                      transform: hoveredContinent === emotionId ? 'scale(1.3)' : 'scale(1)'
                    }}
                  />
                  <span
                    className="text-sm transition-colors duration-200"
                    style={{
                      color: hoveredContinent === emotionId ? emotions[emotionId].color : '#4B5563',
                      fontWeight: hoveredContinent === emotionId ? 600 : 400
                    }}
                  >
                    {emotions[emotionId].name_ko}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 안내 텍스트 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center pb-2">
        <p className="text-gray-400 text-xs">
          {isMobile ? '감정을 탭하여 상세 보기' : '감정 위에 마우스를 올려보세요'}
        </p>
      </div>
    </div>
  );
};

export default ContinentsView;
