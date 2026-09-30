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
