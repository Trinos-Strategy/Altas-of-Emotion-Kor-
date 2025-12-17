import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions, emotionOrder, dalaiLamaQuote, resources } from '../data/emotions';

// 전략 원칙 데이터
const PRINCIPLES = [
  {
    id: 'recognize',
    icon: '💡',
    title_ko: '인식하기',
    title_en: 'RECOGNIZE',
    description: '감정을 느낄 때 잠시 멈추고 무엇을 느끼는지 이름 붙여보세요. 인식이 변화의 첫 걸음입니다.',
    color: '#3B82F6',
    lightColor: '#DBEAFE'
  },
  {
    id: 'compassion',
    icon: '❤️',
    title_ko: '자기 연민',
    title_en: 'SELF-COMPASSION',
    description: '모든 감정은 자연스러운 것입니다. 자신을 판단하지 말고 친절하게 대하세요.',
    color: '#EC4899',
    lightColor: '#FCE7F3'
  },
  {
    id: 'practice',
    icon: '⚡',
    title_ko: '연습하기',
    title_en: 'PRACTICE',
    description: '감정 조절은 기술입니다. 규칙적인 연습으로 점점 더 자연스러워집니다.',
    color: '#F59E0B',
    lightColor: '#FEF3C7'
  }
];

// 해독제 카테고리
const ANTIDOTE_CATEGORIES = [
  { id: 'awareness', icon: '👁️', name_ko: '인식', name_en: 'Awareness' },
  { id: 'acceptance', icon: '🤝', name_ko: '수용', name_en: 'Acceptance' },
  { id: 'reframe', icon: '🔄', name_ko: '재구성', name_en: 'Reframe' },
  { id: 'action', icon: '🎯', name_ko: '행동', name_en: 'Action' }
];

const Strategies = ({ selectedEmotion }) => {
  const [activeTab, setActiveTab] = useState('principles');
  const [expandedAntidote, setExpandedAntidote] = useState(null);
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
            각 감정에 대한 해독제와 방해물을 이해하면 더 나은 선택을 할 수 있습니다.
          </p>
        </motion.header>

        {/* Quote Card - Large with gradient */}
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
          {/* Big quotation mark on left */}
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
            gap: '12px'
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {[
            { id: 'principles', label: '세 가지 원칙' },
            { id: 'antidotes', label: '해독제' },
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
              {/* Three Principles - Large Cards 300x350px */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
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
              <AntidotesSection
                currentEmotion={currentEmotion}
                expandedAntidote={expandedAntidote}
                setExpandedAntidote={setExpandedAntidote}
              />
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

// 원칙 카드 컴포넌트 - 300x350px
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
      {/* Icon Circle */}
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

      {/* English Label */}
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

      {/* Korean Title */}
      <h3 style={{
        fontSize: '28px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '16px'
      }}>
        {principle.title_ko}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.7',
        flex: 1
      }}>
        {principle.description}
      </p>

      {/* Bottom indicator */}
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

// 해독제 섹션
const AntidotesSection = ({ currentEmotion, expandedAntidote, setExpandedAntidote }) => {
  // 해독제 데이터
  const antidoteData = {
    awareness: {
      title: '감정 인식하기',
      description: '자신이 어떤 감정을 느끼고 있는지 명확하게 파악하세요.',
      tips: [
        '몸의 감각에 주의를 기울이세요',
        '감정에 이름을 붙여보세요',
        '판단 없이 관찰하세요',
        '감정의 강도를 1-10으로 평가해보세요'
      ]
    },
    acceptance: {
      title: '감정 수용하기',
      description: '모든 감정은 자연스러운 것입니다. 억누르지 말고 받아들이세요.',
      tips: [
        '감정을 좋거나 나쁘다고 판단하지 마세요',
        '"이런 감정을 느끼는 것은 괜찮아"라고 말하세요',
        '감정이 지나가도록 허용하세요',
        '자신에게 친절하게 대하세요'
      ]
    },
    reframe: {
      title: '관점 재구성',
      description: '상황을 다른 각도에서 바라보며 새로운 의미를 찾으세요.',
      tips: [
        '다른 사람의 입장에서 생각해보세요',
        '이 상황에서 배울 수 있는 것은?',
        '최악의 시나리오도 견딜 수 있을까?',
        '1년 후에도 이것이 중요할까?'
      ]
    },
    action: {
      title: '건설적 행동',
      description: '감정에 휩쓸리지 않고 의도적인 행동을 선택하세요.',
      tips: [
        '깊은 호흡을 3번 하세요',
        '잠시 그 상황에서 벗어나세요',
        '신뢰할 수 있는 사람과 이야기하세요',
        '운동이나 산책을 하세요'
      ]
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h3 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        {currentEmotion ? `${currentEmotion.name_ko}의 해독제` : '감정 해독제'}
      </h3>

      {/* Accordion Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {ANTIDOTE_CATEGORIES.map((category, index) => {
          const isExpanded = expandedAntidote === category.id;
          const data = antidoteData[category.id];

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                onClick={() => setExpandedAntidote(isExpanded ? null : category.id)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: isExpanded
                    ? '0 20px 50px rgba(0,0,0,0.12)'
                    : '0 4px 20px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: isExpanded ? '2px solid #1a1a1a' : '2px solid transparent'
                }}
              >
                {/* Header */}
                <div style={{
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}>
                  <span style={{ fontSize: '40px' }}>{category.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#888',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}>
                      {category.name_en}
                    </span>
                    <h4 style={{
                      fontSize: '22px',
                      fontWeight: '700',
                      color: '#1a1a1a',
                      marginTop: '4px'
                    }}>
                      {data.title}
                    </h4>
                  </div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <svg width="20" height="20" fill="none" stroke="#333" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{
                        padding: '0 32px 32px',
                        borderTop: '1px solid #f0f0f0'
                      }}>
                        <p style={{
                          fontSize: '16px',
                          color: '#666',
                          lineHeight: '1.7',
                          marginTop: '20px',
                          marginBottom: '24px'
                        }}>
                          {data.description}
                        </p>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(2, 1fr)',
                          gap: '12px'
                        }}>
                          {data.tips.map((tip, i) => (
                            <div
                              key={i}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '12px'
                              }}
                            >
                              <span style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: '#1a1a1a',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: '700',
                                flexShrink: 0
                              }}>
                                {i + 1}
                              </span>
                              <span style={{ fontSize: '15px', color: '#444' }}>
                                {tip}
                              </span>
                            </div>
                          ))}
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

// 리소스 리스트
const ResourcesList = () => {
  const resourceTypes = {
    YouTube: { icon: '📺', color: '#FF0000', bg: '#FEE2E2' },
    Meditation: { icon: '🧘', color: '#8B5CF6', bg: '#EDE9FE' },
    App: { icon: '📱', color: '#3B82F6', bg: '#DBEAFE' },
    Article: { icon: '📖', color: '#10B981', bg: '#D1FAE5' }
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
        gridTemplateColumns: 'repeat(2, 1fr)',
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
