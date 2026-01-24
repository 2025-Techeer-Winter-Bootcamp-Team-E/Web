import type { ProductsCodeResDto } from '@/types/productsType';

interface ProductInfoProps {
  productInfo?: ProductsCodeResDto;
}

const ProductInfo = ({ productInfo }: ProductInfoProps) => {
  const specs = productInfo?.specs ? Object.entries(productInfo.specs) : [];
  const hasPrice = productInfo?.base_price !== undefined && productInfo?.base_price !== null;

  return (
    <div className="flex flex-col">
      <div className="mb-1.5">
        <span className="inline-block rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)]/10 to-[var(--color-gradient-blue)]/10 px-2.5 py-1 text-[10px] font-bold tracking-wider text-[var(--color-gradient-purple)] uppercase">
          {productInfo?.brand}
        </span>
      </div>

      <h1 className="mb-3 text-lg leading-tight font-bold tracking-tight text-gray-900 lg:text-xl">
        {productInfo?.product_name}
      </h1>

      {/* 가격 카드 */}
      <div className="mb-4 rounded-xl border-2 border-[var(--color-gradient-purple)]/20 bg-gradient-to-r from-[var(--color-gradient-purple)]/5 to-[var(--color-gradient-blue)]/5 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">최저가</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-[var(--color-gradient-purple)]">
              {hasPrice ? productInfo.base_price.toLocaleString() : '가격 정보 없음'}
            </span>
            {hasPrice && <span className="text-sm font-medium text-gray-500">원</span>}
          </div>
        </div>
      </div>

      {/* 스펙 정보 */}
      {specs.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {specs.slice(0, 6).map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-gray-50 p-2 transition-all hover:border-gray-200 hover:bg-white hover:shadow-sm"
            >
              <span className="mb-0.5 text-[9px] font-bold tracking-wider text-gray-500 uppercase">
                {label}
              </span>
              <span className="text-center text-[10px] font-semibold text-gray-900 line-clamp-1">
                {value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
