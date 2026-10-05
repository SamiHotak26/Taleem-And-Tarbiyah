import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db, formatDate } from "@/lib/db";

export const dynamic = "force-dynamic";

type Lesson = {
  id: string;
  lesson_date: string;
  attended: boolean;
  note: string | null;
  recording_url: string | null;
};

type Student = {
  id: string;
  name: string;
  course: string;
  meeting_url: string | null;
  teacher: { name: string } | null;
  lessons: Lesson[];
};

export default async function ParentDashboard() {
  const session = await getServerSession(authOptions);
  const parentId = (session?.user as { id?: string } | undefined)?.id;

  let students: Student[] = [];
  let failed = false;

  if (parentId) {
    try {
      const params = new URLSearchParams({
        select:
          "id,name,course,meeting_url,teacher:users!teacher_id(name),lessons(id,lesson_date,attended,note,recording_url)",
        parent_id: `eq.${parentId}`,
        order: "name.asc",
        "lessons.order": "lesson_date.desc,created_at.desc",
        "lessons.limit": "30",
      });
      students = await db<Student[]>(`students?${params}`);
    } catch (error) {
      console.error(error);
      failed = true;
    }
  }

  const thisMonth = new Date().toISOString().slice(0, 7); // e.g. "2026-09"

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium text-clay">Parent portal</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">
        Welcome, {session?.user?.name ?? "Parent"}
      </h1>
      <p className="mt-2 text-ink/60">
        Attendance and teacher notes for your children, updated after every
        class.
      </p>

      {failed && (
        <p className="mt-8 rounded-lg border border-clay/30 bg-white/60 p-6 text-sm text-clay-dark">
          Sorry, we couldn&apos;t load your children&apos;s records right now.
          Please try again in a few minutes.
        </p>
      )}

      {!failed && students.length === 0 && (
        <p className="mt-8 rounded-lg border border-ink/10 bg-white/60 p-6 text-sm text-ink/70">
          No children are linked to your account yet. Please contact us at{" "}
          <a href="mailto:info@taleemandtarbiyah.com" className="text-lapis font-medium">
            info@taleemandtarbiyah.com
          </a>
          .
        </p>
      )}

      <div className="mt-8 space-y-8">
        {students.map((student) => {
          const monthLessons = student.lessons.filter((l) =>
            l.lesson_date.startsWith(thisMonth)
          );
          const attendedThisMonth = monthLessons.filter((l) => l.attended).length;
          const recent = student.lessons.slice(0, 10);

          return (
            <div
              key={student.id}
              className="rounded-lg border border-ink/10 bg-white/60 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h2 className="font-display text-2xl text-lapis">{student.name}</h2>
                  <p className="text-sm text-ink/60">
                    {student.course}
                    {student.teacher ? ` · Teacher: ${student.teacher.name}` : ""}
                  </p>
                  {student.meeting_url && (
                    <a
                      href={student.meeting_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-clay-dark transition-colors"
                    >
                      ▶ Join live class
                    </a>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium uppercase tracking-wide text-sage">
                    This month
                  </p>
                  <p className="font-display text-xl text-lapis">
                    {attendedThisMonth} of {monthLessons.length} classes attended
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs font-medium uppercase tracking-wide text-sage">
                Recent classes
              </p>
              {recent.length === 0 ? (
                <p className="mt-2 text-sm text-ink/60">No classes recorded yet.</p>
              ) : (
                <ul className="mt-3 divide-y divide-ink/10">
                  {recent.map((lesson) => (
                    <li key={lesson.id} className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-ink">
                          {formatDate(lesson.lesson_date)}
                        </span>
                        <span
                          className={
                            lesson.attended
                              ? "rounded-full bg-sage/15 px-2.5 py-0.5 text-xs font-medium text-sage"
                              : "rounded-full bg-clay/15 px-2.5 py-0.5 text-xs font-medium text-clay"
                          }
                        >
                          {lesson.attended ? "Attended" : "Missed"}
                        </span>
                        {lesson.recording_url && (
                          <a
                            href={lesson.recording_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-lapis underline"
                          >
                            ▶ Watch recording
                          </a>
                        )}
                      </div>
                      {lesson.note && (
                        <p className="mt-1 text-sm text-ink/70 whitespace-pre-line">
                          {lesson.note}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
