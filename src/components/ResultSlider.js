import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './NBTITest.css';

// 16가지 유형 데이터
const types = [
  { code: 'AHBS', emoji: '🧑‍🌾', name: '감성 장인', description: '정성 가득 감성 텃밭러', detailDescription: '숙련자 + 취미형 + 세심 관리 + 선택적 환경', longDescription: '재배 경험이 풍부하며 감성적인 만족을 위해 정성을 다하는 유형입니다. 까다로운 환경에서도 섬세한 손길로 작물을 돌보며, 작물 하나하나에 애정을 담아 정성껏 키우는 것을 즐깁니다.' },
  { code: 'AHBV', emoji: '🎋', name: '따뜻한 장인', description: '손길 가득한 텃밭을 유연하게', detailDescription: '숙련자 + 취미형 + 세심 관리 + 다양한 환경', longDescription: '경험이 많고 감성 중심이지만, 다양한 환경에도 유연하게 대응할 수 있는 유형입니다. 복잡한 재배 조건도 무리 없이 소화하며, 재배 과정 자체에서 위로와 즐거움을 느끼는 장인형입니다.' },
  { code: 'AHCV', emoji: '🌼', name: '감성 실용러', description: '여유롭게, 하지만 간단하게', detailDescription: '숙련자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '감성과 실용성을 모두 챙기며, 다양한 환경과 작물에 도전하는 유형입니다. 시간적 여유가 있지만 간편한 구조를 선호하며, 복잡하지 않지만 지속 가능한 방식으로 감성적 만족을 추구합니다.' },
  { code: 'AHPV', emoji: '🪴', name: '여유 농부', description: '힐링도 수확도 모두 챙기는 균형형', detailDescription: '숙련자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '재배 경험이 많고, 감성과 수익 모두를 중요하게 생각하는 균형 잡힌 유형입니다. 다양한 환경과 긴 재배 주기를 감내하며, 수확의 기쁨과 돌봄의 즐거움을 함께 누립니다.' },
  { code: 'APBS', emoji: '🛠️', name: '수익 장인', description: '수익도 품질도 놓치지 않는 실전 고수', detailDescription: '숙련자 + 수익형 + 세심 관리 + 선택적 환경', longDescription: '수익을 최우선으로 하되, 품질과 환경 조건도 철저히 관리하는 유형입니다. 다년간의 경험과 전문성을 바탕으로 작물을 고르고, 시장성 있는 품종과 최적의 재배법에 능숙합니다.' },
  { code: 'APBV', emoji: '🧃', name: '부지런한 실속러', description: '수익을 위해 꾸준히 정성껏', detailDescription: '숙련자 + 수익형 + 세심 관리 + 다양한 환경', longDescription: '수익을 중시하지만 실용성 있게 접근하며, 유연한 환경 적응력과 부지런함으로 안정적인 성과를 추구하는 유형입니다. 꾸준한 시간 투자를 통해 재배 효율을 높입니다.' },
  { code: 'APCS', emoji: '🔧', name: '효율 추구자', description: '최적의 환경에서 효율 극대화', detailDescription: '숙련자 + 수익형 + 간단 관리 + 선택적 환경', longDescription: '관리와 품질 모두를 중시하며, 가장 적합한 환경과 최적화된 관리 방식으로 수익을 극대화하려는 유형입니다. 정밀한 계획과 체계적인 운영을 선호합니다.' },
  { code: 'APCV', emoji: '📦', name: '전략 농사꾼', description: '생산성과 효율을 최우선으로', detailDescription: '숙련자 + 수익형 + 간단 관리 + 다양한 환경', longDescription: '숙련된 실전형으로 생산성과 효율을 최우선에 두는 유형입니다. 다양한 환경 조건을 능동적으로 활용하며, 수익 극대화를 위한 전략적 작물 선택과 주기 조절에 강합니다.' },
  { code: 'NHBS', emoji: '🐣', name: '텃밭 입문자', description: '감성으로 시작하는 첫 텃밭', detailDescription: '초보자 + 취미형 + 세심 관리 + 선택적 환경', longDescription: '작물 재배가 처음이지만 감성적인 이유로 시작한 유형입니다. 환경 조건은 까다롭고 자주 손이 가지 않는 작물을 선호하며, 짧은 시간 안에 소소한 만족과 성취를 얻고자 합니다.' },
  { code: 'NHBV', emoji: '🍀', name: '자연 입문자', description: '감성으로 시작하지만 환경엔 유연', detailDescription: '초보자 + 취미형 + 세심 관리 + 다양한 환경', longDescription: '작물 재배에 로망이 있지만, 현실적인 시간 여유가 부족한 유형입니다. 간단하게 키울 수 있는 예쁜 작물이나 힐링 감성 중심의 재배를 선호하며, 짧은 시간 안에 즐거움을 얻을 수 있는 구조를 좋아합니다.' },
  { code: 'NHCS', emoji: '📚', name: '감성 입문러', description: '쉽게 시작하는 따뜻한 취미', detailDescription: '초보자 + 취미형 + 간단 관리 + 선택적 환경', longDescription: '초보자이지만 작물 돌보는 재미에 흥미를 느끼는 유형입니다. 환경은 다소 까다롭지만 관리하는 시간을 즐기며, 작물과의 감성적인 유대감을 중요하게 여깁니다.' },
  { code: 'NHCV', emoji: '🧺', name: '힐링 간편러', description: '간단한 돌봄으로도 정서적 만족', detailDescription: '초보자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '초보자이면서도 다양한 환경에 도전하고 손이 자주 가는 작물도 감내하는 유형입니다. 재배 자체의 과정과 애정 표현을 중요하게 여기며, 정성껏 가꾸는 취미형으로 발전 가능성이 높습니다.' },
  { code: 'NPBS', emoji: '💼', name: '실전 입문자', description: '처음이지만 제대로 키워보고 싶어', detailDescription: '초보자 + 수익형 + 세심 관리 + 선택적 환경', longDescription: '수익 창출에 관심이 있지만 작물 재배 경험은 적은 초보자형입니다. 환경 조건은 제한적이고 시간도 부족하지만, 관리 부담이 적은 작물을 통해 경제적 효율을 추구합니다.' },
  { code: 'NPBV', emoji: '📈', name: '부지런한 도전자', description: '초보지만 수익을 위해 노력파', detailDescription: '초보자 + 수익형 + 세심 관리 + 다양한 환경', longDescription: '초보자이면서도 다양한 환경에 강하고, 시간 투자 대비 수익을 기대하며 작물 재배를 시작한 유형입니다. 실용성과 가능성을 중시하는 현실적인 접근을 선호합니다.' },
  { code: 'NPCS', emoji: '🥕', name: '전략 입문자', description: '쉽게 시작하지만 수익도 고려', detailDescription: '초보자 + 수익형 + 간단 관리 + 선택적 환경', longDescription: '초보자이지만 환경 조건이 까다로운 작물에도 도전하며, 정기적인 관리와 손질을 통해 수익을 도모하는 유형입니다. 성과 중심이지만 감정과 노력도 함께 투자합니다.' },
  { code: 'NPCV', emoji: '🚀', name: '실속 초보자', description: '최소 노력, 최대 효율을 추구', detailDescription: '초보자 + 수익형 + 간단 관리 + 다양한 환경', longDescription: '초보자이지만 손이 많이 가는 수익 작물도 감내할 수 있는 활동적인 유형입니다. 다양한 환경에서도 작물 관리를 성실히 수행하며, 취미와 수익을 동시에 추구하는 이상적인 입문 단계입니다.' },
];

const ResultCard = ({ code, name, description, emoji, detailDescription, longDescription, cropList }) => (
  <div className="result-container" style={{
    background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 25%, #6b8e23 50%, #8fbc8f 75%, #98fb98 100%)',
    borderRadius: 24,
    padding: 32,
    border: 'none',
    boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
    minWidth: 350,
    maxWidth: 420,
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(10px)',
    margin: '0 5px',
  }}>
    <div style={{ marginBottom: 20, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <span style={{
        background: 'linear-gradient(90deg, #32cd32 0%, #228b22 100%)',
        color: '#fff',
        borderRadius: 24,
        padding: '10px 36px',
        fontWeight: 700,
        fontSize: '1.3rem',
        letterSpacing: 2,
        boxShadow: '0 4px 12px rgba(50,205,50,0.3)',
        display: 'inline-block',
        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
      }}>{code}</span>
    </div>
    <div style={{ marginBottom: 16, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
      <span style={{ fontSize: 48 }}>{emoji}</span>
    </div>
    <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: 8, fontWeight: 700, textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.3)', lineHeight: 1.3 }}>{name}</h2>
    <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 500, marginBottom: 16, textAlign: 'center', opacity: 0.95, lineHeight: 1.4 }}>{description}</div>
    
    {/* 성향 조합 섹션 */}
    <div className="detail-description-section" style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 16, margin: '12px 0', border: 'none', width: '100%', backdropFilter: 'blur(5px)' }}>
      <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><span>🔍</span> 성향 조합</h3>
      <p className="detail-description-text" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{detailDescription}</p>
    </div>
    
    {/* 상세 설명 섹션 */}
    <div className="full-description-section" style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: 16, margin: '8px 0', border: 'none', width: '100%', backdropFilter: 'blur(5px)' }}>
      <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: 8, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><span>📝</span> 유형 설명</h3>
      <p className="full-description-text" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>{longDescription}</p>
    </div>
    
    {/* 추천 작물 섹션 */}
    <div style={{ width: '100%', marginTop: 8, background: 'rgba(255,255,255,0.10)', borderRadius: 12, padding: 12, color: '#fff', textAlign: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
      <div style={{ fontSize: '0.9em', lineHeight: 1.5 }}>
        <span style={{ fontWeight: 700 }}>추천 작물:</span> 
        <span style={{ fontSize: '0.85em', opacity: 0.9 }}>
          {cropList && cropList.length > 0 ? cropList.join(', ') : '추천 작물 준비 중'}
        </span>
      </div>
    </div>
  </div>
);

const ResultSlider = () => (
  <section style={{ width: '100vw', background: 'none', padding: 0, margin: '0 auto', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <style>
      {`
        .swiper-button-next,
        .swiper-button-prev {
          color: #32cd32 !important;
          background: rgba(255, 255, 255, 0.9);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px !important;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet {
          background: #32cd32 !important;
          opacity: 0.5 !important;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.2);
        }
        
        .swiper-pagination {
          bottom: 10px !important;
        }
        .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          height: auto !important;
        }
      `}
    </style>
    <h2 style={{
      fontSize: window.innerWidth <= 768 ? '1.4rem' : window.innerWidth <= 480 ? '1.2rem' : '2.1rem',
      fontWeight: 800,
      margin: window.innerWidth <= 768 ? '0 0 20px 0' : '0 0 30px 0',
      textAlign: 'center',
      letterSpacing: '0.01em',
      background: 'none',
      color: '#fff',
      display: 'inline-block',
      lineHeight: 1.2,
      padding: '0.2em 0',
      borderRadius: '12px',
      boxShadow: 'none',
      position: 'relative',
    }}>
      <span role="img" aria-label="leaf" style={{
        fontSize: window.innerWidth <= 768 ? '1.2em' : window.innerWidth <= 480 ? '1.1em' : '1.5em', 
        verticalAlign: 'middle', 
        marginRight: window.innerWidth <= 768 ? 4 : window.innerWidth <= 480 ? 3 : 8
      }}>🌱</span>
      16가지 농업 성향 유형 미리보기
      <span role="img" aria-label="leaf" style={{
        fontSize: window.innerWidth <= 768 ? '1.2em' : window.innerWidth <= 480 ? '1.1em' : '1.5em', 
        verticalAlign: 'middle', 
        marginLeft: window.innerWidth <= 768 ? 4 : window.innerWidth <= 480 ? 3 : 8
      }}>🌿</span>
    </h2>
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={2.5}
      centeredSlides={false}
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        waitForTransition: true
      }}
      speed={6000}
      allowTouchMove={true}
      grabCursor={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
          centeredSlides: true,
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 20,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
          centeredSlides: false,
        }
      }}
      style={{
        width: '100vw',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '0 20px',
      }}
    >
      {types.map((type) => (
        <SwiperSlide key={type.code} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 650,
          padding: '20px 5px',
        }}>
          <ResultCard {...type} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default ResultSlider; 