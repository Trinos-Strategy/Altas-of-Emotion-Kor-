import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { partiallyChartedEmotions } from '../data/additionalData';

// ============================================
// 탐험 섹션 - 리디자인 버전
// Response 섹션과 스타일 통일
// ============================================

// 감정 카드 컴포넌트
const EmotionCard = ({ emotion, index, isExpanded, onToggle, isMobile }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={!isMobile ? { y: -8 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <button
        onClick={() => onToggle(isExpanded ? null : emotion.id)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer'
        }}
        aria-expanded={isExpanded}
        aria-controls={`emotion-content-${emotion.id}`}
      >
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: isMobile ? '16px' : '20px',
            padding: isMobile ? '20px' : '28px',
            backgroundColor: '#fff',
            borderTop: `4px solid ${emotion.color}`,
            boxShadow: isExpanded || isHovered
              ? '0 16px 48px rgba(0,0,0,0.15)'
              : '0 8px 32px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
        >
          {/* 헤더 영역 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px' }}>
            {/* 아이콘 */}
            <div
              style={{
                width: isMobile ? '48px' : '56px',
                height: isMobile ? '48px' : '56px',
                borderRadius: isMobile ? '12px' : '16px',
                backgroundColor: `${emotion.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.3s ease'
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: '700',
                  color: emotion.color
                }}
              >
                {emotion.name_ko.charAt(0)}
              </span>
            </div>

            {/* 제목 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  margin: 0,
                  fontFamily: "'Noto Serif KR', Georgia, serif"
                }}
              >
                {emotion.name_ko}
              </h3>
              <p style={{
                fontSize: isMobile ? '11px' : '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#9ca3af',
                margin: '4px 0 0'
              }}>
                {emotion.name_en}
              </p>
            </div>

            {/* 확장 아이콘 */}
            <div
              style={{
                width: isMobile ? '32px' : '36px',
                height: isMobile ? '32px' : '36px',
                borderRadius: '50%',
                backgroundColor: isExpanded ? '#1a1a1a' : '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.3s ease'
              }}
            >
              <svg
                width={isMobile ? '14' : '16'}
                height={isMobile ? '14' : '16'}
                fill="none"
                stroke={isExpanded ? '#fff' : '#6b7280'}
                viewBox="0 0 24 24"
                style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* 확장 콘텐츠 */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={`emotion-content-${emotion.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                  opacity: { duration: 0.3, ease: 'easeInOut' }
                }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  paddingTop: isMobile ? '20px' : '24px',
                  marginTop: isMobile ? '20px' : '24px',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  {/* 한글 설명 */}
                  <p style={{
                    fontSize: isMobile ? '14px' : '15px',
                    color: '#374151',
                    lineHeight: '1.8',
                    letterSpacing: '0.02em',
                    margin: 0
                  }}>
                    {emotion.description_ko}
                  </p>

                  {/* 영문 설명 */}
                  <p style={{
                    fontSize: isMobile ? '12px' : '13px',
                    color: '#9ca3af',
                    lineHeight: '1.7',
                    letterSpacing: '0.02em',
                    fontStyle: 'italic',
                    margin: '16px 0 0'
                  }}>
                    {emotion.description_en}
                  </p>

                  {/* 태그 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: isMobile ? '20px' : '24px' }}>
                    <span
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '600',
                        backgroundColor: `${emotion.color}15`,
                        color: emotion.color
                      }}
                    >
                      부분 탐구
                    </span>
                    <span style={{
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280'
                    }}>
                      &lt;50% 합의
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.article>
  );
};

// 섹션 헤더 컴포넌트
const SectionHeader = ({ showInfo, onToggleInfo, isMobile }) => {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <motion.header
      ref={headerRef}
      style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '64px' }}
      initial={{ opacity: 0, y: -20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* 배지 */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '20px',
        backgroundColor: '#faf5ff',
        border: '1px solid #e9d5ff',
        marginBottom: isMobile ? '20px' : '24px'
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#a855f7'
        }} />
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: '#7c3aed',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Partially Charted
        </span>
      </div>

      {/* 타이틀 */}
      <h1
        style={{
          fontSize: isMobile ? '32px' : '48px',
          fontWeight: '300',
          color: '#1a1a1a',
          marginBottom: isMobile ? '12px' : '20px',
          fontFamily: "'Noto Serif KR', Georgia, serif"
        }}
      >
        탐험하는 감정들
      </h1>

      {/* 서브타이틀 */}
      <p style={{
        fontSize: isMobile ? '16px' : '20px',
        color: '#666',
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: isMobile ? '20px' : '24px',
        lineHeight: '1.7',
        letterSpacing: '0.02em'
      }}>
        아직 완전히 탐구되지 않았지만, 우리의 감정 경험에서 중요한 역할을 하는 9가지 감정
      </p>

      {/* 정보 버튼 */}
      <button
        onClick={onToggleInfo}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          borderRadius: '24px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#666',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        aria-expanded={showInfo}
      >
        <svg style={{ width: '16px', height: '16px', color: '#a855f7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>왜 "부분적으로 탐구된" 감정인가요?</span>
        <svg
          style={{
            width: '16px',
            height: '16px',
            transform: showInfo ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 정보 패널 */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: '24px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: isMobile ? '20px' : '24px',
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: isMobile ? '16px' : '20px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  width: isMobile ? '40px' : '48px',
                  height: isMobile ? '40px' : '48px',
                  borderRadius: isMobile ? '12px' : '16px',
                  backgroundColor: '#fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg style={{ width: '20px', height: '20px', color: '#d97706' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '8px',
                    fontSize: isMobile ? '16px' : '18px'
                  }}>과학적 합의 기준</h4>
                  <p style={{
                    fontSize: isMobile ? '14px' : '15px',
                    color: '#4b5563',
                    lineHeight: '1.7',
                    letterSpacing: '0.02em',
                    margin: 0
                  }}>
                    Atlas of Emotions는 <strong>248명의 감정 과학자들</strong>을 대상으로 한 설문조사를 기반으로 합니다.
                    5가지 핵심 감정은 <span style={{ color: '#7c3aed', fontWeight: '600' }}>76% 이상</span>의 과학자들이
                    보편적 감정으로 동의했습니다. 반면, 아래의 감정들은 <span style={{ color: '#ec4899', fontWeight: '600' }}>50% 이하</span>의 합의를 얻어
                    "부분적으로 탐구된" 감정으로 분류됩니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// 인용구 컴포넌트
const QuoteSection = ({ isMobile }) => {
  const quoteRef = useRef(null);
  const isInView = useInView(quoteRef, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={quoteRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ marginTop: isMobile ? '48px' : '64px' }}
    >
      <div
        style={{
          position: 'relative',
          padding: isMobile ? '40px 24px' : '48px',
          borderRadius: isMobile ? '20px' : '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
        }}
      >
        {/* 장식 인용부호 */}
        <div
          style={{
            position: 'absolute',
            left: '24px',
            top: '16px',
            fontSize: '120px',
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.15)',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        >
          "
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <p
            style={{
              fontSize: isMobile ? '20px' : '24px',
              color: '#fff',
              lineHeight: '1.6',
              marginBottom: '24px',
              letterSpacing: '0.02em',
              fontFamily: "'Noto Serif KR', Georgia, serif"
            }}
          >
            감정의 세계는 아직 탐험 중입니다.
            <br />
            <span style={{ fontWeight: '600' }}>열린 마음</span>으로 새로운 감정을 발견하세요.
          </p>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: '600',
            margin: 0
          }}>
            — Atlas of Emotions
          </p>
        </div>
      </div>
    </motion.section>
  );
};

// 메타 정보 컴포넌트
const MetaInfo = ({ isMobile }) => {
  const metaRef = useRef(null);
  const isInView = useInView(metaRef, { once: true });

  return (
    <motion.div
      ref={metaRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ marginTop: isMobile ? '32px' : '40px', textAlign: 'center' }}
    >
      <p style={{
        fontSize: '14px',
        color: '#9ca3af',
        letterSpacing: '0.02em'
      }}>
        <span style={{ fontWeight: '600', color: '#6b7280' }}>9</span>개 감정
        <span style={{ margin: '0 12px', color: '#d1d5db' }}>·</span>
        <span style={{ fontWeight: '600', color: '#6b7280' }}>&lt;50%</span> 과학자 합의
        <span style={{ margin: '0 12px', color: '#d1d5db' }}>·</span>
        <span style={{ fontWeight: '600', color: '#6b7280' }}>248</span>명 참여
      </p>
    </motion.div>
  );
};

// 메인 컴포넌트
const PartiallyChartedEmotions = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      style={{
        minHeight: '100vh',
        padding: isMobile ? '80px 16px 120px' : '96px 40px 120px',
        backgroundColor: '#FAFAFA'
      }}
      role="region"
      aria-label="탐험하는 감정들"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 */}
        <SectionHeader
          showInfo={showInfo}
          onToggleInfo={() => setShowInfo(!showInfo)}
          isMobile={isMobile}
        />

        {/* 카드 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isMobile ? '20px' : '32px'
        }}>
          {partiallyChartedEmotions.map((emotion, index) => (
            <EmotionCard
              key={emotion.id}
              emotion={emotion}
              index={index}
              isExpanded={expandedId === emotion.id}
              onToggle={setExpandedId}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* 인용구 */}
        <QuoteSection isMobile={isMobile} />

        {/* 메타 정보 */}
        <MetaInfo isMobile={isMobile} />
      </div>
    </section>
  );
};

export default PartiallyChartedEmotions;
