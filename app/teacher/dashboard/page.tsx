import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export const dynamic = "force-dynamic";
export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium text-clay">Teacher portal</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">
        Welcome, {session?.user?.name ?? "Teacher"}
      </h1>
      <p className="mt-2 text-ink/60">
        Placeholder dashboard — your real class roster and schedule would be
        fetched here once connected to a database.
      </p>

      <div className="mt-8 rounded-lg border border-ink/10 bg-white/60 p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-sage">
          Today&apos;s schedule
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink/70">
          <li>4:00 PM — Quran Nazirah, Student A</li>
          <li>5:00 PM — Quran Tajweed, Student B</li>
        </ul>
      </div>
    </section>
  );
}
