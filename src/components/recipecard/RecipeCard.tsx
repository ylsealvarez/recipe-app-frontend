'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styles from './RecipeCard.module.sass'
import { fetcher } from "../../../lib/fetcher";

interface RecipeCardProps {
    recipe: Recipe
    currentUserId: string
    initialFavorited?: boolean
}

export const RecipeCard = ({ recipe, currentUserId, initialFavorited = false }: RecipeCardProps) => {
    const [favorited, setFavorited] = useState(initialFavorited)
    const [loading, setLoading] = useState(false);


    const PREMIUM_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!;
    useEffect(() => {
        // podrías hacer un fetch GET /api/recipes/favorites y ver si incluye este id
        // o recibir un prop “initialFavorited”
    }, [])

    const toggleFavorite = async () => {
        const res = await fetch(
            `http://localhost:8080/api/recipes/${recipe.idRecipe}/favorite`,
            {
                method: 'POST',
                headers: { 'X-User-Id': currentUserId }
            }
        )
        if (!res.ok) {
            console.error(`Error ${res.status}`)
            return
        }
        setFavorited(f => !f)
    }

    const handleBuy = async () => {
        setLoading(true);
        const { url } = await fetcher('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId: PREMIUM_PRICE_ID, mode: 'payment', recipeId: recipe.idRecipe, }),
            useApi: false,
        });
        window.location.href = url;
    };

    return (
        <article className={styles.RecipeCard}>
            {recipe.isPremium && (
                <div className={styles.premiumActions}>
                    <span className={styles.premiumBadge}>Premium</span>
                    <button
                        onClick={handleBuy}
                        disabled={loading}
                        className={styles.buyButton}
                    >
                        {loading ? 'Processing…' : 'Buy Recipe'}
                    </button>
                </div>
            )}
            <Link href={`/recipes/${recipe.idRecipe}`}>
                <Image
                    src="/images/dish.jpg"
                    alt={recipe.name}
                    width={400}
                    height={200}
                />
            </Link>

            <div className={styles.info}>
                <h3>{recipe.name}</h3>
                {recipe.type && <h4>{recipe.type}</h4>}
            </div>

            <button
                onClick={toggleFavorite}
                aria-label={favorited ? 'Unfavorite' : 'Favorite'}
                className={styles.favoriteButton}
            >
                {favorited ? <FaHeart /> : <FaRegHeart />}
            </button>
        </article>
    )
}