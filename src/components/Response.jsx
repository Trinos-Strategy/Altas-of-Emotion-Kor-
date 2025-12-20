import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';

// 강도별 크기 (확대됨)
const INTENSITY_SIZES = {
  high: { size: 70, label: '높은 강도' },
  medium: { size: 55, label: '중간 강도' },
  low: { size: 40, label: '낮은 강도' }
};

// 행동 강도 매핑
const ACTION_INTENSITIES = {
  // 분노
  'ATTACK': 'high', 'YELL': 'high', 'ARGUE': 'medium', 'SCOWL': 'low',
  'WITHDRAW': 'low', 'SUPPRESS': 'medium', 'COOL DOWN': 'medium', 'ASSERTIVE': 'medium',
  // 두려움
  'FREEZE': 'high', 'FLEE': 'high', 'FIGHT': 'high', 'SCREAM': 'medium',
  'WORRY': 'low', 'HIDE': 'medium', 'BREATHE': 'low', 'SEEK SAFETY': 'medium',
  // 혐오
  'RECOIL': 'medium', 'AVOID': 'medium', 'VOMIT': 'high', 'GRIMACE': 'low',
  'REJECT': 'medium', 'DEHUMANIZE': 'high', 'ACCEPT': 'low', 'UNDERSTAND': 'low',
  // 슬픔
  'CRY': 'high', 'WITHDRAW FROM OTHERS': 'medium', 'RUMINATE': 'medium', 'SEEK COMFORT': 'low',
  'MOURN': 'high', 'ISOLATE': 'medium', 'EXPRESS': 'medium', 'CONNECT': 'low',
  // 즐거움
  'SMILE': 'medium', 'LAUGH': 'high', 'SAVOR': 'medium', 'GLOW': 'low',
  'SHARE': 'medium', 'EXCLAIM': 'high', 'EMBRACE': 'medium', 'CELEBRATE': 'high'
};

const getIntensity = (actionName) => ACTION_INTENSITIES[actionName?.toUpperCase()] || 'medium';

