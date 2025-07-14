import Link from "next/link"
import Image from 'next/image'
import styles from './Recipe.module.sass'

const getRecipes = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/recipes/diet/highsugar', {
            cache: 'no-store',
        })

        if (!response.ok) {
            throw new Error('Failed to fetch products')
        }

        return await response.json()

    } catch (error) {
        console.error(error)
        return []
    }
}

export const Recipe = async () => {
    const recipes = await getRecipes()
    return (
        <section className={styles.Recipe}>
            <h3>🍰 Recetas con alto contenido de azúcar</h3>
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
        </section>
    )
}