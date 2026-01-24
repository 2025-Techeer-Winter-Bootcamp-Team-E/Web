import React from 'react';
import { Target, Sparkles } from 'lucide-react';

interface FeaturedProductCardProps {
  product: {
    badge: string;
    category: string;
    name: string;
    price: string;
    originalPrice: string;
    image: string;
    reasons: {
      title: string;
      items: string[];
    };
  };
}
const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 px-1">
        <Target className="h-5 w-5 text-[#1d1d1f]" strokeWidth={2.5} />
        <h2 className="text-[22px] font-bold tracking-tight text-[#1d1d1f]">최적 상품 추천</h2>
      </div>
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-10 shadow-sm">
        <div className="absolute top-6 right-6">
          <div className="rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] px-3 py-1 text-[11px] font-bold text-white">
            {product.badge}
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex h-70 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 lg:w-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-3/4 w-3/4 object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between py-2">
            <div>
              <p className="mb-2 text-[12px] font-bold tracking-[0.05em] text-[var(--color-gradient-purple)] uppercase">
                {product.category}
              </p>
              <h3 className="mb-4 text-[32px] leading-tight font-bold tracking-tight text-gray-900">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-3">
                <span className="text-[28px] font-bold tracking-tighter text-[#1d1d1f]">
                  {product.price}
                </span>
                <span className="text-[15px] font-medium text-[#86868b] line-through opacity-60">
                  {product.originalPrice}
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-5 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--color-gradient-purple)]" />
                <p className="text-[15px] font-bold text-gray-900">{product.reasons.title}</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {product.reasons.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-gradient-purple)]" />
                    <p className="text-[14px] leading-relaxed font-medium text-gray-600">{item}</p>
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
