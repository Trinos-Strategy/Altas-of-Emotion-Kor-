// ============================================
// 추가 데이터 - Partially Charted Emotions, Impediments, 상세 Timeline 등
// 원본 atlasofemotions.org 기반
// ============================================

// 부분적으로 탐구된 감정들 (Partially Charted Emotions)
// 과학자들 사이에서 50% 이하의 합의만 이루어진 감정들
export const partiallyChartedEmotions = [
  {
    id: 'love',
    name_ko: '사랑',
    name_en: 'Love',
    color: '#FF6B9D',
    description_ko: '타인에 대한 강한 애착으로, 주로 부모와 자녀 사이, 또는 연인 사이에서 경험됩니다. 사랑하는 관계 안에서 분노, 두려움, 슬픔, 혐오, 즐거움 모두 경험할 수 있습니다.',
    description_en: 'A strong attachment to another person, typically parent toward child and child toward parent, but also between those romantically committed. Within loving relationships, anger, fear, sadness, disgust and enjoyment can all be experienced.'
  },
  {
    id: 'surprise',
    name_ko: '놀람',
    name_en: 'Surprise',
    color: '#FFD93D',
    description_ko: '가장 짧은 감정으로, 예상치 못한 사건의 갑작스러운 발생에 의해 촉발됩니다. 종종 더 많은 평가 후 다른 감정으로 이어지는 중간 단계 역할을 합니다.',
    description_en: 'The briefest emotion, surprise is triggered by the sudden occurrence of an unexpected event. It is often a way station that leads, after more appraisal, to any of the other emotions.'
  },
  {
    id: 'jealousy',
    name_ko: '질투',
    name_en: 'Jealousy',
    color: '#9B59B6',
    description_ko: '세 사람이 관련된 감정적 스토리라인입니다: 원하는 사람, 그 사람의 헌신을 잃을까 두려워하는 사람, 그리고 경쟁자. 질투 중에 세 사람 모두 분노, 두려움, 혐오, 슬픔, 놀람을 느낄 수 있습니다.',
    description_en: 'An emotional storyline involving three people: the desired person, the person afraid of losing the commitment of the desired person, and the rival. During jealousy, anger, fear, disgust, sadness or surprise may be felt by any of the three people.'
  },
  {
    id: 'envy',
    name_ko: '시기',
    name_en: 'Envy',
    color: '#27AE60',
    description_ko: '질투와 자주 혼동되지만, 시기는 다른 사람이 가진 것을 원하고 분개하는 것을 포함합니다. 시기를 느낄 때 분노, 경멸, 슬픔도 함께 느낄 수 있습니다.',
    description_en: 'Although often misused as a synonym for jealousy, envy involves resenting and wanting what another person possesses. When a person feels envy, anger, contempt or sadness may also be felt.'
  },
  {
    id: 'hate',
    name_ko: '증오',
    name_en: 'Hate',
    color: '#2C3E50',
    description_ko: '특정 개인이나 집단에 집중된 지속적인 분노입니다. 시간이 지나면서 증오는 적대적인 성격 특성을 만들어낼 수 있습니다.',
    description_en: 'Enduring anger focused on a particular person or group of persons. Over time hatred may generate the personality trait of hostility.'
  },
  {
    id: 'embarrassment',
    name_ko: '당혹감',
    name_en: 'Embarrassment',
    color: '#E74C3C',
    description_ko: '자의식적인 고통이나 어색함입니다. 종종 타인의 칭찬이나 실수에 의해 활성화됩니다. 목소리 신호는 없지만, 밝은 피부를 가진 사람에게서만 보이는 얼굴 붉어짐을 유발할 수 있습니다.',
    description_en: 'Self-conscious distress or awkwardness. Often activated by praise from another, or by a faux pas. It has no vocal signal, but may cause a blush that is visible only in light-skinned people.'
  },
  {
    id: 'shame',
    name_ko: '수치심',
    name_en: 'Shame',
    color: '#8E44AD',
    description_ko: '자신이 생각하거나 행한 것을 타인이 알면 역겨워할 것이라는 기대입니다. 자신이 한 일이나 생각한 것을 타인이 알지 못하게 하려는 강한 욕구를 유발합니다.',
    description_en: 'An expectation that others would be disgusted if they knew what the person was thinking of or had done. It motivates a strong wish to prevent others from learning what the person has done or thought.'
  },
  {
    id: 'contempt',
    name_ko: '경멸',
    name_en: 'Contempt',
    color: '#7F8C8D',
    description_ko: '아동 발달에서 가장 늦게 나타나는 감정으로, 대상에 대한 도덕적 우월감입니다. 종종 즐거움과 혼합됩니다.',
    description_en: 'The last emotion to appear in child development, it is a feeling of moral superiority to the target. Often mixed with enjoyment.'
  },
  {
    id: 'guilt',
    name_ko: '죄책감',
    name_en: 'Guilt',
    color: '#34495E',
    description_ko: '과거 행동에 대한 후회로, 잘못된 행동을 고백하고 용서를 바라는 욕구를 유발합니다.',
    description_en: 'Regret about a past action, which motivates the wish to confess the wrongful action, hoping for forgiveness.'
  }
];

