import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';

// 감정별 강도 단계 데이터 (원본 사이트 기반)
const EMOTION_STAGES = {
  fear: [
    { name_ko: '긴장', name_en: 'TENSE', intensity: 1 },
    { name_ko: '초조', name_en: 'NERVOUS', intensity: 2 },
    { name_ko: '불안', name_en: 'ANXIOUS', intensity: 3 },
    { name_ko: '걱정', name_en: 'WORRIED', intensity: 4 },
    { name_ko: '무서움', name_en: 'FRIGHTENED', intensity: 5 },
    { name_ko: '공황', name_en: 'PANICKED', intensity: 6 },
    { name_ko: '공포', name_en: 'TERRIFIED', intensity: 7 }
  ],
  anger: [
    { name_ko: '짜증', name_en: 'ANNOYED', intensity: 1 },
    { name_ko: '좌절', name_en: 'FRUSTRATED', intensity: 2 },
    { name_ko: '격분', name_en: 'EXASPERATED', intensity: 3 },
    { name_ko: '논쟁적', name_en: 'ARGUMENTATIVE', intensity: 4 },
    { name_ko: '분노', name_en: 'ANGRY', intensity: 5 },
    { name_ko: '격노', name_en: 'FURIOUS', intensity: 6 },
    { name_ko: '광분', name_en: 'ENRAGED', intensity: 7 }
  ],
  sadness: [
    { name_ko: '실망', name_en: 'DISAPPOINTED', intensity: 1 },
    { name_ko: '낙담', name_en: 'DISCOURAGED', intensity: 2 },
    { name_ko: '우울', name_en: 'GLOOMY', intensity: 3 },
    { name_ko: '슬픔', name_en: 'SAD', intensity: 4 },
    { name_ko: '비탄', name_en: 'SORROWFUL', intensity: 5 },
    { name_ko: '비참', name_en: 'MISERABLE', intensity: 6 },
    { name_ko: '절망', name_en: 'DESPAIRING', intensity: 7 }
  ],
  disgust: [
    { name_ko: '싫음', name_en: 'DISLIKE', intensity: 1 },
    { name_ko: '기피', name_en: 'AVERSION', intensity: 2 },
    { name_ko: '불쾌', name_en: 'DISTASTE', intensity: 3 },
    { name_ko: '역겨움', name_en: 'REPUGNANCE', intensity: 4 },
    { name_ko: '구역질', name_en: 'REVULSION', intensity: 5 },
    { name_ko: '증오', name_en: 'ABHORRENCE', intensity: 6 },
    { name_ko: '혐오', name_en: 'LOATHING', intensity: 7 }
  ],
  enjoyment: [
    { name_ko: '만족', name_en: 'PLEASED', intensity: 1 },
    { name_ko: '기쁨', name_en: 'HAPPY', intensity: 2 },
    { name_ko: '즐거움', name_en: 'AMUSED', intensity: 3 },
    { name_ko: '환희', name_en: 'DELIGHTED', intensity: 4 },
    { name_ko: '행복', name_en: 'JOYFUL', intensity: 5 },
    { name_ko: '희열', name_en: 'ELATED', intensity: 6 },
    { name_ko: '황홀', name_en: 'ECSTATIC', intensity: 7 }
  ]
};

// 감정별 색상 및 설명
const EMOTION_DATA = {
  anger: {
    primary: '#E85A4F',
    light: '#FF8C82',
    dark: '#C4423A',
    name_ko: '분노',
    name_en: 'ANGER',
    description: '무언가가 우리를 막거나 부당하게 대우받는다고 느낄 때 분노합니다.',
    size: 320
  },
  fear: {
    primary: '#9B7BB8',
    light: '#C4A8E0',
    dark: '#6D28D9',
    name_ko: '두려움',
    name_en: 'FEAR',
    description: '위험을 감지하거나 불확실한 상황에 직면할 때 두려움을 느낍니다.',
    size: 400
  },
  disgust: {
    primary: '#10B981',
    light: '#34D399',
    dark: '#059669',
    name_ko: '혐오',
    name_en: 'DISGUST',
    description: '불쾌하거나 역겨운 것을 접했을 때 혐오감을 느낍니다.',
    size: 300
  },
  sadness: {
    primary: '#3B82F6',
    light: '#60A5FA',
    dark: '#1D4ED8',
    name_ko: '슬픔',
    name_en: 'SADNESS',
    description: '소중한 것을 잃거나 실망했을 때 슬픔을 느낍니다.',
    size: 280
  },
  enjoyment: {
    primary: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    name_ko: '즐거움',
    name_en: 'ENJOYMENT',
    description: '좋은 일이 일어나거나 기대가 충족될 때 즐거움을 느낍니다.',
    size: 360
  }
};

// 감정 원 위치 (겹치도록 배치)
const EMOTION_POSITIONS = {
  enjoyment: { top: '10%', left: '35%' },
  fear: { top: '15%', right: '15%' },
  anger: { top: '35%', left: '10%' },
  sadness: { bottom: '20%', right: '20%' },
  disgust: { bottom: '15%', left: '25%' }
};

