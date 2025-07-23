'use client'
import styles from "./RecipeList.module.sass"
import { RecipeCard } from "../recipecard"

type RecipeListProps = {
    recipes: Recipe[]
    page?: number
    totalPages?: number
    onPageChange?: (newPage: number) => void
    currentUserId: string
    favoritesIds?: string[]
}

const currentUserId = '0139811-1'

export const RecipeList = ({ recipes, page = 0, totalPages = 0, onPageChange = () => { }, currentUserId, favoritesIds = []}: RecipeListProps) => {

    return (
        <section className={styles.Recipe}>
            <h3>Recipes</h3>
            <div className={styles.Recipe__grid}>
                {recipes.map(r => (
                    <RecipeCard
                        key={r.idRecipe}
                        recipe={r}
                        currentUserId={currentUserId}
                        initialFavorited={favoritesIds.includes(r.idRecipe)}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button onClick={() => onPageChange(page - 1)} disabled={page === 0}>
                        ‹ Prev
                    </button>
                    <span>
                        Page {page + 1} of {totalPages}
                    </span>
                    <button
                        onClick={() => onPageChange(page + 1)}
                        disabled={page + 1 >= totalPages}
                    >
                        Next ›
                    </button>
                </div>
            )}
        </section>
    )
}