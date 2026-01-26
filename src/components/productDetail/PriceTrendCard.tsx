import type { TimerGetByProductCodeResDto } from '@/types/timerType';
import { TrendingDown, TrendingUp, Target, Bell } from 'lucide-react';

interface PriceTrendCardProps {
  timerInfo: TimerGetByProductCodeResDto;
}

const PriceTrendCard = ({ timerInfo }: PriceTrendCardProps) => {
  const priceDiff = timerInfo.predicted_price - timerInfo.target_price;
  const isGoodDeal = priceDiff <= 0;

  return (
    <div className="h-full rounded-3xl bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/ai-logo.png" alt="AI" className="h-10 w-10 object-contain" />
          <div>
            <h4 className="text-sm font-light tracking-wide text-black">AI 가격 분석</h4>
            <p className="text-xs font-light text-gray-500">구매 타이밍 예측</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2">
          <Bell className="h-3 w-3 text-black" strokeWidth={1.5} />
          <span className="text-xs font-light text-gray-600">알림 ON</span>
        </div>
      </div>

      {/* Score Badge */}
      <div className="mb-6 flex justify-center">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 ${
            isGoodDeal ? 'bg-black text-white' : 'border border-gray-300 text-black'
          }`}
        >
          {isGoodDeal ? (
            <TrendingDown className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <TrendingUp className="h-4 w-4" strokeWidth={1.5} />
          )}
          <span className="text-sm font-medium">
            {isGoodDeal ? '지금이 구매 적기!' : '가격 하락 대기 중'}
          </span>
        </div>
      </div>

      {/* AI Message */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
        <p className="text-center text-sm leading-relaxed font-light text-gray-600">
          {timerInfo.reason_message}
        </p>
      </div>

      {/* Price Gap Display */}
      <div className="mb-6 text-center">
        <p className="mb-2 text-xs font-light tracking-widest text-gray-500 uppercase">
          목표가 대비
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-3xl font-light ${isGoodDeal ? 'text-black' : 'text-gray-500'}`}>
            {priceDiff > 0 ? '+' : ''}
            {priceDiff.toLocaleString()}
          </span>
          <span className="text-lg font-light text-gray-400">원</span>
        </div>
      </div>

      {/* Score Bars */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        {[
          { label: '신뢰도', val: timerInfo.confidence_score },
          { label: '추천도', val: timerInfo.recommendation_score },
        ].map((item, i) => (
          <div key={i} className="rounded-2xl border border-gray-100 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-light text-gray-500">{item.label}</span>
              <span className="text-sm font-light text-black">{item.val}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-black transition-all duration-1000"
                style={{ width: `${item.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Price Info */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
            <span className="text-sm font-light text-gray-500">목표 가격</span>
          </div>
          <span className="text-sm font-light text-black">
            {timerInfo.target_price.toLocaleString()}원
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/ai-logo.png" alt="AI" className="h-4 w-4 object-contain" />
            <span className="text-sm font-light text-gray-500">AI 예측가</span>
          </div>
          <span className="text-sm font-light text-black">
            {timerInfo.predicted_price.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceTrendCard;
