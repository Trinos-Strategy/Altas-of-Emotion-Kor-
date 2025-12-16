export const emotions = {
  anger: {
    id: "anger",
    name_ko: "분노",
    name_en: "Anger",
    color: "#D32F2F",
    colorLight: "#EF5350",
    colorDark: "#C62828",
    description_ko: "분노는 목표 달성을 방해받을 때 느끼는 감정입니다. 경미한 짜증부터 격렬한 분노까지 다양한 형태로 나타납니다.",
    description_en: "Anger is felt when something interferes with our goals. It ranges from mild annoyance to intense rage.",
    states: [
      {
        name_ko: "짜증",
        name_en: "Annoyance",
        intensity: 1,
        description_ko: "가벼운 방해나 불편함에 대한 반응으로, 분노의 가장 약한 형태입니다.",
        description_en: "A mild reaction to a minor disturbance or inconvenience."
      },
      {
        name_ko: "좌절",
        name_en: "Frustration",
        intensity: 2,
        description_ko: "목표 달성이 지연되거나 방해받을 때 느끼는 감정입니다.",
        description_en: "Felt when goals are delayed or blocked."
      },
      {
        name_ko: "성가심",
        name_en: "Exasperation",
        intensity: 3,
        description_ko: "반복되는 문제나 답답한 상황에서 느끼는 강한 짜증입니다.",
        description_en: "Intense irritation from repeated problems or frustrating situations."
      },
      {
        name_ko: "논쟁적",
        name_en: "Argumentativeness",
        intensity: 4,
        description_ko: "의견 차이에서 오는 갈등 상태로, 자신의 입장을 강하게 주장하려는 충동입니다.",
        description_en: "A conflictual state arising from disagreement."
      },
      {
        name_ko: "격분",
        name_en: "Bitterness",
        intensity: 5,
        description_ko: "부당한 대우에 대한 깊은 분개와 원망입니다.",
        description_en: "Deep resentment and grudge from perceived unfair treatment."
      },
      {
        name_ko: "복수심",
        name_en: "Vengefulness",
        intensity: 6,
        description_ko: "받은 피해에 대해 보복하고자 하는 강한 욕구입니다.",
        description_en: "A strong desire to retaliate for harm received."
      },
      {
        name_ko: "격노",
        name_en: "Fury",
        intensity: 7,
        description_ko: "통제하기 어려운 격렬한 분노 상태입니다.",
        description_en: "Intense, uncontrollable anger."
      }
    ],
    triggers: [
      { text_ko: "누군가 당신을 방해한다", text_en: "Someone interferes with you" },
      { text_ko: "친구가 당신에게 화를 낸다", text_en: "A friend gets angry at you" },
      { text_ko: "부당한 대우를 받는다", text_en: "You receive unfair treatment" },
      { text_ko: "목표 달성이 좌절된다", text_en: "Your goals are frustrated" }
    ],
    responses: [
      { text_ko: "다툰다", text_en: "Argue" },
      { text_ko: "소리 지른다", text_en: "Yell" },
      { text_ko: "자리를 피한다", text_en: "Leave the situation" },
      { text_ko: "침묵한다", text_en: "Go silent" }
    ],
    actions: [
      { name_ko: "말다툼", name_en: "Quarrel", type: "intrinsic", description_ko: "언어적 갈등에 참여하는 것" },
      { name_ko: "공격", name_en: "Attack", type: "intrinsic", description_ko: "신체적 또는 언어적으로 상대를 공격" },
      { name_ko: "위협", name_en: "Threaten", type: "intrinsic", description_ko: "해를 끼치겠다고 위협" },
      { name_ko: "폭발", name_en: "Explode", type: "intrinsic", description_ko: "통제 불능의 분노 표출" },
      { name_ko: "한계 설정", name_en: "Set limits", type: "intentional", description_ko: "명확한 경계를 설정" },
      { name_ko: "자기주장", name_en: "Assert", type: "intentional", description_ko: "자신의 입장을 분명히 표현" },
      { name_ko: "문제 해결", name_en: "Problem solve", type: "intentional", description_ko: "근본 원인을 해결하려 노력" }
    ],
    mood_ko: "짜증나는",
    mood_en: "Irritable",
    trait_ko: "적대적인",
    trait_en: "Hostile",
    psychopathology_ko: "만성 적대감, 간헐적 폭발 장애",
    psychopathology_en: "Chronic hostility, Intermittent Explosive Disorder",
    signals: [
      { name_ko: "눈살 찌푸림", name_en: "Frowning" },
      { name_ko: "주먹 쥐기", name_en: "Clenched fists" },
      { name_ko: "심박수 증가", name_en: "Increased heart rate" },
      { name_ko: "얼굴 붉어짐", name_en: "Flushed face" }
    ],
    antidotes: [
      { state_ko: "짜증", state_en: "Annoyance", antidote_ko: "인내, 열린 마음, 타인에 대한 관심", antidote_en: "Patience, open-mindedness, concern for others" },
      { state_ko: "좌절", state_en: "Frustration", antidote_ko: "수용, 유연성, 인내심", antidote_en: "Acceptance, flexibility, patience" },
      { state_ko: "격분", state_en: "Bitterness", antidote_ko: "용서, 내려놓음, 관점 전환", antidote_en: "Forgiveness, letting go, perspective shift" },
      { state_ko: "복수심", state_en: "Vengefulness", antidote_ko: "공감, 이해, 자비", antidote_en: "Empathy, understanding, compassion" },
      { state_ko: "격노", state_en: "Fury", antidote_ko: "마음 진정, 거리두기, 심호흡", antidote_en: "Calming the mind, distancing, deep breathing" }
    ]
  },

  fear: {
    id: "fear",
    name_ko: "두려움",
    name_en: "Fear",
    color: "#7B1FA2",
    colorLight: "#AB47BC",
    colorDark: "#6A1B9A",
    description_ko: "두려움은 위험이나 위협에 대한 반응입니다. 우리를 보호하기 위해 존재하며, 가벼운 불안부터 극심한 공포까지 다양합니다.",
    description_en: "Fear is a response to danger or threat. It exists to protect us and ranges from mild anxiety to extreme terror.",
    states: [
      {
        name_ko: "걱정",
        name_en: "Trepidation",
        intensity: 1,
        description_ko: "미래의 불확실한 사건에 대한 가벼운 불안입니다.",
        description_en: "Mild anxiety about uncertain future events."
      },
      {
        name_ko: "긴장",
        name_en: "Nervousness",
        intensity: 2,
        description_ko: "예상되는 어려움이나 도전에 대한 불안한 기대입니다.",
        description_en: "Uneasy anticipation of difficulties or challenges."
      },
      {
        name_ko: "불안",
        name_en: "Anxiety",
        intensity: 3,
        description_ko: "미래의 위협에 대한 지속적인 걱정과 초조함입니다.",
        description_en: "Persistent worry and unease about future threats."
      },
      {
        name_ko: "두려움",
        name_en: "Dread",
        intensity: 4,
        description_ko: "다가오는 부정적 사건에 대한 강한 예감입니다.",
        description_en: "Strong anticipation of something negative approaching."
      },
      {
        name_ko: "절망",
        name_en: "Desperation",
        intensity: 5,
        description_ko: "희망을 잃고 극단적 조치를 고려하게 되는 상태입니다.",
        description_en: "Loss of hope, leading to consideration of extreme measures."
      },
      {
        name_ko: "공황",
        name_en: "Panic",
        intensity: 6,
        description_ko: "갑작스러운 압도적 공포로 이성적 사고가 어려운 상태입니다.",
        description_en: "Sudden overwhelming fear making rational thought difficult."
      },
      {
        name_ko: "공포",
        name_en: "Terror",
        intensity: 7,
        description_ko: "극심한 두려움으로 완전히 마비된 상태입니다.",
        description_en: "Extreme fear causing complete paralysis."
      }
    ],
    triggers: [
      { text_ko: "어두운 골목을 걷는다", text_en: "Walking through a dark alley" },
      { text_ko: "높은 곳에 서있다", text_en: "Standing in a high place" },
      { text_ko: "중요한 발표를 앞두고 있다", text_en: "Facing an important presentation" },
      { text_ko: "갑작스러운 큰 소리가 난다", text_en: "Sudden loud noise occurs" }
    ],
    responses: [
      { text_ko: "피한다", text_en: "Avoid" },
      { text_ko: "도망친다", text_en: "Run away" },
      { text_ko: "얼어붙는다", text_en: "Freeze" },
      { text_ko: "도움을 요청한다", text_en: "Call for help" }
    ],
    actions: [
      { name_ko: "회피", name_en: "Avoid", type: "intrinsic", description_ko: "위협으로부터 멀리 떨어지려는 행동" },
      { name_ko: "도주", name_en: "Flee", type: "intrinsic", description_ko: "위험에서 빠르게 벗어나기" },
      { name_ko: "경직", name_en: "Freeze", type: "intrinsic", description_ko: "움직임을 멈추고 상황 파악" },
      { name_ko: "숨기", name_en: "Hide", type: "intrinsic", description_ko: "안전한 곳에 몸을 숨기기" },
      { name_ko: "확인하기", name_en: "Check", type: "intentional", description_ko: "위협의 실체를 파악" },
      { name_ko: "대비하기", name_en: "Prepare", type: "intentional", description_ko: "위험에 대응할 준비" },
      { name_ko: "도움 구하기", name_en: "Seek help", type: "intentional", description_ko: "다른 사람의 도움 요청" }
    ],
    mood_ko: "불안한",
    mood_en: "Anxious",
    trait_ko: "소심한",
    trait_en: "Timid",
    psychopathology_ko: "공황장애, 공포증, 범불안장애",
    psychopathology_en: "Panic disorder, Phobias, Generalized Anxiety Disorder",
    signals: [
      { name_ko: "동공 확장", name_en: "Dilated pupils" },
      { name_ko: "식은땀", name_en: "Cold sweats" },
      { name_ko: "심장 빨리 뜀", name_en: "Racing heart" },
      { name_ko: "떨림", name_en: "Trembling" }
    ],
    antidotes: [
      { state_ko: "걱정", state_en: "Trepidation", antidote_ko: "현실 점검, 마음챙김, 준비", antidote_en: "Reality check, mindfulness, preparation" },
      { state_ko: "불안", state_en: "Anxiety", antidote_ko: "심호흡, 현재에 집중, 점진적 노출", antidote_en: "Deep breathing, focusing on present, gradual exposure" },
      { state_ko: "공황", state_en: "Panic", antidote_ko: "그라운딩 기법, 호흡 조절, 안전한 장소", antidote_en: "Grounding techniques, breath control, safe place" },
      { state_ko: "공포", state_en: "Terror", antidote_ko: "마음 진정, 마음챙김, 자기 연민", antidote_en: "Calming the mind, mindfulness, self-compassion" }
    ]
  },

  disgust: {
    id: "disgust",
    name_ko: "혐오",
    name_en: "Disgust",
    color: "#388E3C",
    colorLight: "#66BB6A",
    colorDark: "#2E7D32",
    description_ko: "혐오는 불쾌하거나 불결한 것에 대한 반응입니다. 원래는 독이나 오염된 음식을 피하기 위해 진화했지만, 도덕적 판단에도 적용됩니다.",
    description_en: "Disgust is a response to something unpleasant or unclean. It evolved to avoid poison and contaminated food but also applies to moral judgments.",
    states: [
      {
        name_ko: "싫음",
        name_en: "Dislike",
        intensity: 1,
        description_ko: "특정 것에 대한 가벼운 불쾌감입니다.",
        description_en: "Mild unpleasantness toward something."
      },
      {
        name_ko: "거부감",
        name_en: "Aversion",
        intensity: 2,
        description_ko: "무언가를 피하고 싶은 강한 욕구입니다.",
        description_en: "Strong desire to avoid something."
      },
      {
        name_ko: "불쾌",
        name_en: "Distaste",
        intensity: 3,
        description_ko: "감각적 또는 미적 불쾌감입니다.",
        description_en: "Sensory or aesthetic displeasure."
      },
      {
        name_ko: "역겨움",
        name_en: "Revulsion",
        intensity: 4,
        description_ko: "강한 신체적 혐오 반응입니다.",
        description_en: "Strong physical disgust reaction."
      },
      {
        name_ko: "구역질",
        name_en: "Nausea",
        intensity: 5,
        description_ko: "메스꺼움을 동반한 강한 혐오입니다.",
        description_en: "Strong disgust accompanied by feeling sick."
      },
      {
        name_ko: "경멸",
        name_en: "Contempt",
        intensity: 6,
        description_ko: "타인의 행동에 대한 도덕적 혐오입니다.",
        description_en: "Moral disgust toward another's behavior."
      },
      {
        name_ko: "혐오",
        name_en: "Loathing",
        intensity: 7,
        description_ko: "극도로 강한 혐오와 거부감입니다.",
        description_en: "Extremely intense disgust and rejection."
      }
    ],
    triggers: [
      { text_ko: "썩은 음식 냄새를 맡는다", text_en: "Smell rotten food" },
      { text_ko: "비위생적인 환경을 본다", text_en: "See an unsanitary environment" },
      { text_ko: "비도덕적 행위를 목격한다", text_en: "Witness immoral behavior" },
      { text_ko: "거짓말을 당한다", text_en: "Being lied to" }
    ],
    responses: [
      { text_ko: "고개를 돌린다", text_en: "Turn away" },
      { text_ko: "밀어낸다", text_en: "Push away" },
      { text_ko: "물러선다", text_en: "Step back" },
      { text_ko: "얼굴을 찡그린다", text_en: "Grimace" }
    ],
    actions: [
      { name_ko: "밀어내기", name_en: "Push away", type: "intrinsic", description_ko: "혐오스러운 것을 물리적으로 멀리하기" },
      { name_ko: "피하기", name_en: "Avoid", type: "intrinsic", description_ko: "혐오 대상과의 접촉 회피" },
      { name_ko: "구역질", name_en: "Gag", type: "intrinsic", description_ko: "신체적 거부 반응" },
      { name_ko: "경멸하기", name_en: "Scorn", type: "intrinsic", description_ko: "도덕적 혐오 표현" },
      { name_ko: "재평가", name_en: "Reappraise", type: "intentional", description_ko: "상황을 다른 관점에서 보기" },
      { name_ko: "정화", name_en: "Cleanse", type: "intentional", description_ko: "오염된 것을 깨끗이 하기" },
      { name_ko: "거리두기", name_en: "Distance", type: "intentional", description_ko: "물리적/심리적 거리 두기" }
    ],
    mood_ko: "메스꺼운",
    mood_en: "Queasy",
    trait_ko: "예민한",
    trait_en: "Sensitive",
    psychopathology_ko: "강박장애, 특정 공포증",
    psychopathology_en: "OCD, Specific phobias",
    signals: [
      { name_ko: "코 찡그림", name_en: "Nose wrinkle" },
      { name_ko: "윗입술 올림", name_en: "Upper lip raised" },
      { name_ko: "구역질", name_en: "Gagging" },
      { name_ko: "고개 돌림", name_en: "Head turning away" }
    ],
    antidotes: [
      { state_ko: "싫음", state_en: "Dislike", antidote_ko: "공평한 평가, 열린 마음", antidote_en: "Impartial evaluation, open-mindedness" },
      { state_ko: "거부감", state_en: "Aversion", antidote_ko: "이해하려는 노력, 공감", antidote_en: "Effort to understand, empathy" },
      { state_ko: "경멸", state_en: "Contempt", antidote_ko: "연민, 자비, 용서", antidote_en: "Compassion, mercy, forgiveness" },
      { state_ko: "혐오", state_en: "Loathing", antidote_ko: "공평한 관점, 자기 성찰", antidote_en: "Impartial perspective, self-reflection" }
    ]
  },

  sadness: {
    id: "sadness",
    name_ko: "슬픔",
    name_en: "Sadness",
    color: "#1976D2",
    colorLight: "#42A5F5",
    colorDark: "#1565C0",
    description_ko: "슬픔은 상실이나 실망에 대한 반응입니다. 우리가 소중히 여기는 것을 잃었을 때 느끼며, 회복과 성찰의 기회가 됩니다.",
    description_en: "Sadness is a response to loss or disappointment. We feel it when we lose something we value, and it can be an opportunity for recovery and reflection.",
    states: [
      {
        name_ko: "실망",
        name_en: "Disappointment",
        intensity: 1,
        description_ko: "기대한 것이 이루어지지 않았을 때의 가벼운 슬픔입니다.",
        description_en: "Mild sadness when expectations are not met."
      },
      {
        name_ko: "낙담",
        name_en: "Discouragement",
        intensity: 2,
        description_ko: "노력이 성과를 내지 못할 때 느끼는 의기소침입니다.",
        description_en: "Feeling dejected when efforts don't yield results."
      },
      {
        name_ko: "무력감",
        name_en: "Helplessness",
        intensity: 3,
        description_ko: "상황을 바꿀 수 없다는 느낌입니다.",
        description_en: "Feeling unable to change the situation."
      },
      {
        name_ko: "우울",
        name_en: "Gloom",
        intensity: 4,
        description_ko: "지속적인 슬픔과 어둠의 느낌입니다.",
        description_en: "Persistent sadness and feeling of darkness."
      },
      {
        name_ko: "비탄",
        name_en: "Grief",
        intensity: 5,
        description_ko: "중요한 상실에 대한 깊은 슬픔입니다.",
        description_en: "Deep sadness over significant loss."
      },
      {
        name_ko: "고뇌",
        name_en: "Anguish",
        intensity: 6,
        description_ko: "극심한 정신적 고통입니다.",
        description_en: "Extreme mental suffering."
      },
      {
        name_ko: "절망",
        name_en: "Despair",
        intensity: 7,
        description_ko: "희망을 완전히 잃은 상태입니다.",
        description_en: "Complete loss of hope."
      }
    ],
    triggers: [
      { text_ko: "사랑하는 사람을 잃는다", text_en: "Losing a loved one" },
      { text_ko: "중요한 목표에 실패한다", text_en: "Failing at an important goal" },
      { text_ko: "외로움을 느낀다", text_en: "Feeling lonely" },
      { text_ko: "거절당한다", text_en: "Being rejected" }
    ],
    responses: [
      { text_ko: "운다", text_en: "Cry" },
      { text_ko: "혼자 있고 싶어한다", text_en: "Want to be alone" },
      { text_ko: "위로를 찾는다", text_en: "Seek comfort" },
      { text_ko: "무기력해진다", text_en: "Become lethargic" }
    ],
    actions: [
      { name_ko: "울기", name_en: "Cry", type: "intrinsic", description_ko: "슬픔을 눈물로 표현" },
      { name_ko: "위축", name_en: "Withdraw", type: "intrinsic", description_ko: "사회적 접촉 줄이기" },
      { name_ko: "신음", name_en: "Moan", type: "intrinsic", description_ko: "고통의 소리 표현" },
      { name_ko: "포기", name_en: "Give up", type: "intrinsic", description_ko: "노력을 중단하기" },
      { name_ko: "위로 구하기", name_en: "Seek comfort", type: "intentional", description_ko: "타인에게 지지 요청" },
      { name_ko: "애도하기", name_en: "Mourn", type: "intentional", description_ko: "상실을 인정하고 처리" },
      { name_ko: "회복하기", name_en: "Recover", type: "intentional", description_ko: "점차 일상으로 돌아가기" }
    ],
    mood_ko: "우울한",
    mood_en: "Melancholic",
    trait_ko: "비관적인",
    trait_en: "Pessimistic",
    psychopathology_ko: "주요우울장애, 지속성우울장애",
    psychopathology_en: "Major Depressive Disorder, Persistent Depressive Disorder",
    signals: [
      { name_ko: "눈물", name_en: "Tears" },
      { name_ko: "처진 어깨", name_en: "Drooping shoulders" },
      { name_ko: "느린 움직임", name_en: "Slow movements" },
      { name_ko: "한숨", name_en: "Sighing" }
    ],
    antidotes: [
      { state_ko: "실망", state_en: "Disappointment", antidote_ko: "수용, 새로운 관점, 회복력", antidote_en: "Acceptance, new perspective, resilience" },
      { state_ko: "무력감", state_en: "Helplessness", antidote_ko: "작은 행동, 지지 구하기, 자기 효능감", antidote_en: "Small actions, seeking support, self-efficacy" },
      { state_ko: "비탄", state_en: "Grief", antidote_ko: "애도의 시간, 지지 체계, 기억하기", antidote_en: "Time to mourn, support system, remembering" },
      { state_ko: "절망", state_en: "Despair", antidote_ko: "무상함의 이해, 평화, 연결", antidote_en: "Understanding impermanence, peace, connection" }
    ]
  },

  enjoyment: {
    id: "enjoyment",
    name_ko: "즐거움",
    name_en: "Enjoyment",
    color: "#FFA726",
    colorLight: "#FFB74D",
    colorDark: "#FB8C00",
    description_ko: "즐거움은 긍정적 경험에 대한 반응입니다. 감각적 쾌락부터 깊은 만족감까지 다양하며, 삶의 의미와 연결됩니다.",
    description_en: "Enjoyment is a response to positive experiences. It ranges from sensory pleasure to deep satisfaction and connects to life's meaning.",
    states: [
      {
        name_ko: "감각적 쾌락",
        name_en: "Sensory Pleasure",
        intensity: 1,
        description_ko: "오감을 통한 즐거운 경험입니다.",
        description_en: "Pleasant experience through the five senses."
      },
      {
        name_ko: "연민의 기쁨",
        name_en: "Compassion/Joy",
        intensity: 2,
        description_ko: "타인을 돕거나 그들의 행복을 볼 때 느끼는 기쁨입니다.",
        description_en: "Joy felt when helping others or seeing their happiness."
      },
      {
        name_ko: "즐거움",
        name_en: "Amusement",
        intensity: 2,
        description_ko: "유머나 재미있는 상황에서 느끼는 기분 좋음입니다.",
        description_en: "Enjoyment from humor or entertaining situations."
      },
      {
        name_ko: "샤덴프로이데",
        name_en: "Schadenfreude",
        intensity: 3,
        description_ko: "타인의 불행에서 느끼는 은밀한 기쁨입니다.",
        description_en: "Secret pleasure in another's misfortune."
      },
      {
        name_ko: "환희",
        name_en: "Rejoicing",
        intensity: 3,
        description_ko: "좋은 소식이나 성공에 대한 기쁨입니다.",
        description_en: "Joy at good news or success."
      },
      {
        name_ko: "평화",
        name_en: "Peace",
        intensity: 4,
        description_ko: "내면의 고요함과 만족입니다.",
        description_en: "Inner calm and contentment."
      },
      {
        name_ko: "안도",
        name_en: "Relief",
        intensity: 4,
        description_ko: "위협이 지나갔을 때의 해방감입니다.",
        description_en: "Liberation when a threat has passed."
      },
      {
        name_ko: "자부심",
        name_en: "Pride",
        intensity: 5,
        description_ko: "자신의 성취에 대한 만족입니다.",
        description_en: "Satisfaction in one's achievements."
      },
      {
        name_ko: "피에로",
        name_en: "Fiero",
        intensity: 5,
        description_ko: "어려운 도전을 극복했을 때의 승리감입니다.",
        description_en: "Triumph when overcoming a difficult challenge."
      },
      {
        name_ko: "나체스",
        name_en: "Naches",
        intensity: 5,
        description_ko: "자녀나 제자의 성취에 대한 자랑스러움입니다.",
        description_en: "Pride in the achievements of one's children or students."
      },
      {
        name_ko: "경이",
        name_en: "Wonder",
        intensity: 6,
        description_ko: "놀라운 것을 마주했을 때의 경탄입니다.",
        description_en: "Amazement when encountering something wonderful."
      },
      {
        name_ko: "흥분",
        name_en: "Excitement",
        intensity: 6,
        description_ko: "기대되는 일에 대한 고조된 에너지입니다.",
        description_en: "Heightened energy about anticipated events."
      },
      {
        name_ko: "황홀감",
        name_en: "Ecstasy",
        intensity: 7,
        description_ko: "최고조의 행복과 환희입니다.",
        description_en: "Peak happiness and elation."
      }
    ],
    triggers: [
      { text_ko: "사랑하는 사람을 만난다", text_en: "Meeting a loved one" },
      { text_ko: "목표를 달성한다", text_en: "Achieving a goal" },
      { text_ko: "맛있는 음식을 먹는다", text_en: "Eating delicious food" },
      { text_ko: "아름다운 풍경을 본다", text_en: "Seeing a beautiful view" }
    ],
    responses: [
      { text_ko: "미소 짓는다", text_en: "Smile" },
      { text_ko: "웃는다", text_en: "Laugh" },
      { text_ko: "공유하고 싶어한다", text_en: "Want to share" },
      { text_ko: "더 원한다", text_en: "Want more" }
    ],
    actions: [
      { name_ko: "외치다", name_en: "Exclaim", type: "intrinsic", description_ko: "기쁨을 소리로 표현" },
      { name_ko: "참여/연결", name_en: "Engage/Connect", type: "intrinsic", description_ko: "타인과 기쁨 나누기" },
      { name_ko: "우쭐대다", name_en: "Gloat", type: "intrinsic", description_ko: "성공에 대한 자랑" },
      { name_ko: "탐닉", name_en: "Indulge", type: "intrinsic", description_ko: "쾌락에 빠지기" },
      { name_ko: "유지", name_en: "Maintain", type: "intentional", description_ko: "긍정적 상태 유지하기" },
      { name_ko: "음미", name_en: "Savor", type: "intentional", description_ko: "순간을 충분히 즐기기" },
      { name_ko: "더 추구", name_en: "Seek More", type: "intentional", description_ko: "더 많은 긍정적 경험 찾기" }
    ],
    mood_ko: "쾌활한",
    mood_en: "Cheerful",
    trait_ko: "낙관적인",
    trait_en: "Optimistic",
    psychopathology_ko: "조증, 쾌락 추구 중독",
    psychopathology_en: "Mania, Hedonic addiction",
    signals: [
      { name_ko: "미소", name_en: "Smile" },
      { name_ko: "밝은 눈", name_en: "Bright eyes" },
      { name_ko: "이완된 자세", name_en: "Relaxed posture" },
      { name_ko: "웃음", name_en: "Laughter" }
    ],
    antidotes: [
      { state_ko: "자부심", state_en: "Pride", antidote_ko: "겸손, 감사, 타인 인정", antidote_en: "Humility, gratitude, acknowledging others" },
      { state_ko: "샤덴프로이데", state_en: "Schadenfreude", antidote_ko: "자비, 공감, 인류애", antidote_en: "Benevolence, empathy, humanity" }
    ],
    obstacles: [
      { state_ko: "즐거움 전체", state_en: "All Enjoyment", obstacle_ko: "집착, 비관주의, 부정성, 무감각", obstacle_en: "Grasping, pessimism, negativity, numbness" }
    ]
  }
};