// 감정별 상세 신호와 메시지 (Signal and Message)
export const signalAndMessage = {
  anger: {
    signal_ko: '목소리에서 분노는 통제되지 않으면 포효를 만들어냅니다. 통제될 때 목소리는 날카로운 모서리를 가질 수 있습니다. 얼굴에서 분노는 눈썹이 내려가고 함께 당겨지며, 눈이 노려보고, 입술이 좁아지거나 벌어져 이를 드러냅니다.',
    signal_en: 'In the voice, anger generates a roar if not controlled; when anger is controlled, the voice may have a sharp edge. In the face, anger is shown by the eyebrows being lowered and drawn together, eyes glaring, and lips narrowed or open showing teeth.',
    message_ko: '내 앞에서 비켜라',
    message_en: 'Get out of my way'
  },
  fear: {
    signal_ko: '목소리에서 두려움은 비명이나 금이 간 듯한 소리를 만들어냅니다. 얼굴에서 두려움은 눈썹이 올라가고 함께 당겨지며, 위 눈꺼풀이 올라가고 아래 눈꺼풀이 긴장하며, 입술이 수평으로 늘어납니다.',
    signal_en: 'In the voice, fear generates a scream or cracked sound. In the face, fear is shown by eyebrows raised and drawn together, upper eyelid raised and lower eyelid tensed, lips stretched horizontally.',
    message_ko: '도와주세요',
    message_en: 'Help me'
  },
  disgust: {
    signal_ko: '목소리에서 혐오는 "으악" 또는 구역질 소리를 만들어냅니다. 얼굴에서 혐오는 코가 찡그려지고, 윗입술이 올라가며, 아랫입술이 내밀어지고, 눈이 좁아집니다.',
    signal_en: 'In the voice, disgust generates an "ugh" or gagging sound. In the face, disgust is shown by the nose wrinkling, upper lip raised, lower lip protruding, and eyes narrowed.',
    message_ko: '저것을 멀리해라',
    message_en: 'Get that away from me'
  },
  sadness: {
    signal_ko: '목소리에서 슬픔은 흐느낌이나 한숨을 만들어냅니다. 얼굴에서 슬픔은 눈썹 안쪽 모서리가 올라가고, 눈꺼풀이 처지며, 입 모서리가 내려갑니다.',
    signal_en: 'In the voice, sadness generates sobbing or sighing. In the face, sadness is shown by inner corners of eyebrows raised, eyelids drooping, corners of mouth turned down.',
    message_ko: '나를 위로해주세요',
    message_en: 'Comfort me'
  },
  enjoyment: {
    signal_ko: '목소리에서 즐거움은 웃음이나 만족스러운 한숨을 만들어냅니다. 얼굴에서 즐거움은 입 모서리가 올라가고, 볼이 올라가며, 눈 주위에 주름이 생깁니다 (뒤센 미소).',
    signal_en: 'In the voice, enjoyment generates laughter or contented sighs. In the face, enjoyment is shown by corners of mouth raised, cheeks raised, and wrinkles around eyes (Duchenne smile).',
    message_ko: '이것은 좋다',
    message_en: 'This is good'
  }
};

// 상세 기분 (Moods) 정보
export const moodsDetailed = {
  irritable: {
    name_ko: '짜증스러운',
    name_en: 'Irritable',
    emotion: 'anger',
    description_ko: '쉽게 화가 나는 상태로, 명확한 트리거 없이도 반복적으로 관련 감정을 느끼게 합니다.',
    description_en: 'Predisposed to becoming angry, easily provoked. Causes us to feel the related emotion repeatedly without any clear trigger.'
  },
  apprehensive: {
    name_ko: '불안한',
    name_en: 'Apprehensive',
    emotion: 'fear',
    description_ko: '나쁜 일이 일어날 것 같은 불안감으로, 가장자리에 서 있는 느낌입니다.',
    description_en: 'Anxious that something bad will happen, on edge.'
  },
  sour: {
    name_ko: '시큰둥한',
    name_en: 'Sour',
    emotion: 'disgust',
    description_ko: '전반적으로 불쾌하고 혐오스러운 상태입니다.',
    description_en: 'Generally repulsed.'
  },
  dysphoric: {
    name_ko: '우울한',
    name_en: 'Dysphoric',
    emotion: 'sadness',
    description_ko: '지속적인 낙담과 실망의 느낌입니다.',
    description_en: 'An enduring feeling of discouragement or disappointment.'
  },
  elated: {
    name_ko: '들뜬',
    name_en: 'Elated',
    emotion: 'enjoyment',
    description_ko: '오래 지속되는 일반화된 좋은 기분입니다.',
    description_en: 'A long-lasting, generalized good feeling.'
  }
};

