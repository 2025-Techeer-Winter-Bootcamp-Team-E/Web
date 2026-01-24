import { Lightbulb } from 'lucide-react';

const StatusBanner: React.FC<{ text: string; mode: string }> = ({ text, mode }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-7 py-5 shadow-sm">
      <div className="flex items-center gap-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]">
          <Lightbulb className="h-5 w-5 text-white" strokeWidth={1.8} />
        </div>
        <div>
          <p className="mb-0.5 text-[11px] font-bold tracking-widest text-gray-500 uppercase">
            {mode}
          </p>
          <p className="text-[17px] font-medium tracking-tight text-gray-900">
            AI 분석 완료 <span className="mx-1 text-gray-300">|</span>{' '}
            <span className="font-bold">"{text}"</span>
          </p>
        </div>
      </div>
      <div className="hidden items-center gap-2.5 rounded-full bg-gray-50 px-4 py-1.5 sm:flex">
        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
        <span className="text-[11px] font-bold tracking-wider text-gray-900 uppercase">
          Engine Ready
        </span>
      </div>
    </div>
  );
};
export default StatusBanner;
