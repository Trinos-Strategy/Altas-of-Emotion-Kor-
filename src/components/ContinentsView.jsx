import { motion } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

const ContinentsView = ({ onContinentClick, hoveredContinent, setHoveredContinent }) => {
  // Position config for overlapping circles
  const positions = [
    { x: 50, y: 45, scale: 1.1 },   // anger - center-left
    { x: 35, y: 55, scale: 0.95 },  // fear - bottom-left
    { x: 65, y: 55, scale: 0.9 },   // disgust - bottom-right
    { x: 30, y: 35, scale: 1 },     // sadness - top-left
    { x: 70, y: 40, scale: 1.05 },  // enjoyment - top-right
  ];

  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
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

        {/* Emotion Circles */}
        {emotionOrder.map((emotionId, index) => {
          const emotion = emotions[emotionId];
          const pos = positions[index];
          const isHovered = hoveredContinent === emotionId;
          const baseRadius = 18 * pos.scale;
          const radius = isHovered ? baseRadius * 1.1 : baseRadius;

          return (
            <g key={emotionId}>
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill={`url(#gradient-${emotionId})`}
                stroke={emotion.color}
                strokeWidth={isHovered ? 0.8 : 0.3}
                filter={isHovered ? "url(#shadow)" : undefined}
                className="cursor-pointer"
                initial={{ r: 0, opacity: 0 }}
                animate={{
                  r: radius,
                  opacity: 1,
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: 'spring'
                }}
                onMouseEnter={() => setHoveredContinent(emotionId)}
                onMouseLeave={() => setHoveredContinent(null)}
                onClick={() => onContinentClick(emotionId)}
              />

              {/* Emotion Label */}
              <motion.text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                fill="white"
                fontSize={isHovered ? 4 : 3.5}
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
                y={pos.y + 4.5}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none"
                fill="white"
                fillOpacity={0.7}
                fontSize={2}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {emotion.name_en}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Hover Info Card */}
      {hoveredContinent && (
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass rounded-xl p-4 max-w-sm w-full mx-4 border border-gray-200/50 shadow-lg"
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

      {/* Legend */}
      <div className="absolute top-4 right-4 glass rounded-lg p-3 border border-gray-200/50">
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
      </div>
    </div>
  );
};

export default ContinentsView;