// 상세 성격 특성 (Personality Traits)
export const personalityTraitsDetailed = {
  anger: {
    trait_ko: '적대적인',
    trait_en: 'Hostile',
    description_ko: '적대적인 사람은 자주 화를 내며 분노 반응의 빈도로 타인에게 알려집니다. 종종 분노는 어떤 좌절에도 발생하며, 좌절에 대한 임계값이 낮습니다. 적대적인 사람들은 나중에 후회하고 분노에 대해 사과할 수 있지만, 그럼에도 불구하고 계속 화를 내며 반응합니다. 때때로 적대적인 사람들은 불쾌한 방식으로 분노를 표현하여 타인을 비하하고 심리적 고통을 줍니다.',
    description_en: 'A hostile person is often angry and is known to others for the frequency of anger responses to the world. Often anger occurs with any frustration; the threshold for frustration is low. Hostile people may experience regret afterward and apologize for their anger, but nevertheless continue to respond angrily. Sometimes hostile people express their anger in a nasty way, using words to demean and cause psychological pain to others.'
  },
  fear: {
    trait_ko: '소심한',
    trait_en: 'Timid',
    description_ko: '소심한 사람은 쉽게 두려워하며, 많은 상황에서 두려움을 느끼고, 두려움의 임계값이 낮습니다.',
    description_en: 'A timid person is easily frightened, feels fear in many situations, and has a low threshold for fear.'
  },
  disgust: {
    trait_ko: '혐오적인',
    trait_en: 'Disgusted',
    description_ko: '혐오적인 사람은 많은 것에서 혐오감을 느끼며, 혐오의 임계값이 낮습니다.',
    description_en: 'A disgusted person finds many things disgusting and has a low threshold for disgust.'
  },
  sadness: {
    trait_ko: '우울한',
    trait_en: 'Melancholic',
    description_ko: '우울한 사람은 쉽게 슬퍼지며, 많은 상황에서 슬픔을 느끼고, 슬픔의 임계값이 낮습니다.',
    description_en: 'A melancholic person is easily saddened, feels sadness in many situations, and has a low threshold for sadness.'
  },
  enjoyment: {
    trait_ko: '쾌활한',
    trait_en: 'Exuberant',
    description_ko: '쾌활한 사람은 쉽게 즐거워하며, 많은 상황에서 즐거움을 느끼고, 즐거움의 임계값이 낮습니다.',
    description_en: 'An exuberant person is easily pleased, feels enjoyment in many situations, and has a low threshold for enjoyment.'
  }
};

// 상세 정신병리 (Psychopathology)
export const psychopathologyDetailed = {
  anger: [
    { name_ko: '간헐적 폭발 장애', name_en: 'Intermittent Explosive Disorder', description_ko: '반복적인 행동 폭발로 공격성을 표현하지 못하는 것' },
    { name_ko: '적대적 반항 장애', name_en: 'Oppositional Defiance Disorder', description_ko: '권위 있는 인물에 대한 분노하고 짜증나는 기분, 논쟁적이고 반항적인 행동' },
    { name_ko: '반사회적 성격 장애', name_en: 'Antisocial Personality Disorder', description_ko: '타인의 권리를 무시하고 침해하는 패턴' },
    { name_ko: '파괴적 기분 조절 장애', name_en: 'Disruptive Mood Dysregulation Disorder', description_ko: '심각한 반복적 분노 폭발' }
  ],
  fear: [
    { name_ko: '사회 불안 장애', name_en: 'Social Anxiety Disorder', description_ko: '사회적 상황에서의 현저한 두려움이나 불안' },
    { name_ko: '외상 후 스트레스 장애', name_en: 'PTSD', description_ko: '외상적 사건 후 지속되는 두려움과 불안' },
    { name_ko: '회피성 성격 장애', name_en: 'Avoidant Personality Disorder', description_ko: '사회적 억제, 부적절감, 부정적 평가에 대한 과민성' },
    { name_ko: '범불안 장애', name_en: 'Generalized Anxiety Disorder', description_ko: '과도한 불안과 걱정' },
    { name_ko: '강박 장애', name_en: 'OCD', description_ko: '반복적인 강박 사고와 강박 행동' }
  ],
  disgust: [
    { name_ko: '신경성 식욕부진증', name_en: 'Anorexia Nervosa', description_ko: '음식과 체중에 대한 혐오' },
    { name_ko: '신체 이형 장애', name_en: 'Body Dysmorphic Disorder', description_ko: '자신의 외모에 대한 혐오' },
    { name_ko: '폭식증', name_en: 'Bulimia', description_ko: '음식과 자신에 대한 혐오' },
    { name_ko: '성적 혐오 장애', name_en: 'Sexual Aversion Disorder', description_ko: '성적 접촉에 대한 혐오' }
  ],
  sadness: [
    { name_ko: '주요 우울 장애', name_en: 'Major Depressive Disorder', description_ko: '지속적인 슬픔과 흥미 상실' },
    { name_ko: '기분저하증', name_en: 'Dysthymia', description_ko: '만성적이지만 덜 심한 우울' },
    { name_ko: '양극성 장애', name_en: 'Bipolar Disorder', description_ko: '극심한 기분 변동' }
  ],
  enjoyment: [
    { name_ko: '조증 에피소드', name_en: 'Mania/Manic Episode', description_ko: '비정상적으로 고양된 기분' },
    { name_ko: '순환성 기분 장애', name_en: 'Cyclothemia', description_ko: '경조증과 우울 증상의 순환' }
  ]
};

