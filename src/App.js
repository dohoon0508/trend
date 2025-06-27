import React, { useEffect, useState } from 'react';
import './App.css';
import NBTITest from './components/NBTITest';
import ResultSlider from './components/ResultSlider';

// 결과 보기 전용 페이지
function ResultView({ code, onBack }) {
  // App.js 내부의 types 배열 사용
  const types = [
    { code: 'AHBS', emoji: '🧑‍🌾', name: '감성 장인', description: '정성 가득 감성 텃밭러', detailDescription: '숙련자 + 취미형 + 세심 관리 + 선택적 환경', longDescription: '다양한 경험을 바탕으로 텃밭을 섬세하게 가꾸는 장인. 환경이 다소 까다로워도 이를 감성적으로 극복하며, 수확보다는 가꾸는 즐거움을 우선시합니다. 향기롭고 정갈한 공간을 연출하는 데 능숙합니다.' },
    { code: 'AHBV', emoji: '🎋', name: '따뜻한 장인', description: '손길 가득한 텃밭을 유연하게', detailDescription: '숙련자 + 취미형 + 세심 관리 + 다양한 환경', longDescription: '감성과 숙련도를 바탕으로 유연하게 텃밭을 가꾸는 유형. 환경에 구애받지 않고 언제든지 새로운 식물을 환영하는 따뜻한 성향. 식물과 대화하듯 교감하며 여유로운 힐링을 추구합니다.' },
    { code: 'AHCS', emoji: '🌱', name: '감성 실용가', description: '여유와 실용의 균형형', detailDescription: '숙련자 + 취미형 + 간단 관리 + 선택적 환경', longDescription: '간단한 관리로 감성을 유지하는 실용형 장인. 감성적 만족도 중요하지만 시간을 효율적으로 사용하며, 작물보다는 텃밭 공간 자체에 더 큰 의미를 두는 경우가 많습니다.' },
    { code: 'AHCV', emoji: '🌼', name: '감성 실용러', description: '여유롭게, 하지만 간단하게', detailDescription: '숙련자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '숙련된 감각으로 최소한의 관리로도 감성적 만족을 유지하는 유형. 바쁜 일상 속에서도 힐링을 놓치지 않고 실용성과 감성을 모두 챙기려는 성향입니다.' },
    { code: 'APBS', emoji: '🛠️', name: '수익 장인', description: '수익도 품질도 놓치지 않는 실전 고수', detailDescription: '숙련자 + 수익형 + 세심 관리 + 선택적 환경', longDescription: '작물 품질과 수익 모두를 추구하는 실전형 숙련자. 환경이 까다롭더라도 치밀한 계획과 정성으로 농사에 임하며, 마치 농업 컨설턴트처럼 텃밭을 운영합니다.' },
    { code: 'APBV', emoji: '🧃', name: '부지런한 실속러', description: '수익을 위해 꾸준히 정성껏', detailDescription: '숙련자 + 수익형 + 세심 관리 + 다양한 환경', longDescription: '텃밭을 수익 수단으로 활용하지만 관리에도 게으르지 않은 성향. 다양한 환경에서도 잘 적응하며, 실속 있게 운영하는 부지런한 농부 타입입니다.' },
    { code: 'APCS', emoji: '🔧', name: '효율 추구자', description: '최적의 환경에서 효율 극대화', detailDescription: '숙련자 + 수익형 + 간단 관리 + 선택적 환경', longDescription: '효율적인 환경에서 작물 수익을 극대화하려는 실용 중심형. 시간과 에너지를 아끼며, 작물 선택과 배치, 수확까지 모든 과정에서 계산된 접근을 선호합니다.' },
    { code: 'APCV', emoji: '📦', name: '전략 농사꾼', description: '생산성과 효율을 최우선으로', detailDescription: '숙련자 + 수익형 + 간단 관리 + 다양한 환경', longDescription: '다양한 환경에서 효율과 생산성을 동시에 추구하는 전략가형. 관리 시간은 최소화하고 수익은 최대화하는 데 집중하며, 스마트팜에 관심 많은 유형입니다.' },
    { code: 'NHBS', emoji: '🐣', name: '텃밭 입문자', description: '감성으로 시작하는 첫 텃밭', detailDescription: '초보자 + 취미형 + 세심 관리 + 선택적 환경', longDescription: '텃밭을 처음 시작하지만 감성적 만족을 기대하는 초보자. 관리가 어렵더라도 식물 키우기에 대한 열정이 높으며, 실패도 즐거운 배움으로 여깁니다.' },
    { code: 'NHBV', emoji: '🍀', name: '자연 입문자', description: '감성으로 시작하지만 환경엔 유연', detailDescription: '초보자 + 취미형 + 세심 관리 + 다양한 환경', longDescription: '감성적인 동기로 시작하지만 유연한 환경에서 다양한 작물을 시도해보는 탐험형. 실내외를 넘나드는 초보 가드너입니다.' },
    { code: 'NHCS', emoji: '📚', name: '감성 입문러', description: '쉽게 시작하는 따뜻한 취미', detailDescription: '초보자 + 취미형 + 간단 관리 + 선택적 환경', longDescription: '부담 없이 시작할 수 있는 소박한 텃밭을 선호하며, 작은 관리로 큰 만족을 얻습니다. 식물을 가족처럼 대하며 정서적 안정감을 추구합니다.' },
    { code: 'NHCV', emoji: '🧺', name: '힐링 간편러', description: '간단한 돌봄으로도 정서적 만족', detailDescription: '초보자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '복잡한 관리는 어렵지만 식물과 함께하는 시간 자체를 소중히 여기는 힐링 중심형. 쉽게 기를 수 있는 작물로 감성을 채우는 유형입니다.' },
    { code: 'NPBS', emoji: '💼', name: '실전 입문자', description: '처음이지만 제대로 키워보고 싶어', detailDescription: '초보자 + 수익형 + 세심 관리 + 선택적 환경', longDescription: '텃밭 초보지만 수익과 작물 품질을 동시에 잡고 싶어 하는 도전형. 학습 의지가 높고 다양한 정보를 습득하여 빠르게 실력을 키우는 성향입니다.' },
    { code: 'NPBV', emoji: '📈', name: '부지런한 도전자', description: '초보지만 수익을 위해 노력파', detailDescription: '초보자 + 수익형 + 세심 관리 + 다양한 환경', longDescription: '텃밭으로 수익을 내고자 하는 강한 의지가 있는 유형. 환경에 구애받지 않고 시도하며, 실패 속에서도 꾸준히 개선합니다.' },
    { code: 'NPCS', emoji: '🥕', name: '전략 입문자', description: '쉽게 시작하지만 수익도 고려', detailDescription: '초보자 + 수익형 + 간단 관리 + 선택적 환경', longDescription: '간단하게 시작하되 작물 선택에 전략적 접근을 시도하는 초보 농부. 효율과 가능성을 고려한 실용형 시작자입니다.' },
    { code: 'NPCV', emoji: '🚀', name: '실속 초보자', description: '최소 노력, 최대 효율을 추구', detailDescription: '초보자 + 수익형 + 간단 관리 + 다양한 환경', longDescription: '부담 없는 텃밭 운영으로도 실속 있는 결과를 기대하는 유형. 시간과 자원이 적더라도 결과를 뽑아내는 실속파입니다.' },
  ];
  
  // 임시 작물 데이터 (실제로는 NBTITest.js의 cropDataByCode를 사용해야 함)
  const cropDataByCode = {
    AHBS: [
      { name: '인삼', en: 'ginseng', desc: '건강에 좋은 뿌리.' },
      { name: '들깨', en: 'Perilla', desc: '고소한 맛의 잎채소.' },
      { name: '아스파라거스', en: 'Asparagus', desc: '고급 채소.' },
      { name: '오미자', en: 'Schisandra', desc: '다섯 가지 맛의 열매.' },
      { name: '자두', en: 'Plum', desc: '새콤달콤한 과일.' },
      { name: '참나물', en: 'Chive', desc: '향긋한 나물.' },
    ],
    AHBV: [
      { name: '고구마', en: 'Sweet Potato', desc: '달콤한 맛의 대표 작물.' },
      { name: '마', en: 'Yam', desc: '건강식으로 인기.' },
      { name: '무화과', en: 'Fig', desc: '달콤한 과일.' },
      { name: '산약', en: 'Wild Yam', desc: '산에서 자라는 마.' },
      { name: '오디', en: 'Mulberry', desc: '달콤한 열매.' },
    ],
    AHCS: [
      { name: '상추', en: 'Lettuce', desc: '쌈채소의 대표.' },
      { name: '감자', en: 'Potato', desc: '다양한 요리에 활용.' },
      { name: '매실', en: 'Japanese Apricot', desc: '청매실청의 재료.' },
    ],
    AHCV: [
      { name: '사과', en: 'Apple', desc: '대표적인 과일.' },
      { name: '근대', en: 'Swiss Chard', desc: '컬러풀한 잎채소.' },
      { name: '배', en: 'Pear', desc: '아삭한 과일.' },
      { name: '쪽파', en: 'Scallion', desc: '다양한 요리에 활용.' },
    ],
    APBS: [
      { name: '오이', en: 'Cucumber', desc: '수분이 풍부한 채소.' },
      { name: '감', en: 'Persimmon', desc: '가을을 대표하는 과일.' },
    ],
    APBV: [
      { name: '수박', en: 'Watermelon', desc: '여름 대표 과일.' },
      { name: '참외', en: 'Korean Melon', desc: '달콤한 노란 과일.' },
      { name: '토마토', en: 'Tomato', desc: '다양한 요리에 활용.' },
      { name: '방울토마토', en: 'Cherry Tomato', desc: '작고 귀여운 토마토.' },
    ],
    APCS: [
      { name: '벼', en: 'Rice', desc: '주식이 되는 곡물.' },
    ],
    APCV: [
      { name: '딸기', en: 'Strawberry', desc: '봄철 인기 과일.' },
    ],
    NHBS: [
      { name: '쑥갓', en: 'Crown Daisy', desc: '국거리, 쌈채로 인기.' },
      { name: '연근', en: 'Lotus Root', desc: '아삭한 식감의 뿌리채소.' },
      { name: '우엉', en: 'Burdock', desc: '영양이 풍부한 뿌리채소.' },
      { name: '도라지', en: 'bellflower', desc: '기관지에 좋은 뿌리채소.' },
      { name: '더덕', en: 'Deodeok', desc: '향이 좋은 산채.' },
      { name: '취나물', en: 'Chive', desc: '봄철 산나물.' },
    ],
    NHBV: [
      { name: '블루베리', en: 'Blueberry', desc: '항산화가 풍부한 과일.' },
    ],
    NHCS: [
      { name: '브로콜리', en: 'coli', desc: '비타민이 풍부한 녹색 채소.' },
    ],
    NHCV: [
      { name: '파프리카', en: 'Bell Pepper', desc: '다채로운 색의 채소.' },
      { name: '풋고추', en: 'Green Chili Pepper', desc: '매콤한 맛의 고추.' },
      { name: '청양고추', en: 'Cheongyang Chili Pepper', desc: '매운맛의 대표 고추.' },
      { name: '비트', en: 'Beet', desc: '붉은 색이 특징인 뿌리채소.' },
    ],
    NPBS: [
      { name: '마늘', en: 'Garlic', desc: '향신료로 인기.' },
      { name: '양파', en: 'Onion', desc: '기본 양념채소.' },
      { name: '얼갈이배추', en: 'Napa Cabbage', desc: '김치의 주재료.' },
      { name: '청경채', en: 'Bok Choy', desc: '부드러운 식감의 잎채소.' },
      { name: '참다래', en: 'Cherry', desc: '비타민이 풍부한 과일.' },
    ],
    NPBV: [
      { name: '체리', en: 'Cherry', desc: '상큼한 맛의 과일.' },
      { name: '참깨', en: 'Sesame', desc: '고소한 맛의 씨앗.' },
      { name: '수수', en: 'Sorghum', desc: '곡물로도 쓰이는 작물.' },
      { name: '조', en: 'Millet', desc: '영양이 풍부한 곡물.' },
    ],
    NPCS: [
      { name: '당근', en: 'Carrot', desc: '비타민이 풍부한 대표 뿌리채소.' },
      { name: '무', en: 'Radish', desc: '건강하게 잘 자라는 뿌리채소입니다.' },
      { name: '미나리', en: 'Water Parsley', desc: '향긋한 향과 아삭한 식감의 채소.' },
      { name: '시금치', en: 'Spinach', desc: '철분이 풍부한 잎채소.' },
    ],
    NPCV: [
      { name: '양배추', en: 'Cabbage', desc: '다양한 요리에 활용되는 채소.' },
      { name: '마늘', en: 'Garlic', desc: '향신료로 인기.' },
      { name: '양파', en: 'Onion', desc: '기본 양념채소.' },
      { name: '생강', en: 'Ginger', desc: '매운맛과 향이 특징.' },
    ],
  };

  // code에 맞는 type/crop 데이터 찾기
  const type = types.find(t => t.code === code);
  const crops = cropDataByCode[code] || [];
  if (!type) return <div style={{color:'#fff',padding:80}}>유효하지 않은 코드입니다.</div>;
  // NBTITest의 ResultCard와 유사하게 표시
  return (
    <div className="nbti-test">
      <div className="result-container">
        <div className="result-header">
          <h1 style={{ cursor: 'pointer' }} title="홈으로 돌아가기" onClick={onBack}>🎉 N(農)BTI 결과</h1>
          <div className="result-code">{type.code}</div>
          <div className="result-emoji">{type.emoji}</div>
          <h2>{type.name}</h2>
          <p className="result-description">{type.description}</p>
        </div>
        {type.longDescription && (
          <div className="detail-description-section">
            <h3>📋 유형 상세 설명</h3>
            <p className="detail-description-text">{type.longDescription}</p>
          </div>
        )}
        <div className="recommended-crops">
          <h3>🌱 추천 작물</h3>
          <div style={{display:'flex',flexWrap:'wrap',gap:24,justifyContent:'center',margin:'24px 0'}}>
            {crops.length > 0 ? crops.map((c, i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.12)',borderRadius:14,padding:16,minWidth:140,maxWidth:180,color:'#fff',textAlign:'center'}}>
                <img src={`${process.env.PUBLIC_URL}/images/photo/${c.en.replace(/ /g, '%20')}.jpg`} alt={c.name} style={{width:80,height:80,objectFit:'cover',borderRadius:10,marginBottom:8,background:'#eee'}} onError={e=>{if(e.target.src.includes('.jpg')){e.target.src=e.target.src.replace('.jpg','.webp');}else{e.target.style.display='none';}}}/>
                <div style={{fontWeight:700,marginBottom:6}}>{c.name}</div>
                <div style={{fontSize:'0.9em',fontWeight:400,marginBottom:8,lineHeight:'1.3'}}>{c.desc}</div>
              </div>
            )) : <div style={{color:'#fff',fontSize:'1.1em',padding:'20px'}}>추천 작물이 없습니다.</div>}
          </div>
        </div>
        <div style={{marginTop:24}}>
          <button className="retry-button" onClick={onBack}>돌아가기</button>
        </div>
      </div>
    </div>
  );
}

// 전체 유형 보기 페이지(카드형)
function TypesGallery({ onResult }) {
  // NBTITest.js의 types 배열을 복사(동일하게 유지)
  const types = [
    { code: 'AHBS', emoji: '🧑‍🌾', name: '감성 장인', description: '정성 가득 감성 텃밭러', detailDescription: '숙련자 + 취미형 + 세심 관리 + 선택적 환경', longDescription: '다양한 경험을 바탕으로 텃밭을 섬세하게 가꾸는 장인. 환경이 다소 까다로워도 이를 감성적으로 극복하며, 수확보다는 가꾸는 즐거움을 우선시합니다. 향기롭고 정갈한 공간을 연출하는 데 능숙합니다.' },
    { code: 'AHBV', emoji: '🎋', name: '따뜻한 장인', description: '손길 가득한 텃밭을 유연하게', detailDescription: '숙련자 + 취미형 + 세심 관리 + 다양한 환경', longDescription: '감성과 숙련도를 바탕으로 유연하게 텃밭을 가꾸는 유형. 환경에 구애받지 않고 언제든지 새로운 식물을 환영하는 따뜻한 성향. 식물과 대화하듯 교감하며 여유로운 힐링을 추구합니다.' },
    { code: 'AHCS', emoji: '🌱', name: '감성 실용가', description: '여유와 실용의 균형형', detailDescription: '숙련자 + 취미형 + 간단 관리 + 선택적 환경', longDescription: '간단한 관리로 감성을 유지하는 실용형 장인. 감성적 만족도 중요하지만 시간을 효율적으로 사용하며, 작물보다는 텃밭 공간 자체에 더 큰 의미를 두는 경우가 많습니다.' },
    { code: 'AHCV', emoji: '🌼', name: '감성 실용러', description: '여유롭게, 하지만 간단하게', detailDescription: '숙련자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '숙련된 감각으로 최소한의 관리로도 감성적 만족을 유지하는 유형. 바쁜 일상 속에서도 힐링을 놓치지 않고 실용성과 감성을 모두 챙기려는 성향입니다.' },
    { code: 'APBS', emoji: '🛠️', name: '수익 장인', description: '수익도 품질도 놓치지 않는 실전 고수', detailDescription: '숙련자 + 수익형 + 세심 관리 + 선택적 환경', longDescription: '작물 품질과 수익 모두를 추구하는 실전형 숙련자. 환경이 까다롭더라도 치밀한 계획과 정성으로 농사에 임하며, 마치 농업 컨설턴트처럼 텃밭을 운영합니다.' },
    { code: 'APBV', emoji: '🧃', name: '부지런한 실속러', description: '수익을 위해 꾸준히 정성껏', detailDescription: '숙련자 + 수익형 + 세심 관리 + 다양한 환경', longDescription: '텃밭을 수익 수단으로 활용하지만 관리에도 게으르지 않은 성향. 다양한 환경에서도 잘 적응하며, 실속 있게 운영하는 부지런한 농부 타입입니다.' },
    { code: 'APCS', emoji: '🔧', name: '효율 추구자', description: '최적의 환경에서 효율 극대화', detailDescription: '숙련자 + 수익형 + 간단 관리 + 선택적 환경', longDescription: '효율적인 환경에서 작물 수익을 극대화하려는 실용 중심형. 시간과 에너지를 아끼며, 작물 선택과 배치, 수확까지 모든 과정에서 계산된 접근을 선호합니다.' },
    { code: 'APCV', emoji: '📦', name: '전략 농사꾼', description: '생산성과 효율을 최우선으로', detailDescription: '숙련자 + 수익형 + 간단 관리 + 다양한 환경', longDescription: '다양한 환경에서 효율과 생산성을 동시에 추구하는 전략가형. 관리 시간은 최소화하고 수익은 최대화하는 데 집중하며, 스마트팜에 관심 많은 유형입니다.' },
    { code: 'NHBS', emoji: '🐣', name: '텃밭 입문자', description: '감성으로 시작하는 첫 텃밭', detailDescription: '초보자 + 취미형 + 세심 관리 + 선택적 환경', longDescription: '텃밭을 처음 시작하지만 감성적 만족을 기대하는 초보자. 관리가 어렵더라도 식물 키우기에 대한 열정이 높으며, 실패도 즐거운 배움으로 여깁니다.' },
    { code: 'NHBV', emoji: '🍀', name: '자연 입문자', description: '감성으로 시작하지만 환경엔 유연', detailDescription: '초보자 + 취미형 + 세심 관리 + 다양한 환경', longDescription: '감성적인 동기로 시작하지만 유연한 환경에서 다양한 작물을 시도해보는 탐험형. 실내외를 넘나드는 초보 가드너입니다.' },
    { code: 'NHCS', emoji: '📚', name: '감성 입문러', description: '쉽게 시작하는 따뜻한 취미', detailDescription: '초보자 + 취미형 + 간단 관리 + 선택적 환경', longDescription: '부담 없이 시작할 수 있는 소박한 텃밭을 선호하며, 작은 관리로 큰 만족을 얻습니다. 식물을 가족처럼 대하며 정서적 안정감을 추구합니다.' },
    { code: 'NHCV', emoji: '🧺', name: '힐링 간편러', description: '간단한 돌봄으로도 정서적 만족', detailDescription: '초보자 + 취미형 + 간단 관리 + 다양한 환경', longDescription: '복잡한 관리는 어렵지만 식물과 함께하는 시간 자체를 소중히 여기는 힐링 중심형. 쉽게 기를 수 있는 작물로 감성을 채우는 유형입니다.' },
    { code: 'NPBS', emoji: '💼', name: '실전 입문자', description: '처음이지만 제대로 키워보고 싶어', detailDescription: '초보자 + 수익형 + 세심 관리 + 선택적 환경', longDescription: '텃밭 초보지만 수익과 작물 품질을 동시에 잡고 싶어 하는 도전형. 학습 의지가 높고 다양한 정보를 습득하여 빠르게 실력을 키우는 성향입니다.' },
    { code: 'NPBV', emoji: '📈', name: '부지런한 도전자', description: '초보지만 수익을 위해 노력파', detailDescription: '초보자 + 수익형 + 세심 관리 + 다양한 환경', longDescription: '텃밭으로 수익을 내고자 하는 강한 의지가 있는 유형. 환경에 구애받지 않고 시도하며, 실패 속에서도 꾸준히 개선합니다.' },
    { code: 'NPCS', emoji: '🥕', name: '전략 입문자', description: '쉽게 시작하지만 수익도 고려', detailDescription: '초보자 + 수익형 + 간단 관리 + 선택적 환경', longDescription: '간단하게 시작하되 작물 선택에 전략적 접근을 시도하는 초보 농부. 효율과 가능성을 고려한 실용형 시작자입니다.' },
    { code: 'NPCV', emoji: '🚀', name: '실속 초보자', description: '최소 노력, 최대 효율을 추구', detailDescription: '초보자 + 수익형 + 간단 관리 + 다양한 환경', longDescription: '부담 없는 텃밭 운영으로도 실속 있는 결과를 기대하는 유형. 시간과 자원이 적더라도 결과를 뽑아내는 실속파입니다.' },
  ];
  return (
    <div style={{ height: '100vh', background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 25%, #6b8e23 50%, #8fbc8f 75%, #98fb98 100%)', paddingTop: 100, overflow: 'auto' }}>
      <div style={{ padding: '20px', maxHeight: 'calc(100vh - 120px)', overflow: 'auto' }}>
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', alignItems: 'flex-start' }}>
          {types.map((type, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.22)',
              borderRadius: 24,
              padding: 28,
              minWidth: 240,
              maxWidth: 280,
              color: '#222',
              textAlign: 'center',
              boxShadow: '0 6px 24px rgba(60,180,120,0.18)',
              marginBottom: 20,
              backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              transition: 'transform 0.18s',
              cursor: 'pointer',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <div style={{ fontSize: '2.8rem', marginBottom: 14 }}>{type.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: '1.3em', marginBottom: 8, color: '#222', letterSpacing: '-1px' }}>{type.name}</div>
              <div style={{ fontSize: '1.05em', fontWeight: 400, marginBottom: 8, color: '#32cd32', letterSpacing: '1px' }}>{type.code}</div>
              <div style={{ fontSize: '0.95em', color: '#444', marginBottom: 10, fontWeight: 500 }}>{type.description}</div>
              <div style={{ fontSize: '0.9em', color: '#222', marginBottom: 14, minHeight: 36, fontWeight: 600, lineHeight: 1.5 }}>{type.detailDescription}</div>
              <button style={{ background: 'linear-gradient(90deg,#32cd32,#43ea7f)', color: '#fff', border: 'none', borderRadius: 16, padding: '12px 0', width: '100%', fontWeight: 700, fontSize: '1em', marginTop: 6, transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(44,200,120,0.10)', letterSpacing: '-1px', cursor: 'pointer' }} onMouseOver={e => e.target.style.background = '#228b22'} onMouseOut={e => e.target.style.background = 'linear-gradient(90deg,#32cd32,#43ea7f)'} onClick={() => onResult(type.code)}>해당 결과 보기</button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

// 전체 작물 보기 페이지(크게 보이게)
function CropsGallery() {
  // NBTITest.js의 cropInfo/cropDataByCode를 임시로 불러와야 함(실제 구현 시 별도 분리 추천)
  const crops = [
    { name: '브로콜리', en: 'coli', desc: '비타민이 풍부한 녹색 채소.' },
    { name: '상추', en: 'Lettuce', desc: '쌈채소의 대표.' },
    { name: '감자', en: 'Potato', desc: '다양한 요리에 활용.' },
    { name: '매실', en: 'Japanese Apricot', desc: '청매실청의 재료.' },
    { name: '딸기', en: 'Strawberry', desc: '봄철 인기 과일.' },
    { name: '인삼', en: 'ginseng', desc: '건강에 좋은 뿌리.' },
    { name: '들깨', en: 'Perilla', desc: '고소한 맛의 잎채소.' },
    { name: '아스파라거스', en: 'Asparagus', desc: '고급 채소.' },
    { name: '오미자', en: 'Schisandra', desc: '다섯 가지 맛의 열매.' },
    { name: '자두', en: 'Plum', desc: '새콤달콤한 과일.' },
    { name: '참나물', en: 'Chive', desc: '향긋한 나물.' },
    { name: '사과', en: 'Apple', desc: '대표적인 과일.' },
    { name: '근대', en: 'Swiss Chard', desc: '컬러풀한 잎채소.' },
    { name: '배', en: 'Pear', desc: '아삭한 과일.' },
    { name: '쪽파', en: 'Scallion', desc: '다양한 요리에 활용.' },
    { name: '오이', en: 'Cucumber', desc: '수분이 풍부한 채소.' },
    { name: '감', en: 'Persimmon', desc: '가을을 대표하는 과일.' },
    { name: '수박', en: 'Watermelon', desc: '여름 대표 과일.' },
    { name: '참외', en: 'Korean Melon', desc: '달콤한 노란 과일.' },
    { name: '토마토', en: 'Tomato', desc: '다양한 요리에 활용.' },
    { name: '방울토마토', en: 'Cherry Tomato', desc: '작고 귀여운 토마토.' },
    { name: '고구마', en: 'Sweet Potato', desc: '달콤한 맛의 대표 작물.' },
    { name: '마', en: 'Yam', desc: '건강식으로 인기.' },
    { name: '무화과', en: 'Fig', desc: '달콤한 과일.' },
    { name: '산약', en: 'Wild Yam', desc: '산에서 자라는 마.' },
    { name: '오디', en: 'Mulberry', desc: '달콤한 열매.' },
    { name: '벼', en: 'Rice', desc: '주식이 되는 곡물.' },
    { name: '블루베리', en: 'Blueberry', desc: '항산화가 풍부한 과일.' },
    { name: '배추', en: 'Napa Cabbage', desc: '김치의 주재료.' },
    { name: '부추', en: 'Chive', desc: '향긋한 향과 영양.' },
    { name: '케일', en: 'Kale', desc: '슈퍼푸드로 인기.' },
    { name: '유채', en: 'Rapeseed', desc: '노란 꽃이 아름다운 채소.' },
    { name: '쑥갓', en: 'Crown Daisy', desc: '국거리, 쌈채로 인기.' },
    { name: '연근', en: 'Lotus Root', desc: '아삭한 식감의 뿌리채소.' },
    { name: '우엉', en: 'Burdock', desc: '영양이 풍부한 뿌리채소.' },
    { name: '도라지', en: 'bellflower', desc: '기관지에 좋은 뿌리채소.' },
    { name: '더덕', en: 'Deodeok', desc: '향이 좋은 산채.' },
    { name: '취나물', en: 'Chive', desc: '봄철 산나물.' },
    { name: '당근', en: 'Carrot', desc: '비타민이 풍부한 대표 뿌리채소.' },
    { name: '무', en: 'Radish', desc: '건강하게 잘 자라는 뿌리채소입니다.' },
    { name: '미나리', en: 'Water Parsley', desc: '향긋한 향과 아삭한 식감의 채소.' },
    { name: '시금치', en: 'Spinach', desc: '철분이 풍부한 잎채소.' },
    { name: '양배추', en: 'Cabbage', desc: '다양한 요리에 활용되는 채소.' },
    { name: '마늘', en: 'Garlic', desc: '향신료로 인기.' },
    { name: '양파', en: 'Onion', desc: '기본 양념채소.' },
    { name: '얼갈이배추', en: 'Napa Cabbage', desc: '김치의 주재료.' },
    { name: '청경채', en: 'Bok Choy', desc: '부드러운 식감의 잎채소.' },
    { name: '참다래', en: 'Cherry', desc: '비타민이 풍부한 과일.' },
    { name: '파프리카', en: 'Bell Pepper', desc: '다채로운 색의 채소.' },
    { name: '풋고추', en: 'Green Chili Pepper', desc: '매콤한 맛의 고추.' },
    { name: '청양고추', en: 'Cheongyang Chili Pepper', desc: '매운맛의 대표 고추.' },
    { name: '비트', en: 'Beet', desc: '붉은 색이 특징인 뿌리채소.' },
    { name: '가지', en: 'Eggplant', desc: '보라색이 매력적인 채소.' },
    { name: '메론', en: 'Melon', desc: '달콤한 과일.' },
    { name: '호박', en: 'Sweet Potato', desc: '가을 대표 채소.' },
    { name: '복숭아', en: 'Peach', desc: '달콤한 과일.' },
    { name: '고추', en: 'Green Chili Pepper', desc: '매콤한 맛의 고추.' },
    { name: '체리', en: 'Cherry', desc: '상큼한 맛의 과일.' },
    { name: '참깨', en: 'Sesame', desc: '고소한 맛의 씨앗.' },
    { name: '수수', en: 'Sorghum', desc: '곡물로도 쓰이는 작물.' },
    { name: '조', en: 'Millet', desc: '영양이 풍부한 곡물.' },
    { name: '생강', en: 'Ginger', desc: '매운맛과 향이 특징.' }
  ];
  return (
    <div style={{ height: '100vh', background: 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 25%, #6b8e23 50%, #8fbc8f 75%, #98fb98 100%)', paddingTop: 100, overflow: 'auto' }}>
      <div style={{ padding: '20px', maxHeight: 'calc(100vh - 120px)', overflow: 'auto' }}>
        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', alignItems: 'flex-start' }}>
          {crops.map((crop, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.22)',
              borderRadius: 24,
              padding: 28,
              minWidth: 240,
              maxWidth: 280,
              color: '#222',
              textAlign: 'center',
              boxShadow: '0 6px 24px rgba(60,180,120,0.18)',
              marginBottom: 20,
              backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              transition: 'transform 0.18s',
              cursor: 'pointer',
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'}
            onMouseOut={e => e.currentTarget.style.transform = 'none'}
            >
              <img src={`${process.env.PUBLIC_URL}/images/photo/${crop.en.replace(/ /g, '%20')}${crop.en === 'coli' ? '.jpeg' : '.jpg'}`} alt={crop.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 20, marginBottom: 14, background: '#eee', boxShadow: '0 2px 12px rgba(44,200,120,0.10)' }} onError={e => { 
                if (e.target.src.includes('.jpg')) { 
                  e.target.src = e.target.src.replace('.jpg', '.webp'); 
                } else if (e.target.src.includes('.jpeg')) {
                  e.target.src = e.target.src.replace('.jpeg', '.webp');
                } else { 
                  e.target.style.display = 'none'; 
                }
              }}/>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: '1.1em' }}>{crop.name}</div>
              <div style={{ fontSize: '0.9em', fontWeight: 400, marginBottom: 8, lineHeight: '1.3', color: '#444' }}>{crop.desc}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('intro'); // 'intro', 'test', 'types', 'crops'
  const [selectedResultCode, setSelectedResultCode] = useState(null);
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

  // 상단바 메뉴(모든 페이지에서 동일하게)
  const renderHeader = () => (
    <header className="custom-header">
      <div className="header-left">
        <span className="logo-tjc" onClick={() => setCurrentPage('intro')} style={{ cursor: 'pointer' }}>N(農)BTI</span>
      </div>
      <nav className="header-nav" style={{ display: 'flex', gap: 24 }}>
        <button style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.08em', cursor: 'pointer', padding: '8px 16px', borderRadius: 8, transition: 'background 0.2s' }} onClick={() => setCurrentPage('types')}>전체 유형 보기</button>
        <button style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 600, fontSize: '1.08em', cursor: 'pointer', padding: '8px 16px', borderRadius: 8, transition: 'background 0.2s' }} onClick={() => setCurrentPage('crops')}>전체 작물 보기</button>
      </nav>
    </header>
  );

  let pageContent = null;
  if (currentPage === 'test') {
    pageContent = <NBTITest onBack={() => setCurrentPage('intro')} />;
  } else if (currentPage === 'types') {
    pageContent = <TypesGallery onResult={code => { setSelectedResultCode(code); setCurrentPage('result'); }} />;
  } else if (currentPage === 'crops') {
    pageContent = <CropsGallery />;
  } else if (currentPage === 'result' && selectedResultCode) {
    pageContent = <ResultView code={selectedResultCode} onBack={() => setCurrentPage('types')} />;
  } else {
    pageContent = (
      <>
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
            <h2 className="section-title">🌱16가지 농업 성향 유형 미리보기</h2>
            <p className="section-subtitle">작물 관리 경험, 재배 목적, 투자 가능한 시간, 환경 적응력에 따라 나뉘는 16가지 유형!<br/>내 성향에 딱 맞는 작물을 만나보세요.</p>
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
                <span className="tag-korean">세심 관리</span>
                <span className="tag-center">빈도성</span>
                <span className="tag-right">간단 관리</span>
                <span className="tag-right-en">Care</span>
              </div>
            </div>
            
            <div className="tag-row scroll-animate-delay-4">
              <div className="agriculture-tag environment-fit scroll-animate">
                <span className="tag-english">Selective</span>
                <span className="tag-korean">선택적 환경</span>
                <span className="tag-center">환경적합성</span>
                <span className="tag-right">다양한 환경</span>
                <span className="tag-right-en">Versatile</span>
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
        <section className="gardening-services scroll-animate" style={{background:'linear-gradient(135deg, #2d5a27 0%, #4a7c59 25%, #6b8e23 50%, #8fbc8f 75%, #98fb98 100%)', padding:'40px 0 60px 0', color:'#222'}}>
          <div style={{maxWidth:1200, margin:'0 auto', display:'flex', flexWrap:'nowrap', gap:24, justifyContent:'center', alignItems:'stretch'}}>
            {/* 종자 매칭 서비스 */}
            <div style={{background:'#f6fbf6', borderRadius:18, boxShadow:'0 4px 20px rgba(60,180,120,0.10)', padding:'28px 20px 24px 20px', minWidth:200, maxWidth:280, flex:'1 1 250px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{fontSize:'2.2rem', marginBottom:16, color:'#2ecc71'}}>
                <span role="img" aria-label="seed">🌱</span>
              </div>
              <h3 style={{fontWeight:700, fontSize:'1.1rem', marginBottom:8, color:'#222', textAlign:'center'}}>종자 매칭 서비스</h3>
              <p style={{color:'#444', fontSize:'0.95rem', marginBottom:16, minHeight:40, textAlign:'center', lineHeight:1.5}}>텃밭 환경과 재배 목표를 입력하면, 계절별 추천 작물과 종자 정보를 바로 알려드립니다.</p>
              <ul style={{textAlign:'left', color:'#228b22', fontSize:'0.9rem', marginBottom:16, paddingLeft:16, lineHeight:1.5}}>
                <li>✔ 맞춤형 종자 추천</li>
                <li>✔ 계절별 작물 가이드</li>
                <li>✔ 실시간 재배 팁 제공</li>
              </ul>
              <button style={{background:'linear-gradient(90deg,#32cd32,#43ea7f)', color:'#fff', border:'none', borderRadius:14, padding:'10px 0', width:'100%', fontWeight:700, fontSize:'0.95em', marginTop:4, transition:'background 0.2s', boxShadow:'0 2px 6px rgba(44,200,120,0.10)', letterSpacing:'-0.5px', cursor:'pointer'}} onMouseOver={e => e.target.style.background = '#228b22'} onMouseOut={e => e.target.style.background = 'linear-gradient(90deg,#32cd32,#43ea7f)'}>👉 지금 이용하기</button>
            </div>
            {/* 비료 추천 서비스 */}
            <div style={{background:'#f6fbf6', borderRadius:18, boxShadow:'0 4px 20px rgba(60,180,120,0.10)', padding:'28px 20px 24px 20px', minWidth:200, maxWidth:280, flex:'1 1 250px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{fontSize:'2.2rem', marginBottom:16, color:'#2ecc71'}}>
                <span role="img" aria-label="fertilizer">🧪</span>
              </div>
              <h3 style={{fontWeight:700, fontSize:'1.1rem', marginBottom:8, color:'#222', textAlign:'center'}}>비료 추천 서비스</h3>
              <p style={{color:'#444', fontSize:'0.95rem', marginBottom:16, minHeight:40, textAlign:'center', lineHeight:1.5}}>토양 상태와 작물 특성을 분석해, 유기농부터 화학 비료까지 적절한 제품을 추천합니다.</p>
              <ul style={{textAlign:'left', color:'#228b22', fontSize:'0.9rem', marginBottom:16, paddingLeft:16, lineHeight:1.5}}>
                <li>✔ 토양 분석 기반 비료 추천</li>
                <li>✔ 작물 맞춤 비료 가이드</li>
                <li>✔ 시기별 시비 플랜 제공</li>
              </ul>
              <button style={{background:'linear-gradient(90deg,#32cd32,#43ea7f)', color:'#fff', border:'none', borderRadius:14, padding:'10px 0', width:'100%', fontWeight:700, fontSize:'0.95em', marginTop:4, transition:'background 0.2s', boxShadow:'0 2px 6px rgba(44,200,120,0.10)', letterSpacing:'-0.5px', cursor:'pointer'}} onMouseOver={e => e.target.style.background = '#228b22'} onMouseOut={e => e.target.style.background = 'linear-gradient(90deg,#32cd32,#43ea7f)'}>👉 비료 추천 받기</button>
            </div>
            {/* 농약 추천 서비스 */}
            <div style={{background:'#f6fbf6', borderRadius:18, boxShadow:'0 4px 20px rgba(60,180,120,0.10)', padding:'28px 20px 24px 20px', minWidth:200, maxWidth:280, flex:'1 1 250px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{fontSize:'2.2rem', marginBottom:16, color:'#2ecc71'}}>
                <span role="img" aria-label="pesticide">🧴</span>
              </div>
              <h3 style={{fontWeight:700, fontSize:'1.1rem', marginBottom:8, color:'#222', textAlign:'center'}}>농약 추천 서비스</h3>
              <p style={{color:'#444', fontSize:'0.95rem', marginBottom:16, minHeight:40, textAlign:'center', lineHeight:1.5}}>병해충 예방과 관리에 필요한 농약 정보를 맞춤으로 제공합니다.</p>
              <ul style={{textAlign:'left', color:'#228b22', fontSize:'0.9rem', marginBottom:16, paddingLeft:16, lineHeight:1.5}}>
                <li>✔ 병해충별 농약 추천</li>
                <li>✔ 안전한 사용법 안내</li>
                <li>✔ 효과적인 방제 스케줄 제공</li>
              </ul>
              <button style={{background:'linear-gradient(90deg,#32cd32,#43ea7f)', color:'#fff', border:'none', borderRadius:14, padding:'10px 0', width:'100%', fontWeight:700, fontSize:'0.95em', marginTop:4, transition:'background 0.2s', boxShadow:'0 2px 6px rgba(44,200,120,0.10)', letterSpacing:'-0.5px', cursor:'pointer'}} onMouseOver={e => e.target.style.background = '#228b22'} onMouseOut={e => e.target.style.background = 'linear-gradient(90deg,#32cd32,#43ea7f)'}>👉 농약 정보 확인하기</button>
            </div>
          </div>
          {/* 팝업 */}
          {showPopup && (
            <></>
          )}
        </section>
      </>
    );
  }

  return (
    <div className="App">
      {renderHeader()}
      {pageContent}
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