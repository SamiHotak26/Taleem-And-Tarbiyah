import Link from "next/link";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

type Enquiry = {
  id: string;
  parent_name: string;
  email: string;
  phone: string | null;
  child_name: string;
  child_age: string | null;
  course: string | null;
  plan: string | null;
  message: string | null;
  status: "new" | "done";
  created_at: string;
};

const UUID = /^[0-9a-f-]{36}$/i;

/** Mark an enquiry as done (or back to new). Admins only. */
async function setStatus(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string } | undefined)?.role !== "admin") {
    throw new Error("Only admins can do this.");
  }
  const id = String(formData.get("id") ?? "");
  const status = formData.get("status") === "done" ? "done" : "new";
  if (!UUID.test(id)) return;
  await db(`enquiries?id=eq.${id}`, { method: "PATCH", body: { status } });
  revalidatePath("/admin/dashboard/enquiries");
}

export default async function EnquiriesPage() {
  let enquiries: Enquiry[] = [];
  let failed = false;
  try {
    enquiries = await db<Enquiry[]>("enquiries?select=*&order=created_at.desc");
  } catch (error) {
    console.error(error);
    failed = true;
  }

  const open = enquiries.filter((e) => e.status === "new");
  const done = enquiries.filter((e) => e.status === "done");

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/admin/dashboard" className="text-sm text-lapis">
        ← Back to Admin
      </Link>
      <h1 className="mt-2 font-display text-3xl text-lapis">Enrolment requests</h1>
      <p className="mt-2 text-ink/60">
        New requests from the &ldquo;Enrol your child&rdquo; form. Contact the
        family, then mark the request as done.
      </p>

      {failed && (
        <p className="mt-6 rounded-md bg-clay/15 px-4 py-3 text-sm font-medium text-clay-dark">
          Sorry, we couldn&apos;t load the requests right now.
        </p>
      )}

      <h2 className="mt-10 font-display text-xl text-lapis">New ({open.length})</h2>
      {open.length === 0 && !failed && (
        <p className="mt-2 text-sm text-ink/60">No new requests.</p>
      )}
      <div className="mt-4 space-y-4">
        {open.map((e) => (
          <EnquiryCard key={e.id} enquiry={e} />
        ))}
      </div>

      {done.length > 0 && (
        <>
          <h2 className="mt-12 font-display text-xl text-lapis">Done ({done.length})</h2>
          <div className="mt-4 space-y-4 opacity-70">
            {done.map((e) => (
              <EnquiryCard key={e.id} enquiry={e} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function EnquiryCard({ enquiry: e }: { enquiry: Enquiry }) {
  const received = new Date(e.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="rounded-lg border border-ink/10 bg-white/60 p-6 text-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-lg text-lapis">
          {e.parent_name} — for {e.child_name}
          {e.child_age ? ` (age ${e.child_age})` : ""}
        </p>
        <p className="text-xs text-ink/50">Received {received}</p>
      </div>
      <p className="mt-2 text-ink/70">
        <a href={`mailto:${e.email}`} className="text-lapis font-medium">
          {e.email}
        </a>
        {e.phone ? ` · ${e.phone}` : ""}
      </p>
      <p className="mt-1 text-ink/70">
        {e.course ?? "—"} · Plan: {e.plan ?? "—"}
      </p>
      {e.message && (
        <p className="mt-3 whitespace-pre-line text-ink/70">{e.message}</p>
      )}
      <form action={setStatus} className="mt-4">
        <input type="hidden" name="id" value={e.id} />
        <input type="hidden" name="status" value={e.status === "new" ? "done" : "new"} />
        <button
          type="submit"
          className="rounded-full bg-lapis px-4 py-1.5 text-xs font-medium text-cream hover:bg-lapis-dark transition-colors"
        >
          {e.status === "new" ? "Mark as done" : "Move back to new"}
        </button>
      </form>
    </div>
  );
}
