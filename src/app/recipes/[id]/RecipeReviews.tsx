'use client'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
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
  const { data: reviews = [], error, isLoading } = useSWR<Review[]>(
    `/api/recipes/${idRecipe}/review`, (url: string) => fetcher(url, { useApi: true }))

  const [alias, setAlias] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const submitReview = async () => {
    await fetcher(`/api/recipes/${idRecipe}/review`, {
      method: 'POST',
      useApi: true,
      body: JSON.stringify({ authorAlias: alias, rating, comment })
    })
    // revalida SWR
    mutate(`/api/recipes/${idRecipe}/review`)
    setAlias(''); setRating(0); setComment('')
  }

  if (isLoading) return <p>Loading reviews…</p>
  if (error) return <p>Error loading reviews</p>

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
          <button onClick={submitReview}>Send Review</button>
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