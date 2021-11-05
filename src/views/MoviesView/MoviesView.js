import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import ScrollUpButton from 'react-scroll-up-button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchMovieBySearch } from '../../services/API';
import MoviesSearchBar from '../../components/MoviesSearchBar/MoviesSearchBar';
import Button from '../../components/Button/Button';
import MoviesGallery from '../../components/MoviesGallery/MoviesGallery';
import noResults from '../../image/noResult.gif';
import s from './MoviesView.module.css';

export default function MoviesViews() {
  const [movies, setMovies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();

  const search = new URLSearchParams(location.search).get('search');
  console.log(page);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    if (query === searchQuery) {
      setPage(1);
    }
    fetchMovieBySearch(query).then(res => {
      setMovies(res.data.results);
      setPage(prev => prev + 1);
    });

    history.push({ ...location, search: `search=${query}` });
  };
  // console.log(location);

  const onLoadMoreClick = () => {
    if (search) {
      fetchMovieBySearch(search, page).then(r => {
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
      return;
    }
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
  useEffect(() => {
    if (!search) {
      return;
    }
    if (searchQuery !== search) {
      fetchMovieBySearch(search).then(res => {
        setMovies(res.data.results);
        setPage(prev => prev + 1);
      });
    }
  }, [search, searchQuery]);

  return (
    <>
      <MoviesSearchBar onFormSubmit={handleFormSubmit} />
      {movies &&
        (movies.length === 0 ? (
          <>
            <img
              src={noResults}
              alt="sorry but no results"
              className={s.NoResults}
            />
            <h2 className={s.NoResults}>
              Sorry, there is no movie with a title : "{searchQuery}".
            </h2>
          </>
        ) : (
          <>
            <MoviesGallery movies={movies} />
            <Button onClick={onLoadMoreClick} />
            <ScrollUpButton />
          </>
        ))}
    </>
  );
}