const Response = ({ selectedEmotion }) => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [showActionTypes, setShowActionTypes] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const currentEmotion = selectedEmotion ? emotions[selectedEmotion] : emotions.enjoyment;
  const intrinsicActions = currentEmotion.actions.filter(a => a.type === 'intrinsic');
  const intentionalActions = currentEmotion.actions.filter(a => a.type === 'intentional');

  return (
    <section
      ref={sectionRef}
      style={{ minHeight: '100vh', padding: '80px 32px 120px', backgroundColor: '#fafafa' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 */}
        <motion.header
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            color: '#1a1a1a',
            marginBottom: '20px'
          }}>
            감정 반응
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#666',
            lineHeight: '1.7',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            감정은 행동으로 이어집니다.
            <span style={{ color: currentEmotion.color, fontWeight: '700' }}> {currentEmotion.name_ko}</span>를 느낄 때
            우리는 본능적 또는 의도적으로 반응합니다.
          </p>
        </motion.header>

        {/* 강도 범례 - 확대됨 */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '48px',
            marginBottom: '48px',
            padding: '24px 40px',
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {Object.entries(INTENSITY_SIZES).map(([key, { size, label }]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${currentEmotion.colorLight}, ${currentEmotion.color})`,
                boxShadow: `0 6px 20px ${currentEmotion.color}40`
              }} />
              <span style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#333'
              }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* 중앙 감정 원 - 3배 확대 */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '64px'
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div style={{
            position: 'relative',
            width: '450px',
            height: '450px'
          }}>
            {/* 외부 글로우 */}
            <div style={{
              position: 'absolute',
              inset: '-40px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${currentEmotion.color}30 0%, transparent 70%)`,
              filter: 'blur(30px)'
            }} />

            {/* 동심원 레이어들 */}
            {[1, 0.85, 0.70, 0.55, 0.40, 0.25].map((scale, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  top: `${(1 - scale) * 50}%`,
                  left: `${(1 - scale) * 50}%`,
                  width: `${scale * 100}%`,
                  height: `${scale * 100}%`,
                  borderRadius: '50%',
                  backgroundColor: currentEmotion.color,
                  opacity: 0.1 + (i * 0.15)
                }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              />
            ))}

            {/* 중앙 텍스트 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 10
            }}>
              <div style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#fff',
                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                marginBottom: '8px'
              }}>
                {currentEmotion.name_ko}
              </div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '3px',
                textShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}>
                {currentEmotion.name_en?.toUpperCase() || currentEmotion.id?.toUpperCase()}
              </div>
            </div>

            {/* 펄스 애니메이션 */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `3px solid ${currentEmotion.color}`,
                opacity: 0.3
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeOut'
              }}
            />
          </div>
        </motion.div>

        {/* 행동 유형 카드들 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowActionTypes(!showActionTypes)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 32px',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#333' }}>
              본능적 행동 vs 의도적 행동
            </span>
            <motion.span
              animate={{ rotate: showActionTypes ? 180 : 0 }}
              style={{ fontSize: '24px', color: '#666' }}
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {showActionTypes && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '32px',
                  marginTop: '16px'
                }}>
                  {/* 본능적 행동 카드 */}
                  <motion.div
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '20px',
                      padding: '32px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      borderTop: `5px solid ${currentEmotion.color}`
                    }}
                    whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(0,0,0,0.15)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: '#F8EDED',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px'
                      }}>
                        ⚡
                      </div>
                      <div>
                        <h4 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                          본능적 행동
                        </h4>
                        <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>
                          Intrinsic Actions
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '24px' }}>
                      자동적으로 발생하는 반응으로, 의식적 통제 없이 나타납니다.
                      진화적으로 프로그래밍된 행동입니다.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {intrinsicActions.map((action, i) => {
                        const intensity = getIntensity(action.name_en);
                        const size = INTENSITY_SIZES[intensity].size;
                        return (
                          <motion.button
                            key={action.name_en}
                            onClick={() => setSelectedAction(action)}
                            style={{
                              padding: '14px 24px',
                              backgroundColor: `${currentEmotion.color}15`,
                              border: `2px solid ${currentEmotion.color}40`,
                              borderRadius: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}
                            whileHover={{ scale: 1.05, backgroundColor: `${currentEmotion.color}25` }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span style={{
                              width: `${size / 3}px`,
                              height: `${size / 3}px`,
                              borderRadius: '50%',
                              backgroundColor: currentEmotion.color
                            }} />
                            <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                              {action.name_ko}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* 의도적 행동 카드 */}
                  <motion.div
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '20px',
                      padding: '32px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      borderTop: `5px solid ${currentEmotion.colorLight}`
                    }}
                    whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(0,0,0,0.15)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        backgroundColor: '#EDF5F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px'
                      }}>
                        🧠
                      </div>
                      <div>
                        <h4 style={{ fontSize: '24px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
                          의도적 행동
                        </h4>
                        <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>
                          Intentional Actions
                        </p>
                      </div>
                    </div>
                    <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.7', marginBottom: '24px' }}>
                      의식적으로 선택하는 반응으로, 감정을 건설적으로 다루는 방법입니다.
                      학습과 연습을 통해 발달시킬 수 있습니다.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {intentionalActions.map((action, i) => {
                        const intensity = getIntensity(action.name_en);
                        const size = INTENSITY_SIZES[intensity].size;
                        return (
                          <motion.button
                            key={action.name_en}
                            onClick={() => setSelectedAction(action)}
                            style={{
                              padding: '14px 24px',
                              backgroundColor: `${currentEmotion.colorLight}20`,
                              border: `2px solid ${currentEmotion.colorLight}50`,
                              borderRadius: '12px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px'
                            }}
                            whileHover={{ scale: 1.05, backgroundColor: `${currentEmotion.colorLight}35` }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span style={{
                              width: `${size / 3}px`,
                              height: `${size / 3}px`,
                              borderRadius: '50%',
                              backgroundColor: currentEmotion.colorLight
                            }} />
                            <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                              {action.name_ko}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 행동 상세 모달 */}
        <AnimatePresence>
          {selectedAction && (
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
                onClick={() => setSelectedAction(null)}
              />
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
                  padding: '40px',
                  maxWidth: '480px',
                  width: '90%',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.25)',
                  borderLeft: `6px solid ${selectedAction.type === 'intrinsic' ? currentEmotion.color : currentEmotion.colorLight}`,
                  zIndex: 1000
                }}
              >
                <button
                  onClick={() => setSelectedAction(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                    fontSize: '20px',
                    color: '#666'
                  }}
                >
                  ✕
                </button>

                <div style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  backgroundColor: selectedAction.type === 'intrinsic' ? '#FFE8E8' : '#EDF8F0',
                  color: selectedAction.type === 'intrinsic' ? '#E63946' : '#4A7C59',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom: '20px'
                }}>
                  {selectedAction.type === 'intrinsic' ? '⚡ 본능적' : '🧠 의도적'}
                </div>

                <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#1a1a1a', marginBottom: '8px' }}>
                  {selectedAction.name_ko}
                </h3>
                <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px', letterSpacing: '1px' }}>
                  {selectedAction.name_en}
                </p>

                <p style={{ fontSize: '18px', color: '#444', lineHeight: '1.8' }}>
                  {selectedAction.description_ko}
                </p>

                {selectedAction.type === 'intentional' && (
                  <div style={{
                    marginTop: '24px',
                    padding: '20px',
                    backgroundColor: '#EDF5F0',
                    borderRadius: '16px',
                    border: '1px solid #A3D4B5'
                  }}>
                    <p style={{ fontSize: '15px', color: '#5A9070', margin: 0, display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ fontSize: '20px' }}>💡</span>
                      <span>의도적 행동은 연습을 통해 더 자연스럽게 할 수 있습니다. 처음에는 의식적 노력이 필요하지만, 점차 자동적으로 됩니다.</span>
                    </p>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Response;
