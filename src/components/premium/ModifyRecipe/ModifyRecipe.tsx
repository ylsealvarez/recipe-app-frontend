"use client";

import styles from "./ModifyRecipe.module.sass"

export const ModifyRecipe = () => {
    const handleSubmit = async (event: {
        target: any;
        preventDefault: () => void;

    }) => {
        const formData = new FormData(event.target);
        event.preventDefault();
        //await handleLogin(formData);
    }

    return (
        <div className={styles.ModifyRecipe}  >
            <h1 className={styles.ModifyRecipe__title}>Modify Recipe</h1>
            <form onSubmit={handleSubmit} className={styles.ModifyRecipe__form}>
                <input type="text" name="idRecipe" placeholder="Recipe ID" />
                <input type="text" name="name" placeholder="Recipe name" />
                <input type="text" name="prepTime" placeholder="Preparation time" />
                <input type="text" name="cookTime" placeholder="Cooking time" />
                <input type="text" name="totalTime" placeholder="Total time" />
                <input type="text" name="servings" placeholder="Servings" />
                <input type="text" name="ingredients" placeholder="Ingredients" />
                <input type="text" name="steps" placeholder="Steps" />
                <input type="text" name="type" placeholder="Type" />
                <input type="text" name="diet" placeholder="Diet" />
                <input type="submit" name="submit" value="Modify" />
            </form>
        </div>
    );
}