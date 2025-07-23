"use client";
import styles from "./DeleteRecipe.module.sass"

export const DeleteRecipe = () => {
    return (
        <div className={styles.DeleteRecipe}  >
            <h1 className={styles.DeleteRecipe__title}>Delete Recipe</h1>
            <form className={styles.DeleteRecipe__form}>
                <input type="text" name="idRecipe" placeholder="Recipe ID" />
                <input type="submit" name="submit" value="Delete" />
            </form>
        </div>
    )
}