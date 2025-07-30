"use client";

import { useEffect, useState } from 'react';
import { useAuth } from 'app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { fetcher } from '../../../../lib/fetcher';
import styles from "./ModifyRecipe.module.sass";

export const ModifyRecipe = () => {
    const { user } = useAuth();
    const router = useRouter();

    // Restricción a profesionales
    useEffect(() => {
        if (user && !user.roles.includes('ROLE_PROFESSIONAL')) {
            router.push('/gopro');
        }
    }, [user, router]);

    // Esperamos a tener user y rol antes de mostrar el form
    if (!user) return null;
    if (!user.roles.includes('ROLE_PROFESSIONAL')) return null;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const form = event.currentTarget;
        const data = new FormData(form);
        const idRecipe = data.get('idRecipe');
        if (!idRecipe) {
            setError('Debes indicar el ID de la receta');
            setLoading(false);
            return;
        }

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
            isPremium: data.get('isPremium') === 'on'
            // si en tu API hay campos extra (p.ej. isPremium), añádelos aquí
        };

        try {
            // PUT o PATCH según tu API
            await fetcher(`/api/recipes/${idRecipe}`, {
                method: 'PUT',
                useApi: true,
                body: JSON.stringify({idRecipe, ...payload}),
                headers: { 'Content-Type': 'application/json' }
            });

            // Redirigimos a la vista de la receta ya modificada
            router.push(`/recipes/${idRecipe}`);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error modificando la receta');
            setLoading(false);
        }
    };

    return (
        <div className={styles.ModifyRecipe}  >
            <h1 className={styles.ModifyRecipe__title}>Modify Recipe</h1>
            <form onSubmit={handleSubmit} className={styles.ModifyRecipe__form}>
                <label><input type="checkbox" name="isPremium" />Premium</label>
                <input type="text" name="idRecipe" placeholder="Recipe ID" required/>
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
                <input type="submit" name="submit" value={loading ? "Modifying..." : "Modify"} disabled={loading}/>
            </form>
        </div>
    );
}