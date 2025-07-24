'use client'
import styles from './PlanCard.module.sass'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "../../../lib/fetcher";

interface PlanCardProps {
    plan: PlansType
}

export const PlanCard = ({ plan }: PlanCardProps) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubscribe = async () => {

        if (!plan.priceId) {
            // lógica para el plan gratuito (p.ej. simplemente habilitar la cuenta)
            return alert('Te has suscrito al plan gratuito 🎉');
        }
        console.log('handleSubscribe dispatching…');
        setLoading(true);
        const { url } = await fetcher('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId: plan.priceId, mode: 'subscription' }),
            useApi: false
        });
        console.log(url);
        // Redirige al Checkout hosted page
        window.location.href = url;
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
    )
}
