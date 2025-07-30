"use client";
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetcher } from '../../../../lib/fetcher';
import styles from "./CreateRecipe.module.sass"

export const CreateRecipe = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setLoading(true)

        const form = event.currentTarget
        const data = new FormData(form)
        const payload = {
            name: data.get('name'),
            prepTime: data.get('prepTime'),
            cookTime: data.get('cookTime'),
            totalTime: data.get('totalTime'),
            servings: Number(data.get('servings')),
            ingredients: data.get('ingredients'),
            steps: data.get('steps'),
            type: data.get('type'),
            diet: data.get('diet'),
            isPremium:   false
        }

        try {
            // 2) POST a Spring Boot
            const created: {
                idRecipe: number
                // ...otros campos si los usas
            } = await fetcher('/api/recipes', {
                method: 'POST',
                useApi: true,
                body: JSON.stringify(payload)
            })

            // 3) Redirijo a la nueva receta
            router.push(`/recipes/${created.idRecipe}`)
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Error creando la receta')
            setLoading(false)
        }
    }

    return (
        <div className={styles.CreateRecipe}  >
            <h1 className={styles.CreateRecipe__title}>Create Recipe</h1>
            <form onSubmit={handleSubmit} className={styles.CreateRecipe__form}>
                <input type="text" name="name" placeholder="Recipe name" required/>
                <input type="text" name="prepTime" placeholder="Preparation time" required/>
                <input type="text" name="cookTime" placeholder="Cooking time" required/>
                <input type="text" name="totalTime" placeholder="Total time" required/>
                <input type="text" name="servings" placeholder="Servings" required/>
                <input type="text" name="ingredients" placeholder="Ingredients" required/>
                <input type="text" name="steps" placeholder="Steps" required/>
                <input type="text" name="type" placeholder="Type" required/>
                <input type="text" name="diet" placeholder="Diet" required/>
                
                {error && <p className={styles.error}>{error}</p>}

                <input type="submit" name="submit" value={loading ? "Creating…" : "Create"} disabled={loading}/>
                {loading ? 'Creating…' : 'Create'}
            </form>
        </div>
    );
    }


/*        "idRecipe": 4,
        "name": "Apple-Cranberry Crisp",
        "prepTime": "25 mins",
        "cookTime": "40 mins",
        "totalTime": "1 hrs 5 mins",
        "servings": 8,
        "ingredients": "2 pounds Granny Smith apples - peeled, cored and thinly sliced, ¾ cup cranberries, ¼ cup white sugar, 1 tablespoon ground cinnamon, 1 teaspoon ground nutmeg",
        "steps": "Preheat the oven to 375 degrees F (190 degrees C.) Butter an 8-inch square baking dish. Mix apples, cranberries, white sugar, cinnamon, and nutmeg in a large bowl. Place in an even layer in the prepared baking dish. In the same bowl, combine oats, flour, and brown sugar for topping. Add butter pieces and mix with a fork until crumbly. Stir in pecans. Sprinkle topping over apples in the baking dish. Bake in the preheated oven until apples are tender and topping is golden brown, 40 to 50 minutes.",
        "type": "Dessert",
        "diet": "highsugar",
        "rating": 4.7*/