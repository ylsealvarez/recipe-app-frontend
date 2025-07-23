'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchBar } from 'app/components/shared/SearchBar/SearchBar'
import { RecipeList } from 'app/components/recipelist/RecipeList'
import styles from './page.module.sass'
import useSWR from 'swr'
import { fetcher } from '../../../lib/fetcher'

export default function RecipesPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentUserId = '0139811-1';

    const { data: favorites = [] } = useSWR<Recipe[]>('/api/recipes/favorites', fetcher)
    const favoritesIds = favorites.map(r => r.idRecipe)

    const initialIngredient = searchParams.get('ingredient') || ''
    const initialPage = Number(searchParams.get('page') || '0')

    const [ingredient, setIngredient] = useState(initialIngredient)
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [page, setPage] = useState(initialPage)
    const [elements] = useState(9)
    const [totalPages, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const buildUrl = () => {
        if (ingredient.trim()) {
            return `http://localhost:8080/api/recipes/contains/${ingredient}`
        } else {
            return `http://localhost:8080/api/recipes/all`
                + `?page=${page}`
                + `&elements=${elements}`
                + `&sortBy=name`
                + `&sortDirection=ASC`
        }
    }

    // Fetch function
    const fetchRecipes = async () => {
        setLoading(true)
        try {
            const res = await fetch(buildUrl(),
                { cache: 'no-store' }
            )
            if (!res.ok) throw new Error(`Status ${res.status}`)
            const raw = await res.json()

            if (ingredient.trim()) {
                // Search results: array of Recipe
                setRecipes(raw as Recipe[])
            } else {
                // Paginated list
                const pageData = raw as PageResponse
                setRecipes(pageData.content)
                setTotal(pageData.totalPages)
            }
        } catch (e: any) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        router.push(
            `/recipes?ingredient=${encodeURIComponent(ingredient)}&page=${page}`,
            { scroll: false }
        )
        fetchRecipes()
    }, [ingredient, page])

    // Search handler
    const onSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setPage(0)
        fetchRecipes()
    }

    return (
        <main className={styles.RecipesPage}>
            <SearchBar
                ingredient={ingredient}
                onIngredientChange={setIngredient}
                onSearch={onSearch}
            />

            {error && <div className={styles.error}>Error: {error}</div>}
            {loading ? (
                <p>Loading…</p>
            ) : recipes.length === 0 ? (
                <p>Your search did not return any results.</p>
            ) : (
                <RecipeList
                    recipes={recipes}
                    page={ingredient.trim() ? undefined : page}
                    totalPages={ingredient.trim() ? undefined : totalPages}
                    onPageChange={newPage => setPage(newPage)} currentUserId={currentUserId} favoritesIds={favoritesIds} />
            )}
        </main>
    )
}
