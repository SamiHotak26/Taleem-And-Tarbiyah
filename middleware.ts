import { withAuth } from "next-auth/middleware";

/**
 * Protects /parent/dashboard and /teacher/dashboard.
 * Login pages themselves stay public (they're excluded via matcher below).
 */
export default withAuth({
  pages: {
    signIn: "/parent/login",
  },
});

export const config = {
  matcher: ["/parent/dashboard/:path*", "/teacher/dashboard/:path*"],
};
