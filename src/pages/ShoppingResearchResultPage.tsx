import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useShoppingResultMutation from '@/hooks/mutations/useShoppingResultMutation';
import { PATH } from '@/routes/path';
import {
  ComparisonTable,
  CTASection,
  FeaturedProductCard,
  StatusBanner,
} from '@/components/shoppingResearchResult';
import SearchModal from '@/components/layout/SearchModal';

const ShoppingResearchResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const [searchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('q') || '';
  const { user_query, survey_contents, search_id } = state || {};

  const [results, setResults] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const mutation = useShoppingResultMutation();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    if (!user_query || !survey_contents || !search_id) {
      setIsLoading(false);
      return;
    }

    mutation.mutate(
      { search_id, user_query, survey_contents },
      {
        onSuccess: (response) => {
          if (response?.product && Array.isArray(response.product)) {
            setResults(response);
          }
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    );
  }, []);

  const handleRetry = () => {
    navigate(`${PATH.SHOPPING_RESEARCH}?q=${encodeURIComponent(queryFromUrl || user_query)}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="h-10 w-10 animate-spin text-[var(--color-gradient-purple)]" strokeWidth={1.5} />
          <p className="text-[17px] font-medium tracking-tight text-gray-500">
            AI가 최적의 상품을 분석하고 있습니다
          </p>
        </div>
      </div>
    );
  }

  if (!results || !results.product || results.product.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
        <p className="mb-8 text-[19px] font-semibold text-gray-900">
          검색 결과를 찾을 수 없습니다.
        </p>
        <button
          onClick={handleRetry}
          className="rounded-xl bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] px-8 py-3.5 font-bold text-white transition-all hover:opacity-90 active:scale-95"
        >
          다시 검색하기
        </button>
      </div>
    );
  }

  const products = results.product;
  const topProduct = products[0];

  const featuredProductData = {
    badge: `MATCH ${(topProduct.similarity_score * 100).toFixed(0)}%`,
    category: 'TOP SELECTION',
    name: topProduct.product_name,
    price: `${topProduct.price.toLocaleString()}원`,
    originalPrice: `${(topProduct.price * 1.15).toLocaleString()}원`,
    image: topProduct.product_image_url,
    reasons: {
      title: 'AI 추천 분석',
      items: [topProduct.recommendation_reason, topProduct.ai_review_summary],
    },
  };

  const comparisonProducts = products.map((p: any) => ({
    id: p.product_code,
    name: p.product_name,
    image: p.product_image_url,
    price: p.price,
    performance_score: p.performance_score,
    cpu: p.product_specs.cpu,
    ram: p.product_specs.ram,
    is_lowest_price: p.optimal_product_info.is_lowest_price,
  }));

  return (
    <div className="min-h-screen bg-white pt-12 pb-32">
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        <StatusBanner text={results.user_query} mode="Analysis Insight" />
        <FeaturedProductCard product={featuredProductData} />

        {products.length > 1 && (
          <ComparisonTable title="주요 추천 상품 비교" products={comparisonProducts} />
        )}

        <CTASection buttonText="다시 검색하기" onRetry={() => setIsSearchModalOpen(true)} />
      </div>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        initialType="shopping-research"
      />{' '}
    </div>
  );
};

export default ShoppingResearchResultPage;
