import styles from './Hero.module.sass'
import Image from 'next/image'
import React, { ReactNode } from 'react';

export interface HeroProps {
   
    backgroundImage: string;
    title: string;
    subtitle?: string;
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
                    fetchPriority="high"
                    quality={75}
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