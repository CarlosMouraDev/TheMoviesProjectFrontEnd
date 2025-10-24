import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 5 || password.length > 10) {
      setError('A senha deve ter entre 5 e 10 caracteres.');
      return;
    }

    try {
      await registerUser({ name, email, password });
      toast.success('Usuário criado com sucesso!');
      navigate('/login');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Erro ao registrar usuário';
      setError(errorMessage);
      console.log('Mensagem final:', errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#0f172a] px-6'>
      <div className='w-full max-w-md bg-[#1e293b] p-8 rounded-2xl shadow-lg'>
        <h1 className='text-3xl font-bold text-[#f1f5f9] text-center mb-6'>
          Criar conta
        </h1>

        {error && (
          <p className='text-red-400 text-center mb-4 text-sm'>{error}</p>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='block text-[#f1f5f9] text-sm mb-1'>Nome</label>
            <input
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className='w-full px-4 py-2 rounded-lg bg-[#0f172a] text-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#22d3ee]'
              placeholder='Seu nome'
            />
          </div>

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
            className='w-full mt-2 py-2 rounded-lg bg-[#6366f1] text-[#f1f5f9] font-semibold hover:bg-[#4f46e5] transition disabled:opacity-50'
          >
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        <p className='text-center text-sm text-[#94a3b8] mt-6'>
          Já tem uma conta?{' '}
          <a
            href='/login'
            className='text-[#22d3ee] hover:underline font-medium'
          >
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
