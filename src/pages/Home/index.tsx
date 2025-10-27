import { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/api';
import MovieCard from '../../components/MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Movies | Home';
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (err) {
        console.error('Erro ao carregar filmes:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className='min-h-[86vh] bg-[#0f172a] text-[#f1f5f9]'>
      <header className='text-center py-10'>
        <h1 className='text-4xl font-bold text-[#22d3ee] mb-2'>
          🎬 Filmes Populares
        </h1>
        <p className='text-slate-400'>Descubra os destaques do momento</p>
      </header>

      {loading ? (
        <p className='text-center text-slate-400'>Carregando...</p>
      ) : (
        <div className='px-6 pb-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
            />
          ))}
        </div>
      )}
    </div>
  );
}
