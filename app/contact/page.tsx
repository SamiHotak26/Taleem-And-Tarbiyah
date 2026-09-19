import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-medium text-clay">Get in touch</p>
      <h1 className="mt-3 font-display text-4xl text-lapis">
        Book a free trial class
      </h1>
      <p className="mt-4 max-w-prose text-ink/70">
        Tell us a bit about your child and we&apos;ll match them with a
        teacher for a free 30-minute trial class — no payment details
        needed.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-sage">
              Email
            </p>
            <p className="mt-1 text-sm text-ink/70">
              info@talemwatarbiya.org
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-sage">
              Availability
            </p>
            <p className="mt-1 text-sm text-ink/70">Monday–Saturday</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-sage">
              Response time
            </p>
            <p className="mt-1 text-sm text-ink/70">
              Within one business day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
