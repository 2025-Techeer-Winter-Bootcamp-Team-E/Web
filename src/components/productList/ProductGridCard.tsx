import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/types/productType';
import { PATH } from '@/routes/path';

interface ProductGridCardProps {
  product: Product;
  index: number;
}

const ProductGridCard = ({ product, index }: ProductGridCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATH.PRODUCT_DETAIL(product.product_code));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-gray-50 p-4 transition-all hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-white">
        <img
          src={product.thumbnail_url || '/api/placeholder/300/300'}
          alt={product.product_name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
          {product.product_name}
        </h3>
        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-600">4.5</span>
          <span className="text-xs text-gray-400">(120)</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            {product.base_price?.toLocaleString() || '0'}
          </span>
          <span className="text-xs text-gray-400">AED</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductGridCard;
