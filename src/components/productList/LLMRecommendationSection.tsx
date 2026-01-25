import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { LLMRecommendationEntity } from '@/types/searchType';

interface LLMRecommendationCardProps {
  product: LLMRecommendationEntity;
  index: number;
}

const LLMRecommendationCard = ({ product, index }: LLMRecommendationCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.product_code}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={handleClick}
      className="flex w-56 flex-shrink-0 cursor-pointer flex-col border border-gray-100 bg-white p-4 transition-all hover:border-black"
    >
      <div className="mb-3 flex h-32 items-center justify-center overflow-hidden bg-gray-50">
        <img
          src={product.thumbnail_url || product.product_image_url}
          alt={product.product_name}
          className="h-full w-full object-contain"
        />
      </div>
      <h3 className="mb-2 line-clamp-2 text-sm font-light text-black">
        {product.product_name}
      </h3>
      <p className="mb-2 line-clamp-2 text-xs font-light text-gray-500">
        {product.recommendation_reason}
      </p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm font-medium text-black">
          {product.price.toLocaleString()}원
        </span>
        <span className="border border-black px-2 py-0.5 text-xs font-light text-black">
          AI
        </span>
      </div>
    </motion.div>
  );
};

interface LLMRecommendationSectionProps {
  products: LLMRecommendationEntity[];
  analysisMessage?: string;
}

const LLMRecommendationSection = ({
  products,
  analysisMessage,
}: LLMRecommendationSectionProps) => {
  if (products.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center bg-black">
          <span className="text-xs font-light text-white">AI</span>
        </div>
        <div>
          <h2 className="text-lg font-light tracking-wide text-black">AI 추천 상품</h2>
          {analysisMessage && (
            <p className="text-sm font-light text-gray-500">{analysisMessage}</p>
          )}
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product, index) => (
          <LLMRecommendationCard
            key={product.product_id || product.product_code}
            product={product}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default LLMRecommendationSection;
