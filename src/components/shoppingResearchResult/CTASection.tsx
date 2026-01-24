import React from 'react';
import { RefreshCw } from 'lucide-react';

interface CTASectionProps {
  buttonText: string;
  onRetry?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ buttonText, onRetry }) => {
  return (
    <div className="mt-12 flex flex-col items-center gap-12 border-t border-gray-100 pt-16">
      <button
        onClick={onRetry}
        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] px-12 py-4 font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
      >
        <RefreshCw className="h-4 w-4" strokeWidth={3} />
        <span className="text-[17px] tracking-tight">{buttonText}</span>
      </button>
    </div>
  );
};

export default CTASection;
