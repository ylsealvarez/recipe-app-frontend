type PlansType = {
    priceId?: string;
    title: string;
    description: string;
    price: string;
}

type PageResponse = {
    content: Recipe[]
    totalPages: number
    number: number
    onPageChange?: (newPage: number) => void
}

type Recipe = {
    idRecipe: string
    name: string
    prepTime: string
    cookTime: string
    totalTime: string
    servings: number
    type: string
    diet: string
    rating: number
    ingredients: string[]
    steps: string[]
    isPremium: boolean
    imagenUrl: string
}