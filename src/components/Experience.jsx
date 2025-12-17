import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions } from '../data/emotions';

// 이미지 심리학 연구 기반 감정별 산봉우리 데이터
const mountainData = {
  anger: {
    name_ko: '분노',
    name_en: 'ANGER',
    description_ko: '분노는 목표 달성을 방해하는 것에 대한 반응입니다. 가벼운 짜증부터 격렬한 분노까지 다양한 강도로 나타납니다.',
    color: '#E07B4E',
    colorLight: '#F5A882',
    colorDark: '#B85A30',
    states: [
      { id: 1, name_en: 'ANNOYANCE', name_ko: '짜증', intensity: 1, description: '가벼운 불편함이나 성가심' },
      { id: 2, name_en: 'FRUSTRATION', name_ko: '좌절', intensity: 2, description: '목표 달성이 막혔을 때의 느낌' },
      { id: 3, name_en: 'EXASPERATION', name_ko: '격분', intensity: 3, description: '참을 수 없는 짜증' },
      { id: 4, name_en: 'ARGUMENTATIVENESS', name_ko: '논쟁적', intensity: 4, description: '싸우고 싶은 충동' },
      { id: 5, name_en: 'BITTERNESS', name_ko: '원한', intensity: 5, description: '불공정함에 대한 분노' },
      { id: 6, name_en: 'VENGEFULNESS', name_ko: '복수심', intensity: 6, description: '앙갚음하고 싶은 욕구' },
      { id: 7, name_en: 'FURY', name_ko: '격노', intensity: 7, description: '통제할 수 없는 격렬한 분노' }
    ],
    // 심리학: 아래로 향하는 뾰족한 삼각형 - 위협, 공격성, 부정적 감정 전달
    // 강도가 높아질수록 더 뾰족하고 가파른 삼각형
    generatePath: (width, height) => {
      const baseY = height - 60;
      const peaks = [
        { x: width * 0.10, peakY: baseY - 90, sharpness: 0.8 },
        { x: width * 0.22, peakY: baseY - 160, sharpness: 0.75 },
        { x: width * 0.34, peakY: baseY - 240, sharpness: 0.7 },
        { x: width * 0.46, peakY: baseY - 320, sharpness: 0.65 },
        { x: width * 0.58, peakY: baseY - 400, sharpness: 0.6 },
        { x: width * 0.72, peakY: baseY - 490, sharpness: 0.55 },
        { x: width * 0.88, peakY: baseY - 600, sharpness: 0.5 }
      ];
      return peaks.map((peak, i) => {
        // 강도가 높아질수록 더 뾰족한 삼각형 (좁은 베이스)
        const baseSpread = 45 + i * 8;
        const actualSpread = baseSpread * peak.sharpness;
        // 뾰족한 삼각형 - 아래로 향하는 V 형태 강조
        return {
          path: `M ${peak.x - actualSpread},${baseY}
                 L ${peak.x},${peak.peakY}
                 L ${peak.x + actualSpread},${baseY} Z`,
          labelX: peak.x,
          labelY: peak.peakY - 20
        };
      });
    }
  },
  fear: {
    name_ko: '두려움',
    name_en: 'FEAR',
    description_ko: '두려움은 위험에 대한 반응입니다. 불규칙하고 예측 불가능한 형태는 불안과 긴장을 전달합니다.',
    color: '#9B7BB8',
    colorLight: '#C4A8E0',
    colorDark: '#7A5A99',
    states: [
      { id: 1, name_en: 'TREPIDATION', name_ko: '불안', intensity: 1, description: '약간의 걱정이나 두려움' },
      { id: 2, name_en: 'NERVOUSNESS', name_ko: '초조', intensity: 2, description: '긴장되고 불안한 상태' },
      { id: 3, name_en: 'ANXIETY', name_ko: '근심', intensity: 3, description: '미래에 대한 걱정' },
      { id: 4, name_en: 'DREAD', name_ko: '두려움', intensity: 4, description: '다가오는 위험에 대한 공포' },
      { id: 5, name_en: 'DESPERATION', name_ko: '절망', intensity: 5, description: '탈출구가 없다는 느낌' },
      { id: 6, name_en: 'PANIC', name_ko: '공황', intensity: 6, description: '압도적인 두려움' },
      { id: 7, name_en: 'HORROR', name_ko: '공포', intensity: 7, description: '충격적인 두려움' },
      { id: 8, name_en: 'TERROR', name_ko: '경악', intensity: 8, description: '극도의 공포' }
    ],
    // 심리학: 불규칙한 뾰족한 형태 - 예측 불가능성, 불안, 위협 전달
    // 강도가 높아질수록 불규칙성과 뾰족함 증가
    generatePath: (width, height) => {
      const baseY = height - 60;
      const peaks = [
        { x: width * 0.08, peakY: baseY - 70, irregularity: 0.1 },
        { x: width * 0.18, peakY: baseY - 120, irregularity: 0.15 },
        { x: width * 0.28, peakY: baseY - 180, irregularity: 0.2 },
        { x: width * 0.39, peakY: baseY - 260, irregularity: 0.25 },
        { x: width * 0.51, peakY: baseY - 340, irregularity: 0.3 },
        { x: width * 0.64, peakY: baseY - 430, irregularity: 0.35 },
        { x: width * 0.78, peakY: baseY - 530, irregularity: 0.4 },
        { x: width * 0.93, peakY: baseY - 650, irregularity: 0.45 }
      ];
      return peaks.map((peak, i) => {
        const spread = 35 + i * 7;
        const irr = peak.irregularity;
        // 불규칙한 지그재그 형태
        const midLeft = peak.peakY + (baseY - peak.peakY) * 0.4;
        const midRight = peak.peakY + (baseY - peak.peakY) * 0.5;
        const jag1 = peak.peakY + (baseY - peak.peakY) * 0.25;
        const jag2 = peak.peakY + (baseY - peak.peakY) * 0.6;

        return {
          path: `M ${peak.x - spread},${baseY}
                 L ${peak.x - spread * 0.7},${midLeft + irr * 50}
                 L ${peak.x - spread * 0.4},${jag1 - irr * 30}
                 L ${peak.x - spread * 0.15},${peak.peakY + irr * 20}
                 L ${peak.x},${peak.peakY}
                 L ${peak.x + spread * 0.15},${peak.peakY + irr * 25}
                 L ${peak.x + spread * 0.4},${jag2 - irr * 40}
                 L ${peak.x + spread * 0.7},${midRight + irr * 35}
                 L ${peak.x + spread},${baseY} Z`,
          labelX: peak.x,
          labelY: peak.peakY - 20
        };
      });
    }
  },
  disgust: {
    name_ko: '혐오',
    name_en: 'DISGUST',
    description_ko: '혐오는 불쾌하거나 역겨운 것에 대한 반응입니다. 비대칭적이고 왜곡된 형태는 불쾌감과 회피 반응을 유발합니다.',
    color: '#6BAF8D',
    colorLight: '#98D4B5',
    colorDark: '#4A8A6A',
    states: [
      { id: 1, name_en: 'DISLIKE', name_ko: '싫음', intensity: 1, description: '가벼운 반감' },
      { id: 2, name_en: 'AVERSION', name_ko: '기피', intensity: 2, description: '피하고 싶은 느낌' },
      { id: 3, name_en: 'DISTASTE', name_ko: '불쾌', intensity: 3, description: '불쾌함' },
      { id: 4, name_en: 'REPUGNANCE', name_ko: '역겨움', intensity: 4, description: '강한 반감' },
      { id: 5, name_en: 'REVULSION', name_ko: '구역질', intensity: 5, description: '신체적 거부 반응' },
      { id: 6, name_en: 'ABHORRENCE', name_ko: '증오', intensity: 6, description: '극도의 혐오' },
      { id: 7, name_en: 'LOATHING', name_ko: '혐오감', intensity: 7, description: '깊은 혐오와 경멸' }
    ],
    // 심리학: 뒤틀리고 비대칭적인 형태 - 불쾌감과 회피 반응 유발
    // 강도가 높아질수록 비대칭성과 왜곡 증가
    generatePath: (width, height) => {
      const baseY = height - 60;
      const peaks = [
        { x: width * 0.10, peakY: baseY - 85, distortion: 0.1 },
        { x: width * 0.22, peakY: baseY - 145, distortion: 0.15 },
        { x: width * 0.34, peakY: baseY - 210, distortion: 0.2 },
        { x: width * 0.46, peakY: baseY - 290, distortion: 0.25 },
        { x: width * 0.59, peakY: baseY - 380, distortion: 0.3 },
        { x: width * 0.73, peakY: baseY - 480, distortion: 0.35 },
        { x: width * 0.89, peakY: baseY - 600, distortion: 0.4 }
      ];
      return peaks.map((peak, i) => {
        const spread = 50 + i * 10;
        const d = peak.distortion;
        // 비대칭적으로 기울어지고 뒤틀린 형태
        const leftSpread = spread * (1 + d * 0.5);
        const rightSpread = spread * (1 - d * 0.3);
        const peakOffset = spread * d * 0.3;
        const mid1 = peak.peakY + (baseY - peak.peakY) * 0.35;
        const mid2 = peak.peakY + (baseY - peak.peakY) * 0.55;

        return {
          path: `M ${peak.x - leftSpread},${baseY}
                 Q ${peak.x - leftSpread * 0.6},${mid1 + d * 40} ${peak.x - leftSpread * 0.2},${peak.peakY + d * 30}
                 L ${peak.x + peakOffset},${peak.peakY}
                 Q ${peak.x + rightSpread * 0.3},${peak.peakY + d * 50} ${peak.x + rightSpread * 0.6},${mid2 - d * 20}
                 L ${peak.x + rightSpread},${baseY} Z`,
          labelX: peak.x + peakOffset * 0.5,
          labelY: peak.peakY - 20
        };
      });
    }
  },
  sadness: {
    name_ko: '슬픔',
    name_en: 'SADNESS',
    description_ko: '슬픔은 상실이나 실망에 대한 반응입니다. 아래로 처진 곡선은 무거움과 낮은 에너지를 표현합니다.',
    color: '#6B9DC4',
    colorLight: '#A8C8E0',
    colorDark: '#4A7A9E',
    states: [
      { id: 1, name_en: 'DISAPPOINTMENT', name_ko: '실망', intensity: 1, description: '기대가 충족되지 않음' },
      { id: 2, name_en: 'DISCOURAGEMENT', name_ko: '낙담', intensity: 2, description: '자신감 상실' },
      { id: 3, name_en: 'DISTRAUGHT', name_ko: '비탄', intensity: 3, description: '매우 걱정되는 상태' },
      { id: 4, name_en: 'RESIGNATION', name_ko: '체념', intensity: 4, description: '포기의 느낌' },
      { id: 5, name_en: 'HELPLESSNESS', name_ko: '무력감', intensity: 5, description: '어떻게 할 수 없다는 느낌' },
      { id: 6, name_en: 'MISERY', name_ko: '비참함', intensity: 6, description: '극심한 불행' },
      { id: 7, name_en: 'DESPAIR', name_ko: '절망', intensity: 7, description: '희망의 완전한 상실' }
    ],
    // 심리학: 아래로 처진 곡선 - 무거움, 낮은 에너지, 우울함 전달
    // 강도가 높아질수록 처짐과 무게감 증가
    generatePath: (width, height) => {
      const baseY = height - 60;
      const peaks = [
        { x: width * 0.12, peakY: baseY - 80, droop: 0.2 },
        { x: width * 0.25, peakY: baseY - 140, droop: 0.25 },
        { x: width * 0.38, peakY: baseY - 210, droop: 0.3 },
        { x: width * 0.51, peakY: baseY - 290, droop: 0.35 },
        { x: width * 0.64, peakY: baseY - 380, droop: 0.4 },
        { x: width * 0.78, peakY: baseY - 480, droop: 0.45 },
        { x: width * 0.93, peakY: baseY - 590, droop: 0.5 }
      ];
      return peaks.map((peak, i) => {
        const spread = 55 + i * 8;
        const droopAmount = (baseY - peak.peakY) * peak.droop;
        // 아래로 처진 부드러운 곡선 - 어깨가 축 처진 형태
        const shoulderY = peak.peakY + droopAmount * 0.3;

        return {
          path: `M ${peak.x - spread},${baseY}
                 C ${peak.x - spread * 0.8},${baseY - 20}
                   ${peak.x - spread * 0.5},${shoulderY + droopAmount}
                   ${peak.x - spread * 0.2},${shoulderY}
                 Q ${peak.x},${peak.peakY}
                   ${peak.x + spread * 0.2},${shoulderY}
                 C ${peak.x + spread * 0.5},${shoulderY + droopAmount}
                   ${peak.x + spread * 0.8},${baseY - 20}
                   ${peak.x + spread},${baseY} Z`,
          labelX: peak.x,
          labelY: peak.peakY - 18
        };
      });
    }
  },
  enjoyment: {
    name_ko: '즐거움',
    name_en: 'ENJOYMENT',
    description_ko: '즐거움은 긍정적인 경험에 대한 반응입니다. 둥근 곡선은 안전, 조화, 긍정적 감정을 전달합니다.',
    color: '#E8C547',
    colorLight: '#F5E08A',
    colorDark: '#C9A830',
    states: [
      { id: 1, name_en: 'SENSORY PLEASURE', name_ko: '감각적 즐거움', intensity: 1, description: '감각을 통한 즐거움' },
      { id: 2, name_en: 'REJOICING', name_ko: '기쁨', intensity: 2, description: '좋은 일에 대한 기쁨' },
      { id: 3, name_en: 'COMPASSION', name_ko: '연민', intensity: 3, description: '타인의 고통에 대한 공감' },
      { id: 4, name_en: 'AMUSEMENT', name_ko: '재미', intensity: 4, description: '재미있는 것에 대한 반응' },
      { id: 5, name_en: 'SCHADENFREUDE', name_ko: '남의 불행을 즐김', intensity: 5, description: '타인의 불행에서 느끼는 기쁨' },
      { id: 6, name_en: 'RELIEF', name_ko: '안도감', intensity: 6, description: '걱정이 사라진 후의 느낌' },
      { id: 7, name_en: 'PEACE', name_ko: '평화', intensity: 7, description: '내적 고요함' },
      { id: 8, name_en: 'PRIDE', name_ko: '자부심', intensity: 8, description: '성취에 대한 만족' },
      { id: 9, name_en: 'FIERO', name_ko: '성취감', intensity: 9, description: '어려운 과제 달성의 기쁨' },
      { id: 10, name_en: 'ECSTASY', name_ko: '황홀경', intensity: 10, description: '압도적인 기쁨' }
    ],
    // 심리학: 둥근 원형과 부드러운 곡선 - 안전, 조화, 완성, 긍정적 감정 전달
    // 부드럽고 위협적이지 않은 형태
    generatePath: (width, height) => {
      const baseY = height - 60;
      const peaks = [
        { x: width * 0.06, peakY: baseY - 55 },
        { x: width * 0.14, peakY: baseY - 90 },
        { x: width * 0.23, peakY: baseY - 135 },
        { x: width * 0.33, peakY: baseY - 185 },
        { x: width * 0.43, peakY: baseY - 245 },
        { x: width * 0.53, peakY: baseY - 310 },
        { x: width * 0.63, peakY: baseY - 380 },
        { x: width * 0.73, peakY: baseY - 455 },
        { x: width * 0.84, peakY: baseY - 535 },
        { x: width * 0.95, peakY: baseY - 620 }
      ];
      return peaks.map((peak, i) => {
        const spread = 32 + i * 4;
        // 완전히 둥근 언덕 형태 - 원형에 가까운 곡선
        return {
          path: `M ${peak.x - spread},${baseY}
                 C ${peak.x - spread},${peak.peakY + (baseY - peak.peakY) * 0.3}
                   ${peak.x - spread * 0.4},${peak.peakY}
                   ${peak.x},${peak.peakY}
                 C ${peak.x + spread * 0.4},${peak.peakY}
                   ${peak.x + spread},${peak.peakY + (baseY - peak.peakY) * 0.3}
                   ${peak.x + spread},${baseY} Z`,
          labelX: peak.x,
          labelY: peak.peakY - 15
        };
      });
    }
  }
};

