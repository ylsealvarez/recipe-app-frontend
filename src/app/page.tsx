import { Metadata } from "next";
import HomeLayout from "./(home)/layout";

export const metadata: Metadata = {
  title: "✨ BiaChef",
  description: "Welcome to the best recipe app, learn how to cook delicious food",
  keywords: ["recipes", "health", "diet", "food"],
};

export default function Home() {
  return (
      <HomeLayout />
  );
}
