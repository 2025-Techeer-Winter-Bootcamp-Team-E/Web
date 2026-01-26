export const searchRecent = {
  status: 200,
  message: '검색어 목록 조회 성공',
  data: {
    recent_terms: [
      { id: 101, term: '그래픽카드', searchedAt: '2026-01-14T20:00:00' },
      { id: 102, term: '모니터 암', searchedAt: '2026-01-13T15:00:00' },
    ],
  },
};

export const deleteRecentSearch = {
  status: 200,
  message: '최근 검색어가 삭제 되었습니다',
};

export const searchPopluar = {
  status: 200,
  message: '검색어 목록 조회 성공',
  data: {
    popular_terms: [
      { rank: 1, term: 'iPhone 15' },
      { rank: 2, term: '맥북 에어' },
    ],
  },
};

export const searchAutoComplete = {
  status: 200,
  message: '자동완성 목록 조회 성공',
  data: {
    suggestions: ['노트북', '노트북 파우치', '노트북 거치대', '게이밍 노트북'],
  },
};

export const llmSearch = {
  status: 200,
  message: 'AI 맞춤형 상품 추천 성공',
  data: {
    analysis_message: '휴대성(무게)과 컴파일 속도(RAM)를 중요하게 고려하여 상품을 찾았습니다.',
    recommended_products: [
      {
        product_id: 501,
        product_code: 10001,
        product_image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
        product_name: 'LG 그램 15 2024 (15Z90S-G.AA5CK)',
        recommendation_reason:
          '1.09kg의 초경량 무게로 휴대하기 좋으며, 인텔 코어 Ultra 5로 개발 환경 구동에 충분합니다.',
        price: 1549000,
        specs: {
          cpu: '인텔 코어 Ultra 5',
          ram: '16GB',
          weight: '1.09kg',
          battery: '72Wh',
        },
        product_detail_url: '/products/10001',
      },
      {
        product_id: 502,
        product_code: 10002,
        product_image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        product_name: 'LG 그램 16 2024 (16Z90S-G.AA7CK)',
        recommendation_reason:
          '16인치 대화면에 1.19kg의 무게로 작업 효율과 휴대성을 모두 잡았습니다.',
        price: 1899000,
        specs: {
          cpu: '인텔 코어 Ultra 7',
          ram: '16GB',
          weight: '1.19kg',
          battery: '77Wh',
        },
        product_detail_url: '/products/10002',
      },
      {
        product_id: 503,
        product_code: 10005,
        product_image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
        product_name: 'LG 그램 Pro 16 2024 (16Z90SP-G.AA7CK)',
        recommendation_reason:
          'RTX 3050 그래픽카드로 그래픽 작업에 적합하며, 고성능 CPU를 탑재했습니다.',
        price: 2499000,
        specs: {
          cpu: '인텔 코어 Ultra 7',
          gpu: 'RTX 3050',
          ram: '16GB',
          weight: '1.39kg',
        },
        product_detail_url: '/products/10005',
      },
      {
        product_id: 504,
        product_code: 20001,
        product_image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
        product_name: '삼성 갤럭시북4 프로 (NT940XGK-K71A)',
        recommendation_reason:
          'AMOLED 디스플레이로 색재현력이 뛰어나며, 삼성 생태계 연동이 우수합니다.',
        price: 1890000,
        specs: {
          cpu: '인텔 코어 Ultra 7',
          ram: '16GB',
          weight: '1.23kg',
          display: 'Dynamic AMOLED 2X',
        },
        product_detail_url: '/products/20001',
      },
      {
        product_id: 505,
        product_code: 78528251,
        product_image_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop',
        thumbnail_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop',
        product_name: 'Apple 2024 맥북 에어 13 M3',
        recommendation_reason:
          'M3 칩으로 뛰어난 성능과 배터리 효율을 제공하며, macOS 생태계가 필요한 분께 적합합니다.',
        price: 1730000,
        specs: {
          cpu: 'M3 8코어',
          gpu: '10코어',
          ram: '16GB',
          ssd: '512GB',
        },
        product_detail_url: '/products/78528251',
      },
    ],
  },
};

export const ShoppingResearchQuestion = {
  status: 200,
  message: '질문 생성 성공',
  data: {
    search_id: 'sr-1234-5678',
    questions: [
      { question_id: 1, question: '주요 사용 목적은 무엇인가요?' },
      { question_id: 2, question: '생각하시는 예산 범위는?' },
      { question_id: 3, question: '디스플레이에서 가장 중요한 점은?' },
      { question_id: 4, question: '휴대성을 어느 정도 고려하시나요?' },
    ],
  },
};

export const ShoppingResearchResule = {
  status: 200,
  message: '쇼핑 리서치 결과 분석 성공 (상위 5개 상품)',
  data: {
    user_query: '전문가용 영상편집 노트북 찾아줘',
    product: [
      {
        similarity_score: 0.98,
        product_image_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop',
        product_name: 'Apple 2024 맥북 프로 14 M3 Max',
        product_code: 78528252,
        recommendation_reason:
          '영상 편집 성능과 휴대성에서 가장 높은 점수를 기록한 최적의 선택입니다.',
        price: 2490000,
        performance_score: 0.98,
        product_specs: {
          cpu: 'M3 Max',
          ram: '32GB',
          weight: '1.4kg',
        },
        ai_review_summary: '렌더링 속도가 압도적이라는 평이 지배적입니다.',
        product_detail_url: '/products/78528252',
        optimal_product_info: {
          match_rank: 1,
          is_lowest_price: true,
        },
      },
      {
        similarity_score: 0.94,
        product_image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
        product_name: '삼성전자 갤럭시북4 프로',
        product_code: 20001,
        recommendation_reason: '디스플레이 화질이 우수하며 삼성 생태계 활용 시 유리합니다.',
        price: 1890000,
        performance_score: 0.89,
        product_specs: {
          cpu: 'Intel Core Ultra 7',
          ram: '16GB',
          weight: '1.23kg',
        },
        ai_review_summary: '터치스크린 기능과 얇은 두께에 대한 만족도가 높습니다.',
        product_detail_url: '/products/20001',
        optimal_product_info: {
          match_rank: 2,
          is_lowest_price: false,
        },
      },
      {
        similarity_score: 0.92,
        product_image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
        product_name: 'LG 그램 Pro 17 2024',
        product_code: 10006,
        recommendation_reason: 'RTX 3050과 17인치 대화면으로 영상 편집에 최적화되어 있습니다.',
        price: 2899000,
        performance_score: 0.91,
        product_specs: {
          cpu: '인텔 코어 Ultra 9',
          gpu: 'RTX 3050',
          ram: '32GB',
          weight: '1.45kg',
        },
        ai_review_summary: '대화면과 고성능의 조합에 대한 만족도가 높습니다.',
        product_detail_url: '/products/10006',
        optimal_product_info: {
          match_rank: 3,
          is_lowest_price: false,
        },
      },
    ],
  },
};
