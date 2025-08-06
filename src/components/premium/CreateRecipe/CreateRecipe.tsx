'use client';
import { useEffect, useState } from 'react';
import { useAuth } from 'app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { fetcher } from '../../../../lib/fetcher';
import styles from './CreateRecipe.module.sass';

export const CreateRecipe = () => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user && !user.roles.includes('ROLE_PROFESSIONAL')) {
            router.push('/gopro');
        }
    }, [user, router]);

    if (!user || !user.roles.includes('ROLE_PROFESSIONAL')) {
        return null;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const form = event.currentTarget;
        const data = new FormData(form);
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
            isPremium: data.get('isPremium') === 'on',
        };

        try {
            const result = await fetcher<{ idRecipe: number }>('/api/recipes', {
                method: 'POST',
                useApi: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!result) {
                throw new Error('Error, recipe was not created');
            }
            router.push(`/recipes/${result.idRecipe}`);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.CreateRecipe}>
            <h1 className={styles.CreateRecipe__title}>Create Recipe</h1>
            <form onSubmit={handleSubmit} className={styles.CreateRecipe__form}>
                <label>
                    <input type="checkbox" name="isPremium" /> Premium
                </label>
                <input type="text" name="name" placeholder="Recipe name" required />
                <input type="text" name="prepTime" placeholder="Preparation time" required />
                <input type="text" name="cookTime" placeholder="Cooking time" required />
                <input type="text" name="totalTime" placeholder="Total time" required />
                <input type="number" name="servings" placeholder="Servings" required />
                <input type="text" name="ingredients" placeholder="Ingredients" required />
                <input type="text" name="steps" placeholder="Steps" required />
                <input type="text" name="type" placeholder="Type" required />
                <input type="text" name="diet" placeholder="Diet" required />

                {error && <p className={styles.error}>{error}</p>}

                <input
                    type="submit"
                    name="submit"
                    value={loading ? 'Creating…' : 'Create'}
                    disabled={loading}
                />
            </form>
        </div>
    );
};