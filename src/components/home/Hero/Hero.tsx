import styles from './Hero.module.sass'
import Image from 'next/image'

export const Hero = () => {
    return (
        <section className={styles.Hero}>
            <div className= {styles.Hero__imageContainer}>
                <Image
                    src="/images/hero1.webp"
                    alt="hero image"
                    fill
                    priority
                    quality={100}
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </section>
    )
}