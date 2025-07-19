"use client";

import styles from "./CreateRecipe.module.sass"

export const CreateRecipe = () => {

    const handleSubmit = async (event: {
        target: any;
        preventDefault: () => void;

    }) => {
        const formData = new FormData(event.target);
        event.preventDefault();
        //await handleLogin(formData);
    }

    return (
        <div className={styles.CreateRecipe}  >
            <h1 className={styles.CreateRecipe__title}>Create Recipe</h1>
            <form onSubmit={handleSubmit} className={styles.CreateRecipe__form}>
                <input type="text" name="name" placeholder="Recipe name" />
                <input type="text" name="prepTime" placeholder="Preparation time" />
                <input type="text" name="cookTime" placeholder="Cooking time" />
                <input type="text" name="totalTime" placeholder="Total time" />
                <input type="text" name="servings" placeholder="Servings" />
                <input type="text" name="ingredients" placeholder="Ingredients" />
                <input type="text" name="steps" placeholder="Steps" />
                <input type="text" name="type" placeholder="Type" />
                <input type="text" name="diet" placeholder="Diet" />
                <input type="submit" name="submit" value="Create" />
            </form>
        </div>
    );
}


/*        "idRecipe": 4,
        "name": "Apple-Cranberry Crisp",
        "prepTime": "25 mins",
        "cookTime": "40 mins",
        "totalTime": "1 hrs 5 mins",
        "servings": 8,
        "ingredients": "2 pounds Granny Smith apples - peeled, cored and thinly sliced, ¾ cup cranberries, ¼ cup white sugar, 1 tablespoon ground cinnamon, 1 teaspoon ground nutmeg",
        "steps": "Preheat the oven to 375 degrees F (190 degrees C.) Butter an 8-inch square baking dish. Mix apples, cranberries, white sugar, cinnamon, and nutmeg in a large bowl. Place in an even layer in the prepared baking dish. In the same bowl, combine oats, flour, and brown sugar for topping. Add butter pieces and mix with a fork until crumbly. Stir in pecans. Sprinkle topping over apples in the baking dish. Bake in the preheated oven until apples are tender and topping is golden brown, 40 to 50 minutes.",
        "type": "Dessert",
        "diet": "highsugar",
        "rating": 4.7*/