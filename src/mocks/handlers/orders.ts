import {
  cartAdd,
  cartDelete,
  cartItemCheckout,
  cartItems,
  myTokenCharge,
  successTokenCharge,
} from '@/mocks/data/orders';
import { http, HttpResponse } from 'msw';

const API_BASE = '*/api/v1';

export const ordersHandler = [
  http.get(`${API_BASE}/orders/tokens/`, () => {
    return HttpResponse.json(myTokenCharge);
  }),
  http.post(`${API_BASE}/orders/tokens/recharge/`, () => {
    return HttpResponse.json(successTokenCharge);
  }),
  http.post(`${API_BASE}/orders/cart/checkout/`, () => {
    return HttpResponse.json(cartItemCheckout);
  }),
  http.post(`${API_BASE}/orders/cart/`, () => {
    return HttpResponse.json(cartAdd);
  }),
  http.delete(`${API_BASE}/orders/cart/:id`, () => {
    return HttpResponse.json(cartDelete);
  }),
  http.get(`${API_BASE}/orders/cart/`, () => {
    return HttpResponse.json(cartItems);
  }),
];
