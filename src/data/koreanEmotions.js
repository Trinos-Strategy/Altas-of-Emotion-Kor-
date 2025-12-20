// 한국인의 고유 감정 대륙: 한(恨)과 정(情)
// 이것은 학술 논문이 아닌 조정 현장에서 20년 넘게 한국인의 감정을 다룬 경험을 바탕으로 한 시론(試論)입니다.

export const koreanEmotionOrder = ['han', 'jeong'];

export const koreanEmotions = {
  han: {
    id: 'han',
    name_ko: '한(恨)',
    name_en: 'Han',
    hanja: '恨',
    color: '#5A4B7B', // 짙은 남색-보라 (채도 낮춤)
    colorLight: '#7B6B9B',
    colorDark: '#3A2B5B',
    colorGradient: 'linear-gradient(135deg, #7B6B9B 0%, #5A4B7B 50%, #3A2B5B 100%)',

    definition_ko: '부당함에 대한 감정이 해소되지 못하고 내면에 응축된 상태',
    definition_en: 'A state where emotions of injustice remain unresolved and condensed within',

    description_ko: '한(恨)은 서양의 어떤 감정으로도 완전히 번역되지 않는 한국 고유의 감정입니다. 단순한 원망이나 분노가 아니라, 부당한 상황에서 비롯된 깊은 슬픔과 억울함이 시간이 지나도 해소되지 못하고 마음속에 쌓여가는 복합적인 정서 상태입니다.',
    description_en: 'Han is a uniquely Korean emotion that cannot be fully translated into any Western emotional concept. It is not simply resentment or anger, but a complex emotional state where deep sorrow and sense of injustice from unfair situations accumulate in the heart without resolution over time.',

    westernComparison_ko: '서양 심리학에서 가장 가까운 개념으로는 "억압된 분노(suppressed anger)", "만성적 비탄(chronic grief)", 또는 "트라우마 후 괴로움"이 있지만, 한의 문화적 맥락과 집단적 성격을 담아내지 못합니다.',
    westernComparison_en: 'The closest Western psychological concepts are "suppressed anger," "chronic grief," or "post-traumatic distress," but these fail to capture the cultural context and collective nature of Han.',

    // 7단계 스펙트럼
    states: [
      {
        level: 1,
        name_ko: '서운함',
        name_en: 'Seowoonham (Feeling let down)',
        intensity: 1,
        description_ko: '기대했던 관심이나 배려를 받지 못한 느낌. 마음 한 구석이 허전하고 아쉬운 감정.',
        description_en: 'The feeling of not receiving expected attention or care. A sense of emptiness and disappointment in one corner of the heart.',
        example_ko: '"그 정도는 챙겨줄 줄 알았는데..."',
        example_en: '"I thought they would at least take care of that..."'
      },
      {
        level: 2,
        name_ko: '섭섭함',
        name_en: 'Seopseopham (Feeling disappointed)',
        intensity: 2,
        description_ko: '서운함보다 깊은 단계. 상대의 행동이 아쉽고 마음이 허전함. 관계에 대한 기대가 무너진 느낌.',
        description_en: 'Deeper than feeling let down. Disappointment in the other\'s actions and an empty heart. A sense that expectations for the relationship have crumbled.',
        example_ko: '"이렇게까지 할 줄은 몰랐어..."',
        example_en: '"I didn\'t think they would go this far..."'
      },
      {
        level: 3,
        name_ko: '억울함',
        name_en: 'Eokoolham (Feeling wronged)',
        intensity: 3,
        description_ko: '부당한 대우를 받았다는 인식. 자신의 진실이 인정받지 못하고, 해명하고 싶은 강한 욕구가 생김.',
        description_en: 'Recognition of being treated unfairly. One\'s truth is not acknowledged, creating a strong desire to explain oneself.',
        example_ko: '"내 얘기는 들어보지도 않고..."',
        example_en: '"They didn\'t even listen to my side..."'
      },
      {
        level: 4,
        name_ko: '원통함',
        name_en: 'Wontongham (Feeling aggrieved)',
        intensity: 4,
        description_ko: '억울함이 깊어진 상태. 해명 기회조차 없거나 거부당함. 정의가 실현되지 않은 데 대한 깊은 고통.',
        description_en: 'Deepened state of feeling wronged. Denied even the opportunity to explain. Deep anguish over justice not being served.',
        example_ko: '"말할 기회조차 주지 않았어..."',
        example_en: '"They didn\'t even give me a chance to speak..."'
      },
      {
        level: 5,
        name_ko: '응어리',
        name_en: 'Eungeori (Knotted feelings)',
        intensity: 5,
        description_ko: '풀리지 않은 감정이 가슴에 맺힌 상태. 물리적으로 가슴이 답답하고 무거운 느낌. 시간이 지나도 사라지지 않음.',
        description_en: 'Unresolved emotions knotted in the chest. A physical feeling of tightness and heaviness in the chest. Does not disappear with time.',
        example_ko: '"가슴에 뭔가가 맺혀있어..."',
        example_en: '"Something is knotted in my chest..."'
      },
      {
        level: 6,
        name_ko: '원한',
        name_en: 'Wonhan (Resentment)',
        intensity: 6,
        description_ko: '특정 대상에 대한 강한 원망. 복수심이나 보상 욕구가 생길 수 있음. 상대가 벌 받기를 바라는 마음.',
        description_en: 'Strong resentment toward a specific target. May develop desires for revenge or compensation. Wishing for the other to be punished.',
        example_ko: '"언젠가는 반드시..."',
        example_en: '"Someday, without fail..."'
      },
      {
        level: 7,
        name_ko: '한(恨)',
        name_en: 'Han (Deep accumulated sorrow)',
        intensity: 7,
        description_ko: '특정 대상을 넘어 삶 자체, 운명, 시대에 대한 슬픔과 원망이 융합된 상태. 개인을 넘어 집단적, 역사적 차원으로 확장.',
        description_en: 'A state where sorrow and resentment transcend specific targets to encompass life itself, fate, and the era. Extends beyond the individual to collective and historical dimensions.',
        example_ko: '"이게 내 팔자인가..."',
        example_en: '"Is this my fate..."'
      }
    ],

    // 장애물 - 한이 더 깊어지게 만드는 것
    impediments: [
      {
        from_level: 1,
        to_level: 2,
        from_ko: '서운함',
        to_ko: '섭섭함',
        from_en: 'Feeling let down',
        to_en: 'Disappointment',
        causes_ko: [
          '"별일 아니야"라는 반응',
          '"네가 예민한 거야"라는 비난',
          '감정 무시 또는 경시'
        ],
        causes_en: [
          'Response of "It\'s nothing"',
          'Blame of "You\'re being too sensitive"',
          'Ignoring or dismissing emotions'
        ]
      },
      {
        from_level: 2,
        to_level: 3,
        from_ko: '섭섭함',
        to_ko: '억울함',
        from_en: 'Disappointment',
        to_en: 'Feeling wronged',
        causes_ko: [
          '표현해도 변화 없음',
          '반복되는 실망',
          '의도적 무관심'
        ],
        causes_en: [
          'No change despite expressing feelings',
          'Repeated disappointments',
          'Deliberate indifference'
        ]
      },
      {
        from_level: 3,
        to_level: 4,
        from_ko: '억울함',
        to_ko: '원통함',
        from_en: 'Feeling wronged',
        to_en: 'Feeling aggrieved',
        causes_ko: [
          '해명 기회 박탈',
          '일방적 판단과 단죄',
          '권력 앞에서의 무력함'
        ],
        causes_en: [
          'Denied opportunity to explain',
          'One-sided judgment and condemnation',
          'Powerlessness before authority'
        ]
      },
      {
        from_level: 4,
        to_level: 5,
        from_ko: '원통함',
        to_ko: '응어리',
        from_en: 'Feeling aggrieved',
        to_en: 'Knotted feelings',
        causes_ko: [
          '진실이 묻힘',
          '시간이 지나도 인정받지 못함',
          '주변의 침묵'
        ],
        causes_en: [
          'Truth being buried',
          'Not being acknowledged even with time',
          'Silence of those around'
        ]
      },
      {
        from_level: 5,
        to_level: 6,
        from_ko: '응어리',
        to_ko: '원한',
        from_en: 'Knotted feelings',
        to_en: 'Resentment',
        causes_ko: [
          '비슷한 상황 재경험',
          '"잊어버려"라는 강요',
          '가해자의 번영'
        ],
        causes_en: [
          'Re-experiencing similar situations',
          'Being forced to "just forget it"',
          'Prosperity of the wrongdoer'
        ]
      },
      {
        from_level: 6,
        to_level: 7,
        from_ko: '원한',
        to_ko: '한(恨)',
        from_en: 'Resentment',
        to_en: 'Han',
        causes_ko: [
          '정의 실현 실패',
          '한을 정체성으로 고착',
          '세대 전승'
        ],
        causes_en: [
          'Failure to achieve justice',
          'Fixating Han as identity',
          'Transmission across generations'
        ]
      }
    ],

    // 해독제 - 한을 풀어주는 것
    antidotes: [
      {
        level: 1,
        state_ko: '서운함',
        state_en: 'Feeling let down',
        antidote_ko: '"그랬구나, 서운했겠다" — 감정 인정',
        antidote_en: '"I see, you must have felt let down" — Acknowledging emotions',
        details_ko: [
          '상대의 감정을 있는 그대로 인정하기',
          '변명이나 해명 전에 먼저 공감하기',
          '"그럴 수 있다"는 수용적 태도'
        ],
        details_en: [
          'Acknowledging the other\'s emotions as they are',
          'Empathizing before excuses or explanations',
          'Accepting attitude of "That\'s understandable"'
        ]
      },
      {
        level: 2,
        state_ko: '섭섭함',
        state_en: 'Disappointment',
        antidote_ko: '진심 어린 사과, 관계 내 변화',
        antidote_en: 'Sincere apology, change within the relationship',
        details_ko: [
          '말뿐 아닌 행동의 변화',
          '실질적인 관계 개선 노력',
          '반복하지 않겠다는 약속과 실천'
        ],
        details_en: [
          'Change in actions, not just words',
          'Genuine effort to improve the relationship',
          'Promise and practice of not repeating'
        ]
      },
      {
        level: 3,
        state_ko: '억울함',
        state_en: 'Feeling wronged',
        antidote_ko: '말할 기회 부여, 경청, 진상 파악',
        antidote_en: 'Giving opportunity to speak, listening, understanding the truth',
        details_ko: [
          '중단 없이 끝까지 듣기',
          '판단을 유보하고 사실 확인',
          '양쪽 이야기를 모두 들어보기'
        ],
        details_en: [
          'Listening to the end without interruption',
          'Withholding judgment and verifying facts',
          'Hearing both sides of the story'
        ]
      },
      {
        level: 4,
        state_ko: '원통함',
        state_en: 'Feeling aggrieved',
        antidote_ko: '공식적 인정, 명예 회복, 책임자 사과',
        antidote_en: 'Official acknowledgment, restoration of honor, apology from responsible party',
        details_ko: [
          '공적 영역에서의 진실 인정',
          '명예 훼손에 대한 회복 조치',
          '책임 있는 위치에서의 사과'
        ],
        details_en: [
          'Acknowledgment of truth in public sphere',
          'Measures to restore damaged reputation',
          'Apology from position of responsibility'
        ]
      },
      {
        level: 5,
        state_ko: '응어리',
        state_en: 'Knotted feelings',
        antidote_ko: '안전한 공간에서 말하기, 글쓰기, 상담',
        antidote_en: 'Speaking in safe space, writing, counseling',
        details_ko: [
          '판단 없이 들어주는 사람과의 대화',
          '글쓰기를 통한 감정 표출',
          '전문 상담을 통한 트라우마 치유'
        ],
        details_en: [
          'Conversation with someone who listens without judgment',
          'Emotional expression through writing',
          'Trauma healing through professional counseling'
        ]
      },
      {
        level: 6,
        state_ko: '원한',
        state_en: 'Resentment',
        antidote_ko: '가해자와 분리, 새로운 정체성 구축',
        antidote_en: 'Separation from wrongdoer, building new identity',
        details_ko: [
          '가해자에게 삶을 맡기지 않기',
          '나의 가치를 스스로 정의하기',
          '새로운 관계와 의미 찾기'
        ],
        details_en: [
          'Not letting the wrongdoer define your life',
          'Defining your own worth',
          'Finding new relationships and meaning'
        ]
      },
      {
        level: 7,
        state_ko: '한(恨)',
        state_en: 'Han',
        antidote_ko: '풀이, 신명, 해원, 승화',
        antidote_en: 'Release, Shinmyeong, Resolution, Sublimation',
        details_ko: [
          '4대 전통적 해독제 활용',
          '예술, 창작, 사회활동으로의 승화',
          '다음 세대에게 한이 아닌 희망 전하기'
        ],
        details_en: [
          'Utilizing the four traditional antidotes',
          'Sublimation through art, creation, social activity',
          'Passing hope, not Han, to the next generation'
        ]
      }
    ],

    // 4대 전통적 해독제
    traditionalAntidotes: [
      {
        id: 'puri',
        name_ko: '풀이(解)',
        name_en: 'Puri (Release)',
        hanja: '解',
        description_ko: '맺힌 것을 풀어냄',
        description_en: 'Releasing what is knotted',
        methods_ko: ['말하기', '글쓰기', '예술 표현', '시 짓기', '노래 부르기'],
        methods_en: ['Speaking', 'Writing', 'Artistic expression', 'Poetry', 'Singing'],
        icon: '🎭'
      },
      {
        id: 'shinmyeong',
        name_ko: '신명(神明)',
        name_en: 'Shinmyeong (Ecstatic energy)',
        hanja: '神明',
        description_ko: '한의 에너지를 흥과 열정으로 전환',
        description_en: 'Converting the energy of Han into excitement and passion',
        methods_ko: ['춤', '노래', '굿', '축제', '집단 카타르시스'],
        methods_en: ['Dance', 'Singing', 'Gut ritual', 'Festivals', 'Collective catharsis'],
        icon: '💃'
      },
      {
        id: 'haewon',
        name_ko: '해원(解冤)',
        name_en: 'Haewon (Resolution of grievance)',
        hanja: '解冤',
        description_ko: '원한을 풀고 명예를 회복함',
        description_en: 'Resolving resentment and restoring honor',
        methods_ko: ['진상규명', '재심', '공식 사과', '배상', '기념'],
        methods_en: ['Truth-finding', 'Retrial', 'Official apology', 'Compensation', 'Commemoration'],
        icon: '⚖️'
      },
      {
        id: 'sangsaeng',
        name_ko: '상생(相生)',
        name_en: 'Sangsaeng (Mutual flourishing)',
        hanja: '相生',
        description_ko: '원수도 함께 살아감',
        description_en: 'Living together even with enemies',
        methods_ko: ['복수 포기', '공존', '화해', '용서', '미래지향'],
        methods_en: ['Giving up revenge', 'Coexistence', 'Reconciliation', 'Forgiveness', 'Future-orientation'],
        icon: '🤝'
      }
    ]
  },

  jeong: {
    id: 'jeong',
    name_ko: '정(情)',
    name_en: 'Jeong',
    hanja: '情',
    color: '#C4886A', // 따뜻한 오렌지-갈색 (채도 낮춤)
    colorLight: '#D9A88A',
    colorDark: '#A06850',
    colorGradient: 'linear-gradient(135deg, #D9A88A 0%, #C4886A 50%, #A06850 100%)',

    definition_ko: '시간과 경험의 축적을 통해 형성되는 유대감',
    definition_en: 'A bond formed through the accumulation of time and shared experiences',

    description_ko: '정(情)은 의도적으로 만들 수 없고, 시간이 지나면서 자연스럽게 쌓이는 감정입니다. "정이 들었다"라는 표현처럼, 어느 날 문득 깨닫게 되는 유대감입니다. 미운 정, 고운 정이 모두 존재하며, 헤어져도 쉽게 사라지지 않습니다.',
    description_en: 'Jeong cannot be created intentionally; it naturally accumulates over time. Like the expression "jeong has formed," it is a bond you suddenly realize one day. Both bitter jeong and sweet jeong exist, and it doesn\'t easily disappear even after parting.',

    westernComparison_ko: '서양의 "attachment(애착)", "bonding(유대)", "affection(애정)"과 비슷하지만, 정은 반드시 긍정적일 필요가 없고(미운 정), 상호적이지 않아도 존재하며, 의도적으로 형성되지 않는다는 점에서 다릅니다.',
    westernComparison_en: 'Similar to Western concepts of "attachment," "bonding," and "affection," but Jeong differs in that it doesn\'t have to be positive (bitter jeong), can exist without reciprocity, and is not formed intentionally.',

    // 정의 특징
    characteristics: [
      {
        trait_ko: '즉각적이지 않음',
        trait_en: 'Not immediate',
        description_ko: '시간이 지나야 "정이 든다"',
        description_en: 'Time must pass for "jeong to form"'
      },
      {
        trait_ko: '선택이 아님',
        trait_en: 'Not a choice',
        description_ko: '의도와 관계없이 생김. "정이 들어버렸다"',
        description_en: 'Forms regardless of intention. "Jeong just formed"'
      },
      {
        trait_ko: '양가적',
        trait_en: 'Ambivalent',
        description_ko: '미운 정, 고운 정 모두 존재',
        description_en: 'Both bitter jeong and sweet jeong exist'
      },
      {
        trait_ko: '끊기 어려움',
        trait_en: 'Hard to sever',
        description_ko: '헤어져도 사라지지 않음',
        description_en: 'Does not disappear even after separation'
      },
      {
        trait_ko: '호혜적이지 않아도 존재',
        trait_en: 'Exists without reciprocity',
        description_ko: '일방적 정도 가능',
        description_en: 'One-sided jeong is possible'
      }
    ],

    // 7단계 스펙트럼
    states: [
      {
        level: 1,
        name_ko: '낯익음',
        name_en: 'Natikheum (Familiarity)',
        intensity: 1,
        description_ko: '반복적 접촉으로 생긴 편안함. 아직 정이라고 부르기엔 이르지만, 낯설지 않은 상태.',
        description_en: 'Comfort arising from repeated contact. Not yet called jeong, but no longer unfamiliar.',
        example_ko: '"자주 보니까 이제 좀 편해졌네"',
        example_en: '"We see each other often so it\'s gotten comfortable"'
      },
      {
        level: 2,
        name_ko: '친근함',
        name_en: 'Chingeunham (Friendliness)',
        intensity: 2,
        description_ko: '함께 있어도 어색하지 않음. 자연스러운 편안함이 있는 관계.',
        description_en: 'Not awkward being together. A relationship with natural comfort.',
        example_ko: '"같이 있어도 어색하지 않아"',
        example_en: '"It\'s not awkward being together"'
      },
      {
        level: 3,
        name_ko: '정듦',
        name_en: 'Jeongdeum (Beginning of Jeong)',
        intensity: 3,
        description_ko: '"정이 들었다"고 느끼는 시작점. 상대의 부재가 느껴지기 시작함.',
        description_en: 'The starting point of feeling "jeong has formed." Beginning to notice the other\'s absence.',
        example_ko: '"없으니까 뭔가 허전하네"',
        example_en: '"Something feels empty without them"'
      },
      {
        level: 4,
        name_ko: '정(情)',
        name_en: 'Jeong (Affectionate bond)',
        intensity: 4,
        description_ko: '본격적인 유대감. 상대의 기쁨과 슬픔에 자연스럽게 반응하게 됨.',
        description_en: 'Full-fledged bond. Naturally responding to the other\'s joy and sorrow.',
        example_ko: '"그 사람 좋은 일 있으면 내 일처럼 기뻐"',
        example_en: '"When something good happens to them, I\'m happy as if it\'s my own"'
      },
      {
        level: 5,
        name_ko: '깊은 정',
        name_en: 'Gipeun Jeong (Deep Jeong)',
        intensity: 5,
        description_ko: '오랜 시간 축적된 정. 말하지 않아도 통하는 느낌.',
        description_en: 'Jeong accumulated over a long time. A feeling of understanding without words.',
        example_ko: '"말 안 해도 뭘 원하는지 알아"',
        example_en: '"I know what they want without them saying"'
      },
      {
        level: 6,
        name_ko: '미운 정',
        name_en: 'Miun Jeong (Bitter Jeong)',
        intensity: 6,
        description_ko: '갈등이 있어도 끊어지지 않는 정. 미워도 걱정되고, 원망해도 안부가 궁금함.',
        description_en: 'Jeong that doesn\'t break despite conflicts. Worried even while hating, curious about their well-being even while resenting.',
        example_ko: '"미운데 왜 자꾸 생각나지..."',
        example_en: '"I hate them, but why do I keep thinking about them..."'
      },
      {
        level: 7,
        name_ko: '뼛속 정',
        name_en: 'Ppyeotsok Jeong (Bone-deep Jeong)',
        intensity: 7,
        description_ko: '가장 깊은 단계. 상대가 나의 일부처럼 느껴짐. 평생 함께한 가족이나 오랜 벗 사이에서 형성됨.',
        description_en: 'The deepest level. The other feels like a part of oneself. Forms between lifelong family or old friends.',
        example_ko: '"그 사람은 내 뼛속까지 배어있어"',
        example_en: '"That person has seeped into my very bones"'
      }
    ],

    // 장애물 - 정 형성을 막는 것
    impediments: [
      {
        category_ko: '현대 사회의 장애물',
        category_en: 'Modern society obstacles',
        items: [
          {
            name_ko: '잦은 이별과 이동',
            name_en: 'Frequent partings and moves',
            description_ko: '정이 쌓이기 전에 헤어짐',
            description_en: 'Parting before jeong can accumulate'
          },
          {
            name_ko: '효율성 중심의 관계',
            name_en: 'Efficiency-centered relationships',
            description_ko: '목적 달성 후 관계 종료',
            description_en: 'Ending relationships after achieving goals'
          },
          {
            name_ko: '"정 들면 힘들어"라는 회피',
            name_en: 'Avoidance of "It\'s hard when jeong forms"',
            description_ko: '아픔을 피하기 위해 정 자체를 거부',
            description_en: 'Rejecting jeong itself to avoid pain'
          },
          {
            name_ko: '상처에 대한 방어벽',
            name_en: 'Defensive walls against hurt',
            description_ko: '과거의 상처로 새로운 정을 거부',
            description_en: 'Rejecting new jeong due to past wounds'
          }
        ]
      },
      {
        category_ko: '관계 내 장애물',
        category_en: 'Obstacles within relationships',
        items: [
          {
            name_ko: '일방적 희생만 있는 관계',
            name_en: 'One-sided sacrificial relationships',
            description_ko: '주기만 하거나 받기만 하는 관계',
            description_en: 'Relationships of only giving or only receiving'
          },
          {
            name_ko: '진심 없는 형식적 만남',
            name_en: 'Insincere formal meetings',
            description_ko: '마음을 열지 않는 피상적 관계',
            description_en: 'Superficial relationships without opening hearts'
          },
          {
            name_ko: '신뢰의 반복적 훼손',
            name_en: 'Repeated breach of trust',
            description_ko: '쌓인 정이 무너지는 경험',
            description_en: 'Experience of accumulated jeong crumbling'
          }
        ]
      }
    ],

    // 해독제 - 정 형성을 돕는 것
    antidotes: [
      {
        id: 'bap',
        name_ko: '밥 나누기',
        name_en: 'Sharing meals',
        icon: '🍚',
        description_ko: '함께 식사하며 시간을 보냄',
        description_en: 'Spending time eating together',
        methods_ko: [
          '함께 식사하기',
          '"밥 먹었어?" 안부 묻기',
          '음식 나눠주기',
          '명절에 함께 모이기'
        ],
        methods_en: [
          'Eating together',
          'Asking "Have you eaten?"',
          'Sharing food',
          'Gathering during holidays'
        ]
      },
      {
        id: 'pumasi',
        name_ko: '품앗이',
        name_en: 'Mutual help',
        icon: '🤲',
        description_ko: '작은 도움을 주고받으며 관계 형성',
        description_en: 'Building relationships through exchanging small help',
        methods_ko: [
          '작은 부탁하기',
          '도움 주고받기',
          '신세지고 갚기',
          '서로의 일 도와주기'
        ],
        methods_en: [
          'Making small requests',
          'Exchanging help',
          'Owing and repaying favors',
          'Helping with each other\'s work'
        ]
      },
      {
        id: 'hardship',
        name_ko: '함께 고생',
        name_en: 'Shared hardship',
        icon: '💪',
        description_ko: '어려움을 함께 겪으며 정이 깊어짐',
        description_en: 'Jeong deepens through experiencing difficulties together',
        methods_ko: [
          '힘든 시기 곁에 있기',
          '어려움을 같이 넘기기',
          '고생을 나누기',
          '위기 상황 함께 극복'
        ],
        methods_en: [
          'Being there during hard times',
          'Overcoming difficulties together',
          'Sharing hardships',
          'Overcoming crises together'
        ]
      },
      {
        id: 'time',
        name_ko: '시간 투자',
        name_en: 'Investing time',
        icon: '⏰',
        description_ko: '꾸준히 시간을 함께 보냄',
        description_en: 'Consistently spending time together',
        methods_ko: [
          '꾸준히 만나기',
          '오래 알고 지내기',
          '정기적인 연락',
          '일상 공유하기'
        ],
        methods_en: [
          'Meeting consistently',
          'Knowing each other for a long time',
          'Regular contact',
          'Sharing daily life'
        ]
      }
    ],

    // 미운 정의 특별 해독제
    miunJeongAntidotes: [
      {
        name_ko: '양가감정 수용',
        name_en: 'Accepting ambivalence',
        description_ko: '"미워하면서 걱정할 수 있다"',
        description_en: '"You can hate and worry at the same time"',
        explanation_ko: '두 가지 상반된 감정이 공존할 수 있음을 인정',
        explanation_en: 'Acknowledging that two contradictory emotions can coexist'
      },
      {
        name_ko: '감정 분리',
        name_en: 'Separating emotions',
        description_ko: '"그 행동은 밉지만, 함께한 시간은 소중하다"',
        description_en: '"I hate that behavior, but our time together is precious"',
        explanation_ko: '행동과 사람, 과거와 현재를 분리해서 볼 수 있음',
        explanation_en: 'Being able to separate behavior from person, past from present'
      },
      {
        name_ko: '선택적 거리',
        name_en: 'Selective distance',
        description_ko: '"만나지 않아도 정은 남아있다"',
        description_en: '"Jeong remains even without meeting"',
        explanation_ko: '물리적 거리를 두면서도 정을 유지할 수 있음',
        explanation_en: 'Maintaining jeong while keeping physical distance'
      }
    ]
  }
};

