import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';

// emotions.js에서 states를 가져와 EMOTION_STAGES 형식으로 변환
const getEmotionStages = (emotionKey) => {
  const emotion = emotions[emotionKey];
  if (!emotion || !emotion.states) return [];
  return emotion.states.map((state, index) => ({
    name_ko: state.name_ko,
    name_en: state.name_en.toUpperCase(),
    intensity: state.intensity || index + 1
  }));
};

// 감정별 색상, 도형 및 설명 - 2025 Palette
const EMOTION_DATA = {
  anger: {
    primary: '#E63946',
    light: '#FF8B8B',
    dark: '#C62936',
    name_ko: '분노',
    name_en: 'ANGER',
    description: '무언가가 우리를 막거나 부당하게 대우받는다고 느낄 때 분노합니다.',
    shape: 'triangle', // 정삼각형 (위로 향함) - 공격성, 날카로움
    size: 200
  },
  fear: {
    primary: '#6B4C9A',
    light: '#9B7FBF',
    dark: '#4A3570',
    name_ko: '두려움',
    name_en: 'FEAR',
    description: '위험을 감지하거나 불확실한 상황에 직면할 때 두려움을 느낍니다.',
    shape: 'inverted-triangle', // 역삼각형 (아래로 향함) - 불안정성
    size: 220
  },
  disgust: {
    primary: '#4A7C59',
    light: '#8BC99B',
    dark: '#3A6248',
    name_ko: '혐오',
    name_en: 'DISGUST',
    description: '불쾌하거나 역겨운 것을 접했을 때 혐오감을 느낍니다.',
    shape: 'hexagon', // 육각형 - 방어, 차단
    size: 180
  },
  sadness: {
    primary: '#4A6FA5',
    light: '#89A7C9',
    dark: '#3A5A8A',
    name_ko: '슬픔',
    name_en: 'SADNESS',
    description: '소중한 것을 잃거나 실망했을 때 슬픔을 느낍니다.',
    shape: 'teardrop', // 물방울 - 눈물, 하강
    size: 190
  },
  enjoyment: {
    primary: '#F4A261',
    light: '#FFD89B',
    dark: '#E08A40',
    name_ko: '즐거움',
    name_en: 'ENJOYMENT',
    description: '좋은 일이 일어나거나 기대가 충족될 때 즐거움을 느낍니다.',
    shape: 'star', // 5각 별 - 확장, 빛남
    size: 230
  }
};

// 감정 도형 위치 (겹치지 않도록 재배치)
const EMOTION_POSITIONS = {
  fear: { top: '5%', right: '8%' },            // 오른쪽 상단
  sadness: { top: '5%', left: '5%' },          // 왼쪽 상단
  enjoyment: { top: '40%', right: '3%' },      // 오른쪽 중앙
  anger: { bottom: '5%', left: '5%' },         // 왼쪽 하단
  disgust: { bottom: '5%', right: '5%' }       // 오른쪽 하단
};

// 감정별 동심원 레이어 개수 (원본 사이트 기준)
const EMOTION_LAYERS = {
  anger: [1, 0.82, 0.64, 0.46, 0.28],      // 5개 레이어
  fear: [1, 0.78, 0.56, 0.34],              // 4개 레이어
  disgust: [1, 0.78, 0.56, 0.34],           // 4개 레이어
  sadness: [1, 0.70, 0.40],                 // 3개 레이어
  enjoyment: [1, 0.82, 0.64, 0.46, 0.28]   // 5개 레이어
};

