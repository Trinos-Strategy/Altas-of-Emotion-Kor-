import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions, emotionOrder, dalaiLamaQuote, resources } from '../data/emotions';
import { impediments, antidotesDetailed } from '../data/additionalData';

// 전략 원칙 데이터 - Refined palette
const PRINCIPLES = [
  {
    id: 'recognize',
    icon: '💡',
    title_ko: '인식하기',
    title_en: 'RECOGNIZE',
    description: '감정을 느낄 때 잠시 멈추고 무엇을 느끼는지 이름 붙여보세요. 인식이 변화의 첫 걸음입니다.',
    color: '#7BA3C9',
    lightColor: '#E8F1F8'
  },
  {
    id: 'compassion',
    icon: '❤️',
    title_ko: '자기 연민',
    title_en: 'SELF-COMPASSION',
    description: '모든 감정은 자연스러운 것입니다. 자신을 판단하지 말고 친절하게 대하세요.',
    color: '#D4847B',
    lightColor: '#F8EDED'
  },
  {
    id: 'practice',
    icon: '⚡',
    title_ko: '연습하기',
    title_en: 'PRACTICE',
    description: '감정 조절은 기술입니다. 규칙적인 연습으로 점점 더 자연스러워집니다.',
    color: '#E2C478',
    lightColor: '#FBF7EC'
  }
];

