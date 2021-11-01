import { useEffect, useState } from 'react';

import { fetchMovieBySearch } from '../../services/API';
import MoviesPage from '../../components/MoviesPage/MoviesSearchBar';

export default function MoviesViews() {
  const [movies, setMovies] = useState(null);

  // console.log(movie);

  const handleFormSubmit = query => {
    // setSerchQuery(query);
    // setPage(1);
    setMovies([]);
    // history.push({ ...location, search: `query=${query}` });
  };

  return <MoviesPage onFormSubmit={handleFormSubmit} />;
}
