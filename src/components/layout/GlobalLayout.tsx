import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useNavigation } from '@/contexts/NavigationContext';
import AIChatbotPanel from '@/components/chatbot/AIChatbotPanel';
import { useChatbotData } from '@/hooks/useChatbotData';
import { useEffect } from 'react';
import { PATH } from '@/routes/path';

const GlobalLayout = () => {
  const { state, actions } = useChatbotData();
  const { isExiting } = useNavigation();
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const isAIAgentPage = location.pathname === PATH.AI_AGENT;

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    if (isAIAgentPage) {
      actions.toggleAIPanel(true);
    } else if (!isMainPage) {
      actions.toggleAIPanel(false);
    }
  }, [isAIAgentPage, isMainPage]);

  const showChatbot = !isMainPage && !isExiting;

  const renderChatbot = () => {
    if (!showChatbot) return null;
    return (
      <>
        <AnimatePresence>
          {/* state.isAIPanelOpen 사용 */}
          {state.isAIPanelOpen && (
            <motion.div
              initial={{ x: 340, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 340, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-35 right-6 z-40 h-[calc(100vh-170px)] w-85"
            >
              <AIChatbotPanel
                actions={actions}
                onLlmResult={actions.handleLlmResult}
                onShoppingResult={actions.handleShoppingResult}
                onClose={() => actions.toggleAIPanel(false)}
                initialQuery={query || ''}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!state.isAIPanelOpen && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => actions.toggleAIPanel(true)}
              className="fixed right-6 bottom-6 z-50 flex cursor-pointer items-center justify-center"
            >
              <motion.img
                src="/ai-logo.png"
                alt="AI Assistant"
                className="h-24 w-24 object-contain drop-shadow-xl"
              />
            </motion.button>
          )}
        </AnimatePresence>
      </>
    );
  };

  // 1. 메인에서 나가는 중일 때
  if (isExiting) {
    return (
      <div className="flex min-h-screen flex-col overflow-hidden bg-[#f5f5f7]">
        <Header />
        <main className="mt-16 flex-1">
          <section className="relative min-h-screen overflow-hidden bg-[#f5f5f7]">
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -150 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 text-center"
              >
                <p className="text-sm font-light tracking-[0.2em] text-gray-500">
                  당신이 원하는 제품은 이곳에 전부 있습니다.
                </p>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // 2. 메인 페이지 진입 시 (챗봇 없음)
  if (isMainPage) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
        <Header />
        <main className="flex-1">
          <motion.div
            key="main-page"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // 3. 일반 페이지 (챗봇 포함)
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <Header />
      <main
        className={`flex-1 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          !isMainPage ? 'mt-16' : ''
        } ${state.isAIPanelOpen && !isMainPage ? 'pr-85' : 'pr-0'}`}
      >
        <Outlet context={{ ...state, actions }} />
      </main>
      {renderChatbot()}
      <Footer />
    </div>
  );
};

export default GlobalLayout;
