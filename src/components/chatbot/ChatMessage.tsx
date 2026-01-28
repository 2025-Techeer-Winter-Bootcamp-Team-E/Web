import { motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType } from '@/types/chatbotType';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  const isLoading = message.type === 'loading';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-black text-white' : 'border border-gray-100 bg-white/80 text-gray-800'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">{message.content}</span>
            <div className="loading-dots flex gap-1">
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
              <span className="loading-dot"></span>
            </div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed font-light whitespace-pre-wrap">
            {message.content}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
