import { X, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { TimersEntity } from '@/types/timerType';
import useTimerDeleteMutation from '@/hooks/mutations/useTimerDeleteMutation';
import useTimerPatchMutation from '@/hooks/mutations/useTimerPatchMutation';
import TimerModal from './TimerModal';
import { PATH } from '@/routes/path';

interface TimerCardProps {
  timer: TimersEntity;
}

const TimerCard = ({ timer }: TimerCardProps) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const deleteTimerMutation = useTimerDeleteMutation();
  const patchTimerMutation = useTimerPatchMutation();

  const handleDelete = () => {
    if (!confirm('이 타이머를 삭제하시겠습니까?')) return;
    deleteTimerMutation.mutate(timer.timer_id);
  };

  const handleSubmitEdit = (data: { product_code: number; target_price: number }) => {
    patchTimerMutation.mutate(
      {
        timer_id: timer.timer_id,
        body: { target_price: data.target_price },
      },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          alert('목표가격이 수정되었습니다.');
        },
        onError: () => {
          alert('목표가격 수정에 실패했습니다.');
        },
      },
    );
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleGoToProduct = () => {
    navigate(PATH.PRODUCT_DETAIL(timer.product_code));
  };

  return (
    <>
      <div className="group relative flex h-full flex-col border border-gray-200 bg-white p-6 transition-all hover:border-black">
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:text-black"
        >
          <X className="h-4 w-4" strokeWidth={1.5} />
        </button>

        {/* Product Image */}
        <div className="relative mb-6 flex h-48 items-center justify-center bg-gray-50 p-6">
          {timer.thumbnail_url ? (
            <img
              src={timer.thumbnail_url}
              alt={timer.product_name}
              className="h-full object-contain"
            />
          ) : (
            <span className="text-sm font-light text-gray-400">No Image</span>
          )}
        </div>

        {/* Product Info */}
        <div className="mb-6 space-y-2">
          <h3 className="line-clamp-2 min-h-[2.75rem] text-base font-light leading-snug tracking-tight text-black">
            {timer.product_name}
          </h3>
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-light tracking-tight text-black">
              ₩{timer.predicted_price.toLocaleString()}
            </span>
            <span className="text-xs font-light text-gray-500">
              목표 ₩{timer.target_price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Score Section */}
        <div className="mb-6 border border-gray-100 bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-light uppercase tracking-widest text-gray-500">
              Score
            </span>
            <span className="text-sm font-light text-black">
              {timer.recommendation_score}%
            </span>
          </div>
          <p className="line-clamp-2 text-sm font-light leading-relaxed text-gray-600">
            {timer.reason_message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={handleOpenEditModal}
            className="flex h-12 w-12 items-center justify-center border border-gray-200 bg-white text-gray-600 transition-all hover:border-black hover:text-black"
          >
            <Pencil className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={handleGoToProduct}
            className="flex-1 bg-black py-3 text-sm font-light tracking-wide text-white transition-opacity hover:opacity-80"
          >
            상세 보기
          </button>
        </div>
      </div>

      <TimerModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleSubmitEdit}
        productId={timer.product_code}
        initialData={{ target_price: timer.target_price }}
        mode="edit"
      />
    </>
  );
};

export default TimerCard;
