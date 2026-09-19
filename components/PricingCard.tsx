import Link from "next/link";
import { Check } from "lucide-react";
import { Plan } from "@/lib/plans";

export default function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`rounded-lg p-8 flex flex-col ${
        plan.highlighted
          ? "bg-lapis text-cream ring-1 ring-clay"
          : "bg-white/60 text-ink border border-ink/10"
      }`}
    >
      {plan.highlighted && (
        <p className="text-xs font-medium uppercase tracking-wide text-clay-light">
          Most popular
        </p>
      )}
      <h3 className="mt-2 font-display text-2xl">{plan.name}</h3>
      <p className={`mt-1 text-sm ${plan.highlighted ? "text-cream/70" : "text-ink/60"}`}>
        {plan.frequency}
      </p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl">{plan.price}</span>
        <span className={plan.highlighted ? "text-cream/60" : "text-ink/50"}>
          /{plan.period.replace("per ", "")}
        </span>
      </div>

      <p className={`mt-4 text-sm ${plan.highlighted ? "text-cream/80" : "text-ink/70"}`}>
        {plan.description}
      </p>

      <ul className="mt-6 space-y-3 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check
              size={16}
              className={`mt-0.5 flex-shrink-0 ${
                plan.highlighted ? "text-clay-light" : "text-clay"
              }`}
            />
            <span className={plan.highlighted ? "text-cream/90" : "text-ink/80"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-medium transition-colors ${
          plan.highlighted
            ? "bg-clay text-cream hover:bg-clay-dark"
            : "bg-lapis text-cream hover:bg-lapis-dark"
        }`}
      >
        Choose {plan.name}
      </Link>
    </div>
  );
}