export const emotionOrder = ['anger', 'fear', 'disgust', 'sadness', 'enjoyment'];

export const sectionNames = {
  introduction: { ko: '소개', en: 'Introduction' },
  triggers: { ko: '타임라인', en: 'Timeline' },
  continents: { ko: '경험', en: 'Experience' },
  actions: { ko: '반응', en: 'Response' },
  links: { ko: '전략', en: 'Strategies' }
};

export const dalaiLamaQuote = {
  ko: "감정의 세계를 아는 것이 마음의 평화로 가는 길입니다. 우리의 감정을 이해하면, 우리 자신과 타인에 대한 연민을 키울 수 있습니다.",
  en: "Knowing the world of emotions is the path to peace of mind. When we understand our emotions, we can cultivate compassion for ourselves and others."
};

export const resources = [
  {
    title_ko: "감정 지도의 과학",
    title_en: "Science of the Atlas",
    url: "https://www.youtube.com/watch?v=example1",
    type: "YouTube"
  },
  {
    title_ko: "감정 변환 명상",
    title_en: "Transforming Emotion Meditation",
    url: "https://www.youtube.com/watch?v=example2",
    type: "Meditation"
  },
  {
    title_ko: "감정 균형 수련",
    title_en: "Cultivate Emotional Balance",
    url: "https://www.cultivatingemotionalbalance.org/",
    type: "Website"
  },
  {
    title_ko: "AOE 체화하기",
    title_en: "AOE In:bodied",
    url: "https://www.example.com/inbodied",
    type: "App"
  },
  {
    title_ko: "폴 에크만과 달라이 라마: 파괴적 감정에 대하여",
    title_en: "Paul Ekman and HHDL on Destructive Emotions",
    url: "https://www.youtube.com/watch?v=example3",
    type: "YouTube"
  }
];

