import React, { useEffect, useState } from 'react';
import './App.css';
import NBTITest from './components/NBTITest';
import ResultSlider from './components/ResultSlider';

function App() {
  const [currentPage, setCurrentPage] = useState('intro'); // 'intro' or 'test'
  const [showPopup, setShowPopup] = useState(false);

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
          <h2 className="section-title">🌱 당신의 텃밭 성격, 3가지 키워드로 파헤치다!</h2>
          <p className="section-subtitle">작물 관리 경험, 재배 목적, 투자 가능한 시간에 따라 나뉘는 8가지 유형!<br/>내 성향에 딱 맞는 작물을 만나보세요.</p>
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
            <h3>당신의 성향에 딱 맞는 작물,<br />지금 확인해보세요!</h3>
            <button 
              className="cta-button scroll-animate-delay-1"
              onClick={() => setCurrentPage('test')}
            >
              <span className="button-icon">🥕</span>
              <span className="button-text">N(農)BTI 검사하기</span>
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="bottom-cta scroll-animate">
        <div style={{maxWidth:600, margin:'0 auto', background:'#fff', borderRadius:24, boxShadow:'0 4px 24px rgba(60,180,120,0.08)', padding:'48px 36px 40px 36px', textAlign:'center', position:'relative'}}>
          <div style={{fontSize:'2.6rem', marginBottom:18, color:'#2ecc71', fontWeight:700, letterSpacing:'-2px'}}>
            <span role="img" aria-label="leaf">🌿</span>
            <span style={{margin:'0 10px'}}></span>
            <span role="img" aria-label="pot">🪴</span>
          </div>
          <div style={{fontSize:'1.45rem', fontWeight:700, marginBottom:10, color:'#222', letterSpacing:'-1px'}}>
            벌써 키울 작물을 정하셨다구요?
          </div>
          <div style={{fontSize:'1.18rem', fontWeight:600, marginBottom:18, color:'#228b22'}}>
            이제 텃밭만 찾으면 완벽해요!
          </div>
          <div style={{fontSize:'1.08rem', color:'#444', marginBottom:22, lineHeight:'1.7'}}>
            <span style={{fontWeight:600, color:'#228b22'}}>당신이 선택한 작물</span>에 딱 맞는 <span style={{fontWeight:600, color:'#228b22'}}>주변 텃밭 위치와 조건</span>을 알려드릴게요.<br/>
            가까운 곳에서 <span style={{fontWeight:600, color:'#228b22'}}>지금 바로 텃밭 라이프</span>를 시작해보세요!
          </div>
          <button className="test-button scroll-animate-delay-1" style={{background:'#2ecc71', color:'#fff', fontWeight:700, fontSize:'1.13em', border:'none', borderRadius:12, padding:'16px 0', width:'100%', boxShadow:'0 2px 8px rgba(44,200,120,0.10)', marginTop:8, cursor:'pointer', letterSpacing:'-1px', transition:'background 0.2s'}}
            onClick={() => window.open(`${process.env.PUBLIC_URL}/images/loading.jpeg`, '_blank', 'width=400,height=400')}
          >조건에 맞는 주변 텃밭 둘러보기</button>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="gardening-services scroll-animate" style={{background:'linear-gradient(135deg, #2d5a27 0%, #4a7c59 25%, #6b8e23 50%, #8fbc8f 75%, #98fb98 100%)', padding:'60px 0 80px 0', color:'#222'}}>
        <h2 style={{fontWeight:700, fontSize:'2.1rem', marginBottom:12, color:'#fff', textShadow:'0 2px 4px rgba(0,0,0,0.18)'}}>당신의 텃밭을 더 똑똑하게!</h2>
        <p style={{fontSize:'1.15rem', color:'#fff', marginBottom:40, textShadow:'0 1px 2px rgba(0,0,0,0.10)'}}>지금 바로 이용할 수 있는 맞춤형 재배 서비스로 시작해보세요 🌱</p>
        <div style={{display:'flex', gap:32, justifyContent:'center', flexWrap:'wrap', maxWidth:1200, margin:'0 auto'}}>
          {/* 종자 매칭 서비스 */}
          <div style={{background:'#e6f4ea', borderRadius:18, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', padding:'36px 28px 32px 28px', minWidth:320, maxWidth:360, flex:'1 1 320px', position:'relative', marginBottom:24}}>
            <div style={{fontSize:'2.5rem', marginBottom:18}}>🌱</div>
            <h3 style={{fontWeight:700, fontSize:'1.25rem', marginBottom:10}}>종자 매칭 서비스</h3>
            <p style={{color:'#444', fontSize:'1.05rem', marginBottom:18, minHeight:48}}>텃밭 환경과 재배 목표를 입력하면, 계절별 추천 작물과 종자 정보를 바로 알려드립니다.<br/>실시간 전문가 팁도 함께 제공돼 초보자도 쉽게 시작할 수 있어요.</p>
            <ul style={{textAlign:'left', color:'#222', fontSize:'1.01rem', marginBottom:22, paddingLeft:18}}>
              <li>✔ 맞춤형 종자 추천</li>
              <li>✔ 계절별 작물 가이드</li>
              <li>✔ 실시간 재배 팁 제공</li>
            </ul>
            <button style={{background:'#2ecc71', color:'#fff', border:'none', borderRadius:8, padding:'12px 0', width:'100%', fontWeight:600, fontSize:'1.07em', marginTop:8, cursor:'pointer'}} onClick={()=>setShowPopup('seeds')}>👉 지금 이용하기</button>
          </div>
          {/* 비료 추천 서비스 */}
          <div style={{background:'#e6f4ea', borderRadius:18, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', padding:'36px 28px 32px 28px', minWidth:320, maxWidth:360, flex:'1 1 320px', position:'relative', marginBottom:24}}>
            <div style={{fontSize:'2.5rem', marginBottom:18}}>🧪</div>
            <h3 style={{fontWeight:700, fontSize:'1.25rem', marginBottom:10}}>비료 추천 서비스</h3>
            <p style={{color:'#444', fontSize:'1.05rem', marginBottom:18, minHeight:48}}>토양 상태와 작물 특성을 분석해, 유기농부터 화학 비료까지 적절한 제품을 추천합니다.<br/>작물별 시기별로 정리된 비료 가이드도 함께 제공돼요.</p>
            <ul style={{textAlign:'left', color:'#222', fontSize:'1.01rem', marginBottom:22, paddingLeft:18}}>
              <li>✔ 토양 분석 기반 비료 추천</li>
              <li>✔ 작물 맞춤 비료 가이드</li>
              <li>✔ 시기별 시비 플랜 제공</li>
            </ul>
            <button style={{background:'#2ecc71', color:'#fff', border:'none', borderRadius:8, padding:'12px 0', width:'100%', fontWeight:600, fontSize:'1.07em', marginTop:8, cursor:'pointer'}} onClick={()=>setShowPopup('fertilizer')}>👉 비료 추천 받기</button>
          </div>
          {/* 농약 추천 서비스 */}
          <div style={{background:'#e6f4ea', borderRadius:18, boxShadow:'0 2px 12px rgba(0,0,0,0.06)', padding:'36px 28px 32px 28px', minWidth:320, maxWidth:360, flex:'1 1 320px', position:'relative', marginBottom:24}}>
            <div style={{fontSize:'2.5rem', marginBottom:18}}>🧴</div>
            <h3 style={{fontWeight:700, fontSize:'1.25rem', marginBottom:10}}>농약 추천 서비스</h3>
            <p style={{color:'#444', fontSize:'1.05rem', marginBottom:18, minHeight:48}}>병해충 예방과 관리에 필요한 농약 정보를 맞춤으로 제공합니다.<br/>안전한 사용법과 효과적인 방제 계획까지 한 번에 확인하세요.</p>
            <ul style={{textAlign:'left', color:'#222', fontSize:'1.01rem', marginBottom:22, paddingLeft:18}}>
              <li>✔ 병해충별 농약 추천</li>
              <li>✔ 안전한 사용법 안내</li>
              <li>✔ 효과적인 방제 스케줄 제공</li>
            </ul>
            <button style={{background:'#2ecc71', color:'#fff', border:'none', borderRadius:8, padding:'12px 0', width:'100%', fontWeight:600, fontSize:'1.07em', marginTop:8, cursor:'pointer'}} onClick={()=>setShowPopup('pesticide')}>👉 농약 정보 확인하기</button>
          </div>
        </div>
        {/* 팝업 */}
        {showPopup && (
          <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}} onClick={()=>setShowPopup(false)}>
            <div style={{background:'#fff', borderRadius:20, padding:30, maxWidth:400, width:'90%', textAlign:'center', position:'relative', boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}} onClick={e=>e.stopPropagation()}>
              <button style={{position:'absolute', top:15, right:20, background:'none', border:'none', fontSize:'2rem', color:'#999', cursor:'pointer'}} onClick={()=>setShowPopup(false)}>×</button>
              <div style={{marginBottom:20}}>
                <img src={process.env.PUBLIC_URL + '/images/loading.jpeg'} alt="서비스 준비 중" style={{width:'100%', maxWidth:300, borderRadius:10, boxShadow:'0 4px 15px rgba(0,0,0,0.1)'}} />
              </div>
              <div>
                <h3 style={{color:'#2d5a27', fontSize:'1.3rem', marginBottom:10, fontWeight:600}}>서비스 준비 중입니다</h3>
                <p style={{color:'#666', marginBottom:8, lineHeight:1.5}}>더 나은 서비스를 위해 열심히 준비하고 있습니다.</p>
                <p style={{color:'#666', marginBottom:8, lineHeight:1.5}}>곧 만나뵙겠습니다! 🌱</p>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* 페이지 하단 주석 */}
      <footer style={{width:'100%', marginTop:'8px', padding:'8px 0', textAlign:'center'}}>
        <div style={{color:'#222', fontSize:'0.98rem', marginBottom:'2px'}}>
          팀 trenD
        </div>
        <div style={{color:'#222', fontSize:'0.93rem', marginBottom:'2px'}}>
          팀원: 서혜윤, 송태헌, 조영휘, 황도훈
        </div>
        <div style={{color:'#222', fontSize:'0.93rem'}}>
          사진 출처 : pixabay
        </div>
      </footer>
    </div>
  );
}

export default App; 