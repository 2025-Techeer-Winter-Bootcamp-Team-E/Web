import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ImageGallery,
  ProductInfo,
  PriceTrendGraph,
  PriceComparisonTable,
  SpecTable,
  ReviewSection,
  PriceTrendCard,
} from '@/components/productDetail';
import useProductInfoQuery from '@/hooks/queries/useProductInfoQuery';
import useTimerGetQuery from '@/hooks/queries/useTimerGetQuery';
import useTimerPostMutation from '@/hooks/mutations/useTimerPostMutation';
import TimerModal from '@/components/myPage/timer/TimerModal';
import { Bell } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productCode = Number(id);

  const { data: productInfo } = useProductInfoQuery(productCode);
  const { data: timerInfo } = useTimerGetQuery(productCode);
  const postTimerMutate = useTimerPostMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const comparisonRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitTimer = (data: { product_code: number; target_price: number }) => {
    postTimerMutate.mutate(data, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Gentle Monster Style */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex min-h-[calc(100vh-80px)] flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left: Large Image */}
          <div className="lg:w-[65%]">
            <ImageGallery data={productInfo} />
          </div>

          {/* Right: Product Info Panel */}
          <div className="lg:sticky lg:top-20 lg:w-[35%] lg:self-start lg:py-12">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>

      {/* Below Fold - Detailed Sections */}
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* AI Price Intelligence Section */}
        <div className="mb-24">
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-black">AI 가격 인텔리전스</h2>
              <p className="mt-1 text-sm font-light text-gray-500">실시간 가격 분석 및 구매 타이밍 예측</p>
            </div>
            {!timerInfo && (
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 border border-black bg-black px-5 py-3 text-sm font-light text-white transition-all hover:bg-white hover:text-black"
              >
                <Bell className="h-4 w-4" strokeWidth={1.5} />
                가격 알림 설정
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            {timerInfo ? (
              <>
                <div>
                  <PriceTrendCard timerInfo={timerInfo} />
                </div>
                <div>
                  <PriceTrendGraph productCode={productCode} />
                </div>
              </>
            ) : (
              <div className="lg:col-span-2">
                <PriceTrendGraph productCode={productCode} />
              </div>
            )}
          </div>
        </div>

        {/* Detailed Information Sections */}
        <div className="space-y-24">
          <section id="comparison" ref={comparisonRef} className="scroll-mt-32">
            <div className="mb-8 border-b border-gray-200 pb-6">
              <h3 className="text-2xl font-light tracking-tight text-black">
                판매처별 최저가
              </h3>
            </div>
            <PriceComparisonTable />
          </section>

          <section id="specs" className="scroll-mt-32">
            <SpecTable productInfo={productInfo} />
          </section>

          <section id="reviews" className="scroll-mt-32 pb-24">
            <ReviewSection productCode={productCode} />
          </section>
        </div>
      </div>

      <TimerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTimer}
        productId={productCode}
        mode="create"
      />
    </div>
  );
};

export default ProductDetailPage;
