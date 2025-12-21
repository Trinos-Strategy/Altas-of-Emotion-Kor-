import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// 감정 데이터 - 한국어 중심, 영문은 병기용으로만 사용
const emotions = [
  {
    id: 'anger',
    name: '분노',
    nameEn: 'Anger',
    color: '#E63946',
    description: '목표가 방해받거나 부당한 대우를 받을 때 느끼는 감정'
  },
  {
    id: 'fear',
    name: '두려움',
    nameEn: 'Fear',
    color: '#8338EC',
    description: '위험을 감지했을 때 스스로를 보호하기 위해 느끼는 감정'
  },
  {
    id: 'disgust',
    name: '혐오',
    nameEn: 'Disgust',
    color: '#2D5A3D',
    description: '해롭거나 불쾌한 것으로부터 멀어지려는 본능적 반응'
  },
  {
    id: 'sadness',
    name: '슬픔',
    nameEn: 'Sadness',
    color: '#4361EE',
    description: '상실을 경험했을 때 느끼는 감정으로, 회복의 시간이 필요함을 알림'
  },
  {
    id: 'enjoyment',
    name: '즐거움',
    nameEn: 'Enjoyment',
    color: '#FFB703',
    description: '긍정적인 경험에서 느끼는 만족과 행복의 감정'
  },
];

const stats = [
  { number: 5, label: '보편적 감정', suffix: '' },
  { number: 88, label: '과학자 합의', suffix: '%' },
  { number: 248, label: '참여 연구자', suffix: '' },
  { number: 50, label: '감정 상태', suffix: '+' },
];

