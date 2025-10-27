import { useState, useEffect } from 'react';
import { searchMovies } from '../../services/api';
import MovieCard from '../../components/MovieCard';
import Pagination from '../../components/Pagination';
import type { Movie } from '../../types/movies';

export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = 'Movies | Pesquisar';
  }, []);

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await searchMovies(query, page);
      setMovies(response.movies || []);
      setTotalPages(response.total_pages || 1);
    } catch (err) {
      setError('Erro ao buscar filmes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (query) handleSearch();
  }, [page, query]);

  return (
    <div className='min-h-[87vh] bg-[#0d1220] text-white pt-10'>
      <form
        onSubmit={handleSearch}
        className='flex justify-center gap-2 mb-10 px-4'
      >
        <input
          type='text'
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder='Pesquisar filmes...'
          className='w-full max-w-2xl px-4 py-2 rounded-lg bg-[#1b2233] text-white focus:outline-none focus:ring-2 focus:ring-blue-600'
        />
        <button
          type='submit'
          className='cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium'
        >
          Buscar
        </button>
      </form>

      {error && <p className='text-center text-red-400'>{error}</p>}
      {loading ? (
        <p className='text-center text-slate-400'>Carregando...</p>
      ) : movies.length > 0 ? (
        <>
          <div className='px-6 pb-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {movies
              .filter(movie => movie.poster_path && movie.release_date)
              .map(movie => (
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
      ) : (
        !loading && (
          <p className='text-center text-slate-400'>
            Nenhum filme encontrado. Tente buscar algo como “Batman”.
          </p>
        )
      )}
    </div>
  );
}
