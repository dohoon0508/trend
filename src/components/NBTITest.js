import React, { useState } from 'react';
import './NBTITest.css';

const NBTITest = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);

  // 질문 데이터
  const questions = [
    // 1. 재배 환경 적합성 (F/L)
    {
      id: 1,
      category: "🌱 재배 환경 적합성",
      question: "작물을 기를 장소는 어디인가요?",
      options: [
        { text: "실내", value: "indoor", score: 1 },
        { text: "실외", value: "outdoor", score: 0 },
        { text: "둘 다 가능", value: "both", score: 1 }
      ],
      description: "수직농업, 수경재배 가능 여부를 평가합니다"
    },
    {
      id: 2,
      category: "🌱 재배 환경 적합성",
      question: "겨울철에도 작물이 잘 자라면 좋겠다고 생각하시나요?",
      options: [
        { text: "예", value: "yes", score: 1 },
        { text: "아니오", value: "no", score: 0 }
      ],
      description: "내한성을 평가합니다"
    },
    {
      id: 3,
      category: "🌱 재배 환경 적합성",
      question: "온도 변화가 잦은 환경에서도 잘 버티는 작물이 좋으신가요?",
      options: [
        { text: "예", value: "yes", score: 1 },
        { text: "아니오", value: "no", score: 0 }
      ],
      description: "내서성을 평가합니다"
    },
    // 2. 관리 빈도성과 노동량 (C/B)
    {
      id: 4,
      category: "🧤 관리 빈도성과 노동량",
      question: "하루에 작물 관리에 쓸 수 있는 시간은 어느 정도인가요?",
      options: [
        { text: "10분 이내", value: "short", score: 0 },
        { text: "30분 이상", value: "long", score: 1 }
      ],
      description: "시간 기반 빈도를 판단합니다"
    },
    {
      id: 5,
      category: "🧤 관리 빈도성과 노동량",
      question: "병충해 방제를 자주 해야 한다면 괜찮으신가요?",
      options: [
        { text: "괜찮다", value: "ok", score: 1 },
        { text: "최소화하고 싶다", value: "minimize", score: 0 }
      ],
      description: "병해충 민감도를 측정합니다"
    },
    {
      id: 6,
      category: "🧤 관리 빈도성과 노동량",
      question: "수확은 여러 번 하는 것보다 한 번이 더 낫다고 생각하시나요?",
      options: [
        { text: "예", value: "yes", score: 0 },
        { text: "아니오", value: "no", score: 1 }
      ],
      description: "수확 주기 선호도를 확인합니다"
    },
    // 3. 작물 적응력 (A/N)
    {
      id: 7,
      category: "💪 작물 적응력",
      question: "병충해에 강한 작물이 좋다고 생각하시나요?",
      options: [
        { text: "예", value: "yes", score: 1 },
        { text: "아니오", value: "no", score: 0 }
      ],
      description: "병해충 민감도를 평가합니다"
    },
    {
      id: 8,
      category: "💪 작물 적응력",
      question: "농약이나 비료 등 자재를 쉽게 구할 수 있는 작물이 편하시다고 느끼시나요?",
      options: [
        { text: "예", value: "yes", score: 1 },
        { text: "상관없음", value: "no", score: 0 }
      ],
      description: "자재 접근성을 확인합니다"
    },
    {
      id: 9,
      category: "💪 작물 적응력",
      question: "초보자라서, 키우기 쉬운 작물이 더 나을 것 같다고 생각하시나요?",
      options: [
        { text: "예", value: "yes", score: 0 },
        { text: "아니오", value: "no", score: 1 }
      ],
      description: "적응력을 종합 판단합니다"
    },
    // 4. 시장성/목적성 (P/H)
    {
      id: 10,
      category: "💰 시장성/목적성",
      question: "작물을 판매할 계획이 있으신가요?",
      options: [
        { text: "예", value: "yes", score: 1 },
        { text: "아니오", value: "no", score: 0 }
      ],
      description: "수익 목적 여부를 확인합니다"
    },
    {
      id: 11,
      category: "💰 시장성/목적성",
      question: "가격이 비싼 작물이 더 좋다고 생각하시나요?",
      options: [
        { text: "예", value: "yes", score: 1 },
        { text: "아니오", value: "no", score: 0 }
      ],
      description: "단가 기준 판단을 확인합니다"
    },
    {
      id: 12,
      category: "💰 시장성/목적성",
      question: "시장에서 인기 있는 작물을 위주로 키우고 싶으신가요?",
      options: [
        { text: "예", value: "yes", score: 1 },
        { text: "별로", value: "no", score: 0 }
      ],
      description: "트렌드 선호도를 측정합니다"
    }
  ];

  // 유형별 데이터
  const types = {
    'NHLF': { name: '바쁜 도시 텃밭러', description: '초보자 + 감성 위주 + 시간 없음 + 유연한 환경', emoji: '🏙️', crops: ['상추', '바질', '체리토마토'] },
    'NHLC': { name: '소극적 자연애호가', description: '초보자 + 감성 위주 + 시간 없음 + 제한된 환경', emoji: '🌿', crops: ['새싹채소', '허브', '미니화분채소'] },
    'NHBF': { name: '힐링 초보', description: '초보자 + 감성 위주 + 시간 많음 + 유연한 환경', emoji: '🧘', crops: ['라벤더', '로즈마리', '민트'] },
    'NHBC': { name: '일상 속 미니농부', description: '초보자 + 감성 위주 + 시간 많음 + 제한된 환경', emoji: '🌱', crops: ['방울토마토', '상추', '오이'] },
    'NPLF': { name: '현실형 농부', description: '초보자 + 수익 중심 + 시간 없음 + 유연한 환경', emoji: '💪', crops: ['시금치', '무', '배추'] },
    'NPLC': { name: '도전형 텃밭러', description: '초보자 + 수익 중심 + 시간 없음 + 제한된 환경', emoji: '🚀', crops: ['감자', '양파', '당근'] },
    'NPBF': { name: '실속파 초보', description: '초보자 + 수익 중심 + 시간 많음 + 유연한 환경', emoji: '📈', crops: ['고추', '가지', '토마토'] },
    'NPBC': { name: '관리 최소 수익러', description: '초보자 + 수익 중심 + 시간 많음 + 제한된 환경', emoji: '💰', crops: ['콩', '호박', '옥수수'] },
    'AHLF': { name: '감성 텃밭 마스터', description: '숙련자 + 감성 위주 + 시간 없음 + 유연한 환경', emoji: '🎨', crops: ['허브믹스', '에디블플라워', '베이비채소'] },
    'AHLC': { name: '공간 제약 정원사', description: '숙련자 + 감성 위주 + 시간 없음 + 제한된 환경', emoji: '🏡', crops: ['미니토마토', '쌈채소', '새싹채소'] },
    'AHBF': { name: '세심한 힐링 마니아', description: '숙련자 + 감성 위주 + 시간 많음 + 유연한 환경', emoji: '🌸', crops: ['장미', '라벤더', '허브정원'] },
    'AHBC': { name: '일상 속 관리형 마스터', description: '숙련자 + 감성 위주 + 시간 많음 + 제한된 환경', emoji: '👨‍🌾', crops: ['토종채소', '쌈채소', '허브'] },
    'APLF': { name: '수익형 마스터', description: '숙련자 + 수익 중심 + 시간 없음 + 유연한 환경', emoji: '💼', crops: ['방울토마토', '시설채소', '수경재배'] },
    'APLC': { name: '전문가형 텃밭 실천가', description: '숙련자 + 수익 중심 + 시간 없음 + 제한된 환경', emoji: '🏆', crops: ['고부가가치채소', '특용작물', '계절채소'] },
    'APBF': { name: '세심한 수익농부', description: '숙련자 + 수익 중심 + 시간 많음 + 유연한 환경', emoji: '🌟', crops: ['유기농채소', '희귀채소', '프리미엄작물'] },
    'APBC': { name: '전문 텃밭 경영자', description: '숙련자 + 수익 중심 + 시간 많음 + 제한된 환경', emoji: '👑', crops: ['고수익작물', '계약재배', '브랜드채소'] }
  };

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
    // 1. 재배 환경 적합성 (F/L) - Q1,Q2,Q3 (2개 이상 "예" 시 F)
    const environmentScore = allAnswers.slice(0, 3).reduce((sum, answer) => sum + answer.score, 0);
    const environmentCode = environmentScore >= 2 ? 'F' : 'L';

    // 2. 관리 빈도성과 노동량 (C/B) - Q4,Q5,Q6 (평균 0.5 이상이면 C)
    const careScore = allAnswers.slice(3, 6).reduce((sum, answer) => sum + answer.score, 0);
    const careAverage = careScore / 3;
    const careCode = careAverage >= 0.5 ? 'C' : 'B';

    // 3. 작물 적응력 (A/N) - Q7,Q8 평균값 기준 + Q9
    const adaptabilityScore1 = (allAnswers[6].score + allAnswers[7].score) / 2; // Q7,Q8 평균
    const adaptabilityScore2 = allAnswers[8].score; // Q9
    // 병해충+자재 평균값이 높고 초보자가 아니면 A
    const adaptabilityCode = (adaptabilityScore1 >= 0.5 && adaptabilityScore2 === 1) ? 'A' : 'N';

    // 4. 시장성/목적성 (P/H) - Q10,Q11,Q12 (2개 이상 "예" 시 P)
    const profitScore = allAnswers.slice(9, 12).reduce((sum, answer) => sum + answer.score, 0);
    const profitCode = profitScore >= 2 ? 'P' : 'H';

    // 최종 코드 조합: N + H + L + F 형태로 조합
    const finalCode = adaptabilityCode + profitCode + careCode + environmentCode;
    
    setResult({
      code: finalCode,
      type: types[finalCode] || { name: '알 수 없는 유형', description: '', emoji: '🌱', crops: ['기본 추천 작물'] }
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

  if (isCompleted && result) {
    return (
      <div className="nbti-test">
        <div className="result-container">
          <div className="result-header">
            <h1>🎉 N(農)BTI 결과</h1>
            <div className="result-code">{result.code}</div>
            <div className="result-emoji">{result.type.emoji}</div>
            <h2>{result.type.name}</h2>
            <p className="result-description">{result.type.description}</p>
          </div>

          <div className="recommended-crops">
            <h3>🌱 추천 작물</h3>
            <div className="crops-list">
              {result.type.crops.map((crop, index) => (
                <span key={index} className="crop-tag">{crop}</span>
              ))}
            </div>
          </div>

          <div className="result-actions">
            <button className="retry-button" onClick={resetTest}>
              다시 테스트하기
            </button>
            <button className="share-button" onClick={() => {
              navigator.share?.({
                title: 'N(農)BTI 테스트 결과',
                text: `나의 텃밭 성향은 "${result.type.name}"입니다!`,
                url: window.location.href
              }) || alert('결과가 복사되었습니다!');
            }}>
              결과 공유하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nbti-test">
      <div className="test-container">
        <div className="test-header">
          {onBack && (
            <button className="back-button" onClick={onBack}>
              ← 돌아가기
            </button>
          )}
          <h1>N(農)BTI 테스트</h1>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{currentQuestion + 1} / {questions.length}</p>
        </div>

        <div className="question-container">
          <div className="question-category">
            {questions[currentQuestion].category}
          </div>
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