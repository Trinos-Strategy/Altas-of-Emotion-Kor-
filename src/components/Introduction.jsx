import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// 감정 데이터
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

const Introduction = ({ onNavigate }) => {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);
  const [hoveredEmotion, setHoveredEmotion] = useState(null);

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

    // Hero 애니메이션
    const heroTl = gsap.timeline();
    heroTl
      .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      })
      .from('.hero-title-line', {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
      }, '-=0.4')
      .from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .from('.scroll-indicator', {
        opacity: 0,
        duration: 0.8,
      }, '-=0.2');

    // Stats 카운트업 애니메이션
    gsap.utils.toArray('.stat-number').forEach((el) => {
      const target = parseInt(el.dataset.value, 10);
      gsap.fromTo(el,
        { textContent: 0 },
        {
          textContent: target,
          duration: 2,
          ease: 'power1.inOut',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    });

    // Stats 라벨 페이드인
    gsap.from('.stat-item', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 75%',
      },
    });

    // Quote 섹션 애니메이션
    gsap.from('.quote-text', {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.quote-section',
        start: 'top 70%',
      },
    });

    gsap.from('.quote-author', {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      scrollTrigger: {
        trigger: '.quote-section',
        start: 'top 70%',
      },
    });

    // Emotion 카드 stagger 애니메이션
    gsap.from('.emotion-card', {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.emotions-section',
        start: 'top 70%',
      },
    });

    // CTA 섹션 애니메이션
    gsap.from('.cta-content', {
      opacity: 0,
      y: 50,
      duration: 1,
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

  return (
    <div
      ref={containerRef}
      className="bg-white text-black"
      style={{
        fontFamily: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, sans-serif",
        wordBreak: 'keep-all',
        letterSpacing: '-0.02em',
      }}
    >
      {/* ============ HERO SECTION ============ */}
      <section
        className="hero-section min-h-screen flex flex-col justify-center items-center relative"
        style={{ padding: 'clamp(80px, 15vh, 200px) clamp(24px, 5vw, 120px)' }}
      >
        <div className="max-w-[1200px] w-full mx-auto text-center">
          {/* Subtitle */}
          <p
            className="hero-subtitle text-black/40 uppercase tracking-[0.3em] mb-8"
            style={{ fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}
          >
            Atlas of Emotions
          </p>

          {/* Main Title */}
          <h1 className="overflow-hidden mb-12">
            <span
              className="hero-title-line block"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              감정의 세계를 아는 것이
            </span>
            <span
              className="hero-title-line block"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: 300,
                lineHeight: 1.2,
              }}
            >
              <span style={{ color: '#FF6B35' }}>마음의 평화</span>로 가는 길입니다
            </span>
          </h1>

          {/* CTA Button */}
          <button
            onClick={() => onNavigate('triggers')}
            className="hero-cta group inline-flex items-center gap-4 px-10 py-5 border border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-500"
            style={{ fontSize: '0.875rem', letterSpacing: '0.1em' }}
          >
            <span className="uppercase tracking-wider">탐험 시작</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span
            className="text-black/30 uppercase tracking-[0.2em]"
            style={{ fontSize: '0.625rem' }}
          >
            Scroll
          </span>
          <div className="w-px h-12 bg-black/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-black/60 animate-pulse"
              style={{
                animation: 'scrollDown 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes scrollDown {
            0% { transform: translateY(-100%); }
            50% { transform: translateY(100%); }
            100% { transform: translateY(200%); }
          }
        `}</style>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section
        className="stats-section"
        style={{
          padding: 'clamp(100px, 20vh, 250px) clamp(24px, 5vw, 120px)',
          borderTop: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center md:text-left">
                <div
                  className="stat-number"
                  data-value={stat.number}
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    fontWeight: 200,
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  0{stat.suffix}
                </div>
                <p
                  className="text-black/50 uppercase tracking-[0.15em]"
                  style={{ fontSize: '0.75rem' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ QUOTE SECTION ============ */}
      <section
        className="quote-section bg-black text-white"
        style={{ padding: 'clamp(120px, 25vh, 300px) clamp(24px, 5vw, 120px)' }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <blockquote
            className="quote-text"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              marginBottom: '3rem',
            }}
          >
            감정을 촉발하는 요인과 반응 방식에 대해
            <br />
            더 깊은 이해와 통제력을 얻으세요
          </blockquote>
          <cite
            className="quote-author text-white/50 not-italic tracking-[0.1em]"
            style={{ fontSize: '0.875rem' }}
          >
            — 달라이 라마 & 폴 에크만 박사
          </cite>
        </div>
      </section>

      {/* ============ EMOTIONS SECTION ============ */}
      <section
        className="emotions-section"
        style={{ padding: 'clamp(100px, 20vh, 250px) clamp(24px, 5vw, 120px)' }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="mb-16 md:mb-24">
            <p
              className="text-black/40 uppercase tracking-[0.3em] mb-4"
              style={{ fontSize: '0.625rem' }}
            >
              Five Universal Emotions
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 300,
              }}
            >
              다섯 가지 보편적 감정
            </h2>
          </div>

          {/* Emotions Grid */}
          <div className="grid md:grid-cols-5 gap-px bg-black/10">
            {emotions.map((emotion, index) => (
              <div
                key={emotion.id}
                className="emotion-card bg-white p-8 md:p-10 cursor-pointer transition-all duration-500"
                style={{
                  backgroundColor: hoveredEmotion === emotion.id ? emotion.color : 'white',
                  color: hoveredEmotion === emotion.id ? 'white' : 'black',
                }}
                onMouseEnter={() => setHoveredEmotion(emotion.id)}
                onMouseLeave={() => setHoveredEmotion(null)}
                onClick={() => onNavigate('continents')}
              >
                <span
                  className="block mb-6 transition-colors duration-500"
                  style={{
                    fontSize: '0.625rem',
                    opacity: hoveredEmotion === emotion.id ? 0.7 : 0.4,
                    letterSpacing: '0.2em',
                  }}
                >
                  0{index + 1}
                </span>

                <h3
                  className="mb-3"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontWeight: 300,
                  }}
                >
                  {emotion.name}
                </h3>

                <p
                  className="uppercase tracking-[0.15em] mb-6 transition-colors duration-500"
                  style={{
                    fontSize: '0.625rem',
                    opacity: hoveredEmotion === emotion.id ? 0.7 : 0.4,
                  }}
                >
                  {emotion.nameEn}
                </p>

                <p
                  className="transition-colors duration-500 leading-relaxed"
                  style={{
                    fontSize: '0.875rem',
                    opacity: hoveredEmotion === emotion.id ? 0.9 : 0.6,
                    lineHeight: 1.8,
                  }}
                >
                  {emotion.description}
                </p>

                {/* Hover Arrow */}
                <div
                  className="mt-8 transition-all duration-500"
                  style={{
                    opacity: hoveredEmotion === emotion.id ? 1 : 0,
                    transform: hoveredEmotion === emotion.id ? 'translateX(0)' : 'translateX(-10px)',
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOURNEY SECTION ============ */}
      <section
        style={{
          padding: 'clamp(100px, 20vh, 250px) clamp(24px, 5vw, 120px)',
          backgroundColor: '#FAFAFA',
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
            {/* Left: Text */}
            <div>
              <p
                className="text-black/40 uppercase tracking-[0.3em] mb-4"
                style={{ fontSize: '0.625rem' }}
              >
                The Journey
              </p>
              <h2
                className="mb-8"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.3,
                }}
              >
                감정을 이해하는
                <br />
                네 단계 여정
              </h2>
              <p
                className="text-black/60 leading-relaxed"
                style={{ fontSize: '1rem', lineHeight: 1.9 }}
              >
                각 감정의 트리거, 경험, 반응, 그리고 해독제를 탐험하며
                자신만의 감정 지도를 완성해 나가세요.
              </p>
            </div>

            {/* Right: Steps */}
            <div className="space-y-0">
              {[
                { num: '01', title: '트리거', desc: '감정의 시작점' },
                { num: '02', title: '경험', desc: '강도의 스펙트럼' },
                { num: '03', title: '반응', desc: '행동의 선택' },
                { num: '04', title: '해독제', desc: '균형의 전략' },
              ].map((step, index) => (
                <div
                  key={step.num}
                  className="flex items-center gap-8 py-6"
                  style={{ borderBottom: index < 3 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}
                >
                  <span
                    className="text-black/20"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h4
                      className="mb-1"
                      style={{ fontSize: '1.25rem', fontWeight: 400 }}
                    >
                      {step.title}
                    </h4>
                    <p className="text-black/50" style={{ fontSize: '0.875rem' }}>
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
        style={{ padding: 'clamp(120px, 25vh, 300px) clamp(24px, 5vw, 120px)' }}
      >
        <div className="cta-content max-w-[800px] mx-auto text-center">
          <h2
            className="mb-8"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            당신의 감정을
            <br />
            이해하는 여정
          </h2>

          <p
            className="text-black/50 mb-12"
            style={{ fontSize: '1rem' }}
          >
            지금 시작하세요
          </p>

          <button
            onClick={() => onNavigate('triggers')}
            className="group inline-flex items-center gap-4 px-12 py-6 bg-black text-white hover:bg-black/80 transition-all duration-500"
            style={{ fontSize: '0.875rem' }}
          >
            <span className="uppercase tracking-[0.15em]">탐험 시작</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer
        style={{
          padding: '3rem clamp(24px, 5vw, 120px)',
          borderTop: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-black/40 uppercase tracking-[0.15em]"
            style={{ fontSize: '0.625rem' }}
          >
            © Atlas of Emotions
          </p>
          <a
            href="https://atlasofemotions.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black/40 hover:text-black transition-colors uppercase tracking-[0.1em]"
            style={{ fontSize: '0.625rem' }}
          >
            Original Project →
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Introduction;
