'use client'
import useSWR from 'swr'
import { fetcher } from '../../../lib/fetcher'
import { RecipeCard } from 'app/components/recipecard/RecipeCard'
import styles from './page.module.sass'

export default function MyRecipesPage() {
    // 1) Usa SWR para obtener favoritos
    const { data: favorites = [], error, isLoading } = useSWR<Recipe[]>(
        '/api/recipes/favorites',
        fetcher
    )
    
    const favoritesIds = favorites.map(r => r.idRecipe)
    if (isLoading) return <p className={styles.center}>Loading…</p>
    if (error) return <p className={styles.error}>Error loading favorites</p>
    if (favorites.length === 0)
        return <p className={styles.center}>You have no favorite recipes yet.</p>

    // 2) Si hay datos, renderiza RecipeCard para cada receta
    return (
        <main className={styles.MyRecipes}>
            <h2>My Favorite Recipes</h2>
            <div className={styles.grid}>
                {favorites.map(recipe => (
                    <RecipeCard
                        key={recipe.idRecipe}
                        recipe={recipe}
                        currentUserId="0139811-1"
                        initialFavorited={favoritesIds.includes(recipe.idRecipe)}
                    />
                ))}
            </div>
        </main>
    )
}