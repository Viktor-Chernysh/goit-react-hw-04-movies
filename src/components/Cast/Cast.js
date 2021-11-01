import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchCast } from '../../services/API';

import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchCast(movieId).then(res => setCast(res.data.cast));
  }, [movieId]);

  return (
    <>
      {cast && (
        <>
          <ul className={s.ImageGallery}>
            {!cast.length ? (
              <p className={s.EmptyCast}>
                We don't have any actors for this movie!
              </p>
            ) : (
              cast.map(el => {
                return (
                  <li key={el.id} className={s.ImageGalleryItem}>
                    {el.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                        alt={el.name}
                        className={s.ImageGalleryItemImage}
                      />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNGGjrfSqqv8UjL18xS4YypbK-q7po_8oVQ&usqp=CAU"
                        alt={el.name}
                        className={s.ImageGalleryItemImage}
                      />
                    )}
                    <p className={s.ImageGalleryItemName}>{el.name}</p>
                  </li>
                );
              })
            )}
          </ul>
        </>
      )}
      {/* {emptyCast && (
        <p className={s.EmptyCast}>We don't have any actors for this movie!</p>
      )} */}
    </>
  );
}
