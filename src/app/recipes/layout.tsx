import { Recipe } from "app/components/recipe/Recipe";


export default function RecipeLayout({ children }: { children: React.ReactNode}) {
    return (
        <main>
            {children}
        </main>
    )
}