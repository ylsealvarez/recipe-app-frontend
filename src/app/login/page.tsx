import { LoginForm } from "app/components/login/LoginForm"
import { Metadata } from "next"

export const runtime = "edge"

export const metadata: Metadata = {
  title: "✨ BiaChef | Login",
  description: "Welcome to the best recipe app, learn how to cook delicious food",
  keywords: ["recipes", "health", "diet","food"],
}
export default function LoginPage(){
  return <LoginForm />
}