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
  const recordingUrl = String(formData.get("recording_url") ?? "").trim().slice(0, 1000);

  if (!/^[0-9a-f-]{36}$/i.test(studentId)) throw new Error("Invalid student.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lessonDate)) throw new Error("Invalid date.");
  if (recordingUrl && !/^https:\/\//i.test(recordingUrl)) {
    throw new Error("The recording link must start with https://");
  }

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
      recording_url: recordingUrl || null,
    },
  });

  revalidatePath("/teacher/dashboard");
  revalidatePath("/parent/dashboard");
  redirect(`/teacher/dashboard?saved=${studentId}&t=${Date.now()}`);
}

/** Saves the live-class link (e.g. a Zoho Meeting room) for one of the teacher's students. */
export async function saveMeetingLink(formData: FormData) {
  const session = await getServerSession(authOptions);
  const user = session?.user as { id?: string; role?: string } | undefined;
  if (!user?.id || user.role !== "teacher") {
    throw new Error("Only signed-in teachers can do this.");
  }

  const studentId = String(formData.get("student_id") ?? "");
  const meetingUrl = String(formData.get("meeting_url") ?? "").trim().slice(0, 1000);

  if (!/^[0-9a-f-]{36}$/i.test(studentId)) throw new Error("Invalid student.");
  if (meetingUrl && !/^https:\/\//i.test(meetingUrl)) {
    throw new Error("The class link must start with https://");
  }

  // Only update a student who belongs to this teacher.
  await db(`students?id=eq.${studentId}&teacher_id=eq.${user.id}`, {
    method: "PATCH",
    body: { meeting_url: meetingUrl || null },
  });

  revalidatePath("/teacher/dashboard");
  revalidatePath("/parent/dashboard");
  redirect(`/teacher/dashboard?link=${studentId}&t=${Date.now()}`);
}
