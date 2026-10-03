import type { MetadataRoute } from "next";

/** Lets Google read the public pages, but not the private dashboards. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/parent", "/teacher", "/api"],
    },
    sitemap: "https://www.taleemandtarbiyah.com/sitemap.xml",
  };
}
