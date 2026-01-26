import { Target, Sparkles } from 'lucide-react';
import type { ShoppingResearchResultEntity } from '@/types/searchType';

interface FeaturedProductCardProps {
  product?: ShoppingResearchResultEntity;
}

const FeaturedProductCard = ({ product }: FeaturedProductCardProps) => {
  if (!product) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 px-1">
        <Target className="h-5 w-5 text-[#1d1d1f]" strokeWidth={2.5} />
        <h2 className="text-[22px] font-bold tracking-tight text-[#1d1d1f]">최적 상품 추천</h2>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex h-70 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 lg:w-100">
            <img
              src={product.product_image_url}
              alt={product.product_name}
              className="h-3/4 w-3/4 object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between py-2">
            <div>
              <h3 className="mb-4 text-[32px] leading-tight font-bold tracking-tight text-gray-900">
                {product.product_name}
              </h3>
              <div className="flex items-baseline gap-3">
                <span className="text-[28px] font-bold tracking-tighter text-[#1d1d1f]">
                  {product.price}
                </span>
                <span className="text-[15px] font-medium text-[#86868b] line-through opacity-60">
                  {product.price}
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--color-gradient-purple)]" />
                <p className="text-[15px] font-bold text-gray-900">
                  {product.recommendation_reason}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(product.product_specs).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-3">
                    <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-gradient-purple)]" />
                    <p className="text-[14px] leading-relaxed font-medium text-gray-600">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
