import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Search, Film } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className='bg-[#0f172a] text-[#f1f5f9] shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-2 cursor-pointer hover:opacity-80 transition'
        >
          <Film size={22} className='text-[#22d3ee]' />
          <span className='text-lg font-semibold'>Home</span>
        </div>

        <nav className='hidden md:flex items-center gap-6'>
          <button
            onClick={() => navigate('/search')}
            className='flex items-center gap-2 bg-[#1b2233] px-3 py-2 rounded-lg hover:bg-[#1e293b] transition cursor-pointer'
          >
            <Search size={18} />
            <span>Pesquisar</span>
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to='/favorites'
                className='bg-[#6366f1] hover:bg-[#4f46e5] px-3 py-2 rounded-lg transition cursor-pointer'
              >
                Meus Favoritos
              </Link>

              <div
                onClick={() => navigate('/profile')}
                className='flex items-center gap-2 bg-[#1b2233] px-3 py-2 rounded-lg cursor-pointer hover:text-[#0ea5e9]'
              >
                <User size={18} className='text-[#22d3ee]' />
                <span className='font-medium'>{user}</span>
              </div>

              <button
                onClick={logout}
                className='text-sm text-red-400 hover:text-red-300 transition cursor-pointer'
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='bg-[#6366f1] hover:bg-[#4f46e5] px-3 py-2 rounded-lg transition cursor-pointer'
              >
                Login
              </Link>
              <Link
                to='/register'
                className='bg-[#22d3ee] hover:bg-[#0ea5e9] px-3 py-2 rounded-lg text-[#0f172a] font-medium transition cursor-pointer'
              >
                Criar Conta
              </Link>
            </>
          )}
        </nav>

        <button
          onClick={toggleMenu}
          className='md:hidden text-[#f1f5f9] focus:outline-none cursor-pointer'
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='md:hidden bg-[#1b2233] border-t border-[#1e293b] flex flex-col items-center gap-4 py-6'
          >
            <button
              onClick={() => {
                navigate('/search');
                setMenuOpen(false);
              }}
              className='flex items-center gap-2 hover:text-[#22d3ee] transition cursor-pointer'
            >
              <Search size={18} />
              Pesquisar
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to='/favorites'
                  onClick={() => setMenuOpen(false)}
                  className='hover:text-[#22d3ee] transition cursor-pointer'
                >
                  Meus Favoritos
                </Link>

                <div
                  onClick={() => navigate('/profile')}
                  className='flex items-center gap-2 hover:text-[#22d3ee] cursor-pointer'
                >
                  <User size={18} className='text-[#22d3ee]' />
                  <span>{user}</span>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className='text-sm text-red-400 hover:text-red-300 transition cursor-pointer'
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  onClick={() => setMenuOpen(false)}
                  className='hover:text-[#22d3ee] transition cursor-pointer'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  onClick={() => setMenuOpen(false)}
                  className='hover:text-[#22d3ee] transition cursor-pointer'
                >
                  Criar Conta
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
