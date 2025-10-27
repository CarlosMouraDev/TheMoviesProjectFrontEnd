import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// Login page
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Movies | Login';
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError('Email ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-[87vh] md:min-h-[85.5vh] bg-[#0d1220] flex items-center justify-center px-6'>
      <div className='w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-lg'>
        <h1 className='text-3xl font-bold text-[#f1f5f9] text-center mb-6'>
          Entrar na sua conta
        </h1>

        {error && (
          <p className='text-red-400 text-center mb-4 text-sm'>{error}</p>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='block text-[#f1f5f9] text-sm mb-1'>E-mail</label>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='w-full px-4 py-2 rounded-lg bg-[#0f172a] text-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#22d3ee]'
              placeholder='seu@email.com'
            />
          </div>

          <div>
            <label className='block text-[#f1f5f9] text-sm mb-1'>Senha</label>
            <input
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className='w-full px-4 py-2 rounded-lg bg-[#0f172a] text-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#22d3ee]'
              placeholder='••••••••'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full mt-2 py-2 rounded-lg bg-[#6366f1] text-[#f1f5f9] font-semibold hover:bg-[#4f46e5] transition disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed'
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className='text-center text-sm text-[#94a3b8] mt-6'>
          Não tem uma conta?{' '}
          <a
            href='/register'
            className='text-[#22d3ee] hover:underline font-medium'
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
