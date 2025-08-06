'use client';
import styles from './PlanCard.module.sass';
import { useState } from 'react';
import { fetcher } from '../../../lib/fetcher';

interface PlanCardProps {
    plan: PlansType;
}

export const PlanCard = ({ plan }: PlanCardProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!plan.priceId) {
            return alert('You have subscribed to the free plan🎉');
        }

        setLoading(true);
        try {
            // Especificar el tipo de respuesta esperado
            const result = await fetcher<{ url: string }>('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId: plan.priceId, mode: 'subscription' }),
                useApi: false,
            });

            if (!result || !result.url) {
                throw new Error('No checkout URL returned');
            }

            window.location.href = result.url;
        } catch (err) {
            console.error(err);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.PlanCard}>
            <h3>{plan.title}</h3>
            <h1>{plan.price}</h1>
            <p>{plan.description}</p>
            <button onClick={handleSubscribe} disabled={loading}>
                {loading ? 'Processing…' : 'Choose this plan'}
            </button>
        </div>
    );
};