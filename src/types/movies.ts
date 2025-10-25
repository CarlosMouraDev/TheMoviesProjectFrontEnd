export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
  release_date: string;
  backdrop_path: string | null;
  popularity: number;
}

export interface MovieApiResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

export interface SingleMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
  production_countries: { name: string }[];
  spoken_languages: { english_name: string }[];
  vote_average: number;
  vote_count: number;
}

export interface PublicResponse {
  name: string;
  movies: SingleMovie[];
}
