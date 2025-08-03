"use client"
import styles from "./SearchBar.module.sass"
import React from 'react'


interface SearchBarProps {
  ingredient: string
  onIngredientChange: (newTerm: string) => void
  onSearch: (e: React.FormEvent) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ ingredient, onIngredientChange, onSearch }) => {
  return (
    <form className={styles.SearchBar} onSubmit={onSearch}>
      <input
        type="text"
        placeholder="What would you like to cook..."
        value={ingredient}
        onChange={e => onIngredientChange(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  )
}