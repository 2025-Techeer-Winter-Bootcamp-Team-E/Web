import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LLMRecommendationSection from '@/components/productList/LLMRecommendationSection';
import ProductGrid from '@/components/productList/ProductGrid';
import AIChatbotPanel from '@/components/chatbot/AIChatbotPanel';
import useProductListQuery from '@/hooks/queries/useProductListQuery';
import type { LlmRecommendationEntity } from '@/types/searchType';
import Pagination from '@/components/layout/Pagination';
import { PriceRangeFilter } from '@/components/productList';
import SortControl from '@/components/productList/Sortcontrol';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentQuery, setCurrentQuery] = useState('');
  const [llmRecommendations, setLlmRecommendations] = useState<LlmRecommendationEntity[] | null>(
    null,
  );
  const [llmAnalysisMessage, setLlmAnalysisMessage] = useState<string>('');
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  const searchQuery = searchParams.get('q') || '';
  const aiQuery = searchParams.get('ai_query') || ''; // AI search query (separate from product filter)
  const mainCat = searchParams.get('main_cat') || '';
  const subCat = searchParams.get('sub_cat') || '';
  const minPrice = searchParams.get('min_price') || '';
  const maxPrice = searchParams.get('max_price') || '';
  const sort = searchParams.get('sort') || 'popular';
  const page = Number(searchParams.get('page')) || 1;

  const handleApplyPriceRange = (min: string, max: string) => {
    updateURL({
      min_price: min || undefined,
      max_price: max || undefined,
      page: 1,
    });
  };

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

  const handleLlmResult = (products: LlmRecommendationEntity[], analysisMessage: string) => {
    setLlmRecommendations(products);
    setLlmAnalysisMessage(analysisMessage);
  };

  const products = data?.products || [];

  const totalPages = data?.pagination.total_pages ?? 1;

  const handlePageChange = (newPage: number) => {
    updateURL({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (newSort: string) => {
    const params = Object.fromEntries(searchParams.entries());
    params.sort = newSort;
    params.page = '1';
    setSearchParams(params);
  };

  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <div
        className={`flex-1 overflow-y-auto transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAIPanelOpen ? 'mr-85' : 'mr-0'
        }`}
      >
        {/* Content Area - Aligned with Header, pt-20 accounts for filter bar row */}
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-6 lg:px-12">
          <div className="flex justify-between">
            <PriceRangeFilter
              initialMin={minPrice}
              initialMax={maxPrice}
              onApply={handleApplyPriceRange}
            />
            <SortControl currentSort={sort} onSortChange={handleSortChange} />
          </div>
          {llmRecommendations && llmRecommendations.length > 0 && (
            <div className="mb-6">
              <LLMRecommendationSection
                products={llmRecommendations}
                analysisMessage={llmAnalysisMessage}
              />
            </div>
          )}

          <ProductGrid products={products} isLoading={isLoading} />
          {data && data.pagination.count > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
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
            className="fixed top-35 right-6 z-40 h-[calc(100vh-170px)] w-85"
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
                initialQuery={aiQuery || searchQuery}
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
            className="fixed right-6 bottom-6 z-50 flex items-center justify-center"
          >
            <motion.img
              src="/ai-logo.png"
              alt="AI Assistant"
              className="h-20 w-20 object-contain drop-shadow-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.1 }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListPage;
