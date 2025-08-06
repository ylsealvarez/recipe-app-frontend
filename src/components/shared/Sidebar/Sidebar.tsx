"use client"
import Link from 'next/link';
import styles from './Sidebar.module.sass'
import { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => setIsOpen(o => !o)

    const handleMouseLeave = () => {
        setIsOpen(false);
    }

    return (
        <>
            <button onClick={toggleSidebar} className={styles.ToggleButton}>
                {isOpen ? '✖' : '☰'}
            </button>
            <aside className={`${styles.Sidebar} ${isOpen ? styles.open : ''}`} onMouseLeave={handleMouseLeave}>
                <nav>
                    <ul className={styles.Sidebar__list}>
                        <Link href="/myrecipes">My Recipes</Link>
                        <Link href="/my-account">My Account</Link>
                        <span>Professional plan<IoMdArrowDropdown /></span>
                        <div className={styles.Sidebar__links}>
                            <Link href="/premium/create"><IoMdArrowDropright />Create Recipe</Link>
                            <Link href="/premium/modify"><IoMdArrowDropright />Modify Recipe</Link>
                            <Link href="/premium/delete"><IoMdArrowDropright />Delete Recipe</Link>
                        </div>
                    </ul>
                </nav>
            </aside></>
    )
}