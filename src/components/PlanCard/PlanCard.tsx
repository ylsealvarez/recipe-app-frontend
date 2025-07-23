import Link from "next/link";
import styles from './PlanCard.module.sass'

interface PlanCardProps {
    plan: PlansType
}

export const PlanCard = ({ plan }: PlanCardProps) => {
    return (
        <div className={styles.PlanCard}>
            <h3>{plan.title}</h3>
            <h1>{plan.price}</h1>
            <p>{plan.description}</p>
            <button>
                <Link href="/">Choose this plan</Link>
            </button>
        </div>
    )
}