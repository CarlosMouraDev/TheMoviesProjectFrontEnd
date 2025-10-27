import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import HomePage from '../../pages/Home';
import { useEffect } from 'react';
import SearchMovies from '../../pages/Search';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import MovieDetails from '../../pages/MovieDetails';
import PrivateRoute from '../../components/PrivateRoute';
import Favorites from '../../pages/Favorites';
import PublicFavorites from '../../pages/PublicFavorites';
import { MainTemplate } from '../../Templates/MainTemplate';
import UserProfile from '../../pages/UserProfile';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchMovies />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route
            path='/favorites/public/:publicId'
            element={<PublicFavorites />}
          />
          <Route
            path='/favorites'
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
        <ScrollToTop />
      </MainTemplate>
    </BrowserRouter>
  );
}
