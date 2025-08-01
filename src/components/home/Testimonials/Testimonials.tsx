import styles from './Testimonials.module.sass'
import { FaStar } from 'react-icons/fa'
import React from 'react'

const testimonialsData = [
    {
        alias: 'FoodLover99',
        comment: 'These recipes helped me cook like a pro! 🍳'
    },
    {
        alias: 'ChefInMaking',
        comment: 'I learned to master pasta dishes thanks to this site.'
    },
    {
        alias: 'BakingQueen',
        comment: 'Now my cakes are a hit at every party! 🎂'
    },
    // …añade los que quieras
]

export const Testimonials = () => (
    <section className={styles.Testimonials}>
        <h2 className={styles.Testimonials__title}>
            What our community say
        </h2>
        <div className={styles.Testimonials__grid}>
            {testimonialsData.map((t, i) => (
                <div key={i} className={styles.Testimonials__card}>
                    <div className={styles.Testimonials__alias}>
                        {t.alias}
                    </div>
                    <div className={styles.Testimonials__stars}>
                        {[...Array(5)].map((_, idx) => (
                            <FaStar key={idx} />
                        ))}
                    </div>
                    <p className={styles.Testimonials__comment}>
                        {t.comment}
                    </p>
                </div>
            ))}
        </div>
    </section>
)