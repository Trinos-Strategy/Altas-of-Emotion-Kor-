import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  // Position config - 화면 전체에 분산 배치 (클릭 가능하도록)
  const positions = [
    { x: 50, y: 30, scale: 1.1, floatDuration: 6, floatDelay: 0 },     // anger - 상단 중앙
    { x: 20, y: 50, scale: 0.95, floatDuration: 7, floatDelay: 1 },    // fear - 좌측 중앙
    { x: 80, y: 50, scale: 0.9, floatDuration: 5, floatDelay: 2 },     // disgust - 우측 중앙
    { x: 30, y: 75, scale: 1, floatDuration: 8, floatDelay: 0.5 },     // sadness - 좌측 하단
    { x: 70, y: 75, scale: 1.05, floatDuration: 6.5, floatDelay: 1.5 }, // enjoyment - 우측 하단
  ];

  // Floating animation variants
  const floatVariants = (duration, delay) => ({
    animate: {
      y: [0, -3, 0, 3, 0],
      x: [0, 2, 0, -2, 0],
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

  // Responsive base radius
  const baseRadiusMultiplier = isMobile ? 0.85 : 1;

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
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
                <stop offset="0%" stopColor={emotion.colorLight} stopOpacity="0.9" />
                <stop offset="50%" stopColor={emotion.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={emotion.color} stopOpacity="0.3" />
              </radialGradient>
            );
          })}

          {/* Drop shadow filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2"/>
          </filter>
        </defs>

        {/* Emotion Circles with Floating Animation */}
        {emotionOrder.map((emotionId, index) => {
          const emotion = emotions[emotionId];
          const pos = positions[index];
          const isHovered = hoveredContinent === emotionId;
          const baseRadius = 18 * pos.scale * baseRadiusMultiplier;
          const radius = isHovered ? baseRadius * 1.1 : baseRadius;

          return (
            <motion.g
              key={emotionId}
              variants={floatVariants(pos.floatDuration, pos.floatDelay)}
              animate="animate"
            >
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill={`url(#gradient-${emotionId})`}
                stroke={emotion.color}
                strokeWidth={isHovered ? 1 : 0.4}
                filter={isHovered ? "url(#shadow)" : undefined}
                className="cursor-pointer"
                initial={{ r: 0, opacity: 0 }}
                animate={{
                  r: radius,
                  opacity: 1,
                  scale: isHovered ? 1.08 : 1
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.12,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                onMouseEnter={() => setHoveredContinent(emotionId)}
                onMouseLeave={() => setHoveredContinent(null)}
                onClick={() => onContinentClick(emotionId)}
              />

              {/* Emotion Label - responsive font sizes */}
              <motion.text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                fill="white"
                fontSize={isMobile ? (isHovered ? 3.5 : 3) : (isHovered ? 4 : 3.5)}
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
              >
                {emotion.name_ko}
              </motion.text>

              <motion.text
                x={pos.x}
                y={pos.y + (isMobile ? 3.5 : 4.5)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                fill="white"
                fillOpacity={0.7}
                fontSize={isMobile ? 1.5 : 2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {emotion.name_en}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>

      {/* Hover Info Card - Collapsible on mobile */}
      {hoveredContinent && (
        <motion.div
          className={`absolute left-1/2 transform -translate-x-1/2 glass rounded-xl p-4 max-w-sm w-[calc(100%-2rem)] border border-gray-200/50 shadow-lg ${
            isMobile ? 'bottom-2' : 'bottom-4'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            borderTop: `3px solid ${emotions[hoveredContinent].color}`
          }}
        >
          <h3 className="text-gray-800 font-semibold mb-2">
            {emotions[hoveredContinent].name_ko}
          </h3>
          <p className="text-gray-600 text-sm">
            {emotions[hoveredContinent].description_ko}
          </p>
          <p className="text-gray-400 text-xs mt-2">
            클릭하여 상세 상태 보기
          </p>
        </motion.div>
      )}

      {/* Legend - Collapsible on mobile */}
      <div className={`absolute top-4 right-4 glass rounded-lg border border-gray-200/50 ${isMobile ? 'p-2' : 'p-3'}`}>
        {isMobile ? (
          <>
            <button
              onClick={() => setIsLegendExpanded(!isLegendExpanded)}
              className="flex items-center gap-2 min-h-[44px] min-w-[44px] justify-center"
              aria-label={isLegendExpanded ? '범례 접기' : '범례 펼치기'}
              aria-expanded={isLegendExpanded}
            >
              <div className="flex -space-x-1">
                {emotionOrder.slice(0, 3).map((emotionId) => (
                  <div
                    key={emotionId}
                    className="w-3 h-3 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: emotions[emotionId].color }}
                  />
                ))}
              </div>
              <motion.span
                animate={{ rotate: isLegendExpanded ? 180 : 0 }}
                className="text-gray-400 text-xs"
              >
                ▼
              </motion.span>
            </button>
            {isLegendExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 pt-2 border-t border-gray-200/50"
              >
                <div className="space-y-1">
                  {emotionOrder.map((emotionId) => (
                    <div
                      key={emotionId}
                      className="flex items-center space-x-2 cursor-pointer active:bg-gray-100/50 rounded px-1 py-1.5 min-h-[36px]"
                      onClick={() => {
                        setHoveredContinent(emotionId);
                        setTimeout(() => setHoveredContinent(null), 2000);
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: emotions[emotionId].color }}
                      />
                      <span className="text-gray-600 text-xs">
                        {emotions[emotionId].name_ko}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <p className="text-gray-500 text-xs mb-2 font-medium">감정 대륙</p>
            <div className="space-y-1">
              {emotionOrder.map((emotionId) => (
                <div
                  key={emotionId}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100/50 rounded px-1 py-0.5 transition-colors"
                  onMouseEnter={() => setHoveredContinent(emotionId)}
                  onMouseLeave={() => setHoveredContinent(null)}
                >
                  <div
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: emotions[emotionId].color }}
                  />
                  <span className="text-gray-600 text-xs">
                    {emotions[emotionId].name_ko}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContinentsView;
