import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import { fetchMovieById } from "../../services/API";
import s from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
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
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width="300"
        />
      ) : (
        <h2>nothing</h2>
      )}
    </>
  );
}
