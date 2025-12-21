export const emotions = {
  anger: {
    id: "anger",
    name_ko: "분노",
    name_en: "Anger",
    color: "#E63946",
    colorLight: "#FF8B8B",
    colorDark: "#C62936",
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
      { state_ko: "성가심", state_en: "Exasperation", antidote_ko: "한 발 물러서기, 휴식 취하기, 유머 찾기", antidote_en: "Stepping back, taking a break, finding humor" },
      { state_ko: "논쟁적", state_en: "Argumentativeness", antidote_ko: "경청, 상대 입장 이해, 공통점 찾기", antidote_en: "Active listening, understanding other's position, finding common ground" },
      { state_ko: "격분", state_en: "Bitterness", antidote_ko: "용서, 내려놓음, 관점 전환", antidote_en: "Forgiveness, letting go, perspective shift" },
      { state_ko: "복수심", state_en: "Vengefulness", antidote_ko: "공감, 이해, 자비", antidote_en: "Empathy, understanding, compassion" },
      { state_ko: "격노", state_en: "Fury", antidote_ko: "마음 진정, 거리두기, 심호흡", antidote_en: "Calming the mind, distancing, deep breathing" }
    ]
  },

  fear: {
    id: "fear",
    name_ko: "두려움",
    name_en: "Fear",
    color: "#6B4C9A",
    colorLight: "#9B7FBF",
    colorDark: "#4A3570",
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
        name_ko: "경악",
        name_en: "Horror",
        intensity: 7,
        description_ko: "두려움과 혐오가 혼합된 강렬한 충격 상태입니다. 끔찍하거나 충격적인 것을 목격했을 때 느낍니다.",
        description_en: "A mixture of fear and disgust. Felt when witnessing something terrible or shocking."
      },
      {
        name_ko: "공포",
        name_en: "Terror",
        intensity: 8,
        description_ko: "극심한 두려움으로 완전히 마비된 상태입니다. 두려움의 가장 강렬한 형태.",
        description_en: "Extreme fear causing complete paralysis. The most intense form of fear."
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
      { state_ko: "긴장", state_en: "Nervousness", antidote_ko: "이완 기법, 긍정적 자기 대화, 준비된 느낌 갖기", antidote_en: "Relaxation techniques, positive self-talk, feeling prepared" },
      { state_ko: "불안", state_en: "Anxiety", antidote_ko: "심호흡, 현재에 집중, 점진적 노출", antidote_en: "Deep breathing, focusing on present, gradual exposure" },
      { state_ko: "두려움", state_en: "Dread", antidote_ko: "최악의 시나리오 점검, 대처 계획, 지지 체계 활성화", antidote_en: "Worst-case scenario check, coping plan, activating support system" },
      { state_ko: "절망", state_en: "Desperation", antidote_ko: "희망 찾기, 작은 행동 시작, 도움 요청", antidote_en: "Finding hope, starting small actions, asking for help" },
      { state_ko: "공황", state_en: "Panic", antidote_ko: "그라운딩 기법, 호흡 조절, 안전한 장소", antidote_en: "Grounding techniques, breath control, safe place" },
      { state_ko: "경악", state_en: "Horror", antidote_ko: "감각 재연결, 안전한 환경 조성, 정서적 지지", antidote_en: "Reconnecting to senses, creating safe environment, emotional support" },
      { state_ko: "공포", state_en: "Terror", antidote_ko: "마음 진정, 마음챙김, 자기 연민", antidote_en: "Calming the mind, mindfulness, self-compassion" }
    ]
  },

  disgust: {
    id: "disgust",
    name_ko: "혐오",
    name_en: "Disgust",
    color: "#4A7C59",
    colorLight: "#8BC99B",
    colorDark: "#3A6248",
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
      { state_ko: "불쾌", state_en: "Distaste", antidote_ko: "중립적 관점 유지, 감각적 거리두기, 재평가", antidote_en: "Maintaining neutral perspective, sensory distancing, reappraisal" },
      { state_ko: "역겨움", state_en: "Revulsion", antidote_ko: "합리적 분석, 노출 치료, 점진적 둔감화", antidote_en: "Rational analysis, exposure therapy, gradual desensitization" },
      { state_ko: "구역질", state_en: "Nausea", antidote_ko: "신체적 진정, 환기, 주의 전환", antidote_en: "Physical calming, ventilation, attention diversion" },
      { state_ko: "경멸", state_en: "Contempt", antidote_ko: "연민, 자비, 용서", antidote_en: "Compassion, mercy, forgiveness" },
      { state_ko: "혐오", state_en: "Loathing", antidote_ko: "공평한 관점, 자기 성찰", antidote_en: "Impartial perspective, self-reflection" }
    ]
  },

  sadness: {
    id: "sadness",
    name_ko: "슬픔",
    name_en: "Sadness",
    color: "#4A6FA5",
    colorLight: "#89A7C9",
    colorDark: "#3A5A8A",
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
        description_ko: "노력이 성과를 내지 못할 때 느끼는 의기소침입니다. 대처할 방법이 없다는 느낌.",
        description_en: "Feeling dejected when efforts don't yield results. A feeling that there is no way to cope."
      },
      {
        name_ko: "혼란",
        name_en: "Distraughtness",
        intensity: 3,
        description_ko: "동요된 슬픔입니다. 감정적으로 혼란스럽고 당혹스러운 상태.",
        description_en: "Agitated sadness. Emotionally confused and bewildered state."
      },
      {
        name_ko: "체념",
        name_en: "Resignation",
        intensity: 4,
        description_ko: "아무것도 할 수 없다는 것을 받아들인 상태입니다.",
        description_en: "Acceptance that nothing can be done."
      },
      {
        name_ko: "무력감",
        name_en: "Helplessness",
        intensity: 5,
        description_ko: "상실을 막거나 대처할 수 없다는 깨달음입니다.",
        description_en: "Realization of the inability to prevent or cope with the loss."
      },
      {
        name_ko: "절망감",
        name_en: "Hopelessness",
        intensity: 6,
        description_ko: "좋은 일이 올 것 같지 않다는 느낌입니다.",
        description_en: "A feeling that nothing good is to come."
      },
      {
        name_ko: "비참함",
        name_en: "Misery",
        intensity: 7,
        description_ko: "대개 오래 지속되는 고통스러운 슬픔입니다.",
        description_en: "Anguished sadness usually prolonged."
      },
      {
        name_ko: "절망",
        name_en: "Despair",
        intensity: 8,
        description_ko: "체념한 고뇌입니다. 희망을 완전히 잃은 상태.",
        description_en: "Resigned anguish. Complete loss of hope."
      },
      {
        name_ko: "비탄",
        name_en: "Grief",
        intensity: 9,
        description_ko: "사랑하는 사람의 상실에 대한 고통스러운 슬픔입니다.",
        description_en: "Anguished sadness over a loss of loved ones."
      },
      {
        name_ko: "비애",
        name_en: "Sorrow",
        intensity: 10,
        description_ko: "상실에 대한 깊은 슬픔입니다.",
        description_en: "Sadness over a loss."
      },
      {
        name_ko: "고뇌",
        name_en: "Anguish",
        intensity: 11,
        description_ko: "격렬하고 동요된 슬픔입니다. 극심한 정신적 고통.",
        description_en: "Intense agitated sadness. Extreme mental suffering."
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
      { state_ko: "낙담", state_en: "Discouragement", antidote_ko: "작은 성취 인정, 현실적 목표, 자기 격려", antidote_en: "Acknowledging small achievements, realistic goals, self-encouragement" },
      { state_ko: "혼란", state_en: "Distraughtness", antidote_ko: "호흡 조절, 감정 명명, 안전한 공간", antidote_en: "Breath control, naming emotions, safe space" },
      { state_ko: "체념", state_en: "Resignation", antidote_ko: "새로운 가능성 탐색, 작은 행동, 지지 구하기", antidote_en: "Exploring new possibilities, small actions, seeking support" },
      { state_ko: "무력감", state_en: "Helplessness", antidote_ko: "작은 행동, 지지 구하기, 자기 효능감", antidote_en: "Small actions, seeking support, self-efficacy" },
      { state_ko: "절망감", state_en: "Hopelessness", antidote_ko: "연결, 의미 찾기, 전문가 도움", antidote_en: "Connection, finding meaning, professional help" },
      { state_ko: "비참함", state_en: "Misery", antidote_ko: "자기 연민, 일상 복귀, 건강한 습관", antidote_en: "Self-compassion, returning to routine, healthy habits" },
      { state_ko: "절망", state_en: "Despair", antidote_ko: "무상함의 이해, 평화, 연결", antidote_en: "Understanding impermanence, peace, connection" },
      { state_ko: "비탄", state_en: "Grief", antidote_ko: "애도의 시간, 지지 체계, 기억하기", antidote_en: "Time to mourn, support system, remembering" },
      { state_ko: "비애", state_en: "Sorrow", antidote_ko: "감정 표현, 예술적 승화, 타인과 나누기", antidote_en: "Expressing emotions, artistic sublimation, sharing with others" },
      { state_ko: "고뇌", state_en: "Anguish", antidote_ko: "무상함 인식, 평화 찾기, 전문가 상담", antidote_en: "Recognizing impermanence, finding peace, professional counseling" }
    ]
  },

  enjoyment: {
    id: "enjoyment",
    name_ko: "즐거움",
    name_en: "Enjoyment",
    color: "#F4A261",
    colorLight: "#FFD89B",
    colorDark: "#E08A40",
    description_ko: "즐거움은 긍정적 경험에 대한 반응입니다. 감각적 쾌락부터 깊은 만족감까지 다양하며, 삶의 의미와 연결됩니다.",
    description_en: "Enjoyment is a response to positive experiences. It ranges from sensory pleasure to deep satisfaction and connects to life's meaning.",
    states: [
      {
        name_ko: "감각적 쾌락",
        name_en: "Sensory Pleasure",
        intensity: 1,
        description_ko: "오감을 통한 즐거운 경험입니다. 맛있는 음식, 아름다운 음악, 부드러운 촉감 등에서 오는 즐거움.",
        description_en: "Pleasant experience through the five senses. Enjoyment from delicious food, beautiful music, soft touch, etc."
      },
      {
        name_ko: "환희",
        name_en: "Rejoicing",
        intensity: 2,
        description_ko: "좋은 소식이나 성공에 대한 기쁨입니다. 축하할 일이 생겼을 때 느끼는 감정.",
        description_en: "Joy at good news or success. The feeling when there's something to celebrate."
      },
      {
        name_ko: "연민의 기쁨",
        name_en: "Compassion/Joy",
        intensity: 3,
        description_ko: "타인을 돕거나 그들의 행복을 볼 때 느끼는 기쁨입니다. 이타적 행동에서 오는 만족감.",
        description_en: "Joy felt when helping others or seeing their happiness. Satisfaction from altruistic actions."
      },
      {
        name_ko: "재미",
        name_en: "Amusement",
        intensity: 4,
        description_ko: "유머나 재미있는 상황에서 느끼는 기분 좋음입니다. 웃음을 유발하는 즐거움.",
        description_en: "Enjoyment from humor or entertaining situations. Pleasure that induces laughter."
      },
      {
        name_ko: "샤덴프로이데",
        name_en: "Schadenfreude",
        intensity: 5,
        description_ko: "타인의 불행에서 느끼는 은밀한 기쁨입니다. 특히 그 사람이 불행을 자초했다고 느낄 때.",
        description_en: "Secret pleasure in another's misfortune. Especially when they seem to deserve it."
      },
      {
        name_ko: "안도",
        name_en: "Relief",
        intensity: 6,
        description_ko: "위협이 지나갔을 때의 해방감입니다. 걱정했던 일이 잘 해결되었을 때의 감정.",
        description_en: "Liberation when a threat has passed. The feeling when a worry is resolved."
      },
      {
        name_ko: "평화",
        name_en: "Peace",
        intensity: 7,
        description_ko: "내면의 고요함과 만족입니다. 갈등이 없고 조화로운 상태.",
        description_en: "Inner calm and contentment. A state free of conflict and in harmony."
      },
      {
        name_ko: "피에로",
        name_en: "Fiero",
        intensity: 8,
        description_ko: "어려운 도전을 극복했을 때의 승리감입니다. 이탈리아어로 '자부심'을 뜻하며, 성취의 순간 느끼는 환희.",
        description_en: "Triumph when overcoming a difficult challenge. Italian for 'pride', the elation felt at achievement."
      },
      {
        name_ko: "자부심",
        name_en: "Pride",
        intensity: 9,
        description_ko: "자신의 성취에 대한 만족입니다. 노력의 결과물에 대한 긍정적 자기평가.",
        description_en: "Satisfaction in one's achievements. Positive self-evaluation of one's efforts."
      },
      {
        name_ko: "나체스",
        name_en: "Naches",
        intensity: 10,
        description_ko: "자녀나 제자의 성취에 대한 자랑스러움입니다. 이디시어에서 온 말로, 대리적 자부심.",
        description_en: "Pride in the achievements of one's children or students. From Yiddish, vicarious pride."
      },
      {
        name_ko: "경이",
        name_en: "Wonder",
        intensity: 11,
        description_ko: "놀라운 것을 마주했을 때의 경탄입니다. 자연, 예술, 또는 인간의 업적 앞에서 느끼는 경외감.",
        description_en: "Amazement when encountering something wonderful. Awe before nature, art, or human achievement."
      },
      {
        name_ko: "흥분",
        name_en: "Excitement",
        intensity: 12,
        description_ko: "기대되는 일에 대한 고조된 에너지입니다. 곧 일어날 좋은 일에 대한 기대감.",
        description_en: "Heightened energy about anticipated events. Anticipation of good things to come."
      },
      {
        name_ko: "황홀경",
        name_en: "Ecstasy",
        intensity: 13,
        description_ko: "최고조의 행복과 환희입니다. 자아를 초월하는 듯한 극도의 기쁨.",
        description_en: "Peak happiness and elation. Extreme joy that seems to transcend the self."
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
      { state_ko: "감각적 쾌락", state_en: "Sensory Pleasure", antidote_ko: "절제, 마음챙김, 감사", antidote_en: "Moderation, mindfulness, gratitude" },
      { state_ko: "환희", state_en: "Rejoicing", antidote_ko: "겸손, 타인과 나누기, 감사 유지", antidote_en: "Humility, sharing with others, maintaining gratitude" },
      { state_ko: "연민의 기쁨", state_en: "Compassion/Joy", antidote_ko: "균형, 자기 돌봄, 경계 유지", antidote_en: "Balance, self-care, maintaining boundaries" },
      { state_ko: "재미", state_en: "Amusement", antidote_ko: "적절함 유지, 타인 배려, 상황 인식", antidote_en: "Maintaining appropriateness, consideration for others, situational awareness" },
      { state_ko: "샤덴프로이데", state_en: "Schadenfreude", antidote_ko: "자비, 공감, 인류애, 타인의 고통에 대한 연민", antidote_en: "Benevolence, empathy, humanity, compassion for others' suffering" },
      { state_ko: "안도", state_en: "Relief", antidote_ko: "감사, 교훈 인식, 미래 대비", antidote_en: "Gratitude, recognizing lessons, future preparation" },
      { state_ko: "평화", state_en: "Peace", antidote_ko: "현재 순간 유지, 집착 경계, 균형", antidote_en: "Staying in present moment, guarding against attachment, balance" },
      { state_ko: "피에로", state_en: "Fiero", antidote_ko: "겸손, 성취를 다른 사람과 나누기, 감사", antidote_en: "Humility, sharing achievement with others, gratitude" },
      { state_ko: "자부심", state_en: "Pride", antidote_ko: "겸손, 감사, 타인의 기여 인정, 자만심 경계", antidote_en: "Humility, gratitude, acknowledging others' contributions, guarding against arrogance" },
      { state_ko: "나체스", state_en: "Naches", antidote_ko: "겸손, 자녀/제자의 독립성 존중, 과도한 기대 자제", antidote_en: "Humility, respecting independence of children/mentees, moderating expectations" },
      { state_ko: "경이", state_en: "Wonder", antidote_ko: "현재에 머물기, 집착 않기, 열린 마음 유지", antidote_en: "Staying present, not grasping, maintaining open mind" },
      { state_ko: "흥분", state_en: "Excitement", antidote_ko: "균형, 현재 순간에 머물기, 과도한 기대 조절", antidote_en: "Balance, staying in the present moment, moderating excessive expectations" },
      { state_ko: "황홀경", state_en: "Ecstasy", antidote_ko: "무상함 인식, 집착 않기, 일상으로의 복귀", antidote_en: "Recognizing impermanence, not grasping, returning to daily life" }
    ],
    obstacles: [
      { state_ko: "즐거움 전체", state_en: "All Enjoyment", obstacle_ko: "집착, 비관주의, 부정성, 무감각", obstacle_en: "Grasping, pessimism, negativity, numbness" },
      { state_ko: "감각적 쾌락", state_en: "Sensory Pleasure", obstacle_ko: "집착, 탐닉, 중독", obstacle_en: "Grasping, indulgence, addiction" },
      { state_ko: "환희", state_en: "Rejoicing", obstacle_ko: "시기, 비교, 자기 비하", obstacle_en: "Envy, comparison, self-deprecation" },
      { state_ko: "평화", state_en: "Peace", obstacle_ko: "불안, 집착, 미래 걱정", obstacle_en: "Anxiety, grasping, worrying about future" },
      { state_ko: "경이", state_en: "Wonder", obstacle_ko: "무감각, 냉소주의, 닫힌 마음", obstacle_en: "Numbness, cynicism, closed-mindedness" },
      { state_ko: "황홀감", state_en: "Ecstasy", obstacle_ko: "집착, 재현하려는 욕구, 현재 순간 놓침", obstacle_en: "Grasping, desire to recreate, missing the present moment" }
    ]
  }
};

