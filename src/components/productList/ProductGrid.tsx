import { AnimatePresence } from 'framer-motion';
import ProductGridCard from './ProductGridCard';
import type { Product } from '@/types/productType';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[3/4] animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-gray-500">No products found</p>
        <p className="mt-2 text-sm text-gray-400">Try a different search query</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Result</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All &gt;
        </button>
      </div>
      <AnimatePresence mode="wait">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductGridCard
              key={product.product_code}
              product={product}
              index={index}
            />
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;
