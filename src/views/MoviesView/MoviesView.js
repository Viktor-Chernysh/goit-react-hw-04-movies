import { useState } from 'react';
import ScrollUpButton from 'react-scroll-up-button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchMovieBySearch } from '../../services/API';
import MoviesSearchBar from '../../components/MoviesSearchBar/MoviesSearchBar';
import Button from '../../components/Button/Button';
import MoviesGallery from '../../components/MoviesGallery/MoviesGallery';

export default function MoviesViews() {
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    fetchMovieBySearch(query).then(res => {
      setMovies(res.data.results);
      setPage(2);
    });
    // setPage(1);
    // setMovies([]);
    // history.push({ ...location, search: `query=${query}` });
  };
  const onLoadMoreClick = () => {
    fetchMovieBySearch(searchQuery, page).then(r => {
      if (r.data.results.length === 0) {
        toast.warning('Больше фильмов нет =(', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      setMovies(prev => [...prev, ...r.data.results]);
      setPage(prev => prev + 1);
    });
  };
  // useEffect(() => {
  //   if (searchQuery === '') {
  //     return;
  //   }
  //   fetchMovieBySearch(searchQuery).then(res => {
  //     setMovies(res.data.results);
  //   });
  // }, [searchQuery]);
  return (
    <>
      <MoviesSearchBar onFormSubmit={handleFormSubmit} />
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