// 장애물 (Impediments) - 감정 조절을 방해하는 요소들 (모든 감정)
export const impediments = {
  anger: {
    title_ko: '분노 조절의 장애물',
    title_en: 'Impediments to Managing Anger',
    description_ko: '분노를 건설적으로 다루는 것을 방해하는 요소들입니다.',
    description_en: 'Factors that block constructive handling of anger.',
    color: '#E07B6E',
    items: [
      { name_ko: '반추', name_en: 'Rumination', description_ko: '화나는 상황을 반복적으로 생각하면 분노가 증폭됩니다.', description_en: 'Repeatedly thinking about angering situations amplifies anger.' },
      { name_ko: '정당화', name_en: 'Justification', description_ko: '분노가 완전히 정당하다고 믿으면 변화의 동기가 줄어듭니다.', description_en: 'Believing anger is entirely justified reduces motivation to change.' },
      { name_ko: '흑백 사고', name_en: 'Black-and-White Thinking', description_ko: '상황을 극단적으로 해석하면 분노가 강화됩니다.', description_en: 'Interpreting situations in extremes intensifies anger.' },
      { name_ko: '비난', name_en: 'Blame', description_ko: '타인에게만 책임을 돌리면 해결책을 찾기 어렵습니다.', description_en: 'Placing all responsibility on others makes finding solutions difficult.' },
      { name_ko: '과거 상처', name_en: 'Past Wounds', description_ko: '해결되지 않은 과거의 상처가 현재 분노를 증폭시킵니다.', description_en: 'Unresolved past hurts amplify current anger.' },
      { name_ko: '스트레스', name_en: 'Chronic Stress', description_ko: '만성적 스트레스는 분노의 임계값을 낮춥니다.', description_en: 'Chronic stress lowers the threshold for anger.' }
    ]
  },
  fear: {
    title_ko: '두려움 극복의 장애물',
    title_en: 'Impediments to Overcoming Fear',
    description_ko: '두려움을 건설적으로 다루는 것을 방해하는 요소들입니다.',
    description_en: 'Factors that block constructive handling of fear.',
    color: '#9B7BB8',
    items: [
      { name_ko: '회피', name_en: 'Avoidance', description_ko: '두려운 상황을 피하면 두려움이 더 강화됩니다.', description_en: 'Avoiding feared situations strengthens the fear.' },
      { name_ko: '파국적 사고', name_en: 'Catastrophizing', description_ko: '최악의 결과만 상상하면 두려움이 증폭됩니다.', description_en: 'Imagining only worst-case scenarios amplifies fear.' },
      { name_ko: '과잉경계', name_en: 'Hypervigilance', description_ko: '위협을 지나치게 경계하면 불안이 지속됩니다.', description_en: 'Being overly alert to threats maintains anxiety.' },
      { name_ko: '안전 행동', name_en: 'Safety Behaviors', description_ko: '과도한 안전 추구가 오히려 두려움을 유지시킵니다.', description_en: 'Excessive safety-seeking behaviors maintain fear.' },
      { name_ko: '불확실성 불내성', name_en: 'Intolerance of Uncertainty', description_ko: '불확실한 상황을 견디지 못하면 불안이 커집니다.', description_en: 'Inability to tolerate uncertainty increases anxiety.' },
      { name_ko: '통제 욕구', name_en: 'Need for Control', description_ko: '모든 것을 통제하려는 욕구가 두려움을 강화합니다.', description_en: 'The need to control everything strengthens fear.' }
    ]
  },
  disgust: {
    title_ko: '혐오 조절의 장애물',
    title_en: 'Impediments to Managing Disgust',
    description_ko: '혐오를 건설적으로 다루는 것을 방해하는 요소들입니다.',
    description_en: 'Factors that block constructive handling of disgust.',
    color: '#6BAF8D',
    items: [
      { name_ko: '경직된 기준', name_en: 'Rigid Standards', description_ko: '엄격한 도덕적/위생적 기준이 혐오를 확대합니다.', description_en: 'Strict moral/hygienic standards amplify disgust.' },
      { name_ko: '오염 사고', name_en: 'Contamination Thinking', description_ko: '"더러움"이 퍼진다는 생각이 혐오를 강화합니다.', description_en: 'Thinking "dirtiness" spreads strengthens disgust.' },
      { name_ko: '도덕적 우월감', name_en: 'Moral Superiority', description_ko: '자신이 도덕적으로 우월하다는 믿음이 경멸을 강화합니다.', description_en: 'Belief in moral superiority strengthens contempt.' },
      { name_ko: '일반화', name_en: 'Overgeneralization', description_ko: '한 부분의 혐오를 전체로 확대합니다.', description_en: 'Extending disgust from one part to the whole.' },
      { name_ko: '감정적 추론', name_en: 'Emotional Reasoning', description_ko: '"혐오스럽게 느껴지니까 혐오스러운 것이다"라고 생각합니다.', description_en: 'Thinking "it feels disgusting, so it must be disgusting."' },
      { name_ko: '고정관념', name_en: 'Stereotyping', description_ko: '특정 집단에 대한 편견이 혐오를 유발합니다.', description_en: 'Prejudice against certain groups triggers disgust.' }
    ]
  },
  sadness: {
    title_ko: '슬픔 회복의 장애물',
    title_en: 'Impediments to Recovering from Sadness',
    description_ko: '슬픔에서 회복하는 것을 방해하는 요소들입니다.',
    description_en: 'Factors that block recovery from sadness.',
    color: '#6B9DC4',
    items: [
      { name_ko: '고립', name_en: 'Isolation', description_ko: '사회적 고립이 슬픔을 악화시킵니다.', description_en: 'Social isolation worsens sadness.' },
      { name_ko: '억압', name_en: 'Suppression', description_ko: '슬픔을 억누르면 해소되지 않고 지속됩니다.', description_en: 'Suppressing sadness prevents it from resolving.' },
      { name_ko: '자기 비난', name_en: 'Self-Blame', description_ko: '모든 것이 자신의 잘못이라고 생각합니다.', description_en: 'Thinking everything is your fault.' },
      { name_ko: '무력감 학습', name_en: 'Learned Helplessness', description_ko: '아무것도 바꿀 수 없다고 믿으면 회복이 어렵습니다.', description_en: 'Believing nothing can be changed makes recovery difficult.' },
      { name_ko: '반추', name_en: 'Rumination', description_ko: '슬픈 생각을 반복하면 우울이 깊어집니다.', description_en: 'Repeatedly thinking sad thoughts deepens depression.' },
      { name_ko: '미래 절망', name_en: 'Hopelessness', description_ko: '미래가 나아지지 않을 것이라는 믿음이 회복을 막습니다.', description_en: 'Belief that the future won\'t improve blocks recovery.' }
    ]
  },
  enjoyment: {
    title_ko: '즐거움의 장애물',
    title_en: 'Impediments to Enjoyment',
    description_ko: '긍정적 감정을 경험하는 것을 방해하는 요소들입니다.',
    description_en: 'Factors that block the experience of positive emotions.',
    color: '#E8C547',
    items: [
      { name_ko: '집착', name_en: 'Grasping', description_ko: '즐거움에 지나치게 매달리면 오히려 그것을 밀어냅니다.', description_en: 'Clinging too tightly to pleasure pushes it away.' },
      { name_ko: '비관주의', name_en: 'Pessimism', description_ko: '부정적 결과를 예상하여 긍정적 경험을 차단합니다.', description_en: 'Expecting negative outcomes blocks positive experiences.' },
      { name_ko: '부정성', name_en: 'Negativity', description_ko: '부정적 측면에 집중하여 긍정적 측면을 놓칩니다.', description_en: 'Focusing on negatives causes missing positives.' },
      { name_ko: '무감각', name_en: 'Numbness', description_ko: '감정적 둔감함으로 즐거움을 느끼지 못합니다.', description_en: 'Emotional numbness prevents feeling enjoyment.' },
      { name_ko: '과거 집착', name_en: 'Dwelling on Past', description_ko: '과거의 부정적 경험에 머물러 현재의 즐거움을 놓칩니다.', description_en: 'Dwelling on negative past experiences misses present enjoyment.' },
      { name_ko: '미래 걱정', name_en: 'Worrying about Future', description_ko: '미래에 대한 걱정으로 현재의 즐거움을 경험하지 못합니다.', description_en: 'Worrying about the future prevents experiencing present enjoyment.' }
    ]
  }
};

