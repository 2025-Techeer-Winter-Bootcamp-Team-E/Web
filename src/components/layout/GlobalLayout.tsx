import { useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { useNavigation } from '@/contexts/NavigationContext';

const GlobalLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const { isExiting } = useNavigation();

  // 메인 페이지에서 나가는 중 (exit 애니메이션 - 로고와 검색창이 바깥으로 퍼짐)
  // isExiting 체크를 먼저 해야 함!
  if (isExiting) {
    return (
      <div className="flex min-h-screen flex-col bg-white overflow-hidden">
        <Header />
        <main className="mt-16 flex-1">
          <section className="relative min-h-screen overflow-hidden bg-white">
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
              {/* 로고 - 위로 퍼짐 */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -150 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 text-center"
              >
                <img
                  src="/videos/logo.png"
                  alt="WYW - Whatever You Want"
                  className="mx-auto mb-6 h-20 w-auto md:h-24 lg:h-28"
                />
                <p className="text-sm font-light tracking-[0.2em] text-gray-500">
                  당신이 원하는 제품은 이곳에 전부 있습니다.
                </p>
              </motion.div>

              {/* 검색창 - 아래로 퍼짐 */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: 150 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xl"
              >
                <div className="mx-auto w-full max-w-xl">
                  <div className="relative">
                    <div className="flex items-center gap-4 border-b border-black px-2 py-4">
                      <Search className="h-5 w-5 flex-shrink-0 text-black" strokeWidth={1.5} />
                      <span className="flex-1 text-lg font-light text-gray-400">검색어를 입력하세요</span>
                      <div className="rounded-full p-2 text-black">
                        <ArrowRight className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 하단 텍스트 - 아래로 퍼짐 */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: 100 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 text-center"
              >
                <p className="text-sm font-light tracking-wide text-gray-400">
                  원하는 제품을 검색하고 최저가를 비교해보세요
                </p>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // 메인 페이지 (진입 애니메이션)
  if (isMainPage) {
    return (
      <div className="flex min-h-screen flex-col bg-[var(--color-dark-navy)]">
        <Header />
        <main className="mt-16 flex-1">
          <motion.div
            key="main-page"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    );
  }

  // 다른 모든 페이지는 애니메이션 없이 렌더링
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mt-16 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
