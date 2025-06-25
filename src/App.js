import React, { useEffect, useState } from 'react';
import './App.css';
import NBTITest from './components/NBTITest';
import ResultSlider from './components/ResultSlider';

function App() {
  const [currentPage, setCurrentPage] = useState('intro'); // 'intro' or 'test'

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
  }, [currentPage]);

  // 테스트 페이지를 보여주는 경우
  if (currentPage === 'test') {
    return <NBTITest onBack={() => setCurrentPage('intro')} />;
  }
  return (
    <div className="App">
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

      {/* 4가지 농업 요소 태그 섹션 */}
      <section className="agriculture-tags scroll-animate">
        <div className="section-header">
          <h2 className="section-title">🌱 3가지 요소 → 성격 중심 코드</h2>
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
            <div className="agriculture-tag environment">
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
              <span className="tag-korean">시간많음형</span>
              <span className="tag-center">빈도성</span>
              <span className="tag-right">시간부족형</span>
              <span className="tag-right-en">Careless</span>
            </div>
          </div>
        </div>
      </section>

      {/* 결과 화면 갤러리 섹션 */}
      <section className="result-gallery scroll-animate">
        <ResultSlider />
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
            <button 
              className="cta-button scroll-animate-delay-1"
              onClick={() => setCurrentPage('test')}
            >
              <span className="button-icon">🥕</span>
              <span className="button-text">N(農)BTI 검사 응시하러 가기</span>
              <span className="button-arrow">→</span>
            </button>
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