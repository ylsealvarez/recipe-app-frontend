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

export function RecipeReviews({ idRecipe }: { idRecipe: string }) {
  const { data: reviews = [], error, isLoading } = useSWR<Review[]>(`/api/recipes/${idRecipe}/review`, fetcher)

  const [alias, setAlias] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const submitReview = async () => {
    await fetch(`http://localhost:8080/api/recipes/${idRecipe}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authorAlias: alias, rating, comment })
    })
    // revalida SWR
    mutate(`/api/recipes/${idRecipe}/review`)
    setAlias(''); setRating(0); setComment('')
  }

  if (isLoading) return <p>Loading reviews…</p>
  if (error)     return <p>Error loading reviews</p>

  return (
    <section className={styles.reviews}>
      <h3>Reviews</h3>
      {reviews.map(r => (
        <div key={r.id} className={styles.review}>
          <strong>{r.authorAlias}</strong> — {r.rating}★
          <p>{r.comment}</p>
          <small>{new Date(r.createdAt).toLocaleString()}</small>
        </div>
      ))}

      <div className={styles.editor}>
        <input
          type="text"
          placeholder="Your alias"
          value={alias}
          onChange={e => setAlias(e.target.value)}
        />
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}★</option>
          ))}
        </select>
        <textarea
          placeholder="Your comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button onClick={submitReview}>Send Review</button>
      </div>
    </section>
  )
}