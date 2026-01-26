import {
  deleteRecentSearch,
  llmSearch,
  searchAutoComplete,
  searchPopluar,
  searchRecent,
  ShoppingResearchQuestion,
  ShoppingResearchResule,
} from '@/mocks/data/search';
import { http, HttpResponse } from 'msw';

const API_BASE = '*/api/v1';

export const searchHandler = [
  http.get(`${API_BASE}/search/recent/`, () => {
    return HttpResponse.json(searchRecent);
  }),
  http.delete(`${API_BASE}/search/recent/:id`, ({ params }) => {
    const { id: _id } = params;
    return HttpResponse.json(deleteRecentSearch);
  }),

  http.get(`${API_BASE}/search/popular/`, () => {
    return HttpResponse.json(searchPopluar);
  }),
  http.get(`${API_BASE}/search/autocomplete/`, () => {
    return HttpResponse.json(searchAutoComplete);
  }),
  http.post(`${API_BASE}/search/llm-recommendation/`, async () => {
    return HttpResponse.json(llmSearch);
  }),
  http.post(`${API_BASE}/search/questions/`, async () => {
    return HttpResponse.json(ShoppingResearchQuestion);
  }),
  http.post(`${API_BASE}/search/shopping-research/`, async () => {
    return HttpResponse.json(ShoppingResearchResule);
  }),
];
