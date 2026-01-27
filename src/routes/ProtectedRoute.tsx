import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ROUTE_PATH } from '@/routes/path';
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    toast.warn('로그인이 필요한 서비스입니다.');
    return <Navigate to={ROUTE_PATH.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
