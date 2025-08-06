import Link from "next/link";
import styles from "./Footer.module.sass"
import Image from 'next/image'

export const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.Footer__logo}>
                <Link href="/">
                    <Image
                        src="/images/Logo_BiaChef.png"
                        alt="Recipe App Logo"
                        width={150}
                        height={75}
                    />
                </Link>
            </div>
            <p> © {new Date().getFullYear()}</p>
        </footer>
    )
};