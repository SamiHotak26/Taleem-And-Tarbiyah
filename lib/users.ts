import { hash } from "bcryptjs";

export type Role = "parent" | "teacher";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
};

/**
 * In-memory placeholder — replace with a real table/collection.
 * The password for both demo accounts below is: "password123"
 * (hashed here just so `authorize()` in lib/auth.ts works out of the box).
 */
let users: User[] | null = null;

async function seed(): Promise<User[]> {
  if (users) return users;
  const passwordHash = await hash("password123", 10);
  users = [
    {
      id: "1",
      email: "parent@example.com",
      name: "Demo Parent",
      role: "parent",
      passwordHash,
    },
    {
      id: "2",
      email: "teacher@example.com",
      name: "Demo Teacher",
      role: "teacher",
      passwordHash,
    },
  ];
  return users;
}

export async function findUserByEmail(
  email: string,
  role: Role
): Promise<User | undefined> {
  const all = await seed();
  return all.find((u) => u.email === email && u.role === role);
}
