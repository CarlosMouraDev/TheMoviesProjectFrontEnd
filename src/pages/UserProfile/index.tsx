import { useEffect, useState } from 'react';
import { getUserInfo, updatePassword } from '../../services/api';
import type { UserInfo } from '../../types/user';

export default function UserProfile() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUserInfo();
        setUser(data);
      } catch {
        setError('Erro ao carregar dados do usuário.');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError('');
    setSuccessMessage('');

    try {
      if (newPassword.length < 5 || newPassword.length > 10) {
        setError('A nova senha precisa ter entre 5 e 10 caracteres');
        return;
      }
      await updatePassword({
        currentPassword,
        newPassword,
      });
      setSuccessMessage('Senha atualizada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Erro ao atualizar senha. Verifique os dados.',
      );
    } finally {
      setSending(false);
    }
  }

  if (loading)
    return (
      <p className='min-h-[82vh] text-center text-slate-400 mt-10'>
        Carregando...
      </p>
    );

  return (
    <div className='min-h-[86vh] bg-[#0d1220] text-white flex flex-col items-center px-6 py-10'>
      <div className='w-full max-w-md bg-[#1b2233] rounded-2xl shadow-lg p-8'>
        <div className='flex flex-col items-center mb-6'>
          <div className='flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 text-3xl font-bold mb-3'>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 className='text-2xl font-semibold text-blue-400'>
            Perfil do Usuário
          </h1>
        </div>

        {error && <p className='text-red-400 text-center mb-4'>{error}</p>}
        {successMessage && (
          <p className='text-green-400 text-center mb-4'>{successMessage}</p>
        )}

        {user && (
          <div className='mb-8'>
            <div className='mb-4'>
              <p className='text-slate-400 text-sm'>Nome</p>
              <p className='text-lg font-medium'>{user.name}</p>
            </div>
            <div>
              <p className='text-slate-400 text-sm'>Email</p>
              <p className='text-lg font-medium'>{user.email}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleChangePassword} className='flex flex-col gap-4'>
          <h2 className='text-lg font-medium text-blue-400'>Alterar Senha</h2>

          <input
            type='password'
            placeholder='Senha atual'
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className='px-4 py-2 rounded-lg bg-[#101726] focus:outline-none focus:ring-2 focus:ring-blue-600'
            required
          />

          <input
            type='password'
            placeholder='Nova senha'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className='px-4 py-2 rounded-lg bg-[#101726] focus:outline-none focus:ring-2 focus:ring-blue-600'
            required
          />

          <button
            type='submit'
            disabled={sending}
            className='cursor-pointer mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Atualizando...' : 'Atualizar Senha'}
          </button>
        </form>
      </div>
    </div>
  );
}
