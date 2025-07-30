'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RecipeReviews } from './RecipeReviews'
import { fetcher } from '../../../../lib/fetcher'

export default function RecipePageClient() {
  const params = useParams()
  const router = useRouter()

  if (!params.id || Array.isArray(params.id)) {
    return <p>ID de receta inválido.</p>
  }
  const id: string = params.id

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<'NOT_FOUND' | 'PREMIUM_ONLY' | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const data = await fetcher(`/api/recipes/${id}`, {
          useApi: true
        })
        setRecipe(data)
      } catch (e: any) {
        const msg = e.message || ''
        if (msg.startsWith('Fetch error 403')) {
          setError('PREMIUM_ONLY')
        } else if (msg.startsWith('Fetch error 404')) {
          setError('NOT_FOUND')
        } else {
          console.error(e)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  useEffect(() => {
    if (error === 'PREMIUM_ONLY') {
      router.push('/gopro')
    }
  }, [error, router])

  if (loading) return <p>Cargando receta…</p>
  if (error === 'NOT_FOUND') return <p>Receta no encontrada.</p>
  if (error === 'PREMIUM_ONLY') {
    return <p>Redirecting to subscription page...</p>
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{recipe!.name}</h1>
      <Image
        src="/images/dish.jpg"
        alt={recipe!.name}
        width={600}
        height={300}
        style={{ borderRadius: '1rem', objectFit: 'cover' }}
      />
      <p><strong>Preparation time</strong> {recipe!.prepTime}</p>
      <p><strong>Cooking time</strong> {recipe!.cookTime}</p>
      <p><strong>Total time</strong> {recipe!.totalTime}</p>
      <p><strong>Servings</strong> {recipe!.servings}</p>
      <p><strong>Type</strong> {recipe!.type}</p>
      <p><strong>Rating:</strong> {recipe!.rating}</p>
      <p><strong>Ingredients</strong> {recipe!.ingredients}</p>
      <p><strong>Steps</strong> {recipe!.steps}</p>

      <RecipeReviews idRecipe={id} />
    </main>
  )
}