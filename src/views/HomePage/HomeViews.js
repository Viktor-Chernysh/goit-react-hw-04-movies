import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchTrendingMovies } from "../../services/API";
import s from "./HomePage.module.css";

export default function HomeViews() {
  const [page, setPage] = useState(2);
  const [movies, setMovies] = useState(null);
  const onLoadMoreClick = () => {
    fetchTrendingMovies(page).then((r) => {
      setMovies((prev) => [...prev, ...r.data.results]);
      setPage((prev) => prev + 1);
    });
  };
  useEffect(() => {
    fetchTrendingMovies().then((res) => setMovies(res.data.results));
  }, []);
  return (
    <>
      {movies && (
        <>
          <ul className={s.MoviesGallery}>
            {movies.map((movie) => (
              <li key={movie.id} className={s.MoviesGalleryItem}>
                <Link
                  to={
                    `/movies/${movie.id}`
                    // {
                    // pathname: `movies/${movie.id}`,
                    // state: { from: location },
                    // }
                  }
                  className={s.Link}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={s.MoviesGalleryItemImage}
                  />
                  <p className={s.MoviesGalleryItemDescription}>
                    {movie.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className={s.ButtonWrapper}>
            <button
              className={s.Button}
              type="button"
              onClick={onLoadMoreClick}
            >
              Load more
            </button>
          </div>
        </>
      )}
    </>
  );
}
