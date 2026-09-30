import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { findUserByEmail, type Role } from "./users";

/**
 * Email + password login for each kind of account.
 * Accounts live in the Supabase `users` table (see lib/users.ts).
 */
function loginFor(role: Role, name: string) {
  return CredentialsProvider({
    id: role,
    name,
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      const user = await findUserByEmail(credentials.email, role);
      if (!user) return null;
      const valid = await compare(credentials.password, user.passwordHash);
      if (!valid) return null;
      return { id: user.id, email: user.email, name: user.name, role };
    },
  });
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/parent/login",
  },
  providers: [
    loginFor("parent", "Parent"),
    loginFor("teacher", "Teacher"),
    loginFor("admin", "Admin"),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
};
