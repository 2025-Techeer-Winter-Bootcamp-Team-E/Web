import { motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType } from '@/types/chatbotType';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  if (message.role === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-black px-4 py-3 text-sm font-normal text-white shadow-lg">
          {message.content}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="ai-icon-animated flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl">
        <span className="text-xs font-medium text-white">AI</span>
      </div>
      <div className="max-w-[80%]">
        <div className="rounded-2xl rounded-tl-sm border border-gray-100/50 bg-white/60 px-4 py-3 backdrop-blur-sm">
          <p className="text-sm font-normal leading-relaxed text-gray-700">{message.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
