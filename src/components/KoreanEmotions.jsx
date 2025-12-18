import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { koreanEmotions, westernComparisonInfo } from '../data/koreanEmotions';

// 한(恨) 도형 - 소용돌이/나선형
const HanShape = ({ size = 200, isActive, onClick, isHovered }) => {
  const scale = isHovered ? 1.08 : isActive ? 1.05 : 1;
  const layers = [1, 0.8, 0.6, 0.4, 0.25];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ cursor: 'pointer', overflow: 'visible' }}
      onClick={onClick}
      animate={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <defs>
        <radialGradient id="hanGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6B5B8B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2A1B4B" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B5B8B" />
          <stop offset="50%" stopColor="#4A3B6B" />
          <stop offset="100%" stopColor="#2A1B4B" />
        </linearGradient>
      </defs>

      {/* 외부 글로우 */}
      <circle cx="100" cy="100" r="95" fill="url(#hanGlow)" />

      {/* 다층 나선형 레이어 */}
      {layers.map((layerScale, i) => (
        <motion.path
          key={i}
          d={`M100,${100 - 80 * layerScale}
              A${80 * layerScale},${80 * layerScale} 0 1,1 ${100 - 80 * layerScale},100
              A${60 * layerScale},${60 * layerScale} 0 1,1 100,${100 + 60 * layerScale}
              A${40 * layerScale},${40 * layerScale} 0 1,1 ${100 + 40 * layerScale},100
              A${20 * layerScale},${20 * layerScale} 0 1,1 100,${100 - 20 * layerScale}`}
          fill="none"
          stroke={`rgba(107, 91, 139, ${0.2 + i * 0.15})`}
          strokeWidth={3 - i * 0.4}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
        />
      ))}

      {/* 중앙 원 */}
      <motion.circle
        cx="100"
        cy="100"
        r="15"
        fill="url(#hanGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      />
    </motion.svg>
  );
};

// 정(情) 도형 - 동심원/겹쳐진 원
const JeongShape = ({ size = 200, isActive, onClick, isHovered }) => {
  const scale = isHovered ? 1.08 : isActive ? 1.05 : 1;
  const layers = [1, 0.85, 0.7, 0.55, 0.4, 0.25];

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ cursor: 'pointer', overflow: 'visible' }}
      onClick={onClick}
      animate={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <defs>
        <radialGradient id="jeongGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4956A" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B5A3A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="jeongGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4956A" />
          <stop offset="50%" stopColor="#C17A4A" />
          <stop offset="100%" stopColor="#8B5A3A" />
        </linearGradient>
      </defs>

      {/* 외부 글로우 */}
      <circle cx="100" cy="100" r="95" fill="url(#jeongGlow)" />

      {/* 동심원 레이어 */}
      {layers.map((layerScale, i) => (
        <motion.circle
          key={i}
          cx="100"
          cy="100"
          r={80 * layerScale}
          fill="none"
          stroke={`rgba(193, 122, 74, ${0.15 + i * 0.12})`}
          strokeWidth={2.5 - i * 0.3}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
        />
      ))}

      {/* 중앙 채워진 원 */}
      <motion.circle
        cx="100"
        cy="100"
        r="18"
        fill="url(#jeongGradient)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: 'spring' }}
      />
    </motion.svg>
  );
};

