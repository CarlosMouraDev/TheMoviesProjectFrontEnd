import { useEffect, useState } from 'react';
import { getPopularMovies } from '../../services/api';
import MovieCard from '../../components/MovieCard';
import type { Movie } from '../../types/movies';
import Pagination from '../../components/Pagination';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = 'Movies | Home';
  }, []);

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();

    setLoading(true);
    setError('');
    try {
      const data = await getPopularMovies(page);
      setMovies(data.movies);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error('Erro ao carregar filmes:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [page]);

  return (
    <div className='min-h-[87vh] md:min-h-[85.5vh] bg-[#0d1220] text-[#f1f5f9]'>
      <header className='text-center py-10'>
        <h1 className='text-4xl font-bold text-[#22d3ee] mb-2'>
          🎬 Filmes Populares
        </h1>
        <p className='text-slate-400'>Descubra os destaques do momento</p>
      </header>

      {error && <p className='text-center text-red-400'>{error}</p>}
      {loading ? (
        <p className='text-center text-slate-400'>Carregando...</p>
      ) : (
        <>
          <div className='px-6 pb-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path!}
                releaseDate={movie.release_date}
                rating={movie.vote_average}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