// 햄버거 메뉴 컴포넌트 (언어 스위치 제외)
const HamburgerMenu = ({ isOpen, onClose, onNavigate }) => {
  const menuItems = [
    { label: '홈', labelEn: 'Home', action: () => { onClose(); } },
    { label: '5가지 감정', labelEn: 'Five Emotions', action: () => { onClose(); onNavigate('continents'); } },
    { label: '탐험의 여정', labelEn: 'The Journey', action: () => { onClose(); onNavigate('triggers'); } },
    { label: '프로젝트 소개', labelEn: 'About', action: () => { onClose(); } },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.97)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
          />

          {/* Menu Content */}
          <motion.nav
            className="fixed inset-0 z-[101] flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 md:top-12 md:right-12 text-white/60 hover:text-white transition-colors"
              style={{ minWidth: '48px', minHeight: '48px' }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Menu Items */}
            <ul className="flex flex-col items-center gap-8 md:gap-12">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <button
                    onClick={item.action}
                    className="group text-center"
                    style={{ minWidth: '48px', minHeight: '48px' }}
                  >
                    <span
                      className="block text-white font-light tracking-[0.08em]"
                      style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="block text-white/30 mt-2 tracking-[0.15em]"
                      style={{ fontSize: '0.625rem' }}
                    >
                      ({item.labelEn})
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>

            {/* Footer Link */}
            <motion.a
              href="https://atlasofemotions.org"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-12 text-white/30 hover:text-white/60 transition-colors tracking-[0.1em]"
              style={{ fontSize: '0.75rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              원본 프로젝트 →
            </motion.a>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

const Introduction = ({ onNavigate }) => {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);
  const [hoveredEmotion, setHoveredEmotion] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Lenis Smooth Scroll 초기화
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    // GSAP와 Lenis 동기화
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Hero 애니메이션 - 라인별 reveal
    const heroTl = gsap.timeline({ delay: 0.3 });
    heroTl
      .from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      })
      .from('.hero-title-line', {
        yPercent: 120,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
      }, '-=0.6')
      .from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4')
      .from('.scroll-indicator', {
        opacity: 0,
        duration: 1,
      }, '-=0.3');

    // Stats 카운트업 애니메이션
    gsap.utils.toArray('.stat-number').forEach((el) => {
      const target = parseInt(el.dataset.value, 10);
      const suffix = el.dataset.suffix || '';

      gsap.fromTo(el,
        { innerHTML: '0' + suffix },
        {
          innerHTML: target + suffix,
          duration: 2.5,
          ease: 'power1.inOut',
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: function() {
            const currentVal = Math.round(gsap.getProperty(el, 'innerHTML').toString().replace(/[^0-9]/g, ''));
            el.innerHTML = currentVal + suffix;
          }
        }
      );
    });

    // Stats 아이템 페이드인
    gsap.from('.stat-item', {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 75%',
      },
    });

    // Quote 섹션 애니메이션
    gsap.from('.quote-text', {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.quote-section',
        start: 'top 70%',
      },
    });

    gsap.from('.quote-author', {
      opacity: 0,
      duration: 1,
      delay: 0.4,
      scrollTrigger: {
        trigger: '.quote-section',
        start: 'top 70%',
      },
    });

    // Emotion 카드 stagger 애니메이션
    gsap.from('.emotion-card', {
      y: 100,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      stagger: {
        each: 0.15,
        from: 'start'
      },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.emotions-section',
        start: 'top 70%',
      },
    });

    // Journey 섹션 애니메이션
    gsap.from('.journey-title', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.journey-section',
        start: 'top 75%',
      },
    });

    gsap.from('.journey-step', {
      opacity: 0,
      x: -40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.journey-steps',
        start: 'top 75%',
      },
    });

    // CTA 섹션 애니메이션
    gsap.from('.cta-content', {
      opacity: 0,
      y: 60,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 75%',
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // 메뉴 오픈 시 스크롤 잠금
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div
      ref={containerRef}
      className="bg-white text-black"
      style={{
        '--color-bg-primary': '#FFFFFF',
        '--color-bg-secondary': '#FAFAFA',
        '--color-bg-dark': '#0A0A0A',
        '--color-text-primary': '#000000',
        '--color-text-secondary': 'rgba(0, 0, 0, 0.6)',
        '--color-text-tertiary': 'rgba(0, 0, 0, 0.4)',
        '--color-accent': '#FF6B35',
        fontFamily: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', sans-serif",
        wordBreak: 'keep-all',
        letterSpacing: '-0.02em',
        lineHeight: 1.8,
      }}
    >
      {/* ============ 글로벌 모바일 최적화 스타일 ============ */}
      <style>{`
        /* 모바일 최적화 (768px 이하) */
        @media (max-width: 768px) {
          /* 히어로 섹션 */
          .hero-section {
            padding: 80px 20px 60px !important;
            min-height: auto !important;
          }
          .hero-title-line {
            font-size: clamp(1.75rem, 7vw, 2.5rem) !important;
            line-height: 1.35 !important;
          }
          .hero-subtitle {
            margin-bottom: 24px !important;
          }
          .cta-button-luxury {
            padding: 16px 32px !important;
            font-size: 1rem !important;
            gap: 10px !important;
          }
          .scroll-indicator {
            display: none !important;
          }

          /* 통계 섹션 */
          .stats-section {
            padding: 48px 20px !important;
          }
          .stat-item {
            text-align: center !important;
          }
          .stat-number {
            font-size: clamp(2.5rem, 12vw, 4rem) !important;
            margin-bottom: 0.75rem !important;
          }

          /* 달라이 라마 인용문 - 핵심 모바일 최적화 */
          .quote-section {
            padding: 48px 32px !important;
          }
          .quote-text {
            font-size: 1.375rem !important;
            line-height: 1.75 !important;
            margin-bottom: 2rem !important;
          }
          .quote-author {
            font-size: 1rem !important;
          }

          /* 감정 섹션 */
          .emotions-section {
            padding: 48px 20px !important;
          }
          .emotion-icons-preview {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 16px !important;
            margin-bottom: 32px !important;
          }
          .emotion-icon-item p {
            font-size: 0.9375rem !important;
          }
          .emotion-icon-item span {
            font-size: 0.5625rem !important;
          }
          .emotion-card {
            padding: 24px 20px !important;
            min-height: 200px !important;
          }
          .emotion-card h3 {
            font-size: 1.5rem !important;
          }
          .emotion-card p {
            font-size: 0.9375rem !important;
            line-height: 1.7 !important;
          }

          /* 여정 섹션 */
          .journey-section {
            padding: 48px 20px !important;
          }
          .journey-title h2 {
            font-size: 1.875rem !important;
            margin-bottom: 16px !important;
          }
          .journey-title > p {
            font-size: 1.0625rem !important;
            line-height: 1.75 !important;
          }
          .journey-step {
            padding: 16px 0 !important;
            gap: 16px !important;
          }
          .journey-step h4 {
            font-size: 1.375rem !important;
          }
          .journey-step p {
            font-size: 1rem !important;
            line-height: 1.7 !important;
          }

          /* CTA 섹션 */
          .cta-section {
            padding: 60px 20px !important;
          }
          .cta-content h2 {
            font-size: 1.75rem !important;
            margin-bottom: 16px !important;
          }
          .cta-content > p {
            margin-bottom: 24px !important;
          }
          .cta-button-luxury-bottom {
            padding: 16px 32px !important;
            font-size: 1rem !important;
          }

          /* 푸터 */
          footer {
            padding: 40px 20px !important;
          }
          footer p {
            font-size: 0.9375rem !important;
            line-height: 1.8 !important;
          }
        }

        /* 작은 모바일 (480px 이하) */
        @media (max-width: 480px) {
          .hero-section {
            padding: 60px 16px 48px !important;
          }
          .hero-title-line {
            font-size: 1.5rem !important;
          }

          .quote-section {
            padding: 36px 24px !important;
          }
          .quote-text {
            font-size: 1.1875rem !important;
            line-height: 1.7 !important;
          }

          .emotion-icons-preview {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
          }
          .icon-circle {
            width: 48px !important;
            height: 48px !important;
            font-size: 24px !important;
          }

          .stats-section {
            padding: 36px 16px !important;
          }

          .journey-section {
            padding: 36px 16px !important;
          }

          .cta-section {
            padding: 48px 16px !important;
          }

          footer {
            padding: 32px 16px !important;
          }
        }
      `}</style>
      {/* 햄버거 메뉴 버튼 */}
      <button
        onClick={() => setMenuOpen(true)}
        className="fixed top-8 right-8 md:top-12 md:right-12 z-50 flex flex-col gap-[6px] group"
        style={{ minWidth: '48px', minHeight: '48px', padding: '12px' }}
        aria-label="메뉴 열기"
      >
        <span className="block w-6 h-[1.5px] bg-black/60 group-hover:bg-black transition-colors" />
        <span className="block w-6 h-[1.5px] bg-black/60 group-hover:bg-black transition-colors" />
      </button>

      {/* 햄버거 메뉴 */}
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={onNavigate}
      />

      {/* ============ HERO SECTION ============ */}
      <section
        className="hero-section min-h-screen flex flex-col justify-center items-center relative"
        style={{ padding: 'clamp(120px, 20vh, 300px) clamp(24px, 5vw, 120px)' }}
      >
        <div className="max-w-[1200px] w-full mx-auto text-center">
          {/* Subtitle */}
          <p
            className="hero-subtitle text-black/40 tracking-[0.2em] mb-12"
            style={{ fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}
          >
            감정 지도 한국어판
          </p>

          {/* Main Title - 라인별 오버플로우 히든, 줄간격 개선 */}
          <h1 className="mb-20">
            <span className="block overflow-hidden mb-2">
              <span
                className="hero-title-line block"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '0.02em',
                }}
              >
                감정의 세계를 아는 것이
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="hero-title-line block"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '0.02em',
                }}
              >
                <span style={{ color: 'var(--color-accent)' }}>마음의 평화</span>로 가는 길입니다
              </span>
            </span>
          </h1>

          {/* CTA Button - Luxury Design */}
          <button
            onClick={() => onNavigate('triggers')}
            className="hero-cta cta-button-luxury group"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '20px 44px',
              background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(0,188,212,0.35)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '56px',
              letterSpacing: '0.05em',
            }}
          >
            {/* Shine effect overlay */}
            <span
              className="shine-effect"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                transform: 'translateX(-100%)',
                transition: 'transform 600ms ease',
              }}
            />
            {/* Star Icon */}
            <span className="button-icon" style={{ display: 'inline-flex' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </svg>
            </span>
            <span className="button-text" style={{ position: 'relative', zIndex: 1 }}>탐험 시작</span>
            <span
              className="button-arrow"
              style={{
                position: 'relative',
                zIndex: 1,
                transition: 'transform 400ms ease',
                fontSize: '1.25rem',
              }}
            >
              →
            </span>
            <style>{`
              .cta-button-luxury:hover {
                transform: translateY(-3px) scale(1.03) !important;
                box-shadow: 0 10px 36px rgba(0,188,212,0.45) !important;
              }
              .cta-button-luxury:hover .shine-effect {
                transform: translateX(100%) !important;
              }
              .cta-button-luxury:hover .button-arrow {
                transform: translateX(5px) !important;
              }
              .cta-button-luxury .button-icon {
                animation: rotate-pulse 3s ease-in-out infinite;
              }
              @keyframes rotate-pulse {
                0%, 100% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(8deg) scale(1.12); }
              }
            `}</style>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span
            className="text-black/25 tracking-[0.15em]"
            style={{ fontSize: '0.625rem' }}
          >
            스크롤
          </span>
          <div className="w-px h-16 bg-black/15 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-black/40"
              style={{ height: '50%' }}
              animate={{ y: ['0%', '100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section
        className="stats-section"
        style={{
          padding: 'clamp(120px, 20vh, 280px) clamp(24px, 5vw, 120px)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center md:text-left">
                <div
                  className="stat-number"
                  data-value={stat.number}
                  data-suffix={stat.suffix}
                  style={{
                    fontSize: 'clamp(3.5rem, 10vw, 6rem)',
                    fontWeight: 200,
                    lineHeight: 1,
                    marginBottom: '1.25rem',
                    letterSpacing: '-0.03em',
                  }}
                >
                  0{stat.suffix}
                </div>
                <p
                  className="text-black/60 tracking-[0.06em] font-medium"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUOTE SECTION ============ */}
      {/* Noto Serif KR 폰트 로드 */}
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <section
        className="quote-section"
        style={{
          padding: 'clamp(140px, 25vh, 350px) clamp(24px, 4vw, 40px)',
          backgroundColor: 'var(--color-bg-dark)',
          color: 'white',
        }}
      >
        <div className="max-w-[1000px] mx-auto text-center">
          <blockquote
            className="quote-text"
            style={{
              fontFamily: "'Noto Serif KR', '궁서', 'Gungsuh', serif",
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.9,
              marginBottom: '4rem',
              letterSpacing: '0.03em',
              wordBreak: 'keep-all',
            }}
          >
            감정을 촉발하는 요인과
            <br />
            반응 방식에 대해
            <br />
            <span style={{ opacity: 0.9 }}>더 깊은 이해와 통제력을 얻으세요</span>
          </blockquote>
          <cite
            className="quote-author not-italic"
            style={{
              fontFamily: "'Noto Serif KR', '궁서', 'Gungsuh', serif",
              fontSize: 'clamp(1rem, 2vw, 1.375rem)',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.08em',
            }}
          >
            — 달라이 라마 & 폴 에크만 박사
          </cite>
        </div>
      </section>

      {/* ============ EMOTIONS SECTION ============ */}
      <section
        className="emotions-section"
        style={{ padding: 'clamp(120px, 20vh, 280px) clamp(24px, 5vw, 120px)' }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-12 md:mb-16 max-w-[600px]">
            <p
              className="text-black/35 tracking-[0.2em] mb-6"
              style={{ fontSize: '0.625rem' }}
            >
              다섯 가지 보편적 감정
            </p>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 300,
                letterSpacing: '0.01em',
                lineHeight: 1.4,
              }}
            >
              인류가 공유하는 감정의 언어
            </h2>
          </div>

          {/* 감정 아이콘 프리뷰 그리드 */}
          <div
            className="emotion-icons-preview grid grid-cols-5 gap-6 md:gap-10 mb-16 md:mb-24"
            style={{ maxWidth: '700px', margin: '0 auto 4rem' }}
          >
            {[
              { emoji: '😠', name: '분노', nameEn: 'Anger', gradient: 'linear-gradient(135deg, #FF6B6B 0%, #C92A2A 100%)' },
              { emoji: '😨', name: '두려움', nameEn: 'Fear', gradient: 'linear-gradient(135deg, #845EC2 0%, #5B3E96 100%)' },
              { emoji: '🤢', name: '혐오', nameEn: 'Disgust', gradient: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)' },
              { emoji: '😢', name: '슬픔', nameEn: 'Sadness', gradient: 'linear-gradient(135deg, #42A5F5 0%, #1976D2 100%)' },
              { emoji: '✨', name: '즐거움', nameEn: 'Enjoyment', gradient: 'linear-gradient(135deg, #FFA726 0%, #F57C00 100%)' },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                className="emotion-icon-item flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className="icon-circle flex items-center justify-center rounded-full shadow-lg cursor-pointer"
                  style={{
                    width: 'clamp(56px, 12vw, 80px)',
                    height: 'clamp(56px, 12vw, 80px)',
                    background: item.gradient,
                    fontSize: 'clamp(28px, 6vw, 40px)',
                  }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => onNavigate('continents')}
                >
                  {item.emoji}
                </motion.div>
                <p
                  className="text-center font-semibold text-gray-800"
                  style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}
                >
                  {item.name}
                </p>
                <span
                  className="text-gray-400 uppercase"
                  style={{ fontSize: '0.625rem', letterSpacing: '0.08em' }}
                >
                  ({item.nameEn})
                </span>
              </motion.div>
            ))}
          </div>

          {/* Emotions Grid - 상세 카드 */}
          <div
            className="grid md:grid-cols-5 gap-4 md:gap-6"
            style={{ marginTop: 'clamp(48px, 8vh, 100px)' }}
          >
            {emotions.map((emotion, index) => (
              <motion.div
                key={emotion.id}
                className="emotion-card cursor-pointer p-8 md:p-10 border transition-all duration-500"
                data-emotion={emotion.id}
                style={{
                  backgroundColor: hoveredEmotion === emotion.id ? emotion.color : 'white',
                  color: hoveredEmotion === emotion.id ? 'white' : 'black',
                  borderColor: hoveredEmotion === emotion.id ? emotion.color : 'rgba(0,0,0,0.08)',
                  minHeight: '280px',
                }}
                onMouseEnter={() => setHoveredEmotion(emotion.id)}
                onMouseLeave={() => setHoveredEmotion(null)}
                onClick={() => onNavigate('continents')}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span
                  className="block mb-8 transition-colors duration-500"
                  style={{
                    fontSize: '0.625rem',
                    opacity: hoveredEmotion === emotion.id ? 0.7 : 0.35,
                    letterSpacing: '0.2em',
                  }}
                >
                  0{index + 1}
                </span>

                <h3
                  className="mb-2"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                  }}
                >
                  {emotion.name}
                </h3>

                <p
                  className="mb-8 transition-colors duration-500"
                  style={{
                    fontSize: '0.6rem',
                    opacity: hoveredEmotion === emotion.id ? 0.6 : 0.3,
                    letterSpacing: '0.05em',
                  }}
                >
                  ({emotion.nameEn})
                </p>

                <p
                  className="transition-colors duration-500"
                  style={{
                    fontSize: '0.875rem',
                    opacity: hoveredEmotion === emotion.id ? 0.9 : 0.55,
                    lineHeight: 1.9,
                  }}
                >
                  {emotion.description}
                </p>

                <motion.div
                  className="mt-10"
                  animate={{
                    opacity: hoveredEmotion === emotion.id ? 1 : 0,
                    x: hoveredEmotion === emotion.id ? 0 : -12,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOURNEY SECTION ============ */}
      <section
        className="journey-section"
        style={{
          padding: 'clamp(140px, 22vh, 320px) clamp(24px, 5vw, 120px)',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-20 md:gap-32 items-start">
            {/* Left: Text */}
            <div className="journey-title">
              <p
                className="text-black/35 tracking-[0.2em] mb-8"
                style={{ fontSize: '0.75rem' }}
              >
                탐험의 여정
              </p>
              <h2
                className="mb-12"
                style={{
                  fontSize: 'clamp(2.25rem, 6vw, 3.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  letterSpacing: '0.01em',
                }}
              >
                감정을 이해하는
                <br />
                네 단계 여정
              </h2>
              <p
                className="text-black/60"
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                  lineHeight: 2.2,
                  wordBreak: 'keep-all',
                }}
              >
                각 감정의 트리거, 경험, 반응, 그리고 해독제를 탐험하며
                자신만의 감정 지도를 완성해 나가세요.
              </p>
            </div>

            {/* Right: Steps */}
            <div className="journey-steps space-y-0">
              {[
                { num: '01', title: '트리거', titleEn: 'Trigger', desc: '감정이 시작되는 순간과 원인을 이해합니다' },
                { num: '02', title: '경험', titleEn: 'Experience', desc: '감정의 강도와 미묘한 차이를 탐색합니다' },
                { num: '03', title: '반응', titleEn: 'Response', desc: '감정에 대한 행동 선택지를 배웁니다' },
                { num: '04', title: '해독제', titleEn: 'Antidote', desc: '균형과 조절을 위한 전략을 습득합니다' },
              ].map((step, index) => (
                <div
                  key={step.num}
                  className="journey-step flex items-center gap-8 md:gap-10 py-10"
                  style={{ borderBottom: index < 3 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}
                >
                  <span
                    className="text-black/20 font-light"
                    style={{ fontSize: '1rem', letterSpacing: '0.1em', width: '2.5rem' }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h4
                      className="mb-3 flex items-baseline gap-3"
                      style={{
                        fontSize: 'clamp(1.5rem, 3vw, 1.75rem)',
                        fontWeight: 500,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {step.title}
                      <span
                        className="text-black/30"
                        style={{ fontSize: '0.75rem', fontWeight: 400 }}
                      >
                        ({step.titleEn})
                      </span>
                    </h4>
                    <p
                      className="text-black/55"
                      style={{
                        fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                        lineHeight: 1.8,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section
        className="cta-section"
        style={{ padding: 'clamp(140px, 25vh, 350px) clamp(24px, 5vw, 120px)' }}
      >
        <div className="cta-content max-w-[800px] mx-auto text-center">
          <h2
            className="mb-10"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: '0.01em',
            }}
          >
            당신의 감정을
            <br />
            이해하는 여정
          </h2>

          <p
            className="text-black/45 mb-14"
            style={{ fontSize: '1rem' }}
          >
            지금 시작하세요
          </p>

          <button
            onClick={() => onNavigate('triggers')}
            className="cta-button-luxury-bottom group"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '22px 48px',
              background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(0,188,212,0.35)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '60px',
              letterSpacing: '0.05em',
            }}
          >
            <span
              className="shine-effect-bottom"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                transform: 'translateX(-100%)',
                transition: 'transform 600ms ease',
              }}
            />
            <span style={{ display: 'inline-flex' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </svg>
            </span>
            <span style={{ position: 'relative', zIndex: 1 }}>탐험 시작</span>
            <span style={{ position: 'relative', zIndex: 1, fontSize: '1.25rem' }}>→</span>
            <style>{`
              .cta-button-luxury-bottom:hover {
                transform: translateY(-3px) scale(1.03) !important;
                box-shadow: 0 10px 36px rgba(0,188,212,0.45) !important;
              }
              .cta-button-luxury-bottom:hover .shine-effect-bottom {
                transform: translateX(100%) !important;
              }
            `}</style>
          </button>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        style={{
          padding: 'clamp(80px, 12vh, 120px) clamp(24px, 5vw, 120px)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          backgroundColor: 'var(--color-bg-secondary)',
          paddingBottom: 'calc(clamp(80px, 12vh, 120px) + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
            <div className="text-center md:text-left">
              <p
                className="text-black/65 mb-3 font-medium"
                style={{ fontSize: '1.125rem' }}
              >
                감정 지도 한국어판
              </p>
              <p
                className="text-black/45"
                style={{ fontSize: '0.875rem' }}
              >
                © 트리노스 전략연구소
              </p>
            </div>
            <a
              href="https://atlasofemotions.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/45 hover:text-black/70 transition-colors"
              style={{ fontSize: '0.9375rem' }}
            >
              원본 프로젝트: The Ekmans' Atlas of Emotions →
            </a>
          </div>

          <div
            className="pt-10 text-center"
            style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
          >
            <p
              className="text-black/40 max-w-3xl mx-auto"
              style={{
                fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                lineHeight: 2.2,
                wordBreak: 'keep-all',
              }}
            >
              본 사이트는 Paul Ekman 박사와 Eve Ekman의 "Atlas of Emotions" 연구를
              한국어로 번역하여 제공하는 비영리 교육 프로젝트입니다.
              <br />
              원본 영문 컨텐츠의 모든 저작권은 원저작자에게 있습니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Introduction;
