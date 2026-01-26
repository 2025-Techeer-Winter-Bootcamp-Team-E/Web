import {
  myPageAllTImerPaging,
  successTimePatch,
  successTimerDelete,
  suceessTimerGet,
  suceessTimerPost,
} from '@/mocks/data/timer';
import { http, HttpResponse } from 'msw';

const API_BASE = '*/api/v1';

export const timerHandler = [
  // 타이머 조회 (쿼리 파라미터로 필터링)
  http.get(`${API_BASE}/timers/:product_code`, ({ params }) => {
    const { product_code: _product_code } = params;
    return HttpResponse.json(suceessTimerGet);
  }),

  http.get(`${API_BASE}/timers/`, () => {
    return HttpResponse.json(myPageAllTImerPaging);
  }),

  // 타이머 등록
  http.post(`${API_BASE}/timers/`, async ({ request }) => {
    const body = await request.json();
    console.log('✅ 타이머 등록:', body);
    return HttpResponse.json(suceessTimerPost);
  }),

  // 타이머 수정 (동적 ID 처리)
  http.patch(`${API_BASE}/timers/:id`, ({ params }) => {
    console.log('✅ 타이머 수정:', params.id);
    return HttpResponse.json(successTimePatch);
  }),

  // 타이머 삭제 (동적 ID 처리)
  http.delete(`${API_BASE}/timers/detail/:id`, ({ params }) => {
    console.log('✅ 타이머 삭제:', params.id);
    return HttpResponse.json(successTimerDelete);
  }),
];
