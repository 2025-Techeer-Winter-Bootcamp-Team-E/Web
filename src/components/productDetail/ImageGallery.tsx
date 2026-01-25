import { Share2, ChevronDown } from 'lucide-react';
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
    <div className="relative flex min-h-[calc(100vh-120px)] flex-col items-center justify-center">
      {/* Main Image */}
      <div className="flex w-full items-center justify-center px-8">
        <img
          src={data.thumbnail_url}
          alt={data.product_name}
          className="max-h-[60vh] w-auto max-w-full object-contain"
        />
      </div>

      {/* Share Button */}
      <button className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center border border-gray-200 bg-white transition-all hover:border-black">
        <Share2 className="h-4 w-4 text-black" strokeWidth={1.5} />
      </button>

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
