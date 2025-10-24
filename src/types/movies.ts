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
