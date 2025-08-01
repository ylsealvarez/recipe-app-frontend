import styles from './Hero.module.sass'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react';

export interface HeroProps {
    /** URL o ruta de la imagen de fondo */
    backgroundImage: string;
    /** Texto principal (h1) */
    title: string;
    /** Texto secundario opcional (h2) */
    subtitle?: string;
    /** Nodo React para injectar botones, barra de navegación, etc. */
    children?: ReactNode;
    className?: string;
}

export const Hero: React.FC<HeroProps> = ({
    backgroundImage,
    title,
    subtitle,
    children,
    className = '',
}) => {
    return (
        <section className={`${styles.Hero} ${className}`.trim()}>
            <div className={styles.Hero__imageContainer}>
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    priority
                    quality={100}
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className={styles.Hero__overlay}>
                <h1>{title}</h1>
                {subtitle && <h2>{subtitle}</h2>}

                <div className={styles.Hero__actions}>
                    {children}
                </div>
            </div>
        </section>
    );
};


/*export const Hero = () => {
    return (
        <section className={styles.Hero}>
            <div className={styles.Hero__imageContainer}>
                <Image
                    src="/images/hero1.webp"
                    alt="Delicious food background"
                    fill
                    priority
                    quality={100}
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles.Hero__overlay}>
                <h1>Learn to cook</h1>
                <h2>The best recipes are here</h2>
                <Link href="/recipes" passHref>
                    <button className={styles.Hero__overlay__button}>
                        Check them all here
                    </button>
                </Link>
            </div>
        </section>
    )
}*/