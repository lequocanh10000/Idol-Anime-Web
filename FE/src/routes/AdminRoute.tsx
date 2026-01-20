import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.tsx';

export function AdminRoute() {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/anime" replace />;
  return <Outlet />;
}
