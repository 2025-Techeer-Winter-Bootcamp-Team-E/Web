export const productDetail = {
  status: 200,
  data: {
    product_id: 1,
    product_name: 'Apple 2024 맥북 에어 13 M3',
    product_code: 155143,
    brand: 'Apple',
    specs: {
      CPU: 'M3 8코어',
      GPU: '10코어',
      RAM: '16GB',
      SSD: '512GB',
      Display: 'Liquid Retina',
    },
    base_price: 1730000,
    category: '노트북',
    thumbnail_url: 'https://img.example.com/macbook-air-m3.jpg',
    product_image_url_list: [
      'https://s3.amazonaws.com/my-bucket/products/mbp14-01.jpg',
      'https://s3.amazonaws.com/my-bucket/products/mbp14-02.jpg',
    ],
    product_detail_url: 'https://myshop.com/products/501',
  },
};

export const productTrend = {
  status: 200,
  data: {
    product_id: 1,
    product_name: 'Apple 2024 맥북 에어 13 M3',
    period_unit: 'month',
    selected_period: 6,
    price_history: [
      { date: '2025-08-14', price: 1730000 },
      { date: '2025-09-14', price: 1680000 },
      { date: '2025-10-14', price: 1650000 },
      { date: '2025-11-14', price: 1590000 },
      { date: '2025-12-14', price: 1620000 },
      { date: '2026-01-14', price: 1600000 },
    ],
  },
};

export const productPrices = {
  status: 200,
  data: [
    { mall_name: '쿠팡', price: 1750000, url: 'https://coupang...' },
    { mall_name: '11번가', price: 1780000, url: 'https://11st...' },
  ],
};

export const productReviews = {
  status: 200,
  data: {
    pagination: {
      current_page: 1,
      size: 5,
      total_elements: 156,
      total_pages: 16,
    },
    average_rating: 4.8,
    reviews: [
      {
        review_id: 501,
        review_images:
          'https://img.danawa.com/ui_category/plan/rightContents/rightContents311165New.jpg?t=1768377021', // 실제로는 S3에서 사진 가져옴
        author_name: '테커열혈수강생',
        rating: 5,
        content: '맥북 에어 M3 정말 가볍고 성능도 끝내주네요! 부트캠프 코딩용으로 강추입니다.',
        created_at: '2026-01-10T14:20:00',
      },
      {
        review_id: 498,
        review_images:
          'https://img.danawa.com/ui_category/plan/rightContents/rightContents311165New.jpg?t=1768377021', // 실제로는 S3에서 사진 가져옴
        author_name: '코딩하는곰',
        rating: 4,
        content: '배송은 조금 느렸지만 제품 자체는 만족스럽습니다. 화면이 정말 선명해요.',
        created_at: '2026-01-08T09:15:00',
      },
    ],
    has_next: true,
  },
};

export const productAIReviews = {
  status: 'success',
  data: {
    product_id: 1,
    product_code: 123415,
    total_review_count: 85,
    ai_summary:
      '이 노트북은 가벼운 무게와 강력한 성능으로 대학생들에게 매우 긍정적인 평가를 받고 있습니다. 특히 코딩 작업 시 소음이 적어 만족도가 높습니다.',
    pros: ['1.2kg의 가벼운 무게', 'M3 칩의 빠른 처리 속도', '선명한 디스플레이 화질'],
    cons: ['부족한 외부 확장 포트', '상대적으로 높은 가격대'],
    recommendation_score: 92,
    score_reason: '85건의 리뷰 중 90% 이상이 성능과 휴대성에 대해 만족을 표했습니다.',
    last_updated: '2026-01-17T15:30:00',
  },
};

