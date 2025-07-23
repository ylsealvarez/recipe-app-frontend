import { Recipe } from "app/components/recipelist/RecipeList";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (
        <main>
            {children}
        </main>
    )
}