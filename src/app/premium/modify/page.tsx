import { ModifyRecipe } from "app/components/premium/ModifyRecipe"
import { Metadata } from "next"

export const runtime = "edge"

export const metadata: Metadata = {
  title: "✨ BiaChef | Modify Recipe",
  description: "Welcome to the best recipe app, learn how to cook delicious food",
  keywords: ["recipes", "health", "diet","food"],
}

export default function CreateRecipePage() {
  return <ModifyRecipe />
}