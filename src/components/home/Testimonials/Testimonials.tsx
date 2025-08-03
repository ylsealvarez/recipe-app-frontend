import styles from './Testimonials.module.sass'
import { FaStar } from 'react-icons/fa'
import React from 'react'

const testimonialsData = [
    {
        alias: 'FoodLover',
        comment: 'These recipes helped me cook like a pro! I cooked some of these for my last birthday and my guests loved them🍳'
    },
    {
        alias: 'ChefInMaking',
        comment: 'I always wanted to learn how to cook delicious desserts and I made it with this site.'
    },
    {
        alias: 'BakingQueen',
        comment: 'My kids love cakes, so they ask me to cook one everyday and here I have so many options! 🎂'
    },
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