import React, { useState } from 'react';
import './NBTITest.css';

const NBTITest = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);

  // 질문 데이터
  const questions = [
    // 1. 적응력 (Novice vs Adaptable) - N/A
    {
      id: 1,
      category: "🌱 적응력",
      question: "작물 재배 경험이 어느 정도 있으신가요?",
      options: [
        { text: "거의 처음이에요.", value: "novice", score: 0 },
        { text: "몇 번 키워봤고 익숙해요.", value: "adaptable", score: 1 }
      ],
      description: "초보자형(N) vs 숙련자형(A)"
    },
    {
      id: 2,
      category: "🌱 적응력",
      question: "물주기, 가지치기, 병충해 방제 등 복잡한 관리에 대해 어떻게 생각하세요?",
      options: [
        { text: "어려울 것 같고 간단한 게 좋아요.", value: "novice", score: 0 },
        { text: "배우는 건 괜찮고 다양한 관리도 자신 있어요.", value: "adaptable", score: 1 }
      ],
      description: "관리 복잡성에 대한 선호도를 평가합니다"
    },
    {
      id: 3,
      category: "🌱 적응력",
      question: "새로운 작물이나 방법에 도전하는 것을 좋아하시나요?",
      options: [
        { text: "익숙한 방식만 선호해요.", value: "novice", score: 0 },
        { text: "새롭고 다양한 작물 키우는 걸 좋아해요.", value: "adaptable", score: 1 }
      ],
      description: "도전 의지를 확인합니다"
    },
    // 2. 상품성 (Hobby vs Profit) - H/P
    {
      id: 4,
      category: "💰 상품성",
      question: "작물을 수확한 후 어떻게 활용하시나요?",
      options: [
        { text: "가족이나 이웃과 나누고 만족해요.", value: "hobby", score: 0 },
        { text: "판매하거나 가공해서 수익을 내고 싶어요.", value: "profit", score: 1 }
      ],
      description: "취미형(H) vs 수익형(P)"
    },
    {
      id: 5,
      category: "💰 상품성",
      question: "작물을 고를 때 가장 중요하게 생각하는 요소는 무엇인가요?",
      options: [
        { text: "내가 좋아하거나 예쁜 작물이 좋아요.", value: "hobby", score: 0 },
        { text: "시장에서 인기 있거나 가격이 좋은 작물을 고르고 싶어요.", value: "profit", score: 1 }
      ],
      description: "작물 선택 기준을 확인합니다"
    },
    {
      id: 6,
      category: "💰 상품성",
      question: "텃밭 운영에 드는 비용은 어떻게 생각하시나요?",
      options: [
        { text: "비용보단 즐거움이 중요해요.", value: "hobby", score: 0 },
        { text: "비용 대비 수익이 중요하다고 생각해요.", value: "profit", score: 1 }
      ],
      description: "경제적 관점을 측정합니다"
    },
    // 3. 빈도성 (Busy vs Care) - B/C
    {
      id: 7,
      category: "⏰ 빈도성",
      question: "주 1회 이상 정기적으로 시간을 낼 수 있으신가요?",
      options: [
        { text: "바빠서 어렵습니다.", value: "busy", score: 0 },
        { text: "네, 시간 낼 수 있습니다.", value: "care", score: 1 }
      ],
      description: "시간 부족형(B) vs 관리 세심형(C)"
    },
    {
      id: 8,
      category: "⏰ 빈도성",
      question: "작물 상태를 수시로 확인하고 기록하는 것에 대해 어떻게 생각하시나요?",
      options: [
        { text: "번거롭고 어렵게 느껴져요.", value: "busy", score: 0 },
        { text: "흥미롭고 성취감을 느껴요.", value: "care", score: 1 }
      ],
      description: "관리 의지를 확인합니다"
    },
    {
      id: 9,
      category: "⏰ 빈도성",
      question: "병해충이 발생했을 때 직접 관리하시겠어요?",
      options: [
        { text: "어려워 보여서 꺼려져요.", value: "busy", score: 0 },
        { text: "문제를 직접 해결해보고 싶어요.", value: "care", score: 1 }
      ],
      description: "문제 해결 적극성을 측정합니다"
    },
    // 4. 환경적합 (Limited vs Flexible) - L/F
    {
      id: 10,
      category: "🏡 환경적합",
      question: "텃밭을 운영할 공간은 어떤가요?",
      options: [
        { text: "베란다, 실내 등 제한된 공간이에요.", value: "limited", score: 0 },
        { text: "마당이나 옥상처럼 비교적 자유로워요.", value: "flexible", score: 1 }
      ],
      description: "환경제한형(L) vs 환경다양형(F)"
    },
    {
      id: 11,
      category: "🏡 환경적합",
      question: "햇빛과 통풍 조건은 어떤가요?",
      options: [
        { text: "햇빛이 부족하거나 통풍이 어려운 편이에요.", value: "limited", score: 0 },
        { text: "햇빛이 잘 들고 통풍도 잘 돼요.", value: "flexible", score: 1 }
      ],
      description: "재배 환경 조건을 확인합니다"
    },
    {
      id: 12,
      category: "🏡 환경적합",
      question: "물이나 흙을 다루는 데 제약이 있으신가요?",
      options: [
        { text: "물빠짐이 안 좋거나 흙 관리가 어려워요.", value: "limited", score: 0 },
        { text: "물 공급과 토양 조건이 비교적 자유로워요.", value: "flexible", score: 1 }
      ],
      description: "물리적 제약 조건을 평가합니다"
    }
  ];

  // 유형별 데이터
  const types = {
    'NHLF': { 
      name: '바쁜 도시 텃밭러', 
      description: '초보자 + 감성 위주 + 시간 없음 + 유연한 환경', 
      emoji: '🏙️', 
      crops: ['상추', '바질', '체리토마토', '루꼴라'],
      characteristics: ['간편 관리', '빠른 성장', '도시형 재배'],
      tips: '물만 주면 자라는 간단한 작물부터 시작해보세요!'
    },
    'NHLC': { 
      name: '소극적 자연애호가', 
      description: '초보자 + 감성 위주 + 시간 없음 + 제한된 환경', 
      emoji: '🌿', 
      crops: ['새싹채소', '허브', '미니화분채소', '콩나물'],
      characteristics: ['실내 재배', '작은 공간', '향기로운 식물'],
      tips: '베란다나 창가에서도 충분히 키울 수 있어요!'
    },
    'NHBF': { 
      name: '힐링 초보', 
      description: '초보자 + 감성 위주 + 시간 많음 + 유연한 환경', 
      emoji: '🧘', 
      crops: ['라벤더', '로즈마리', '민트', '캐모마일'],
      characteristics: ['치유 효과', '향기 요법', '정원 가꾸기'],
      tips: '식물과 함께하는 힐링 시간을 만들어보세요!'
    },
    'NHBC': { 
      name: '일상 속 미니농부', 
      description: '초보자 + 감성 위주 + 시간 많음 + 제한된 환경', 
      emoji: '🌱', 
      crops: ['방울토마토', '상추', '오이', '쌈채소'],
      characteristics: ['매일 관찰', '작은 수확', '가족 먹거리'],
      tips: '매일 조금씩 자라는 모습을 관찰하는 재미를 느껴보세요!'
    },
    'NPLF': { 
      name: '현실형 농부', 
      description: '초보자 + 수익 중심 + 시간 없음 + 유연한 환경', 
      emoji: '💪', 
      crops: ['시금치', '무', '배추', '대파'],
      characteristics: ['실용적', '시장성', '대량 재배'],
      tips: '판매 가능한 실용적인 채소부터 시작해보세요!'
    },
    'NPLC': { 
      name: '도전형 텃밭러', 
      description: '초보자 + 수익 중심 + 시간 없음 + 제한된 환경', 
      emoji: '🚀', 
      crops: ['감자', '양파', '당근', '고구마'],
      characteristics: ['도전 정신', '효율성', '저장성'],
      tips: '작은 공간에서도 수익을 낼 수 있는 뿌리채소에 도전해보세요!'
    },
    'NPBF': { 
      name: '실속파 초보', 
      description: '초보자 + 수익 중심 + 시간 많음 + 유연한 환경', 
      emoji: '📈', 
      crops: ['고추', '가지', '토마토', '오크라'],
      characteristics: ['경제성', '수확량', '지속 생산'],
      tips: '한 번 심으면 오래 수확할 수 있는 작물이 좋아요!'
    },
    'NPBC': { 
      name: '관리 최소 수익러', 
      description: '초보자 + 수익 중심 + 시간 많음 + 제한된 환경', 
      emoji: '💰', 
      crops: ['콩', '호박', '옥수수', '들깨'],
      characteristics: ['방치 재배', '단위당 수익', '저관리'],
      tips: '심어놓으면 알아서 자라는 강한 작물을 선택하세요!'
    },
    'AHLF': { 
      name: '감성 텃밭 마스터', 
      description: '숙련자 + 감성 위주 + 시간 없음 + 유연한 환경', 
      emoji: '🎨', 
      crops: ['허브믹스', '에디블플라워', '베이비채소', '마이크로그린'],
      characteristics: ['미적 감각', '요리 활용', '창의성'],
      tips: '요리에 포인트가 되는 특별한 식재료를 키워보세요!'
    },
    'AHLC': { 
      name: '공간 제약 정원사', 
      description: '숙련자 + 감성 위주 + 시간 없음 + 제한된 환경', 
      emoji: '🏡', 
      crops: ['미니토마토', '쌈채소', '새싹채소', '허브류'],
      characteristics: ['공간 효율', '수직 재배', '컴팩트'],
      tips: '한정된 공간을 최대한 활용할 수 있는 재배법을 시도해보세요!'
    },
    'AHBF': { 
      name: '세심한 힐링 마니아', 
      description: '숙련자 + 감성 위주 + 시간 많음 + 유연한 환경', 
      emoji: '🌸', 
      crops: ['장미', '라벤더', '허브정원', '약용식물'],
      characteristics: ['정성 관리', '치유 효과', '자연 친화'],
      tips: '시간을 충분히 투자해서 완벽한 정원을 만들어보세요!'
    },
    'AHBC': { 
      name: '일상 속 관리형 마스터', 
      description: '숙련자 + 감성 위주 + 시간 많음 + 제한된 환경', 
      emoji: '👨‍🌾', 
      crops: ['토종채소', '쌈채소', '허브', '전통작물'],
      characteristics: ['세심한 관리', '전통성', '품질 중시'],
      tips: '정성스럽게 키운 우리 고유의 맛을 경험해보세요!'
    },
    'APLF': { 
      name: '수익형 마스터', 
      description: '숙련자 + 수익 중심 + 시간 없음 + 유연한 환경', 
      emoji: '💼', 
      crops: ['방울토마토', '시설채소', '수경재배', '버섯류'],
      characteristics: ['고수익', '효율성', '기술 활용'],
      tips: '최신 농업 기술을 활용해서 고수익을 노려보세요!'
    },
    'APLC': { 
      name: '전문가형 텃밭 실천가', 
      description: '숙련자 + 수익 중심 + 시간 없음 + 제한된 환경', 
      emoji: '🏆', 
      crops: ['고부가가치채소', '특용작물', '계절채소', '기능성채소'],
      characteristics: ['전문성', '차별화', '프리미엄'],
      tips: '남들이 하지 않는 특별한 작물로 틈새시장을 공략해보세요!'
    },
    'APBF': { 
      name: '세심한 수익농부', 
      description: '숙련자 + 수익 중심 + 시간 많음 + 유연한 환경', 
      emoji: '🌟', 
      crops: ['유기농채소', '희귀채소', '프리미엄작물', '수출용채소'],
      characteristics: ['품질 최우선', '유기농', '브랜딩'],
      tips: '최고 품질의 프리미엄 농산물로 브랜드를 만들어보세요!'
    },
    'APBC': { 
      name: '전문 텃밭 경영자', 
      description: '숙련자 + 수익 중심 + 시간 많음 + 제한된 환경', 
      emoji: '👑', 
      crops: ['고수익작물', '계약재배', '브랜드채소', '가공용작물'],
      characteristics: ['경영 마인드', '계약 재배', '안정성'],
      tips: '안정적인 판로를 확보한 후 계획적으로 재배해보세요!'
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
    // 1. 적응력 (N/A) - Q1,Q2,Q3 (2개 이상 숙련자형 답변 시 A)
    const adaptabilityScore = allAnswers.slice(0, 3).reduce((sum, answer) => sum + answer.score, 0);
    const adaptabilityCode = adaptabilityScore >= 2 ? 'A' : 'N';

    // 2. 상품성 (H/P) - Q4,Q5,Q6 (2개 이상 수익형 답변 시 P)
    const profitScore = allAnswers.slice(3, 6).reduce((sum, answer) => sum + answer.score, 0);
    const profitCode = profitScore >= 2 ? 'P' : 'H';

    // 3. 빈도성 (B/C) - Q7,Q8,Q9 (2개 이상 관리형 답변 시 C)
    const careScore = allAnswers.slice(6, 9).reduce((sum, answer) => sum + answer.score, 0);
    const careCode = careScore >= 2 ? 'C' : 'B';

    // 4. 환경적합 (L/F) - Q10,Q11,Q12 (2개 이상 유연형 답변 시 F)
    const environmentScore = allAnswers.slice(9, 12).reduce((sum, answer) => sum + answer.score, 0);
    const environmentCode = environmentScore >= 2 ? 'F' : 'L';

    // 최종 코드 조합: A + H + B + L 형태로 조합
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

        <div className="result-container">
          <div className="result-header">
            <h1 
              onClick={() => window.location.reload()} 
              style={{ cursor: 'pointer' }}
              title="홈으로 돌아가기"
            >
              🎉 N(農)BTI 결과
            </h1>
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

          {result.type.characteristics && (
            <div className="characteristics-section">
              <h3>✨ 당신의 텃밭 특성</h3>
              <div className="characteristics-list">
                {result.type.characteristics.map((characteristic, index) => (
                  <span key={index} className="characteristic-tag">{characteristic}</span>
                ))}
              </div>
            </div>
          )}

          {result.type.tips && (
            <div className="tips-section">
              <h3>💡 맞춤 재배 팁</h3>
              <p className="tips-text">{result.type.tips}</p>
            </div>
          )}

          <div className="result-actions">
            <button className="retry-button" onClick={resetTest}>
              다시 테스트하기
            </button>
            <button className="share-button" onClick={() => {
              navigator.share?.({
                title: 'N(農)BTI 테스트 결과',
                text: `나의 텃밭 성향은 "${result.type.name}"입니다! ${result.type.tips}`,
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