import { PlanCard } from "app/components/PlanCard/PlanCard";
import styles from "./PlansPage.module.sass"
import { Metadata } from "next"

export const runtime = "edge"

export const metadata: Metadata = {
  title: "✨ BiaChef | Plans",
  description: "Welcome to the best recipe app, learn how to cook delicious food",
  keywords: ["recipes", "health", "diet","food"],
}

const plans = [
  {
    title: 'Basic User',
    description: 'Basic features with limited access. Searching recipes, saving recipes',
    price: 'Free',
  },
  {
    title: 'Premium User',
    description: 'Advanced features for eager learners. Rating recipes and more advanced features.',
    price: '€9.99/month',
    priceId: 'price_1RoAkbQ3I1si7olRbXcXdPFv'
  },
  {
    title: 'Professional User',
    description: 'All features with priority support. Publishing verified recipes, promoting culinary content.',
    price: '€19.99/month',
    priceId: 'price_1RoAn0Q3I1si7olRKhGUklgw'
  },
];

export default function PlansPage() {
  return (
    <div className={styles.PlansPage}>
      {plans.map((plan, idx) => (
        <PlanCard
          key={plan.priceId ?? idx}
          plan={plan}
        />
      ))}
    </div>
  )
}

