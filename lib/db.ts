/**
 * Tiny server-only helper for talking to the Supabase database.
 * Uses the secret key Vercel added when Supabase was connected,
 * so it must never be imported into a "use client" file.
 */
const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function db<T = unknown>(
  path: string,
    options: { method?: "GET" | "POST" | "PATCH" | "DELETE"; body?: unknown } = {}
): Promise<T> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase environment variables are missing.");
  }

  const method = options.method ?? "GET";
  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY,
    "Content-Type": "application/json",
  };
  // Older JWT-style keys also need the Authorization header.
  if (!SUPABASE_KEY.startsWith("sb_")) {
    headers.Authorization = `Bearer ${SUPABASE_KEY}`;
  }
  if (method !== "GET") {
    headers.Prefer = "return=minimal";
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  }

  if (method !== "GET") return undefined as T;
  return (await res.json()) as T;
}

/** "2026-09-30" → "30 Sept 2026" */
export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
