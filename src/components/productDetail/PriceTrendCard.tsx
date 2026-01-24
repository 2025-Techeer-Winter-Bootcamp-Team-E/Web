import { TrendingDown, TrendingUp, Target, Sparkles, Bell } from 'lucide-react';
import type { TimersIdGetResDto } from '@/types/timerType';

interface PriceTrendCardProps {
  timerInfo: TimersIdGetResDto;
}

const PriceTrendCard = ({ timerInfo }: PriceTrendCardProps) => {
  const priceDiff = timerInfo.predicted_price - timerInfo.target_price;
  const isGoodDeal = priceDiff <= 0;

  return (
    <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[var(--color-gradient-purple)]/10 to-[var(--color-gradient-blue)]/10">
            <Sparkles className="h-5 w-5 text-[var(--color-gradient-purple)]" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-gray-900">AI 가격 분석</h4>
            <p className="text-[12px] text-gray-500">구매 타이밍 예측</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5">
          <Bell className="h-3 w-3 text-[var(--color-gradient-purple)]" />
          <span className="text-[11px] font-medium text-gray-600">알림 ON</span>
        </div>
      </div>

      {/* Score Badge */}
      <div className="mb-6 flex justify-center">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 ${
            isGoodDeal
              ? 'bg-gradient-to-r from-green-500 to-emerald-400'
              : 'bg-gradient-to-r from-orange-500 to-amber-400'
          }`}
        >
          {isGoodDeal ? (
            <TrendingDown className="h-4 w-4 text-white" />
          ) : (
            <TrendingUp className="h-4 w-4 text-white" />
          )}
          <span className="text-sm font-bold text-white">
            {isGoodDeal ? '지금이 구매 적기!' : '가격 하락 대기 중'}
          </span>
        </div>
      </div>

      {/* AI Message */}
      <div className="mb-6 rounded-xl bg-gray-50 p-4">
        <p className="text-center text-[13px] leading-relaxed text-gray-600">
          {timerInfo.reason_message}
        </p>
      </div>

      {/* Price Gap Display */}
      <div className="mb-6 text-center">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          목표가 대비
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span
            className={`text-3xl font-bold ${
              isGoodDeal ? 'text-green-500' : 'text-orange-500'
            }`}
          >
            {priceDiff > 0 ? '+' : ''}
            {priceDiff.toLocaleString()}
          </span>
          <span className="text-lg font-medium text-gray-400">원</span>
        </div>
      </div>

      {/* Score Bars */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        {[
          { label: '신뢰도', val: timerInfo.confidence_score },
          { label: '추천도', val: timerInfo.recommendation_score },
        ].map((item, i) => (
          <div key={i} className="rounded-xl bg-gray-50 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-medium text-gray-500">{item.label}</span>
              <span className="text-[13px] font-bold text-gray-900">{item.val}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] transition-all duration-1000"
                style={{ width: `${item.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Price Info */}
      <div className="space-y-3 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[var(--color-gradient-purple)]" />
            <span className="text-[13px] font-medium text-gray-500">목표 가격</span>
          </div>
          <span className="text-[15px] font-bold text-gray-900">
            {timerInfo.target_price.toLocaleString()}원
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--color-gradient-blue)]" />
            <span className="text-[13px] font-medium text-gray-500">AI 예측가</span>
          </div>
          <span className="text-[15px] font-bold text-gray-900">
            {timerInfo.predicted_price.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceTrendCard;
