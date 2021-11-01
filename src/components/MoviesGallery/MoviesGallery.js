import { NavLink } from 'react-router-dom';
import { useRouteMatch, useLocation } from 'react-router';

import s from './MoviesGallery.module.css';
import noImage from '../../image/noImage.jpg';

export default function MoviesGallery({ movies }) {
  const { url } = useRouteMatch();
  // const location = useLocation();
  return (
    <ul className={s.MoviesGallery}>
      {movies.map(movie => (
        <li key={movie.id} className={s.MoviesGalleryItem}>
          <NavLink
            to={{
              pathname: `movies/${movie.id}`,
              // state: { from: location },
            }}
            className={s.link}
            activeClassName={s.ActiveLink}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={s.MoviesGalleryItemImage}
              />
            ) : (
              <img
                src={noImage}
                alt={movie.title}
                className={s.MoviesGalleryItemImage}
              />
            )}
            <p className={s.MoviesGalleryItemDescription}>{movie.title}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
