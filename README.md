# N(農)BTI - 농비티아이

질문을 기반으로 한 맞춤형 텃밭 작물 추천 서비스의 소개 페이지입니다.

## 🌱 라이브 데모

**배포된 사이트:** https://dohoon0508.github.io/trend/

비긴즈 BLOOM 검사 스타일을 참고하여 제작된 텃밭 작물 추천 서비스입니다.

## ✨ 주요 기능

- 🌿 16가지 작물 유형 분석
- 🎯 맞춤형 작물 추천 시스템
- 🔬 농업 전문가들의 과학적 분석
- 📱 반응형 웹 디자인
- 🎨 비긴즈 스타일 UI/UX
- 🌈 초록색 그라데이션 디자인

## 시작하기

### 필수 조건

- Node.js (버전 14 이상)
- npm 또는 yarn

### 설치

```bash
cd garden-recommend-intro
npm install
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

## 🛠 기술 스택

- **Frontend:** React 18
- **Styling:** CSS3 (Grid, Flexbox, Gradient)
- **Font:** National Park (영어), Segoe UI (한글)
- **Deployment:** GitHub Pages
- **Design:** 반응형 디자인, PWA 지원
- **UI/UX:** 비긴즈 BLOOM 검사 스타일

## 📁 프로젝트 구조

```
garden-recommend-intro/
├── public/
│   ├── images/          # 이미지 파일들
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/
│   │   └── images/      # 컴포넌트용 이미지
│   ├── App.js           # 메인 컴포넌트
│   ├── App.css          # 스타일시트
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🚀 배포

```bash
npm run deploy
```

GitHub Pages를 통해 자동 배포됩니다.

## 📢 공유 미리보기(썸네일) 안내

- 카카오톡, 페이스북, 오픈채팅 등에서 링크를 공유하면 대표 이미지가 미리보기(썸네일)로 노출됩니다.
- 대표 미리보기 이미지는 `public/images/share.png` 파일을 사용합니다.
- 관련 메타 태그는 `public/index.html`의 `<head>`에 아래와 같이 추가되어 있습니다:

```html
<!-- Open Graph (공유 미리보기) -->
<meta property="og:title" content="N(농)BTI - 맞춤형 텃밭 성향 테스트" />
<meta property="og:description" content="질문을 기반으로 한 맞춤형 텃밭 작물 추천 '농(農)BTI'" />
<meta property="og:image" content="https://dohoon0508.github.io/trend/images/share.png" />
<meta property="og:url" content="https://dohoon0508.github.io/trend/" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="N(농)BTI - 맞춤형 텃밭 성향 테스트" />
<meta name="twitter:description" content="질문을 기반으로 한 맞춤형 텃밭 작물 추천 '농(農)BTI'" />
<meta name="twitter:image" content="https://dohoon0508.github.io/trend/images/share.png" />
```

- 이미지는 1200x630px(16:9 비율) 권장, 실제 파일: `/public/images/share.png`

## 🎨 디자인 특징

- 반투명 고정 헤더
- 초록색 그라데이션 로고
- National Park 폰트 (영어)
- 카드형 레이아웃
- 블러 효과 및 호버 애니메이션 