import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { emotions, emotionOrder } from '../data/emotions';

// 감정 아이콘 이모지 매핑
const emotionIcons = {
  anger: '🔥',
  fear: '😨',
  disgust: '🤢',
  sadness: '💧',
  enjoyment: '✨',
};

const ContinentsView = ({ onContinentClick, hoveredContinent, setHoveredContinent }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full min-h-[500px] sm:min-h-[600px] flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      {/* Section Header */}
      <motion.div
        className="text-center mb-8 sm:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-black/35 tracking-[0.2em] mb-3"
          style={{ fontSize: '0.625rem' }}
        >
          다섯 가지 감정 대륙
        </p>
        <h2
          className="text-gray-900"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            fontWeight: 300,
            letterSpacing: '0.01em',
          }}
        >
          탐험하고 싶은 감정을 선택하세요
        </h2>
      </motion.div>

      {/* 감정 선택 펼침 그리드 - 겹침 완전 제거 & 반응형 강화 */}
      <div
        className="emotion-selector-spread w-full max-w-[900px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        style={{
          gap: isMobile ? '12px' : '20px',
          padding: isMobile ? '12px' : '24px',
        }}
      >
        {emotionOrder.map((emotionId, index) => {
          const emotion = emotions[emotionId];
          const isHovered = hoveredContinent === emotionId;

          return (
            <motion.button
              key={emotionId}
              className="emotion-card-spread"
              onClick={() => onContinentClick(emotionId)}
              onMouseEnter={() => setHoveredContinent(emotionId)}
              onMouseLeave={() => setHoveredContinent(null)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: isMobile ? '20px 12px' : '28px 16px',
                background: isHovered
                  ? `linear-gradient(145deg, ${emotion.colorLight || emotion.color}15, ${emotion.color}25)`
                  : 'white',
                border: `2px solid ${isHovered ? emotion.color : 'rgba(0,0,0,0.06)'}`,
                borderRadius: '20px',
                cursor: 'pointer',
                minWidth: '100px',
                minHeight: isMobile ? '130px' : '160px',
                boxShadow: isHovered
                  ? `0 12px 32px ${emotion.color}30, 0 0 0 4px ${emotion.color}10`
                  : '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* 감정 아이콘 */}
              <motion.span
                className="emotion-icon-large"
                animate={{
                  scale: isHovered ? 1.2 : 1,
                  rotate: isHovered ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: isMobile ? '40px' : '52px',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                  lineHeight: 1,
                }}
              >
                {emotionIcons[emotionId]}
              </motion.span>

              {/* 한국어 이름 */}
              <h3
                style={{
                  fontSize: isMobile ? '1.125rem' : '1.25rem',
                  fontWeight: 700,
                  color: isHovered ? emotion.color : '#1a1a1a',
                  margin: 0,
                  transition: 'color 300ms ease',
                }}
              >
                {emotion.name_ko}
              </h3>

              {/* 영어 이름 */}
              <span
                style={{
                  fontSize: '0.6875rem',
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                ({emotion.name_en})
              </span>

              {/* 컬러 인디케이터 바 */}
              <motion.div
                animate={{
                  width: isHovered ? '60%' : '30%',
                  opacity: isHovered ? 1 : 0.5,
                }}
                style={{
                  height: '3px',
                  backgroundColor: emotion.color,
                  borderRadius: '2px',
                  marginTop: '4px',
                  transition: 'all 300ms ease',
                }}
              />

              {/* 클릭 힌트 */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      fontSize: '0.625rem',
                      color: emotion.color,
                      fontWeight: 500,
                    }}
                  >
                    탐험하기 →
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* 선택된 감정 정보 카드 */}
      <AnimatePresence>
        {hoveredContinent && (
          <motion.div
            className="mt-8 sm:mt-10 w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl"
              style={{
                borderLeft: `4px solid ${emotions[hoveredContinent].color}`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: '2rem' }}>{emotionIcons[hoveredContinent]}</span>
                <div>
                  <h3 className="text-gray-900 font-semibold text-lg">
                    {emotions[hoveredContinent].name_ko}
                    <span className="text-gray-400 font-normal text-sm ml-2">
                      ({emotions[hoveredContinent].name_en})
                    </span>
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {emotions[hoveredContinent].description_ko}
              </p>
              <div className="flex items-center gap-3 text-xs">
                <span
                  className="px-3 py-1.5 rounded-full text-white font-medium"
                  style={{ backgroundColor: emotions[hoveredContinent].color }}
                >
                  클릭하여 상세 보기
                </span>
                <span className="text-gray-400">
                  {emotions[hoveredContinent].states?.length || 0}개 감정 상태
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 안내 텍스트 */}
      <motion.p
        className="mt-6 sm:mt-8 text-gray-400 text-center"
        style={{ fontSize: '0.75rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {isMobile ? '감정 카드를 탭하여 상세 보기' : '감정 카드에 마우스를 올려보세요'}
      </motion.p>

      {/* 스타일 - 모바일 최적화 강화 */}
      <style>{`
        .emotion-card-spread:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.3);
        }

        /* 태블릿 & 모바일 (768px 이하) */
        @media (max-width: 768px) {
          .emotion-selector-spread {
            gap: 12px !important;
            padding: 12px !important;
          }
          .emotion-card-spread {
            padding: 16px 10px !important;
            min-height: 110px !important;
            gap: 8px !important;
            border-radius: 16px !important;
          }
          .emotion-card-spread h3 {
            font-size: 1.0625rem !important;
          }
          .emotion-card-spread span {
            font-size: 0.625rem !important;
          }
          .emotion-icon-large {
            font-size: 32px !important;
          }
        }

        @media (max-width: 639px) {
          .emotion-selector-spread {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          /* 5번째 감정 (즐거움) 중앙 정렬 */
          .emotion-card-spread:nth-child(5) {
            grid-column: 1 / -1;
            max-width: 160px;
            justify-self: center;
          }
        }

        /* 중간 화면 (640px - 767px) - 3열 그리드 */
        @media (min-width: 640px) and (max-width: 767px) {
          .emotion-selector-spread {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 14px !important;
          }
          /* 마지막 2개 감정 중앙 정렬 */
          .emotion-card-spread:nth-child(4),
          .emotion-card-spread:nth-child(5) {
            justify-self: center;
            max-width: 160px;
          }
        }

        /* 작은 모바일 (480px 이하) */
        @media (max-width: 480px) {
          .emotion-selector-spread {
            gap: 10px !important;
            padding: 8px !important;
          }
          .emotion-card-spread {
            padding: 14px 8px !important;
            min-height: 100px !important;
            border-radius: 14px !important;
          }
          .emotion-icon-large {
            font-size: 28px !important;
          }
          .emotion-card-spread h3 {
            font-size: 1rem !important;
          }
          .emotion-card-spread span {
            font-size: 0.5625rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContinentsView;
