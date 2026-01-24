import { useState, useRef, useEffect } from 'react';
import { Search, Mic, ImagePlus, Sparkles, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import SuggestedTags from './SuggestedTags';
import type { ChatMessage as ChatMessageType } from '@/types/chatbotType';
import type {
  LLMRecommendationEntity,
  QuestionEntity,
  QuestionAnswerEntity,
  ShoppingResultEntity,
} from '@/types/searchType';
import useLlmRecoMutation from '@/hooks/mutations/useLlmRecoMutation';
import useShoppingResearchMutation from '@/hooks/mutations/useShoppingResearchMutation';
import useShoppingResultMutation from '@/hooks/mutations/useShoppingResultMutation';

const SUGGESTED_TAGS = [
  'RTX 4070',
  '라이젠 7',
  '게이밍 노트북',
  'SSD 1TB',
  'DDR5 램',
];

interface AIChatbotPanelProps {
  onSearch: (query: string) => void;
  onLlmResult?: (products: LLMRecommendationEntity[], analysisMessage: string) => void;
  initialQuery?: string;
}

const AIChatbotPanel = ({
  onSearch,
  onLlmResult,
  initialQuery = '',
}: AIChatbotPanelProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Shopping research state
  const [isShoppingResearchMode, setIsShoppingResearchMode] = useState(false);
  const [searchId, setSearchId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionEntity[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswerEntity[]>([]);

  const llmMutation = useLlmRecoMutation();
  const shoppingResearchMutation = useShoppingResearchMutation();
  const shoppingResultMutation = useShoppingResultMutation();

  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (query: string) => {
    if (!query.trim()) return;

    // If in shopping research mode, handle as answer
    if (isShoppingResearchMode && questions.length > 0) {
      handleShoppingAnswer(query);
      return;
    }

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      type: 'text',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentQuery(query);

    onSearch(query);

    // Call LLM API
    try {
      const result = await llmMutation.mutateAsync({ user_query: query });

      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.analysis_message,
        type: 'llm_result',
        llmProducts: result.recommended_products,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Notify parent about LLM results
      if (onLlmResult && result.recommended_products.length > 0) {
        onLlmResult(result.recommended_products, result.analysis_message);
      }

      // Add shopping research prompt
      const promptMessage: ChatMessageType = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: '아직 원하는 상품을 찾지 못하셨나요?',
        type: 'shopping_prompt',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, promptMessage]);
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '죄송합니다. 검색 중 오류가 발생했습니다. 다시 시도해주세요.',
        type: 'text',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartShoppingResearch = async () => {
    if (!currentQuery) return;

    setIsLoading(true);

    try {
      const result = await shoppingResearchMutation.mutateAsync({
        user_query: currentQuery,
      });

      setSearchId(result.search_id);
      setQuestions(result.questions);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setIsShoppingResearchMode(true);

      // Add first question as message
      if (result.questions.length > 0) {
        const questionMessage: ChatMessageType = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `쇼핑 리서치를 시작합니다! 몇 가지 질문에 답해주세요.\n\n질문 1/${result.questions.length}: ${result.questions[0].question}`,
          type: 'shopping_question',
          questionData: result.questions[0],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, questionMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: Date.now().toString(),
        role: 'assistant',
        content: '쇼핑 리서치 시작 중 오류가 발생했습니다.',
        type: 'text',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShoppingAnswer = async (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];

    // Add user answer as message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: answer,
      type: 'text',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Store answer
    const newAnswer: QuestionAnswerEntity = {
      question_id: currentQuestion.question_id,
      question: currentQuestion.question,
      answer: answer,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Check if more questions
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      const nextQuestion = questions[nextIndex];
      const questionMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `질문 ${nextIndex + 1}/${questions.length}: ${nextQuestion.question}`,
        type: 'shopping_question',
        questionData: nextQuestion,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, questionMessage]);
    } else {
      // All questions answered, get results
      setIsLoading(true);

      try {
        const result = await shoppingResultMutation.mutateAsync({
          search_id: searchId!,
          user_query: currentQuery,
          survey_contents: updatedAnswers,
        });

        const resultMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `쇼핑 리서치가 완료되었습니다! "${currentQuery}"에 대한 최적의 상품을 찾았습니다.`,
          type: 'shopping_result',
          shoppingResults: result.product,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, resultMessage]);

        // Reset shopping research state
        setIsShoppingResearchMode(false);
        setSearchId(null);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setAnswers([]);
      } catch (error) {
        const errorMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '결과를 가져오는 중 오류가 발생했습니다.',
          type: 'text',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  const handleTagClick = (tag: string) => {
    handleSendMessage(tag);
  };

  const handleOptionClick = (optionLabel: string) => {
    handleShoppingAnswer(optionLabel);
  };

  // Check if this is the current active question (last shopping_question message)
  const isCurrentQuestion = (message: ChatMessageType) => {
    if (message.type !== 'shopping_question' || !isShoppingResearchMode) return false;
    const questionMessages = messages.filter((m) => m.type === 'shopping_question');
    return questionMessages[questionMessages.length - 1]?.id === message.id;
  };

  const renderMessage = (message: ChatMessageType) => {
    if (message.type === 'llm_result' && message.llmProducts) {
      return (
        <div key={message.id} className="space-y-3">
          <ChatMessage message={{ ...message, llmProducts: undefined }} />
          <div className="ml-11 space-y-2">
            {message.llmProducts.slice(0, 3).map((product) => (
              <div
                key={product.product_id || product.product_code}
                className="flex items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/50 p-3"
              >
                <img
                  src={product.thumbnail_url || product.product_image_url}
                  alt={product.product_name}
                  className="h-12 w-12 rounded-lg object-contain bg-white"
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {product.product_name}
                  </p>
                  <p className="text-xs text-purple-600">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
                <Sparkles className="h-4 w-4 flex-shrink-0 text-purple-500" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (message.type === 'shopping_prompt') {
      return (
        <div key={message.id} className="space-y-3">
          <ChatMessage message={message} />
          <div className="ml-11">
            <button
              onClick={handleStartShoppingResearch}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <ShoppingBag className="h-4 w-4" />
              쇼핑 리서치 시작하기
            </button>
          </div>
        </div>
      );
    }

    if (message.type === 'shopping_question' && message.questionData) {
      const showOptions = isCurrentQuestion(message) && message.questionData.options && message.questionData.options.length > 0;
      return (
        <div key={message.id} className="space-y-3">
          <ChatMessage message={message} />
          {showOptions && (
            <div className="ml-11">
              <p className="mb-2 text-xs font-medium text-gray-400">Quick Select</p>
              <div className="flex flex-wrap gap-2">
                {message.questionData.options!.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.label)}
                    disabled={isLoading}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gradient-to-r hover:from-[var(--color-gradient-purple)] hover:to-[var(--color-gradient-blue)] hover:text-white disabled:opacity-50"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    if (message.type === 'shopping_result' && message.shoppingResults) {
      return (
        <div key={message.id} className="space-y-3">
          <ChatMessage message={{ ...message, shoppingResults: undefined }} />
          <div className="ml-11 space-y-2">
            {message.shoppingResults.slice(0, 3).map((product, index) => (
              <div
                key={product.product_code}
                className="rounded-xl border border-green-100 bg-green-50/50 p-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={product.product_image_url}
                    alt={product.product_name}
                    className="h-16 w-16 rounded-lg object-contain bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
                        {index + 1}위
                      </span>
                      <span className="text-xs text-green-600">
                        매칭 {Math.round(product.similarity_score * 100)}%
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm font-medium text-gray-900">
                      {product.product_name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {product.price.toLocaleString()}원
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                      {product.recommendation_reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return <ChatMessage key={message.id} message={message} />;
  };

  return (
    <motion.div
      layoutId="search-bar"
      className="flex h-full w-96 flex-col border-l border-gray-100 bg-white"
    >
      <div className="border-b border-gray-100 p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]">
            <span className="text-xs font-bold text-white">Ai</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">AI 어시스턴트</h2>
            <p className="text-xs text-gray-500">
              {isShoppingResearchMode ? '쇼핑 리서치 진행 중' : '스마트 쇼핑 도우미'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]">
              <span className="text-2xl font-bold text-white">Ai</span>
            </div>
            <p className="text-sm text-gray-500">
              찾으시는 제품에 대해
              <br />
              무엇이든 물어보세요!
            </p>
          </div>
        )}
        {messages.map((message) => renderMessage(message))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]" />
            <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '0.1s' }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '0.2s' }}
                />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-100 p-4">
        {!isShoppingResearchMode && (
          <SuggestedTags tags={SUGGESTED_TAGS} onTagClick={handleTagClick} />
        )}

        {isShoppingResearchMode && questions.length > 0 && (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-1.5 rounded-full ${
                    idx <= currentQuestionIndex
                      ? 'bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3">
          <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isShoppingResearchMode ? '답변을 입력하세요...' : '무엇이든 물어보세요...'
            }
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          <button
            onClick={() => handleSendMessage(input)}
            className="rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] p-2 transition-opacity hover:opacity-90"
          >
            <Mic className="h-4 w-4 text-white" />
          </button>
        </div>

        {!isShoppingResearchMode && (
          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
            <ImagePlus className="h-4 w-4" />
            이미지로 검색
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AIChatbotPanel;
