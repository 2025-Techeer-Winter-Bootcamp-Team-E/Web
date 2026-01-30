import { X, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useTimerDeleteMutation from '@/hooks/mutations/useTimerDeleteMutation';
import useTimerPatchMutation from '@/hooks/mutations/useTimerPatchMutation';
import TimerModal from './TimerModal';
import { PATH } from '@/routes/path';
import type { TimerEntity } from '@/types/timerType';
import { toast } from 'react-toastify';

interface TimerCardProps {
  timer: TimerEntity;
}

const TimerCard = ({ timer }: TimerCardProps) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const deleteTimerMutation = useTimerDeleteMutation();
  const patchTimerMutation = useTimerPatchMutation();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('타이머를 삭제하시겠습니까?')) return;
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
          toast.success('목표가격이 수정되었습니다.');
        },
        onError: () => {
          toast.error('목표가격 수정에 실패했습니다.');
        },
      },
    );
  };

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]">
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
        <div
          className="relative mb-6 flex aspect-square w-full cursor-pointer items-center justify-center rounded-2xl bg-[#F5F5F7]"
          onClick={() => navigate(PATH.PRODUCT_DETAIL(timer.product_code))}
        >
          {timer.thumbnail_url ? (
            <img
              src={timer.thumbnail_url}
              alt={timer.product_name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-light text-gray-400">No Image</span>
          )}
        </div>
        <div className="mb-6 space-y-2">
          <h3 className="line-clamp-2 min-h-11 text-base leading-snug font-light tracking-tight text-black">
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
        <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-light tracking-widest text-gray-500 uppercase">
              Score
            </span>
            <span className="text-sm font-light text-black">{timer.recommendation_score}%</span>
          </div>
          <p className="text-sm leading-relaxed font-light break-keep whitespace-pre-wrap text-gray-600">
            {timer.reason_message}
          </p>
        </div>
        <div className="mt-auto flex gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-[#424245] transition-colors hover:bg-gray-200"
            title="가격 수정"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate(PATH.PRODUCT_DETAIL(timer.product_code))}
            className="flex-1 rounded-xl bg-black py-3 text-sm font-light tracking-wide text-white transition-opacity hover:opacity-80"
          >
            상세 보기
          </button>
        </div>
      </div>
      <TimerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
        productId={timer.product_code}
        initialData={{ target_price: timer.target_price }}
        mode="edit"
      />
    </>
  );
};

export default TimerCard;
