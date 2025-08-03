'use client';

import Link from 'next/link';
import styles from './SuccessPage.module.sass';
import { useSearchParams } from 'next/navigation';

export default function SuccessClient() {
    const params = useSearchParams();
    const mode = params.get('mode'); // 'payment' o 'subscription'

    return (
        <main className={styles.container}>
            {mode === 'payment' ? (
                <>
                    <h1 className={styles.title}>🎉 Recipe Purchased!</h1>
                    <p className={styles.message}>
                        Thank you for purchasing this premium recipe. Enjoy cooking!
                    </p>
                    <Link href="/recipes" className={styles.button}>
                        Back to Recipes
                    </Link>
                </>
            ) : (
                <>
                    <h1 className={styles.title}>🎉 Subscription Activated!</h1>
                    <p className={styles.message}>
                        Your subscription is now active. Happy exploring!
                    </p>
                    <Link href="/gopro" className={styles.button}>
                        Go to Plans
                    </Link>
                </>
            )}
        </main>
    );
}