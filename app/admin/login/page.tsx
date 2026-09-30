import LoginForm from "@/components/LoginForm";

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <p className="text-sm font-medium text-clay">Admin</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">Admin sign in</h1>
      <p className="mt-2 text-sm text-ink/60">
        Manage teachers, parents and children.
      </p>

      <LoginForm providerId="admin" role="admin" dashboardPath="/admin/dashboard" />
    </section>
  );
}
