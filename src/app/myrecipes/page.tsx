'use client'
import useSWR from 'swr'
import { fetcher } from '../../../lib/fetcher'
import { RecipeCard } from 'app/components/recipecard/RecipeCard'
import styles from './page.module.sass'
import { useAuth } from 'app/context/AuthContext'

export default function MyRecipesPage() {
    const { user } = useAuth()
    const shouldFetch = Boolean(user)

    const fetchFavorites: (url: string) => Promise<Recipe[]> = async (url) => {
        const data = await fetcher<Recipe[]>(url, { useApi: true });
        if (data === null) {     
            return [];
        }
        return data;
    };

    const { data: favorites = [], error, isLoading } = useSWR<Recipe[]>(
        shouldFetch ? '/api/recipes/favorites' : null,
        fetchFavorites
    );

    const favoritesIds = favorites.map(r => r.idRecipe)
    if (!user) return <p className={styles.center}>Please, log in to check your favorite recipes.</p>
    if (isLoading) return <p className={styles.center}>Loading…</p>
    if (error) return <p className={styles.error}>Error loading favorites</p>
    if (favorites.length === 0)
        return <p className={styles.center}>You have no favorite recipes yet.</p>


    return (
        <main className={styles.MyRecipes}>
            <h2>My Favorite Recipes</h2>
            <div className={styles.grid}>
                {favorites.map(recipe => (
                    <RecipeCard
                        key={recipe.idRecipe}
                        recipe={recipe}
                        initialFavorited={favoritesIds.includes(recipe.idRecipe)}
                    />
                ))}
            </div>
        </main>
    )
}