// 상세 해독제 (Antidotes) - 원본 사이트 기반 확장
export const antidotesDetailed = {
  anger: [
    { state_ko: '짜증', state_en: 'Annoyance', antidote_ko: '인내심, 열린 마음, 타인에 대한 관심', antidote_en: 'Patience, open-mindedness, concern for others' },
    { state_ko: '좌절', state_en: 'Frustration', antidote_ko: '내려놓기, 집착 버리기, 더 큰 관점에서 바라보기', antidote_en: 'Letting go, letting go of grasping, putting things in a larger perspective' },
    { state_ko: '논쟁적', state_en: 'Argumentativeness', antidote_ko: '상대방을 이해하려는 노력, 인지적 공감, 자비, 상호 합의 가능한 해결책 추구', antidote_en: 'Making effort to understand the other\'s perspective, cognitive empathy, benevolence, wishing to solve the problem through a mutually agreeable solution' },
    { state_ko: '성가심', state_en: 'Exasperation', antidote_ko: '집착 버리기, 인내심, 내면의 평화, 바람직하지 않은 상황을 초래한 원인과 조건 이해하기', antidote_en: 'Letting go of grasping, patience, inner calm, trying to understand the causes and conditions that brought about the undesirable situation' },
    { state_ko: '복수심', state_en: 'Vengefulness', antidote_ko: '단기 및 장기적으로 복수의 부정적 영향 숙고하기, 용서 - 해로운 행동을 용납하는 것이 아니라 원한과 증오의 순환을 끊는 것', antidote_en: 'Contemplating the negative effects of taking revenge, in the short and long term; forgiveness not as condoning harmful behavior but as breaking the cycle of resentment and hatred' },
    { state_ko: '격분', state_en: 'Bitterness', antidote_ko: '용서, 내려놓기, 관점 전환, 자비', antidote_en: 'Forgiveness, letting go, perspective shift, compassion' },
    { state_ko: '격노', state_en: 'Fury', antidote_ko: '격노를 불러일으킨 상황에서 신체적, 정신적으로 휴식 취하기, 인식의 눈으로 격노 자체를 바라보기', antidote_en: 'Taking a break, physically and mentally, from the circumstances that brought fury about. Looking at fury itself with the eye of awareness as if observing it from outside' }
  ],
  fear: [
    { state_ko: '걱정', state_en: 'Trepidation', antidote_ko: '호기심, 열린 마음, 현실 점검', antidote_en: 'Curiosity, openness, reality check' },
    { state_ko: '긴장', state_en: 'Nervousness', antidote_ko: '호흡, 그라운딩, 현재에 집중', antidote_en: 'Breathing, grounding, focusing on present' },
    { state_ko: '불안', state_en: 'Anxiety', antidote_ko: '수용, 현재 순간에 집중, 점진적 노출', antidote_en: 'Acceptance, present moment focus, gradual exposure' },
    { state_ko: '두려움', state_en: 'Dread', antidote_ko: '관점 취하기, 현실적 평가, 준비', antidote_en: 'Perspective taking, realistic assessment, preparation' },
    { state_ko: '절망', state_en: 'Desperation', antidote_ko: '희망, 지지 구하기, 작은 단계', antidote_en: 'Hope, seeking support, small steps' },
    { state_ko: '공황', state_en: 'Panic', antidote_ko: '진정 기법, 호흡 조절, 안전한 장소', antidote_en: 'Calming techniques, breath control, safe place' },
    { state_ko: '공포', state_en: 'Terror', antidote_ko: '안전 추구, 전문적 도움, 트라우마 처리', antidote_en: 'Safety seeking, professional help, trauma processing' }
  ],
  disgust: [
    { state_ko: '싫음', state_en: 'Dislike', antidote_ko: '관용, 이해, 열린 마음', antidote_en: 'Tolerance, understanding, open mind' },
    { state_ko: '거부감', state_en: 'Aversion', antidote_ko: '노출, 수용, 호기심', antidote_en: 'Exposure, acceptance, curiosity' },
    { state_ko: '불쾌', state_en: 'Distaste', antidote_ko: '관점 확장, 재평가', antidote_en: 'Perspective broadening, reappraisal' },
    { state_ko: '역겨움', state_en: 'Revulsion', antidote_ko: '연민, 이해하려는 노력', antidote_en: 'Compassion, trying to understand' },
    { state_ko: '구역질', state_en: 'Nausea', antidote_ko: '거리두기, 필요시 전문적 도움', antidote_en: 'Distancing, professional help if needed' },
    { state_ko: '경멸', state_en: 'Contempt', antidote_ko: '신념 검토, 겸손, 공감', antidote_en: 'Examining beliefs, humility, empathy' },
    { state_ko: '혐오', state_en: 'Loathing', antidote_ko: '자기 연민, 전문적 도움', antidote_en: 'Self-compassion, professional help' }
  ],
  sadness: [
    { state_ko: '실망', state_en: 'Disappointment', antidote_ko: '현실적 기대, 수용, 감사', antidote_en: 'Realistic expectations, acceptance, gratitude' },
    { state_ko: '낙담', state_en: 'Discouragement', antidote_ko: '자기 연민, 작은 성공, 지지', antidote_en: 'Self-compassion, small wins, support' },
    { state_ko: '슬픔', state_en: 'Sadness', antidote_ko: '애도 허용, 연결, 표현', antidote_en: 'Allowing grief, connection, expression' },
    { state_ko: '비탄', state_en: 'Sorrow', antidote_ko: '지지 구하기, 의미 찾기', antidote_en: 'Seeking support, finding meaning' },
    { state_ko: '무력감', state_en: 'Helplessness', antidote_ko: '작은 행동, 통제 가능한 것에 집중', antidote_en: 'Small actions, focusing on controllable' },
    { state_ko: '비참', state_en: 'Misery', antidote_ko: '전문적 지원, 연결', antidote_en: 'Professional support, connection' },
    { state_ko: '절망', state_en: 'Despair', antidote_ko: '희망, 전문적 도움, 위기 지원', antidote_en: 'Hope, professional help, crisis support' }
  ],
  enjoyment: [
    { state_ko: '감각적 쾌락', state_en: 'Sensory Pleasure', antidote_ko: '절제, 마음챙김, 감사 - 쾌락에 집착하지 않고 현재 순간을 온전히 즐기기', antidote_en: 'Moderation, mindfulness, gratitude - fully enjoying the present moment without grasping at pleasure' },
    { state_ko: '샤덴프로이데', state_en: 'Schadenfreude', antidote_ko: '자비, 공감, 인류애, 타인의 고통에 대한 연민 - 모든 존재가 고통받지 않기를 바라기', antidote_en: 'Benevolence, empathy, humanity, compassion for others\' suffering - wishing all beings to be free from suffering' },
    { state_ko: '자부심', state_en: 'Pride', antidote_ko: '겸손, 감사, 타인의 기여 인정, 자만심 경계 - 성취가 혼자만의 것이 아님을 인식', antidote_en: 'Humility, gratitude, acknowledging others\' contributions, guarding against arrogance' },
    { state_ko: '피에로', state_en: 'Fiero', antidote_ko: '겸손, 성취를 다른 사람과 나누기, 감사 - 승리의 기쁨을 다른 사람들과 함께 나누기', antidote_en: 'Humility, sharing achievement with others, gratitude - sharing the joy of triumph with others' },
    { state_ko: '탐닉', state_en: 'Indulgence', antidote_ko: '절제, 자기 인식, 장기적 결과 고려 - 즉각적 쾌락과 장기적 행복 사이의 균형', antidote_en: 'Moderation, self-awareness, considering long-term consequences' },
    { state_ko: '우쭐대기', state_en: 'Gloating', antidote_ko: '겸손, 연민, 상대방 존중 - 다른 사람의 실패에서 기쁨을 느끼지 않기', antidote_en: 'Humility, compassion, respecting the other party' },
    { state_ko: '흥분', state_en: 'Excitement', antidote_ko: '균형, 현재 순간에 머물기, 과도한 기대 조절 - 미래에 대한 기대가 현재의 평화를 해치지 않도록', antidote_en: 'Balance, staying in the present moment, moderating excessive expectations' }
  ]
};

