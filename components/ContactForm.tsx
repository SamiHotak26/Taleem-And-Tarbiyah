"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maenlrqw";

const inputClass =
  "mt-1 w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-ink/10 bg-white/60 p-8 text-center">
        <p className="font-display text-xl text-lapis">Thank you!</p>
        <p className="mt-2 text-sm text-ink/70">
          Your message has been sent. We&apos;ll get back to you within one
          business day, in sha Allah.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value="New free trial enquiry" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink/70">
            Parent name
          </label>
          <input name="parentName" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70">
            Child&apos;s age
          </label>
          <input name="childAge" required className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/70">Email</label>
        <input type="email" name="email" required className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/70">
          What are you interested in?
        </label>
        <select name="interest" className={inputClass}>
          <option>Free trial class</option>
          <option>Quran Nazirah</option>
          <option>Quran Tajweed</option>
          <option>Quran Memorization (Hifz)</option>
          <option>Islamic Studies</option>
          <option>Dari & Pashto Language</option>
          <option>Something else</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/70">
          Anything we should know?
        </label>
        <textarea name="message" rows={4} className={inputClass} />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Sorry, something went wrong. Please try again, or email us at
          info@talemwatarbiya.org.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream hover:bg-clay-dark transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