export const emotionOrder = ['anger', 'fear', 'disgust', 'sadness', 'enjoyment'];

export const sectionNames = {
  introduction: { ko: '소개', en: 'Introduction' },
  triggers: { ko: '타임라인', en: 'Timeline' },
  continents: { ko: '경험', en: 'Experience' },
  actions: { ko: '반응', en: 'Response' },
  links: { ko: '전략', en: 'Strategies' },
  explore: { ko: '탐험', en: 'Explore' },
  'korean-emotions': { ko: '한국인의 감정', en: 'Korean Emotions' }
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

// 감정별 상세 트리거 및 반응 데이터 (원본 사이트 기반)
export const emotionTriggersResponses = {
  anger: {
    triggers: [
      { text_ko: "친구가 당신에게 화를 낸다", text_en: "A friend gets upset with you" },
      { text_ko: "누군가가 당신의 목표를 방해한다", text_en: "Someone interferes with your goals" },
      { text_ko: "부당한 대우를 받는다", text_en: "You are treated unfairly" },
      { text_ko: "누군가가 당신을 모욕한다", text_en: "Someone insults you" },
      { text_ko: "기대한 것이 충족되지 않는다", text_en: "Expectations are not met" },
      { text_ko: "통제력을 잃는다", text_en: "You lose control of a situation" },
      { text_ko: "거짓말을 당한다", text_en: "You are lied to" },
      { text_ko: "배신당한다", text_en: "You are betrayed" }
    ],
    intrinsicActions: [
      { text_ko: "말다툼", text_en: "Quarrel", type: "ambiguous" },
      { text_ko: "공격", text_en: "Attack", type: "destructive" },
      { text_ko: "위협", text_en: "Threaten", type: "destructive" },
      { text_ko: "격분/폭발", text_en: "Explode", type: "destructive" },
      { text_ko: "소리 지르기", text_en: "Yell", type: "destructive" },
      { text_ko: "침묵하기", text_en: "Go silent", type: "ambiguous" }
    ],
    intentionalActions: [
      { text_ko: "한계 설정하기", text_en: "Set limits", type: "constructive" },
      { text_ko: "자기주장하기", text_en: "Assert oneself", type: "constructive" },
      { text_ko: "문제 해결하기", text_en: "Problem solve", type: "constructive" },
      { text_ko: "협상하기", text_en: "Negotiate", type: "constructive" },
      { text_ko: "진정하기", text_en: "Calm down", type: "constructive" },
      { text_ko: "관점 바꾸기", text_en: "Change perspective", type: "constructive" },
      { text_ko: "용서하기", text_en: "Forgive", type: "constructive" }
    ],
    signal: {
      text_ko: "노려보기, 내려간 눈썹, 좁아진 입술, 긴장된 턱, 붉어진 얼굴",
      text_en: "Glaring eyes, lowered eyebrows, narrowed lips, tense jaw, flushed face"
    },
    message: {
      text_ko: "내 앞에서 비켜라",
      text_en: "Get out of my way"
    }
  },
  fear: {
    triggers: [
      { text_ko: "어두운 골목을 혼자 걷는다", text_en: "Walking alone through a dark alley" },
      { text_ko: "높은 곳에 서있다", text_en: "Standing in a high place" },
      { text_ko: "중요한 발표를 앞두고 있다", text_en: "Facing an important presentation" },
      { text_ko: "갑작스러운 큰 소리가 난다", text_en: "Sudden loud noise" },
      { text_ko: "건강에 대한 나쁜 소식을 듣는다", text_en: "Receiving bad health news" },
      { text_ko: "미래가 불확실하다", text_en: "Uncertain future" },
      { text_ko: "사랑하는 사람이 위험에 처했다", text_en: "Loved one in danger" },
      { text_ko: "실패할 것 같은 느낌이 든다", text_en: "Feeling you might fail" }
    ],
    intrinsicActions: [
      { text_ko: "회피", text_en: "Avoid", type: "ambiguous" },
      { text_ko: "도주", text_en: "Flee", type: "ambiguous" },
      { text_ko: "경직/얼어붙음", text_en: "Freeze", type: "ambiguous" },
      { text_ko: "숨기", text_en: "Hide", type: "ambiguous" },
      { text_ko: "비명 지르기", text_en: "Scream", type: "ambiguous" },
      { text_ko: "웅크리기", text_en: "Cower", type: "destructive" }
    ],
    intentionalActions: [
      { text_ko: "확인하기", text_en: "Check", type: "constructive" },
      { text_ko: "대비하기", text_en: "Prepare", type: "constructive" },
      { text_ko: "도움 구하기", text_en: "Seek help", type: "constructive" },
      { text_ko: "직면하기", text_en: "Confront", type: "constructive" },
      { text_ko: "심호흡하기", text_en: "Deep breathing", type: "constructive" },
      { text_ko: "정보 수집하기", text_en: "Gather information", type: "constructive" },
      { text_ko: "계획 세우기", text_en: "Make a plan", type: "constructive" }
    ],
    signal: {
      text_ko: "크게 뜬 눈, 올라간 눈썹, 수평으로 늘어난 입술, 창백한 얼굴",
      text_en: "Wide eyes, raised eyebrows, horizontally stretched lips, pale face"
    },
    message: {
      text_ko: "도와주세요",
      text_en: "Help me"
    }
  },
  disgust: {
    triggers: [
      { text_ko: "썩은 음식 냄새를 맡는다", text_en: "Smelling rotten food" },
      { text_ko: "비위생적인 환경을 본다", text_en: "Seeing an unsanitary environment" },
      { text_ko: "비도덕적 행위를 목격한다", text_en: "Witnessing immoral behavior" },
      { text_ko: "거짓말을 당한다", text_en: "Being lied to" },
      { text_ko: "역겨운 광경을 본다", text_en: "Seeing something revolting" },
      { text_ko: "누군가의 위선을 본다", text_en: "Seeing someone's hypocrisy" },
      { text_ko: "경멸할 만한 행동을 본다", text_en: "Seeing contemptible behavior" },
      { text_ko: "부패나 타락을 목격한다", text_en: "Witnessing corruption" }
    ],
    intrinsicActions: [
      { text_ko: "밀어내기", text_en: "Push away", type: "ambiguous" },
      { text_ko: "피하기", text_en: "Avoid", type: "ambiguous" },
      { text_ko: "구역질", text_en: "Gag", type: "ambiguous" },
      { text_ko: "경멸하기", text_en: "Scorn", type: "destructive" },
      { text_ko: "고개 돌리기", text_en: "Turn away", type: "ambiguous" },
      { text_ko: "비난하기", text_en: "Criticize", type: "destructive" }
    ],
    intentionalActions: [
      { text_ko: "재평가하기", text_en: "Reappraise", type: "constructive" },
      { text_ko: "정화/청소하기", text_en: "Cleanse", type: "constructive" },
      { text_ko: "거리두기", text_en: "Distance", type: "constructive" },
      { text_ko: "이해하려 노력하기", text_en: "Try to understand", type: "constructive" },
      { text_ko: "연민 가지기", text_en: "Have compassion", type: "constructive" },
      { text_ko: "상황 개선하기", text_en: "Improve situation", type: "constructive" }
    ],
    signal: {
      text_ko: "찡그린 코, 올라간 윗입술, 좁아진 눈, 고개 돌림",
      text_en: "Wrinkled nose, raised upper lip, narrowed eyes, head turning away"
    },
    message: {
      text_ko: "저것을 멀리해라",
      text_en: "Get that away from me"
    }
  },
  sadness: {
    triggers: [
      { text_ko: "사랑하는 사람을 잃는다", text_en: "Losing a loved one" },
      { text_ko: "중요한 목표에 실패한다", text_en: "Failing at an important goal" },
      { text_ko: "외로움을 느낀다", text_en: "Feeling lonely" },
      { text_ko: "거절당한다", text_en: "Being rejected" },
      { text_ko: "소중한 것을 잃는다", text_en: "Losing something precious" },
      { text_ko: "기대가 무너진다", text_en: "Expectations shattered" },
      { text_ko: "이별을 겪는다", text_en: "Going through separation" },
      { text_ko: "무력함을 느낀다", text_en: "Feeling helpless" }
    ],
    intrinsicActions: [
      { text_ko: "울기", text_en: "Cry", type: "ambiguous" },
      { text_ko: "위축되기", text_en: "Withdraw", type: "ambiguous" },
      { text_ko: "신음하기", text_en: "Moan", type: "ambiguous" },
      { text_ko: "포기하기", text_en: "Give up", type: "destructive" },
      { text_ko: "한숨 쉬기", text_en: "Sigh", type: "ambiguous" },
      { text_ko: "혼자 있기", text_en: "Isolate", type: "ambiguous" }
    ],
    intentionalActions: [
      { text_ko: "위로 구하기", text_en: "Seek comfort", type: "constructive" },
      { text_ko: "애도하기", text_en: "Mourn", type: "constructive" },
      { text_ko: "회복하기", text_en: "Recover", type: "constructive" },
      { text_ko: "지지 요청하기", text_en: "Ask for support", type: "constructive" },
      { text_ko: "성찰하기", text_en: "Reflect", type: "constructive" },
      { text_ko: "감정 표현하기", text_en: "Express feelings", type: "constructive" },
      { text_ko: "앞으로 나아가기", text_en: "Move forward", type: "constructive" }
    ],
    signal: {
      text_ko: "처진 눈꺼풀, 축 처진 어깨, 느린 움직임, 눈물",
      text_en: "Drooping eyelids, slumped shoulders, slow movements, tears"
    },
    message: {
      text_ko: "나를 위로해주세요",
      text_en: "Comfort me"
    }
  },
  enjoyment: {
    triggers: [
      { text_ko: "사랑하는 사람을 만난다", text_en: "Meeting a loved one" },
      { text_ko: "목표를 달성한다", text_en: "Achieving a goal" },
      { text_ko: "맛있는 음식을 먹는다", text_en: "Eating delicious food" },
      { text_ko: "아름다운 풍경을 본다", text_en: "Seeing a beautiful view" },
      { text_ko: "성공을 경험한다", text_en: "Experiencing success" },
      { text_ko: "감사한 순간을 경험한다", text_en: "Experiencing gratitude" },
      { text_ko: "사랑받는다고 느낀다", text_en: "Feeling loved" },
      { text_ko: "도전을 극복한다", text_en: "Overcoming a challenge" }
    ],
    intrinsicActions: [
      { text_ko: "외치다/환호", text_en: "Exclaim", type: "constructive" },
      { text_ko: "참여/연결하기", text_en: "Engage/Connect", type: "constructive" },
      { text_ko: "우쭐대기", text_en: "Gloat", type: "ambiguous" },
      { text_ko: "탐닉하기", text_en: "Indulge", type: "ambiguous" },
      { text_ko: "웃기", text_en: "Laugh", type: "constructive" },
      { text_ko: "껴안기", text_en: "Hug", type: "constructive" }
    ],
    intentionalActions: [
      { text_ko: "유지하기", text_en: "Maintain", type: "constructive" },
      { text_ko: "음미하기", text_en: "Savor", type: "constructive" },
      { text_ko: "더 추구하기", text_en: "Seek more", type: "ambiguous" },
      { text_ko: "나누기", text_en: "Share", type: "constructive" },
      { text_ko: "감사 표현하기", text_en: "Express gratitude", type: "constructive" },
      { text_ko: "축하하기", text_en: "Celebrate", type: "constructive" },
      { text_ko: "기억하기", text_en: "Remember", type: "constructive" }
    ],
    signal: {
      text_ko: "진짜 미소 (뒤센 미소), 밝은 눈, 이완된 자세, 웃음",
      text_en: "Genuine smile (Duchenne), bright eyes, relaxed posture, laughter"
    },
    message: {
      text_ko: "이 순간을 함께 나누고 싶다",
      text_en: "I want to share this moment"
    }
  }
};

// 감정 에피소드 타임라인 상세 단계 (HOW DOES THIS HAPPEN)
export const emotionalEpisodeSteps = {
  steps: [
    {
      id: 1,
      name_ko: "사전 조건",
      name_en: "PRE-CONDITION",
      description_ko: "감정에 영향을 미치는 상황이나 맥락입니다. 과거 경험, 현재 기분, 성격 특성, 신체 상태 등이 포함됩니다. 이러한 요소들이 다음에 오는 자극에 대한 우리의 반응 방식을 형성합니다.",
      description_en: "The situation or context that influences emotions. This includes past experiences, current mood, personality traits, physical state, etc. These factors shape how we respond to stimuli.",
      color: "#f5f5f5",
      icon: "conditions"
    },
    {
      id: 2,
      name_ko: "이벤트",
      name_en: "EVENT",
      description_ko: "외부 또는 내부에서 마주치는 사람, 장소, 상황, 이미지, 생각 등입니다. 세상에서 무언가가 일어나거나 우리 마음속에서 생각이 떠오릅니다.",
      description_en: "A person, place, situation, image, or thought encountered externally or internally. Something happens in the world or a thought arises in our mind.",
      color: "#FFE5D4",
      icon: "event"
    },
    {
      id: 3,
      name_ko: "트리거",
      name_en: "TRIGGER",
      description_ko: "자동 평가 시스템이 데이터베이스의 감정 스크립트와 일치하는 조합을 찾을 때 발생합니다. 이 평가는 밀리초 단위로 무의식적으로 일어납니다.",
      description_en: "Occurs when the automatic appraisal system finds a match with emotional scripts in the database. This evaluation happens unconsciously in milliseconds.",
      color: "emotion",
      icon: "trigger"
    },
    {
      id: 4,
      name_ko: "경험",
      name_en: "EXPERIENCE",
      description_ko: "감정 자체를 경험하는 단계입니다. 신체적 변화(얼굴의 열감, 턱이나 어깨의 긴장, 심박수 증가 등)와 심리적 변화(감정의 질적 경험)가 함께 나타납니다.",
      description_en: "The stage of experiencing the emotion itself. Physical changes (facial warmth, jaw/shoulder tension, increased heart rate) and psychological changes (qualitative experience of emotion) occur together.",
      color: "emotion",
      icon: "experience",
      subComponents: [
        { name_ko: "신체적 변화", name_en: "Physical Changes", description_ko: "얼굴의 열감, 턱이나 어깨의 긴장, 심박수 증가 등 자율신경계의 반응" },
        { name_ko: "심리적 변화", name_en: "Psychological Changes", description_ko: "감정의 질적 경험, 특정 감정에 대한 주관적 느낌" },
        { name_ko: "지각 데이터베이스", name_en: "Perception Database", description_ko: "보편적 감정 기억과 개인적 경험이 저장된 곳" }
      ]
    },
    {
      id: 5,
      name_ko: "반응",
      name_en: "RESPONSE",
      description_ko: "감정적 반응 단계입니다. 건설적(도움이 되는) 또는 파괴적(해로운) 행동이 나타날 수 있습니다. 이 단계에서 선택적 필터 기간이 시작되어 감정과 일치하는 정보만 받아들이게 됩니다.",
      description_en: "The emotional response stage. Constructive (helpful) or destructive (harmful) actions may occur. The selective filter period begins, accepting only information consistent with the emotion.",
      color: "emotion",
      icon: "response",
      subComponents: [
        { name_ko: "행동", name_en: "Action", description_ko: "감정적 반응 - 건설적 또는 파괴적" },
        { name_ko: "사후 조건", name_en: "Post-Condition", description_ko: "감정 행동의 결과와 영향" },
        { name_ko: "선택적 필터 기간", name_en: "Selective Filter Period", description_ko: "행동 시작과 함께 개시되는 선택적 필터링" }
      ]
    }
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
