import { API } from '@/constants/api';
import {
  deleteRecentSearch,
  llmSearch,
  searchAutoComplete,
  searchPopluar,
  searchRecent,
  ShoppingResearchQuestion,
  ShoppingResearchResule,
} from '@/mocks/data/search';
import { http, HttpResponse, delay } from 'msw';

export const searchHandler = [
  http.get(API.SEARCH_RECENT, () => {
    return HttpResponse.json(searchRecent);
  }),
  http.delete('/search/recent/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json(deleteRecentSearch);
  }),

  http.get(API.SEARCH_POPULAR, () => {
    return HttpResponse.json(searchPopluar);
  }),
  http.get(/\/search\/autocomplete.*/, () => {
    return HttpResponse.json(searchAutoComplete);
  }),

  http.post(API.SEARCH_LLM_RECOMMENDATION, async () => {
    await delay(5000);
    return HttpResponse.json(llmSearch);
  }),

  // 슬래시 포함하도록 수정
  http.post(API.SEARCH_QUESTION, async ({ request }) => {
    const body = await request.json();
    console.log('Shopping Research Questions Request:', body);
    await delay(5000);
    return HttpResponse.json(ShoppingResearchQuestion);
  }),

  http.post(API.SEARCH_SHOPPING_RESEARCH, async ({ request }) => {
    const body = await request.json();
    console.log('Shopping Research Result Request:', body);
    console.log('Shopping Research Result Response:', ShoppingResearchResule);
    await delay(5000);
    return HttpResponse.json(ShoppingResearchResule);
  }),
];
