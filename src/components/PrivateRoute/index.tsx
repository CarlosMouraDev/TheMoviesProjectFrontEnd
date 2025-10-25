import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { JSX } from 'react';

interface Props {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: Props) {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#0f172a] text-[#f1f5f9]'>
        Carregando...
      </div>
    );
  if (!isAuthenticated) return <Navigate to='/login' replace />;

  return children;
}
