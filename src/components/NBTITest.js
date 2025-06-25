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

const NBTITest = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);

  // 질문 데이터
  const questions = [
    // 1. 적응력 (Adaptable vs Novice) - A/N
    {
      id: 1,
      category: "🌱 적응력",
      question: "다양한 환경에서 작물을 재배해본 경험이 있나요?",
      options: [
        { text: "아니요, 처음 시도해보는 거예요", value: "novice" },
        { text: "네, 다양한 상황에서 키워본 적 있어요", value: "adaptable" }
      ],
      description: "초보자형(N) vs 숙련자형(A)"
    },
    {
      id: 2,
      category: "🌱 적응력",
      question: "작물 키우기를 어떻게 생각하시나요?",
      options: [
        { text: "최대한 간단했으면 좋겠어요", value: "novice" },
        { text: "어렵더라도 직접 관리하는 걸 즐깁니다", value: "adaptable" }
      ],
      description: "관리 복잡도에 대한 태도"
    },
    {
      id: 3,
      category: "🌱 적응력",
      question: "작물에 문제가 생기면?",
      options: [
        { text: "잘 모르겠고 도움을 받아야 할 것 같아요", value: "novice" },
        { text: "스스로 해결하려고 찾아보거나 시도해요", value: "adaptable" }
      ],
      description: "문제 해결 의지"
    },
    // 2. 상품성 (Hobby vs Profit) - H/P
    {
      id: 4,
      category: "💝 상품성",
      question: "작물을 키우는 이유는 무엇인가요?",
      options: [
        { text: "힐링과 즐거움을 위해서예요", value: "hobby" },
        { text: "수확해서 판매하거나 경제적 이익이 목적이에요", value: "profit" }
      ],
      description: "취미형(H) vs 수익형(P)"
    },
    {
      id: 5,
      category: "💝 상품성",
      question: "작물 선택 기준은?",
      options: [
        { text: "예쁘고 재미있어 보이는 작물", value: "hobby" },
        { text: "많이 수확 가능하고 경제성 있는 작물", value: "profit" }
      ],
      description: "작물 선택 우선순위"
    },
    {
      id: 6,
      category: "💝 상품성",
      question: "수익이나 생산량에 대해?",
      options: [
        { text: "중요하지 않아요", value: "hobby" },
        { text: "매우 중요해요, 손익계산도 합니다", value: "profit" }
      ],
      description: "경제적 관점"
    },
    // 3. 빈도성 (Busy(많음) vs Careless(부족)) - B/C
    {
      id: 7,
      category: "⏰ 빈도성",
      question: "얼마나 자주 텃밭을 관리할 수 있나요?",
      options: [
        { text: "매일 혹은 자주 가꿉니다", value: "busy" },
        { text: "가끔, 시간이 날 때만 관리할 수 있어요", value: "careless" }
      ],
      description: "시간 많음/세심관리형(B) vs 시간 부족형/간단관리형(C)"
    },
    {
      id: 8,
      category: "⏰ 빈도성",
      question: "작물에 관심을 쏟는 정도는?",
      options: [
        { text: "물 주기, 성장 확인, 병해 관리까지 정성껏 해요", value: "busy" },
        { text: "자동화나 방치 가능 작물을 선호해요", value: "careless" }
      ],
      description: "관리 정성도"
    },
    {
      id: 9,
      category: "⏰ 빈도성",
      question: "텃밭 활동을 어떻게 생각하시나요?",
      options: [
        { text: "주기적인 취미 활동으로 삼고 있어요", value: "busy" },
        { text: "너무 자주 하긴 어려울 것 같아요", value: "careless" }
      ],
      description: "텃밭 활동 빈도"
    }
  ];

  // 유형별 데이터 (8가지)
  const types = {
    'AHB': { 
      name: '세심한 감성 마스터', 
      description: '숙련자 + 감성 위주 + 시간 많음', 
      emoji: '🌾', 
      crops: ['벼', '허브정원', '꽃채소', '전통작물'],
      characteristics: ['정성 관리', '감성적 접근', '시간 투자'],
      tips: '시간을 충분히 투자해서 아름다운 정원을 만들어보세요!',
      detailDescription: '풍부한 경험을 바탕으로 작물을 세심하게 돌보며, 감성과 미학을 텃밭에 반영하는 유형입니다. 힐링은 물론, 작물과의 교감 그 자체를 중요하게 생각하고, 매일의 변화를 관찰하는 것을 즐깁니다.',
      adaptabilityScore: 96,
      hobbyScore: 85,
      busyScore: 90
    },
    'AHC': { 
      name: '감성형 도시 마스터', 
      description: '숙련자 + 감성 위주 + 시간 없음', 
      emoji: '🍃', 
      crops: ['매실', '허브류', '미니정원', '관상용 채소'],
      characteristics: ['효율적 감성', '도시형 재배', '간편 관리'],
      tips: '바쁜 일상 속에서도 감성을 놓치지 마세요!',
      detailDescription: '감성을 중요시하지만, 바쁜 일상 속에서 최소한의 시간으로 작물을 즐기는 고수 유형입니다. 작은 공간에서도 감성적 성취를 추구하며, 자동화나 스마트팜 기술을 효과적으로 활용할 줄 압니다.',
      adaptabilityScore: 92,
      hobbyScore: 78,
      busyScore: 25
    },
    'APB': { 
      name: '실속형 수익 마스터', 
      description: '숙련자 + 수익 위주 + 시간 많음', 
      emoji: '🌿', 
      crops: ['아스파라거스', '고급채소', '특용작물', '가공용 작물'],
      characteristics: ['고품질 생산', '수익 최적화', '전문 재배'],
      tips: '전문적인 재배로 최고의 수익을 창출해보세요!',
      detailDescription: '수익을 내기 위한 철저한 계획과 노하우를 갖춘 유형입니다. 고수익 작물 중심으로 재배하면서도, 품질과 생산성을 모두 고려하며, 작물에 대한 이해도와 관리 능력이 뛰어납니다.',
      adaptabilityScore: 94,
      hobbyScore: 22,
      busyScore: 88
    },
    'APC': { 
      name: '전략형 수익 실천가', 
      description: '숙련자 + 수익 위주 + 시간 없음', 
      emoji: '🍓', 
      crops: ['딸기', '방울토마토', '시설재배', '고수익 작물'],
      characteristics: ['효율적 수익', '전략적 선택', '시간 최적화'],
      tips: '효율적인 전략으로 단시간에 최대 수익을 노려보세요!',
      detailDescription: '시간은 부족하지만, 목표는 확실한 유형입니다. 빠르게 성장하는 작물, 시장성 있는 품목을 선호하며, 철저한 관리보다는 효율적 수익 창출에 집중합니다. 자동화, 위탁 재배 등 전략적 운영에 강점을 가집니다.',
      adaptabilityScore: 90,
      hobbyScore: 18,
      busyScore: 28
    },
    'NHB': { 
      name: '힐링형 감성 초보자', 
      description: '초보자 + 감성 위주 + 시간 많음', 
      emoji: '🥬', 
      crops: ['무', '배추', '상추', '쌈채소'],
      characteristics: ['여유로운 관리', '힐링 우선', '천천히 배우기'],
      tips: '서두르지 말고 식물과 함께하는 여유로운 시간을 즐겨보세요!',
      detailDescription: '자연 속에서 여유롭게 감성과 힐링을 추구하는 유형입니다. 관리에 시간을 들이는 것을 부담스럽지 않게 여기며, 작물을 돌보는 과정에서 안정감과 정서적 만족을 얻습니다. 수익보다는 \'즐거움\'이 우선이며, 텃밭은 쉼터이자 취미 공간입니다.',
      adaptabilityScore: 35,
      hobbyScore: 82,
      busyScore: 85
    },
    'NHC': { 
      name: '감성형 간편 입문자', 
      description: '초보자 + 감성 위주 + 시간 없음', 
      emoji: '🍆', 
      crops: ['가지', '방울토마토', '허브', '간단한 채소'],
      characteristics: ['쉬운 관리', '감성적 만족', '입문자 친화'],
      tips: '간단한 작물로 시작해서 재배의 즐거움을 느껴보세요!',
      detailDescription: '작물 재배에 로망이 있지만, 현실적인 시간 여유가 부족한 유형입니다. 간단하게 키울 수 있는 예쁜 작물이나 힐링 감성 중심의 재배를 선호하며, 짧은 시간 안에 즐거움을 얻을 수 있는 구조를 좋아합니다.',
      adaptabilityScore: 32,
      hobbyScore: 76,
      busyScore: 30
    },
    'NPB': { 
      name: '실속형 초보 농부', 
      description: '초보자 + 수익 위주 + 시간 많음', 
      emoji: '🌾', 
      crops: ['부추', '대파', '시금치', '실용 채소'],
      characteristics: ['실용적 선택', '경제성 중시', '꾸준한 학습'],
      tips: '실용적인 채소로 시작해서 차근차근 수익을 늘려보세요!',
      detailDescription: '수익성과 효율성도 중요하지만, 작물 관리에는 어느 정도 시간을 투자할 준비가 되어 있는 유형입니다. 현실적 판단력을 바탕으로 안정적이고 실용적인 재배 방식을 따르며, 장기적으로 텃밭을 확장해보고 싶어합니다.',
      adaptabilityScore: 38,
      hobbyScore: 24,
      busyScore: 80
    },
    'NPC': { 
      name: '도전형 초보 경작자', 
      description: '초보자 + 수익 위주 + 시간 없음', 
      emoji: '🍓', 
      crops: ['딸기', '방울토마토', '쉬운 고수익 작물', '간편 재배'],
      characteristics: ['빠른 수익', '도전 정신', '효율 추구'],
      tips: '간단하면서도 수익성 있는 작물로 도전해보세요!',
      detailDescription: '텃밭을 수익의 출발점으로 바라보며, 간편하게 관리 가능한 수익 작물 위주로 키우려는 경향이 있습니다. 재배 경험은 부족하지만, ROI(수익률)에 대한 관심은 높으며, 기술적 솔루션이나 자동화를 선호합니다.',
      adaptabilityScore: 34,
      hobbyScore: 20,
      busyScore: 25
    }
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
    console.log('모든 답변:', allAnswers.map(answer => ({ text: answer.text, value: answer.value })));
    
    // 1. 적응력 (N/A) - Q1,Q2,Q3 중 다수결
    const adaptabilityAnswers = allAnswers.slice(0, 3);
    const adaptabilityCount = {
      novice: adaptabilityAnswers.filter(answer => answer.value === 'novice').length,
      adaptable: adaptabilityAnswers.filter(answer => answer.value === 'adaptable').length
    };
    const adaptabilityCode = adaptabilityCount.adaptable >= 2 ? 'A' : 'N';
    console.log('적응력 카운트:', adaptabilityCount, '코드:', adaptabilityCode);

    // 2. 상품성 (H/P) - Q4,Q5,Q6 중 다수결
    const profitAnswers = allAnswers.slice(3, 6);
    const profitCount = {
      hobby: profitAnswers.filter(answer => answer.value === 'hobby').length,
      profit: profitAnswers.filter(answer => answer.value === 'profit').length
    };
    const profitCode = profitCount.profit >= 2 ? 'P' : 'H';
    console.log('상품성 카운트:', profitCount, '코드:', profitCode);

    // 3. 빈도성 (B/C) - Q7,Q8,Q9 중 다수결
    const careAnswers = allAnswers.slice(6, 9);
    const careCount = {
      busy: careAnswers.filter(answer => answer.value === 'busy').length,
      careless: careAnswers.filter(answer => answer.value === 'careless').length
    };
    const careCode = careCount.busy >= 2 ? 'B' : 'C';
    console.log('빈도성 카운트:', careCount, '코드:', careCode);

    // 최종 코드 조합 (3자리)
    const finalCode = adaptabilityCode + profitCode + careCode;
    console.log('최종 코드:', finalCode);
    console.log('유형 존재 여부:', types[finalCode] ? '존재' : '없음');
    
    setResult({
      code: finalCode,
      type: types[finalCode] || { 
        name: '알 수 없는 유형', 
        description: `코드: ${finalCode}`, 
        emoji: '🌱', 
        crops: ['기본 추천 작물'], 
        characteristics: ['디버깅 필요'], 
        tips: '코드가 매칭되지 않습니다.' 
      }
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
  const ResultCard = ({ code, type, onRetry }) => (
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
        <div className="recommended-crops">
          <h3>🌱 추천 작물</h3>
          <div className="crops-list">
            {type.crops.map((crop, index) => (
              <span key={index} className="crop-tag">{crop}</span>
            ))}
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
          </div>
        </div>
        <div className="result-actions">
          <button className="retry-button" onClick={onRetry}>다시 테스트하기</button>
          <button className="share-button" onClick={() => {
            navigator.share?.({
              title: 'N(農)BTI 테스트 결과',
              text: `나의 텃밭 성향은 "${type.name}"입니다! ${type.tips}`,
              url: window.location.href
            }) || alert('결과가 복사되었습니다!');
          }}>
            결과 공유하기
          </button>
        </div>
      </div>
    </div>
  );

  if (isCompleted && result) {
    return <ResultCard code={result.code} type={result.type} onRetry={resetTest} />;
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