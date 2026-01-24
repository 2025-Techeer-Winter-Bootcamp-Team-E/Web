export interface Product {
  product_code: number;
  product_name: string;
  brand: string;
  base_price: number;
  thumbnail_url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  currentQuery: string;
}
