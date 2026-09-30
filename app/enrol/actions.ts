"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maenlrqw";

function field(formData: FormData, name: string, max = 200) {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

/** Saves an enrolment request and emails a copy to info@. */
export async function sendEnquiry(formData: FormData) {
  // Hidden "website" field: real people leave it empty, spam bots fill it in.
  if (field(formData, "website")) redirect("/enrol?sent=1");

  const enquiry = {
    parent_name: field(formData, "parent_name"),
    email: field(formData, "email").toLowerCase(),
    phone: field(formData, "phone"),
    child_name: field(formData, "child_name"),
    child_age: field(formData, "child_age", 20),
    course: field(formData, "course"),
    plan: field(formData, "plan"),
    message: field(formData, "message", 2000),
  };

  if (!enquiry.parent_name || !enquiry.email.includes("@") || !enquiry.child_name) {
    redirect("/enrol?error=1");
  }

  await db("enquiries", { method: "POST", body: enquiry });

  // Also email it to info@ (if this fails, the request is still saved).
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ _subject: "New enrolment request", ...enquiry }),
    });
  } catch (error) {
    console.error("Formspree email failed", error);
  }

  redirect("/enrol?sent=1");
}
