import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFavoritesByPublicId } from '../../services/api';
import type { PublicResponse } from '../../types/movies';
import MovieCard from '../../components/MovieCard';

export default function PublicFavorites() {
  const { publicId } = useParams<{ publicId: string }>();
  const [data, setData] = useState<PublicResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicFavorites = async () => {
      if (!publicId) {
        setError('Link inválido.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await getFavoritesByPublicId(publicId);
        setData(response);
      } catch (err) {
        setError('Favoritos não encontrados ou link inválido.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicFavorites();
  }, [publicId]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#0f172a] text-[#f1f5f9]'>
        Carregando favoritos públicos...
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-red-400 gap-4'>
        <p>{error}</p>
        <button
          onClick={() => navigate('/')}
          className='bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg transition'
        >
          Voltar à página inicial
        </button>
      </div>
    );
  }

  if (!data || data.movies.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-[#f1f5f9]'>
        <h1 className='text-2xl font-semibold mb-2'>
          {data?.name
            ? `${data.name} ainda não tem favoritos 😢`
            : 'Nenhum favorito encontrado'}
        </h1>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#0f172a] p-8 text-[#f1f5f9]'>
      <div className='flex flex-col items-center mb-8'>
        <h1 className='text-3xl font-bold text-[#6366f1] text-center'>
          🎬 Favoritos de {data.name}
        </h1>
        <p className='text-[#94a3b8] mt-1 text-sm'>
          Lista compartilhada publicamente
        </p>
      </div>

      <div className='px-6 pb-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {data.movies.map(movie => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path!}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </div>
  );
}
