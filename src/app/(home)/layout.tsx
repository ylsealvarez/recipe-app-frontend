import { Hero } from "app/components/home/Hero"
import { TopRecipes } from "app/components/home/TopRecipes"
import { Testimonials } from "app/components/home/Testimonials/Testimonials"
import ScrollToTop from "app/components/ScrollToTop"
import Link from "next/link"
import styles from 'app/components/home/Hero/Hero.module.sass'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ScrollToTop />
      <Hero
        backgroundImage="/images/hero1.webp"
        title="Learn to cook"
        subtitle="The best recipes are here"
      >
        <Link href="/recipes" passHref>
          <button className={styles.Hero__overlay__button}>
            Check them all here
          </button>
        </Link>
      </Hero>
      <Testimonials />
      <TopRecipes />
      {children}
    </div>
  )
}