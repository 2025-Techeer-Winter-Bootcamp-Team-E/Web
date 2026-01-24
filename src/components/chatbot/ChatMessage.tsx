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
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)] px-4 py-3 text-sm text-white">
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
      <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-r from-[var(--color-gradient-purple)] to-[var(--color-gradient-blue)]" />
      <div className="max-w-[80%]">
        <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3">
          <p className="text-sm leading-relaxed text-gray-700">{message.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
