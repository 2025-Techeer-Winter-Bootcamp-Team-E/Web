import type { LlmRecommendationEntity } from '@/types/searchType';
import LLMRecommendationCard from '@/components/productList/LLMRecommendationCard';

interface LLMRecommendationSectionProps {
  products: LlmRecommendationEntity[];
  analysisMessage?: string;
}

const LLMRecommendationSection = ({ products, analysisMessage }: LLMRecommendationSectionProps) => {
  if (products.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-wide text-black">AI 추천 상품</h2>
        {analysisMessage && (
          <p className="mt-1 text-sm font-light text-gray-500">{analysisMessage}</p>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product, index) => (
          <LLMRecommendationCard key={product.product_code} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default LLMRecommendationSection;
