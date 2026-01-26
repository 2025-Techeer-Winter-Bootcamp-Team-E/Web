import { createPortal } from 'react-dom';
import { X, Target, Sparkles, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ShoppingResearchResultEntity } from '@/types/searchType';
import StarRating from '@/components/shoppingResearchResult/StarRating';
import { Link } from 'react-router-dom';
import { PATH } from '@/routes/path';

interface ShoppingResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ShoppingResearchResultEntity[];
  userQuery: string;
}

const ShoppingResultModal = ({
  isOpen,
  onClose,
  products,
  userQuery,
}: ShoppingResultModalProps) => {
  if (!isOpen || !products || products.length === 0) return null;

  const topProduct = products[0];
  const comparisonProducts = products.slice(1);

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md md:items-center md:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden bg-[#f5f5f7] shadow-2xl md:h-[90vh] md:rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 py-4 md:px-8 md:py-6">
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-bold text-gray-900 md:text-2xl">
                쇼핑 리서치 결과
              </h2>
              <p className="truncate text-xs text-gray-500 md:text-sm">{userQuery}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-black hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="scrollbar-hide flex-1 overflow-x-hidden overflow-y-auto">
            <div className="mx-auto max-w-5xl space-y-10 p-5 pb-32 md:p-8 md:pb-40">
              <section className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-bold md:text-xl">최적의 선택</h3>
                </div>
                <Link
                  to={PATH.PRODUCT_DETAIL(topProduct.product_code)}
                  className="block overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-sm ring-2 ring-blue-500/10 transition-shadow hover:no-underline hover:shadow-md md:p-8"
                >
                  <div className="flex flex-col gap-8 md:flex-row">
                    <div className="flex aspect-square w-full shrink-0 items-center justify-center rounded-2xl bg-gray-50 md:w-64">
                      <img
                        src={topProduct.product_image_url}
                        alt={topProduct.product_name}
                        className="h-4/5 w-4/5 object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <span className="mb-2 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase">
                        Best Match
                      </span>
                      <h4 className="text-xl leading-tight font-extrabold text-gray-900 md:text-2xl">
                        {topProduct.product_name}
                      </h4>
                      <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
                        <Sparkles className="mr-1 inline h-4 w-4 text-amber-500" />{' '}
                        {topProduct.recommendation_reason}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
                        <span className="text-2xl font-black text-gray-900">
                          {topProduct.price.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>

              {comparisonProducts.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <RefreshCw className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-bold md:text-xl">함께 비교해보세요</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {comparisonProducts.map((product) => (
                      <Link
                        to={PATH.PRODUCT_DETAIL(product.product_code)}
                        key={product.product_code}
                        className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
                      >
                        <div className="flex h-44 shrink-0 items-center justify-center bg-gray-50/50 p-6">
                          <img
                            src={product.product_image_url}
                            alt={product.product_name}
                            className="h-full w-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h5 className="line-clamp-2 min-h-10 text-[15px] font-bold text-gray-900">
                            {product.product_name}
                          </h5>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-bold text-gray-900">
                              {product.price.toLocaleString()}원
                            </span>
                            <div className="origin-right scale-75 opacity-70">
                              <StarRating rating={Math.round(product.performance_score * 5)} />
                            </div>
                          </div>
                          <div className="mt-4 space-y-2 border-t border-gray-50 pt-4">
                            {Object.entries(product.product_specs || {})
                              .slice(0, 4)
                              .map(([key, value]) => (
                                <div
                                  key={key}
                                  className="flex justify-between text-[11px] leading-4"
                                >
                                  <span className="tracking-tighter text-gray-400 uppercase">
                                    {key}
                                  </span>
                                  <span className="max-w-32.5 truncate text-right font-medium text-gray-600">
                                    {String(value)}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-10 bg-linear-to-t from-[#f5f5f7] to-transparent md:rounded-b-3xl" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ShoppingResultModal;
