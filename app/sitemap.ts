import type { MetadataRoute } from "next";
import { courses } from "@/lib/courses";

const SITE = "https://www.taleemandtarbiyah.com";

/** Tells Google which pages exist on the site. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/courses",
    "/pricing",
    "/how-it-works",
    "/about",
    "/contact",
    "/enrol",
    "/safeguarding",
    "/privacy",
  ];
  return [
    ...pages.map((path) => ({
      url: `${SITE}${path}`,
      lastModified: new Date(),
      priority: path === "" ? 1 : 0.7,
    })),
    ...courses.map((c) => ({
      url: `${SITE}/courses/${c.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
