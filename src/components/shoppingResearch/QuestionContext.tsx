import React from 'react';
import { MessageSquare } from 'lucide-react';

const QuestionContext: React.FC<{ context: string; mode: string }> = ({ context, mode }) => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-3.5">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]">
          <MessageSquare className="h-3.5 w-3.5 text-white" />
        </div>
        <p className="text-[14px] font-medium tracking-tight text-gray-500">
          탐색 키워드 <span className="ml-1 font-bold text-gray-900">"{context}"</span>
        </p>
      </div>
      <span className="text-[10px] font-bold tracking-[0.05em] text-(--color-gradient-purple) uppercase">
        {mode}
      </span>
    </div>
  );
};

export default QuestionContext;
