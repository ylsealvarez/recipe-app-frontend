"use client";

import { useEffect, useState } from 'react';
import { useAuth } from 'app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { fetcher } from '../../../../lib/fetcher';
import styles from "./DeleteRecipe.module.sass";

export const DeleteRecipe = () => {
    const { user } = useAuth();
    const router = useRouter();

    // Mueve los useState AL INICIO, antes de cualquier return
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user && !user.roles.includes('ROLE_PROFESSIONAL')) {
            router.push('/gopro');
        }
    }, [user, router]);

    // Ahora los early-returns no esconden hooks
    if (!user) return null;
    if (!user.roles.includes('ROLE_PROFESSIONAL')) return null;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const idRecipe = new FormData(event.currentTarget).get('idRecipe');
        if (!idRecipe) {
            setError('Debes indicar el ID de la receta');
            setLoading(false);
            return;
        }

        try {
            await fetcher(`/api/recipes/${idRecipe}`, {
                method: 'DELETE',
                useApi: true
            });
            router.push('/recipes');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error borrando la receta');
            setLoading(false);
        }
    };

    return (
        <div className={styles.DeleteRecipe}  >
            <h1 className={styles.DeleteRecipe__title}>Delete Recipe</h1>
            <form onSubmit={handleSubmit} className={styles.DeleteRecipe__form}>
                <input type="text" name="idRecipe" placeholder="Recipe ID" required />

                {error && <p className={styles.error}>{error}</p>}
                <input type="submit" name="submit" value={loading ? "Deleting…" : "Delete"} disabled={loading} />
            </form>
        </div>
    )
}