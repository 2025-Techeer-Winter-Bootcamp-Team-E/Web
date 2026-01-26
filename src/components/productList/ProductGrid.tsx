import type { ProductListItem } from '@/types/productsType';
import ProductGridCard from './ProductGridCard';

interface ProductGridProps {
  products: ProductListItem[];
  isLoading?: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="aspect-[3/4] w-full animate-pulse rounded-2xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-medium text-gray-500">상품을 찾을 수 없습니다</p>
        <p className="mt-2 text-sm text-gray-400">다른 검색어로 시도해보세요</p>
      </div>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {products.map((product, index) => (
          <ProductGridCard key={product.product_code} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
