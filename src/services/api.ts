import axios, { type AxiosRequestConfig } from 'axios';
import type { AuthResponse } from '../types/user';
import type { MovieApiResponse, SingleMovie } from '../types/movies';
import { toast } from 'react-toastify';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function request<T>(
  endpoint: string,
  options: AxiosRequestConfig = {},
  useAuth = false,
): Promise<T> {
  try {
    const config: AxiosRequestConfig = {
      url: endpoint,
      ...options,
    };

    if (!useAuth) {
      config.headers = { ...(config.headers || {}) };
      delete config.headers.Authorization;
    }

    const res = await api.request<T>(config);
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      toast.info('Faça login novamente');
    }
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;
    throw new Error(message, status);
  }
}

// ==================================================
// 🔹 MOVIES (public)
// ==================================================
export async function getPopularMovies(): Promise<any[]> {
  const data = await request<{ results: any[] }>('/movies/popular');
  return data.results;
}

export async function searchMovies(query: string, page = 1) {
  const response = await request<MovieApiResponse>(
    `/movies/search?query=${encodeURIComponent(query)}&page=${page}`,
  );
  return {
    movies: response.results,
    page: response.page,
    total_pages: response.total_pages,
    total_results: response.total_results,
  };
}

export async function getMovieById(id: string | number) {
  return request<SingleMovie>(`/movies/${id}`);
}

// ==================================================
// 🔹 USER (not protected)
// ==================================================
export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  return request('/users/register', {
    method: 'POST',
    data: userData,
  });
}

export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const data = await request<AuthResponse>(
    '/auth/login',
    {
      method: 'POST',
      data: JSON.stringify(credentials),
    },
    false,
  );

  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('user', JSON.stringify({ name: data.name }));

  return data;
}

// ==================================================
// 🔹 FAVORITES (need login)
// ==================================================
export async function addFavorite(
  movieId: number,
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(
    '/favorites',
    {
      method: 'POST',
      data: { movieId },
    },
    true,
  );
}

export async function removeFavorite(
  movieId: number,
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(
    `/favorites/${movieId}`,
    { method: 'DELETE' },
    true,
  );
}

export async function getFavorites(): Promise<SingleMovie[]> {
  return request<SingleMovie[]>('/favorites', {}, true);
}

// ==================================================
// 🔹 PUBLIC FAVORITES LINK
// ==================================================
export async function getUserPublicId(): Promise<{ publicId: string }> {
  return request<{ publicId: string }>('/favorites/public-id', {}, true);
}

export async function getFavoritesByPublicId(publicId: string): Promise<[]> {
  return request<[]>(`/favorites/public/${publicId}`);
}
