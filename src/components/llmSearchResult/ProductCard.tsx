import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PATH } from '@/routes/path';
import type { LLMRecommendationEntity } from '@/types/searchType';

interface ProductCardProps {
  product: LLMRecommendationEntity;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (product.product_detail_url) window.open(product.product_detail_url, '_blank');
    else navigate(PATH.PRODUCT_DETAIL(product.product_id));
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-md"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative h-64 w-full shrink-0 bg-gray-50 p-10 md:w-80">
          <img
            src={product.thumbnail_url}
            alt={product.product_name}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-6 left-6 rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] px-3 py-1 text-[11px] font-bold tracking-tight text-white">
            BEST PICK
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-10">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[12px] font-bold tracking-widest text-gray-500 uppercase">
                Recommendation
              </span>
              <ArrowUpRight className="h-5 w-5 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-gradient-purple)]" />
            </div>
            <h3 className="mb-2 line-clamp-2 text-[22px] leading-tight font-bold tracking-tight text-gray-900">
              {product.product_name}
            </h3>
            <p className="text-[26px] font-bold tracking-tighter text-gray-900 tabular-nums">
              {product.price.toLocaleString()}
              <span className="ml-1 text-[17px] font-medium text-gray-500">원</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {product.specs &&
                Object.entries(product.specs)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <span
                      key={key}
                      className="rounded-full bg-gray-100 px-4 py-1.5 text-[13px] font-medium text-gray-600"
                    >
                      {value}
                    </span>
                  ))}
            </div>
          </div>
          <div className="mt-10 rounded-xl bg-gray-50 p-6">
            <p className="mb-1.5 text-[11px] font-bold tracking-widest text-[var(--color-gradient-purple)] uppercase">
              AI Analysis
            </p>
            <p className="line-clamp-2 text-[15px] leading-relaxed font-medium text-gray-600">
              {product.recommendation_reason}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