const Experience = ({ selectedEmotion }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // 기본 감정 또는 선택된 감정
  const emotionKey = selectedEmotion || 'enjoyment';
  const emotionInfo = mountainData[emotionKey] || mountainData.enjoyment;
  const currentEmotion = emotions[emotionKey] || emotions.enjoyment;

  // SVG 크기
  const svgWidth = 950;
  const svgHeight = 700;

  // 산봉우리 경로 생성
  const mountainPaths = emotionInfo.generatePath(svgWidth, svgHeight);

  // 레이블 형식: 한글 (영어)
  const formatLabel = (state) => {
    return {
      korean: state.name_ko,
      english: state.name_en
    };
  };

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col lg:flex-row">
      {/* 왼쪽 사이드바 */}
      <motion.div
        className="lg:w-[340px] bg-[#FAFAFA] p-6 lg:p-10 flex flex-col border-r border-gray-200"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="flex-1">
          <h2 className="text-2xl lg:text-3xl font-serif font-medium text-[#1a1a1a] mb-2 pb-3 border-b-2 border-[#1a1a1a]">
            우리의 경험
          </h2>
          <p className="text-[#555] text-sm lg:text-base mb-6 mt-4 leading-relaxed">
            하나의 감정 안에서 다양한 상태와 강도를 탐험합니다.
            각 감정의 시각적 형태는 이미지 심리학 연구를 기반으로 디자인되었습니다.
          </p>

          <h3 className="text-sm lg:text-base font-bold text-[#1a1a1a] tracking-wider mb-3 uppercase">
            {emotionInfo.name_ko} ({emotionInfo.name_en})의 상태
          </h3>

          <p className="text-[#666] text-sm leading-relaxed mb-6">
            {emotionInfo.description_ko}
          </p>

          <p className="text-[#888] text-sm italic">
            산봉우리를 클릭하여 각 상태에 대해 알아보세요.
          </p>

          {/* 현재 감정 표시 */}
          <div className="mt-8 flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full shadow-lg"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${emotionInfo.colorLight}, ${emotionInfo.color})`
              }}
            />
            <div>
              <p className="font-medium text-[#1a1a1a] text-lg">{emotionInfo.name_ko}</p>
              <p className="text-xs text-[#888] uppercase tracking-wider">{emotionInfo.name_en}</p>
            </div>
          </div>

          {/* 심리학적 설명 */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <p className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-2">시각 심리학</p>
            <p className="text-sm text-[#555] leading-relaxed">
              {emotionKey === 'anger' && '뾰족한 삼각형은 위협과 공격성을 전달합니다.'}
              {emotionKey === 'fear' && '불규칙한 형태는 예측 불가능성과 불안을 표현합니다.'}
              {emotionKey === 'disgust' && '비대칭적 왜곡은 불쾌감과 회피 반응을 유발합니다.'}
              {emotionKey === 'sadness' && '처진 곡선은 무거움과 낮은 에너지를 표현합니다.'}
              {emotionKey === 'enjoyment' && '둥근 곡선은 안전과 조화로운 감정을 전달합니다.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="mt-6 px-6 py-3 border-2 border-[#1a1a1a] text-[#1a1a1a] font-medium hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 rounded-lg"
        >
          더 알아보기 →
        </button>
      </motion.div>

      {/* 시각화 영역 */}
      <motion.div
        className="flex-1 flex items-center justify-center p-4 lg:p-8 bg-[#F5F5F5] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[75vh]"
          style={{ maxWidth: '950px' }}
        >
          {/* 그라데이션 정의 */}
          <defs>
            {/* 기본 그라데이션 */}
            <linearGradient id={`mountain-gradient-${emotionKey}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={emotionInfo.colorDark || emotionInfo.color} stopOpacity="0.4" />
              <stop offset="30%" stopColor={emotionInfo.color} stopOpacity="0.6" />
              <stop offset="60%" stopColor={emotionInfo.color} stopOpacity="0.8" />
              <stop offset="85%" stopColor={emotionInfo.colorLight} stopOpacity="0.9" />
              <stop offset="100%" stopColor={emotionInfo.colorLight} stopOpacity="1" />
            </linearGradient>

            {/* 호버 시 밝은 그라데이션 */}
            <linearGradient id={`mountain-gradient-hover-${emotionKey}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={emotionInfo.color} stopOpacity="0.6" />
              <stop offset="40%" stopColor={emotionInfo.color} stopOpacity="0.85" />
              <stop offset="70%" stopColor={emotionInfo.colorLight} stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>

            {/* 그림자 필터 */}
            <filter id="mountainShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="4" stdDeviation="6" floodOpacity="0.2"/>
            </filter>

            {/* 호버 시 강한 그림자 */}
            <filter id="mountainShadowHover" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="6" stdDeviation="10" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* 배경 그리드 라인 (선택적) */}
          <g opacity="0.1">
            {[1, 2, 3, 4, 5].map((i) => (
              <line
                key={i}
                x1="50"
                y1={svgHeight - 60 - i * 100}
                x2={svgWidth - 50}
                y2={svgHeight - 60 - i * 100}
                stroke="#999"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            ))}
          </g>

          {/* X축 */}
          <line
            x1="40"
            y1={svgHeight - 50}
            x2={svgWidth - 40}
            y2={svgHeight - 50}
            stroke="#bbb"
            strokeWidth="2"
          />

          {/* 축 레이블 */}
          <text x="50" y={svgHeight - 20} fill="#666" fontSize="13" fontWeight="500">
            낮은 강도
          </text>
          <text x={svgWidth - 130} y={svgHeight - 20} fill="#666" fontSize="13" fontWeight="500">
            높은 강도
          </text>

          {/* 산봉우리들 */}
          {mountainPaths.map((mountain, index) => {
            const state = emotionInfo.states[index];
            const isHovered = hoveredState === index;
            const isSelected = selectedState === index;
            const label = state ? formatLabel(state) : null;

            return (
              <g key={index}>
                <motion.path
                  d={mountain.path}
                  fill={isHovered || isSelected
                    ? `url(#mountain-gradient-hover-${emotionKey})`
                    : `url(#mountain-gradient-${emotionKey})`
                  }
                  stroke={isHovered || isSelected ? emotionInfo.colorDark || emotionInfo.color : emotionInfo.color}
                  strokeWidth={isHovered || isSelected ? "2.5" : "1.5"}
                  filter={isHovered || isSelected ? "url(#mountainShadowHover)" : "url(#mountainShadow)"}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? {
                    opacity: hoveredState !== null && !isHovered ? 0.35 : 1,
                    scaleY: 1
                  } : {}}
                  transition={{
                    delay: index * 0.07,
                    duration: 0.6,
                    opacity: { duration: 0.2 }
                  }}
                  style={{
                    transformOrigin: 'bottom',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={() => setHoveredState(index)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => setSelectedState(isSelected ? null : index)}
                />

                {/* 상태 레이블 - 한글(영어) 형식 */}
                {label && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={isInView ? {
                      opacity: hoveredState === null || isHovered ? 1 : 0.25
                    } : {}}
                    transition={{ delay: index * 0.07 + 0.4 }}
                    style={{ pointerEvents: 'none' }}
                  >
                    {/* 한글 레이블 */}
                    <text
                      x={mountain.labelX}
                      y={mountain.labelY - 12}
                      fill={isHovered ? emotionInfo.colorDark || emotionInfo.color : emotionInfo.color}
                      fontSize={isHovered ? "13" : "11"}
                      fontWeight="700"
                      textAnchor="middle"
                      style={{ letterSpacing: '0.5px' }}
                    >
                      {label.korean}
                    </text>
                    {/* 영어 레이블 */}
                    <text
                      x={mountain.labelX}
                      y={mountain.labelY + 3}
                      fill={isHovered ? emotionInfo.color : "#888"}
                      fontSize={isHovered ? "9" : "8"}
                      fontWeight="500"
                      textAnchor="middle"
                      style={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px'
                      }}
                    >
                      ({label.english})
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* 상태 상세 팝업 */}
      <AnimatePresence>
        {selectedState !== null && emotionInfo.states[selectedState] && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedState(null)}
            />
            <motion.div
              className="relative bg-white rounded-2xl p-6 lg:p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              style={{ borderTop: `5px solid ${emotionInfo.color}` }}
            >
              <button
                onClick={() => setSelectedState(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${emotionInfo.colorLight}, ${emotionInfo.color})`
                  }}
                >
                  {selectedState + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a1a]">
                    {emotionInfo.states[selectedState].name_ko}
                  </h3>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    ({emotionInfo.states[selectedState].name_en})
                  </p>
                </div>
              </div>

              {/* 강도 표시 */}
              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-2 font-medium">강도</p>
                <div className="flex gap-1">
                  {[...Array(emotionInfo.states.length)].map((_, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-full flex-1 transition-all duration-300"
                      style={{
                        backgroundColor: i <= selectedState ? emotionInfo.color : '#e5e5e5',
                        opacity: i <= selectedState ? 1 - (selectedState - i) * 0.08 : 1
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-base">
                {emotionInfo.states[selectedState].description}
              </p>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: emotionInfo.color }}
                  />
                  {emotionInfo.name_ko} ({emotionInfo.name_en}) 감정의 {selectedState + 1}번째 상태
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Learn More 사이드바 */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-full sm:w-[440px] bg-white z-50 overflow-y-auto shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 lg:p-8">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${emotionInfo.colorLight}, ${emotionInfo.color})`
                    }}
                  />
                  <div>
                    <h2 className="text-2xl font-serif font-medium">
                      {emotionInfo.name_ko}
                    </h2>
                    <p className="text-sm text-gray-500 uppercase">{emotionInfo.name_en}</p>
                  </div>
                </div>

                <div className="h-px bg-gray-200 mb-6" />

                <p className="text-gray-600 leading-relaxed mb-6">
                  {emotionInfo.description_ko}
                </p>

                <h3 className="font-bold text-[#1a1a1a] mb-4 uppercase tracking-wide text-sm">
                  {emotionInfo.states.length}가지 상태
                </h3>

                <div className="space-y-2">
                  {emotionInfo.states.map((state, index) => (
                    <div
                      key={state.id}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100"
                      onClick={() => {
                        setSelectedState(index);
                        setSidebarOpen(false);
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${emotionInfo.colorLight}, ${emotionInfo.color})`
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#1a1a1a]">{state.name_ko}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">({state.name_en})</p>
                        <p className="text-sm text-gray-500">{state.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
