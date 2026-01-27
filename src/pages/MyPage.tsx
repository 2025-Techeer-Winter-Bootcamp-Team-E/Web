import SidebarMenu from '@/components/myPage/SidebarMenu';
import UserProfile from '@/components/myPage/UserProfile';
import useRequireAuth from '@/hooks/useRequireAuth';
import { Outlet } from 'react-router-dom';

const MyPage = () => {
  const { isAuthenticated } = useRequireAuth();
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <h1 className="mb-8 ml-4 text-3xl font-bold text-gray-900">마이페이지</h1>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="w-full space-y-4 lg:sticky lg:top-24 lg:w-64 lg:shrink-0">
            <UserProfile />
            <SidebarMenu />
          </aside>
          <main className="flex-1">
            <div className="min-h-125">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
