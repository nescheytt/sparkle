import { getUserSubscriptionPlan } from "@/lib/stripe"
import BillingForm from "@/components/billing-form"

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan()

  return <BillingForm subscriptionPlan={subscriptionPlan} />
}

export default Page
