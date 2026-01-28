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
      className="flex h-full w-full shrink-0 cursor-pointer flex-col rounded-2xl bg-white p-4 shadow-[0_2px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.thumbnail_url}
          alt={product.product_name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mb-2 line-clamp-2 text-sm font-light text-black">{product.product_name}</h3>
      <p className="mb-2 text-xs font-light break-keep whitespace-pre-wrap text-gray-500">
        {product.recommendation_reason}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-light text-gray-800">최저가</span>
        <span className="text-sm font-medium text-black">
          {product.price.toLocaleString()}{' '}
          <span className="text-xs font-light text-gray-400">원</span>
        </span>
      </div>
    </motion.div>
  );
};
export default LLMRecommendationCard;
