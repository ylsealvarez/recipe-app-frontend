import Link from "next/link"
import styles from './Header.module.sass'
import { FaCrown } from "react-icons/fa6";

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
      </ul>
    </nav>
    <div className={styles.Header__links}>
      <Link href="" className={styles.Header__gopro}>Go PRO <FaCrown /></Link>
      <div className={styles.Header__user}>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  </header>)
}