import type { ProductsCodeResDto } from '@/types/productsType';

interface ProductInfoProps {
  productInfo?: ProductsCodeResDto;
}

const ProductInfo = ({ productInfo }: ProductInfoProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-3">
        <span className="inline-block rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)]/10 to-[var(--color-gradient-blue)]/10 px-3 py-1.5 text-[11px] font-bold tracking-wider text-[var(--color-gradient-purple)] uppercase">
          {productInfo?.brand}
        </span>
      </div>

      <h1 className="mb-4 text-2xl leading-tight font-bold tracking-tight text-gray-900 lg:text-3xl">
        {productInfo?.product_name}
      </h1>

      <div className="grid grid-cols-3 gap-2">
        {productInfo &&
          Object.entries(productInfo.specs)
            .slice(0, 3)
            .map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-3 transition-all hover:border-gray-200 hover:bg-white hover:shadow-sm"
              >
                <span className="mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  {label}
                </span>
                <span className="text-center text-[12px] font-semibold text-gray-900">
                  {value}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductInfo;
