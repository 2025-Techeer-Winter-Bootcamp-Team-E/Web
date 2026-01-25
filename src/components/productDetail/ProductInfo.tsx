import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Bookmark } from 'lucide-react';
import type { ProductsCodeResDto } from '@/types/productsType';
import useCartItemPostMutation from '@/hooks/mutations/useCartItemPostMutation';
import { PATH } from '@/routes/path';

interface ProductInfoProps {
  productInfo?: ProductsCodeResDto;
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-light tracking-wide text-black">{title}</span>
        {isOpen ? (
          <Minus className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
        ) : (
          <Plus className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
        )}
      </button>
      {isOpen && <div className="pb-6">{children}</div>}
    </div>
  );
};

const ProductInfo = ({ productInfo }: ProductInfoProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { mutate: addCartItem } = useCartItemPostMutation();

  const specs = productInfo?.specs ? Object.entries(productInfo.specs) : [];
  const hasPrice = productInfo?.base_price !== undefined && productInfo?.base_price !== null;

  const handleAddToCart = () => {
    if (!productInfo) return;
    addCartItem(
      {
        product_code: productInfo.product_code,
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
    if (!productInfo) return;
    navigate(PATH.CHECKOUT, {
      state: {
        mode: 'direct',
        directItem: {
          product_id: productInfo.product_code,
          name: productInfo.product_name,
          image: productInfo.thumbnail_url,
          quantity: quantity,
          price: productInfo.base_price,
        },
      },
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header with Product Name and Bookmark */}
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-light tracking-tight text-black lg:text-2xl">
            {productInfo?.product_name}
          </h1>
          {productInfo?.brand && (
            <p className="mt-1 text-xs font-light tracking-wide text-gray-500 uppercase">
              {productInfo.brand}
            </p>
          )}
        </div>
        <button className="p-1 text-gray-400 transition-colors hover:text-black">
          <Bookmark className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-lg font-light text-black">
          {hasPrice ? `₩${productInfo.base_price.toLocaleString()}` : '가격 정보 없음'}
        </span>
      </div>

      {/* Quantity Selector */}
      <div className="mb-4 flex items-center justify-between border-t border-b border-gray-200 py-4">
        <span className="text-sm font-light text-gray-600">수량</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            className="flex h-8 w-8 items-center justify-center border border-gray-200 transition-colors hover:border-black"
          >
            <Minus className="h-3 w-3" strokeWidth={1.5} />
          </button>
          <span className="min-w-[2rem] text-center text-sm font-light">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="flex h-8 w-8 items-center justify-center border border-gray-200 transition-colors hover:border-black"
          >
            <Plus className="h-3 w-3" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mb-2 w-full bg-black py-4 text-sm font-light tracking-wide text-white transition-opacity hover:opacity-80"
      >
        쇼핑백에 추가하기
      </button>

      {/* Buy Now Button */}
      <button
        onClick={handleBuyNow}
        className="mb-6 w-full border border-black bg-white py-4 text-sm font-light tracking-wide text-black transition-colors hover:bg-gray-50"
      >
        바로 구매하기
      </button>

      {/* Accordion Sections */}
      <div className="mt-auto">
        <Accordion title="무료 배송 & 반품">
          <div className="space-y-2 text-sm font-light leading-relaxed text-gray-600">
            <p>무료 배송 (3~5일 소요)</p>
            <p>14일 이내 무료 반품 가능</p>
            <p>상품 수령 후 14일 이내, 미사용 상태에 한해 반품 가능</p>
          </div>
        </Accordion>

        <Accordion title="세부 정보" defaultOpen>
          {specs.length > 0 ? (
            <div className="space-y-3">
              {specs.map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="font-light text-gray-500">{label}</span>
                  <span className="font-light text-black">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-light text-gray-500">상세 정보가 없습니다.</p>
          )}
        </Accordion>

        <Accordion title="가격 비교">
          <p className="text-sm font-light text-gray-600">
            아래로 스크롤하여 판매처별 가격을 확인하세요.
          </p>
        </Accordion>
      </div>
    </div>
  );
};

export default ProductInfo;
