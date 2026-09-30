import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Protects the parent, teacher and admin dashboards.
 * - Not logged in → sent to the matching login page.
 * - Logged in with a different role → sent to their own dashboard.
 */
const DASHBOARDS: Record<string, string> = {
  parent: "/parent/dashboard",
  teacher: "/teacher/dashboard",
  admin: "/admin/dashboard",
};

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    const area = pathname.startsWith("/admin")
      ? "admin"
      : pathname.startsWith("/teacher")
      ? "teacher"
      : "parent";

    if (!token) {
      return NextResponse.redirect(new URL(`/${area}/login`, req.url));
    }

    const role = token.role as string | undefined;
    if (role !== area) {
      const home = (role && DASHBOARDS[role]) || `/${area}/login`;
      return NextResponse.redirect(new URL(home, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    "/parent/dashboard/:path*",
    "/teacher/dashboard/:path*",
    "/admin/dashboard/:path*",
  ],
};