// 연구 통계 데이터
const RESEARCH_STATS = [
  { percent: 88, text_en: 'There are universal emotions', text_ko: '보편적 감정이 존재함' },
  { percent: 80, text_en: 'There are universal facial signals to emotion', text_ko: '보편적 얼굴 신호가 존재함' },
  { percent: 91, text_en: 'Anger is a universal emotion', text_ko: '분노는 보편적 감정' },
  { percent: 90, text_en: 'Fear is a universal emotion', text_ko: '두려움은 보편적 감정' },
  { percent: 86, text_en: 'Disgust is a universal emotion', text_ko: '혐오는 보편적 감정' },
  { percent: 80, text_en: 'Sadness is a universal emotion', text_ko: '슬픔은 보편적 감정' },
  { percent: 76, text_en: 'Happiness is a universal emotion', text_ko: '행복은 보편적 감정' },
  { percent: 66, text_en: 'There are universal triggers to emotion', text_ko: '보편적 감정 유발 요인이 존재함' },
  { percent: 51, text_en: 'There is universal physiology of emotion', text_ko: '보편적 감정 생리학이 존재함' },
  { percent: 49, text_en: 'There are biologically discrete, separate emotions', text_ko: '생물학적으로 구분되는 감정이 존재함' },
  { percent: 11, text_en: 'Emotions are constructed by social factors', text_ko: '사회적 요인으로 구성됨' },
  { percent: 3, text_en: 'Emotions are both biologically separate and socially constructed', text_ko: '생물학적+사회적으로 구성됨' }
];

const ACADEMIC_DESCRIPTION = `The existence of "compelling evidence for universals in any aspect of emotion" was endorsed by 88% of the respondents. The evidence supporting universal signals (face or voice) was endorsed by 80%. There was less agreement about whether there is compelling evidence for universals in the events that trigger an emotion (66%), physiology (51%), or appraisal mechanisms (44%). Thus, Darwin's claim in 1872 and the more recent work of Ekman and Friesen (1969) and Izard (1971) regarding the universality of some facial expressions were supported.`;

