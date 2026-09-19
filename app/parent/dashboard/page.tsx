import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ParentDashboard() {
 export const dynamic = "force-dynamic";
  const session = await getServerSession(authOptions);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium text-clay">Parent portal</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">
        Welcome, {session?.user?.name ?? "Parent"}
      </h1>
      <p className="mt-2 text-ink/60">
        This is a placeholder dashboard. Real data — attendance, progress
        reports, and class recordings — would be fetched here from your
        database once it's connected.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="rounded-lg border border-ink/10 bg-white/60 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-sage">
            This week
          </p>
          <p className="mt-2 font-display text-lapis text-xl">3 classes attended</p>
        </div>
        <div className="rounded-lg border border-ink/10 bg-white/60 p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-sage">
            Latest note
          </p>
          <p className="mt-2 text-sm text-ink/70">
            "Making good progress with Surah Al-Baqarah recitation."
          </p>
        </div>
      </div>
    </section>
  );
}
