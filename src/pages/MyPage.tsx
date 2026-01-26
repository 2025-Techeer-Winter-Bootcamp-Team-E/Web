import SidebarMenu from '@/components/myPage/SidebarMenu';
import UserProfile from '@/components/myPage/UserProfile';
import useRequireAuth from '@/hooks/useRequireAuth';
import { Outlet } from 'react-router-dom';

const MyPage = () => {
  const { isAuthenticated } = useRequireAuth();
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-6xl px-8 py-12">
        <h1 className="mb-8 ml-4 text-3xl font-bold text-gray-900">마이페이지</h1>
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="w-full space-y-4 lg:w-72 lg:shrink-0">
            <UserProfile />
            <SidebarMenu />
          </aside>
          <main className="flex-1">
            <div className="min-h-125 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
