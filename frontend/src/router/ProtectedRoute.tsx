import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLoader from '../components/shared/PageLoader';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  return isAuthenticated ? (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
