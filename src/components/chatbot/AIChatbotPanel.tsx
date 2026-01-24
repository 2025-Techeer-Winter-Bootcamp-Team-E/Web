import { useState, useRef, useEffect } from 'react';
import { Search, Mic, ImagePlus } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';
import SuggestedTags from './SuggestedTags';
import type { ChatMessage as ChatMessageType } from '@/types/chatbotType';

const SUGGESTED_TAGS = [
  'denim Jacket',
  'Purple Jacket',
  'leather Jacket',
  'puffer jacket',
  'winter coat',
];

interface AIChatbotPanelProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const AIChatbotPanel = ({ onSearch, initialQuery = '' }: AIChatbotPanelProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    onSearch(query);

    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Absolutely! We have a variety of ${query} with unique patterns. Do you have any specific color preferences? For example, do you prefer vibrant multicolor, geometric patterns, or floral designs?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
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
            <h2 className="text-sm font-semibold text-gray-900">AI-Powered</h2>
            <p className="text-xs text-gray-500">Shopping Experience</p>
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
              Ask me anything about products
              <br />
              you&apos;re looking for!
            </p>
          </div>
        )}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
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
        <SuggestedTags tags={SUGGESTED_TAGS} onTagClick={handleTagClick} />

        <div className="mt-4 flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3">
          <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          <button className="rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] p-2 transition-opacity hover:opacity-90">
            <Mic className="h-4 w-4 text-white" />
          </button>
        </div>

        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200">
          <ImagePlus className="h-4 w-4" />
          Generate an image
        </button>
      </div>
    </motion.div>
  );
};

export default AIChatbotPanel;
