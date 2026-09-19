import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function ParentLoginPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <p className="text-sm font-medium text-clay">Parent portal</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-ink/60">
        Sign in to view your child&apos;s progress, attendance, and class
        recordings.
      </p>

      <LoginForm providerId="parent" role="parent" dashboardPath="/parent/dashboard" />

      <p className="mt-6 text-center text-sm text-ink/50">
        Are you a teacher?{" "}
        <Link href="/teacher/login" className="text-lapis font-medium">
          Sign in here
        </Link>
      </p>
    </section>
  );
}
