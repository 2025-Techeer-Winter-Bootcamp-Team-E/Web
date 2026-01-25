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
        <div className="max-w-[80%] bg-black px-4 py-3 text-sm font-light text-white">
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
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center bg-black">
        <span className="text-xs font-light text-white">AI</span>
      </div>
      <div className="max-w-[80%]">
        <div className="border border-gray-100 bg-white px-4 py-3">
          <p className="text-sm font-light leading-relaxed text-gray-700">{message.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
