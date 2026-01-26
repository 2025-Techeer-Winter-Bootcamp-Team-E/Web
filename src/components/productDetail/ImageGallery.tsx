import { ChevronDown } from 'lucide-react';
import type { ProductsCodeResDto } from '@/types/productsType';

const ImageGallery = ({ data }: { data?: ProductsCodeResDto }) => {
  if (!data) return null;

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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-black"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={1} />
      </button>
    </div>
  );
};

export default ImageGallery;
