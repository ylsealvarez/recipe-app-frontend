import { Recipe } from "app/components/recipe/Recipe";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (
        <main>
            {children}
        </main>
    )
}