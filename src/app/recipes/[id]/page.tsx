import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getRecipe(id: string) {
  const res = await fetch(`http://localhost:8080/api/recipes/${id}`, {
    // Siguiente línea previene cache para desarrollo
    cache: 'no-store',
  })

  if (!res.ok) return null
  return res.json()
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipe = await getRecipe(params.id)

  if (!recipe) return notFound()

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{recipe.name}</h1>
      <Image
        src="/images/dish.jpg"
        alt={recipe.name}
        width={600}
        height={300}
        style={{ borderRadius: '1rem', objectFit: 'cover' }}
      />
      <p><strong>Preparation time</strong> {recipe.prepTime}</p>
      <p><strong>Cooking time</strong> {recipe.cookTime}</p>
      <p><strong>Total time</strong> {recipe.totalTime}</p>
      <p><strong>Servings</strong> {recipe.servings}</p>
      <p><strong>Type</strong> {recipe.type}</p>
      <p><strong>Rating:</strong> {recipe.rating}</p>
      <p><strong>Ingredients</strong> {recipe.ingredients}</p>
      <p><strong>Steps</strong> {recipe.steps}</p>
    </main>
  )
}