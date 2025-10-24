import type { AuthResponse } from '../types/user';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  useAuth = false,
): Promise<T> {
  const headers: any = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (useAuth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Erro ${res.status} em ${endpoint}: ${errorText || res.statusText}`,
    );
  }

  return res.json();
}

// ==================================================
// 🔹 FILMES (públicos)
// ==================================================
export async function getPopularMovies(): Promise<[]> {
  const data = await request<{ results: [] }>('/movies/popular');
  return data.results;
}

export async function searchMovies(query: string): Promise<[]> {
  const data = await request<{ results: [] }>(
    `/movies/search?query=${encodeURIComponent(query)}`,
  );
  return data.results;
}

export async function getMovieById(id: string | number) {
  return request(`/movies/${id}`);
}

// ==================================================
// 🔹 USUÁRIO (não protegido)
// ==================================================
export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  return request('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export async function loginUser(credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const data = await request<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  localStorage.setItem('token', data.token);
  return data;
}

// ==================================================
// 🔹 FAVORITOS (requer login)
// ==================================================
export async function addFavorite(
  movieId: number,
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(
    '/favorites',
    {
      method: 'POST',
      body: JSON.stringify({ movieId }),
    },
    true, // requer token
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

export async function getFavorites(): Promise<[]> {
  return request<[]>('/favorites', {}, true);
}

// ==================================================
// 🔹 LINKS PÚBLICOS DE FAVORITOS
// ==================================================
export async function getUserPublicId(): Promise<{ publicId: string }> {
  return request<{ publicId: string }>('/favorites/public-id', {}, true);
}

export async function getFavoritesByPublicId(publicId: string): Promise<[]> {
  return request<[]>(`/favorites/public/${publicId}`);
}
