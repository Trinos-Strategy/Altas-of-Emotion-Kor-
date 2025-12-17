import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';

// 원본 사이트 분석 기반 - 감정별 크기 (픽셀 단위, 하드코딩)
const EMOTION_SIZES = {
  fear: 380,        // 가장 큰 원형 (보라)
  enjoyment: 340,   // 두번째로 큰 원형 (노랑)
  anger: 280,       // 중간 크기 (빨강)
  disgust: 260,     // 중간 크기 (초록)
  sadness: 220      // 가장 작은 원형 (파랑)
};

// 감정별 위치 (중앙 기준 오프셋, 픽셀 단위)
const EMOTION_POSITIONS = {
  enjoyment: { top: '5%', left: '50%', transform: 'translateX(-50%)' },
  fear: { top: '20%', right: '10%' },
  anger: { top: '25%', left: '10%' },
  sadness: { bottom: '15%', right: '25%' },
  disgust: { bottom: '10%', left: '20%' }
};

// 감정별 색상 데이터
const EMOTION_COLORS = {
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

// 동심원 원형 컴포넌트
const EmotionCircle = ({ emotion, isSelected, onClick, delay = 0 }) => {
  const colors = EMOTION_COLORS[emotion];
  const size = EMOTION_SIZES[emotion];
  const position = EMOTION_POSITIONS[emotion];

  return (
    <motion.div
      onClick={() => onClick(emotion)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.08, zIndex: 100 }}
      style={{
        position: 'absolute',
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'pointer',
        zIndex: isSelected ? 50 : 10
      }}
    >
      {/* 동심원 레이어들 - 바깥에서 안쪽으로 */}
      {/* 레이어 1 - 가장 바깥 (15% opacity) */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: colors.primary,
          opacity: 0.15,
          filter: `drop-shadow(0 0 30px ${colors.primary})`
        }}
      />
      {/* 레이어 2 (25% opacity) */}
      <div
        style={{
          position: 'absolute',
          top: '7.5%',
          left: '7.5%',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          backgroundColor: colors.primary,
          opacity: 0.25
        }}
      />
      {/* 레이어 3 (40% opacity) */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '15%',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          backgroundColor: colors.primary,
          opacity: 0.40
        }}
      />
      {/* 레이어 4 (65% opacity) */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
          borderRadius: '50%',
          backgroundColor: colors.primary,
          opacity: 0.65
        }}
      />
      {/* 레이어 5 - 가장 안쪽 (90% opacity) */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '35%',
          width: '30%',
          height: '30%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${colors.light}, ${colors.primary})`,
          opacity: 0.90,
          border: `2px solid ${colors.dark}`
        }}
      />

      {/* 감정 레이블 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10
        }}
      >
        <div
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            marginBottom: '4px'
          }}
        >
          {colors.name_ko}
        </div>
        <div
          style={{
            fontSize: '11px',
            fontWeight: '600',
            color: 'rgba(255,255,255,0.85)',
            textShadow: '0 1px 4px rgba(0,0,0,0.4)',
            letterSpacing: '1.5px'
          }}
        >
          {colors.name_en}
        </div>
      </div>

      {/* 선택 표시 링 */}
      {isSelected && (
        <motion.div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            width: 'calc(100% + 20px)',
            height: 'calc(100% + 20px)',
            borderRadius: '50%',
            border: `3px dashed ${colors.primary}`,
            opacity: 0.8
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

const Experience = ({ selectedEmotion }) => {
  const [localSelectedEmotion, setLocalSelectedEmotion] = useState(selectedEmotion);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

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
  const currentEmotion = localSelectedEmotion ? emotions[localSelectedEmotion] : null;
  const currentColors = localSelectedEmotion ? EMOTION_COLORS[localSelectedEmotion] : null;

  // 렌더링 순서 (큰 것 먼저, 작은 것이 위에 오도록)
  const renderOrder = ['fear', 'enjoyment', 'anger', 'disgust', 'sadness'];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ paddingTop: '80px' }}
      role="region"
      aria-label="감정 경험 시각화"
    >
      {/* 왼쪽 사이드바 */}
      <motion.aside
        className="lg:w-[400px] bg-gray-50 p-8 md:p-10 lg:p-12 flex flex-col border-r border-gray-200"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex-1">
          <h2 style={{ fontSize: '32px', fontWeight: '600', color: '#1a1a1a', marginBottom: '16px', paddingBottom: '16px', borderBottom: '2px solid #1a1a1a' }}>
            감정의 대륙
          </h2>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '32px', marginTop: '24px' }}>
            다섯 가지 핵심 감정이 서로 연결되어 있습니다. 원을 클릭하여 각 감정을 탐험하세요.
          </p>

          {/* 크기 범례 */}
          <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
            <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              원 크기 범례
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {renderOrder.map((emotion) => (
                <div key={emotion} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: `${EMOTION_SIZES[emotion] / 10}px`,
                    height: `${EMOTION_SIZES[emotion] / 10}px`,
                    borderRadius: '50%',
                    backgroundColor: EMOTION_COLORS[emotion].primary,
                    minWidth: '20px',
                    minHeight: '20px'
                  }} />
                  <span style={{ fontSize: '14px', color: '#333' }}>
                    {EMOTION_COLORS[emotion].name_ko} ({EMOTION_SIZES[emotion]}px)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 현재 선택된 감정 정보 */}
          {currentEmotion ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: '24px' }}
            >
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a1a', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}>
                {currentColors.name_en}
              </h3>

              <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.7', marginBottom: '20px' }}>
                {currentEmotion.description_ko}
              </p>

              {/* 상태 목록 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentEmotion.states && currentEmotion.states.slice(0, 5).map((state, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      border: '1px solid #eee'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: currentColors.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>{state.name_ko}</p>
                      <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>{state.name_en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div style={{ fontSize: '15px', color: '#999', fontStyle: 'italic' }}>
              감정 원을 클릭하여 자세한 정보를 확인하세요.
            </div>
          )}

          {/* 현재 감정 표시 */}
          {localSelectedEmotion && (
            <div style={{
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '16px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #eee',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 30% 30%, ${currentColors.light}, ${currentColors.primary})`,
                  boxShadow: `0 4px 12px ${currentColors.primary}40`
                }}
              />
              <div>
                <p style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '16px' }}>{currentColors.name_ko}</p>
                <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{currentColors.name_en}</p>
              </div>
            </div>
          )}
        </div>

        {/* 더 알아보기 버튼 */}
        <motion.button
          onClick={() => setSidebarOpen(true)}
          style={{
            marginTop: '32px',
            width: '100%',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>더 알아보기</span>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </motion.aside>

      {/* 시각화 영역 */}
      <motion.div
        className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-hidden"
        style={{ backgroundColor: '#f8f8f8', minHeight: '600px', position: 'relative' }}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* 감정 원들 컨테이너 */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '800px',
            height: '600px'
          }}
        >
          {/* 감정 동심원들 */}
          {renderOrder.map((emotion, index) => (
            <EmotionCircle
              key={emotion}
              emotion={emotion}
              isSelected={localSelectedEmotion === emotion}
              onClick={handleEmotionClick}
              delay={0.1 + index * 0.15}
            />
          ))}
        </div>

        {/* 안내 텍스트 */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '14px',
            color: '#999'
          }}
        >
          각 감정 원을 클릭하여 탐험하세요
        </div>
      </motion.div>

      {/* Learn More 사이드바 */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)',
                zIndex: 40
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '440px',
                backgroundColor: '#fff',
                zIndex: 50,
                overflowY: 'auto',
                boxShadow: '0 0 40px rgba(0,0,0,0.2)'
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div style={{ padding: '32px' }}>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '50%'
                  }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #1a1a1a' }}>
                  다섯 가지 핵심 감정
                </h2>

                <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', marginBottom: '32px' }}>
                  폴 에크먼 박사의 연구에 기반한 다섯 가지 보편적 감정입니다.
                </p>

                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                  모든 감정
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.keys(EMOTION_COLORS).map((emotionKey) => {
                    const colors = EMOTION_COLORS[emotionKey];
                    return (
                      <button
                        key={emotionKey}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '16px',
                          backgroundColor: '#fff',
                          border: '1px solid #eee',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          width: '100%'
                        }}
                        onClick={() => {
                          setLocalSelectedEmotion(emotionKey);
                          setSidebarOpen(false);
                        }}
                      >
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle at 30% 30%, ${colors.light}, ${colors.primary})`,
                            boxShadow: `0 4px 12px ${colors.primary}30`
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '16px' }}>{colors.name_ko}</p>
                          <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase' }}>{colors.name_en}</p>
                        </div>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: colors.primary,
                            opacity: 0.6
                          }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* 크기 설명 */}
                <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                    원의 크기 의미
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
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
