import { useState, useEffect, useCallback } from 'react';
import type { LlmRecommendationEntity, ShoppingResearchResultEntity } from '@/types/searchType';
import useLlmRecoMutation from '@/hooks/mutations/useLlmRecoMutation';

const STORAGE_KEY = 'ai_panel_open';

export const useChatbotData = () => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'true';
  });

  const [llmRecommendations, setLlmRecommendations] = useState<LlmRecommendationEntity[] | null>(
    null,
  );
  const [llmAnalysisMessage, setLlmAnalysisMessage] = useState('');
  const [shoppingResults, setShoppingResults] = useState<ShoppingResearchResultEntity[] | null>(
    null,
  );
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const llmMutation = useLlmRecoMutation();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isAIPanelOpen));
  }, [isAIPanelOpen]);

  const toggleAIPanel = (value?: boolean) => {
    setIsAIPanelOpen((prev) => (value !== undefined ? value : !prev));
  };

  const handleLlmResult = (products: LlmRecommendationEntity[], analysisMessage: string) => {
    setIsLoading(false);
    setLlmRecommendations(products);
    setLlmAnalysisMessage(analysisMessage);
    setShoppingResults(null);
  };

  const handleShoppingResult = (products: ShoppingResearchResultEntity[], query: string) => {
    setIsLoading(false);
    setShoppingResults(products);
    setUserQuery(query);
  };

  const handleSendMessage = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      setIsLoading(true);
      setUserQuery(query);

      try {
        const result = await llmMutation.mutateAsync({ user_query: query });
        handleLlmResult(result.recommended_products, result.analysis_message);
      } catch (error) {
        console.error('Search error:', error);
        setIsLoading(false);
      }
    },
    [llmMutation],
  );

  return {
    state: {
      isLoading,
      isAIPanelOpen,
      llmRecommendations,
      llmAnalysisMessage,
      shoppingResults,
      userQuery,
    },
    actions: {
      setIsLoading,
      toggleAIPanel,
      handleLlmResult,
      handleShoppingResult,
      handleSendMessage,
    },
  };
};
