'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../../../lib/fetcher'
import styles from './RecipeReviews.module.sass'

interface Review {
  id: number
  authorAlias: string
  rating: number
  comment: string
  createdAt: string
}

interface Props {
  idRecipe: string
}

export function RecipeReviews({ idRecipe }: Props) {
  // Wrapper para SWR: asegura Promise<Review[]>
  const fetchReviews = async (url: string): Promise<Review[]> => {
    const data = await fetcher<Review[]>(url, { useApi: true });
    return data ?? [];
  };

  const {
    data: reviews = [],
  } = useSWR<Review[]>(
    `/api/recipes/${idRecipe}/review`,
    fetchReviews
  );

  const [alias, setAlias] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetcher(`/api/recipes/${idRecipe}/review`, {
        method: 'POST',
        useApi: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias, rating, comment }),
      });
      setAlias('');
      setRating(0);
      setComment('');
      // Refrescar listado
      await fetchReviews(`/api/recipes/${idRecipe}/review`);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <section className={styles.reviews}>
      <h3>Reviews</h3>
      <div className={styles.editor}>
        <div className={styles.header}>
          <input
            type="text"
            placeholder="Your alias"
            value={alias}
            onChange={e => setAlias(e.target.value)}
          />
          <select value={rating} onChange={e => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>
                {'★'.repeat(n)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.header}>
          <textarea
            placeholder="Your comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <button onClick={handleSubmit}>Send Review</button>
        </div>
      </div>
      <div className={styles.review}>
        {reviews.map(r => (
          <div key={r.id}>
            <strong>
              {r.authorAlias}
              <span className={styles.stars}>
                {'★'.repeat(r.rating)}
              </span>
            </strong>
            <p>{r.comment}</p>
            <small>{new Date(r.createdAt).toLocaleString()}</small>
            <hr />
          </div>
        ))}
      </div>

    </section>
  )
}