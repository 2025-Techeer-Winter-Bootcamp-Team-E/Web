import type { LlmRecommendationEntity, ResearchQuestionEntity, ShoppingResearchResultEntity } from "@/types/searchType";

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
  llmProducts?: LlmRecommendationEntity[];
  shoppingResults?: ShoppingResearchResultEntity[];
  questionData?: ResearchQuestionEntity;
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  currentQuery: string;
}
