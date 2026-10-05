import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db, formatDate } from "@/lib/db";
import { recordLesson, saveMeetingLink } from "./actions";

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
  parent: { name: string } | null;
  lessons: Lesson[];
};

export default async function TeacherDashboard({
  searchParams,
}: {
  searchParams: { saved?: string; link?: string; t?: string };
}) {
  const session = await getServerSession(authOptions);
  const teacherId = (session?.user as { id?: string } | undefined)?.id;

  let students: Student[] = [];
  let failed = false;

  if (teacherId) {
    try {
      const params = new URLSearchParams({
        select:
          "id,name,course,meeting_url,parent:users!parent_id(name),lessons(id,lesson_date,attended,note,recording_url)",
        teacher_id: `eq.${teacherId}`,
        order: "name.asc",
        "lessons.order": "lesson_date.desc,created_at.desc",
        "lessons.limit": "5",
      });
      students = await db<Student[]>(`students?${params}`);
    } catch (error) {
      console.error(error);
      failed = true;
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-medium text-clay">Teacher portal</p>
      <h1 className="mt-2 font-display text-3xl text-lapis">
        Welcome, {session?.user?.name ?? "Teacher"}
      </h1>
      <p className="mt-2 text-ink/60">
        After each class, record whether the student attended and add a short
        note. Parents see it straight away.
      </p>

      {failed && (
        <p className="mt-8 rounded-lg border border-clay/30 bg-white/60 p-6 text-sm text-clay-dark">
          Sorry, we couldn&apos;t load your students right now. Please try
          again in a few minutes.
        </p>
      )}

      {!failed && students.length === 0 && (
        <p className="mt-8 rounded-lg border border-ink/10 bg-white/60 p-6 text-sm text-ink/70">
          No students are assigned to you yet.
        </p>
      )}

      <div className="mt-8 space-y-8">
        {students.map((student) => (
          <div
            key={student.id}
            className="rounded-lg border border-ink/10 bg-white/60 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-lapis">{student.name}</h2>
                <p className="text-sm text-ink/60">
                  {student.course}
                  {student.parent ? ` · Parent: ${student.parent.name}` : ""}
                </p>
              </div>
              {student.meeting_url && (
                <a
                  href={student.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  ▶ Start live class
                </a>
              )}
            </div>

            <form
              action={saveMeetingLink}
              className="mt-4 flex flex-wrap items-end gap-3 rounded-md bg-sky-50 p-4"
            >
              <input type="hidden" name="student_id" value={student.id} />
              <label className="block w-full sm:flex-1 text-sm font-medium text-ink/80">
                Live class link (Zoho Meeting room)
                <input
                  type="url"
                  name="meeting_url"
                  defaultValue={student.meeting_url ?? ""}
                  placeholder="https://meeting.zoho.eu/…"
                  className="mt-1 block w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-lapis px-5 py-2.5 text-sm font-medium text-cream hover:bg-lapis-dark transition-colors"
              >
                Save link
              </button>
            </form>
            {searchParams.link === student.id && (
              <p className="mt-2 rounded-md bg-sage/15 px-3 py-2 text-sm font-medium text-sage">
                Link saved. The parent now sees a &ldquo;Join live class&rdquo; button.
              </p>
            )}

            {searchParams.saved === student.id && (
              <p className="mt-4 rounded-md bg-sage/15 px-3 py-2 text-sm font-medium text-sage">
                Saved. The parent can now see this class.
              </p>
            )}

            <form
              key={searchParams.saved === student.id ? searchParams.t : "form"}
              action={recordLesson}
              className="mt-5 space-y-4"
            >
              <input type="hidden" name="student_id" value={student.id} />

              <div className="flex flex-wrap items-end gap-6">
                <label className="block text-sm font-medium text-ink/80">
                  Class date
                  <input
                    type="date"
                    name="lesson_date"
                    defaultValue={today}
                    required
                    className="mt-1 block rounded-md border border-ink/20 bg-white px-3 py-2 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
                  />
                </label>

                <fieldset className="text-sm">
                  <legend className="font-medium text-ink/80">Attendance</legend>
                  <div className="mt-2 flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="attended" value="yes" defaultChecked />
                      Attended
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="attended" value="no" />
                      Missed
                    </label>
                  </div>
                </fieldset>
              </div>

              <label className="block text-sm font-medium text-ink/80">
                Note for the parent (optional)
                <textarea
                  name="note"
                  rows={3}
                  maxLength={2000}
                  placeholder="e.g. Good progress with Surah Al-Mulk, practise ayat 1–10 this week."
                  className="mt-1 block w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
                />
              </label>

              <label className="block text-sm font-medium text-ink/80">
                Class recording link (optional)
                <input
                  type="url"
                  name="recording_url"
                  placeholder="https://… (Zoom or Google Drive link)"
                  className="mt-1 block w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm focus:border-lapis focus:outline-none focus:ring-1 focus:ring-lapis"
                />
              </label>

              <button
                type="submit"
                className="rounded-full bg-lapis px-6 py-2.5 text-sm font-medium text-cream hover:bg-lapis-dark transition-colors"
              >
                Save class
              </button>
            </form>

            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-sage">
              Last 5 classes
            </p>
            {student.lessons.length === 0 ? (
              <p className="mt-2 text-sm text-ink/60">No classes recorded yet.</p>
            ) : (
              <ul className="mt-2 divide-y divide-ink/10">
                {student.lessons.map((lesson) => (
                  <li key={lesson.id} className="py-2 text-sm">
                    <span className="font-medium text-ink">
                      {formatDate(lesson.lesson_date)}
                    </span>{" "}
                    <span className={lesson.attended ? "text-sage" : "text-clay"}>
                      · {lesson.attended ? "Attended" : "Missed"}
                    </span>
                    {lesson.note && (
                      <span className="text-ink/60"> — {lesson.note}</span>
                    )}
                    {lesson.recording_url && (
                      <>
                        {" · "}
                        <a
                          href={lesson.recording_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lapis font-medium"
                        >
                          Recording
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
