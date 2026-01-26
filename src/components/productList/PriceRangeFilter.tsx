import { useState } from 'react';

interface PriceRangeFilterProps {
  initialMin: string;
  initialMax: string;
  onApply: (min: string, max: string) => void;
}

const PriceRangeFilter = ({ initialMin, initialMax, onApply }: PriceRangeFilterProps) => {
  const [tempMin, setTempMin] = useState(initialMin);
  const [tempMax, setTempMax] = useState(initialMax);

  return (
    <div className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:gap-4">
      <h3 className="text-[13px] font-semibold text-[#1d1d1f] sm:min-w-20 sm:pr-6">가격대</h3>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex flex-1 items-center rounded-lg border border-[#d2d2d7] bg-white px-3 py-1.5 focus-within:border-[#1d1d1f] sm:flex-none">
          <input
            type="number"
            value={tempMin}
            onChange={(e) => setTempMin(e.target.value)}
            placeholder="최소"
            className="w-full min-w-15 text-right text-[13px] outline-none sm:w-20"
          />
          <span className="ml-1 text-[13px] text-[#86868b]">원</span>
        </div>

        <span className="text-[#d2d2d7]">~</span>

        <div className="flex flex-1 items-center rounded-lg border border-[#d2d2d7] bg-white px-3 py-1.5 focus-within:border-[#1d1d1f] sm:flex-none">
          <input
            type="number"
            value={tempMax}
            onChange={(e) => setTempMax(e.target.value)}
            placeholder="최대"
            className="w-full min-w-15 text-right text-[13px] outline-none sm:w-20"
          />
          <span className="ml-1 text-[13px] text-[#86868b]">원</span>
        </div>

        <button
          onClick={() => onApply(tempMin, tempMax)}
          className="ml-auto rounded-full bg-[#1d1d1f] px-4 py-1.5 text-[12px] font-bold text-white hover:bg-[#424245] sm:ml-2 sm:px-5"
        >
          적용
        </button>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
