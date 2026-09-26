import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Protects /parent/dashboard and /teacher/dashboard.
 * - Not logged in → sent to the matching login page.
 * - Logged in with the wrong role → sent to their own dashboard.
 */
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const isTeacherArea = pathname.startsWith("/teacher");
    const loginPage = isTeacherArea ? "/teacher/login" : "/parent/login";

    if (!token) {
      return NextResponse.redirect(new URL(loginPage, req.url));
    }

    const role = token.role as string | undefined;

    if (role === "parent" && isTeacherArea) {
      return NextResponse.redirect(new URL("/parent/dashboard", req.url));
    }

    if (role === "teacher" && !isTeacherArea) {
      return NextResponse.redirect(new URL("/teacher/dashboard", req.url));
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
  matcher: ["/parent/dashboard/:path*", "/teacher/dashboard/:path*"],
};
