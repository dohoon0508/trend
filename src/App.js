import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 상단 헤더 영역 */}
      <header className="custom-header">
        <div className="header-left">
          <span className="logo-tjc">N(農)BTI</span>
        </div>
      </header>

      {/* 메인 질문 영역 */}
      <main className="main-question-tjc">
        <h1>텃밭을 시작할 때<br />나에게 딱 맞는 작물이 뭘까?</h1>
      </main>

      {/* 공유하기 버튼 (우측 하단 고정) */}
      <button className="share-btn-tjc">
        <span className="share-emoji">🎄</span>
        <span>공유하기</span>
      </button>

      {/* 인트로 섹션 */}
      <section className="intro-section">
        <h1 className="main-title">
          <strong>농비티아이</strong>
        </h1>
        <h2 className="subtitle">NongBTI</h2>
        <p className="tagline">질문을 기반으로 한 맞춤형 텃밭 작물 추천 '농(農)'</p>
      </section>

      {/* 메인 질문 섹션 */}
      <section className="main-question">
        <h2 className="question-title">
          텃밭을 시작할 때<br />
          나는 어떤 작물을 키우면 좋을까요?
        </h2>
        <div className="garden-types">
          <h3>16가지 작물 유형과 함께<br />나의 텃밭 성향에 대해 알아보세요 🌱</h3>
        </div>
      </section>

      {/* 작물 카드 섹션 */}
      <section className="crop-cards">
        <div className="card-grid">
          <div className="crop-card">
            <div className="card-icon">🥬</div>
            <h4>채소형</h4>
            <p>신선한 채소를 선호하는 타입</p>
          </div>
          <div className="crop-card">
            <div className="card-icon">🍅</div>
            <h4>과채형</h4>
            <p>과일과 채소를 함께 키우는 타입</p>
          </div>
          <div className="crop-card">
            <div className="card-icon">🌿</div>
            <h4>허브형</h4>
            <p>향신료와 허브를 즐기는 타입</p>
          </div>
          <div className="crop-card">
            <div className="card-icon">🌸</div>
            <h4>꽃형</h4>
            <p>아름다운 꽃을 가꾸는 타입</p>
          </div>
        </div>
      </section>

      {/* 나는 어떤 작물 유형일지 섹션 */}
      <section className="type-question">
        <h3>나는 어떤 작물 유형일지<br />궁금하다면?</h3>
        <button className="cta-button">
          🥕 작물 추천 검사 응시하러 가기
        </button>
      </section>

      {/* 특징 섹션 */}
      <section className="features">
        <h3>상대를 알기 전,<br />가장 먼저 알아야 할 것! 바로 '나'예요</h3>
        
        <div className="feature-grid">
          <div className="feature-item">
            <h4>텃밭을 대할 때<br />나의 가장 큰 장점은<br />무엇일까요?</h4>
            <div className="feature-tag">#나의 매력 5가지</div>
            <div className="feature-image">🌱 매력 포인트 이미지</div>
          </div>
          
          <div className="feature-item">
            <h4>나는 작물들과<br />어떤 방식으로<br />관계를 맺고 있을까요?</h4>
            <div className="feature-tag">#관계 유형 #추천 유형</div>
            <div className="feature-image">🌿 유형 이미지</div>
          </div>
          
          <div className="feature-item">
            <h4>농업 전문가들의<br />과학적인 작물 분석으로<br />나를 더 깊이 들여다보세요</h4>
            <div className="feature-tag">#AI 분석 #맞춤형 추천</div>
            <div className="feature-image">🔬 분석 이미지</div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="final-cta">
        <h3>진짜 나를 알고 진짜 작물을 찾아가는 여정<br />지금 바로 농비티아이에서 시작하세요</h3>
        <button className="start-button">
          🚀 지금 시작하기
        </button>
      </section>

      {/* 하단 CTA */}
      <section className="bottom-cta">
        <p><strong>텃밭을 시작할 때의 내 모습, 16가지 작물 유형으로 확인해 보세요!</strong><br />
        나를 알고 진짜 작물을 찾는 여정, 지금 농비티아이에서 시작해 보세요.</p>
        <div className="bottom-buttons">
          <button className="test-button">검사 응시하기</button>
          <button className="intro-button">농비티아이 바로가기</button>
        </div>
      </section>
    </div>
  );
}

export default App; 