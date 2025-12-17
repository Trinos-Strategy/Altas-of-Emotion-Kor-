import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { emotions, emotionOrder, emotionTriggersResponses } from '../data/emotions';

// ============================================
// 깔끔한 Timeline 페이지 - Premium Design
// ============================================

// HOW DOES THIS HAPPEN 모달
const HowDoesThisHappenModal = ({ isOpen, onClose, emotion }) => {
  const timelineStepsData = [
    {
      id: 1,
      name_ko: "사전 조건",
      name_en: "PRE-CONDITION",
      description_ko: "감정에 영향을 미치는 상황이나 맥락입니다. 과거 경험, 현재 기분, 성격 특성, 신체 상태 등이 포함됩니다. 이러한 요소들이 다음에 오는 자극에 대한 우리의 반응 방식을 형성합니다.",
      icon: "🎯",
      bgColor: "#f8fafc"
    },
    {
      id: 2,
      name_ko: "이벤트",
      name_en: "EVENT",
      description_ko: "외부 또는 내부에서 마주치는 사람, 장소, 상황, 이미지, 생각 등입니다. 세상에서 무언가가 일어나거나 우리 마음속에서 생각이 떠오릅니다.",
      icon: "⚡",
      bgColor: "#fef3c7"
    },
    {
      id: 3,
      name_ko: "트리거",
      name_en: "TRIGGER",
      description_ko: "자동 평가 시스템이 데이터베이스의 감정 스크립트와 일치하는 조합을 찾을 때 발생합니다. 이 평가는 밀리초 단위로 무의식적으로 일어납니다.",
      icon: "🔥",
      bgColor: "emotion"
    },
    {
      id: 4,
      name_ko: "지각 데이터베이스",
      name_en: "PERCEPTION DATABASE",
      description_ko: "보편적 감정 기억(진화를 통해 물려받은 것)과 개인적 경험(학습된 것)이 저장된 곳입니다. 이 데이터베이스는 의식적으로 접근할 수 없습니다.",
      icon: "🧠",
      bgColor: "#e0e7ff"
    },
    {
      id: 5,
      name_ko: "신체적 변화",
      name_en: "PHYSICAL CHANGES",
      description_ko: "얼굴의 열감, 턱이나 어깨의 긴장, 심박수 증가, 호흡 변화 등 자율신경계의 반응입니다. 이러한 변화는 자동으로 일어나며 의식적으로 통제하기 어렵습니다.",
      icon: "💓",
      bgColor: "#fce7f3"
    },
    {
      id: 6,
      name_ko: "상태",
      name_en: "STATE",
      description_ko: "신체적, 심리적 변화를 포함한 감정 자체입니다. 이 상태는 몇 초에서 몇 분까지 지속될 수 있으며, 강도에 따라 다양한 형태로 경험됩니다.",
      icon: "🌀",
      bgColor: "emotion"
    },
    {
      id: 7,
      name_ko: "심리적 변화",
      name_en: "PSYCHOLOGICAL CHANGES",
      description_ko: "감정의 질적 경험입니다. 특정 감정에 대한 주관적 느낌, 생각의 변화, 주의 집중의 변화 등이 포함됩니다.",
      icon: "🎭",
      bgColor: "#dbeafe"
    },
    {
      id: 8,
      name_ko: "행동",
      name_en: "ACTION",
      description_ko: "감정적 반응으로, 건설적(도움이 되는) 또는 파괴적(해로운) 형태로 나타날 수 있습니다. 본능적 반응과 의도적 반응으로 구분됩니다.",
      icon: "⚔️",
      bgColor: "emotion"
    },
    {
      id: 9,
      name_ko: "사후 조건",
      name_en: "POST-CONDITION",
      description_ko: "감정 행동의 결과와 영향입니다. 이는 다음 감정 에피소드의 사전 조건이 될 수 있으며, 관계와 상황에 지속적인 영향을 미칩니다.",
      icon: "🔄",
      bgColor: "#f0fdf4"
    },
    {
      id: 10,
      name_ko: "선택적 필터 기간",
      name_en: "SELECTIVE FILTER PERIOD",
      description_ko: "행동 시작과 함께 개시되는 선택적 필터링 기간입니다. 이 기간 동안 우리는 현재 감정과 일치하는 정보만 받아들이고, 다른 정보는 걸러냅니다.",
      icon: "🔍",
      bgColor: "#fef9c3"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-8 py-6 border-b bg-white/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                어떻게 이런 일이 일어나는가?
              </h2>
              <p className="text-gray-500 mt-1 text-lg">(How Does This Happen?)</p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
            감정 에피소드는 일련의 단계를 거쳐 진행됩니다. 각 단계를 이해하면 감정이 어떻게 발생하고 전개되는지 알 수 있습니다.
          </p>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {timelineStepsData.map((step, index) => (
              <motion.div
                key={step.id}
                className="p-6 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: step.bgColor === 'emotion' ? `${emotion?.color}15` : step.bgColor
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
                    style={{
                      backgroundColor: step.bgColor === 'emotion' ? emotion?.color : '#fff',
                      color: step.bgColor === 'emotion' ? '#fff' : '#333'
                    }}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        STEP {step.id}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {step.name_ko}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">({step.name_en})</p>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description_ko}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Insight */}
          <div
            className="mt-12 p-8 rounded-3xl text-center"
            style={{ backgroundColor: `${emotion?.color}10`, border: `2px solid ${emotion?.color}30` }}
          >
            <h4 className="text-2xl font-bold mb-4" style={{ color: emotion?.color }}>
              💡 핵심 통찰 (Key Insight)
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              감정은 우리가 선택하는 것이 아닙니다. 트리거는 자동으로 발생하며, 우리는 그 순간 감정을 경험합니다.
              하지만 <strong style={{ color: emotion?.color }}>반응은 선택할 수 있습니다.</strong> 자동적인 본능 반응과 의도적인 행동 사이에서
              선택할 수 있는 공간이 있으며, 이 공간을 인식하는 것이 감정 지능의 핵심입니다.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Triggers & Responses 모달
const TriggersResponsesModal = ({ isOpen, onClose, emotion, emotionData }) => {
  if (!isOpen || !emotionData) return null;

  const getActionColor = (type) => {
    switch (type) {
      case 'constructive': return '#22c55e';
      case 'destructive': return '#ef4444';
      case 'ambiguous': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-8 py-6 text-white"
          style={{ background: `linear-gradient(135deg, ${emotion.color}, ${emotion.colorDark || emotion.color})` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">트리거와 반응 (Triggers & Responses)</h2>
              <p className="opacity-80 mt-1">{emotion.name_ko} ({emotion.name_en})</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Triggers */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                  style={{ backgroundColor: emotion.color }}>⚡</span>
                트리거 (Triggers)
              </h3>
              <div className="space-y-3">
                {emotionData.triggers?.map((trigger, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <p className="text-gray-800 font-medium">{trigger.text_ko}</p>
                    <p className="text-gray-400 text-sm mt-1">({trigger.text_en})</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Responses */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                  style={{ backgroundColor: emotion.color }}>⚔️</span>
                반응 (Responses)
              </h3>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                  본능적 반응 (Intrinsic Actions)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {emotionData.intrinsicActions?.map((action, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-md"
                      style={{ backgroundColor: getActionColor(action.type) }}
                    >
                      {action.text_ko}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                  의도적 반응 (Intentional Actions)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {emotionData.intentionalActions?.map((action, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-md"
                      style={{ backgroundColor: getActionColor(action.type) }}
                    >
                      {action.text_ko}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
            <p className="text-sm font-bold text-gray-700 mb-4">색상 범례 (Color Legend):</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-500"></span>
                <span className="text-gray-600">건설적 (Constructive)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-500"></span>
                <span className="text-gray-600">파괴적 (Destructive)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500"></span>
                <span className="text-gray-600">상황에 따라 다름 (Ambiguous)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Signal & Message 모달
const SignalMessageModal = ({ isOpen, onClose, emotion, emotionData }) => {
  if (!isOpen || !emotionData) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 text-white"
          style={{ background: `linear-gradient(135deg, ${emotion.color}, ${emotion.colorDark || emotion.color})` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">신호와 메시지</h2>
              <p className="opacity-80 mt-1">(Signal & Message) - {emotion.name_ko}</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-xl">✕</button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Signal */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${emotion.color}20` }}>👁️</span>
              <h3 className="text-xl font-bold text-gray-900">신호 (Signal)</h3>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">{emotionData.signal?.text_ko}</p>
            <p className="text-gray-400 mt-2">({emotionData.signal?.text_en})</p>
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${emotion.color}20` }}>💬</span>
              <h3 className="text-xl font-bold text-gray-900">메시지 (Message)</h3>
            </div>
            <div className="p-6 rounded-2xl text-center" style={{ backgroundColor: `${emotion.color}15` }}>
              <p className="text-2xl font-bold" style={{ color: emotion.color }}>
                "{emotionData.message?.text_ko}"
              </p>
              <p className="text-gray-500 mt-2">"{emotionData.message?.text_en}"</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Moods 모달
const MoodsModal = ({ isOpen, onClose, emotion }) => {
  if (!isOpen) return null;

  const moodsData = {
    anger: { mood_ko: "짜증나는", mood_en: "Irritable", trait_ko: "적대적인", trait_en: "Hostile" },
    fear: { mood_ko: "불안한", mood_en: "Apprehensive", trait_ko: "소심한", trait_en: "Timid" },
    disgust: { mood_ko: "까다로운", mood_en: "Sour", trait_ko: "예민한", trait_en: "Squeamish" },
    sadness: { mood_ko: "우울한", mood_en: "Dysphoric", trait_ko: "비관적인", trait_en: "Pessimistic" },
    enjoyment: { mood_ko: "들뜬", mood_en: "Elated", trait_ko: "낙관적인", trait_en: "Optimistic" }
  };

  const psychopathologyData = {
    anger: [
      { name_ko: "간헐적 폭발 장애", name_en: "Intermittent Explosive Disorder" },
      { name_ko: "만성 적대감", name_en: "Chronic Hostility" }
    ],
    fear: [
      { name_ko: "사회불안장애", name_en: "Social Anxiety Disorder" },
      { name_ko: "외상 후 스트레스 장애", name_en: "PTSD" },
      { name_ko: "공황장애", name_en: "Panic Disorder" }
    ],
    disgust: [
      { name_ko: "신경성 식욕부진증", name_en: "Anorexia Nervosa" },
      { name_ko: "강박장애 (오염)", name_en: "OCD (Contamination)" }
    ],
    sadness: [
      { name_ko: "주요우울장애", name_en: "Major Depressive Disorder" },
      { name_ko: "지속성우울장애", name_en: "Persistent Depressive Disorder" }
    ],
    enjoyment: [
      { name_ko: "조증/조증 삽화", name_en: "Mania/Manic Episode" }
    ]
  };

  const currentMood = moodsData[emotion?.id];
  const currentPsychopathology = psychopathologyData[emotion?.id] || [];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="px-8 py-6 text-white"
          style={{ background: `linear-gradient(135deg, ${emotion?.color}, ${emotion?.colorDark || emotion?.color})` }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">기분, 성격, 정신병리</h2>
              <p className="opacity-80 mt-1">(Moods, Personality & Psychopathology)</p>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-xl">✕</button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Mood */}
          <div className="p-6 rounded-2xl" style={{ backgroundColor: `${emotion?.color}10` }}>
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">🌡️</span>
              기분 (Mood)
            </h3>
            <p className="text-xl font-bold" style={{ color: emotion?.color }}>
              {currentMood?.mood_ko} ({currentMood?.mood_en})
            </p>
          </div>

          {/* Personality */}
          <div className="p-6 rounded-2xl bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-2xl">🎭</span>
              성격 특성 (Personality Trait)
            </h3>
            <p className="text-xl font-bold text-gray-700">
              {currentMood?.trait_ko} ({currentMood?.trait_en})
            </p>
          </div>

          {/* Psychopathology */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🩺</span>
              정신병리학 (Psychopathology)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentPsychopathology.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200">
                  <p className="font-bold text-gray-900">{item.name_ko}</p>
                  <p className="text-sm text-gray-500">({item.name_en})</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>참고:</strong> 이 정보는 교육 목적으로 제공됩니다. 정신 건강 문제가 있다고 생각되면 전문가와 상담하세요.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// 메인 Timeline 컴포넌트
// ============================================
const Timeline = ({ selectedEmotion }) => {
  const [currentEmotionIndex, setCurrentEmotionIndex] = useState(0);
  const [showHowModal, setShowHowModal] = useState(false);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [showTriggersModal, setShowTriggersModal] = useState(false);
  const [showMoodsModal, setShowMoodsModal] = useState(false);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // 자동 감정 순환
  useEffect(() => {
    if (selectedEmotion) return;
    const interval = setInterval(() => {
      setCurrentEmotionIndex((prev) => (prev + 1) % emotionOrder.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedEmotion]);

  const activeEmotionId = selectedEmotion || emotionOrder[currentEmotionIndex];
  const emotion = emotions[activeEmotionId] || emotions.anger;
  const emotionData = emotionTriggersResponses?.[activeEmotionId] || emotionTriggersResponses?.anger;

  const timelineSteps = [
    { id: 1, name_ko: '사전 조건', name_en: 'PRE-CONDITION', icon: '🎯', desc: '과거 경험, 기분, 성격' },
    { id: 2, name_ko: '이벤트', name_en: 'EVENT', icon: '⚡', desc: '외부/내부 자극' },
    { id: 3, name_ko: '트리거', name_en: 'TRIGGER', icon: '🔥', desc: '자동 평가 매칭' },
    { id: 4, name_ko: '경험', name_en: 'EXPERIENCE', icon: '🌀', desc: '신체적/심리적 변화' },
    { id: 5, name_ko: '반응', name_en: 'RESPONSE', icon: '⚔️', desc: '건설적/파괴적 행동' }
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 px-4 md:px-8"
      style={{ backgroundColor: '#fafafa' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block px-6 py-2 rounded-full text-sm font-bold mb-6"
            style={{ backgroundColor: `${emotion.color}20`, color: emotion.color }}
          >
            EMOTIONAL EPISODE TIMELINE
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            감정 에피소드 타임라인
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            감정적 경험은 일련의 단계를 거칩니다.<br />
            각 단계를 이해하면 감정에 대한 더 큰 통제력을 얻을 수 있습니다.
          </p>

          {/* Learn More CTA */}
          <motion.button
            onClick={() => setShowHowModal(true)}
            className="mt-8 px-8 py-4 rounded-full font-bold text-white text-lg shadow-xl hover:shadow-2xl transition-all"
            style={{
              background: `linear-gradient(135deg, ${emotion.color}, ${emotion.colorDark || emotion.color})`
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            🔍 어떻게 이런 일이 일어나는가? (Learn More)
          </motion.button>
        </motion.div>

        {/* 5-Step Timeline - 가로 플로우차트 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Desktop - 가로 타임라인 */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${emotion.colorLight || emotion.color}50, ${emotion.color}, ${emotion.colorLight || emotion.color}50)` }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>

              {/* Steps */}
              <div className="relative flex justify-between items-center py-16">
                {timelineSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="flex flex-col items-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {/* Step Badge */}
                    <div className="absolute -top-10 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Step {step.id}
                    </div>

                    {/* Card */}
                    <motion.div
                      className="w-40 h-40 rounded-3xl flex flex-col items-center justify-center text-center p-4 bg-white border-2 border-gray-100 shadow-xl cursor-pointer"
                      whileHover={{
                        scale: 1.1,
                        y: -10,
                        boxShadow: `0 25px 50px -12px ${emotion.color}40`
                      }}
                      style={{
                        borderColor: index === 2 || index === 3 ? emotion.color : '#e5e5e5'
                      }}
                    >
                      <span className="text-4xl mb-2">{step.icon}</span>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        {step.name_en}
                      </span>
                      <span className="text-lg font-bold text-gray-900 mt-1">
                        {step.name_ko}
                      </span>
                    </motion.div>

                    {/* Description */}
                    <p className="mt-4 text-sm text-gray-500 text-center max-w-[140px]">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile - 세로 타임라인 */}
          <div className="lg:hidden space-y-4">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    backgroundColor: index === 2 || index === 3 ? emotion.color : '#f3f4f6',
                    color: index === 2 || index === 3 ? '#fff' : '#333'
                  }}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">Step {step.id}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{step.name_en}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">{step.name_ko}</h4>
                  <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Emotion Display */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="inline-block px-10 py-6 rounded-3xl shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${emotion.color}, ${emotion.colorDark || emotion.color})`,
              boxShadow: `0 20px 60px -10px ${emotion.color}60`
            }}
          >
            <p className="text-white/80 text-sm font-medium mb-1">현재 감정</p>
            <h3 className="text-4xl font-bold text-white">{emotion.name_ko}</h3>
            <p className="text-white/70 text-sm mt-1">({emotion.name_en})</p>
          </div>

          {/* Emotion Selector */}
          {!selectedEmotion && (
            <div className="flex justify-center gap-3 mt-8">
              {emotionOrder.map((id, index) => (
                <motion.button
                  key={id}
                  onClick={() => setCurrentEmotionIndex(index)}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-sm transition-all"
                  style={{
                    backgroundColor: index === currentEmotionIndex ? emotions[id].color : '#f3f4f6',
                    color: index === currentEmotionIndex ? '#fff' : emotions[id].color,
                    boxShadow: index === currentEmotionIndex ? `0 8px 25px -5px ${emotions[id].color}60` : 'none'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {emotions[id].name_ko.charAt(0)}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Learn More Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { title: '신호와 메시지', subtitle: 'Signal & Message', icon: '👁️', onClick: () => setShowSignalModal(true) },
            { title: '트리거와 반응', subtitle: 'Triggers & Responses', icon: '⚡', onClick: () => setShowTriggersModal(true) },
            { title: '기분과 정신병리', subtitle: 'Moods & Psychopathology', icon: '🧠', onClick: () => setShowMoodsModal(true) },
            { title: '어떻게 이런 일이?', subtitle: 'How Does This Happen?', icon: '❓', onClick: () => setShowHowModal(true) }
          ].map((card, index) => (
            <motion.button
              key={index}
              onClick={card.onClick}
              className="p-8 bg-white rounded-3xl shadow-lg border-2 border-gray-100 hover:border-gray-200 text-left transition-all group"
              whileHover={{ y: -8, boxShadow: `0 20px 40px -10px ${emotion.color}30` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5"
                style={{ backgroundColor: `${emotion.color}15` }}
              >
                {card.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">{card.title}</h4>
              <p className="text-gray-400 text-sm mb-4">({card.subtitle})</p>
              <span className="text-sm font-bold group-hover:underline" style={{ color: emotion.color }}>
                더 알아보기 →
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Triggers Preview */}
          <div className="p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: emotion.color, color: '#fff' }}>⚡</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{emotion.name_ko}의 트리거</h3>
                <p className="text-gray-400 text-sm">(Triggers of {emotion.name_en})</p>
              </div>
            </div>
            <ul className="space-y-3">
              {emotionData?.triggers?.slice(0, 4).map((trigger, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: emotion.color }} />
                  <span className="text-gray-600">{trigger.text_ko}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowTriggersModal(true)}
              className="mt-6 text-sm font-bold hover:underline"
              style={{ color: emotion.color }}
            >
              모든 트리거 보기 →
            </button>
          </div>

          {/* Signal & Message Preview */}
          <div className="p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: emotion.color, color: '#fff' }}>💬</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">신호와 메시지</h3>
                <p className="text-gray-400 text-sm">(Signal & Message)</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">신호 (Signal)</p>
              <p className="text-gray-600">{emotionData?.signal?.text_ko}</p>
            </div>

            <div className="p-5 rounded-2xl text-center" style={{ backgroundColor: `${emotion.color}10` }}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">메시지 (Message)</p>
              <p className="text-xl font-bold" style={{ color: emotion.color }}>
                "{emotionData?.message?.text_ko}"
              </p>
            </div>

            <button
              onClick={() => setShowSignalModal(true)}
              className="mt-6 text-sm font-bold hover:underline"
              style={{ color: emotion.color }}
            >
              자세히 보기 →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showHowModal && <HowDoesThisHappenModal isOpen={showHowModal} onClose={() => setShowHowModal(false)} emotion={emotion} />}
        {showSignalModal && <SignalMessageModal isOpen={showSignalModal} onClose={() => setShowSignalModal(false)} emotion={emotion} emotionData={emotionData} />}
        {showTriggersModal && <TriggersResponsesModal isOpen={showTriggersModal} onClose={() => setShowTriggersModal(false)} emotion={emotion} emotionData={emotionData} />}
        {showMoodsModal && <MoodsModal isOpen={showMoodsModal} onClose={() => setShowMoodsModal(false)} emotion={emotion} />}
      </AnimatePresence>
    </section>
  );
};

export default Timeline;
