'use client';
import { Hero } from 'app/components/home/Hero/Hero';
import { SearchBar } from 'app/components/shared/SearchBar/SearchBar';
import { RecipeList } from 'app/components/recipelist/RecipeList';
import styles from 'app/components/home/Hero/Hero.module.sass';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetcher';
import Link from 'next/link';
import { useAuth } from 'app/context/AuthContext';

export default function RecipesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const shouldFetch = Boolean(user);

    const fetchFavorites = async (url: string): Promise<Recipe[]> => {
        const data = await fetcher<Recipe[]>(url, { useApi: true });
        return data ?? [];
    };

    const { data: favorites = [] } = useSWR<Recipe[]>(
        shouldFetch ? '/api/recipes/favorites' : null,
        fetchFavorites
    );

    const favoritesIds = favorites.map(r => r.idRecipe);

    const initialIngredient = searchParams.get('ingredient') || '';
    const initialPage = Number(searchParams.get('page') || '0');

    const [ingredient, setIngredient] = useState(initialIngredient);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [page, setPage] = useState(initialPage);
    const [elements] = useState(12);
    const [totalPages, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const buildUrl = useCallback(() => {
        if (ingredient.trim()) {
            return `/api/recipes/contains/${encodeURIComponent(ingredient)}`;
        }
        return `/api/recipes/all?page=${page}&elements=${elements}&sortBy=name&sortDirection=ASC`;
    }, [ingredient, page, elements]);

    const fetchRecipes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(buildUrl(), { cache: 'no-store' });
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const raw = await res.json();

            if (ingredient.trim()) {
                setRecipes(raw as Recipe[]);
            } else {
                const pageData = raw as PageResponse;
                setRecipes(pageData.content);
                setTotal(pageData.totalPages);
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    }, [buildUrl, ingredient]);

    useEffect(() => {
        router.push(
            `/recipes?ingredient=${encodeURIComponent(ingredient)}&page=${page}`,
            { scroll: false }
        );
        fetchRecipes();
    }, [ingredient, page, fetchRecipes, router]);

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        fetchRecipes();
    };

    return (
        <>
            <div className={styles.searchStrip}>
                <SearchBar
                    ingredient={ingredient}
                    onIngredientChange={setIngredient}
                    onSearch={onSearch}
                />
            </div>
            <Hero
                backgroundImage="/images/hero2.webp"
                title="Check out +200 exclusive recipes"
                className={`${styles['Hero--noOverlay']} ${styles['Hero--rightAlign']}`}>
                <Link href="/recipes" passHref>
                    <button className={styles.Hero__overlay__button}>Explore Premium</button>
                </Link>
            </Hero>

            <main className={styles.RecipesPage}>
                {error && <div className={styles.error}>Error: {error}</div>}
                {loading ? (
                    <p>Loading…</p>
                ) : (
                    <RecipeList
                        recipes={recipes}
                        page={ingredient.trim() ? undefined : page}
                        totalPages={ingredient.trim() ? undefined : totalPages}
                        onPageChange={setPage}
                        favoritesIds={favoritesIds}
                    />
                )}
            </main>
        </>
    );
}

