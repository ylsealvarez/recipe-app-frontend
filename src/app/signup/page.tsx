import { NewAccountForm } from "app/components/signup"
import { Metadata } from "next"

export const runtime = "edge"

export const metadata: Metadata = {
  title: "✨ BiaChef | SignUp",
  description: "Welcome to the best recipe app, learn how to cook delicious food",
  keywords: ["recipes", "health", "diet","food"],
}

export default function NewAccountPage() {
  return <NewAccountForm />
}