export const timelineSteps = {
  ko: [
    "자동 평가",
    "트리거",
    "감정 발생",
    "건설적/파괴적 반응",
    "불응기",
    "재평가"
  ],
  en: [
    "Automatic Appraisal",
    "Trigger",
    "Emotion Arises",
    "Constructive/Destructive Response",
    "Refractory Period",
    "Re-appraisal"
  ]
};

export const emotionalEpisodeTimeline = {
  title_ko: "감정 에피소드 타임라인",
  title_en: "Emotional Episode Timeline",
  steps: [
    {
      id: 1,
      name_ko: "이벤트",
      name_en: "Event",
      description_ko: "세상에서 무언가가 일어납니다 - 외부 상황이나 내부 생각일 수 있습니다.",
      description_en: "Something happens in the world - could be external situation or internal thought."
    },
    {
      id: 2,
      name_ko: "데이터베이스",
      name_en: "Database",
      description_ko: "과거 경험과 진화된 반응이 저장된 곳입니다. 의식적 접근 불가.",
      description_en: "Where past experiences and evolved responses are stored. Not consciously accessible."
    },
    {
      id: 3,
      name_ko: "자동 평가",
      name_en: "Auto Appraisal",
      description_ko: "밀리초 단위로 이벤트가 감정을 유발할지 평가합니다.",
      description_en: "In milliseconds, evaluates whether event triggers emotion."
    },
    {
      id: 4,
      name_ko: "트리거",
      name_en: "Trigger",
      description_ko: "특정 이벤트가 감정 반응을 활성화시킵니다.",
      description_en: "Specific event activates emotional response."
    },
    {
      id: 5,
      name_ko: "감정 발생",
      name_en: "Emotion Arises",
      description_ko: "특정 감정이 의식에 나타납니다.",
      description_en: "Specific emotion emerges in consciousness."
    },
    {
      id: 6,
      name_ko: "경험/불응기",
      name_en: "Experience/Refractory Period",
      description_ko: "감정을 경험하며, 이 기간 동안 다른 정보를 받아들이기 어렵습니다.",
      description_en: "Experiencing emotion, during which it's hard to take in other information."
    },
    {
      id: 7,
      name_ko: "의식적 평가",
      name_en: "Conscious Appraisal",
      description_ko: "일어난 일과 반응에 대해 의식적으로 생각합니다.",
      description_en: "Consciously thinking about what happened and responses."
    },
    {
      id: 8,
      name_ko: "인식",
      name_en: "Awareness",
      description_ko: "감정을 인식하고 이름 붙일 수 있습니다.",
      description_en: "Becoming aware of and able to name the emotion."
    },
    {
      id: 9,
      name_ko: "반응 선택",
      name_en: "Response Choice",
      description_ko: "어떻게 반응할지 선택합니다 - 건설적 또는 파괴적.",
      description_en: "Choosing how to respond - constructive or destructive."
    },
    {
      id: 10,
      name_ko: "표현",
      name_en: "Expression",
      description_ko: "감정이 행동, 말, 또는 신체 반응으로 표현됩니다.",
      description_en: "Emotion expressed through action, speech, or physical response."
    },
    {
      id: 11,
      name_ko: "결과",
      name_en: "Outcome",
      description_ko: "반응의 결과가 새로운 이벤트가 되어 사이클이 반복될 수 있습니다.",
      description_en: "Result of response becomes new event, cycle may repeat."
    }
  ]
};
