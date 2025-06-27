import React, { useState } from 'react';
import './NBTITest.css';

// 결과 요약 카드 (상단~성향분석까지만)
export const ResultCardSummary = ({ code, type }) => (
  <div className="nbti-test" style={{
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    minWidth: 220,
    maxWidth: 240,
    margin: 0,
    background: '#fff',
    borderRadius: 16,
    padding: 0,
    border: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div className="result-container" style={{
      background: 'none',
      borderRadius: 16,
      padding: 16,
      border: 'none',
      boxShadow: 'none',
      width: '100%',
    }}>
      <div className="result-header">
        <h1 style={{ fontSize: '1.1rem', color: '#222', marginBottom: 8, fontWeight: 700 }}>🎉 N(農)BTI 결과</h1>
        <div className="result-code" style={{ fontSize: '1.1rem', padding: '8px 0', marginBottom: 8 }}>{code}</div>
        <div className="result-emoji" style={{ fontSize: '2rem', marginBottom: 8 }}>{type.emoji}</div>
        <h2 style={{ fontSize: '1rem', color: '#222', marginBottom: 4 }}>{type.name}</h2>
        <p className="result-description" style={{ color: '#444', fontSize: '0.95rem', marginBottom: 8 }}>{type.description}</p>
      </div>
      {type.detailDescription && (
        <div className="detail-description-section" style={{ background: 'none', borderRadius: 10, padding: 8, margin: '8px 0', border: 'none' }}>
          <h3 style={{ color: '#222', fontSize: '0.95rem', marginBottom: 4, fontWeight: 600 }}>📋 유형 상세 설명</h3>
          <p className="detail-description-text" style={{ color: '#444', fontSize: '0.92rem', margin: 0 }}>{type.detailDescription}</p>
        </div>
      )}
    </div>
  </div>
);

// 작물 한글-영문 매핑 및 간단 설명 (보강)
const cropInfo = {
  '무': { en: 'Radish', desc: '건강하게 잘 자라는 뿌리채소입니다.' },
  '당근': { en: 'Carrot', desc: '비타민이 풍부한 대표 뿌리채소.' },
  '미나리': { en: 'Water Parsley', desc: '향긋한 향과 아삭한 식감의 채소.' },
  '시금치': { en: 'Spinach', desc: '철분이 풍부한 잎채소.' },
  '쑥갓': { en: 'Crown Daisy', desc: '국거리, 쌈채로 인기.' },
  '양배추': { en: 'Cabbage', desc: '다양한 요리에 활용되는 채소.' },
  '연근': { en: 'Lotus Root', desc: '아삭한 식감의 뿌리채소.' },
  '우엉': { en: 'Burdock', desc: '영양이 풍부한 뿌리채소.' },
  '고구마': { en: 'Sweet Potato', desc: '달콤한 맛의 대표 작물.' },
  '감': { en: 'Persimmon', desc: '가을을 대표하는 과일.' },
  '청경채': { en: 'Bok Choy', desc: '부드러운 식감의 잎채소.' },
  '근대': { en: 'Swiss Chard', desc: '컬러풀한 잎채소.' },
  '유채': { en: 'Rapeseed', desc: '노란 꽃이 아름다운 채소.' },
  '수수': { en: 'Sorghum', desc: '곡물로도 쓰이는 작물.' },
  '조': { en: 'Millet', desc: '영양이 풍부한 곡물.' },
  '비트': { en: 'Beet', desc: '붉은 색이 특징인 뿌리채소.' },
  '참나물': { en: 'Chive', desc: '향긋한 나물.' },
  '취나물': { en: 'Chive', desc: '봄철 산나물.' },
  '쪽파': { en: 'Scallion', desc: '다양한 요리에 활용.' },
  '가지': { en: 'Eggplant', desc: '보라색이 매력적인 채소.' },
  '부추': { en: 'Chive', desc: '향긋한 향과 영양.' },
  '풋고추': { en: 'Green Chili Pepper', desc: '매콤한 맛의 고추.' },
  '청양고추': { en: 'Cheongyang Chili Pepper', desc: '매운맛의 대표 고추.' },
  '케일': { en: 'Kale', desc: '슈퍼푸드로 인기.' },
  '도라지': { en: 'bellflower', desc: '기관지에 좋은 뿌리채소.' },
  '더덕': { en: 'Deodeok', desc: '향이 좋은 산채.' },
  '들깨': { en: 'Perilla', desc: '고소한 맛의 잎채소.' },
  '참깨': { en: 'Sesame', desc: '고소한 맛의 씨앗.' },
  '마': { en: 'Yam', desc: '건강식으로 인기.' },
  '산약': { en: 'Wild Yam', desc: '산에서 자라는 마.' },
  '생강': { en: 'Ginger', desc: '매운맛과 향이 특징.' },
  '오디': { en: 'Mulberry', desc: '달콤한 열매.' },
  '오미자': { en: 'Schisandra', desc: '다섯 가지 맛의 열매.' },
  '메론': { en: 'Melon', desc: '달콤한 과일.' },
  '파프리카': { en: 'Bell Pepper', desc: '다채로운 색의 채소.' },
  '체리': { en: 'Cherry', desc: '상큼한 맛의 과일.' },
  '아스파라거스': { en: 'Asparagus', desc: '고급 채소.' },
  '벼': { en: 'Rice', desc: '주식이 되는 곡물.' },
  '배추': { en: 'Napa Cabbage', desc: '김치의 주재료.' },
  '상추': { en: 'Lettuce', desc: '쌈채소의 대표.' },
  '감자': { en: 'Potato', desc: '다양한 요리에 활용.' },
  '복숭아': { en: 'Peach', desc: '달콤한 과일.' },
  '사과': { en: 'Apple', desc: '대표적인 과일.' },
  '매실': { en: 'Japanese Apricot', desc: '청매실청의 재료.' },
  '배': { en: 'Pear', desc: '아삭한 과일.' },
  '블루베리': { en: 'Blueberry', desc: '항산화가 풍부한 과일.' },
  '인삼': { en: 'ginseng', desc: '건강에 좋은 뿌리.' },
  '수박': { en: 'Watermelon', desc: '여름 대표 과일.' },
  '오이': { en: 'Cucumber', desc: '수분이 풍부한 채소.' },
  '참외': { en: 'Korean Melon', desc: '달콤한 노란 과일.' },
  '토마토': { en: 'Tomato', desc: '다양한 요리에 활용.' },
  '방울토마토': { en: 'Cherry Tomato', desc: '작고 귀여운 토마토.' },
  '자두': { en: 'Plum', desc: '새콤달콤한 과일.' },
  '딸기': { en: 'Strawberry', desc: '봄철 인기 과일.' },
  '무화과': { en: 'Fig', desc: '달콤한 과일.' },
  '참다래': { en: 'Cherry', desc: '비타민이 풍부한 과일.' },
  '호박': { en: 'Sweet Potato', desc: '가을 대표 채소.' },
  '브로콜리': { en: 'coli', desc: '비타민이 풍부한 녹색 채소.' },
};

// 16가지 유형 데이터
export const types = [
  { code: 'AHBS', emoji: '🧑‍🌾', name: '감성 장인', description: '정성 가득 감성 텃밭러', detailDescription: '숙련자 + 취미형 + 세심 관리 + 선택적 환경' },
  { code: 'AHBV', emoji: '🎋', name: '따뜻한 장인', description: '손길 가득한 텃밭을 유연하게', detailDescription: '숙련자 + 취미형 + 세심 관리 + 다양한 환경' },
  { code: 'AHCV', emoji: '🌼', name: '감성 실용러', description: '여유롭게, 하지만 간단하게', detailDescription: '숙련자 + 취미형 + 간단 관리 + 다양한 환경' },
  { code: 'AHPV', emoji: '🪴', name: '여유 농부', description: '힐링도 수확도 모두 챙기는 균형형', detailDescription: '숙련자 + 취미형 + 간단 관리 + 다양한 환경' },
  { code: 'APBS', emoji: '🛠️', name: '수익 장인', description: '수익도 품질도 놓치지 않는 실전 고수', detailDescription: '숙련자 + 수익형 + 세심 관리 + 선택적 환경' },
  { code: 'APBV', emoji: '🧃', name: '부지런한 실속러', description: '수익을 위해 꾸준히 정성껏', detailDescription: '숙련자 + 수익형 + 세심 관리 + 다양한 환경' },
  { code: 'APCS', emoji: '🔧', name: '효율 추구자', description: '최적의 환경에서 효율 극대화', detailDescription: '숙련자 + 수익형 + 간단 관리 + 선택적 환경' },
  { code: 'APCV', emoji: '📦', name: '전략 농사꾼', description: '생산성과 효율을 최우선으로', detailDescription: '숙련자 + 수익형 + 간단 관리 + 다양한 환경' },
  { code: 'NHBS', emoji: '🐣', name: '텃밭 입문자', description: '감성으로 시작하는 첫 텃밭', detailDescription: '초보자 + 취미형 + 세심 관리 + 선택적 환경' },
  { code: 'NHBV', emoji: '🍀', name: '자연 입문자', description: '감성으로 시작하지만 환경엔 유연', detailDescription: '초보자 + 취미형 + 세심 관리 + 다양한 환경' },
  { code: 'NHCS', emoji: '📚', name: '감성 입문러', description: '쉽게 시작하는 따뜻한 취미', detailDescription: '초보자 + 취미형 + 간단 관리 + 선택적 환경' },
  { code: 'NHCV', emoji: '🧺', name: '힐링 간편러', description: '간단한 돌봄으로도 정서적 만족', detailDescription: '초보자 + 취미형 + 간단 관리 + 다양한 환경' },
  { code: 'NPBS', emoji: '💼', name: '실전 입문자', description: '처음이지만 제대로 키워보고 싶어', detailDescription: '초보자 + 수익형 + 세심 관리 + 선택적 환경' },
  { code: 'NPBV', emoji: '📈', name: '부지런한 도전자', description: '초보지만 수익을 위해 노력파', detailDescription: '초보자 + 수익형 + 세심 관리 + 다양한 환경' },
  { code: 'NPCS', emoji: '🥕', name: '전략 입문자', description: '쉽게 시작하지만 수익도 고려', detailDescription: '초보자 + 수익형 + 간단 관리 + 선택적 환경' },
  { code: 'NPCV', emoji: '🚀', name: '실속 초보자', description: '최소 노력, 최대 효율을 추구', detailDescription: '초보자 + 수익형 + 간단 관리 + 다양한 환경' },
];

// 코드별 추천 작물 데이터 (이름, 영문명, 설명)
export const cropDataByCode = {
  AHBS: [
    { name: '인삼', en: 'ginseng', desc: '건강에 좋은 뿌리.' },
    { name: '들깨', en: 'Perilla', desc: '고소한 맛의 잎채소.' },
    { name: '아스파라거스', en: 'Asparagus', desc: '고급 채소.' },
    { name: '오미자', en: 'Schisandra', desc: '다섯 가지 맛의 열매.' },
    { name: '자두', en: 'Plum', desc: '새콤달콤한 과일.' },
    { name: '참나물', en: 'Chive', desc: '향긋한 나물.' },
  ],
  AHBV: [
    { name: '고구마', en: 'Sweet Potato', desc: '달콤한 맛의 대표 작물.' },
    { name: '마', en: 'Yam', desc: '건강식으로 인기.' },
    { name: '무화과', en: 'Fig', desc: '달콤한 과일.' },
    { name: '산약', en: 'Wild Yam', desc: '산에서 자라는 마.' },
    { name: '오디', en: 'Mulberry', desc: '달콤한 열매.' },
  ],
  AHCS: [
    { name: '상추', en: 'Lettuce', desc: '쌈채소의 대표.' },
    { name: '감자', en: 'Potato', desc: '다양한 요리에 활용.' },
    { name: '매실', en: 'Japanese Apricot', desc: '청매실청의 재료.' },
  ],
  AHCV: [
    { name: '사과', en: 'Apple', desc: '대표적인 과일.' },
    { name: '근대', en: 'Swiss Chard', desc: '컬러풀한 잎채소.' },
    { name: '배', en: 'Pear', desc: '아삭한 과일.' },
    { name: '쪽파', en: 'Scallion', desc: '다양한 요리에 활용.' },
  ],
  APBS: [
    { name: '오이', en: 'Cucumber', desc: '수분이 풍부한 채소.' },
    { name: '감', en: 'Persimmon', desc: '가을을 대표하는 과일.' },
  ],
  APBV: [
    { name: '수박', en: 'Watermelon', desc: '여름 대표 과일.' },
    { name: '참외', en: 'Korean Melon', desc: '달콤한 노란 과일.' },
    { name: '토마토', en: 'Tomato', desc: '다양한 요리에 활용.' },
    { name: '방울토마토', en: 'Cherry Tomato', desc: '작고 귀여운 토마토.' },
  ],
  APCS: [
    { name: '벼', en: 'Rice', desc: '주식이 되는 곡물.' },
  ],
  APCV: [
    { name: '딸기', en: 'Strawberry', desc: '봄철 인기 과일.' },
  ],
  NHBS: [
    { name: '쑥갓', en: 'Crown Daisy', desc: '국거리, 쌈채로 인기.' },
    { name: '연근', en: 'Lotus Root', desc: '아삭한 식감의 뿌리채소.' },
    { name: '우엉', en: 'Burdock', desc: '영양이 풍부한 뿌리채소.' },
    { name: '도라지', en: 'bellflower', desc: '기관지에 좋은 뿌리채소.' },
    { name: '더덕', en: 'Deodeok', desc: '향이 좋은 산채.' },
    { name: '취나물', en: 'Chive', desc: '봄철 산나물.' },
  ],
  NHBV: [
    { name: '블루베리', en: 'Blueberry', desc: '항산화가 풍부한 과일.' },
  ],
  NHCS: [
    { name: '브로콜리', en: 'coli', desc: '비타민이 풍부한 녹색 채소.' },
  ],
  NHCV: [
    { name: '파프리카', en: 'Bell Pepper', desc: '다채로운 색의 채소.' },
    { name: '풋고추', en: 'Green Chili Pepper', desc: '매콤한 맛의 고추.' },
    { name: '청양고추', en: 'Cheongyang Chili Pepper', desc: '매운맛의 대표 고추.' },
    { name: '비트', en: 'Beet', desc: '붉은 색이 특징인 뿌리채소.' },
  ],
  NPBS: [
    { name: '마늘', en: 'Garlic', desc: '향신료로 인기.' },
    { name: '양파', en: 'Onion', desc: '기본 양념채소.' },
    { name: '얼갈이배추', en: 'Napa Cabbage', desc: '김치의 주재료.' },
    { name: '청경채', en: 'Bok Choy', desc: '부드러운 식감의 잎채소.' },
    { name: '참다래', en: 'Cherry', desc: '비타민이 풍부한 과일.' },
  ],
  NPBV: [
    { name: '체리', en: 'Cherry', desc: '상큼한 맛의 과일.' },
    { name: '참깨', en: 'Sesame', desc: '고소한 맛의 씨앗.' },
    { name: '수수', en: 'Sorghum', desc: '곡물로도 쓰이는 작물.' },
    { name: '조', en: 'Millet', desc: '영양이 풍부한 곡물.' },
    { name: '체리', en: 'Cherry', desc: '상큼한 맛의 과일.' },
    { name: '생강', en: 'Ginger', desc: '매운맛과 향이 특징.' },
  ],
  NPCS: [
    { name: '당근', en: 'Carrot', desc: '비타민이 풍부한 대표 뿌리채소.' },
    { name: '무', en: 'Radish', desc: '건강하게 잘 자라는 뿌리채소입니다.' },
    { name: '미나리', en: 'Water Parsley', desc: '향긋한 향과 아삭한 식감의 채소.' },
    { name: '배추', en: 'Napa Cabbage', desc: '김치의 주재료.' },
    { name: '부추', en: 'Chive', desc: '향긋한 향과 영양.' },
    { name: '시금치', en: 'Spinach', desc: '철분이 풍부한 잎채소.' },
    { name: '양배추', en: 'Cabbage', desc: '다양한 요리에 활용되는 채소.' },
    { name: '호박', en: 'Sweet Potato', desc: '가을 대표 채소.' },
    { name: '복숭아', en: 'Peach', desc: '달콤한 과일.' },
    { name: '케일', en: 'Kale', desc: '슈퍼푸드로 인기.' },
    { name: '유채', en: 'Rapeseed', desc: '노란 꽃이 아름다운 채소.' },
    { name: '고추', en: 'Green Chili Pepper', desc: '매콤한 맛의 고추.' },
  ],
  NPCV: [
    { name: '메론', en: 'Melon', desc: '달콤한 과일.' },
  ],
};

const NBTITest = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);

  // 질문 데이터
  const questions = [
    // 1. 적응력 (A vs N) - Q1,Q2,Q3
    {
      id: 1,
      question: "농작물 재배 경험이 있으신가요?",
      options: [
        { text: "거의 처음이에요. 배우는 중이에요.", value: "N" },
        { text: "어느 정도 경험이 있어서 익숙한 편이에요.", value: "A" }
      ],
      description: "초보자형(N) vs 숙련자형(A)"
    },
    {
      id: 2,
      question: "작물을 키우다 문제가 생기면 어떻게 하시겠어요?",
      options: [
        { text: "복잡한 건 어렵고, 최대한 문제가 안 생기길 바라요.", value: "N" },
        { text: "인터넷을 찾아보거나 직접 해결해봐요.", value: "A" }
      ],
      description: "문제 해결 의지"
    },
    {
      id: 3,
      question: "물주기나 비료주기 등 작물 관리를 어떻게 생각하시나요?",
      options: [
        { text: "너무 자주 관리하는 건 부담돼요. 간단한 게 좋아요.", value: "N" },
        { text: "신경 쓰는 편이에요. 작물 상태를 자주 확인해요.", value: "A" }
      ],
      description: "관리 복잡도에 대한 태도"
    },
    // 2. 상품성 (H vs P) - Q4,Q5,Q6
    {
      id: 4,
      question: "텃밭을 시작하려는 가장 큰 이유는 무엇인가요?",
      options: [
        { text: "힐링과 재미를 위해서요.", value: "H" },
        { text: "수확해서 직접 먹거나 팔고 싶어서요.", value: "P" }
      ],
      description: "취미형(H) vs 수익형(P)"
    },
    {
      id: 5,
      question: "예쁘지만 수확이 적은 작물과 수확이 많은 작물 중 어느 쪽이 더 끌리나요?",
      options: [
        { text: "예쁘고 키우는 재미가 있는 작물", value: "H" },
        { text: "수확량이 많고 실속 있는 작물", value: "P" }
      ],
      description: "작물 선택 우선순위"
    },
    {
      id: 6,
      question: "수익을 낼 수 있는 재배 방식에 대해 관심이 있으신가요?",
      options: [
        { text: "아니요, 즐거우면 충분해요.", value: "H" },
        { text: "네, 어떻게 하면 실속 있게 할 수 있을지 고민돼요.", value: "P" }
      ],
      description: "경제적 관점"
    },
    // 3. 빈도성 (B vs C) - Q7,Q8,Q9
    {
      id: 7,
      question: "텃밭을 얼마나 자주 돌볼 수 있을 것 같나요?",
      options: [
        { text: "바빠서 자주는 어렵고 가끔 돌보는 게 좋아요.", value: "C" },
        { text: "하루에 한 번 이상은 볼 수 있어요.", value: "B" }
      ],
      description: "시간 많음/세심관리형(B) vs 시간 부족형/간단관리형(C)"
    },
    {
      id: 8,
      question: "병충해나 잡초 관리는 어떻게 생각하시나요?",
      options: [
        { text: "간편하게 최소한만 하고 싶어요.", value: "C" },
        { text: "꼼꼼히 챙기고 싶어요.", value: "B" }
      ],
      description: "관리 정성도"
    },
    {
      id: 9,
      question: "작물의 성장 과정을 기록하거나 관찰하는 걸 좋아하시나요?",
      options: [
        { text: "아니요, 그런 건 귀찮아서 안 해요.", value: "C" },
        { text: "네, 세심하게 관리하는 게 재밌어요.", value: "B" }
      ],
      description: "텃밭 활동 빈도"
    },
    // 4. 환경적합성 (S vs V) - Q10,Q11,Q12
    {
      id: 10,
      question: "텃밭은 어떤 공간에서 운영할 계획인가요?",
      options: [
        { text: "햇빛이 부족하거나 좁은 실내 공간이에요 (예: 베란다, 창가).", value: "S" },
        { text: "햇빛이 잘 들고 넉넉한 야외 공간이에요 (예: 옥상, 마당).", value: "V" }
      ],
      description: "공간 환경"
    },
    {
      id: 11,
      question: "작물이 잘 자라려면 어떤 조건이 중요하다고 생각하시나요?",
      options: [
        { text: "토양, 물, 햇빛 조건을 잘 맞춰야 한다고 생각해요.", value: "S" },
        { text: "웬만한 조건에서도 잘 자라는 작물이 좋아요.", value: "V" }
      ],
      description: "환경 조절 가능성"
    },
    {
      id: 12,
      question: "주변 환경에 따라 작물을 바꾸는 걸 고려하시나요?",
      options: [
        { text: "네, 환경에 맞는 작물을 신중히 고르고 싶어요.", value: "S" },
        { text: "어떤 환경에서도 쉽게 키울 수 있는 작물을 찾고 있어요.", value: "V" }
      ],
      description: "작물 선택 기준"
    },
  ];

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 테스트 완료, 결과 계산
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers) => {
    console.log('모든 답변:', allAnswers.map(answer => ({ text: answer.text, value: answer.value })));
    
    // 1. 적응력 (N/A) - Q1,Q2,Q3 중 다수결
    const adaptabilityAnswers = allAnswers.slice(0, 3);
    const adaptabilityCount = {
      novice: adaptabilityAnswers.filter(answer => answer.value === 'N').length,
      adaptable: adaptabilityAnswers.filter(answer => answer.value === 'A').length
    };
    const adaptabilityCode = adaptabilityCount.adaptable >= 2 ? 'A' : 'N';
    console.log('적응력 카운트:', adaptabilityCount, '코드:', adaptabilityCode);

    // 2. 상품성 (H/P) - Q4,Q5,Q6 중 다수결
    const profitAnswers = allAnswers.slice(3, 6);
    const profitCount = {
      hobby: profitAnswers.filter(answer => answer.value === 'H').length,
      profit: profitAnswers.filter(answer => answer.value === 'P').length
    };
    const profitCode = profitCount.profit >= 2 ? 'P' : 'H';
    console.log('상품성 카운트:', profitCount, '코드:', profitCode);

    // 3. 빈도성 (B vs C) - Q7,Q8,Q9 중 다수결
    const careAnswers = allAnswers.slice(6, 9);
    const careCount = {
      busy: careAnswers.filter(answer => answer.value === 'B').length,
      careless: careAnswers.filter(answer => answer.value === 'C').length
    };
    const careCode = careCount.busy >= 2 ? 'B' : 'C';
    console.log('빈도성 카운트:', careCount, '코드:', careCode);

    // 4. 환경적합성 (S vs V) - Q10,Q11,Q12 중 다수결
    const envAnswers = allAnswers.slice(9, 12);
    const envCount = {
      selective: envAnswers.filter(answer => answer.value === 'S').length,
      versatile: envAnswers.filter(answer => answer.value === 'V').length
    };
    const envCode = envCount.versatile >= 2 ? 'V' : 'S';
    console.log('환경적합성 카운트:', envCount, '코드:', envCode);

    // 최종 코드 조합 (4자리)
    const finalCode = adaptabilityCode + profitCode + careCode + envCode;
    console.log('최종 코드:', finalCode);
    console.log('유형 존재 여부:', types.find(t => t.code === finalCode) ? '존재' : '없음');
    
    // types 배열에서 코드로 찾기
    const foundType = types.find(t => t.code === finalCode);
    // 성향분석, 텃밭특성 답변 추출
    const tendencyAnswer = allAnswers[12]?.value || "-";
    const gardenFeatureAnswer = allAnswers[13]?.value || "-";
    setResult({
      code: finalCode,
      type: foundType || {
        name: '알 수 없는 유형',
        description: `코드: ${finalCode}`,
        emoji: '🌱',
        mainCrop: '',
        cropList: [],
        characteristics: ['디버깅 필요'],
        tips: '코드가 매칭되지 않습니다.'
      },
      tendency: tendencyAnswer,
      gardenFeature: gardenFeatureAnswer
    });
    setIsCompleted(true);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // 결과 카드 컴포넌트 분리
  const ResultCard = ({ code, type, answers, onRetry }) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupCrop, setPopupCrop] = useState(null);
    const [popupGarden, setPopupGarden] = useState(false);
    // cropList가 없으면 빈 배열 유지
    // 진단용 로그
    console.log('ResultCard code:', code);
    console.log('ResultCard answers:', answers);
    
    // 33% 단위로 점수 계산 (0, 33, 67, 100%)
    const adaptabilityScore = (answers) => {
      const count = answers.filter(a => a.value === 'A').length;
      if (count === 0) return 0;
      if (count === 1) return 33;
      if (count === 2) return 67;
      return 100;
    };
    const profitScore = (answers) => {
      const count = answers.filter(a => a.value === 'P').length;
      if (count === 0) return 0;
      if (count === 1) return 33;
      if (count === 2) return 67;
      return 100;
    };
    const busyScore = (answers) => {
      const count = answers.filter(a => a.value === 'B').length;
      if (count === 0) return 0;
      if (count === 1) return 33;
      if (count === 2) return 67;
      return 100;
    };
    const envScore = (answers) => {
      const count = answers.filter(a => a.value === 'V').length;
      if (count === 0) return 0;
      if (count === 1) return 33;
      if (count === 2) return 67;
      return 100;
    };
    return (
      <div className="nbti-test">
        <header className="custom-header">
          <div className="header-left">
            <span 
              className="logo-tjc"
              onClick={() => window.location.reload()}
              style={{ cursor: 'pointer' }}
              title="홈으로 돌아가기"
            >
              N(農)BTI
            </span>
          </div>
        </header>
        <div className="result-container">
          <div className="result-header">
            <h1 onClick={() => window.location.reload()} style={{ cursor: 'pointer' }} title="홈으로 돌아가기">🎉 N(農)BTI 결과</h1>
            <div className="result-code">{code}</div>
            <div className="result-emoji">{type.emoji}</div>
            <h2>{type.name}</h2>
            <p className="result-description">{type.description}</p>
          </div>
          {type.detailDescription && (
            <div className="detail-description-section">
              <h3>📋 유형 상세 설명</h3>
              <p className="detail-description-text">{type.detailDescription}</p>
            </div>
          )}
          {type.fullDescription && (
            <div className="full-description-section" style={{
              margin: '24px 0', 
              padding: '24px 20px', 
              background: 'rgba(255,255,255,0.1)', 
              borderRadius: 16, 
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <h3 style={{
                fontWeight: 700, 
                fontSize: '1.2em', 
                marginBottom: 16, 
                color: '#fff',
                display: 'flex', 
                alignItems: 'center', 
                gap: 8
              }}>
                <span role="img" aria-label="info">💡</span> 유형 자세한 설명
              </h3>
              <p style={{
                color: '#fff', 
                fontSize: '1em', 
                lineHeight: '1.6', 
                margin: 0,
                textAlign: 'justify'
              }}>{type.fullDescription}</p>
            </div>
          )}
          {/* 성향분석 파트 */}
          <div className="tendency-analysis-section" style={{
            margin: '32px 0 24px 0', 
            padding: '32px 24px', 
            background: 'rgba(255,255,255,0.12)', 
            borderRadius: 20, 
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{
              fontWeight: 700, 
              fontSize: '1.4em', 
              marginBottom: 28, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10, 
              color: '#fff',
              textAlign: 'center',
              justifyContent: 'center'
            }}>
              <span role="img" aria-label="chart">📊</span> 성향 분석
            </h3>
            {/* 적응력 */}
            <div style={{
              marginBottom: 24, 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: 16, 
              padding: '20px 16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 12
              }}>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff',
                  fontSize: '1.1em'
                }}>🌱 적응력</span>
                <span style={{
                  fontSize: '1em', 
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500
                }}>N(초보자) / A(숙련자)</span>
              </div>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: 12
              }}>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff', 
                  minWidth: 24,
                  fontSize: '1.1em',
                  textAlign: 'center'
                }}>N</span>
                <div style={{
                  flex: 1, 
                  height: 20, 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: 10, 
                  position: 'relative', 
                  margin: '0 10px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    width: `${100 - adaptabilityScore(answers)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#e0e0e0,#b2f77c)', 
                    borderRadius: 10, 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    transition: 'width 0.8s ease-in-out'
                  }}></div>
                  <div style={{
                    width: `${adaptabilityScore(answers)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#1ecb6b,#4be585)', 
                    borderRadius: 10, 
                    position: 'absolute', 
                    right: 0, 
                    top: 0, 
                    transition: 'width 0.8s ease-in-out',
                    boxShadow: '0 2px 8px rgba(30,203,107,0.3)'
                  }}></div>
                  <span style={{
                    position: 'absolute', 
                    right: 12, 
                    top: 0, 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    fontWeight: 700, 
                    color: '#fff',
                    fontSize: '0.95em',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}>{adaptabilityScore(answers)}%</span>
                </div>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff', 
                  minWidth: 24,
                  fontSize: '1.1em',
                  textAlign: 'center'
                }}>A</span>
              </div>
            </div>
            {/* 상품성 */}
            <div style={{
              marginBottom: 24, 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: 16, 
              padding: '20px 16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 12
              }}>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff',
                  fontSize: '1.1em'
                }}>💰 상품성</span>
                <span style={{
                  fontSize: '1em', 
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500
                }}>H(취미형) / P(수익형)</span>
              </div>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: 12
              }}>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff', 
                  minWidth: 24,
                  fontSize: '1.1em',
                  textAlign: 'center'
                }}>H</span>
                <div style={{
                  flex: 1, 
                  height: 20, 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: 10, 
                  position: 'relative', 
                  margin: '0 10px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    width: `${100 - profitScore(answers)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#e0e0e0,#b2f77c)', 
                    borderRadius: 10, 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    transition: 'width 1.2s ease-in-out'
                  }}></div>
                  <div style={{
                    width: `${profitScore(answers)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#b2f77c,#4be585)', 
                    borderRadius: 10, 
                    position: 'absolute', 
                    right: 0, 
                    top: 0, 
                    transition: 'width 1.2s ease-in-out',
                    boxShadow: '0 2px 8px rgba(178,247,124,0.3)'
                  }}></div>
                  <span style={{
                    position: 'absolute', 
                    right: 12, 
                    top: 0, 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    fontWeight: 700, 
                    color: '#fff',
                    fontSize: '0.95em',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}>{profitScore(answers)}%</span>
                </div>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff', 
                  minWidth: 24,
                  fontSize: '1.1em',
                  textAlign: 'center'
                }}>P</span>
              </div>
            </div>
            {/* 빈도성 */}
            <div style={{
              marginBottom: 24, 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: 16, 
              padding: '20px 16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 12
              }}>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff',
                  fontSize: '1.1em'
                }}>⏰ 빈도성</span>
                <span style={{
                  fontSize: '1em', 
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500
                }}>C(간단) / B(세심)</span>
              </div>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: 12
              }}>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff', 
                  minWidth: 24,
                  fontSize: '1.1em',
                  textAlign: 'center'
                }}>C</span>
                <div style={{
                  flex: 1, 
                  height: 20, 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: 10, 
                  position: 'relative', 
                  margin: '0 10px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    width: `${100 - busyScore(answers)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#e0e0e0,#7ce6f7)', 
                    borderRadius: 10, 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    transition: 'width 1.6s ease-in-out'
                  }}></div>
                  <div style={{
                    width: `${busyScore(answers)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#7ce6f7,#4be585)', 
                    borderRadius: 10, 
                    position: 'absolute', 
                    right: 0, 
                    top: 0, 
                    transition: 'width 1.6s ease-in-out',
                    boxShadow: '0 2px 8px rgba(124,230,247,0.3)'
                  }}></div>
                  <span style={{
                    position: 'absolute', 
                    right: 12, 
                    top: 0, 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    fontWeight: 700, 
                    color: '#fff',
                    fontSize: '0.95em',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}>{busyScore(answers)}%</span>
                </div>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff', 
                  minWidth: 24,
                  fontSize: '1.1em',
                  textAlign: 'center'
                }}>B</span>
              </div>
            </div>
            {/* 환경적합성 */}
            <div style={{
              marginBottom: 0, 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: 16, 
              padding: '20px 16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 12
              }}>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff',
                  fontSize: '1.1em'
                }}>🌍 환경적합성</span>
                <span style={{
                  fontSize: '1em', 
                  color: 'rgba(255,255,255,0.9)',
                  fontWeight: 500
                }}>S(선택) / V(다양)</span>
              </div>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: 12
              }}>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff', 
                  minWidth: 24,
                  fontSize: '1.1em',
                  textAlign: 'center'
                }}>S</span>
                <div style={{
                  flex: 1, 
                  height: 20, 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: 10, 
                  position: 'relative', 
                  margin: '0 10px',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    width: `${100 - envScore(answers)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#e0e0e0,#7cf7a6)', 
                    borderRadius: 10, 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    transition: 'width 2.0s ease-in-out'
                  }}></div>
                  <div style={{
                    width: `${envScore(answers)}%`, 
                    height: '100%', 
                    background: 'linear-gradient(90deg,#7cf7a6,#4be585)', 
                    borderRadius: 10, 
                    position: 'absolute', 
                    right: 0, 
                    top: 0, 
                    transition: 'width 2.0s ease-in-out',
                    boxShadow: '0 2px 8px rgba(124,247,166,0.3)'
                  }}></div>
                  <span style={{
                    position: 'absolute', 
                    right: 12, 
                    top: 0, 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    fontWeight: 700, 
                    color: '#fff',
                    fontSize: '0.95em',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                  }}>{envScore(answers)}%</span>
                </div>
                <span style={{
                  fontWeight: 700, 
                  color: '#fff', 
                  minWidth: 24,
                  fontSize: '1.1em',
                  textAlign: 'center'
                }}>V</span>
              </div>
            </div>
          </div>
          <div className="recommended-crops">
            <h3>🌱 추천 작물</h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 24,
              justifyContent: 'center',
              margin: '24px 0'
            }}>
              {cropDataByCode[code]
                ? cropDataByCode[code].map((c, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.12)',
                      borderRadius: 14,
                      padding: 16,
                      minWidth: 140,
                      maxWidth: 180,
                      color: '#fff',
                      textAlign: 'center'
                    }}>
                      <img
                        src={`${process.env.PUBLIC_URL}/images/photo/${c.en.replace(/ /g, '%20')}${c.en === 'coli' ? '.jpeg' : '.jpg'}`}
                        alt={c.name}
                        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, marginBottom: 8, background: '#eee' }}
                        onError={e => { 
                          // .jpg 파일이 없으면 .webp 파일 시도
                          if (e.target.src.includes('.jpg')) {
                            e.target.src = e.target.src.replace('.jpg', '.webp');
                          } else if (e.target.src.includes('.jpeg')) {
                            e.target.src = e.target.src.replace('.jpeg', '.webp');
                          } else {
                            e.target.style.display='none'; 
                            const noImgDiv = e.target.parentNode.querySelector('.no-img');
                            if (noImgDiv) noImgDiv.style.display='flex';
                          }
                        }}
                      />
                      <div className="no-img" style={{ 
                        display: 'none', 
                        width: 80, 
                        height: 80, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        background: 'rgba(255,255,255,0.2)', 
                        color: '#fff', 
                        borderRadius: 10, 
                        margin: '0 auto 8px auto', 
                        fontSize: '0.8em',
                        fontWeight: 600
                      }}>🌱</div>
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.name}</div>
                      <div style={{ fontSize: '0.9em', fontWeight: 400, marginBottom: 8, lineHeight: '1.3' }}>{c.desc}</div>
                      <button
                        style={{
                          background: '#32cd32',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '8px 12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          fontSize: '0.9em',
                          marginTop: 4,
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={e => e.target.style.background = '#28a428'}
                        onMouseOut={e => e.target.style.background = '#32cd32'}
                        onClick={() => window.open(`${process.env.PUBLIC_URL}/images/loading.jpeg`, '_blank', 'width=400,height=400')}
                      >
                        씨앗 및 모종 구매
                      </button>
                    </div>
                  ))
                : <div style={{ 
                    textAlign: 'center', 
                    color: '#fff', 
                    fontSize: '1.1em', 
                    padding: '20px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: 12
                  }}>추천 작물이 없습니다.</div>
              }
            </div>
          </div>
          {type.characteristics && (
            <div className="characteristics-section">
              <h3>✨ 당신의 텃밭 특성</h3>
              <div className="characteristics-list">
                {type.characteristics.map((characteristic, index) => (
                  <span key={index} className="characteristic-tag">{characteristic}</span>
                ))}
              </div>
            </div>
          )}
          {type.tips && (
            <div className="tips-section">
              <h3>💡 맞춤 재배 팁</h3>
              <p className="tips-text">{type.tips}</p>
            </div>
          )}
          <div className="type-explanation-section">
            <h3>📖 유형 해설</h3>
            <div className="explanation-grid">
              <div className="explanation-item">
                <h4>A vs N: 적응력 (Adaptability)</h4>
                <div className="explanation-comparison">
                  <div className="explanation-side adaptable">
                    <h5>A (숙련자형)</h5>
                    <p className="explanation-summary">작물 관리가 익숙하고 다양한 상황에 유연하게 대응</p>
                    <p className="explanation-detail">다양한 작물과 환경에서도 재배 경험이 있거나, 스스로 문제를 해결할 수 있는 능력이 있는 유형입니다. 시비나 병해충 대응도 능동적으로 시도하며, 텃밭 활동을 장기적으로 발전시켜 나가려는 경향이 있습니다.</p>
                  </div>
                  <div className="explanation-side novice">
                    <h5>N (초보자형)</h5>
                    <p className="explanation-summary">처음 텃밭을 시작하며 간편하고 쉬운 작물을 선호</p>
                    <p className="explanation-detail">텃밭이 처음이거나 재배 경험이 많지 않은 사람입니다. 복잡한 관리는 부담스럽고, 최대한 간단하고 쉽게 키울 수 있는 작물을 선호합니다. 텃밭이 '가벼운 시작점'이 되기를 기대합니다.</p>
                  </div>
                </div>
              </div>

              <div className="explanation-item">
                <h4>H vs P: 상품성 (Hobby vs Profit)</h4>
                <div className="explanation-comparison">
                  <div className="explanation-side hobby">
                    <h5>H (취미형)</h5>
                    <p className="explanation-summary">힐링과 감성 중심의 재배 목적</p>
                    <p className="explanation-detail">작물을 키우는 과정에서 정서적인 만족, 힐링, 감성을 중요하게 여깁니다. 예쁜 작물, 소소한 돌봄, 생활 속의 여유를 위한 텃밭을 꿈꾸며, 결과물보다 '과정의 즐거움'에 의미를 둡니다.</p>
                  </div>
                  <div className="explanation-side profit">
                    <h5>P (수익형)</h5>
                    <p className="explanation-summary">생산성과 수익 중심의 실용적 목적</p>
                    <p className="explanation-detail">수확량, 효율성, 경제성을 중시하는 경향이 있습니다. 텃밭을 '수익 활동'의 일부로 간주하며, 어떤 작물이 얼마나 잘 자라고 팔릴 수 있는지에 더 큰 관심을 가집니다.</p>
                  </div>
                </div>
              </div>

              <div className="explanation-item">
                <h4>B vs C: 빈도성 (Care Time)</h4>
                <div className="explanation-comparison">
                  <div className="explanation-side busy">
                    <h5>B (세심 관리형)</h5>
                    <p className="explanation-summary">자주 텃밭을 돌보며 정성껏 가꾸는 스타일</p>
                    <p className="explanation-detail">물주기, 병해충 확인, 상태 체크 등을 자주 하며 텃밭을 정성스럽게 관리합니다. 작물 하나하나를 관찰하고 기록하는 걸 좋아하며, 텃밭 활동을 하나의 취미나 루틴으로 여깁니다.</p>
                  </div>
                  <div className="explanation-side careless">
                    <h5>C (간단 관리형)</h5>
                    <p className="explanation-summary">시간을 많이 들이지 않고 간편하게 키우는 스타일</p>
                    <p className="explanation-detail">바쁜 생활 속에서 최소한의 시간으로 텃밭을 유지하고 싶어하는 유형입니다. 자동화 시스템이나 돌봄이 쉬운 작물을 선호하며, 결과만 얻을 수 있으면 과정은 간편할수록 좋다고 생각합니다.</p>
                  </div>
                </div>
              </div>

              <div className="explanation-item">
                <h4>S vs V: 환경적합성 (Selective vs Versatile)</h4>
                <div className="explanation-comparison">
                  <div className="explanation-side selective">
                    <h5>S (까다로운 환경형)</h5>
                    <p className="explanation-summary">특정 조건을 잘 맞춰야 건강하게 자라는 유형</p>
                    <p className="explanation-detail">특정 토양과 조건을 잘 맞춰야 건강하게 자라는 유형의 작물입니다. 재배시 환경 관리와 어느정도의 맞춤형 관리가 필요합니다. 세심한 관심, 계획을 통한 높은 품질을 기대하여, 재배능력에 깊이를 더하고 싶을때 선호합니다.</p>
                  </div>
                  <div className="explanation-side versatile">
                    <h5>V (어디서나 자라는 유형)</h5>
                    <p className="explanation-summary">다양한 환경에서 쉽게 재배할 수 있는 유형</p>
                    <p className="explanation-detail">토양이나 기후가 크게 까다롭지 않아서 다양한 환경에서 쉽게 재배할수 있습니다. 관리가 비교적 단순하고 안정적이기 때문에 초보자부터 숙련자까지 재배 계획을 세우기 수월하고 키우기 좋습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="result-actions" style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32 }}>
            <button className="retry-button" onClick={onRetry}>다시 테스트하기</button>
            <button className="share-button" onClick={() => {
              navigator.share?.({
                title: 'N(농)BTI 테스트 결과',
                text: `나의 텃밭 성향은 "${type.name}"입니다! ${type.tips}`,
                url: window.location.href
              }) || alert('결과가 복사되었습니다!');
            }}>결과 공유하기</button>
            <button className="garden-button" style={{ background: '#228b22', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 20px', fontWeight: 600, fontSize: '1em', cursor: 'pointer', boxShadow: '0 4px 12px rgba(34,139,34,0.2)' }} onClick={() => window.open(`${process.env.PUBLIC_URL}/images/loading.jpeg`, '_blank', 'width=400,height=400')}>
              주변 텃밭 찾기
            </button>
          </div>
          {/* 팝업: 모종/씨앗 구매 */}
          {popupOpen && (
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100vw', 
              height: '100vh', 
              background: 'rgba(0,0,0,0.45)', 
              zIndex: 9999, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }} onClick={() => setPopupOpen(false)}>
              <div style={{ 
                background: 'white', 
                borderRadius: 18, 
                padding: 32, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                minWidth: 280 
              }} onClick={e => e.stopPropagation()}>
                <img 
                  src={`${process.env.PUBLIC_URL}/images/loading.png`} 
                  alt="loading" 
                  style={{ width: 120, height: 120, marginBottom: 18 }} 
                />
                <div style={{ fontWeight: 700, fontSize: '1.1em', marginBottom: 8, textAlign: 'center' }}>
                  {popupCrop} 모종/씨앗 구매 페이지로 이동 중...
                </div>
                <button 
                  style={{ 
                    marginTop: 10, 
                    background: '#32cd32', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 8, 
                    padding: '8px 16px', 
                    fontWeight: 600, 
                    cursor: 'pointer', 
                    fontSize: '0.97em' 
                  }} 
                  onClick={() => setPopupOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
          {/* 팝업: 주변 텃밭 찾기 */}
          {popupGarden && (
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100vw', 
              height: '100vh', 
              background: 'rgba(0,0,0,0.45)', 
              zIndex: 9999, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }} onClick={() => setPopupGarden(false)}>
              <div style={{ 
                background: 'white', 
                borderRadius: 18, 
                padding: 32, 
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                minWidth: 280 
              }} onClick={e => e.stopPropagation()}>
                <img 
                  src={`${process.env.PUBLIC_URL}/images/loading.png`} 
                  alt="loading" 
                  style={{ width: 120, height: 120, marginBottom: 18 }} 
                />
                <div style={{ fontWeight: 700, fontSize: '1.1em', marginBottom: 8, textAlign: 'center' }}>
                  주변 텃밭 찾기 서비스로 이동 중...
                </div>
                <button 
                  style={{ 
                    marginTop: 10, 
                    background: '#228b22', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 8, 
                    padding: '8px 16px', 
                    fontWeight: 600, 
                    cursor: 'pointer', 
                    fontSize: '0.97em' 
                  }} 
                  onClick={() => setPopupGarden(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (isCompleted && result) {
    return <ResultCard code={result.code} type={result.type} answers={answers} onRetry={resetTest} />;
  }

  return (
    <div className="nbti-test">
      {/* 상단 헤더 영역 */}
      <header className="custom-header">
        <div className="header-left">
          <span 
            className="logo-tjc"
            onClick={() => window.location.reload()}
            style={{ cursor: 'pointer' }}
            title="홈으로 돌아가기"
          >
            N(農)BTI
          </span>
        </div>
      </header>

      <div className="test-container">
        <div className="test-header">
          {onBack && (
            <button className="back-button" onClick={onBack}>
              ← 돌아가기
            </button>
          )}
          <h1 
            onClick={() => window.location.reload()} 
            style={{ cursor: 'pointer' }}
            title="홈으로 돌아가기"
          >
            N(農)BTI 테스트
          </h1>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{currentQuestion + 1} / {questions.length}</p>
        </div>

        <div className="question-container">
          <h2 className="question-text">
            {questions[currentQuestion].question}
          </h2>
          <p className="question-description">
            {questions[currentQuestion].description}
          </p>

          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-button"
                onClick={() => handleAnswer(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NBTITest; 