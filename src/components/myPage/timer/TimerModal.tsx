import { useState } from 'react';
import { X } from 'lucide-react';
import type { TimerPostReqDto } from '@/types/timerType';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TimerPostReqDto) => void;
  productId: number;
  initialData?: {
    target_price: number;
  };
  mode: 'create' | 'edit';
}

const TimerModal = ({
  isOpen,
  onClose,
  onSubmit,
  productId,
  initialData,
  mode,
}: TimerModalProps) => {
  const [targetPrice, setTargetPrice] = useState<string>(
    initialData?.target_price.toString() || '',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseInt(targetPrice.replace(/,/g, ''), 10);

    if (isNaN(price) || price <= 0) {
      alert('올바른 가격을 입력해주세요.');
      return;
    }

    onSubmit({
      product_code: productId,
      target_price: price,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setTargetPrice(value);
  };

  const formatPrice = (value: string) => {
    if (!value) return '';
    return parseInt(value, 10).toLocaleString('ko-KR');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md border border-gray-200 bg-white p-8 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 text-gray-400 transition-colors hover:text-black"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-light tracking-tight text-black">
            {mode === 'create' ? '가격 알림 설정' : '목표 가격 수정'}
          </h2>
          <p className="mt-2 text-sm font-light text-gray-500">
            목표 가격에 도달하면 알림을 보내드립니다
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Price Input */}
          <div className="space-y-3">
            <label className="block text-xs font-light uppercase tracking-widest text-gray-500">
              목표 가격
            </label>
            <div className="flex items-center border-b border-gray-200 pb-2">
              <span className="text-lg font-light text-gray-400">₩</span>
              <input
                type="text"
                autoFocus
                value={formatPrice(targetPrice)}
                onChange={handlePriceChange}
                placeholder="0"
                className="flex-1 bg-transparent px-2 text-2xl font-light tracking-tight text-black outline-none placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-black py-4 text-sm font-light tracking-wide text-white transition-opacity hover:opacity-80"
            >
              {mode === 'create' ? '알림 설정하기' : '저장하기'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 text-sm font-light text-gray-500 transition-colors hover:text-black"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimerModal;
