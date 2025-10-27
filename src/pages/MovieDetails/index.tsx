import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getMovieById,
  addFavorite,
  removeFavorite,
  getFavorites,
} from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import type { SingleMovie } from '../../types/movies';
import { Star, Heart, HeartOff, CircleOff } from 'lucide-react';

// Show movie details and add/remove favorite if user is loged in
export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriting, setFavoriting] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = `Movies | detalhes`;
  }, []);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieById(id!);
        setMovie(data);

        if (isAuthenticated) {
          const favorites: SingleMovie[] = await getFavorites();
          const isFav = favorites.some(fav => fav.id === Number(id));
          setIsFavorite(isFav);
        }
      } catch {
        toast.error('Erro ao carregar detalhes do filme.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id, isAuthenticated]);

  async function handleFavorite() {
    if (!movie) return;
    setFavoriting(true);
    try {
      if (isFavorite) {
        await removeFavorite(movie.id);
        setIsFavorite(false);
        toast.info('Removido dos favoritos.');
      } else {
        await addFavorite(movie.id);
        setIsFavorite(true);
        toast.success('Adicionado aos favoritos!');
      }
    } catch {
      toast.error('Erro ao atualizar favoritos.');
    } finally {
      setFavoriting(false);
    }
  }

  if (loading)
    return (
      <p className='min-h-[87vh] md:min-h-[85.5vh] bg-[#0d1220] text-center mt-10 text-[#94a3b8]'>
        Carregando...
      </p>
    );

  if (!movie)
    return (
      <p className='min-h-[87vh] md:min-h-[85.5vh] bg-[#0d1220] text-center mt-10 text-[#94a3b8]'>
        Filme não encontrado.
      </p>
    );

  return (
    <div className='min-h-[87vh] md:min-h-[85.5vh] bg-[#0d1220] text-[#f1f5f9]'>
      <div
        className='relative h-[400px] bg-cover bg-center'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className='absolute inset-0 bg-linear-to-t from-[#0d1220] via-[#0f172a]/60 to-transparent' />
      </div>

      <div className='max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10'>
        <div className='flex flex-col items-center'>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/placeholder.png'
            }
            alt={movie.title}
            className='rounded-2xl shadow-lg w-full max-w-[300px]'
          />

          {isAuthenticated && (
            <button
              onClick={handleFavorite}
              disabled={favoriting}
              className={`mt-6 px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed ${
                favoriting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : isFavorite
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-[#6366f1] hover:bg-[#4f46e5]'
              }`}
            >
              {favoriting ? (
                <CircleOff />
              ) : isFavorite ? (
                <HeartOff size={18} />
              ) : (
                <Heart size={18} />
              )}
              {favoriting
                ? 'Atualizando...'
                : isFavorite
                ? 'Remover dos Favoritos'
                : 'Adicionar aos Favoritos'}
            </button>
          )}
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-3 text-[#22d3ee]'>
            {movie.title || 'Não informado'}
          </h1>

          <p className='text-[#cbd5e1] mb-6 italic'>
            {movie.overview || 'Descrição não informada'}
          </p>

          <div className='grid sm:grid-cols-2 gap-y-3'>
            <p>
              <span className='font-semibold text-[#22d3ee]'>Lançamento:</span>{' '}
              {new Date(movie.release_date).toLocaleDateString('pt-BR') ||
                'Não informado'}
            </p>

            <p>
              <span className='font-semibold text-[#22d3ee]'>
                País de origem:
              </span>{' '}
              {movie.production_countries?.map(c => c.name).join(', ') ||
                'Não informado'}
            </p>

            <p>
              <span className='font-semibold text-[#22d3ee]'>Gêneros:</span>{' '}
              {movie.genres?.map(g => g.name).join(', ') || 'Não informado'}
            </p>

            <p>
              <span className='font-semibold text-[#22d3ee]'>Linguagens:</span>{' '}
              {movie.spoken_languages?.map(l => l.english_name).join(', ') ||
                'Não informado'}
            </p>

            <p>
              <span className='font-semibold text-[#22d3ee]'>Produtoras:</span>{' '}
              {movie.production_companies?.map(c => c.name).join(', ') ||
                'Não informado'}
            </p>

            <p className='flex items-center gap-1'>
              <Star className='text-yellow-400' size={18} />
              {movie.vote_average?.toFixed(1) || 'N/A'} ({movie.vote_count || 0}{' '}
              votos)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
