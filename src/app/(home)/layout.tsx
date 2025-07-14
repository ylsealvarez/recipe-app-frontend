import { Hero } from "app/components/home/Hero"
import { MostPopular } from "app/components/home/MostPopular"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Hero />
      <MostPopular />
      {children}
    </div>
  )
}