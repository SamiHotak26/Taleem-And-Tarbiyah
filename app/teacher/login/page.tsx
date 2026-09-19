import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function TeacherLoginPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <p className="text-sm font-medium text-clay">Teacher portal</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">
        Sign in to teach
      </h1>
      <p className="mt-2 text-sm text-ink/60">
        Access your class schedule, student roster, and session notes.
      </p>

      <LoginForm providerId="teacher" role="teacher" dashboardPath="/teacher/dashboard" />

      <p className="mt-6 text-center text-sm text-ink/50">
        Are you a parent?{" "}
        <Link href="/parent/login" className="text-lapis font-medium">
          Sign in here
        </Link>
      </p>
    </section>
  );
}
