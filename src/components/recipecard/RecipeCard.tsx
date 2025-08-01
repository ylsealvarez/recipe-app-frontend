'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styles from './RecipeCard.module.sass'
import { fetcher } from "../../../lib/fetcher";
import { LiaStarSolid } from "react-icons/lia";
import { ImStarEmpty } from "react-icons/im";
import { FaShoppingCart } from "react-icons/fa";


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

    const stars = Array.from({ length: 5 }, (_, i) =>
        i < recipe.rating ? <LiaStarSolid /> : <ImStarEmpty />
    );

    return (
        <article className={styles.RecipeCard}>
            <div className={styles.imageContainer}>
                <Link href={`/recipes/${recipe.idRecipe}`}>
                    {recipe.imagenUrl && (
                        <Image
                            src={recipe.imagenUrl}
                            alt={recipe.name}
                            width={400}
                            height={150}
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                </Link>
                {recipe.isPremium && (
                    <span className={styles.premiumBadge}>Premium</span>
                )}
            </div>
            <div className={styles.info}>
                <h3>{recipe.name}</h3>
                {recipe.type && <h4>{recipe.type}</h4>}
            </div>

            <div className={styles.actions}>
                <div className={styles.rating}>
                    {stars.map((s, idx) => (
                        <span key={idx} className={styles.star}>
                            {s}
                        </span>
                    ))}
                </div>
                <button
                    onClick={toggleFavorite}
                    aria-label={favorited ? 'Unfavorite' : 'Favorite'}
                    className={styles.favoriteButton}
                >
                    {favorited ? <FaHeart /> : <FaRegHeart />}
                </button>

                {recipe.isPremium && (
                    <button
                        onClick={handleBuy}
                        disabled={loading}
                        aria-label="Buy recipe"
                        className={styles.buyButton} data-tooltip="BUY">
                        <FaShoppingCart />
                    </button>
                )}
            </div>

        </article>
    )
}