import { PlanCard } from "app/components/PlanCard/PlanCard";
import styles from "./PlansPage.module.sass"

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
  },
  {
    title: 'Professional User',
    description: 'All features with priority support. Publishing verified recipes, promoting culinary content.',
    price: '€19.99/month',
  },
];

export default function PlansPage() {
  return (
    <div className={styles.PlansPage}>
      {plans.map((plan, title) => (
        <PlanCard
          key={title}
          plan={plan}
        />
      ))}
    </div>
  )
}