// 서양 5대 감정과의 비교 설명
export const westernComparisonInfo = {
  title_ko: '서양 5대 감정과의 차이',
  title_en: 'Difference from Western Five Emotions',

  intro_ko: 'Atlas of Emotions는 Paul Ekman 박사와 달라이 라마의 협업으로 만들어진 서양 중심의 감정 지도입니다. 5대 보편 감정(분노, 두려움, 혐오, 슬픔, 즐거움)을 기반으로 하지만, 한국인의 고유한 감정 경험인 한(恨)과 정(情)은 이 5대 감정으로 환원되지 않습니다.',
  intro_en: 'The Atlas of Emotions, created through collaboration between Dr. Paul Ekman and the Dalai Lama, is a Western-centric emotion map. While based on the five universal emotions (anger, fear, disgust, sadness, enjoyment), the uniquely Korean emotional experiences of Han and Jeong cannot be reduced to these five emotions.',

  comparisons: [
    {
      emotion_ko: '한(恨)',
      emotion_en: 'Han',
      comparison_ko: '분노 + 슬픔 + 억울함의 복합체이지만, 단순 합이 아닌 시간과 역사가 축적된 고유한 감정',
      comparison_en: 'A complex of anger + sadness + feeling wronged, but not a simple sum—a unique emotion with accumulated time and history',
      notSame_ko: ['분노와 다름: 한은 폭발하지 않고 내면에 축적됨', '슬픔과 다름: 한은 부당함에 대한 인식을 포함', '원망과 다름: 한은 개인을 넘어 집단적, 역사적 차원으로 확장'],
      notSame_en: ['Different from anger: Han accumulates inward without exploding', 'Different from sadness: Han includes recognition of injustice', 'Different from resentment: Han extends to collective and historical dimensions']
    },
    {
      emotion_ko: '정(情)',
      emotion_en: 'Jeong',
      comparison_ko: '즐거움이나 애정과 관련되지만, 반드시 긍정적이지 않고(미운 정), 의도 없이 형성됨',
      comparison_en: 'Related to enjoyment and affection, but not necessarily positive (bitter jeong) and forms without intention',
      notSame_ko: ['사랑과 다름: 정은 선택이 아니고 시간이 만듦', '애착과 다름: 정은 부정적이어도 존재 가능', '우정과 다름: 정은 친밀하지 않아도 형성될 수 있음'],
      notSame_en: ['Different from love: Jeong is not a choice, time creates it', 'Different from attachment: Jeong can exist even if negative', 'Different from friendship: Jeong can form without intimacy']
    }
  ],

  note_ko: '이 분류는 학술 논문이 아닌, 조정 현장에서 20년 넘게 한국인의 감정을 다룬 실무 경험을 바탕으로 한 시론(試論)입니다. 실제 조정 현장에서 이러한 구분이 갈등 해결에 도움이 되고 있습니다.',
  note_en: 'This classification is not an academic paper but a working theory based on over 20 years of practical experience dealing with Korean emotions in mediation settings. This distinction has been helpful in conflict resolution in actual mediation practice.'
};

export default koreanEmotions;
