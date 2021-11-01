import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { fetchReviews } from '../../services/API';
import s from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  // console.log(reviews);

  useEffect(() => {
    fetchReviews(movieId).then(res => setReviews(res.data.results));
  }, [movieId]);

  return (
    <>
      {reviews && (
        <>
          <ul className={s.ReviewsList}>
            {!reviews.length ? (
              <h2>We don't any reviews for this movie</h2>
            ) : (
              reviews.map(author => (
                <li key={author.id}>
                  <h2>Author: {author.author}</h2>
                  <p>'{author.content}'</p>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </>
  );
}
