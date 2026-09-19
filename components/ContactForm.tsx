"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No backend wired up yet — see README for how to connect this
    // to a real email service or database.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-ink/10 bg-white/60 p-8 text-center">
        <p className="font-display text-xl text-lapis">Thank you!</p>
        <p className="mt-2 text-sm text-ink/70">
          This is a demo form — no message was actually sent. Once a real
          backend is connected, you&apos;d hear from us within one business
          day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink/70">
            Parent name
          </label>
          <input
            required
            className="mt-1 w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/70">
            Child&apos;s age
          </label>
          <input
            required
            className="mt-1 w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/70">
          Email
        </label>
        <input
          type="email"
          required
          className="mt-1 w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/70">
          What are you interested in?
        </label>
        <select className="mt-1 w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis">
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
        <textarea
          rows={4}
          className="mt-1 w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-clay px-6 py-3 text-sm font-medium text-cream hover:bg-clay-dark transition-colors"
      >
        Send message
      </button>
    </form>
  );
}
