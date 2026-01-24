import { useLocation, Outlet } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const GlobalLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <div
      className={`flex min-h-screen flex-col ${
        isMainPage ? 'bg-[var(--color-dark-navy)]' : 'bg-white'
      }`}
    >
      <Header />
      <main className="mt-16 flex-1">
        <Outlet />
      </main>
      {!isMainPage && <Footer />}
    </div>
  );
};

export default GlobalLayout;
