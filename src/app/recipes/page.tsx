'use client';
import { Hero } from 'app/components/home/Hero/Hero';
import { SearchBar } from 'app/components/shared/SearchBar/SearchBar';
import { RecipeList } from 'app/components/recipelist/RecipeList';
import heroStyles from 'app/components/home/Hero/Hero.module.sass';
import pageStyles from './page.module.sass'
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

    // === Favoritos (igual que antes) ===
    const fetchFavorites = async (url: string): Promise<Recipe[]> => {
        const data = await fetcher<Recipe[]>(url, { useApi: true });
        return data ?? [];
    };

    const { data: favorites = [] } = useSWR<Recipe[]>(
        shouldFetch ? '/api/recipes/favorites' : null,
        fetchFavorites
    );
    const favoritesIds = favorites.map(r => r.idRecipe);

    // === Búsqueda (opción 2): NO usamos 'ingredient' en la URL ===
    const initialPage = Number(searchParams.get('page') || '0');

    const [ingredientInput, setIngredientInput] = useState(''); // lo que escribe el usuario
    const [query, setQuery] = useState('');                     // término confirmado (no va a la URL)
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [page, setPage] = useState(initialPage);
    const [elements] = useState(12);
    const [totalPages, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const buildUrl = useCallback(() => {
        if (query.trim()) {
            return `/api/recipes/contains/${encodeURIComponent(query)}`;
        }
        return `/api/recipes/all?page=${page}&elements=${elements}&sortBy=name&sortDirection=ASC`;
    }, [query, page, elements]);

    const fetchRecipes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(buildUrl(), { cache: 'no-store' });
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const raw = await res.json();

            if (query.trim()) {
                setRecipes(raw as Recipe[]);
                setTotal(0);
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
    }, [buildUrl, query]);

    // Actualiza URL: solo 'page' cuando NO hay búsqueda; sin 'ingredient' nunca
    useEffect(() => {
        const params = new URLSearchParams();
        if (!query.trim()) {
            params.set('page', String(page));
        }
        const href = params.toString() ? `/recipes?${params.toString()}` : '/recipes';
        router.push(href, { scroll: false });

        fetchRecipes();
    }, [query, page, fetchRecipes, router]);

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        setQuery(ingredientInput);   // dispara la búsqueda
        // Si quieres limpiar el input después de buscar, descomenta:
        setIngredientInput('');
    };

    const isFiltered = query.trim().length > 0;
    const noResults = !loading && !error && isFiltered && recipes.length === 0;

    return (
        <>
            <div className={pageStyles.searchStrip}>
                <SearchBar
                    ingredient={ingredientInput}
                    onIngredientChange={setIngredientInput}
                    onSearch={onSearch}
                />
            </div>

            <Hero
                backgroundImage="/images/hero2.webp"
                title="Check out +200 exclusive recipes"
                className={`${heroStyles['Hero--noOverlay']} ${heroStyles['Hero--rightAlign']}`}
            >
                <Link href="/recipes" passHref>
                    <button className={heroStyles.Hero__overlay__button}>Explore Premium</button>
                </Link>
            </Hero>

            <main className={pageStyles.RecipesPage}>
                {error && <div className={pageStyles.error}>Error: {error}</div>}

                {loading ? (
                    <p>Loading…</p>
                ) : noResults ? (
                    <div className={pageStyles.noResults}>
                        No recipes found for “{query}”.
                    </div>
                ) : (
                    <RecipeList
                        recipes={recipes}
                        page={isFiltered ? undefined : page}
                        totalPages={isFiltered ? undefined : totalPages}
                        onPageChange={setPage}
                        favoritesIds={favoritesIds}
                    />
                )}
            </main>
        </>
    );
}