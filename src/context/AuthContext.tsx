import { createContext, useState, useEffect, type ReactNode } from 'react';
import { loginUser } from '../services/api';

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed.name);
    }

    setLoading(false);
  }, []);

  // log in the user
  const login = async (email: string, password: string) => {
    const data = await loginUser({ email, password });
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify({ name: data.name }));
    setUser(data.name);
  };

  // log out the user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
