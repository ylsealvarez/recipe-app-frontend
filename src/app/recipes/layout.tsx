import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "✨ BiaChef | Recipes",
  description: "Welcome to the best recipe app, learn how to cook delicious food",
  keywords: ["recipes", "health", "diet","food"],
}

export default function RecipeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}