// 강도 단계 시각화 컴포넌트
const IntensityStages = ({ emotion, stages, color, isVisible }) => {
  const [hoveredStage, setHoveredStage] = useState(null);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: '16px',
      padding: '40px 20px',
      minHeight: '250px'
    }}>
      {stages.map((stage, index) => {
        const baseSize = 40 + (index * 25);
        const isHovered = hoveredStage === index;

        return (
          <motion.div
            key={stage.name_en}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseEnter={() => setHoveredStage(index)}
            onMouseLeave={() => setHoveredStage(null)}
          >
            {/* 단계 레이블 */}
            <motion.div
              style={{
                marginBottom: '12px',
                textAlign: 'center',
                opacity: isHovered ? 1 : 0.6
              }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
            >
              <div style={{
                fontSize: '11px',
                fontWeight: '700',
                color: color,
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {stage.name_en}
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginTop: '4px'
              }}>
                {stage.name_ko}
              </div>
            </motion.div>

            {/* 원형 강도 표시 */}
            <motion.div
              style={{
                width: `${baseSize}px`,
                height: `${baseSize}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${color}${Math.round((0.3 + index * 0.1) * 255).toString(16).padStart(2, '0')}, ${color})`,
                boxShadow: isHovered
                  ? `0 8px 32px ${color}60, 0 0 0 4px ${color}30`
                  : `0 4px 16px ${color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              animate={{
                scale: isHovered ? 1.15 : 1,
                y: isHovered ? -10 : 0
              }}
            >
              <span style={{
                color: '#fff',
                fontSize: `${12 + index * 2}px`,
                fontWeight: '700',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {index + 1}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

// 대형 감정 원 컴포넌트
const LargeEmotionCircle = ({ emotion, data, isSelected, isHovered, onClick, onHover, position }) => {
  const size = data.size * 1.5; // 1.5배 확대

  return (
    <motion.div
      onClick={() => onClick(emotion)}
      onMouseEnter={() => onHover(emotion)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: 'absolute',
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'pointer',
        zIndex: isSelected || isHovered ? 100 : 10
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: isHovered ? 1.1 : 1
      }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* 외부 글로우 */}
      <div style={{
        position: 'absolute',
        inset: '-20px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${data.primary}30 0%, transparent 70%)`,
        filter: 'blur(20px)',
        opacity: isHovered ? 1 : 0.5
      }} />

      {/* 동심원 레이어들 */}
      {[1, 0.85, 0.70, 0.55, 0.40, 0.25].map((scale, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${(1 - scale) * 50}%`,
            left: `${(1 - scale) * 50}%`,
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            borderRadius: '50%',
            backgroundColor: data.primary,
            opacity: 0.1 + (i * 0.15),
            transition: 'all 0.3s ease'
          }}
        />
      ))}

      {/* 중앙 레이블 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '800',
          color: '#fff',
          textShadow: '0 3px 10px rgba(0,0,0,0.4)',
          marginBottom: '4px'
        }}>
          {data.name_ko}
        </div>
        <div style={{
          fontSize: '12px',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.9)',
          letterSpacing: '2px',
          textShadow: '0 2px 6px rgba(0,0,0,0.3)'
        }}>
          {data.name_en}
        </div>
      </div>

      {/* 외곽 라벨 (상단) */}
      <div style={{
        position: 'absolute',
        top: '-35px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#fff',
        padding: '6px 16px',
        borderRadius: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}>
        <span style={{
          fontSize: '13px',
          fontWeight: '700',
          color: data.primary,
          letterSpacing: '1px'
        }}>
          {data.name_en}
        </span>
      </div>
    </motion.div>
  );
};

// 감정 정보 팝업 카드
const EmotionPopupCard = ({ emotion, data, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: 20 }}
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      borderRadius: '20px',
      padding: '32px',
      maxWidth: '420px',
      width: '90%',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      border: `4px solid ${data.primary}`,
      zIndex: 1000
    }}
  >
    <button
      onClick={onClose}
      style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#f5f5f5',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        color: '#666'
      }}
    >
      ✕
    </button>

    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '20px'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${data.light}, ${data.primary})`,
        boxShadow: `0 8px 24px ${data.primary}40`
      }} />
      <div>
        <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>
          {data.name_ko}
        </h3>
        <p style={{ fontSize: '14px', color: '#888', margin: 0, letterSpacing: '2px' }}>
          {data.name_en}
        </p>
      </div>
    </div>

    <p style={{
      fontSize: '18px',
      lineHeight: '1.7',
      color: '#444',
      margin: 0
    }}>
      {data.description}
    </p>

    <div style={{
      marginTop: '24px',
      padding: '16px',
      backgroundColor: `${data.primary}10`,
      borderRadius: '12px',
      borderLeft: `4px solid ${data.primary}`
    }}>
      <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
        💡 이 감정을 느낄 때, 잠시 멈추고 자신의 상태를 인식해보세요.
      </p>
    </div>
  </motion.div>
);

const Experience = ({ selectedEmotion }) => {
  const [localSelectedEmotion, setLocalSelectedEmotion] = useState(selectedEmotion || 'fear');
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [learnMoreExpanded, setLearnMoreExpanded] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (selectedEmotion) {
      setLocalSelectedEmotion(selectedEmotion);
    }
  }, [selectedEmotion]);

  const handleEmotionClick = (emotion) => {
    setLocalSelectedEmotion(emotion);
    setShowPopup(true);
  };

  const currentData = EMOTION_DATA[localSelectedEmotion];
  const currentStages = EMOTION_STAGES[localSelectedEmotion];
  const currentEmotion = emotions[localSelectedEmotion];

  return (
    <section
      ref={sectionRef}
      style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}
    >
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* 왼쪽 사이드바 */}
        <motion.aside
          style={{
            width: '420px',
            flexShrink: 0,
            backgroundColor: '#fff',
            borderRight: '1px solid #e5e5e5',
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column'
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
        >
          <div style={{ flex: 1 }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '3px solid #1a1a1a'
            }}>
              감정의 경험
            </h2>

            <p style={{
              fontSize: '18px',
              color: '#666',
              lineHeight: '1.8',
              marginBottom: '32px'
            }}>
              각 감정은 여러 강도 단계를 가지고 있습니다.
              감정의 강도를 인식하면 더 효과적으로 대응할 수 있습니다.
            </p>

            {/* 현재 선택된 감정 표시 */}
            <div style={{
              padding: '24px',
              backgroundColor: `${currentData.primary}10`,
              borderRadius: '16px',
              marginBottom: '24px',
              border: `2px solid ${currentData.primary}30`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 30% 30%, ${currentData.light}, ${currentData.primary})`,
                  boxShadow: `0 6px 20px ${currentData.primary}40`
                }} />
                <div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                    {currentData.name_ko}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#888', margin: 0, letterSpacing: '2px' }}>
                    {currentData.name_en}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', margin: 0 }}>
                {currentData.description}
              </p>
            </div>

            {/* 강도 단계 설명 */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#888',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}>
                {currentStages.length}단계 강도
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {currentStages.map((stage, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: currentData.primary,
                      opacity: 0.3 + (i * 0.1),
                      color: '#fff',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    {stage.name_ko}
                  </span>
                ))}
              </div>
            </div>

            {/* Learn More 확장 섹션 */}
            <AnimatePresence>
              {learnMoreExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden', marginBottom: '24px' }}
                >
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${currentData.primary}`
                  }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>
                      {currentData.name_ko}에 대해 더 알아보기
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', margin: 0 }}>
                      {currentEmotion?.description_ko || currentData.description}
                    </p>
                    <ul style={{ margin: '16px 0 0 0', paddingLeft: '20px' }}>
                      <li style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
                        감정의 강도를 1-7 단계로 인식해보세요
                      </li>
                      <li style={{ fontSize: '14px', color: '#555', marginBottom: '8px' }}>
                        낮은 강도에서 조절이 더 쉽습니다
                      </li>
                      <li style={{ fontSize: '14px', color: '#555' }}>
                        신체 반응에 주의를 기울이세요
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Learn More 버튼 */}
          <motion.button
            onClick={() => setLearnMoreExpanded(!learnMoreExpanded)}
            style={{
              width: '100%',
              padding: '18px 24px',
              backgroundColor: learnMoreExpanded ? currentData.primary : '#f0f0f0',
              color: learnMoreExpanded ? '#fff' : '#333',
              border: 'none',
              borderRadius: '12px',
              fontSize: '17px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>더 알아보기</span>
            <motion.span
              animate={{ rotate: learnMoreExpanded ? 90 : 0 }}
              style={{ fontSize: '20px' }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.aside>

        {/* 오른쪽 시각화 영역 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 상단: 강도 단계 시각화 */}
          <div style={{
            padding: '32px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #e5e5e5'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#888',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '16px'
            }}>
              {currentData.name_ko}의 강도 단계
            </h3>
            <IntensityStages
              emotion={localSelectedEmotion}
              stages={currentStages}
              color={currentData.primary}
              isVisible={isInView}
            />
          </div>

          {/* 하단: 감정 원들 */}
          <div style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            minHeight: '500px'
          }}>
            {Object.keys(EMOTION_DATA).map((emotionKey) => (
              <LargeEmotionCircle
                key={emotionKey}
                emotion={emotionKey}
                data={EMOTION_DATA[emotionKey]}
                isSelected={localSelectedEmotion === emotionKey}
                isHovered={hoveredEmotion === emotionKey}
                onClick={handleEmotionClick}
                onHover={setHoveredEmotion}
                position={EMOTION_POSITIONS[emotionKey]}
              />
            ))}

            {/* 안내 텍스트 */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '15px',
              color: '#999',
              textAlign: 'center'
            }}>
              감정 원을 클릭하여 자세히 알아보세요
            </div>
          </div>
        </div>
      </div>

      {/* 팝업 오버레이 */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 999
              }}
              onClick={() => setShowPopup(false)}
            />
            <EmotionPopupCard
              emotion={localSelectedEmotion}
              data={currentData}
              onClose={() => setShowPopup(false)}
            />
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
