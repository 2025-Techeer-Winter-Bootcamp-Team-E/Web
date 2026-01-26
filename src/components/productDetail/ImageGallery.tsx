import { ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useCartItemPostMutation from '@/hooks/mutations/useCartItemPostMutation';
import useAuth from '@/hooks/useAuth';
import type { ProductDetailResDto } from '@/types/productsType';

const ImageGallery = ({ data }: { data?: ProductDetailResDto }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { mutate: addCartItem } = useCartItemPostMutation();
  const { isAuthenticated } = useAuth();

  if (!data) return null;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('로그인이 필요한 서비스입니다.');
      navigate(PATH.LOGIN);
      return;
    }

    addCartItem(
      {
        product_code: data.product_code,
        quantity,
      },
      {
        onSuccess: () => {
          toast.success('장바구니에 추가되었습니다.');
          setQuantity(1);
        },
      },
    );
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate(PATH.LOGIN);
      return;
    }
    navigate(PATH.CHECKOUT, {
      state: {
        mode: 'direct',
        directItem: {
          product_code: data.product_code,
          name: data.product_name,
          image: data.thumbnail_url,
          quantity: quantity,
          price: data.price,
        },
      },
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success('URL이 복사되었습니다!'))
      .catch(() => toast.error('URL 복사에 실패했습니다.'));
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative flex min-h-[calc(100vh-120px)] flex-col items-center justify-center py-12">
      {/* Main Image with White Rounded Background */}
      <div className="flex w-full items-center justify-center rounded-3xl bg-white p-12 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
        <img
          src={data.thumbnail_url}
          alt={data.product_name}
          className="max-h-[50vh] w-auto max-w-full object-contain"
        />
      </div>

      {/* Scroll Arrow */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-gray-400 transition-colors hover:text-black"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={1} />
      </button>
    </div>
  );
};

export default ImageGallery;
