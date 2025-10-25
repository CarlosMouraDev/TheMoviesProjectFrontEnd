import { useEffect, useState } from 'react';
import { getFavorites, getUserPublicId } from '../../services/api';
import MovieCard from '../../components/MovieCard';
import type { SingleMovie } from '../../types/movies';
import { motion } from 'framer-motion';

export default function Favorites() {
  const [favorites, setFavorites] = useState<SingleMovie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [publicLink, setPublicLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Movies | Favoritos';
  }, []);

  useEffect(() => {
    const fetchFavoritesAndLink = async () => {
      try {
        const [movies, user] = await Promise.all([
          getFavorites(),
          getUserPublicId(),
        ]);
        setFavorites(movies);
        setPublicLink(user.link);
      } catch {
        setError('Erro ao carregar favoritos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoritesAndLink();
  }, []);

  const handleCopyLink = async () => {
    if (publicLink) {
      const fullLink = `${window.location.origin}/${publicLink}`;
      await navigator.clipboard.writeText(fullLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#0f172a] text-[#f1f5f9]'>
        <div className='flex flex-col items-center animate-pulse'>
          <div className='h-10 w-10 border-4 border-[#6366f1] border-t-transparent rounded-full animate-spin mb-4' />
          <p className='text-[#94a3b8] text-lg'>Carregando seus favoritos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-[#0f172a] text-red-400'>
        {error}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-[#0f172a] text-[#f1f5f9]'>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl font-bold mb-2 text-center'
        >
          Nenhum favorito ainda 😢
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-[#22d3ee]'
        >
          Adicione alguns filmes aos favoritos!
        </motion.p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#0f172a] text-[#f1f5f9] px-6 py-12'>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-3xl sm:text-4xl font-bold mb-8 text-center text-[#6366f1]'
      >
        🎬 Seus Filmes Favoritos
      </motion.h1>

      {publicLink && (
        <div className='flex justify-center mb-10'>
          <button
            onClick={handleCopyLink}
            className='flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg transition font-medium'
          >
            {copied ? '✅ Link copiado!' : '🔗 Copiar link público'}
          </button>
        </div>
      )}

      <motion.div
        layout
        className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center'
      >
        {favorites.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MovieCard
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path!}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
