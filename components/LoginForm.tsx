"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm({
  providerId,
  role,
  dashboardPath,
}: {
  providerId: "parent" | "teacher";
  role: string;
  dashboardPath: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn(providerId, {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    router.push(dashboardPath);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink/70">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
          placeholder={`${role}@example.com`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink/70">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
          placeholder="••••••••"
        />
      </div>

      {error && <p className="text-sm text-clay-dark">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-lapis px-6 py-3 text-sm font-medium text-cream hover:bg-lapis-dark transition-colors disabled:opacity-60"
      >
        {loading ? "Signing in…" : `Sign in as ${role}`}
      </button>

      <p className="text-xs text-ink/40 text-center">
        Demo account: {role}@example.com / password123
      </p>
    </form>
  );
}
