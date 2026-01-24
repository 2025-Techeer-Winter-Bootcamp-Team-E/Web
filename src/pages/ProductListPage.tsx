import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import FilterBar from '@/components/productList/FilterBar';
import StoreSection from '@/components/productList/StoreSection';
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

  const searchQuery = searchParams.get('q') || '';
  const mainCat = searchParams.get('main_cat') || '';
  const subCat = searchParams.get('sub_cat') || '';
  const minPrice = searchParams.get('min_price') || '';
  const maxPrice = searchParams.get('max_price') || '';
  const sort = searchParams.get('sort') || 'popular';
  const page = Number(searchParams.get('page')) || 1;

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

  const clearCategory = () => {
    updateURL({ main_cat: undefined, sub_cat: undefined, page: 1 });
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

  const handleFilterChange = (filters: Record<string, string>) => {
    updateURL({
      sort: filters.sort || undefined,
    });
  };

  const products = data?.products || [];

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* Category Filter Display */}
        {mainCat && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">카테고리:</span>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)]/10 to-[var(--color-gradient-blue)]/10 px-3 py-1.5">
              <span className="text-sm font-medium text-gray-900">
                {mainCat}
                {subCat && ` > ${subCat}`}
              </span>
              <button
                onClick={clearCategory}
                className="rounded-full p-0.5 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        <FilterBar onFilterChange={handleFilterChange} />

        <div className="mt-6">
          {llmRecommendations && llmRecommendations.length > 0 ? (
            <LLMRecommendationSection
              products={llmRecommendations}
              analysisMessage={llmAnalysisMessage}
            />
          ) : (
            <StoreSection />
          )}
        </div>

        <div className="mt-6">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>

      <div className="sticky top-0 h-screen">
        <AIChatbotPanel
          onSearch={handleSearch}
          onLlmResult={handleLlmResult}
          initialQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default ProductListPage;
