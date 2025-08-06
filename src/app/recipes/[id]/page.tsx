'use client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RecipeReviews } from './RecipeReviews';
import { fetcher } from '../../../../lib/fetcher';
import styles from './page.module.sass';

export default function RecipePageClient() {
    const params = useParams();
    const router = useRouter();

    // Extraemos id sin bloquear los hooks
    const rawId = params.id;
    const id = typeof rawId === 'string' ? rawId : undefined;

    // Hooks siempre en el mismo orden
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<'NOT_FOUND' | 'PREMIUM_ONLY' | null>(null);

    useEffect(() => {
        if (!id) return; // si no hay id, no hacemos fetch

        (async () => {
            try {
                type RawRecipe = Omit<Recipe, 'ingredients' | 'steps'> & {
                    ingredients: string;
                    steps: string;
                };

                const data = await fetcher<RawRecipe>(`/api/recipes/${id}`, {
                    useApi: true,
                });
                if (!data) {
                    throw new Error('Fetch error 404: Not Found');
                }

                const ingredientsArray = data.ingredients
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s);
                const stepsArray = data.steps
                    .split('.')
                    .map(s => s.trim())
                    .filter(s => s);

                const recipeObj: Recipe = {
                    ...data,
                    ingredients: ingredientsArray,
                    steps: stepsArray,
                };
                setRecipe(recipeObj);
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err);
                if (msg.includes('403')) {
                    setError('PREMIUM_ONLY');
                } else if (msg.includes('404')) {
                    setError('NOT_FOUND');
                } else {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    useEffect(() => {
        if (error === 'PREMIUM_ONLY') {
            router.push('/gopro');
        }
    }, [error, router]);

    // Renderizado condicional tras invocar hooks
    if (!id) {
        return <p>ID de receta inválido.</p>;
    }
    if (loading) {
        return <p>Cargando receta…</p>;
    }
    if (error === 'NOT_FOUND') {
        return <p>Receta no encontrada.</p>;
    }
    if (error === 'PREMIUM_ONLY') {
        return <p>Redirecting to subscription page...</p>;
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
    );
}