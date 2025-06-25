import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './NBTITest.css';

// 8가지 유형 데이터 예시 (실제 데이터로 교체 가능)
const types = [
  {
    code: 'NHB',
    name: '힐링형 감성 초보자',
    description: '초보자 + 감성 위주 + 시간 많음',
    emoji: '🥬',
    detailDescription: '자연 속에서 여유롭게 감성과 힐링을 추구하는 유형입니다. 관리에 시간을 들이는 것을 부담스럽지 않게 여기며, 작물을 돌보는 과정에서 안정감과 정서적 만족을 얻습니다.',
    mainCrop: '무',
    cropList: ['당근', '무', '미나리', '시금치', '쑥갓', '양배추', '연근', '우엉', '고구마', '감', '청경채', '근대', '유채', '수수', '조', '비트', '참나물', '취나물', '쪽파'],
    adaptabilityScore: 35, hobbyScore: 82, busyScore: 85
  },
  {
    code: 'NHC',
    name: '감성형 간편 입문자',
    description: '초보자 + 감성 위주 + 시간 없음',
    emoji: '🍆',
    detailDescription: '작물 재배에 로망이 있지만, 현실적인 시간 여유가 부족한 유형입니다. 간단하게 키울 수 있는 예쁜 작물이나 힐링 감성 중심의 재배를 선호하며, 짧은 시간 안에 즐거움을 얻을 수 있는 구조를 좋아합니다.',
    mainCrop: '가지',
    cropList: ['가지', '부추', '풋고추', '청양고추', '케일'],
    adaptabilityScore: 32, hobbyScore: 76, busyScore: 30
  },
  {
    code: 'NPB',
    name: '실속형 초보 농부',
    description: '초보자 + 수익 위주 + 시간 많음',
    emoji: '🌾',
    detailDescription: '수익성과 효율성도 중요하지만, 작물 관리에는 어느 정도 시간을 투자할 준비가 되어 있는 유형입니다. 현실적 판단력을 바탕으로 안정적이고 실용적인 재배 방식을 따르며, 장기적으로 텃밭을 확장해보고 싶어합니다.',
    mainCrop: '부추',
    cropList: ['도라지', '더덕', '들깨', '참깨', '마', '산약', '생강', '오디', '오미자'],
    adaptabilityScore: 38, hobbyScore: 24, busyScore: 80
  },
  {
    code: 'NPC',
    name: '도전형 초보 경작자',
    description: '초보자 + 수익 위주 + 시간 없음',
    emoji: '🍓',
    detailDescription: '텃밭을 수익의 출발점으로 바라보며, 간편하게 관리 가능한 수익 작물 위주로 키우려는 경향이 있습니다. 재배 경험은 부족하지만, ROI(수익률)에 대한 관심은 높으며, 기술적 솔루션이나 자동화를 선호합니다.',
    mainCrop: '딸기',
    cropList: ['메론', '파프리카', '체리', '아스파라거스'],
    adaptabilityScore: 34, hobbyScore: 20, busyScore: 25
  },
  {
    code: 'AHB',
    name: '세심한 감성 마스터',
    description: '숙련자 + 감성 위주 + 시간 많음',
    emoji: '🌾',
    detailDescription: '풍부한 경험을 바탕으로 작물을 세심하게 돌보며, 감성과 미학을 텃밭에 반영하는 유형입니다. 힐링은 물론, 작물과의 교감 그 자체를 중요하게 생각하고, 매일의 변화를 관찰하는 것을 즐깁니다.',
    mainCrop: '벼',
    cropList: ['배추', '상추', '감자', '복숭아', '사과', '매실', '배'],
    adaptabilityScore: 96, hobbyScore: 85, busyScore: 90
  },
  {
    code: 'AHC',
    name: '감성형 도시 마스터',
    description: '숙련자 + 감성 위주 + 시간 없음',
    emoji: '🍃',
    detailDescription: '감성을 중요시하지만, 바쁜 일상 속에서 최소한의 시간으로 작물을 즐기는 고수 유형입니다. 작은 공간에서도 감성적 성취를 추구하며, 자동화나 스마트팜 기술을 효과적으로 활용할 줄 압니다.',
    mainCrop: '매실',
    cropList: ['마늘', '블루베리', '인삼'],
    adaptabilityScore: 92, hobbyScore: 78, busyScore: 25
  },
  {
    code: 'APB',
    name: '실속형 수익 마스터',
    description: '숙련자 + 수익 위주 + 시간 많음',
    emoji: '🌿',
    detailDescription: '수익을 내기 위한 철저한 계획과 노하우를 갖춘 유형입니다. 고수익 작물 중심으로 재배하면서도, 품질과 생산성을 모두 고려하며, 작물에 대한 이해도와 관리 능력이 뛰어납니다.',
    mainCrop: '아스파라거스',
    cropList: ['수박', '오이', '참외', '토마토', '방울토마토', '자두'],
    adaptabilityScore: 94, hobbyScore: 22, busyScore: 88
  },
  {
    code: 'APC',
    name: '전략형 수익 실천가',
    description: '숙련자 + 수익 위주 + 시간 없음',
    emoji: '🍓',
    detailDescription: '시간은 부족하지만, 목표는 확실한 유형입니다. 빠르게 성장하는 작물, 시장성 있는 품목을 선호하며, 철저한 관리보다는 효율적 수익 창출에 집중합니다. 자동화, 위탁 재배 등 전략적 운영에 강점을 가집니다.',
    mainCrop: '딸기',
    cropList: ['딸기', '무화과'],
    adaptabilityScore: 90, hobbyScore: 18, busyScore: 28
  }
];

const ResultCard = ({ code, name, description, emoji, detailDescription, mainCrop, cropList }) => (
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
    margin: '0 auto',
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
    <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 500, marginBottom: 24, textAlign: 'center', opacity: 0.95, lineHeight: 1.4 }}>{description}</div>
    <div className="detail-description-section" style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 16, padding: 20, margin: '20px 0', border: 'none', width: '100%', backdropFilter: 'blur(5px)' }}>
      <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}><span>📋</span> 유형 상세 설명</h3>
      <p className="detail-description-text" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>{detailDescription}</p>
    </div>
    <div style={{ width: '100%', marginTop: 10, background: 'rgba(255,255,255,0.10)', borderRadius: 12, padding: 16, color: '#fff', textAlign: 'center', fontSize: '1rem', fontWeight: 500 }}>
      <div style={{ marginBottom: 8 }}><span style={{ fontWeight: 700, fontSize: '1.05em' }}>대표 작물:</span> {mainCrop}</div>
      <div style={{ fontSize: '0.97em', lineHeight: 1.6 }}><span style={{ fontWeight: 700 }}>작물 목록:</span> {cropList && cropList.join(', ')}</div>
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
      fontSize: '2.1rem',
      fontWeight: 800,
      margin: '0 0 30px 0',
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
      <span role="img" aria-label="leaf" style={{fontSize: '1.5em', verticalAlign: 'middle', marginRight: 8}}>🌱</span>
      8가지 농업 성향 유형 미리보기
      <span role="img" aria-label="leaf" style={{fontSize: '1.5em', verticalAlign: 'middle', marginLeft: 8}}>🌿</span>
    </h2>
    <Swiper
      modules={[Autoplay]}
      spaceBetween={4}
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
          padding: '20px 0',
        }}>
          <ResultCard {...type} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default ResultSlider; 