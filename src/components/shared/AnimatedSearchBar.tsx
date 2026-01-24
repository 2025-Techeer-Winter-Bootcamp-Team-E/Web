import { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TYPING_PHRASES = [
  'RTX 4070 그래픽카드 최저가 비교',
  '게이밍 PC 견적 추천해줘',
  '예산 150만원 가성비 조립 PC',
  'AMD 라이젠 7 CPU 가격 비교',
];

interface AnimatedSearchBarProps {
  variant?: 'hero' | 'chatbot';
  onSearch?: (query: string) => void;
  initialQuery?: string;
}

const AnimatedSearchBar = ({
  variant = 'hero',
  onSearch,
  initialQuery = '',
}: AnimatedSearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (query) return;

    let timeout: number;
    const currentPhrase = TYPING_PHRASES[phraseIndex];

    if (isTyping && charIndex < currentPhrase.length) {
      timeout = window.setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);
    } else if (isTyping && charIndex === currentPhrase.length) {
      timeout = window.setTimeout(() => setIsTyping(false), 2000);
    } else if (!isTyping && charIndex > 0) {
      timeout = window.setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 35);
    } else if (!isTyping && charIndex === 0) {
      timeout = window.setTimeout(() => {
        setIsTyping(true);
        setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
      }, 600);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, phraseIndex, query]);

  const handleSearch = () => {
    if (!query.trim()) return;

    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/products?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  if (variant === 'hero') {
    return (
      <motion.div layoutId="search-bar" className="mx-auto w-full max-w-2xl">
        <div className="relative">
          <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] opacity-80" />
          <div className="relative flex items-center gap-4 rounded-full bg-[var(--color-dark-navy)] px-6 py-4">
            <Search className="h-5 w-5 flex-shrink-0 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={query ? '' : `${displayedText}|`}
              className="flex-1 bg-transparent text-lg text-white outline-none placeholder:text-gray-500"
            />
            <button
              onClick={handleSearch}
              className="rounded-full bg-white/10 p-2.5 transition-colors hover:bg-white/20"
            >
              <Mic className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layoutId="search-bar" className="w-full">
      <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="찾으시는 부품을 검색해보세요..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
        <button
          onClick={handleSearch}
          className="rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] p-2 transition-opacity hover:opacity-90"
        >
          <Mic className="h-4 w-4 text-white" />
        </button>
      </div>
    </motion.div>
  );
};

export default AnimatedSearchBar;