const Strategies = ({ selectedEmotion }) => {
  const [activeTab, setActiveTab] = useState('principles');
  const [expandedAntidote, setExpandedAntidote] = useState(null);
  const [selectedEmotionForAntidote, setSelectedEmotionForAntidote] = useState(selectedEmotion || 'anger');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentEmotion = selectedEmotion ? emotions[selectedEmotion] : null;

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        padding: '96px 24px',
        backgroundColor: '#FAFAFA'
      }}
      role="region"
      aria-label="감정 전략"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <motion.header
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            감정 전략
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#666',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            감정을 건설적으로 다루는 방법을 배워보세요.
            각 감정에 대한 해독제와 장애물을 이해하면 더 나은 선택을 할 수 있습니다.
          </p>
        </motion.header>

        {/* Quote Card */}
        <motion.div
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            borderRadius: '32px',
            padding: '60px 80px',
            marginBottom: '80px',
            boxShadow: '0 25px 80px rgba(102, 126, 234, 0.4)',
            overflow: 'hidden'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div style={{
            position: 'absolute',
            left: '40px',
            top: '30px',
            fontSize: '180px',
            fontFamily: 'Georgia, serif',
            color: 'rgba(255,255,255,0.2)',
            lineHeight: '1',
            userSelect: 'none'
          }}>
            "
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{
              fontSize: '28px',
              fontWeight: '500',
              color: '#fff',
              lineHeight: '1.8',
              marginBottom: '24px',
              fontStyle: 'italic',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              "{dalaiLamaQuote.ko}"
            </p>
            <footer style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: '600'
            }}>
              — 달라이 라마
            </footer>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '48px',
            gap: '12px',
            flexWrap: 'wrap'
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {[
            { id: 'principles', label: '세 가지 원칙' },
            { id: 'antidotes', label: '해독제' },
            { id: 'impediments', label: '장애물' },
            { id: 'resources', label: '리소스' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '600',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: activeTab === tab.id ? '#1a1a1a' : '#fff',
                color: activeTab === tab.id ? '#fff' : '#666',
                boxShadow: activeTab === tab.id
                  ? '0 8px 30px rgba(0,0,0,0.2)'
                  : '0 4px 15px rgba(0,0,0,0.08)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'principles' && (
            <motion.div
              key="principles"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '32px',
                marginBottom: '60px'
              }}>
                {PRINCIPLES.map((principle, index) => (
                  <PrincipleCard key={principle.id} principle={principle} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'antidotes' && (
            <motion.div
              key="antidotes"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <DetailedAntidotesSection
                selectedEmotion={selectedEmotionForAntidote}
                setSelectedEmotion={setSelectedEmotionForAntidote}
              />
            </motion.div>
          )}

          {activeTab === 'impediments' && (
            <motion.div
              key="impediments"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <ImpedimentsSection />
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <ResourcesList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// 원칙 카드 컴포넌트
const PrincipleCard = ({ principle, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{
        width: '100%',
        minHeight: '350px',
        backgroundColor: '#fff',
        borderRadius: '24px',
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: isHovered
          ? `0 30px 60px ${principle.color}30`
          : '0 10px 40px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        border: `2px solid ${isHovered ? principle.color : 'transparent'}`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${principle.lightColor} 0%, ${principle.color}30 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: isHovered ? `0 15px 40px ${principle.color}40` : 'none',
        transition: 'all 0.4s ease'
      }}>
        <span style={{ fontSize: '48px' }}>{principle.icon}</span>
      </div>

      <span style={{
        fontSize: '12px',
        fontWeight: '700',
        color: principle.color,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '8px'
      }}>
        {principle.title_en}
      </span>

      <h3 style={{
        fontSize: '28px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '16px'
      }}>
        {principle.title_ko}
      </h3>

      <p style={{
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.7',
        flex: 1
      }}>
        {principle.description}
      </p>

      <div style={{
        width: isHovered ? '60px' : '40px',
        height: '4px',
        backgroundColor: principle.color,
        borderRadius: '2px',
        marginTop: '20px',
        transition: 'all 0.3s ease'
      }} />
    </motion.div>
  );
};

// 상세 해독제 섹션 (감정별 상태별 해독제)
const DetailedAntidotesSection = ({ selectedEmotion, setSelectedEmotion }) => {
  const [expandedState, setExpandedState] = useState(null);
  const antidotes = antidotesDetailed[selectedEmotion] || [];
  const emotion = emotions[selectedEmotion];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        감정 상태별 해독제
      </h3>
      <p style={{
        fontSize: '16px',
        color: '#666',
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '600px',
        margin: '0 auto 40px'
      }}>
        각 감정의 강도별로 적합한 해독제를 찾아보세요.
        감정의 상태에 따라 다른 접근법이 필요합니다.
      </p>

      {/* 감정 선택 버튼 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {emotionOrder.map(emotionId => {
          const em = emotions[emotionId];
          const isActive = selectedEmotion === emotionId;
          return (
            <button
              key={emotionId}
              onClick={() => {
                setSelectedEmotion(emotionId);
                setExpandedState(null);
              }}
              style={{
                padding: '12px 24px',
                borderRadius: '30px',
                border: `2px solid ${isActive ? em.color : '#e0e0e0'}`,
                backgroundColor: isActive ? em.color : '#fff',
                color: isActive ? '#fff' : '#666',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#fff' : em.color
              }} />
              {em.name_ko}
            </button>
          );
        })}
      </div>

      {/* 해독제 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {antidotes.map((item, index) => {
          const isExpanded = expandedState === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                onClick={() => setExpandedState(isExpanded ? null : index)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: isExpanded
                    ? `0 20px 50px ${emotion?.color}20`
                    : '0 4px 20px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  border: isExpanded ? `2px solid ${emotion?.color}` : '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  padding: '20px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  {/* 강도 표시 */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    backgroundColor: emotion?.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: emotion?.color
                    }}>
                      {index + 1}
                    </span>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      marginBottom: '4px'
                    }}>
                      {item.state_ko}
                    </h4>
                    <p style={{
                      fontSize: '13px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {item.state_en}
                    </p>
                  </div>

                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <svg width="18" height="18" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{
                        padding: '0 28px 28px',
                        borderTop: '1px solid #f0f0f0'
                      }}>
                        <div style={{
                          marginTop: '20px',
                          padding: '20px',
                          backgroundColor: emotion?.color + '10',
                          borderRadius: '12px',
                          borderLeft: `4px solid ${emotion?.color}`
                        }}>
                          <p style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            color: emotion?.color,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            marginBottom: '8px'
                          }}>
                            해독제
                          </p>
                          <p style={{
                            fontSize: '17px',
                            color: '#333',
                            lineHeight: '1.7'
                          }}>
                            {item.antidote_ko}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// 장애물 섹션 (Impediments) - 모든 감정 지원
const ImpedimentsSection = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('enjoyment');
  const currentImpediments = impediments[selectedEmotion];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        감정 조절의 장애물
      </h3>
      <p style={{
        fontSize: '16px',
        color: '#666',
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '600px',
        margin: '0 auto 40px'
      }}>
        각 감정을 건설적으로 다루는 것을 방해하는 요소들을 알아보세요.
      </p>

      {/* 감정 선택 버튼 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {emotionOrder.map(emotionId => {
          const em = emotions[emotionId];
          const isActive = selectedEmotion === emotionId;
          return (
            <button
              key={emotionId}
              onClick={() => setSelectedEmotion(emotionId)}
              style={{
                padding: '12px 24px',
                borderRadius: '30px',
                border: `2px solid ${isActive ? em.color : '#e0e0e0'}`,
                backgroundColor: isActive ? em.color : '#fff',
                color: isActive ? '#fff' : '#666',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#fff' : em.color
              }} />
              {em.name_ko}
            </button>
          );
        })}
      </div>

      {/* 선택된 감정 제목 */}
      <motion.div
        key={selectedEmotion}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ textAlign: 'center', marginBottom: '32px' }}
      >
        <h4 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: currentImpediments?.color || '#1a1a1a',
          marginBottom: '8px'
        }}>
          {currentImpediments?.title_ko}
        </h4>
        <p style={{
          fontSize: '14px',
          color: '#666'
        }}>
          {currentImpediments?.description_ko}
        </p>
      </motion.div>

      {/* 장애물 카드 그리드 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {currentImpediments?.items.map((item, index) => (
          <motion.div
            key={`${selectedEmotion}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            style={{
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: `2px solid ${currentImpediments?.color}20`,
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              y: -8,
              boxShadow: `0 20px 50px ${currentImpediments?.color}20`,
              borderColor: currentImpediments?.color
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              backgroundColor: `${currentImpediments?.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '28px' }}>🚧</span>
            </div>

            <h4 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '8px'
            }}>
              {item.name_ko}
            </h4>
            <p style={{
              fontSize: '13px',
              color: currentImpediments?.color,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              {item.name_en}
            </p>
            <p style={{
              fontSize: '15px',
              color: '#666',
              lineHeight: '1.7'
            }}>
              {item.description_ko}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 안내 메시지 */}
      <motion.div
        style={{
          marginTop: '48px',
          padding: '32px',
          backgroundColor: `${currentImpediments?.color}10`,
          borderRadius: '20px',
          textAlign: 'center',
          border: `2px solid ${currentImpediments?.color}30`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p style={{ fontSize: '16px', color: '#333', lineHeight: '1.7' }}>
          💡 <strong>팁:</strong> 이러한 장애물을 인식하는 것이 첫 번째 단계입니다.
          장애물을 알아차리면, 그것을 극복하기 위한 의식적인 선택을 할 수 있습니다.
        </p>
      </motion.div>
    </div>
  );
};

