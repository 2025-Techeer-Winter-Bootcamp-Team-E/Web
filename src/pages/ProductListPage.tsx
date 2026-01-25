import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LLMRecommendationSection from '@/components/productList/LLMRecommendationSection';
import ProductGrid from '@/components/productList/ProductGrid';
import AIChatbotPanel from '@/components/chatbot/AIChatbotPanel';
import useProductListQuery from '@/hooks/queries/useProductListQuery';
import type { LLMRecommendationEntity } from '@/types/searchType';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentQuery, setCurrentQuery] = useState('');
  const [llmRecommendations, setLlmRecommendations] = useState<LLMRecommendationEntity[] | null>(
    null
  );
  const [llmAnalysisMessage, setLlmAnalysisMessage] = useState<string>('');
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  const searchQuery = searchParams.get('q') || '';
  const mainCat = searchParams.get('main_cat') || '';
  const subCat = searchParams.get('sub_cat') || '';
  const minPrice = searchParams.get('min_price') || '';
  const maxPrice = searchParams.get('max_price') || '';
  const sort = searchParams.get('sort') || 'popular';
  const page = Number(searchParams.get('page')) || 1;
  const aiOpen = searchParams.get('ai_open') === 'true';

  // Auto-open AI panel if ai_open param is true
  useEffect(() => {
    if (aiOpen && !isAIPanelOpen) {
      setIsAIPanelOpen(true);
      // Remove ai_open param from URL after opening
      const params = Object.fromEntries(searchParams.entries());
      delete params.ai_open;
      setSearchParams(params, { replace: true });
    }
  }, [aiOpen]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentQuery(searchQuery);
    }
  }, [searchQuery]);

  const updateURL = (newParams: Record<string, string | number | undefined>) => {
    const params = Object.fromEntries(searchParams.entries());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        delete params[key];
      } else {
        params[key] = String(value);
      }
    });

    setSearchParams(params, { replace: true });
  };

  const queryParams = {
    q: currentQuery || undefined,
    main_cat: mainCat || undefined,
    sub_cat: subCat || undefined,
    min_price: minPrice ? Number(minPrice) : undefined,
    max_price: maxPrice ? Number(maxPrice) : undefined,
    sort: sort as 'price_low' | 'price_high' | 'popular',
    page,
    page_size: 20,
  };

  const { data, isLoading } = useProductListQuery(queryParams);

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    updateURL({ q: query, page: 1 });
  };

  const handleLlmResult = (products: LLMRecommendationEntity[], analysisMessage: string) => {
    setLlmRecommendations(products);
    setLlmAnalysisMessage(analysisMessage);
  };

  const products = data?.products || [];

  return (
    <div className="flex min-h-screen bg-white">
      <div
        className={`flex-1 overflow-y-auto transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAIPanelOpen ? 'mr-[340px]' : 'mr-0'
        }`}
      >
        {/* Content Area - Aligned with Header, pt-20 accounts for filter bar row */}
        <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-20 pb-6">
          {llmRecommendations && llmRecommendations.length > 0 && (
            <div className="mb-6">
              <LLMRecommendationSection
                products={llmRecommendations}
                analysisMessage={llmAnalysisMessage}
              />
            </div>
          )}

          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>

      {/* AI Panel - Fixed Position */}
      <AnimatePresence>
        {isAIPanelOpen && (
          <motion.div
            initial={{ x: 340, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 340, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 top-32 z-40 h-[calc(100vh-160px)] w-[340px] overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <AIChatbotPanel
                onSearch={handleSearch}
                onLlmResult={handleLlmResult}
                initialQuery={searchQuery}
                onClose={() => setIsAIPanelOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button - Fixed Position */}
      <AnimatePresence>
        {!isAIPanelOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsAIPanelOpen(true)}
            className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center bg-black text-white shadow-lg transition-all hover:bg-gray-800"
          >
            <MessageSquare className="h-6 w-6" strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListPage;
