import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/productType';
import { PATH } from '@/routes/path';

interface ProductGridCardProps {
  product: Product;
  index?: number;
}

const ProductGridCard = ({ product, index = 0 }: ProductGridCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.PRODUCT_DETAIL(product.product_code));
  };

  // Calculate row for staggered animation
  const row = Math.floor(index / 4);

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-2xl bg-white p-3 shadow-[0_2px_15px_rgba(0,0,0,0.08)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-w-[220px] animate-slideUp"
      style={{ animationDelay: `${row * 500}ms` }}
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.thumbnail_url || '/api/placeholder/300/300'}
          alt={product.product_name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="line-clamp-2 text-sm font-light text-black">
          {product.product_name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-medium text-black">
            {product.base_price?.toLocaleString() || '0'}
          </span>
          <span className="text-xs font-light text-gray-400">원</span>
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
