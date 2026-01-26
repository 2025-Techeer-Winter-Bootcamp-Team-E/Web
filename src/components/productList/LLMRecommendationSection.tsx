import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import type { LlmRecommendationEntity } from '@/types/searchType';

interface LLMRecommendationCardProps {
  product: LlmRecommendationEntity;
  index: number;
}

const LLMRecommendationCard = ({ product, index }: LLMRecommendationCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (product.product_code) {
      navigate(PATH.PRODUCT_DETAIL(product.product_code));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={handleClick}
      className="flex w-56 flex-shrink-0 cursor-pointer flex-col rounded-2xl bg-white p-4 shadow-[0_2px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
    >
      <div className="mb-3 flex h-32 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.thumbnail_url || product.thumbnail_url}
          alt={product.product_name}
          className="h-full w-full object-contain"
        />
      </div>
      <h3 className="mb-2 line-clamp-2 text-sm font-light text-black">{product.product_name}</h3>
      <p className="mb-2 line-clamp-2 text-xs font-light text-gray-500">
        {product.recommendation_reason}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm font-medium text-black">{product.price.toLocaleString()}원</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-800"
        >
          구매
        </button>
      </div>
    </motion.div>
  );
};

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
          <LLMRecommendationCard
            key={product.product_code || product.product_code}
            product={product}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default LLMRecommendationSection;