// SVG 도형 컴포넌트들
const EmotionShape = ({ shape, size, color, lightColor, opacity = 1 }) => {
  const viewBox = "0 0 100 100";

  const getPath = () => {
    switch (shape) {
      case 'triangle':
        // 정삼각형 (위로 향함)
        return <polygon points="50,8 92,85 8,85" fill={`url(#grad-${shape})`} />;
      case 'inverted-triangle':
        // 역삼각형 (아래로 향함)
        return <polygon points="50,92 8,15 92,15" fill={`url(#grad-${shape})`} />;
      case 'hexagon':
        // 육각형
        return <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill={`url(#grad-${shape})`} />;
      case 'teardrop':
        // 물방울 (세로로 긴)
        return <path d="M50,8 Q75,35 75,60 Q75,92 50,92 Q25,92 25,60 Q25,35 50,8" fill={`url(#grad-${shape})`} />;
      case 'star':
        // 5각 별
        return <path d="M50,5 L58,38 L95,38 L65,58 L76,92 L50,72 L24,92 L35,58 L5,38 L42,38 Z" fill={`url(#grad-${shape})`} />;
      default:
        return <circle cx="50" cy="50" r="45" fill={`url(#grad-${shape})`} />;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      style={{ opacity, transition: 'all 0.3s ease' }}
    >
      <defs>
        <radialGradient id={`grad-${shape}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={lightColor} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      {getPath()}
    </svg>
  );
};

// 다중 레이어 감정 도형 컴포넌트
const LayeredEmotionShape = ({ emotion, data, isSelected, isHovered, onClick, onHover, position }) => {
  const baseSize = data.size * 1.3;
  const layers = EMOTION_LAYERS[emotion] || [1, 0.78, 0.56, 0.34]; // 감정별 레이어 개수 적용

  return (
    <motion.div
      onClick={() => onClick(emotion)}
      onMouseEnter={() => onHover(emotion)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: 'absolute',
        ...position,
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        cursor: 'pointer',
        zIndex: isSelected ? 100 : isHovered ? 90 : 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: isHovered ? 1.12 : 1,
        rotate: isHovered ? (data.shape === 'star' ? 15 : 5) : 0
      }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* 외부 글로우 */}
      <div style={{
        position: 'absolute',
        inset: '-30px',
        background: `radial-gradient(circle, ${data.primary}40 0%, transparent 70%)`,
        filter: 'blur(25px)',
        opacity: isHovered ? 1 : 0.4,
        transition: 'opacity 0.3s ease'
      }} />

      {/* 다중 레이어 도형 */}
      {layers.map((scale, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <EmotionShape
            shape={data.shape}
            size={baseSize * scale}
            color={data.primary}
            lightColor={data.light}
            opacity={0.15 + (i * (0.8 / Math.max(layers.length - 1, 1)))}
          />
        </div>
      ))}

      {/* 중앙 레이블 */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        <div style={{
          fontSize: '22px',
          fontWeight: '800',
          color: '#fff',
          textShadow: '0 3px 12px rgba(0,0,0,0.5)',
          marginBottom: '4px'
        }}>
          {data.name_ko}
        </div>
        <div style={{
          fontSize: '11px',
          fontWeight: '700',
          color: 'rgba(255,255,255,0.95)',
          letterSpacing: '2px',
          textShadow: '0 2px 8px rgba(0,0,0,0.4)'
        }}>
          {data.name_en}
        </div>
      </div>

      {/* 호버 시 도형 설명 라벨 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
        style={{
          position: 'absolute',
          top: '-45px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff',
          padding: '8px 16px',
          borderRadius: '24px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{
          fontSize: '13px',
          fontWeight: '700',
          color: data.primary
        }}>
          {getShapeDescription(data.shape)}
        </span>
      </motion.div>
    </motion.div>
  );
};

// 도형 설명 함수
const getShapeDescription = (shape) => {
  const descriptions = {
    'triangle': '▲ 정삼각형 - 공격성, 상승',
    'inverted-triangle': '▼ 역삼각형 - 불안정, 위태로움',
    'hexagon': '⬡ 육각형 - 방어, 경계',
    'teardrop': '💧 물방울 - 흐름, 눈물',
    'star': '⭐ 별 - 확장, 빛남'
  };
  return descriptions[shape] || shape;
};

// 강도 단계 시각화 (도형 기반) - 컴팩트 버전
const IntensityStages = ({ emotion, stages, data, isVisible }) => {
  const [hoveredStage, setHoveredStage] = useState(null);
  const stageCount = stages.length;

  // 단계 수에 따라 크기 조절
  const getSize = (index) => {
    if (stageCount <= 7) {
      return 30 + (index * 18); // 기존 방식
    } else if (stageCount <= 10) {
      return 24 + (index * 12); // 중간 크기
    } else {
      return 20 + (index * 8); // 작은 크기 (13개용)
    }
  };

  const getGap = () => {
    if (stageCount <= 7) return '12px';
    if (stageCount <= 10) return '8px';
    return '6px';
  };

  return (
    <div style={{
      overflowX: 'auto',
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch',
      padding: '20px 10px 30px',
      margin: '0 -10px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: stageCount <= 8 ? 'center' : 'flex-start',
        gap: getGap(),
        minWidth: stageCount > 8 ? 'max-content' : 'auto',
        padding: '10px 20px'
      }}>
        {stages.map((stage, index) => {
          const baseSize = getSize(index);
          const isHovered = hoveredStage === index;

          return (
            <motion.div
              key={stage.name_en}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                minWidth: stageCount > 10 ? '60px' : stageCount > 7 ? '70px' : '80px'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              onMouseEnter={() => setHoveredStage(index)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {/* 단계 레이블 */}
              <motion.div
                style={{
                  marginBottom: '8px',
                  textAlign: 'center',
                  opacity: isHovered ? 1 : 0.7
                }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
              >
                <div style={{
                  fontSize: stageCount > 10 ? '8px' : '9px',
                  fontWeight: '700',
                  color: data.primary,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: stageCount > 10 ? '55px' : '70px'
                }}>
                  {stage.name_en}
                </div>
                <div style={{
                  fontSize: stageCount > 10 ? '11px' : '12px',
                  fontWeight: '600',
                  color: '#333',
                  marginTop: '2px'
                }}>
                  {stage.name_ko}
                </div>
              </motion.div>

              {/* 도형 강도 표시 */}
              <motion.div
                style={{
                  filter: isHovered ? `drop-shadow(0 6px 15px ${data.primary}60)` : `drop-shadow(0 3px 8px ${data.primary}30)`,
                  transition: 'filter 0.3s ease'
                }}
                animate={{
                  scale: isHovered ? 1.12 : 1,
                  y: isHovered ? -5 : 0
                }}
              >
                <EmotionShape
                  shape={data.shape}
                  size={baseSize}
                  color={data.primary}
                  lightColor={data.light}
                  opacity={0.4 + (index * (0.6 / Math.max(stageCount - 1, 1)))}
                />
              </motion.div>

              {/* 숫자 표시 */}
              <div style={{
                marginTop: '6px',
                width: stageCount > 10 ? '18px' : '20px',
                height: stageCount > 10 ? '18px' : '20px',
                borderRadius: '50%',
                backgroundColor: data.primary,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: stageCount > 10 ? '9px' : '10px',
                fontWeight: '700',
                opacity: isHovered ? 1 : 0.7
              }}>
                {index + 1}
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* 스크롤 힌트 (8개 이상일 때) */}
      {stageCount > 8 && (
        <div style={{
          textAlign: 'center',
          marginTop: '8px',
          fontSize: '11px',
          color: '#999'
        }}>
          ← 스크롤하여 모든 단계 보기 →
        </div>
      )}
    </div>
  );
};

// 상세 통계 팝업 모달
const LearnMoreModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
  >
    {/* 배경 오버레이 */}
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(5px)'
      }}
    />

    {/* 모달 콘텐츠 */}
    <motion.div
      initial={{ scale: 0.9, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 30 }}
      style={{
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: '24px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '85vh',
        overflow: 'auto',
        boxShadow: '0 30px 100px rgba(0,0,0,0.4)'
      }}
    >
      {/* 헤더 */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        padding: '32px 40px 24px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1a1a1a',
            margin: 0
          }}>
            감정 연구 통계
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            margin: '8px 0 0'
          }}>
            과학자들의 합의에 기반한 연구 결과
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#f5f5f5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#666',
            transition: 'all 0.2s ease'
          }}
        >
          ✕
        </button>
      </div>

      {/* 통계 리스트 */}
      <div style={{ padding: '32px 40px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          📊 연구 결과 통계
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {RESEARCH_STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                backgroundColor: stat.percent >= 80 ? '#f0fdf4' : stat.percent >= 50 ? '#fefce8' : '#fef2f2',
                borderRadius: '12px',
                border: `1px solid ${stat.percent >= 80 ? '#bbf7d0' : stat.percent >= 50 ? '#fef08a' : '#fecaca'}`
              }}
            >
              {/* 퍼센트 표시 */}
              <div style={{
                minWidth: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: stat.percent >= 80 ? '#22c55e' : stat.percent >= 50 ? '#eab308' : '#ef4444',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '800',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                {stat.percent}%
              </div>

              {/* 설명 텍스트 */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '4px'
                }}>
                  {stat.text_ko}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#888',
                  fontStyle: 'italic'
                }}>
                  {stat.text_en}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 학술 설명 */}
        <div style={{
          marginTop: '40px',
          padding: '28px',
          backgroundColor: '#f8fafc',
          borderRadius: '16px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📚 학술적 배경
          </h3>
          <p style={{
            fontSize: '15px',
            color: '#555',
            lineHeight: '1.8',
            margin: 0,
            fontStyle: 'italic'
          }}>
            "{ACADEMIC_DESCRIPTION}"
          </p>
          <div style={{
            marginTop: '16px',
            fontSize: '13px',
            color: '#888'
          }}>
            — Darwin (1872), Ekman & Friesen (1969), Izard (1971) 연구 기반
          </div>
        </div>

        {/* 도형 심리학 설명 */}
        <div style={{
          marginTop: '32px',
          padding: '28px',
          background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
          borderRadius: '16px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            🎨 도형 심리학
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {[
              { shape: '▲', name: '분노', desc: '정삼각형 - 공격성, 날카로움, 상승 에너지' },
              { shape: '▼', name: '두려움', desc: '역삼각형 - 불안정성, 하강, 위태로움' },
              { shape: '⬡', name: '혐오', desc: '육각형 - 방어, 경계, 거부의 차단' },
              { shape: '💧', name: '슬픔', desc: '물방울 - 눈물, 흐름, 무게감' },
              { shape: '⭐', name: '즐거움', desc: '별 - 확장, 빛남, 에너지 방출' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                backgroundColor: '#fff',
                borderRadius: '10px'
              }}>
                <span style={{ fontSize: '28px' }}>{item.shape}</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#333' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

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
      borderRadius: '24px',
      padding: '36px',
      maxWidth: '450px',
      width: '90%',
      boxShadow: '0 25px 80px rgba(0,0,0,0.35)',
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
        width: '40px',
        height: '40px',
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
      gap: '20px',
      marginBottom: '24px'
    }}>
      <div style={{ width: '80px', height: '80px' }}>
        <EmotionShape
          shape={data.shape}
          size={80}
          color={data.primary}
          lightColor={data.light}
        />
      </div>
      <div>
        <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>
          {data.name_ko}
        </h3>
        <p style={{ fontSize: '14px', color: '#888', margin: '4px 0 0', letterSpacing: '2px' }}>
          {data.name_en}
        </p>
        <p style={{ fontSize: '12px', color: data.primary, margin: '4px 0 0', fontWeight: '600' }}>
          {getShapeDescription(data.shape)}
        </p>
      </div>
    </div>

    <p style={{
      fontSize: '18px',
      lineHeight: '1.8',
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
      <p style={{ fontSize: '14px', color: '#555', margin: 0, lineHeight: '1.6' }}>
        💡 이 감정의 강도 단계를 인식해보세요. 낮은 강도에서 조절이 더 쉽습니다.
      </p>
    </div>
  </motion.div>
);

const Experience = ({ selectedEmotion }) => {
  const [localSelectedEmotion, setLocalSelectedEmotion] = useState(selectedEmotion || 'fear');
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  const currentStages = getEmotionStages(localSelectedEmotion);
  const currentEmotion = emotions[localSelectedEmotion];

  // Mobile Layout
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: '80px 16px 120px' }}
      >
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: '24px' }}
        >
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '12px'
          }}>
            감정의 경험
          </h2>
          <p style={{
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.7'
          }}>
            각 감정은 고유한 도형과 다양한 강도 단계를 가집니다.
          </p>
        </motion.div>

        {/* 모바일용 감정 선택 버튼들 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '10px',
            padding: '4px',
            marginBottom: '20px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {Object.keys(EMOTION_DATA).map((emotionKey) => {
            const data = EMOTION_DATA[emotionKey];
            const isSelected = localSelectedEmotion === emotionKey;
            return (
              <button
                key={emotionKey}
                onClick={() => setLocalSelectedEmotion(emotionKey)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '24px',
                  border: 'none',
                  background: isSelected ? data.primary : '#fff',
                  color: isSelected ? '#fff' : '#333',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: isSelected ? `0 4px 12px ${data.primary}50` : '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'all 0.25s ease'
                }}
              >
                <EmotionShape shape={data.shape} size={20} color={isSelected ? '#fff' : data.primary} lightColor={data.light} />
                {data.name_ko}
              </button>
            );
          })}
        </motion.div>

        {/* 선택된 감정 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{
            backgroundColor: '#fff',
            borderRadius: '20px',
            padding: '20px',
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <EmotionShape shape={currentData.shape} size={56} color={currentData.primary} lightColor={currentData.light} />
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                {currentData.name_ko}
              </h3>
              <p style={{ fontSize: '11px', color: '#888', margin: '2px 0 0', letterSpacing: '1px' }}>
                {currentData.name_en}
              </p>
              <p style={{ fontSize: '11px', color: currentData.primary, margin: '4px 0 0', fontWeight: '600' }}>
                {getShapeDescription(currentData.shape)}
              </p>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7', margin: 0 }}>
            {currentData.description}
          </p>
        </motion.div>

        {/* 강도 단계 태그 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}
        >
          <h4 style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#888',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}>
            {currentStages.length}단계 강도
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {currentStages.map((stage, i) => (
              <span
                key={i}
                style={{
                  padding: '6px 12px',
                  backgroundColor: currentData.primary,
                  opacity: 0.4 + (i * 0.08),
                  color: '#fff',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                {stage.name_ko}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Learn More 버튼 */}
        <motion.button
          onClick={() => setShowLearnMore(true)}
          style={{
            width: '100%',
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '14px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 6px 24px rgba(102, 126, 234, 0.35)'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <span>📊 연구 통계 더 알아보기</span>
          <span style={{ fontSize: '18px' }}>→</span>
        </motion.button>

        {/* Learn More 모달 */}
        <AnimatePresence>
          {showLearnMore && (
            <LearnMoreModal onClose={() => setShowLearnMore(false)} />
          )}
        </AnimatePresence>

        {/* 감정 팝업 오버레이 */}
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
  }

  // Desktop Layout
  return (
    <section
      ref={sectionRef}
      style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}
    >
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* 왼쪽 사이드바 */}
        <motion.aside
          style={{
            width: '400px',
            flexShrink: 0,
            backgroundColor: '#fff',
            borderRight: '1px solid #e5e5e5',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'sticky',
            top: 0,
            overflowY: 'auto'
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
        >
          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '20px' }}>
            <h2 style={{
              fontSize: '34px',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '3px solid #1a1a1a'
            }}>
              감정의 경험
            </h2>

            <p style={{
              fontSize: '17px',
              color: '#666',
              lineHeight: '1.8',
              marginBottom: '28px'
            }}>
              각 감정은 고유한 도형과 다양한 강도 단계를 가집니다.
              도형의 심리학적 의미를 통해 감정을 더 깊이 이해하세요.
            </p>

            {/* 현재 선택된 감정 표시 */}
            <div style={{
              padding: '24px',
              backgroundColor: `${currentData.primary}08`,
              borderRadius: '16px',
              marginBottom: '24px',
              border: `2px solid ${currentData.primary}25`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ width: '64px', height: '64px' }}>
                  <EmotionShape
                    shape={currentData.shape}
                    size={64}
                    color={currentData.primary}
                    lightColor={currentData.light}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '26px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                    {currentData.name_ko}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#888', margin: '2px 0 0', letterSpacing: '2px' }}>
                    {currentData.name_en}
                  </p>
                  <p style={{ fontSize: '12px', color: currentData.primary, margin: '4px 0 0', fontWeight: '600' }}>
                    {getShapeDescription(currentData.shape)}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', margin: 0 }}>
                {currentData.description}
              </p>
            </div>

            {/* 강도 단계 태그 */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#888',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}>
                {currentStages.length}단계 강도
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {currentStages.map((stage, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '7px 13px',
                      backgroundColor: currentData.primary,
                      opacity: 0.35 + (i * 0.1),
                      color: '#fff',
                      borderRadius: '18px',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    {stage.name_ko}
                  </span>
                ))}
              </div>
            </div>
          </div>

            {/* Learn More 버튼 - 항상 하단에 고정 */}
          <div style={{
            flexShrink: 0,
            padding: '20px 0 0',
            marginTop: 'auto',
            position: 'relative',
            zIndex: 100
          }}>
            <motion.button
              onClick={() => setShowLearnMore(true)}
              style={{
                width: '100%',
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '14px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 8px 30px rgba(102, 126, 234, 0.4)',
                position: 'relative',
                zIndex: 100
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span>📊 연구 통계 더 알아보기</span>
              <span style={{ fontSize: '20px' }}>→</span>
            </motion.button>
          </div>
        </motion.aside>

        {/* 오른쪽 시각화 영역 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 상단: 강도 단계 시각화 */}
          <div style={{
            padding: '28px 32px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #e5e5e5'
          }}>
            <h3 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#888',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              {currentData.name_ko}의 강도 단계 ({currentData.shape === 'triangle' ? '▲ 삼각형' :
                currentData.shape === 'inverted-triangle' ? '▼ 역삼각형' :
                currentData.shape === 'hexagon' ? '⬡ 육각형' :
                currentData.shape === 'teardrop' ? '💧 물방울' : '⭐ 별'})
            </h3>
            <IntensityStages
              emotion={localSelectedEmotion}
              stages={currentStages}
              data={currentData}
              isVisible={isInView}
            />
          </div>

          {/* 하단: 감정 도형들 */}
          <div style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            minHeight: '550px',
            background: 'linear-gradient(180deg, #fafafa 0%, #f0f0f0 100%)'
          }}>
            {Object.keys(EMOTION_DATA).map((emotionKey) => (
              <LayeredEmotionShape
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
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: '10px 20px',
              borderRadius: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              🎨 각 감정의 도형을 클릭하여 자세히 알아보세요
            </div>
          </div>
        </div>
      </div>

      {/* Learn More 모달 */}
      <AnimatePresence>
        {showLearnMore && (
          <LearnMoreModal onClose={() => setShowLearnMore(false)} />
        )}
      </AnimatePresence>

      {/* 감정 팝업 오버레이 */}
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