// 상세 Emotional Episode Timeline (원본 사이트 기반 10단계)
export const emotionalEpisodeTimelineDetailed = {
  title_ko: '감정 에피소드 타임라인',
  title_en: 'Emotional Episode Timeline',
  description_ko: '감정이 발생하고 전개되는 과정을 10단계로 설명합니다.',
  description_en: 'Describes the process of how emotions arise and unfold in 10 steps.',
  steps: [
    {
      id: 1,
      name_ko: '사전 조건',
      name_en: 'PRE-CONDITION',
      description_ko: '감정에 영향을 미치는 맥락이나 상황을 설명합니다. 예를 들어 사전 조건은 생리적일 수 있습니다: 배고픔, 피로 또는 감정적: 매우 즐거운 날이나 스트레스 받는 날을 보냈거나 이전 감정 에피소드에서 막 나온 상태.',
      description_en: 'This describes the context or situations which may influence the way we enter the emotion. For example our pre-condition could be physiological: being hungry, tired or emotional: having had a very enjoyable or stressful day or coming out of a prior emotional episode.'
    },
    {
      id: 2,
      name_ko: '이벤트',
      name_en: 'EVENT',
      description_ko: '외부 세계나 우리 자신의 마음에서 마주치는 사람, 장소, 상황, 이미지, 생각, 기억, 냄새, 소리, 맛 또는 아이디어를 설명합니다. 우리는 끊임없이 자동으로 내부와 외부 세계를 평가하고 있습니다. 예를 들어, 새로운 노래를 들을 때, 우리는 생각하지 않고도 즉시 악기와 음악 장르에 대한 지식을 덧씌웁니다. 이것이 자동 평가입니다.',
      description_en: 'This describes a person, place, situation, image, thought, memory, smell, sound, taste or idea that we encounter from the outside world or from our own mind. We are constantly, automatically appraising, or assessing our inner and outer world. For example, when we hear a new song, we are instantly overlaying our knowledge of instruments and categories of music as we listen without even thinking, this is automatic appraisal.'
    },
    {
      id: 3,
      name_ko: '트리거',
      name_en: 'TRIGGER',
      description_ko: '자동 평가가 우리 데이터베이스의 보편적/선천적이거나 획득된 스크립트와 일치하는 조합을 설명합니다.',
      description_en: 'This describes the combination of the automatic appraisal matching to some universal/hardwired or acquired script in our database.'
    },
    {
      id: 4,
      name_ko: '지각 데이터베이스',
      name_en: 'PERCEPTION DATABASE',
      description_ko: '우리의 보편적/선천적 반응과 개인적으로 획득한 감정 기억을 설명합니다. 예를 들어, 이벤트가 냄새이고 데이터베이스에 어린 시절 어머니가 사용한 샴푸의 저장된 기억이 있다면, 행복한 어린 시절의 따뜻한 향수의 감정을 경험하도록 트리거됩니다. 평가된 이벤트가 데이터베이스의 무언가와 닮았을 때, 매우 정확할 수도 있고 트리거에 대한 왜곡된 인식을 만들 수도 있습니다.',
      description_en: 'This describes our universal/hardwired responses and our individually acquired emotional memories. For example, if the event is a smell and in the database is the stored memory of the shampoo our mother used in our childhood, and we are triggered to experience an emotion of warm nostalgia of a happy childhood. When the appraised event resembles something in our database, it may be a highly accurate or could create a distorted perception of the trigger.'
    },
    {
      id: 5,
      name_ko: '신체적 변화',
      name_en: 'PHYSICAL CHANGES',
      description_ko: '감정이 일어날 때 우리 몸에서 발생하는 자율신경계 변화를 설명합니다. 우리는 이러한 변화를 몸의 감각으로 경험할 수 있습니다: 얼굴의 열감, 턱이나 어깨의 긴장 등.',
      description_en: 'This describes the autonomic changes in our body which occur as our emotion arises. We can experience these changes as sensations in our body, feeling heat in our face, tightness in our jaw or shoulders, etc.'
    },
    {
      id: 6,
      name_ko: '상태',
      name_en: 'STATE',
      description_ko: '신체적 및 심리적 변화를 포함한 감정 자체를 설명합니다.',
      description_en: 'This describes the emotion itself, inclusive of physical and psychological changes.'
    },
    {
      id: 7,
      name_ko: '심리적 변화',
      name_en: 'PSYCHOLOGICAL CHANGES',
      description_ko: '감정의 질적 경험을 설명합니다. 슬픔이 슬프게 느껴지는 방식, 또는 분노가 화나게 느껴지는 방식.',
      description_en: 'This describes the qualitative experience of the emotion, how sadness feels sad, or anger feels angry.'
    },
    {
      id: 8,
      name_ko: '행동',
      name_en: 'ACTION',
      description_ko: '우리의 감정적 반응을 설명합니다. 이것은 분노로 소리 지르는 것과 같은 외부 행동일 수도 있고, 분노를 억압하는 것과 같은 내부적일 수도 있습니다. Atlas의 각 감정은 즉각적인 행동뿐만 아니라 본능적 또는 의도적 행동의 범위를 보여줍니다. 행동은 건설적이거나 파괴적일 수 있습니다.',
      description_en: 'This describes our emotional responses. This could be an external behavior such as yelling in anger, or could be internal, such as suppressing anger. Each emotion in the atlas shows a range of immediate actions, as well as intrinsic or intention actions. The action can be either constructive or destructive.'
    },
    {
      id: 9,
      name_ko: '사후 조건',
      name_en: 'POST-CONDITION',
      description_ko: '우리의 감정적 행동의 결과나 영향을 설명합니다. 이것은 외부적일 수 있습니다: 누군가에게 소리를 질렀다면 그들도 소리를 지를 수 있습니다. 또는 내부적일 수 있습니다: 억압했다면 지속적인 짜증을 느낄 수 있습니다. 사후 조건은 다음 감정 에피소드로 이어질 수 있습니다.',
      description_en: 'This describes the result or impact of our emotional actions. This could be external: if we have yelled at someone they may then yell back; or internal: if we have suppressed we could be feeling some ongoing irritation. The post condition could lead to our next episode of emotion.'
    },
    {
      id: 10,
      name_ko: '선택적 필터 기간',
      name_en: 'SELECTIVE FILTER PERIOD',
      description_ko: '행동과 신호의 시작과 함께 개시되는 선택적 필터링 기간입니다. 지각이 좁아지고 왜곡되어 우세한 감정과 관련되고 일치하는 정보를 필터링하고 해석합니다. 예를 들어, 두려움이 일어나면 실제 및 상상의 위협에 대한 민감성이 높아집니다.',
      description_en: 'The Selective Filtering Period is initiated with the onset of actions and signals — perception is narrowed and distorted, filtering and interpreting information relevant to and consistent with the prevailing emotion. For example, when fear is aroused, there is a heightened sensitivity to real and imagined threats.'
    }
  ]
};

