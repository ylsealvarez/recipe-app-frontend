import Link from "next/link"
import styles from './Header.module.sass'

export const Header = () => {
    return (<header className={styles.Header}>
          <nav>
            <ul className={styles.Header__list}>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/myrecipes">
                  My Recipes
                </Link>
              </li>
            </ul>
          </nav>
        </header>)
}