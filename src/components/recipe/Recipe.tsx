'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import Image from 'next/image'
import styles from './Recipe.module.sass'

export type Recipe = {
    idRecipe: string
    name: string
    prepTime: string
    type: string
}

type PageResponse = {
    content: Recipe[]
    totalPages: number
    number: number
}

export const Recipe = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [page, setPage] = useState(0)
    const [elements] = useState(9)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const url = `http://localhost:8080/api/recipes/all`
                + `?page=${page}`
                + `&elements=${elements}`
                + `&sortBy=name`
                + `&sortDirection=ASC`;

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true)
            try {
                const response = await fetch(url, {
                    cache: 'no-store'
                })

                console.log('Fetching:', url)
                console.log('Response status:', response.status)

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data: PageResponse = await response.json()
                setRecipes(data.content)
                setTotalPages(data.totalPages)

            } catch (error) {
                console.error(error)
                return []
            } finally {
                setLoading(false)
            }
        }
        fetchRecipes()
    }, [page, elements])


    return (
        <section className={styles.Recipe}>
            <h3>Recipes</h3>
            <div className={styles.Recipe__grid}>
                {recipes.map((recipe: { idRecipe: string; name: string; prepTime: string; type: string }) => (
                    <article key={recipe.idRecipe}>
                        <Link href={`/recipes/${recipe.idRecipe}`}>
                            <Image
                                src="/images/dish.jpg"
                                alt={recipe.name}
                                width={400}
                                height={200}
                            />
                        </Link>
                        <div className={styles.Recipe__info}>
                            <h3>{recipe.name}</h3>
                            <p>Preparation Time: {recipe.prepTime}</p>
                            <p>{recipe.type}</p>
                        </div>
                    </article>
                ))}
            </div>
            <div className={styles.pagination}>
                <button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>
                    ‹ Prev
                </button>
                <span>Page {page + 1} of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page + 1 >= totalPages}>
                    Next ›
                </button>
            </div>
        </section>
    )
}