// 과학적 근거 통계 (Scientific Basis)
export const scientificBasis = {
  title_ko: '이 작업의 과학적 근거',
  title_en: 'The Scientific Basis for This Work',
  description_ko: 'Atlas of Emotions는 과학자들 사이의 합의에 기반합니다. 2014년 6월 중순에 감정에 대한 양적 연구를 자주 발표한 248명의 과학자에게 설문조사가 발송되었습니다.',
  description_en: 'The Atlas of Emotions is based on a consensus among scientists as determined by a survey. The survey was mailed in mid-June of 2014 to 248 scientists who had frequently published quantitative research on emotion.',
  stats: [
    { percent: 88, text_ko: '보편적 감정이 존재한다', text_en: 'There are universal emotions' },
    { percent: 80, text_ko: '감정에 대한 보편적 얼굴 신호가 존재한다', text_en: 'There are universal facial signals to emotion' },
    { percent: 91, text_ko: '분노는 보편적 감정이다', text_en: 'Anger is a universal emotion' },
    { percent: 90, text_ko: '두려움은 보편적 감정이다', text_en: 'Fear is a universal emotion' },
    { percent: 86, text_ko: '혐오는 보편적 감정이다', text_en: 'Disgust is a universal emotion' },
    { percent: 80, text_ko: '슬픔은 보편적 감정이다', text_en: 'Sadness is a universal emotion' },
    { percent: 76, text_ko: '행복은 보편적 감정이다', text_en: 'Happiness is a universal emotion' },
    { percent: 66, text_ko: '감정에 대한 보편적 트리거가 존재한다', text_en: 'There are universal triggers to emotion' },
    { percent: 51, text_ko: '감정의 보편적 생리학이 존재한다', text_en: 'There is universal physiology of emotion' },
    { percent: 49, text_ko: '생물학적으로 구분되는 별개의 감정이 존재한다', text_en: 'There are biologically discrete, separate emotions' }
  ],
  reference: {
    title: 'What Scientists Who Study Emotion Agree About',
    author: 'Paul Ekman',
    journal: 'Perspectives on Psychological Science',
    year: 2015
  }
};

