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
import { Bell, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-white selection:bg-black/10">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="lg:w-[42%]">
            <ImageGallery data={productInfo} />
          </div>
          <div className="lg:sticky lg:top-20 lg:w-[55%]">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
        {/* Price Intelligence Section */}
        <div className="mt-16">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI 가격 인텔리전스</h2>
                <p className="text-sm text-gray-500">실시간 가격 분석 및 구매 타이밍 예측</p>
              </div>
            </div>
            {!timerInfo && (
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
              >
                <Bell className="h-4 w-4" />
                가격 알림 설정
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {timerInfo ? (
              <>
                <div className="lg:col-span-5">
                  <PriceTrendCard timerInfo={timerInfo} />
                </div>
                <div className="lg:col-span-7">
                  <PriceTrendGraph productCode={productCode} />
                </div>
              </>
            ) : (
              <div className="lg:col-span-12">
                <PriceTrendGraph productCode={productCode} />
              </div>
            )}
          </div>
        </div>
        {/* 3. Detailed Information Section */}
        <div className="mt-24 space-y-32">
          <section id="comparison" ref={comparisonRef} className="scroll-mt-32">
            <div className="mb-8 px-2">
              <h3 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f]">
                판매처별 최저가
              </h3>
            </div>
            <PriceComparisonTable />
          </section>

          <section id="specs" className="scroll-mt-32">
            <SpecTable productInfo={productInfo} />
          </section>

          <section id="reviews" className="scroll-mt-32 pb-32">
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
