import { Target, Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ShoppingResearchResultEntity } from '@/types/searchType';
import StarRating from '@/components/shoppingResearchResult/StarRating';
import { Link } from 'react-router-dom';
import { PATH } from '@/routes/path';

interface ShoppingResultSectionProps {
  products: ShoppingResearchResultEntity[];
}

const ShoppingResultSection = ({ products }: ShoppingResultSectionProps) => {
  if (!products || products.length === 0) return null;

  const topProduct = products[0];
  const comparisonProducts = products.slice(1);

  return (
    <div className="w-full space-y-12">
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-black" />
            <h2 className="text-2xl font-bold tracking-wide text-black">쇼핑 리서치 추천 상품</h2>
          </div>
        </div>

        <Link
          to={PATH.PRODUCT_DETAIL(topProduct.product_code)}
          className="group block overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md md:p-8"
        >
          <div className="flex flex-col gap-8 md:flex-row">
            {/* 이미지 영역 */}
            <div className="flex aspect-square w-full shrink-0 items-center justify-center rounded-lg bg-gray-50 md:w-64">
              <img
                src={topProduct.product_image_url}
                alt={topProduct.product_name}
                className="h-3/4 w-3/4 object-contain mix-blend-multiply transition-transform group-hover:scale-105"
              />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex flex-1 flex-col justify-center">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded bg-black px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                  Best Match
                </span>
                <StarRating rating={Math.round(topProduct.performance_score * 5)} />
              </div>

              <h4 className="text-xl leading-tight font-semibold text-black md:text-2xl">
                {topProduct.product_name}
              </h4>

              <div className="mt-4 border-l-2 border-gray-100 pl-4">
                <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                  <Sparkles className="mr-1.5 inline h-4 w-4 text-amber-500" />
                  {topProduct.recommendation_reason}
                </p>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-black">
                  {topProduct.price.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* 2. 다른 대안 (LLM 그리드 스타일 적용) */}
      {comparisonProducts.length > 0 && (
        <section>
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-black" />
              <h3 className="text-xl font-bold tracking-wide text-black">다른 추천 상품</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comparisonProducts.map((product) => (
              <motion.div
                key={product.product_code}
                whileHover={{ y: -4 }}
                className="flex flex-col"
              >
                <Link
                  to={PATH.PRODUCT_DETAIL(product.product_code)}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="flex h-48 shrink-0 items-center justify-center bg-gray-50/50 p-6">
                    <img
                      src={product.product_image_url}
                      alt={product.product_name}
                      className="h-full w-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h5 className="line-clamp-2 min-h-10 text-[15px] font-light text-black">
                      {product.product_name}
                    </h5>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-medium text-black">
                        {product.price.toLocaleString()}원
                      </span>
                      <div className="scale-90 opacity-80">
                        <StarRating rating={Math.round(product.performance_score * 5)} />
                      </div>
                    </div>

                    {/* 스펙 요약 리스트 (심플하게 조정) */}
                    <div className="mt-4 space-y-1.5 border-t border-gray-50 pt-4">
                      {Object.entries(product.product_specs.summary || {})
                        .slice(0, 3)
                        .map(([key, value]) => (
                          <div key={key} className="flex justify-between text-[11px]">
                            <span className="text-gray-400 uppercase">{key}</span>
                            <span className="font-medium text-gray-700">{String(value)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ShoppingResultSection;