// 리소스 리스트
const ResourcesList = () => {
  const resourceTypes = {
    YouTube: { icon: '📺', color: '#D4847B', bg: '#F8EDED' },
    Meditation: { icon: '🧘', color: '#9B8BC6', bg: '#F0EDF5' },
    App: { icon: '📱', color: '#7BA3C9', bg: '#E8F1F8' },
    Article: { icon: '📖', color: '#7BAF8D', bg: '#EDF5F0' },
    Website: { icon: '🌐', color: '#5A4B7B', bg: '#EDEBF0' }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h3 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        추천 리소스
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {resources.map((resource, i) => {
          const typeInfo = resourceTypes[resource.type] || resourceTypes.Article;

          return (
            <motion.a
              key={resource.title_en}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '28px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                borderColor: '#e0e0e0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: typeInfo.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  {typeInfo.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: typeInfo.color,
                    backgroundColor: typeInfo.bg,
                    marginBottom: '12px'
                  }}>
                    {resource.type}
                  </span>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '6px'
                  }}>
                    {resource.title_ko}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#888'
                  }}>
                    {resource.title_en}
                  </p>
                </div>
                <svg
                  style={{ width: '24px', height: '24px', color: '#ccc', flexShrink: 0 }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Atlas of Emotions Link */}
      <motion.div
        style={{
          marginTop: '48px',
          background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)',
          borderRadius: '20px',
          padding: '32px',
          textAlign: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p style={{ fontSize: '18px', color: '#666' }}>
          더 많은 리소스는{' '}
          <a
            href="https://atlasofemotions.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1a1a1a',
              fontWeight: '700',
              textDecoration: 'underline'
            }}
          >
            Atlas of Emotions 공식 사이트
          </a>
          에서 확인하세요.
        </p>
      </motion.div>
    </div>
  );
};

export default Strategies;
