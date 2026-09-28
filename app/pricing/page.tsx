import Link from "next/link";
import { plans } from "@/lib/plans";
import PricingCard from "@/components/PricingCard";

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-clay">Plans</p>
        <h1 className="mt-3 font-display text-4xl text-lapis">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-ink/70">
          Every plan includes live, one-to-one classes with your own teacher,
          and every class is recorded so you can review it anytime. Try a
          free trial class first, with no payment details needed.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>

      <div
