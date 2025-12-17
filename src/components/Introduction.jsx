import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 원본 사이트와 동일한 대형 3D 그라디언트 구체 컴포넌트
const GradientSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      const size = Math.min(500, window.innerWidth * 0.8);
      canvas.width = size;
      canvas.height = size;
    };
    resize();
    window.addEventListener('resize', resize);

    const emotionColors = [
      { color: '#E85A4F', angle: 0 },     // 분노 - 빨강
      { color: '#9B7BB8', angle: 72 },    // 두려움 - 보라
      { color: '#10B981', angle: 144 },   // 혐오 - 초록
      { color: '#3B82F6', angle: 216 },   // 슬픔 - 파랑
      { color: '#F59E0B', angle: 288 },   // 즐거움 - 노랑
    ];

    const draw = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width * 0.42;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create main gradient sphere
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        0,
        centerX,
        centerY,
        radius * 1.2
      );

      // Dynamic color mixing based on time
      const t = time * 0.0005;
      emotionColors.forEach((ec, i) => {
        const offset = (i / emotionColors.length + Math.sin(t + i) * 0.05) % 1;
        gradient.addColorStop(Math.max(0, Math.min(1, offset)), ec.color + 'CC');
      });
      gradient.addColorStop(1, 'rgba(0,0,0,0.1)');

      // Draw main sphere with gradient
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Add glossy overlay
      const glossGradient = ctx.createRadialGradient(
        centerX - radius * 0.4,
        centerY - radius * 0.4,
        0,
        centerX,
        centerY,
        radius
      );
      glossGradient.addColorStop(0, 'rgba(255,255,255,0.4)');
      glossGradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
      glossGradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = glossGradient;
      ctx.fill();

      // Outer glow
      ctx.shadowColor = 'rgba(139, 92, 246, 0.3)';
      ctx.shadowBlur = 60;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[500px] max-h-[500px]"
        style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.2))' }}
      />
      {/* Center text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-8">
          <motion.p
            className="text-white/90 text-sm md:text-base font-medium mb-2 tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            WELCOME TO THE
          </motion.p>
          <motion.h2
            className="text-white text-2xl md:text-4xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            Atlas of Emotions
          </motion.h2>
          <motion.p
            className="text-white/80 text-lg md:text-xl font-medium mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            감정의 지도
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const Introduction = ({ onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const emotionColors = [
    { name: '분노', name_en: 'ANGER', color: '#E85A4F', desc: '목표가 방해받을 때' },
    { name: '두려움', name_en: 'FEAR', color: '#9B7BB8', desc: '위협을 느낄 때' },
    { name: '혐오', name_en: 'DISGUST', color: '#10B981', desc: '불쾌한 것에 대한 반응' },
    { name: '슬픔', name_en: 'SADNESS', color: '#3B82F6', desc: '상실에 대한 반응' },
    { name: '즐거움', name_en: 'ENJOYMENT', color: '#F59E0B', desc: '긍정적 경험에 대한 반응' },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100" role="main">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        메인 콘텐츠로 건너뛰기
      </a>

      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-200/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div id="main-content" className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        {/* Logo Header */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-white text-[10px] font-bold leading-tight text-center">
              감정<br />지도
            </span>
          </div>
          <div className="text-gray-900 text-xs font-bold uppercase tracking-wider leading-tight">
            ATLAS<br />OF<br />EMOTIONS
          </div>
        </motion.div>

        {/* Main 3D Sphere - 원본 사이트처럼 중앙에 배치 */}
        <div className="flex justify-center mb-12">
          <GradientSphere />
        </div>

        {/* Description */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            감정을 촉발하는 요인과 반응 방식에 대한
            <span className="text-gray-900 font-bold"> 더 큰 통제력</span>을 얻는 것이 목표입니다.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          <motion.button
            onClick={() => onNavigate('triggers')}
            className="group flex items-center gap-3 px-10 py-4 bg-gray-900 text-white text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>탐험 시작하기</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>

          <motion.button
            onClick={() => setSidebarOpen(true)}
            className="group flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-full hover:border-gray-900 hover:text-gray-900 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <span>더 알아보기</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

        {/* 5 Emotions Preview */}
        <motion.div
          className="flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {emotionColors.map((emotion, i) => (
            <motion.div
              key={emotion.name}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/50 transition-colors cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2 + i * 0.1, type: 'spring', stiffness: 300 }}
              whileHover={{ y: -5 }}
            >
              <div
                className="w-14 h-14 rounded-full shadow-lg"
                style={{ backgroundColor: emotion.color }}
              />
              <span className="text-gray-800 font-bold text-sm">{emotion.name}</span>
              <span className="text-gray-400 text-xs">{emotion.name_en}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <span className="text-xs tracking-widest mb-3 uppercase font-medium">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Learn More Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              className="fixed left-0 top-0 bottom-0 w-full sm:w-[480px] bg-white z-[9999] overflow-y-auto shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all text-2xl"
              >
                ✕
              </button>

              <div className="p-10 pt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  감정 지도에 대하여
                </h2>

                <div className="space-y-8">
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-amber-50 rounded-2xl">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                      🎯 프로젝트 배경
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      감정 지도는 <strong>Paul Ekman 박사</strong>와 <strong>달라이 라마</strong>의
                      오랜 우정에서 탄생했습니다. Paul Ekman은 평생 감정 과학 연구에 헌신한
                      세계적으로 유명한 심리학자입니다.
                    </p>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                      🎓 목표
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      감정을 촉발하는 요인과 우리의 반응 방식에 대해
                      <strong> 더 큰 통제력</strong>을 얻는 것입니다.
                      이 도구는 자신의 감정을 더 잘 이해하고,
                      건설적인 방식으로 대응하는 데 도움을 줍니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                      🌈 5가지 보편적 감정
                    </h3>
                    <div className="space-y-3">
                      {emotionColors.map((emotion) => (
                        <div key={emotion.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <div
                            className="w-12 h-12 rounded-full shadow-md flex-shrink-0"
                            style={{ backgroundColor: emotion.color }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-900 font-bold">{emotion.name}</span>
                              <span className="text-gray-400 text-sm">({emotion.name_en})</span>
                            </div>
                            <p className="text-gray-500 text-sm">{emotion.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-sm">
                      원본 사이트:{' '}
                      <a
                        href="https://atlasofemotions.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 font-medium underline underline-offset-2"
                      >
                        atlasofemotions.org
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Introduction;
