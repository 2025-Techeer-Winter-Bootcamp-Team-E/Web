import { useOutletContext, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LLMRecommendationSection from '@/components/productList/LLMRecommendationSection';
import ShoppingResultSection from '@/components/shoppingResearchResult/ShoppingResultSection';
import type { LlmRecommendationEntity, ShoppingResearchResultEntity } from '@/types/searchType';
import { useEffect, useRef } from 'react';
import Loading from '@/components/layout/Loading';

interface ChatbotContext {
  llmRecommendations: LlmRecommendationEntity[] | null;
  llmAnalysisMessage: string;
  shoppingResults: ShoppingResearchResultEntity[] | null;
  userQuery: string;
  isLoading: boolean;
  actions: {
    setIsLoading: (loading: boolean) => void;
    toggleAIPanel: (value?: boolean) => void;
    handleLlmResult: (products: LlmRecommendationEntity[], message: string) => void;
    handleShoppingResult: (products: ShoppingResearchResultEntity[], query: string) => void;
    handleSendMessage: (query: string) => Promise<void>;
  };
}

const AIAgentPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { llmRecommendations, llmAnalysisMessage, shoppingResults, isLoading, actions } =
    useOutletContext<ChatbotContext>();

  const shoppingResultRef = useRef<HTMLDivElement>(null);
  const llmResultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query && !llmRecommendations && !isLoading) {
      actions.handleSendMessage(query);
    }
  }, [query, llmRecommendations, isLoading, actions]);

  // LLM 결과가 나오면 해당 섹션으로 스크롤
  useEffect(() => {
    if (llmRecommendations && llmRecommendations.length > 0 && llmResultRef.current) {
      const timer = setTimeout(() => {
        const element = llmResultRef.current;
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [llmRecommendations]);

  useEffect(() => {
    if (shoppingResults && shoppingResults.length > 0 && shoppingResultRef.current) {
      const timer = setTimeout(() => {
        const element = shoppingResultRef.current;
        if (element) {
          const yOffset = -100; // 헤더 높이에 맞게 조절
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shoppingResults]);

  // 1. 초기 LLM 검색 로딩 (아직 LLM 결과도 없고 쇼핑 결과도 없을 때)
  if (isLoading && !llmRecommendations && !shoppingResults) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading title="Searching..." message="상품을 찾는 중입니다..." />
      </div>
    );
  }

  // 2. 쇼핑 리서치 로딩 중 (LLM 결과는 있지만 쇼핑 리서치 진행 중)
  if (isLoading && llmRecommendations && !shoppingResults) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading title="Shopping Research" message="상품을 찾는 중입니다..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <AnimatePresence mode="wait">
          {/* 1. LLM 결과 섹션: 데이터가 있을 때만 렌더링 */}
          {llmRecommendations && (
            <motion.section
              ref={llmResultRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <LLMRecommendationSection
                products={llmRecommendations}
                analysisMessage={llmAnalysisMessage}
              />
            </motion.section>
          )}

          {/* 2. 쇼핑 리서치 결과 섹션: 데이터가 있을 때만 렌더링 */}
          {shoppingResults && (
            <motion.section
              ref={shoppingResultRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 border-t border-gray-200 pt-16"
            >
              <ShoppingResultSection products={shoppingResults} />
            </motion.section>
          )}

          {/* 3. 대기 상태: 아무 데이터도 없을 때 */}
          {!query && !llmRecommendations && !shoppingResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-40 text-center"
            >
              <img src="/ai-logo.png" alt="AI" className="mb-6 h-20 w-20 opacity-20 grayscale" />
              <p className="text-xl font-light text-gray-400">
                우측 AI 패널에서 대화를 시작해 보세요.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIAgentPage;
