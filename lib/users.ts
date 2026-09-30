export type Role = "parent" | "teacher";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
};

/**
 * Looks up parent/teacher accounts in the Supabase `users` table.
 * Accounts are added by the admin in Supabase (SQL Editor) — there is
 * no public sign-up. Passwords are stored as bcrypt hashes only.
 *
 * Uses the server-only secret key, so this must never run in the browser.
 */
const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: Role;
  password_hash: string;
};

export async function findUserByEmail(
  email: string,
  role: Role
): Promise<User | undefined> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Supabase environment variables are missing.");
    return undefined;
  }

  const params = new URLSearchParams({
    select: "id,email,name,role,password_hash",
    email: `eq.${email.trim().toLowerCase()}`,
    role: `eq.${role}`,
    limit: "1",
  });

  const headers: Record<string, string> = { apikey: SUPABASE_KEY };
  // Older JWT-style keys also need the Authorization header.
  if (!SUPABASE_KEY.startsWith("sb_")) {
    headers.Authorization = `Bearer ${SUPABASE_KEY}`;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?${params}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Supabase lookup failed:", res.status, await res.text());
    return undefined;
  }

  const rows = (await res.json()) as UserRow[];
  const row = rows[0];
  if (!row) return undefined;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    passwordHash: row.password_hash,
  };
}
