import { useState, useRef, useEffect } from 'react';
import { Search, ArrowRight, ImagePlus, ShoppingBag, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import SuggestedTags from './SuggestedTags';
import type { ChatMessage as ChatMessageType } from '@/types/chatbotType';
import type {
  LLMRecommendationEntity,
  QuestionEntity,
  QuestionAnswerEntity,
} from '@/types/searchType';
import useLlmRecoMutation from '@/hooks/mutations/useLlmRecoMutation';
import useShoppingResearchMutation from '@/hooks/mutations/useShoppingResearchMutation';
import useShoppingResultMutation from '@/hooks/mutations/useShoppingResultMutation';

const SUGGESTED_TAGS = [
  'RTX 4070',
  '라이젠 7',
  '게이밍 노트북',
];

interface AIChatbotPanelProps {
  onSearch: (query: string) => void;
  onLlmResult?: (products: LLMRecommendationEntity[], analysisMessage: string) => void;
  initialQuery?: string;
  onClose?: () => void;
}

const AIChatbotPanel = ({
  onSearch,
  onLlmResult,
  initialQuery = '',
  onClose,
}: AIChatbotPanelProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

      if (onLlmResult && result.recommended_products.length > 0) {
        onLlmResult(result.recommended_products, result.analysis_message);
      }

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

      if (result.questions.length > 0) {
        const questionMessage: ChatMessageType = {
          id: Date.now().toString(),
          role: 'assistant',
          content: `쇼핑 리서치를 시작합니다.\n\n질문 1/${result.questions.length}: ${result.questions[0].question}`,
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

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: answer,
      type: 'text',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const newAnswer: QuestionAnswerEntity = {
      question_id: currentQuestion.question_id,
      question: currentQuestion.question,
      answer: answer,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

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
          content: `쇼핑 리서치가 완료되었습니다.`,
          type: 'shopping_result',
          shoppingResults: result.product,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, resultMessage]);

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
                className="flex items-center gap-3 border border-gray-100 bg-gray-50 p-3"
              >
                <img
                  src={product.thumbnail_url || product.product_image_url}
                  alt={product.product_name}
                  className="h-12 w-12 object-contain bg-white"
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-light text-black">
                    {product.product_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.price.toLocaleString()}원
                  </p>
                </div>
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
              className="flex items-center gap-2 border border-black bg-black px-4 py-2 text-sm font-light text-white transition-all hover:bg-white hover:text-black disabled:opacity-50"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
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
              <p className="mb-2 text-xs font-light tracking-wide text-gray-400 uppercase">Quick Select</p>
              <div className="flex flex-wrap gap-2">
                {message.questionData.options!.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.label)}
                    disabled={isLoading}
                    className="border border-gray-200 bg-white px-3 py-1.5 text-xs font-light text-gray-700 transition-all hover:border-black hover:bg-black hover:text-white disabled:opacity-50"
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
                className="border border-gray-100 bg-white p-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={product.product_image_url}
                    alt={product.product_name}
                    className="h-16 w-16 object-contain bg-gray-50"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="bg-black px-2 py-0.5 text-xs font-light text-white">
                        {index + 1}
                      </span>
                      <span className="text-xs text-gray-400">
                        {Math.round(product.similarity_score * 100)}% match
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm font-light text-black">
                      {product.product_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.price.toLocaleString()}원
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
      className="flex h-full w-[340px] flex-col overflow-hidden rounded-3xl border border-gray-200/50 bg-gray-50/85 shadow-2xl backdrop-blur-xl"
      style={{ backdropFilter: 'blur(20px) saturate(150%)' }}
    >
      <div className="rounded-t-3xl border-b border-gray-200/40 bg-gray-100/60 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="ai-icon-animated flex h-10 w-10 items-center justify-center rounded-2xl">
              <span className="text-sm font-medium text-white">AI</span>
            </div>
            <div>
              <h2 className="text-sm font-medium tracking-wide text-black">AI Assistant</h2>
              <p className="text-xs font-light text-gray-500">
                {isShoppingResearchMode ? 'Shopping Research' : 'Smart Shopping'}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200/50 bg-white/50 text-gray-500 transition-all hover:border-black hover:bg-black hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="ai-icon-animated mb-8 flex h-20 w-20 items-center justify-center rounded-3xl">
              <span className="text-2xl font-medium text-white">AI</span>
            </div>
            <p className="text-base font-normal leading-loose text-gray-500">
              찾으시는 제품에 대해
              <br />
              무엇이든 물어보세요
            </p>
          </div>
        )}
        {messages.map((message) => renderMessage(message))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="ai-icon-animated h-8 w-8 flex-shrink-0 rounded-xl" />
            <div className="rounded-2xl bg-white/80 px-4 py-3 border border-gray-100">
              <p className="loading-text-animate text-sm text-gray-500">
                최적의 상품을 검색 중입니다...
              </p>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200/40 bg-gray-100/60 p-4">
        {!isShoppingResearchMode && (
          <SuggestedTags tags={SUGGESTED_TAGS} onTagClick={handleTagClick} />
        )}

        {isShoppingResearchMode && questions.length > 0 && (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-5 rounded-full transition-colors ${idx <= currentQuestionIndex ? 'bg-black' : 'bg-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-500">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/90 px-4 py-3">
          <Search className="h-4 w-4 flex-shrink-0 text-gray-400" strokeWidth={1.5} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isShoppingResearchMode ? '답변을 입력하세요...' : '무엇이든 물어보세요...'}
            className="flex-1 bg-transparent text-sm font-normal outline-none placeholder:text-gray-400"
          />
          {!isShoppingResearchMode && (
            <button className="p-2 text-gray-400 transition-colors hover:text-black">
              <ImagePlus className="h-4 w-4" strokeWidth={1.5} />
            </button>
          )}
          <button
            onClick={() => handleSendMessage(input)}
            className="rounded-xl bg-black p-2 text-white transition-all hover:bg-gray-800"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChatbotPanel;
