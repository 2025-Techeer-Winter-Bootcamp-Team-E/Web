import type { ProductSpecs } from '@/types/searchType';

export interface Product {
  product_code: number;
  product_name: string;
  brand: string;
  specs?: ProductSpecs;
  base_price: number;
  category?: string;
  thumbnail_url: string;
  product_image_url_list?: string[];
  product_detail_url?: string;
  mall_price?: {
    mall_name: string;
    price: number;
    url: string;
  }[];
}
