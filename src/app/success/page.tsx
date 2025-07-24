'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './SuccessPage.module.sass';

export default function SuccessPage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem('checkoutEmail');
    if (stored) setEmail(stored);
  }, []);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🎉 Payment Successful!</h1>
      <p className={styles.message}>
        {email
          ? `A receipt has been sent to ${email}.`
          : 'Thank you for your purchase. Your subscription is now active.'}
      </p>
      <Link href="/" className={styles.button}>
        Back to Home
      </Link>
    </main>
  );
}