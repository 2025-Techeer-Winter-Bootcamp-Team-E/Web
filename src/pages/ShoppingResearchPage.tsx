import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { QuestionContext, QuestionHeader, CustomInput } from '@/components/shoppingResearch';
import useShoppingResearchMutation from '@/hooks/mutations/useShoppingResearchMutation';
import { PATH } from '@/routes/path';

const ShoppingResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const [searchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('q') || '';
  const [userQuery] = useState(state?.userQuery || queryFromUrl);
  const [questions, setQuestions] = useState<any[]>(state?.questions || []);
  const [searchId, setSearchId] = useState<string>(state?.searchId || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const mutation = useShoppingResearchMutation();

  useEffect(() => {
    if (questions.length > 0 || !userQuery) return;
    mutation.mutate(
      { user_query: userQuery },
      {
        onSuccess: (data) => {
          setQuestions(data.questions);
          setSearchId(data.search_id);
        },
      },
    );
  }, [userQuery]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentAnswer = answers[currentQuestion?.question_id] || '';

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.question_id]: value });
  };

  const handleNext = () => {
    if (isLastQuestion) handleComplete();
    else setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((prev) => prev - 1);
    else navigate(-1);
  };

  const handleComplete = () => {
    const surveyContents = questions.map((q) => ({
      question_id: q.question_id,
      question: q.question,
      answer: answers[q.question_id] || '',
    }));

    navigate(`${PATH.SHOPPING_RESEARCH_RESULT}?q=${encodeURIComponent(userQuery)}`, {
      state: { user_query: userQuery, survey_contents: surveyContents, search_id: searchId },
    });
  };

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--color-gradient-purple)]" />
          <p className="text-[17px] font-semibold tracking-tight text-gray-900">
            분석 엔진을 준비하고 있습니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <QuestionContext context={userQuery} mode="AI 분석 엔진 가동 중" />

        <div className="mt-10 overflow-hidden rounded-2xl border border-gray-100 bg-white p-10 shadow-sm md:p-16">
          <div className="mb-14 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="group flex items-center gap-1.5 text-[15px] font-semibold text-[#86868b] transition-colors hover:text-[#1d1d1f]"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
              이전
            </button>
            <div className="flex gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                    index === currentQuestionIndex
                      ? 'scale-125 bg-[#1d1d1f]'
                      : index < currentQuestionIndex
                        ? 'bg-[#d2d2d7]'
                        : 'bg-[#e5e5e7]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <QuestionHeader
              title={currentQuestion.question}
              subtitle={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
            />

            <div className="mt-14 space-y-12">
              <CustomInput
                placeholder={currentQuestion.customOption?.placeholder || '답변을 입력하세요'}
                value={currentAnswer}
                onChange={handleAnswerChange}
              />

              {currentQuestion.options && currentQuestion.options.length > 0 && (
                <div className="flex flex-col items-center gap-5">
                  <p className="text-[11px] font-bold tracking-[0.12em] text-[#d2d2d7] uppercase">
                    Quick Select
                  </p>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {currentQuestion.options.map((option: any) => (
                      <button
                        key={option.id}
                        onClick={() => handleAnswerChange(option.label)}
                        className={`rounded-full px-5 py-2.5 text-[14px] font-medium transition-all duration-300 ${
                          currentAnswer === option.label
                            ? 'bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-16 flex flex-col items-center gap-6">
              <button
                onClick={handleNext}
                disabled={!currentAnswer.trim()}
                className={`group flex w-full items-center justify-center gap-2 rounded-xl py-4.5 text-[17px] font-bold transition-all md:w-60 ${
                  currentAnswer.trim()
                    ? 'bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] text-white hover:opacity-90 active:scale-[0.98]'
                    : 'cursor-not-allowed bg-gray-100 text-gray-400'
                }`}
              >
                {isLastQuestion ? '결과 보기' : '다음'}
                {!mutation.isPending && currentAnswer.trim() && (
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
              <p className="text-[12px] font-medium text-[#86868b] opacity-80">
                Enter 키를 눌러 다음 단계로 진행할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingResearchPage;
