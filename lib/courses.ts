export type Course = {
  slug: string;
  title: string;
  level: string;
  tagline: string;
  description: string;
  credential: string;
};

export const courses: Course[] = [
  {
    slug: "quran-nazirah",
    title: "Quran Nazirah",
    level: "Foundational",
    tagline: "First steps in reading the Quran",
    description:
      "Beginning with the Noorani Qaida, students learn letter recognition, joining rules, and basic Tajweed until they can read the Quran independently, at their own pace.",
    credential: "Certified Qari",
  },
  {
    slug: "quran-tajweed",
    title: "Quran Tajweed",
    level: "Intermediate to Advanced",
    tagline: "Reciting with precision and beauty",
    description:
      "A deeper study of articulation points (Makharij) and letter characteristics (Sifat), refining recitation until every rule is applied naturally and correctly.",
    credential: "Certified Teacher",
  },
  {
    slug: "quran-translation-tafseer",
    title: "Quran Translation & Tafseer",
    level: "Basic to Advanced",
    tagline: "Understanding the meaning behind the words",
    description:
      "Moving beyond recitation into meaning — context, occasions of revelation, and practical lessons drawn from each surah, taught in Dari and English.",
    credential: "Scholar (Alim)",
  },
  {
    slug: "quran-memorization",
    title: "Quran Memorization",
    level: "All Levels",
    tagline: "Building a lasting connection to the Quran",
    description:
      "A structured Hifz program with daily review cycles, one-on-one accountability, and pacing suited to each student's memory and schedule.",
    credential: "Hafiz-ul-Quran",
  },
  {
    slug: "islamic-studies",
    title: "Islamic Studies",
    level: "All Ages",
    tagline: "Aqeedah, Fiqh, Seerah & Akhlaq",
    description:
      "A rotating curriculum covering Islamic creed, daily-life jurisprudence, the life of the Prophet ﷺ, and character development, woven into every session.",
    credential: "Master of Islamic Studies",
  },
  {
    slug: "dari-pashto-language",
    title: "Dari & Pashto Language",
    level: "Heritage Learners",
    tagline: "Staying connected to home",
    description:
      "Reading, writing, and conversation in Dari and Pashto, built for children growing up abroad who want to stay connected to family and heritage.",
    credential: "Native Linguist",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
