'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styles from './RecipeCard.module.sass'
import { fetcher } from "../../../lib/fetcher";

interface RecipeCardProps {
    recipe: Recipe
    initialFavorited?: boolean
}

export const RecipeCard = ({ recipe, initialFavorited = false }: RecipeCardProps) => {
    const [favorited, setFavorited] = useState(initialFavorited)
    const [loading, setLoading] = useState(false);

    const PREMIUM_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!;
    useEffect(() => {
    }, [])

    const toggleFavorite = async () => {
        setLoading(true)
        try {
            // Llamada al backend (useApi=true) sin analizar JSON
            await fetcher(
                `/api/recipes/${recipe.idRecipe}/favorite`,
                { method: 'POST', useApi: true }
            )
            setFavorited(f => !f)
        } catch (err) {
            console.error('Error favoriting recipe:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleBuy = async () => {
        setLoading(true);
        const { url } = await fetcher('/api/checkout', {
            method: 'POST',
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