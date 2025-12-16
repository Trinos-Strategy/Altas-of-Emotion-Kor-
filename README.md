# 감정 지도 - Atlas of Emotions 한글판

[English](#english) | [한국어](#한국어)

---

## 한국어

### 소개

감정 지도(Atlas of Emotions)는 달라이 라마가 후원한 대화형 감정 교육 도구의 한글 버전입니다.
이 프로젝트는 [Paul Ekman](https://www.paulekman.com/) 박사와 [Eve Ekman](https://www.eveekman.com/) 박사의 연구를 기반으로 합니다.

원본 사이트: https://atlasofemotions.org

### 주요 기능

- **5가지 핵심 감정 탐험**: 분노, 두려움, 혐오, 슬픔, 즐거움
- **감정 타임라인**: 트리거에서 반응까지의 감정 흐름 시각화
- **감정 상태 산 그래프**: 각 감정의 강도별 상태를 3D 산 모양으로 표현
- **반응 방사형 다이어그램**: 본능적/의도적 행동 패턴 시각화
- **해독제와 방해물**: 건설적인 감정 관리 전략 제공
- **완전한 반응형 디자인**: 모바일부터 데스크톱까지 지원
- **부드러운 애니메이션**: Framer Motion을 활용한 인터랙티브 경험

### 기술 스택

- **프론트엔드**: React 19 + Vite
- **스타일링**: Tailwind CSS 4
- **애니메이션**: Framer Motion
- **시각화**: D3.js
- **라우팅**: 해시 기반 라우팅 (Hash Router)

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/Trinos-Strategy/Altas-of-Emotion-Kor-.git
cd Altas-of-Emotion-Kor-

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### 배포

이 프로젝트는 정적 사이트입니다. 백엔드 서버가 필요하지 않습니다.

#### GitHub Pages 배포

```bash
npm run deploy
```

#### Vercel/Netlify 배포

1. GitHub 저장소를 연결
2. 빌드 명령어: `npm run build`
3. 출력 디렉토리: `dist`
4. 자동 배포 활성화

### 프로젝트 구조

```
src/
├── components/
│   ├── common/
│   │   └── Modal.jsx          # 공통 모달 컴포넌트
│   ├── Navigation.jsx         # 상단 네비게이션
│   ├── EmotionSelector.jsx    # 하단 감정 선택기
│   ├── Introduction.jsx       # 소개 섹션
│   ├── Timeline.jsx           # 타임라인 섹션
│   ├── Experience.jsx         # 경험 섹션 (메인)
│   ├── ContinentsView.jsx     # 5개 감정 대륙 뷰
│   ├── StatesGraph.jsx        # 산 그래프 시각화
│   ├── LearnMoreSidebar.jsx   # 상세 정보 사이드바
│   ├── Response.jsx           # 반응 섹션
│   ├── ActionsGraph.jsx       # 방사형 액션 다이어그램
│   ├── Strategies.jsx         # 전략 섹션
│   └── AntidotesTable.jsx     # 해독제 테이블
├── data/
│   └── emotions.js            # 감정 데이터 (한/영)
├── App.jsx                    # 메인 앱 컴포넌트
├── main.jsx                   # 엔트리 포인트
└── index.css                  # 전역 스타일
```

### 라이선스

MIT License

---

## English

### Introduction

Atlas of Emotions Korean Edition is a Korean version of the interactive emotional education tool sponsored by the Dalai Lama. This project is based on research by [Dr. Paul Ekman](https://www.paulekman.com/) and [Dr. Eve Ekman](https://www.eveekman.com/).

Original site: https://atlasofemotions.org

### Key Features

- **Explore 5 Core Emotions**: Anger, Fear, Disgust, Sadness, Enjoyment
- **Emotion Timeline**: Visualize emotional flow from trigger to response
- **States Mountain Graph**: 3D mountain visualization of intensity-based emotional states
- **Actions Radial Diagram**: Visualization of intrinsic/intentional behavior patterns
- **Antidotes and Obstacles**: Constructive emotion management strategies
- **Fully Responsive Design**: Support from mobile to desktop
- **Smooth Animations**: Interactive experience using Framer Motion

### Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Visualization**: D3.js
- **Routing**: Hash-based routing

### Installation & Running

```bash
# Clone repository
git clone https://github.com/Trinos-Strategy/Altas-of-Emotion-Kor-.git
cd Altas-of-Emotion-Kor-

# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

### Deployment

This is a static site. No backend server required.

#### GitHub Pages Deployment

```bash
npm run deploy
```

#### Vercel/Netlify Deployment

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Output directory: `dist`
4. Enable auto-deploy

### Project Structure

```
src/
├── components/
│   ├── common/
│   │   └── Modal.jsx          # Common modal component
│   ├── Navigation.jsx         # Top navigation
│   ├── EmotionSelector.jsx    # Bottom emotion selector
│   ├── Introduction.jsx       # Introduction section
│   ├── Timeline.jsx           # Timeline section
│   ├── Experience.jsx         # Experience section (main)
│   ├── ContinentsView.jsx     # 5 emotion continents view
│   ├── StatesGraph.jsx        # Mountain graph visualization
│   ├── LearnMoreSidebar.jsx   # Detail information sidebar
│   ├── Response.jsx           # Response section
│   ├── ActionsGraph.jsx       # Radial action diagram
│   ├── Strategies.jsx         # Strategies section
│   └── AntidotesTable.jsx     # Antidotes table
├── data/
│   └── emotions.js            # Emotion data (KR/EN)
├── App.jsx                    # Main app component
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

### Credits

- Original Atlas of Emotions: [atlasofemotions.org](https://atlasofemotions.org)
- Research by Dr. Paul Ekman and Dr. Eve Ekman
- Sponsored by His Holiness the Dalai Lama

### License

MIT License
