import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import HomePage from '../../pages/Home';
import { useEffect } from 'react';
import SearchMovies from '../../pages/Search';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

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
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchMovies />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
