import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { courses } from "@/lib/courses";
import {
  addPerson,
  addChild,
  changePassword,
  removePerson,
  removeChild,
} from "./actions";

export const dynamic = "force-dynamic";

type Person = { id: string; name: string; email: string; role: string };
type Child = {
  id: string;
  name: string;
  course: string;
  parent: { name: string } | null;
  teacher: { name: string } | null;
};

const input =
  "mt-1 block w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis";
const label = "block text-sm font-medium text-ink/80";
const button =
  "rounded-full bg-lapis px-6 py-2.5 text-sm font-medium text-cream hover:bg-lapis-dark transition-colors";
const card = "rounded-lg border border-ink/10 bg-white/60 p-6";
const removeButton =
  "rounded-full bg-clay px-4 py-1.5 text-xs font-medium text-cream hover:bg-clay-dark transition-colors";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { msg?: string; error?: string };
}) {
  const session = await getServerSession(authOptions);
  const myId = (session?.user as { id?: string } | undefined)?.id;

  let people: Person[] = [];
  let children: Child[] = [];
  let failed = false;
  try {
    [people, children] = await Promise.all([
      db<Person[]>("users?select=id,name,email,role&order=name.asc"),
      db<Child[]>(
        "students?select=id,name,course,parent:users!parent_id(name),teacher:users!teacher_id(name)&order=name.asc"
      ),
    ]);
  } catch (error) {
    console.error(error);
    failed = true;
  }

  const teachers = people.filter((p) => p.role === "teacher");
  const parents = people.filter((p) => p.role === "parent");

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium text-clay">Admin</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">
        Welcome, {session?.user?.name ?? "Admin"}
      </h1>
      <p className="mt-2 text-ink/60">
        Add teachers, parents and children, and reset passwords.
      </p>

      {searchParams.msg && (
        <p className="mt-6 rounded-md bg-sage/15 px-4 py-3 text-sm font-medium text-sage">
          {searchParams.msg}
        </p>
      )}
      {searchParams.error && (
        <p className="mt-6 rounded-md bg-clay/15 px-4 py-3 text-sm font-medium text-clay-dark">
          {searchParams.error}
        </p>
      )}
      {failed && (
        <p className="mt-6 rounded-md bg-clay/15 px-4 py-3 text-sm font-medium text-clay-dark">
          Sorry, we couldn&apos;t load the lists right now. Please try again in a
          few minutes.
        </p>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* 1. Add a person */}
        <form action={addPerson} className={`${card} space-y-4`}>
          <h2 className="font-display text-xl text-lapis">1. Add a person</h2>
          <label className={label}>
            Full name
            <input name="name" required className={input} />
          </label>
          <label className={label}>
            Email (used to log in)
            <input name="email" type="email" required className={input} />
          </label>
          <label className={label}>
            They are a…
            <select name="role" required className={input} defaultValue="parent">
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label className={label}>
            Password (at least 8 characters)
            <input name="password" required minLength={8} className={input} />
          </label>
          <button type="submit" className={button}>
            Add person
          </button>
        </form>

        {/* 2. Add a child */}
        <form action={addChild} className={`${card} space-y-4`}>
          <h2 className="font-display text-xl text-lapis">2. Add a child</h2>
          <label className={label}>
            Child&apos;s name
            <input name="name" required className={input} />
          </label>
          <label className={label}>
            Course
            <select name="course" required className={input}>
              {courses.map((c) => (
                <option key={c.slug} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            Parent
            <select name="parent_id" required className={input} defaultValue="">
              <option value="" disabled>
                Choose a parent…
              </option>
              {parents.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.email})
                </option>
              ))}
            </select>
          </label>
          <label className={label}>
            Teacher
            <select name="teacher_id" className={input} defaultValue="">
              <option value="">No teacher yet</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className={button}>
            Add child
          </button>
        </form>

        {/* 3. Change a password */}
        <form action={changePassword} className={`${card} space-y-4 md:col-span-2`}>
          <h2 className="font-display text-xl text-lapis">3. Change a password</h2>
          <p className="text-sm text-ink/60">
            Use this when someone forgets their password.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <label className={label}>
              Person
              <select name="user_id" required className={input} defaultValue="">
                <option value="" disabled>
                  Choose a person…
                </option>
                {people.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.role})
                  </option>
                ))}
              </select>
            </label>
            <label className={label}>
              New password (at least 8 characters)
              <input name="password" required minLength={8} className={input} />
            </label>
          </div>
          <button type="submit" className={button}>
            Change password
          </button>
        </form>
      </div>

      {/* Lists */}
      <div className={`${card} mt-8`}>
        <h2 className="font-display text-xl text-lapis">Children ({children.length})</h2>
        <ul className="mt-3 divide-y divide-ink/10 text-sm">
          {children.map((c) => (
            <li key={c.id} className="py-2">
              <span className="font-medium text-ink">{c.name}</span>
              <span className="text-ink/60">
                {" "}
                · {c.course} · Parent: {c.parent?.name ?? "—"} · Teacher:{" "}
                {c.teacher?.name ?? "none yet"}
              </span>
              <details className="mt-1">
                <summary className="cursor-pointer text-xs text-clay">Remove…</summary>
                <form action={removeChild} className="mt-2 flex flex-wrap items-center gap-3">
                  <input type="hidden" name="child_id" value={c.id} />
                  <span className="text-xs text-ink/60">
                    This also deletes {c.name}&apos;s class records.
                  </span>
                  <button type="submit" className={removeButton}>
                    Yes, remove {c.name}
                  </button>
                </form>
              </details>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${card} mt-8`}>
        <h2 className="font-display text-xl text-lapis">People ({people.length})</h2>
        <ul className="mt-3 divide-y divide-ink/10 text-sm">
          {people.map((p) => (
            <li key={p.id} className="py-2">
              <span className="font-medium text-ink">{p.name}</span>
              <span className="text-ink/60">
                {" "}
                · {p.role} · {p.email}
              </span>
              {p.id !== myId && (
                <details className="mt-1">
                  <summary className="cursor-pointer text-xs text-clay">Remove…</summary>
                  <form action={removePerson} className="mt-2 flex flex-wrap items-center gap-3">
                    <input type="hidden" name="user_id" value={p.id} />
                    <span className="text-xs text-ink/60">
                      {p.role === "parent"
                        ? "This also deletes their children and class records."
                        : "They will no longer be able to log in."}
                    </span>
                    <button type="submit" className={removeButton}>
                      Yes, remove {p.name}
                    </button>
                  </form>
                </details>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
