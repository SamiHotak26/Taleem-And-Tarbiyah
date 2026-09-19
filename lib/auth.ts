import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { findUserByEmail } from "./users";

/**
 * PLACEHOLDER AUTH.
 *
 * `findUserByEmail` currently reads from an in-memory array in
 * `lib/users.ts` so you can see the whole flow working end to end.
 *
 * Before going live, replace `lib/users.ts` with real calls to your
 * database (Postgres via Prisma, Supabase, etc.) — see the README
 * section "Making this production-ready" for the schema you'll need.
 */

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/parent/login",
  },
  providers: [
    CredentialsProvider({
      id: "parent",
      name: "Parent",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await findUserByEmail(credentials.email, "parent");
        if (!user) return null;
        const valid = await compare(credentials.password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, role: "parent" };
      },
    }),
    CredentialsProvider({
      id: "teacher",
      name: "Teacher",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await findUserByEmail(credentials.email, "teacher");
        if (!user) return null;
        const valid = await compare(credentials.password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, role: "teacher" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
};
