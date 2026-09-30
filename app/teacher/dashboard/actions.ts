"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

/** Saves one class (attended/missed + note) for a teacher's own student. */
export async function recordLesson(formData: FormData) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id?: string; role?: string } | undefined;
  if (!user?.id || user.role !== "teacher") {
    throw new Error("Only signed-in teachers can record classes.");
  }

  const studentId = String(formData.get("student_id") ?? "");
  const lessonDate = String(formData.get("lesson_date") ?? "");
  const attended = formData.get("attended") === "yes";
  const note = String(formData.get("note") ?? "").trim().slice(0, 2000);

  if (!/^[0-9a-f-]{36}$/i.test(studentId)) throw new Error("Invalid student.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lessonDate)) throw new Error("Invalid date.");

  // Make sure this student really belongs to this teacher.
  const owned = await db<{ id: string }[]>(
    `students?select=id&id=eq.${studentId}&teacher_id=eq.${user.id}`
  );
  if (owned.length === 0) throw new Error("This student is not in your class.");

  await db("lessons", {
    method: "POST",
    body: {
      student_id: studentId,
      teacher_id: user.id,
      lesson_date: lessonDate,
      attended,
      note: note || null,
    },
  });

  revalidatePath("/teacher/dashboard");
  revalidatePath("/parent/dashboard");
  redirect(`/teacher/dashboard?saved=${studentId}&t=${Date.now()}`);
}
