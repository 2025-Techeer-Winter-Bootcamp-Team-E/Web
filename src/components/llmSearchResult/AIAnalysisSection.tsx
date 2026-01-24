import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIAnalysisProps {
  analysis: {
    description: string;
    keyword: string;
  };
}

const AIAnalysisSection: React.FC<AIAnalysisProps> = ({ analysis }) => {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-md">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-[21px] font-bold tracking-tight text-gray-900">AI 컨설팅 분석</h2>
      </div>

      <div className="space-y-6">
        <p className="text-[17px] leading-relaxed">
          <span className="font-medium text-gray-500">검색어 : </span>
          <span className="font-bold text-gray-900">"{analysis.keyword}"</span>
        </p>
        <div className="h-px w-full bg-gray-100" />
        <p className="text-[17px] leading-[1.6] font-medium whitespace-pre-wrap text-gray-600">
          {analysis.description}
        </p>
      </div>
    </div>
  );
};

export default AIAnalysisSection;
