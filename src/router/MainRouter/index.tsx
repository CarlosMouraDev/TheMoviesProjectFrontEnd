import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import HomePage from '../../pages/Home';
import { useEffect } from 'react';

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
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}
