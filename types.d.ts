type PlansType = {
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
    prepTime?: string
    type?: string
    isPremium?: boolean
}