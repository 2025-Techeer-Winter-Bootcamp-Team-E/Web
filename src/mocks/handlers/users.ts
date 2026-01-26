import { userProfile, userSignIn, usersLogin } from '@/mocks/data/users';
import { http, HttpResponse } from 'msw';

const API_BASE = '*/api/v1';

export const usersHandler = [
  http.get(`${API_BASE}/users/`, () => {
    return HttpResponse.json(userProfile);
  }),

  http.get(`${API_BASE}/users/me/`, () => {
    return HttpResponse.json(userProfile);
  }),

  http.post(`${API_BASE}/users/login/`, async () => {
    return HttpResponse.json(usersLogin);
  }),

  http.post(`${API_BASE}/users/signup/`, async () => {
    return HttpResponse.json(userSignIn);
  }),
];
