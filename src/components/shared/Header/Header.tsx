"use client"
import Link from "next/link"
import styles from './Header.module.sass'
import { FaCrown } from "react-icons/fa6";
import React from 'react';
import { useAuth } from "app/context/AuthContext";
import Image from 'next/image'

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.Header}>
      <div className={styles.Header__logo}>
        <Link href="/">
          <Image
            src="/images/Logo_BiaChef.png"
            alt="Recipe App Logo"
            width={150}
            height={75}
          />
        </Link>
      </div>

      <nav>
        <ul className={styles.Header__list}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/recipes">Recipes</Link></li>
        </ul>
      </nav>
      <div className={styles.Header__links}>
        <Link href="/gopro" className={styles.Header__gopro}>Go PRO <FaCrown /></Link>
        <div className={styles.Header__user}>
          {user?.firstname ?
            (<><Link href="/my-account">Hello, {user.firstname}</Link>
              <button onClick={logout}>
                Logout
              </button></>) :
            (<><Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
            )}
        </div>
      </div>
    </header>)
}