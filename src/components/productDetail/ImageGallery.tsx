import { Share2, ShoppingCart, Minus, Plus, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProductsCodeResDto } from '@/types/productsType';
import useCartItemPostMutation from '@/hooks/mutations/useCartItemPostMutation';
import { PATH } from '@/routes/path';

const ImageGallery = ({ data }: { data?: ProductsCodeResDto }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { mutate: addCartItem } = useCartItemPostMutation();

  if (!data) return null;

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addCartItem(
      {
        product_code: data.product_code,
        quantity,
      },
      {
        onSuccess: () => {
          alert('장바구니에 추가되었습니다.');
        },
      },
    );
  };

  const handleBuyNow = () => {
    navigate(PATH.CHECKOUT, {
      state: {
        mode: 'direct',
        directItem: {
          product_id: data.product_code,
          name: data.product_name,
          image: data.thumbnail_url,
          quantity: quantity,
          price: data.base_price,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="group relative">
        <div className="flex max-h-[400px] w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          <img
            src={data.thumbnail_url}
            alt={data.product_name}
            className="h-full max-h-[400px] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <button className="absolute right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-md transition-all hover:bg-white">
          <Share2 className="h-4 w-4 text-[#1d1d1f]" />
        </button>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
        <span className="text-sm font-medium text-gray-700">수량</span>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-1">
          <button
            onClick={handleDecrease}
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-gray-100"
          >
            <Minus className="h-3 w-3 text-gray-600" />
          </button>
          <span className="min-w-6 text-center text-sm font-bold text-gray-900">
            {quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-gray-100"
          >
            <Plus className="h-3 w-3 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAddToCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-50 active:scale-[0.98]"
        >
          <ShoppingCart className="h-4 w-4" strokeWidth={2} />
          장바구니
        </button>
        <button
          onClick={handleBuyNow}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
        >
          <CreditCard className="h-4 w-4" strokeWidth={2} />
          구매하기
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
