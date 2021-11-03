import { Route, useParams, useRouteMatch } from 'react-router';
import { useEffect, useState, lazy } from 'react';
import Loader from 'react-loader-spinner';

import { fetchMovieById } from '../../services/API';
import s from './MovieDetailsPage.module.css';
import { NavLink } from 'react-router-dom';
// import Cast from '../Cast/Cast';
// import Reviews from '../Reviews/Reviews';
import { Suspense } from 'react';
import noImage from '../../image/noImage.jpg';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

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
          <button type="button">Go back</button>
          {movie.poster_path && (
            <div className={s.ImageWrapper}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={s.MoviesGalleryItemImage}
                  width="300"
                />
              ) : (
                <img
                  src={noImage}
                  alt={movie.title}
                  className={s.MoviesGalleryItemImage}
                />
              )}
              <p className={s.MoviesGalleryItemDescription}>
                Рейтинг: {movie.vote_average}
              </p>
              <p className={s.MoviesGalleryItemDescription}>{movie.title}</p>
              <div className={s.AboutMovie}>{movie.overview}</div>
            </div>
          )}
        </div>
      )}

      <NavLink
        to={`${url}/cast`}
        className={s.Link}
        activeClassName={s.ActiveLink}
        movie={movie}
      >
        Cast
      </NavLink>
      <NavLink
        to={`${url}/reviews`}
        className={s.Link}
        activeClassName={s.ActiveLink}
      >
        Reviews
      </NavLink>

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
