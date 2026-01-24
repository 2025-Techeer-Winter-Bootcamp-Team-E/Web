import type {
  LLMRecommendationEntity,
  QuestionEntity,
  ShoppingResultEntity,
} from './searchType';

export interface Product {
  product_code: number;
  product_name: string;
  brand: string;
  base_price: number;
  thumbnail_url: string;
}

export type ChatMessageType =
  | 'text'
  | 'llm_result'
  | 'shopping_prompt'
  | 'shopping_question'
  | 'shopping_result';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: ChatMessageType;
  products?: Product[];
  llmProducts?: LLMRecommendationEntity[];
  shoppingResults?: ShoppingResultEntity[];
  questionData?: QuestionEntity;
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  currentQuery: string;
}
