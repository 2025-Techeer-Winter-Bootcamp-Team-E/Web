import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ROUTE_PATH } from '@/routes/path';

const PublicOnlyRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTE_PATH.ROOT} replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
