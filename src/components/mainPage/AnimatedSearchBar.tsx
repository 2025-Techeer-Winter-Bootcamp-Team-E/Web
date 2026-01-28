import { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/contexts/NavigationContext';
import { PATH } from '@/routes/path';

const TYPING_PHRASES = [
  '편집용 고사양 노트북 추천해줘',
  'RTX 4070 그래픽카드 최저가 비교',
  '예산 150만원 가성비 조립 PC',
  '게이밍 PC 견적 추천해줘',
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
  const { navigateWithAnimation } = useNavigation();
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
      navigateWithAnimation(`${PATH.AI_AGENT}?q=${encodeURIComponent(query)}`);
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
      <motion.div layoutId="search-bar" className="mx-auto w-full max-w-xl">
        <div className="relative">
          <div className="flex items-center gap-4 rounded-full bg-white/90 px-6 py-4 shadow-lg backdrop-blur-sm">
            <Search className="h-5 w-5 shrink-0 text-black" strokeWidth={1.5} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={query ? '' : displayedText}
              className="flex-1 bg-transparent text-lg font-light text-black outline-none placeholder:text-gray-400"
            />
            <button
              onClick={handleSearch}
              className="rounded-full bg-black p-2 text-white transition-opacity hover:opacity-80"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layoutId="search-bar" className="w-full">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-2 py-3">
        <Search className="h-4 w-4 shrink-0 text-gray-400" strokeWidth={1.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="찾으시는 상품을 검색해보세요"
          className="flex-1 bg-transparent text-sm font-light outline-none placeholder:text-gray-400"
        />
        <button
          onClick={handleSearch}
          className="rounded-full bg-black p-2 transition-opacity hover:opacity-70"
        >
          <ArrowRight className="h-4 w-4 text-white" strokeWidth={1.5} />
        </button>
      </div>
    </motion.div>
  );
};

export default AnimatedSearchBar;
