import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { emotions, emotionOrder, emotionTriggersResponses, emotionalEpisodeSteps } from '../data/emotions';

// ============================================
// 파티클 시스템 컴포넌트
// ============================================
const ParticleSystem = ({ emotionColor, emotionId }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const getParticleStyle = useCallback((id) => {
    switch (id) {
      case 'anger': return { speed: 3, size: 4, shape: 'triangle', turbulence: 0.8 };
      case 'fear': return { speed: 5, size: 3, shape: 'circle', turbulence: 1.2 };
      case 'disgust': return { speed: 2, size: 5, shape: 'hexagon', turbulence: 0.5 };
      case 'sadness': return { speed: 1.5, size: 4, shape: 'drop', turbulence: 0.3 };
      case 'enjoyment': return { speed: 2.5, size: 5, shape: 'star', turbulence: 0.6 };
      default: return { speed: 2, size: 4, shape: 'circle', turbulence: 0.5 };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const style = getParticleStyle(emotionId);

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 파티클 초기화
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * style.speed,
      vy: (Math.random() - 0.5) * style.speed,
      size: Math.random() * style.size + 2,
      opacity: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2
    }));

    const drawParticle = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = emotionColor;

      switch (style.shape) {
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size, p.size);
          ctx.lineTo(-p.size, p.size);
          ctx.closePath();
          ctx.fill();
          break;
        case 'star':
          const spikes = 5;
          const outerRadius = p.size;
          const innerRadius = p.size / 2;
          ctx.beginPath();
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / spikes;
            ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
          }
          ctx.closePath();
          ctx.fill();
          break;
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            ctx.lineTo(Math.cos(angle) * p.size, Math.sin(angle) * p.size);
          }
          ctx.closePath();
          ctx.fill();
          break;
        case 'drop':
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI, true);
          ctx.quadraticCurveTo(0, p.size * 2, 0, p.size * 2.5);
          ctx.quadraticCurveTo(0, p.size * 2, 0, 0);
          ctx.fill();
          break;
        default:
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(p => {
        p.x += p.vx + Math.sin(Date.now() * 0.001 + p.y * 0.01) * style.turbulence;
        p.y += p.vy + Math.cos(Date.now() * 0.001 + p.x * 0.01) * style.turbulence;
        p.angle += 0.02;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        drawParticle(p);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [emotionColor, emotionId, getParticleStyle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

// ============================================
// 감정 도형 컴포넌트 (심리학 기반)
// ============================================
const EmotionShape = ({ emotionId, size = 120, color, isActive, onClick }) => {
  const shapes = {
    anger: (
      <motion.svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.polygon
          points="50,5 95,90 5,90"
          fill={color}
          initial={{ scale: 0.8, rotate: 0 }}
          animate={isActive ? { scale: 1.1, rotate: [0, 5, -5, 0] } : { scale: 1 }}
          transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1 }}
        />
      </motion.svg>
    ),
    fear: (
      <motion.svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.polygon
          points="50,95 95,10 5,10"
          fill={color}
          initial={{ scale: 0.8 }}
          animate={isActive ? { scale: [1, 1.05, 0.95, 1], y: [0, -5, 5, 0] } : { scale: 1 }}
          transition={{ duration: 0.3, repeat: isActive ? Infinity : 0 }}
        />
      </motion.svg>
    ),
    disgust: (
      <motion.svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.polygon
          points="50,5 93,25 93,75 50,95 7,75 7,25"
          fill={color}
          initial={{ scale: 0.8 }}
          animate={isActive ? { scale: 1.05, rotate: [0, 10, -10, 0] } : { scale: 1 }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        />
      </motion.svg>
    ),
    sadness: (
      <motion.svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d="M50 95 C50 95 15 60 15 40 C15 20 30 5 50 5 C70 5 85 20 85 40 C85 60 50 95 50 95Z"
          fill={color}
          initial={{ scale: 0.8 }}
          animate={isActive ? { scale: 1, y: [0, 5, 0] } : { scale: 1 }}
          transition={{ duration: 3, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
        />
      </motion.svg>
    ),
    enjoyment: (
      <motion.svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path
          d="M50 5 L58 38 L95 38 L65 58 L75 95 L50 72 L25 95 L35 58 L5 38 L42 38 Z"
          fill={color}
          initial={{ scale: 0.8 }}
          animate={isActive ? { scale: 1.1, rotate: 360 } : { scale: 1 }}
          transition={{ duration: 20, repeat: isActive ? Infinity : 0, ease: "linear" }}
        />
      </motion.svg>
    )
  };

  return (
    <motion.div
      className="cursor-pointer relative"
      style={{ width: size, height: size }}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {shapes[emotionId]}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

// ============================================
// Glassmorphism 카드 컴포넌트
// ============================================
const GlassCard = ({ children, className = '', delay = 0, emotionColor }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`relative backdrop-blur-xl bg-white/70 rounded-3xl border border-white/50 shadow-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -8,
        boxShadow: `0 25px 50px -12px ${emotionColor}30`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

// ============================================
// HOW DOES THIS HAPPEN 모달 컴포넌트
// ============================================
const HowDoesThisHappenModal = ({ isOpen, onClose, emotion }) => {
  const timelineStepsData = [
    {
      id: 1,
      name_ko: "사전 조건",
      name_en: "PRE-CONDITION",
      description_ko: "감정에 영향을 미치는 상황이나 맥락입니다. 과거 경험, 현재 기분, 성격 특성, 신체 상태 등이 포함됩니다. 이러한 요소들이 다음에 오는 자극에 대한 우리의 반응 방식을 형성합니다.",
      color: "#f5f5f5",
      textColor: "#525252",
      icon: "🎯"
    },
    {
      id: 2,
      name_ko: "이벤트",
      name_en: "EVENT",
      description_ko: "외부 또는 내부에서 마주치는 사람, 장소, 상황, 이미지, 생각 등입니다. 세상에서 무언가가 일어나거나 우리 마음속에서 생각이 떠오릅니다.",
      color: "#FFE5D4",
      textColor: "#171717",
      icon: "⚡"
    },
    {
      id: 3,
      name_ko: "트리거",
      name_en: "TRIGGER",
      description_ko: "자동 평가 시스템이 데이터베이스의 감정 스크립트와 일치하는 조합을 찾을 때 발생합니다. 이 평가는 밀리초 단위로 무의식적으로 일어납니다.",
      color: "emotion",
      textColor: "#fff",
      icon: "🔥"
    },
    {
      id: 4,
      name_ko: "지각 데이터베이스",
      name_en: "PERCEPTION DATABASE",
      description_ko: "보편적 감정 기억(진화를 통해 물려받은 것)과 개인적 경험(학습된 것)이 저장된 곳입니다. 이 데이터베이스는 의식적으로 접근할 수 없습니다.",
      color: "#E8E8E8",
      textColor: "#171717",
      icon: "🧠"
    },
    {
      id: 5,
      name_ko: "신체적 변화",
      name_en: "PHYSICAL CHANGES",
      description_ko: "얼굴의 열감, 턱이나 어깨의 긴장, 심박수 증가, 호흡 변화 등 자율신경계의 반응입니다. 이러한 변화는 자동으로 일어나며 의식적으로 통제하기 어렵습니다.",
      color: "emotion",
      textColor: "#fff",
      icon: "💓"
    },
    {
      id: 6,
      name_ko: "상태",
      name_en: "STATE",
      description_ko: "신체적, 심리적 변화를 포함한 감정 자체입니다. 이 상태는 몇 초에서 몇 분까지 지속될 수 있으며, 강도에 따라 다양한 형태로 경험됩니다.",
      color: "emotion",
      textColor: "#fff",
      icon: "🌀"
    },
    {
      id: 7,
      name_ko: "심리적 변화",
      name_en: "PSYCHOLOGICAL CHANGES",
      description_ko: "감정의 질적 경험입니다. 특정 감정에 대한 주관적 느낌, 생각의 변화, 주의 집중의 변화 등이 포함됩니다.",
      color: "emotion",
      textColor: "#fff",
      icon: "🎭"
    },
    {
      id: 8,
      name_ko: "행동",
      name_en: "ACTION",
      description_ko: "감정적 반응으로, 건설적(도움이 되는) 또는 파괴적(해로운) 형태로 나타날 수 있습니다. 본능적 반응과 의도적 반응으로 구분됩니다.",
      color: "emotion",
      textColor: "#fff",
      icon: "⚔️"
    },
    {
      id: 9,
      name_ko: "사후 조건",
      name_en: "POST-CONDITION",
      description_ko: "감정 행동의 결과와 영향입니다. 이는 다음 감정 에피소드의 사전 조건이 될 수 있으며, 관계와 상황에 지속적인 영향을 미칩니다.",
      color: "#f5f5f5",
      textColor: "#525252",
      icon: "🔄"
    },
    {
      id: 10,
      name_ko: "선택적 필터 기간",
      name_en: "SELECTIVE FILTER PERIOD",
      description_ko: "행동 시작과 함께 개시되는 선택적 필터링 기간입니다. 이 기간 동안 우리는 현재 감정과 일치하는 정보만 받아들이고, 다른 정보는 걸러냅니다.",
      color: "#FFD700",
      textColor: "#171717",
      icon: "🔍"
    }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Header */}
          <div
            className="sticky top-0 z-10 px-8 py-6 border-b backdrop-blur-xl"
            style={{ background: `linear-gradient(135deg, ${emotion.color}15, white)` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  어떻게 이런 일이 일어나는가?
                </h2>
                <p className="text-gray-500 mt-1">(How Does This Happen?)</p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Intro */}
            <div className="mb-12 text-center">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                감정 에피소드는 일련의 단계를 거쳐 진행됩니다. 각 단계를 이해하면 감정이 어떻게 발생하고
                전개되는지 알 수 있으며, 이를 통해 감정에 대한 더 큰 통제력을 얻을 수 있습니다.
              </p>
            </div>

            {/* Timeline Diagram */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                감정 에피소드 타임라인 다이어그램 (Emotional Episode Timeline Diagram)
              </h3>

              {/* Visual Timeline */}
              <div className="relative py-8">
                {/* Connection Line */}
                <div
                  className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
                  style={{ background: `linear-gradient(90deg, #f5f5f5, ${emotion.color}, #f5f5f5)` }}
                />

                {/* Steps */}
                <div className="relative flex justify-between items-center overflow-x-auto pb-4 gap-4 px-4">
                  {timelineStepsData.slice(0, 5).map((step, index) => (
                    <motion.div
                      key={step.id}
                      className="flex flex-col items-center min-w-[120px]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-3 shadow-lg border-4 border-white"
                        style={{
                          backgroundColor: step.color === 'emotion' ? emotion.color : step.color,
                          color: step.textColor
                        }}
                      >
                        {step.icon}
                      </div>
                      <span className="text-xs font-bold text-gray-700 text-center">{step.name_en}</span>
                      <span className="text-xs text-gray-500 text-center">{step.name_ko}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Steps Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {timelineStepsData.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${step.color === 'emotion' ? emotion.color + '10' : step.color + '30'}, white)`
                  }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{
                        backgroundColor: step.color === 'emotion' ? emotion.color : step.color,
                        color: step.textColor
                      }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {step.name_ko} <span className="text-gray-400 font-normal">({step.name_en})</span>
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description_ko}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Insight */}
            <motion.div
              className="mt-12 p-8 rounded-3xl text-center"
              style={{ background: `linear-gradient(135deg, ${emotion.color}20, ${emotion.colorLight}20)` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-xl font-bold mb-4" style={{ color: emotion.color }}>
                핵심 통찰 (Key Insight)
              </h4>
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                감정은 우리가 선택하는 것이 아닙니다. 트리거는 자동으로 발생하며, 우리는 그 순간 감정을 경험합니다.
                하지만 <strong>반응</strong>은 선택할 수 있습니다. 자동적인 본능 반응과 의도적인 행동 사이에서
                선택할 수 있는 공간이 있으며, 이 공간을 인식하는 것이 감정 지능의 핵심입니다.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================
// Signal & Message 모달 컴포넌트
// ============================================
const SignalMessageModal = ({ isOpen, onClose, emotion, emotionData }) => {
  if (!isOpen || !emotionData) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
        >
          {/* Header */}
          <div
            className="px-8 py-6"
            style={{ background: `linear-gradient(135deg, ${emotion.color}, ${emotion.colorDark})` }}
          >
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h2 className="text-2xl font-serif font-bold">
                  신호와 메시지 (Signal & Message)
                </h2>
                <p className="opacity-80 mt-1">{emotion.name_ko} ({emotion.name_en})</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Signal Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: emotion.colorLight }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={emotion.colorDark} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  신호 (Signal)
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed pl-13">
                {emotionData.signal.text_ko}
              </p>
              <p className="text-gray-400 text-sm mt-2 pl-13">
                ({emotionData.signal.text_en})
              </p>
            </div>

            {/* Message Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: emotion.colorLight }}
                >
                  <svg className="w-5 h-5" fill="none" stroke={emotion.colorDark} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  메시지 (Message)
                </h3>
              </div>
              <div
                className="p-6 rounded-2xl text-center"
                style={{ backgroundColor: emotion.colorLight + '30' }}
              >
                <p className="text-2xl font-serif font-bold" style={{ color: emotion.color }}>
                  "{emotionData.message.text_ko}"
                </p>
                <p className="text-gray-500 mt-2">
                  "{emotionData.message.text_en}"
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">
                <strong>신호(Signal)</strong>는 얼굴 표정, 목소리, 몸짓 등을 통해 보편적으로 표현되는 방식입니다.
                <strong> 메시지(Message)</strong>는 그 감정이 다른 사람에게 전달하려는 핵심 의미입니다.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================
// Triggers & Responses 상세 모달
// ============================================
const TriggersResponsesModal = ({ isOpen, onClose, emotion, emotionData }) => {
  if (!isOpen || !emotionData) return null;

  const getActionColor = (type) => {
    switch (type) {
      case 'constructive': return '#22c55e';
      case 'destructive': return '#ef4444';
      case 'ambiguous': return '#eab308';
      default: return '#9ca3af';
    }
  };

  const getActionLabel = (type) => {
    switch (type) {
      case 'constructive': return '건설적';
      case 'destructive': return '파괴적';
      case 'ambiguous': return '상황에 따라 다름';
      default: return '';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
        >
          {/* Header */}
          <div
            className="sticky top-0 z-10 px-8 py-6"
            style={{ background: `linear-gradient(135deg, ${emotion.color}, ${emotion.colorDark})` }}
          >
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h2 className="text-2xl font-serif font-bold">
                  트리거와 반응 상세 (Triggers & Responses)
                </h2>
                <p className="opacity-80 mt-1">{emotion.name_ko} ({emotion.name_en})</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Triggers */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: emotion.color }}
                  >
                    ⚡
                  </span>
                  트리거 (Triggers)
                </h3>
                <div className="space-y-3">
                  {emotionData.triggers.map((trigger, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <p className="text-gray-700">{trigger.text_ko}</p>
                      <p className="text-gray-400 text-sm mt-1">({trigger.text_en})</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Responses */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: emotion.color }}
                  >
                    ⚔️
                  </span>
                  반응 (Responses)
                </h3>

                {/* Intrinsic Actions */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                    본능적 반응 (Intrinsic Actions)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {emotionData.intrinsicActions.map((action, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-2 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: getActionColor(action.type) }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        title={getActionLabel(action.type)}
                      >
                        {action.text_ko}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Intentional Actions */}
                <div>
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                    의도적 반응 (Intentional Actions)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {emotionData.intentionalActions.map((action, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-2 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: getActionColor(action.type) }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                        title={getActionLabel(action.type)}
                      >
                        {action.text_ko}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-bold text-gray-700 mb-3">색상 범례 (Color Legend):</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-green-500"></span>
                  <span className="text-sm text-gray-600">건설적 (Constructive)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-500"></span>
                  <span className="text-sm text-gray-600">파괴적 (Destructive)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
                  <span className="text-sm text-gray-600">상황에 따라 다름 (Ambiguous)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================
// Moods & Psychopathology 모달
// ============================================
const MoodsPsychopathologyModal = ({ isOpen, onClose, emotion }) => {
  if (!isOpen) return null;

  const moodsData = {
    anger: { mood_ko: "짜증나는", mood_en: "Irritable", description: "분노의 기분 상태는 짜증, 과민성으로 나타나며 작은 자극에도 쉽게 화가 납니다." },
    fear: { mood_ko: "불안한", mood_en: "Apprehensive", description: "두려움의 기분 상태는 불안, 걱정으로 나타나며 미래에 대한 염려가 지속됩니다." },
    disgust: { mood_ko: "까다로운", mood_en: "Sour", description: "혐오의 기분 상태는 비판적, 냉소적으로 나타나며 주변에 대한 불만이 있습니다." },
    sadness: { mood_ko: "우울한", mood_en: "Dysphoric", description: "슬픔의 기분 상태는 우울, 무기력으로 나타나며 에너지와 관심이 저하됩니다." },
    enjoyment: { mood_ko: "들뜬", mood_en: "Elated", description: "즐거움의 기분 상태는 고양, 기쁨으로 나타나며 긍정적 에너지가 넘칩니다." }
  };

  const personalityData = {
    anger: { trait_ko: "적대적인", trait_en: "Hostile", description: "분노를 자주 경험하는 성격 특성으로, 타인에 대한 불신과 공격성이 특징입니다." },
    fear: { trait_ko: "소심한", trait_en: "Timid", description: "두려움을 자주 경험하는 성격 특성으로, 새로운 상황을 피하고 안전을 추구합니다." },
    disgust: { trait_ko: "예민한", trait_en: "Squeamish", description: "혐오를 자주 경험하는 성격 특성으로, 불결함이나 부도덕에 민감합니다." },
    sadness: { trait_ko: "비관적인", trait_en: "Pessimistic", description: "슬픔을 자주 경험하는 성격 특성으로, 미래에 대해 부정적 전망을 가집니다." },
    enjoyment: { trait_ko: "낙관적인", trait_en: "Optimistic", description: "즐거움을 자주 경험하는 성격 특성으로, 긍정적이고 희망적입니다." }
  };

  const psychopathologyData = {
    anger: [
      { name_ko: "간헐적 폭발 장애", name_en: "Intermittent Explosive Disorder", description: "갑작스럽고 반복적인 공격적 폭발이 특징입니다." },
      { name_ko: "만성 적대감", name_en: "Chronic Hostility", description: "지속적인 분노와 적대적 태도가 특징입니다." }
    ],
    fear: [
      { name_ko: "사회불안장애", name_en: "Social Anxiety Disorder", description: "사회적 상황에서 극심한 두려움과 불안을 경험합니다." },
      { name_ko: "외상 후 스트레스 장애", name_en: "PTSD", description: "외상 경험 후 지속적인 두려움과 회피 행동이 나타납니다." },
      { name_ko: "공황장애", name_en: "Panic Disorder", description: "갑작스러운 극심한 공포 발작이 특징입니다." },
      { name_ko: "범불안장애", name_en: "Generalized Anxiety Disorder", description: "다양한 상황에 대한 지속적인 걱정이 특징입니다." }
    ],
    disgust: [
      { name_ko: "신경성 식욕부진증", name_en: "Anorexia Nervosa", description: "음식이나 자신의 몸에 대한 극심한 혐오가 특징입니다." },
      { name_ko: "강박장애 (오염)", name_en: "OCD (Contamination)", description: "오염에 대한 강박적 두려움과 청결 행동이 특징입니다." }
    ],
    sadness: [
      { name_ko: "주요우울장애", name_en: "Major Depressive Disorder", description: "지속적인 슬픔, 흥미 상실, 무가치감이 특징입니다." },
      { name_ko: "지속성우울장애", name_en: "Persistent Depressive Disorder", description: "2년 이상 지속되는 만성적 우울이 특징입니다." },
      { name_ko: "복잡성 애도", name_en: "Complicated Grief", description: "상실 후 극심하고 지속적인 슬픔이 특징입니다." }
    ],
    enjoyment: [
      { name_ko: "조증/조증 삽화", name_en: "Mania/Manic Episode", description: "과도한 고양감, 에너지, 충동적 행동이 특징입니다." },
      { name_ko: "쾌락 추구 중독", name_en: "Hedonic Addiction", description: "즐거움을 위한 강박적 추구가 특징입니다." }
    ]
  };

  const currentMood = moodsData[emotion.id];
  const currentPersonality = personalityData[emotion.id];
  const currentPsychopathology = psychopathologyData[emotion.id];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
        >
          {/* Header */}
          <div
            className="sticky top-0 z-10 px-8 py-6"
            style={{ background: `linear-gradient(135deg, ${emotion.color}, ${emotion.colorDark})` }}
          >
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h2 className="text-2xl font-serif font-bold">
                  기분, 성격, 정신병리 (Moods, Personality & Psychopathology)
                </h2>
                <p className="opacity-80 mt-1">{emotion.name_ko} ({emotion.name_en})</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Mood */}
            <div className="p-6 rounded-2xl" style={{ backgroundColor: emotion.colorLight + '30' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🌡️</span>
                기분 (Mood): {currentMood.mood_ko} ({currentMood.mood_en})
              </h3>
              <p className="text-gray-600">{currentMood.description}</p>
            </div>

            {/* Personality Trait */}
            <div className="p-6 rounded-2xl bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎭</span>
                성격 특성 (Personality Trait): {currentPersonality.trait_ko} ({currentPersonality.trait_en})
              </h3>
              <p className="text-gray-600">{currentPersonality.description}</p>
            </div>

            {/* Psychopathology */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🩺</span>
                정신병리학 (Psychopathology)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {currentPsychopathology.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-bold text-gray-900">{item.name_ko}</h4>
                    <p className="text-sm text-gray-500 mb-2">({item.name_en})</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>참고:</strong> 이 정보는 교육 목적으로 제공됩니다. 정신 건강 문제가 있다고 생각되면
                전문가와 상담하시기 바랍니다.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ============================================
// 메인 Timeline 컴포넌트
// ============================================
const Timeline = ({ selectedEmotion }) => {
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(null);
  const [showHowModal, setShowHowModal] = useState(false);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [showTriggersModal, setShowTriggersModal] = useState(false);
  const [showMoodsModal, setShowMoodsModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-rotate through emotions
  useEffect(() => {
    if (selectedEmotion || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentEmotionIndex((prev) => (prev + 1) % emotionOrder.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedEmotion, isPlaying]);

  const activeEmotionId = selectedEmotion || emotionOrder[currentEmotionIndex];
  const emotion = emotions[activeEmotionId];
  const emotionData = emotionTriggersResponses[activeEmotionId];

  const timelineSteps = useMemo(() => [
    {
      id: 1,
      name_ko: '사전 조건',
      name_en: 'PRE-CONDITION',
      color: '#f5f5f5',
      textColor: '#525252',
      description_ko: '감정에 영향을 미치는 상황이나 맥락 (과거 경험, 기분, 성격 등)',
      icon: '🎯'
    },
    {
      id: 2,
      name_ko: '이벤트',
      name_en: 'EVENT',
      color: '#FFE5D4',
      textColor: '#171717',
      description_ko: '외부/내부에서 마주치는 사람, 장소, 상황, 이미지 등',
      icon: '⚡'
    },
    {
      id: 3,
      name_ko: '트리거',
      name_en: 'TRIGGER',
      color: emotion.colorLight,
      textColor: '#171717',
      description_ko: '자동 평가가 감정 스크립트와 일치하면 발생',
      icon: '🔥'
    },
    {
      id: 4,
      name_ko: '경험',
      name_en: 'EXPERIENCE',
      color: emotion.color,
      textColor: '#fff',
      description_ko: '신체적/심리적 변화를 포함한 감정 상태',
      icon: '🌀'
    },
    {
      id: 5,
      name_ko: '반응',
      name_en: 'RESPONSE',
      color: emotion.colorLight,
      textColor: '#171717',
      description_ko: '건설적 또는 파괴적 행동 반응',
      icon: '⚔️'
    },
  ], [emotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen px-4 md:px-6 py-20 md:py-32 overflow-hidden"
      role="region"
      aria-label="감정 에피소드 타임라인"
    >
      {/* Background Particle System */}
      <ParticleSystem emotionColor={emotion.color} emotionId={activeEmotionId} />

      {/* Background Gradient Orbs */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: emotion.color }}
        />
        <div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: emotion.colorLight }}
        />
      </motion.div>

      <motion.div className="relative z-10 max-w-7xl mx-auto" style={{ opacity }}>
        {/* Premium Section Header */}
        <motion.header
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: emotion.colorLight + '40', color: emotion.colorDark }}
          >
            EMOTIONAL EPISODE TIMELINE
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            감정 에피소드 타임라인
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            감정적 경험은 일련의 단계를 거칩니다. 각 단계를 이해하면
            감정에 대한 더 큰 통제력을 얻을 수 있습니다.
          </p>

          {/* Learn More Button */}
          <motion.button
            className="mt-8 px-6 py-3 rounded-full font-medium text-white shadow-lg hover:shadow-xl transition-all"
            style={{ background: `linear-gradient(135deg, ${emotion.color}, ${emotion.colorDark})` }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowHowModal(true)}
          >
            어떻게 이런 일이 일어나는가? (Learn More) →
          </motion.button>
        </motion.header>

        {/* Interactive Timeline */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 rounded-full overflow-hidden bg-gray-100">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #f5f5f5, ${emotion.colorLight}, ${emotion.color}, ${emotion.colorLight}, #f5f5f5)`
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>

            {/* Steps */}
            <div className="relative flex justify-between items-center py-20">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-12 text-sm font-bold text-gray-400 uppercase tracking-widest">
                    Step {step.id}
                  </div>

                  {/* Glassmorphism Card */}
                  <motion.div
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setActiveStep(step.id)}
                    onMouseLeave={() => setActiveStep(null)}
                    whileHover={{ scale: 1.1, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity"
                      style={{ backgroundColor: step.color === emotion.colorLight || step.color === emotion.color ? emotion.color : step.color }}
                    />

                    {/* Card */}
                    <div
                      className="relative w-32 h-32 md:w-36 md:h-36 rounded-3xl flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm border border-white/50 shadow-xl"
                      style={{
                        backgroundColor: step.color,
                        color: step.textColor
                      }}
                    >
                      <span className="text-3xl mb-2">{step.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wide opacity-70">{step.name_en}</span>
                      <span className="text-sm font-bold mt-1">{step.name_ko}</span>
                    </div>
                  </motion.div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {activeStep === step.id && (
                      <motion.div
                        className="absolute top-full mt-6 w-64 bg-white rounded-2xl shadow-2xl p-5 z-20 border border-gray-100"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-l border-t border-gray-100 rotate-45" />
                        <p className="text-sm text-gray-600 leading-relaxed relative z-10">
                          {step.description_ko}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Timeline */}
          <div className="lg:hidden space-y-4">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Step Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                  style={{ backgroundColor: step.color }}
                >
                  <span className="text-2xl">{step.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">Step {step.id}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{step.name_en}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{step.name_ko}</h4>
                  <p className="text-sm text-gray-500">{step.description_ko}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated Emotion Sphere + Selector */}
        <motion.div
          className="flex flex-col items-center mb-16 md:mb-24"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Main Emotion Display */}
          <div className="relative mb-8">
            {/* Pulsing Background */}
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{ backgroundColor: emotion.color }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Emotion Shape */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEmotionId}
                className="relative"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <EmotionShape
                  emotionId={activeEmotionId}
                  size={180}
                  color={emotion.color}
                  isActive={true}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white/80 text-xs font-medium mb-1 drop-shadow">현재 감정</div>
                    <div className="text-white font-bold text-xl drop-shadow-lg">{emotion.name_ko}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Emotion Dots Selector */}
          {!selectedEmotion && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>

              <div className="flex gap-3" role="tablist" aria-label="감정 선택">
                {emotionOrder.map((id, index) => (
                  <motion.button
                    key={id}
                    onClick={() => {
                      setCurrentEmotionIndex(index);
                      setIsPlaying(false);
                    }}
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{
                      backgroundColor: index === currentEmotionIndex ? emotions[id].color : emotions[id].colorLight + '50',
                      boxShadow: index === currentEmotionIndex ? `0 8px 24px ${emotions[id].color}50` : 'none',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    role="tab"
                    aria-selected={index === currentEmotionIndex}
                    aria-label={emotions[id].name_ko}
                  >
                    <EmotionShape
                      emotionId={id}
                      size={24}
                      color={index === currentEmotionIndex ? '#fff' : emotions[id].color}
                      isActive={false}
                    />
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => setCurrentEmotionIndex((prev) => (prev + 1) % emotionOrder.length)}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </motion.div>

        {/* Learn More Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Signal & Message Card */}
          <GlassCard className="p-6" delay={0.1} emotionColor={emotion.color}>
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: emotion.colorLight }}
              >
                <svg className="w-7 h-7" fill="none" stroke={emotion.colorDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">신호와 메시지</h4>
              <p className="text-sm text-gray-500 mb-4">(Signal & Message)</p>
              <button
                onClick={() => setShowSignalModal(true)}
                className="text-sm font-medium hover:underline"
                style={{ color: emotion.color }}
              >
                더 알아보기 →
              </button>
            </div>
          </GlassCard>

          {/* Triggers Card */}
          <GlassCard className="p-6" delay={0.2} emotionColor={emotion.color}>
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: emotion.colorLight }}
              >
                <svg className="w-7 h-7" fill="none" stroke={emotion.colorDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">트리거와 반응</h4>
              <p className="text-sm text-gray-500 mb-4">(Triggers & Responses)</p>
              <button
                onClick={() => setShowTriggersModal(true)}
                className="text-sm font-medium hover:underline"
                style={{ color: emotion.color }}
              >
                더 알아보기 →
              </button>
            </div>
          </GlassCard>

          {/* Moods Card */}
          <GlassCard className="p-6" delay={0.3} emotionColor={emotion.color}>
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: emotion.colorLight }}
              >
                <svg className="w-7 h-7" fill="none" stroke={emotion.colorDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">기분과 정신병리</h4>
              <p className="text-sm text-gray-500 mb-4">(Moods & Psychopathology)</p>
              <button
                onClick={() => setShowMoodsModal(true)}
                className="text-sm font-medium hover:underline"
                style={{ color: emotion.color }}
              >
                더 알아보기 →
              </button>
            </div>
          </GlassCard>

          {/* How Does This Happen Card */}
          <GlassCard className="p-6" delay={0.4} emotionColor={emotion.color}>
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: emotion.colorLight }}
              >
                <svg className="w-7 h-7" fill="none" stroke={emotion.colorDark} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">어떻게 이런 일이?</h4>
              <p className="text-sm text-gray-500 mb-4">(How Does This Happen?)</p>
              <button
                onClick={() => setShowHowModal(true)}
                className="text-sm font-medium hover:underline"
                style={{ color: emotion.color }}
              >
                더 알아보기 →
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Triggers and Responses Preview */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {/* Triggers */}
          <GlassCard className="p-8" delay={0.5} emotionColor={emotion.color}>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: emotion.color }}
              >
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  {emotion.name_ko}의 트리거
                </h3>
                <p className="text-sm text-gray-400">(Triggers of {emotion.name_en})</p>
              </div>
            </div>
            <ul className="space-y-3">
              {emotionData.triggers.slice(0, 5).map((trigger, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-600"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  <span
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: emotion.color }}
                  />
                  <span className="leading-relaxed">{trigger.text_ko}</span>
                </motion.li>
              ))}
            </ul>
            <button
              onClick={() => setShowTriggersModal(true)}
              className="mt-6 text-sm font-medium hover:underline"
              style={{ color: emotion.color }}
            >
              모든 트리거 보기 →
            </button>
          </GlassCard>

          {/* Responses */}
          <GlassCard className="p-8" delay={0.6} emotionColor={emotion.color}>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: emotion.color }}
              >
                <span className="text-2xl">⚔️</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-gray-900">
                  {emotion.name_ko}의 반응
                </h3>
                <p className="text-sm text-gray-400">(Responses to {emotion.name_en})</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">본능적 반응</p>
              <div className="flex flex-wrap gap-2">
                {emotionData.intrinsicActions.slice(0, 4).map((action, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white"
                    style={{
                      backgroundColor: action.type === 'constructive' ? '#22c55e' :
                                      action.type === 'destructive' ? '#ef4444' : '#eab308'
                    }}
                  >
                    {action.text_ko}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">의도적 반응</p>
              <div className="flex flex-wrap gap-2">
                {emotionData.intentionalActions.slice(0, 4).map((action, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-xs font-medium text-white"
                    style={{
                      backgroundColor: action.type === 'constructive' ? '#22c55e' :
                                      action.type === 'destructive' ? '#ef4444' : '#eab308'
                    }}
                  >
                    {action.text_ko}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowTriggersModal(true)}
              className="mt-6 text-sm font-medium hover:underline"
              style={{ color: emotion.color }}
            >
              모든 반응 보기 →
            </button>
          </GlassCard>
        </motion.div>

        {/* Signal & Message Preview */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlassCard className="p-8" delay={0.7} emotionColor={emotion.color}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Signal */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: emotion.colorLight }}
                  >
                    👁️
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    신호 <span className="text-gray-400 font-normal">(Signal)</span>
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {emotionData.signal.text_ko}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  ({emotionData.signal.text_en})
                </p>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: emotion.colorLight }}
                  >
                    💬
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    메시지 <span className="text-gray-400 font-normal">(Message)</span>
                  </h3>
                </div>
                <div
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: emotion.colorLight + '30' }}
                >
                  <p className="text-xl font-serif font-bold" style={{ color: emotion.color }}>
                    "{emotionData.message.text_ko}"
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    "{emotionData.message.text_en}"
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <HowDoesThisHappenModal
        isOpen={showHowModal}
        onClose={() => setShowHowModal(false)}
        emotion={emotion}
      />
      <SignalMessageModal
        isOpen={showSignalModal}
        onClose={() => setShowSignalModal(false)}
        emotion={emotion}
        emotionData={emotionData}
      />
      <TriggersResponsesModal
        isOpen={showTriggersModal}
        onClose={() => setShowTriggersModal(false)}
        emotion={emotion}
        emotionData={emotionData}
      />
      <MoodsPsychopathologyModal
        isOpen={showMoodsModal}
        onClose={() => setShowMoodsModal(false)}
        emotion={emotion}
      />
    </section>
  );
};

export default Timeline;
