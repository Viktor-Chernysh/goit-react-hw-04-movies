import { useEffect, useState } from 'react';
import ScrollUpButton from 'react-scroll-up-button';

import { fetchTrendingMovies } from '../../services/API';
import Button from '../../components/Button/Button';
import MoviesGallery from '../../components/MoviesGallery/MoviesGallery';

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState(null);
  console.log(page);
  const onLoadMoreClick = () => {
    fetchTrendingMovies(page).then(r => {
      setMovies(prev => [...prev, ...r.data.results]);
      setPage(prev => prev + 1);
    });
  };
  useEffect(() => {
    fetchTrendingMovies().then(res => {
      setMovies(res.data.results);
      setPage(prev => prev + 1);
    });
  }, []);

  return (
    <>
      {movies && (
        <>
          <MoviesGallery movies={movies} />
          <Button onClick={onLoadMoreClick} />
          <ScrollUpButton />
        </>
      )}
    </>
  );
}
