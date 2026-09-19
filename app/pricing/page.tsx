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
          Every plan includes a live, one-to-one teacher, recorded classes,
          and regular progress reports. No setup fees, no long-term
          contract — change or cancel your plan anytime.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>

      <div className="mt-16 rounded-lg border border-ink/10 bg-white/60 p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl text-lapis">
            Not sure which plan fits your family?
          </h2>
          <p className="mt-1 text-sm text-ink/60">
            Book a free 20-minute call — no pressure, no commitment.
          </p>
        </div>
        <a
          href="/contact"
          className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream hover:bg-clay-dark transition-colors whitespace-nowrap"
        >
          Book a free call
        </a>
      </div>
    </section>
  );
}
