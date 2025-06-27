import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './NBTITest.css';

// 16가지 유형 데이터
const types = [
  { code: 'AHBS', emoji: '🧑‍🌾', name: '감성 장인', description: '정성 가득 감성 텃밭러', detailDescription: '숙련자 + 취미형 + 세심 관리 + 선택적 환경', longDescription: '다양한 경험을 바탕으로 텃밭을 섬세하게 가꾸는 장인. 환경이 다소 까다로워도 이를 감성적으로 극복하며, 수확보다는 가꾸는 즐거움을 우선시합니다. 향기롭고 정갈한 공간을 연출하는 데 능숙합니다.', cropList: ['인삼', '들깨', '아스파라거스', '오미자', '자두', '참나물'] },
  { code: 'AHBV', emoji: '🎋', name: '따뜻한 장인', description: '손길 가득한 텃밭을 유연하게', detailDescription: '숙련자 + 취미형 + 세심 관리 + 다양한 환경', longDescription: '감성과 숙련도를 바탕으로 유연하게 텃밭을 가꾸는 유형. 환경에 구애받지 않고 언제든지 새로운 식물을 환영하는 따뜻한 성향. 식물과 대화하듯 교감하며 여유로운 힐링을 추구합니다.', cropList: ['고구마', '마', '무화과', '산약', '오디'] },
  { code: 'AHCS', emoji: '🌱', name: '감성 실용가', description: '여유와 실용의 균형형', detailDescription: '숙련자 + 취미형 + 간단 관리 + 선택적 환경', longDescription: '간단한 관리로 감성을 유지하는 실용형 장인. 감성적 만족도 중요하지만 시간을 효율적으로 사용하며, 작물보다는 텃밭 공간 자체에 더 큰 의미를 두는 경우가 많습니다.', cropList: ['상추', '감자', '매실'] },
  { code: 'AHCV', emoji: '🌼', name: '감성 실용러', description: '여유롭게, 하지만 간단하게', detailDescription: '숙련자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '숙련된 감각으로 최소한의 관리로도 감성적 만족을 유지하는 유형. 바쁜 일상 속에서도 힐링을 놓치지 않고 실용성과 감성을 모두 챙기려는 성향입니다.', cropList: ['오이', '감'] },
  { code: 'APBS', emoji: '🛠️', name: '수익 장인', description: '수익도 품질도 놓치지 않는 실전 고수', detailDescription: '숙련자 + 수익형 + 세심 관리 + 선택적 환경', longDescription: '작물 품질과 수익 모두를 추구하는 실전형 숙련자. 환경이 까다롭더라도 치밀한 계획과 정성으로 농사에 임하며, 마치 농업 컨설턴트처럼 텃밭을 운영합니다.', cropList: ['사과', '근대', '배', '쪽파'] },
  { code: 'APBV', emoji: '🧃', name: '부지런한 실속러', description: '수익을 위해 꾸준히 정성껏', detailDescription: '숙련자 + 수익형 + 세심 관리 + 다양한 환경', longDescription: '텃밭을 수익 수단으로 활용하지만 관리에도 게으르지 않은 성향. 다양한 환경에서도 잘 적응하며, 실속 있게 운영하는 부지런한 농부 타입입니다.', cropList: ['벼'] },
  { code: 'APCS', emoji: '🔧', name: '효율 추구자', description: '최적의 환경에서 효율 극대화', detailDescription: '숙련자 + 수익형 + 간단 관리 + 선택적 환경', longDescription: '효율적인 환경에서 작물 수익을 극대화하려는 실용 중심형. 시간과 에너지를 아끼며, 작물 선택과 배치, 수확까지 모든 과정에서 계산된 접근을 선호합니다.', cropList: ['딸기'] },
  { code: 'APCV', emoji: '📦', name: '전략 농사꾼', description: '생산성과 효율을 최우선으로', detailDescription: '숙련자 + 수익형 + 간단 관리 + 다양한 환경', longDescription: '다양한 환경에서 효율과 생산성을 동시에 추구하는 전략가형. 관리 시간은 최소화하고 수익은 최대화하는 데 집중하며, 스마트팜에 관심 많은 유형입니다.', cropList: ['수박', '참외', '토마토', '방울토마토'] },
  { code: 'NHBS', emoji: '🐣', name: '텃밭 입문자', description: '감성으로 시작하는 첫 텃밭', detailDescription: '초보자 + 취미형 + 세심 관리 + 선택적 환경', longDescription: '텃밭을 처음 시작하지만 감성적 만족을 기대하는 초보자. 관리가 어렵더라도 식물 키우기에 대한 열정이 높으며, 실패도 즐거운 배움으로 여깁니다.', cropList: ['쑥갓', '연근', '우엉', '도라지', '더덕', '취나물'] },
  { code: 'NHBV', emoji: '🍀', name: '자연 입문자', description: '감성으로 시작하지만 환경엔 유연', detailDescription: '초보자 + 취미형 + 세심 관리 + 다양한 환경', longDescription: '감성적인 동기로 시작하지만 유연한 환경에서 다양한 작물을 시도해보는 탐험형. 실내외를 넘나드는 초보 가드너입니다.', cropList: ['블루베리'] },
  { code: 'NHCS', emoji: '📚', name: '감성 입문러', description: '쉽게 시작하는 따뜻한 취미', detailDescription: '초보자 + 취미형 + 간단 관리 + 선택적 환경', longDescription: '부담 없이 시작할 수 있는 소박한 텃밭을 선호하며, 작은 관리로 큰 만족을 얻습니다. 식물을 가족처럼 대하며 정서적 안정감을 추구합니다.', cropList: ['브로콜리'] },
  { code: 'NHCV', emoji: '🧺', name: '힐링 간편러', description: '간단한 돌봄으로도 정서적 만족', detailDescription: '초보자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '복잡한 관리는 어렵지만 식물과 함께하는 시간 자체를 소중히 여기는 힐링 중심형. 쉽게 기를 수 있는 작물로 감성을 채우는 유형입니다.', cropList: ['파프리카', '풋고추', '청양고추', '비트'] },
  { code: 'NPBS', emoji: '💼', name: '실전 입문자', description: '처음이지만 제대로 키워보고 싶어', detailDescription: '초보자 + 수익형 + 세심 관리 + 선택적 환경', longDescription: '텃밭 초보지만 수익과 작물 품질을 동시에 잡고 싶어 하는 도전형. 학습 의지가 높고 다양한 정보를 습득하여 빠르게 실력을 키우는 성향입니다.', cropList: ['마늘', '양파', '얼갈이배추', '청경채', '참다래'] },
  { code: 'NPBV', emoji: '📈', name: '부지런한 도전자', description: '초보지만 수익을 위해 노력파', detailDescription: '초보자 + 수익형 + 세심 관리 + 다양한 환경', longDescription: '텃밭으로 수익을 내고자 하는 강한 의지가 있는 유형. 환경에 구애받지 않고 시도하며, 실패 속에서도 꾸준히 개선합니다.', cropList: ['체리', '참깨', '수수', '조', '체리', '생강'] },
  { code: 'NPCS', emoji: '🥕', name: '전략 입문자', description: '쉽게 시작하지만 수익도 고려', detailDescription: '초보자 + 수익형 + 간단 관리 + 선택적 환경', longDescription: '간단하게 시작하되 작물 선택에 전략적 접근을 시도하는 초보 농부. 효율과 가능성을 고려한 실용형 시작자입니다.', cropList: ['당근', '무', '미나리', '배추', '부추', '시금치', '양배추', '호박', '복숭아', '케일', '유채', '고추'] },
  { code: 'NPCV', emoji: '🚀', name: '실속 초보자', description: '최소 노력, 최대 효율을 추구', detailDescription: '초보자 + 수익형 + 간단 관리 + 다양한 환경', longDescription: '부담 없는 텃밭 운영으로도 실속 있는 결과를 기대하는 유형. 시간과 자원이 적더라도 결과를 뽑아내는 실속파입니다.', cropList: ['메론'] },
];

// ResultCard 컴포넌트 레이아웃을 이미지처럼 통일
const ResultCard = ({ code, name, description, emoji, detailDescription, longDescription, cropList }) => (
  <div className="result-card-unified" style={{
    background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 25%, #6b8e23 50%, #8fbc8f 75%, #98fb98 100%)',
    borderRadius: 32,
    padding: 40,
    border: 'none',
    boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
    minWidth: 350,
    maxWidth: 420,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    margin: '0 5px',
  }}>
    <div style={{ marginBottom: 16, width: '100%', display: 'flex', justifyContent: 'center' }}>
      <span style={{ fontSize: 44 }}>{emoji}</span>
    </div>
    <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: 8, fontWeight: 800, textAlign: 'center', letterSpacing: 1 }}>{name}</h2>
    <div style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 500, marginBottom: 24, textAlign: 'center', opacity: 0.97, lineHeight: 1.4 }}>{description}</div>

    {/* 성향 조합 */}
    <div style={{ background: 'rgba(255,255,255,0.13)', borderRadius: 18, padding: 18, margin: '10px 0', width: '100%' }}>
      <h3 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><span>🔍</span> 성향 조합</h3>
      <p style={{ color: 'rgba(255,255,255,0.97)', fontSize: '1rem', margin: 0, lineHeight: 1.5 }}>{detailDescription}</p>
    </div>

    {/* 유형 설명 */}
    <div style={{ background: 'rgba(255,255,255,0.13)', borderRadius: 18, padding: 18, margin: '10px 0', width: '100%' }}>
      <h3 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><span>📝</span> 유형 설명</h3>
      <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.98rem', margin: 0, lineHeight: 1.6 }}>{longDescription}</p>
    </div>

    {/* 주요 특징 */}
    <div style={{ background: 'rgba(255,255,255,0.13)', borderRadius: 18, padding: 18, margin: '10px 0', width: '100%' }}>
      <h3 style={{ color: '#fff', fontSize: '1.05rem', marginBottom: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><span>✨</span> 주요 특징</h3>
      <ul style={{ color: 'rgba(255,255,255,0.97)', fontSize: '0.98rem', margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
        {code.startsWith('A') && <li><b>숙련자:</b> 풍부한 경험과 전문성을 보유</li>}
        {code.startsWith('N') && <li><b>초보자:</b> 학습 의지가 높고 빠른 성장 가능</li>}
        {code.includes('H') && <li><b>취미형:</b> 감성적 만족과 힐링을 중시</li>}
        {code.includes('P') && <li><b>수익형:</b> 경제적 효율과 생산성을 추구</li>}
        {code.includes('B') && <li><b>세심 관리:</b> 정성과 꼼꼼함으로 작물 돌봄</li>}
        {code.includes('C') && <li><b>간단 관리:</b> 효율적이고 실용적인 접근</li>}
        {code.includes('S') && <li><b>선택적 환경:</b> 최적 조건을 선호</li>}
        {code.includes('V') && <li><b>다양한 환경:</b> 유연한 적응력 보유</li>}
      </ul>
    </div>

    {/* 추천 작물 */}
    <div style={{ background: 'rgba(255,255,255,0.13)', borderRadius: 18, padding: 18, margin: '10px 0', width: '100%', textAlign: 'center' }}>
      <span style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>추천 작물:</span>
      <span style={{ color: '#fff', fontSize: '0.98rem', marginLeft: 8 }}>
        {cropList && cropList.length > 0 ? cropList.join(', ') : '추천 작물 준비 중'}
      </span>
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
          minHeight: 750,
          padding: '20px 5px',
        }}>
          <ResultCard {...type} />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default ResultSlider; 