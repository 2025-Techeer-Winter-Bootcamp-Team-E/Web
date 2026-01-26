import { Star } from 'lucide-react';
import { useState } from 'react';
import ReviewCard from './ReviewCard';
import useProductReviewQuery from '@/hooks/queries/useProductReviewQuery';
import useProductAIReviewQuery from '@/hooks/queries/useProductAIReviewQuery';

interface ReviewSectionProps {
  productCode: number;
}

const ReviewSection = ({ productCode }: ReviewSectionProps) => {
  const [page, _setPage] = useState(1);

  const { data: reviewData } = useProductReviewQuery(productCode, page);
  const { data: aiData } = useProductAIReviewQuery(productCode);

  if (!reviewData) return null;

  const { reviews, pagination, average_rating } = reviewData;

  return (
    <section className="space-y-12">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h2 className="text-5xl font-bold tracking-tight text-black lg:text-6xl">구매 후기</h2>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(average_rating) ? 'fill-black text-black' : 'text-gray-300'}`}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-xl font-light tracking-tight text-black">
            {average_rating.toFixed(1)}
          </span>
          <span className="border-l border-gray-300 pl-4 text-sm font-light text-gray-500">
            전체 {pagination.total_elements.toLocaleString()}개의 통합 리뷰
          </span>
        </div>
      </div>

      {/* AI Summary */}
      {aiData && (
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-4xl font-bold tracking-tight text-black">AI 통합 리뷰</h3>
          <p className="mb-8 text-base font-light leading-relaxed tracking-wide text-black">
            {aiData.ai_summary}
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-xs font-light uppercase tracking-widest text-gray-500">
                  Pros
                </h4>
                <ul className="space-y-2 text-sm font-light text-gray-700">
                  {aiData.pros.map((item, idx) => (
                    <li key={idx} className="flex gap-2 leading-relaxed">
                      <span className="text-black">+</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-light uppercase tracking-widest text-gray-500">
                  Cons
                </h4>
                <ul className="space-y-2 text-sm font-light text-gray-500">
                  {aiData.cons.map((item, idx) => (
                    <li key={idx} className="flex gap-2 leading-relaxed">
                      <span className="opacity-40">-</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h4 className="mb-2 text-xs font-light uppercase tracking-widest text-gray-500">
                Recommendation
              </h4>
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-4xl font-light tracking-tight text-black">
                  {aiData.recommendation_score}
                </span>
                <span className="text-lg font-light text-gray-400">/ 100</span>
              </div>
              <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-black"
                  style={{ width: `${aiData.recommendation_score}%` }}
                />
              </div>
              <p className="text-sm font-light leading-relaxed text-gray-600 italic">
                "{aiData.score_reason}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Review List */}
      <div className="divide-y divide-gray-200">
        {reviews.map((review) => (
          <ReviewCard key={review.review_id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;
