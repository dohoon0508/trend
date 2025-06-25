import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // 스크롤 애니메이션을 위한 Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // 하위 요소들도 animate-in 클래스 추가
          const childElements = entry.target.querySelectorAll('.scroll-animate-delay-1, .scroll-animate-delay-2, .scroll-animate-delay-3, .scroll-animate-delay-4');
          childElements.forEach(child => child.classList.add('animate-in'));
        }
      });
    }, observerOptions);

    // 모든 scroll-animate 클래스 요소를 관찰
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  return (
    <div className="App">
      {/* 상단 헤더 영역 */}
      <header className="custom-header">
        <div className="header-left">
          <span className="logo-tjc">N(農)BTI</span>
        </div>
      </header>

      {/* 메인 히어로 섹션 - 풀스크린 이미지와 텍스트 오버레이 */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src={`${process.env.PUBLIC_URL}/images/main1.jpg`}
            alt="농비티아이 메인 이미지" 
            className="hero-image"
            onError={(e) => {
              e.target.style.display = 'none';
              console.log('이미지 로드 실패:', e.target.src);
            }}
            onLoad={() => console.log('이미지 로드 성공')}
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            텃밭을 시작할 때<br />
            나에게 딱 맞는 작물은?
          </h1>
          <div className="hero-subtitle">
            <h2 className="brand-name">N(農)BTI</h2>
            <p className="brand-description">농비티아이</p>
            <p className="tagline">질문을 기반으로 한 맞춤형 텃밭 작물 추천 '농(農)'비티아이</p>
          </div>
        </div>
      </section>

      {/* 공유하기 버튼 (우측 하단 고정) */}
      <button className="share-btn-tjc">
        <span className="share-emoji">🎄</span>
        <span>공유하기</span>
      </button>

      {/* 메인 질문 섹션 */}
      <section className="main-question scroll-animate">
        <h2 className="question-title">
          텃밭을 시작할 때<br />
          나는 어떤 작물을 키우면 좋을까요?
        </h2>
        <div className="garden-types">
          <h3>16가지 작물 유형과 함께<br />나의 텃밭 성향에 대해 알아보세요 🌱</h3>
        </div>
      </section>

      {/* 작물 카드 섹션 */}
      <section className="crop-cards scroll-animate">
        <div className="section-header">
          <h2 className="section-title">🌱 16가지 작물 유형</h2>
          <p className="section-subtitle">나만의 텃밭 성향을 찾아보세요</p>
        </div>
        
        <div className="card-grid">
          <div className="crop-card scroll-animate-delay-1">
            <div className="card-icon">🥬</div>
            <h4>채소형</h4>
            <p>신선한 채소를 선호하는 타입</p>
          </div>
          
          <div className="crop-card scroll-animate-delay-2">
            <div className="card-icon">🍅</div>
            <h4>과채형</h4>
            <p>과일과 채소를 함께 키우는 타입</p>
          </div>
          
          <div className="crop-card scroll-animate-delay-3">
            <div className="card-icon">🌿</div>
            <h4>허브형</h4>
            <p>향신료와 허브를 즐기는 타입</p>
          </div>
          
          <div className="crop-card scroll-animate-delay-4">
            <div className="card-icon">🌸</div>
            <h4>꽃형</h4>
            <p>아름다운 꽃을 가꾸는 타입</p>
          </div>
        </div>
      </section>

      {/* 4가지 농업 요소 태그 섹션 */}
      <section className="agriculture-tags scroll-animate">
        <div className="section-header">
          <h2 className="section-title">🌱 4가지 요소 → 성격 중심 코드</h2>
          <p className="section-subtitle">농업 전문가들이 개발한 과학적 분석법</p>
        </div>
        
        <div className="tags-container">
          <div className="tag-row scroll-animate-delay-1">
            <div className="agriculture-tag adaptability">
              <span className="tag-english">Novice</span>
              <span className="tag-korean">초보자형</span>
              <span className="tag-center">적응력</span>
              <span className="tag-right">숙련자형</span>
              <span className="tag-right-en">Adaptable</span>
            </div>
          </div>
          
          <div className="tag-row scroll-animate-delay-2">
            <div className="agriculture-tag profitability">
              <span className="tag-english">Hobby</span>
              <span className="tag-korean">취미형</span>
              <span className="tag-center">상품성</span>
              <span className="tag-right">수익형</span>
              <span className="tag-right-en">Profit</span>
            </div>
          </div>
          
          <div className="tag-row scroll-animate-delay-3">
            <div className="agriculture-tag frequency">
              <span className="tag-english">Busy</span>
              <span className="tag-korean">시간부족형</span>
              <span className="tag-center">빈도성</span>
              <span className="tag-right">관리세심형</span>
              <span className="tag-right-en">Care</span>
            </div>
          </div>
          
          <div className="tag-row scroll-animate-delay-4">
            <div className="agriculture-tag environment">
              <span className="tag-english">Limited</span>
              <span className="tag-korean">환경제한형</span>
              <span className="tag-center">환경적합</span>
              <span className="tag-right">환경다양형</span>
              <span className="tag-right-en">Flexible</span>
            </div>
          </div>
        </div>
      </section>

      {/* 나는 어떤 작물 유형일지 섹션 */}
      <section className="type-question scroll-animate">
        <div className="cta-container">
          <div className="cta-icon-section">
            <div className="cta-main-icon">🌱</div>
            <div className="cta-sub-icons">
              <span className="cta-mini-icon">🥕</span>
              <span className="cta-mini-icon">🍅</span>
              <span className="cta-mini-icon">🌿</span>
            </div>
          </div>
          <div className="cta-content">
            <h3>나는 어떤 작물 유형일지<br />궁금하다면?</h3>
            <button className="cta-button scroll-animate-delay-1">
              <span className="button-icon">🥕</span>
              <span className="button-text">N(農)BTI 검사 응시하러 가기</span>
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="features scroll-animate">
        <div className="section-header">
          <h2 className="section-title">상대를 알기 전, 가장 먼저 알아야 할 것! 바로 '나'예요</h2>
        </div>
        
        <div className="feature-grid">
          <div className="feature-item scroll-animate-delay-1">
            <div className="feature-icon">🌱</div>
            <h4>텃밭을 대할 때 나의 가장 큰 장점은 무엇일까요?</h4>
            <div className="feature-tag">#나의 매력 5가지</div>
          </div>
          
          <div className="feature-item scroll-animate-delay-2">
            <div className="feature-icon">🌿</div>
            <h4>나는 작물들과 어떤 방식으로 관계를 맺고 있을까요?</h4>
            <div className="feature-tag">#관계 유형 #추천 유형</div>
          </div>
          
          <div className="feature-item scroll-animate-delay-3">
            <div className="feature-icon">🔬</div>
            <h4>농업 전문가들의 과학적인 작물 분석으로 나를 더 깊이 들여다보세요</h4>
            <div className="feature-tag">#AI 분석 #맞춤형 추천</div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="final-cta scroll-animate">
        <h3>진짜 나를 알고 진짜 작물을 찾아가는 여정<br />지금 바로 N(農)BTI에서 시작하세요</h3>
        <button className="start-button scroll-animate-delay-1">
          🚀 지금 시작하기
        </button>
      </section>

      {/* 하단 CTA */}
      <section className="bottom-cta scroll-animate">
        <p><strong>텃밭을 시작할 때의 내 모습, 16가지 작물 유형으로 확인해 보세요!</strong><br />
        나를 알고 진짜 작물을 찾는 여정, 지금 N(農)BTI에서 시작해 보세요.</p>
        <div className="bottom-buttons">
          <button className="test-button scroll-animate-delay-1">검사 응시하기</button>
          <button className="intro-button scroll-animate-delay-2">N(農)BTI 바로가기</button>
        </div>
      </section>
    </div>
  );
}

export default App; 