export const productListPaging = {
  status: 200,
  data: {
    pagination: {
      current_page: 1,
      size: 20,
      count: 128,
      total_pages: 16,
    },
    products: [
      // LG 그램 노트북
      {
        product_code: 10001,
        product_name: 'LG 그램 15 2024 (15Z90S-G.AA5CK)',
        brand: 'LG 그램',
        sub_category: 'LG 그램',
        specs: {
          화면크기: '39.6cm (15.6인치)',
          무게: '1.09kg',
          CPU: '인텔 코어 Ultra 5',
          배터리: '72Wh',
        },
        base_price: 1549000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '쿠팡', price: 1549000, url: 'https://coupang.com' },
          { mall_name: '11번가', price: 1579000, url: 'https://11st.co.kr' },
        ],
      },
      {
        product_code: 10002,
        product_name: 'LG 그램 16 2024 (16Z90S-G.AA7CK)',
        brand: 'LG 그램',
        sub_category: 'LG 그램',
        specs: {
          화면크기: '40.6cm (16인치)',
          무게: '1.19kg',
          CPU: '인텔 코어 Ultra 7',
          배터리: '77Wh',
        },
        base_price: 1899000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '쿠팡', price: 1899000, url: 'https://coupang.com' },
          { mall_name: '네이버', price: 1879000, url: 'https://shopping.naver.com' },
        ],
      },
      {
        product_code: 10003,
        product_name: 'LG 그램 14 2024 (14Z90S-G.AA5CK)',
        brand: 'LG 그램',
        sub_category: 'LG 그램',
        specs: {
          화면크기: '35.6cm (14인치)',
          무게: '0.99kg',
          CPU: '인텔 코어 Ultra 5',
          배터리: '72Wh',
        },
        base_price: 1449000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '쿠팡', price: 1449000, url: 'https://coupang.com' },
          { mall_name: 'G마켓', price: 1469000, url: 'https://gmarket.co.kr' },
        ],
      },
      {
        product_code: 10004,
        product_name: 'LG 그램 17 2024 (17Z90S-G.AA7CK)',
        brand: 'LG 그램',
        sub_category: 'LG 그램',
        specs: {
          화면크기: '43.2cm (17인치)',
          무게: '1.35kg',
          CPU: '인텔 코어 Ultra 7',
          배터리: '77Wh',
        },
        base_price: 2099000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '11번가', price: 2099000, url: 'https://11st.co.kr' },
          { mall_name: '쿠팡', price: 2049000, url: 'https://coupang.com' },
        ],
      },
      {
        product_code: 10005,
        product_name: 'LG 그램 Pro 16 2024 (16Z90SP-G.AA7CK)',
        brand: 'LG 그램',
        sub_category: 'LG 그램',
        specs: {
          화면크기: '40.6cm (16인치)',
          무게: '1.39kg',
          CPU: '인텔 코어 Ultra 7',
          GPU: 'RTX 3050',
        },
        base_price: 2499000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '쿠팡', price: 2499000, url: 'https://coupang.com' },
          { mall_name: '네이버', price: 2479000, url: 'https://shopping.naver.com' },
        ],
      },
      {
        product_code: 10006,
        product_name: 'LG 그램 Pro 17 2024 (17Z90SP-G.AA9CK)',
        brand: 'LG 그램',
        sub_category: 'LG 그램',
        specs: {
          화면크기: '43.2cm (17인치)',
          무게: '1.45kg',
          CPU: '인텔 코어 Ultra 9',
          GPU: 'RTX 3050',
        },
        base_price: 2899000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '11번가', price: 2899000, url: 'https://11st.co.kr' },
          { mall_name: 'G마켓', price: 2859000, url: 'https://gmarket.co.kr' },
        ],
      },
      {
        product_code: 10007,
        product_name: 'LG 그램 2in1 16 2024 (16T90S-G.AA7CK)',
        brand: 'LG 그램',
        sub_category: 'LG 그램',
        specs: {
          화면크기: '40.6cm (16인치)',
          무게: '1.48kg',
          CPU: '인텔 코어 Ultra 7',
          터치: 'OLED 터치스크린',
        },
        base_price: 2299000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '쿠팡', price: 2299000, url: 'https://coupang.com' },
          { mall_name: '네이버', price: 2279000, url: 'https://shopping.naver.com' },
        ],
      },
      {
        product_code: 10008,
        product_name: 'LG 그램 Style 14 2024 (14Z90S-G.STYLECK)',
        brand: 'LG 그램',
        sub_category: 'LG 그램',
        specs: {
          화면크기: '35.6cm (14인치)',
          무게: '0.99kg',
          CPU: '인텔 코어 Ultra 5',
          색상: '스노우 화이트',
        },
        base_price: 1549000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '쿠팡', price: 1549000, url: 'https://coupang.com' },
          { mall_name: '11번가', price: 1569000, url: 'https://11st.co.kr' },
        ],
      },
      // Apple 맥북
      {
        product_code: 78528251,
        product_name: 'Apple 2024 맥북 에어 13 M3',
        brand: 'Apple',
        sub_category: '맥북',
        specs: {
          CPU: 'M3 8코어',
          GPU: '10코어',
          RAM: '16GB',
          SSD: '512GB',
          Display: 'Liquid Retina',
        },
        base_price: 1730000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '쿠팡', price: 1750000, url: 'https://coupang.com' },
          { mall_name: '11번가', price: 1780000, url: 'https://11st.co.kr' },
        ],
      },
      // 삼성 갤럭시북
      {
        product_code: 20001,
        product_name: '삼성 갤럭시북4 프로 (NT940XGK-K71A)',
        brand: '삼성',
        sub_category: '갤럭시북',
        specs: {
          화면크기: '35.6cm (14인치)',
          무게: '1.23kg',
          CPU: '인텔 코어 Ultra 7',
          RAM: '16GB',
        },
        base_price: 1890000,
        category: '노트북',
        thumbnail_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop',
        mall_price: [
          { mall_name: '삼성닷컴', price: 1890000, url: 'https://samsung.com' },
          { mall_name: '쿠팡', price: 1850000, url: 'https://coupang.com' },
        ],
      },
    ],
  },
};