// About the Atlas 정보
export const aboutTheAtlas = {
  title_ko: 'Atlas에 대하여',
  title_en: 'About the Atlas',
  content_ko: '달라이 라마는 "평온한 마음을 개발하기 위한 감정의 지도"를 상상했습니다. 그는 오랜 친구이자 저명한 감정 과학자인 폴 에크만 박사에게 그의 아이디어를 실현해 달라고 요청했습니다. 에크만은 2세대 감정 연구자이자 교사인 그의 딸 이브 에크만과 함께 Atlas 제작에 착수했습니다. 달라이 라마는 Atlas가 심리학적 감정 연구에서 연구자들이 배운 것을 바탕으로 감정의 과학을 대표하도록 요청했습니다.',
  content_en: 'The Dalai Lama imagined "a map of our emotions to develop a calm mind." He asked his longtime friend and renowned emotion scientist Dr. Paul Ekman to realize his idea. Ekman took on the creation of the Atlas alongside his daughter, Eve Ekman, a second-generation emotion researcher and teacher. The Dalai Lama requested the Atlas represent the science of Emotions from what researchers have learned from the psychological study of emotion.',
  creators: [
    {
      name_ko: '폴 에크만 박사',
      name_en: 'Dr. Paul Ekman',
      role_ko: '감정 과학자',
      role_en: 'Emotion Scientist'
    },
    {
      name_ko: '이브 에크만',
      name_en: 'Eve Ekman',
      role_ko: '감정 연구자 및 교사',
      role_en: 'Emotion Researcher and Teacher'
    }
  ]
};
