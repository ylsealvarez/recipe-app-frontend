'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RecipeReviews } from './RecipeReviews'
import { fetcher } from '../../../../lib/fetcher'
import styles from './page.module.sass'

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
                const ingredientsArray = data.ingredients
                    .split(',')            // separa por coma
                    .map((s: string) => s.trim())  // quita espacios
                    .filter((s: string) => s.length) // descarta strings vacíos

                const stepsArray = data.steps
                    .split('.')            // separa por punto
                    .map((s: string) => s.trim())  // quita espacios
                    .filter((s: string) => s.length) // descarta strings vacíos

                setRecipe({
                    ...data,
                    ingredients: ingredientsArray,
                    steps: stepsArray,
                })
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
        <main className={styles.container}>
            <h1 className={styles.title}>{recipe!.name}</h1>
            <div className={styles.imageWrapper}>
                <Image
                    src={recipe!.imagenUrl}
                    alt={recipe!.name}
                    width={600}
                    height={300}
                    style={{ borderRadius: '1rem', objectFit: 'cover' }}
                />
            </div>
            <div className={styles.metadata}>
                <p><strong>Preparation time</strong> {recipe!.prepTime}</p>
                <p><strong>Cooking time</strong> {recipe!.cookTime}</p>
                <p><strong>Total time</strong> {recipe!.totalTime}</p>
                <p><strong>Diet</strong> {recipe!.diet}</p>
                <p><strong>Type</strong> {recipe!.type}</p>
                <p><strong>Rating</strong> {recipe!.rating}</p>
            </div>
            <div className={styles.sectionsWrapper}>
                <section className={styles.section}>
                    <h2>Ingredients</h2>
                    <ul>
                        {recipe!.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                        ))}
                    </ul>
                </section>
                <section className={styles.section}>
                    <h2>Steps</h2>
                    <ol>
                        {recipe!.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </section>
            </div>
            <RecipeReviews idRecipe={id} />
        </main>
    )
}