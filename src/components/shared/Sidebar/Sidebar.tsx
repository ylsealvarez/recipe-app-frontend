"use client"
import styles from './Sidebar.module.sass'
import { useState } from 'react';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => setIsOpen(!isOpen)


    return (
        <>
            <button onClick={toggleSidebar} className={styles.ToggleButton}>
                {isOpen ? '✖' : '☰'}
            </button>
            <aside className={`${styles.Sidebar} ${isOpen ? styles.open : ''}`}>
                <nav>
                    <ul className={styles.Sidebar__list}>
                        <li><span>My Recipes</span></li>
                        <li><span>Create Recipe</span></li>
                        <li><span>Modify Recipe</span></li>
                        <li><span>Delete Recipe</span></li>
                    </ul>
                </nav>
            </aside></>
    )
}