import { Route, useParams, useRouteMatch } from 'react-router';
import { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import { fetchMovieById } from '../../services/API';
import s from './MovieDetailsPage.module.css';
import { NavLink } from 'react-router-dom';
import Cast from '../Cast/Cast';
import Reviews from '../Reviews/Reviews';
import { Suspense } from 'react';

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  if (movie === null) {
    return (
      <Loader
        className={s.Loader}
        type="BallTriangle"
        color="#f38021"
        height={100}
        width={100}
      />
    );
  }

  return (
    <>
      {movie && (
        <div>
          {movie.poster_path ? (
            <div className={s.ImageWrapper}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width="300"
              />
            </div>
          ) : (
            <h2>no image</h2>
          )}
        </div>
      )}

      <NavLink to={`${url}/cast`}>Cast</NavLink>
      <NavLink to={`${url}/reviews`}>Reviews</NavLink>
      <Suspense
        fallback={
          <Loader
            className={s.Loader}
            type="BallTriangle"
            color="#f38021"
            height={100}
            width={100}
          />
        }
      >
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