// 7단계 스펙트럼 컴포넌트
const SpectrumView = ({ emotion, selectedLevel, onSelectLevel }) => {
  const emotionData = koreanEmotions[emotion];
  const isHan = emotion === 'han';
  const baseColor = isHan ? '#4A3B6B' : '#C17A4A';

  return (
    <div style={{ padding: '20px 0' }}>
      <h4 style={{
        color: baseColor,
        marginBottom: '16px',
        fontSize: '16px',
        fontWeight: '600'
      }}>
        7단계 스펙트럼 <span style={{ color: '#888', fontWeight: '400' }}>7-Level Spectrum</span>
      </h4>

      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        {emotionData.states.map((state, index) => {
          const intensity = (index + 1) / 7;
          const isSelected = selectedLevel === index;

          return (
            <motion.button
              key={index}
              onClick={() => onSelectLevel(isSelected ? null : index)}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                border: `2px solid ${isSelected ? baseColor : 'transparent'}`,
                background: `rgba(${isHan ? '74, 59, 107' : '193, 122, 74'}, ${0.1 + intensity * 0.25})`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '80px',
                transition: 'all 0.2s ease'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span style={{
                fontSize: '11px',
                color: '#888',
                marginBottom: '2px'
              }}>
                {state.level}단계
              </span>
              <span style={{
                fontWeight: '600',
                color: isSelected ? baseColor : '#333',
                fontSize: '14px'
              }}>
                {state.name_ko}
              </span>
              <span style={{
                fontSize: '10px',
                color: '#999',
                marginTop: '2px'
              }}>
                {state.name_en.split(' ')[0]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* 선택된 단계 상세 정보 */}
      <AnimatePresence mode="wait">
        {selectedLevel !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: `linear-gradient(135deg, rgba(${isHan ? '74, 59, 107' : '193, 122, 74'}, 0.08) 0%, rgba(${isHan ? '42, 27, 75' : '139, 90, 58'}, 0.12) 100%)`,
              borderRadius: '16px',
              padding: '20px',
              border: `1px solid rgba(${isHan ? '74, 59, 107' : '193, 122, 74'}, 0.2)`
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <h5 style={{
                color: baseColor,
                margin: '0 0 4px 0',
                fontSize: '18px'
              }}>
                {emotionData.states[selectedLevel].name_ko}
                <span style={{
                  color: '#888',
                  fontWeight: '400',
                  fontSize: '14px',
                  marginLeft: '8px'
                }}>
                  {emotionData.states[selectedLevel].name_en}
                </span>
              </h5>
            </div>

            <p style={{
              color: '#555',
              lineHeight: '1.7',
              margin: '0 0 12px 0',
              fontSize: '14px'
            }}>
              {emotionData.states[selectedLevel].description_ko}
            </p>

            <p style={{
              color: '#777',
              lineHeight: '1.6',
              margin: '0 0 16px 0',
              fontSize: '13px',
              fontStyle: 'italic'
            }}>
              {emotionData.states[selectedLevel].description_en}
            </p>

            {emotionData.states[selectedLevel].example_ko && (
              <div style={{
                background: 'rgba(255,255,255,0.5)',
                padding: '12px 16px',
                borderRadius: '10px',
                borderLeft: `3px solid ${baseColor}`
              }}>
                <p style={{
                  margin: '0',
                  color: '#444',
                  fontSize: '14px'
                }}>
                  {emotionData.states[selectedLevel].example_ko}
                </p>
                <p style={{
                  margin: '4px 0 0 0',
                  color: '#888',
                  fontSize: '12px'
                }}>
                  {emotionData.states[selectedLevel].example_en}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 장애물 뷰 컴포넌트
const ImpedimentsView = ({ emotion }) => {
  const emotionData = koreanEmotions[emotion];
  const isHan = emotion === 'han';
  const baseColor = isHan ? '#4A3B6B' : '#C17A4A';

  if (isHan) {
    // 한의 장애물 - 단계별 전환
    return (
      <div style={{ padding: '20px 0' }}>
        <h4 style={{
          color: baseColor,
          marginBottom: '16px',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          장애물 <span style={{ color: '#888', fontWeight: '400' }}>Impediments - What deepens Han</span>
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {emotionData.impediments.map((imp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: 'rgba(74, 59, 107, 0.06)',
                borderRadius: '12px',
                padding: '14px 16px',
                borderLeft: '3px solid rgba(74, 59, 107, 0.4)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '13px',
                  color: baseColor,
                  fontWeight: '600'
                }}>
                  {imp.from_ko} → {imp.to_ko}
                </span>
                <span style={{
                  fontSize: '11px',
                  color: '#888'
                }}>
                  {imp.from_en} → {imp.to_en}
                </span>
              </div>
              <ul style={{
                margin: '0',
                paddingLeft: '16px',
                color: '#555',
                fontSize: '13px',
                lineHeight: '1.6'
              }}>
                {imp.causes_ko.map((cause, i) => (
                  <li key={i}>{cause}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    );
  } else {
    // 정의 장애물 - 카테고리별
    return (
      <div style={{ padding: '20px 0' }}>
        <h4 style={{
          color: baseColor,
          marginBottom: '16px',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          장애물 <span style={{ color: '#888', fontWeight: '400' }}>Impediments - What blocks Jeong formation</span>
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {emotionData.impediments.map((category, catIndex) => (
            <div key={catIndex}>
              <h5 style={{
                color: '#666',
                fontSize: '13px',
                marginBottom: '10px',
                fontWeight: '500'
              }}>
                {category.category_ko} <span style={{ color: '#999' }}>{category.category_en}</span>
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {category.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (catIndex * 4 + index) * 0.08 }}
                    style={{
                      background: 'rgba(193, 122, 74, 0.06)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      borderLeft: '3px solid rgba(193, 122, 74, 0.4)'
                    }}
                  >
                    <div style={{
                      fontWeight: '600',
                      color: '#444',
                      fontSize: '14px',
                      marginBottom: '4px'
                    }}>
                      {item.name_ko}
                      <span style={{
                        fontWeight: '400',
                        color: '#888',
                        fontSize: '12px',
                        marginLeft: '8px'
                      }}>
                        {item.name_en}
                      </span>
                    </div>
                    <p style={{
                      margin: '0',
                      color: '#666',
                      fontSize: '13px'
                    }}>
                      {item.description_ko}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

// 해독제 뷰 컴포넌트
const AntidotesView = ({ emotion }) => {
  const emotionData = koreanEmotions[emotion];
  const isHan = emotion === 'han';
  const baseColor = isHan ? '#4A3B6B' : '#C17A4A';
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (isHan) {
    // 한의 해독제 - 단계별 + 4대 전통적 해독제
    return (
      <div style={{ padding: '20px 0' }}>
        <h4 style={{
          color: baseColor,
          marginBottom: '16px',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          해독제 <span style={{ color: '#888', fontWeight: '400' }}>Antidotes - What releases Han</span>
        </h4>

        {/* 단계별 해독제 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '10px',
          marginBottom: '24px'
        }}>
          {emotionData.antidotes.map((ant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              style={{
                background: expandedIndex === index
                  ? 'linear-gradient(135deg, rgba(74, 59, 107, 0.12) 0%, rgba(42, 27, 75, 0.16) 100%)'
                  : 'rgba(74, 59, 107, 0.05)',
                borderRadius: '12px',
                padding: '14px',
                cursor: 'pointer',
                border: expandedIndex === index ? `1px solid rgba(74, 59, 107, 0.3)` : '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{
                fontSize: '11px',
                color: baseColor,
                marginBottom: '4px',
                fontWeight: '500'
              }}>
                {ant.state_ko} <span style={{ color: '#999' }}>{ant.state_en}</span>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#333',
                fontWeight: '500',
                lineHeight: '1.4'
              }}>
                {ant.antidote_ko}
              </div>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <ul style={{
                      margin: '10px 0 0 0',
                      paddingLeft: '16px',
                      color: '#555',
                      fontSize: '12px',
                      lineHeight: '1.6'
                    }}>
                      {ant.details_ko.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 4대 전통적 해독제 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(74, 59, 107, 0.08) 0%, rgba(42, 27, 75, 0.12) 100%)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(74, 59, 107, 0.15)'
        }}>
          <h5 style={{
            color: baseColor,
            marginBottom: '16px',
            fontSize: '15px',
            fontWeight: '600'
          }}>
            4대 전통적 해독제 <span style={{ color: '#888', fontWeight: '400' }}>Four Traditional Antidotes</span>
          </h5>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {emotionData.traditionalAntidotes.map((trad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{trad.icon}</div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: baseColor,
                  marginBottom: '4px'
                }}>
                  {trad.name_ko}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#888',
                  marginBottom: '8px'
                }}>
                  {trad.name_en}
                </div>
                <p style={{
                  fontSize: '13px',
                  color: '#555',
                  margin: '0 0 8px 0',
                  lineHeight: '1.5'
                }}>
                  {trad.description_ko}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                  justifyContent: 'center'
                }}>
                  {trad.methods_ko.slice(0, 3).map((method, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(74, 59, 107, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        color: '#666'
                      }}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    // 정의 해독제 - 정 형성을 돕는 것 + 미운 정 해독제
    return (
      <div style={{ padding: '20px 0' }}>
        <h4 style={{
          color: baseColor,
          marginBottom: '16px',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          해독제 <span style={{ color: '#888', fontWeight: '400' }}>Antidotes - What helps Jeong form</span>
        </h4>

        {/* 정 형성 해독제 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {emotionData.antidotes.map((ant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                background: 'linear-gradient(135deg, rgba(193, 122, 74, 0.08) 0%, rgba(139, 90, 58, 0.12) 100%)',
                borderRadius: '14px',
                padding: '18px',
                border: '1px solid rgba(193, 122, 74, 0.15)'
              }}
            >
              <div style={{
                fontSize: '32px',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                {ant.icon}
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: baseColor,
                marginBottom: '4px',
                textAlign: 'center'
              }}>
                {ant.name_ko}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#888',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                {ant.name_en}
              </div>
              <ul style={{
                margin: '0',
                paddingLeft: '18px',
                color: '#555',
                fontSize: '13px',
                lineHeight: '1.7'
              }}>
                {ant.methods_ko.map((method, i) => (
                  <li key={i}>{method}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 미운 정 특별 해독제 */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(193, 122, 74, 0.1) 0%, rgba(139, 90, 58, 0.14) 100%)',
          borderRadius: '16px',
          padding: '20px',
          border: '1px solid rgba(193, 122, 74, 0.2)'
        }}>
          <h5 style={{
            color: baseColor,
            marginBottom: '16px',
            fontSize: '15px',
            fontWeight: '600'
          }}>
            미운 정의 특별 해독제 <span style={{ color: '#888', fontWeight: '400' }}>Special Antidotes for Bitter Jeong</span>
          </h5>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {emotionData.miunJeongAntidotes.map((ant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  borderLeft: `3px solid ${baseColor}`
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '4px'
                }}>
                  {ant.name_ko}
                  <span style={{
                    fontWeight: '400',
                    color: '#888',
                    fontSize: '12px',
                    marginLeft: '8px'
                  }}>
                    {ant.name_en}
                  </span>
                </div>
                <p style={{
                  margin: '0 0 6px 0',
                  color: baseColor,
                  fontSize: '14px',
                  fontStyle: 'italic'
                }}>
                  {ant.description_ko}
                </p>
                <p style={{
                  margin: '0',
                  color: '#666',
                  fontSize: '13px'
                }}>
                  {ant.explanation_ko}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

// 비교 인포박스 컴포넌트
const ComparisonInfoBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,248,250,0.95) 100%)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '24px',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h4 style={{
          margin: '0',
          fontSize: '15px',
          fontWeight: '600',
          color: '#333'
        }}>
          💡 {westernComparisonInfo.title_ko}
          <span style={{ color: '#888', fontWeight: '400', marginLeft: '8px', fontSize: '13px' }}>
            {westernComparisonInfo.title_en}
          </span>
        </h4>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          style={{ color: '#888' }}
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              color: '#555',
              lineHeight: '1.7',
              margin: '16px 0',
              fontSize: '14px'
            }}>
              {westernComparisonInfo.intro_ko}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {westernComparisonInfo.comparisons.map((comp, index) => (
                <div
                  key={index}
                  style={{
                    background: index === 0
                      ? 'rgba(74, 59, 107, 0.06)'
                      : 'rgba(193, 122, 74, 0.06)',
                    borderRadius: '12px',
                    padding: '14px'
                  }}
                >
                  <h5 style={{
                    margin: '0 0 8px 0',
                    color: index === 0 ? '#4A3B6B' : '#C17A4A',
                    fontSize: '14px'
                  }}>
                    {comp.emotion_ko} {comp.emotion_en}
                  </h5>
                  <p style={{
                    margin: '0 0 10px 0',
                    color: '#555',
                    fontSize: '13px',
                    lineHeight: '1.5'
                  }}>
                    {comp.comparison_ko}
                  </p>
                  <ul style={{
                    margin: '0',
                    paddingLeft: '18px',
                    color: '#666',
                    fontSize: '12px',
                    lineHeight: '1.6'
                  }}>
                    {comp.notSame_ko.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px 14px',
              background: 'rgba(0,0,0,0.03)',
              borderRadius: '10px',
              borderLeft: '3px solid #888'
            }}>
              <p style={{
                margin: '0',
                color: '#666',
                fontSize: '12px',
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                📝 {westernComparisonInfo.note_ko}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// 정의 특징 컴포넌트
const JeongCharacteristics = () => {
  const jeongData = koreanEmotions.jeong;

  return (
    <div style={{
      marginBottom: '20px',
      padding: '16px',
      background: 'rgba(193, 122, 74, 0.05)',
      borderRadius: '14px'
    }}>
      <h5 style={{
        color: '#C17A4A',
        marginBottom: '12px',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        정의 특징 <span style={{ color: '#888', fontWeight: '400' }}>Characteristics of Jeong</span>
      </h5>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {jeongData.characteristics.map((char, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255,255,255,0.8)',
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '13px'
            }}
          >
            <span style={{ fontWeight: '500', color: '#333' }}>{char.trait_ko}</span>
            <span style={{ color: '#888', marginLeft: '6px', fontSize: '12px' }}>
              {char.description_ko}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 메인 KoreanEmotions 컴포넌트
const KoreanEmotions = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('han');
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [activeTab, setActiveTab] = useState('spectrum');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Check for mobile screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const emotionData = koreanEmotions[selectedEmotion];
  const isHan = selectedEmotion === 'han';

  const tabs = [
    { id: 'spectrum', label_ko: '스펙트럼', label_en: 'Spectrum' },
    { id: 'impediments', label_ko: '장애물', label_en: 'Impediments' },
    { id: 'antidotes', label_ko: '해독제', label_en: 'Antidotes' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F7 100%)',
        padding: isMobile ? '90px 16px 60px 16px' : '100px 40px 60px 40px'
      }}
    >
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '32px' }}
        >
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: '700',
            margin: '0 0 8px 0',
            background: 'linear-gradient(135deg, #4A3B6B 0%, #C17A4A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            한국인의 감정
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            margin: '0'
          }}>
            Korean Emotions: Han & Jeong
          </p>
        </motion.div>

        {/* 비교 인포박스 */}
        <ComparisonInfoBox />

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
          gap: isMobile ? '24px' : '40px',
          alignItems: 'start'
        }}>
          {/* 왼쪽: 대륙 선택 영역 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* 두 감정 대륙 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginBottom: '24px'
            }}>
              {/* 한(恨) 대륙 */}
              <motion.div
                style={{
                  background: selectedEmotion === 'han'
                    ? 'linear-gradient(135deg, rgba(74, 59, 107, 0.12) 0%, rgba(42, 27, 75, 0.18) 100%)'
                    : 'rgba(74, 59, 107, 0.04)',
                  borderRadius: '20px',
                  padding: '24px',
                  cursor: 'pointer',
                  border: selectedEmotion === 'han'
                    ? '2px solid rgba(74, 59, 107, 0.4)'
                    : '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setSelectedEmotion('han');
                  setSelectedLevel(null);
                }}
                onMouseEnter={() => setHoveredEmotion('han')}
                onMouseLeave={() => setHoveredEmotion(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <HanShape
                    size={120}
                    isActive={selectedEmotion === 'han'}
                    isHovered={hoveredEmotion === 'han'}
                  />
                  <div>
                    <h3 style={{
                      margin: '0 0 4px 0',
                      fontSize: '22px',
                      fontWeight: '700',
                      color: '#4A3B6B'
                    }}>
                      한(恨)
                    </h3>
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '14px',
                      color: '#888'
                    }}>
                      Han - Deep accumulated sorrow
                    </p>
                    <p style={{
                      margin: '0',
                      fontSize: '13px',
                      color: '#666',
                      lineHeight: '1.5'
                    }}>
                      {koreanEmotions.han.definition_ko}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 정(情) 대륙 */}
              <motion.div
                style={{
                  background: selectedEmotion === 'jeong'
                    ? 'linear-gradient(135deg, rgba(193, 122, 74, 0.12) 0%, rgba(139, 90, 58, 0.18) 100%)'
                    : 'rgba(193, 122, 74, 0.04)',
                  borderRadius: '20px',
                  padding: '24px',
                  cursor: 'pointer',
                  border: selectedEmotion === 'jeong'
                    ? '2px solid rgba(193, 122, 74, 0.4)'
                    : '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setSelectedEmotion('jeong');
                  setSelectedLevel(null);
                }}
                onMouseEnter={() => setHoveredEmotion('jeong')}
                onMouseLeave={() => setHoveredEmotion(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <JeongShape
                    size={120}
                    isActive={selectedEmotion === 'jeong'}
                    isHovered={hoveredEmotion === 'jeong'}
                  />
                  <div>
                    <h3 style={{
                      margin: '0 0 4px 0',
                      fontSize: '22px',
                      fontWeight: '700',
                      color: '#C17A4A'
                    }}>
                      정(情)
                    </h3>
                    <p style={{
                      margin: '0 0 8px 0',
                      fontSize: '14px',
                      color: '#888'
                    }}>
                      Jeong - Affectionate bond
                    </p>
                    <p style={{
                      margin: '0',
                      fontSize: '13px',
                      color: '#666',
                      lineHeight: '1.5'
                    }}>
                      {koreanEmotions.jeong.definition_ko}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 선택된 감정 상세 설명 */}
            <motion.div
              key={selectedEmotion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(0,0,0,0.06)'
              }}
            >
              <p style={{
                margin: '0',
                fontSize: '14px',
                color: '#555',
                lineHeight: '1.7'
              }}>
                {emotionData.description_ko}
              </p>
              <p style={{
                margin: '12px 0 0 0',
                fontSize: '13px',
                color: '#888',
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                {emotionData.description_en}
              </p>
            </motion.div>
          </motion.div>

          {/* 오른쪽: 상세 콘텐츠 영역 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            {/* 정의 경우 특징 표시 */}
            {selectedEmotion === 'jeong' && <JeongCharacteristics />}

            {/* 탭 네비게이션 */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(0,0,0,0.08)',
              paddingBottom: '16px'
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '10px',
                    border: 'none',
                    background: activeTab === tab.id
                      ? `rgba(${isHan ? '74, 59, 107' : '193, 122, 74'}, 0.15)`
                      : 'transparent',
                    color: activeTab === tab.id
                      ? (isHan ? '#4A3B6B' : '#C17A4A')
                      : '#888',
                    fontWeight: activeTab === tab.id ? '600' : '400',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '14px'
                  }}
                >
                  {tab.label_ko}
                  <span style={{
                    marginLeft: '6px',
                    fontSize: '12px',
                    opacity: 0.7
                  }}>
                    {tab.label_en}
                  </span>
                </button>
              ))}
            </div>

            {/* 탭 콘텐츠 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedEmotion}-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'spectrum' && (
                  <SpectrumView
                    emotion={selectedEmotion}
                    selectedLevel={selectedLevel}
                    onSelectLevel={setSelectedLevel}
                  />
                )}
                {activeTab === 'impediments' && (
                  <ImpedimentsView emotion={selectedEmotion} />
                )}
                {activeTab === 'antidotes' && (
                  <AntidotesView emotion={selectedEmotion} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default KoreanEmotions;
