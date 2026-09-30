"use server";

import { getServerSession } from "next-auth";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

const ROLES = ["teacher", "parent", "admin"];
const UUID = /^[0-9a-f-]{36}$/i;

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (role !== "admin") throw new Error("Only admins can do this.");
}

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function done(message: string): never {
  revalidatePath("/admin/dashboard");
  redirect(`/admin/dashboard?msg=${encodeURIComponent(message)}`);
}

function fail(message: string): never {
  redirect(`/admin/dashboard?error=${encodeURIComponent(message)}`);
}

/** Add a teacher, parent or admin account. */
export async function addPerson(formData: FormData) {
  await requireAdmin();
  const name = field(formData, "name");
  const email = field(formData, "email").toLowerCase();
  const role = field(formData, "role");
  const password = field(formData, "password");

  if (!name || !email.includes("@")) fail("Please enter a name and a valid email.");
  if (!ROLES.includes(role)) fail("Please choose teacher, parent or admin.");
  if (password.length < 8) fail("The password must be at least 8 characters.");

  try {
    await db("users", {
      method: "POST",
      body: { name, email, role, password_hash: await hash(password, 10) },
    });
  } catch (error) {
    if (String(error).includes("23505")) fail(`${email} already has an account.`);
    throw error;
  }
  done(`Added ${name} (${role}).`);
}

/** Add a child and link them to a parent and a teacher. */
export async function addChild(formData: FormData) {
  await requireAdmin();
  const name = field(formData, "name");
  const course = field(formData, "course");
  const parentId = field(formData, "parent_id");
  const teacherId = field(formData, "teacher_id");

  if (!name || !course) fail("Please enter the child's name and course.");
  if (!UUID.test(parentId)) fail("Please choose a parent.");
  if (teacherId && !UUID.test(teacherId)) fail("Please choose a teacher.");

  await db("students", {
    method: "POST",
    body: { name, course, parent_id: parentId, teacher_id: teacherId || null },
  });
  done(`Added ${name}.`);
}

/** Set a new password for any account (e.g. a parent who forgot theirs). */
export async function changePassword(formData: FormData) {
  await requireAdmin();
  const userId = field(formData, "user_id");
  const password = field(formData, "password");

  if (!UUID.test(userId)) fail("Please choose a person.");
  if (password.length < 8) fail("The password must be at least 8 characters.");

  await db(`users?id=eq.${userId}`, {
    method: "PATCH",
    body: { password_hash: await hash(password, 10) },
  });
  done("Password changed.");
}

/** Remove a person. Removing a parent also removes their children and class records. */
export async function removePerson(formData: FormData) {
  await requireAdmin();
  const session = await getServerSession(authOptions);
  const myId = (session?.user as { id?: string } | undefined)?.id;
  const userId = field(formData, "user_id");

  if (!UUID.test(userId)) fail("Please choose a person.");
  if (userId === myId) fail("You can't remove your own admin account.");

  await db(`users?id=eq.${userId}`, { method: "DELETE" });
  done("Removed.");
}

/** Remove a child and their class records. */
export async function removeChild(formData: FormData) {
  await requireAdmin();
  const childId = field(formData, "child_id");
  if (!UUID.test(childId)) fail("Please choose a child.");

  await db(`students?id=eq.${childId}`, { method: "DELETE" });
  done("Removed.");
}
