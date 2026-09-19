export type Plan = {
  name: string;
  frequency: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    frequency: "2 classes / week",
    price: "$59",
    period: "per month",
    description: "A steady start for younger children or families easing into a routine.",
    features: [
      "2 live 1-to-1 classes weekly (30 min each)",
      "Quran Nazirah or Islamic Studies track",
      "Every class recorded",
      "Monthly progress note",
    ],
  },
  {
    name: "Standard",
    frequency: "3 classes / week",
    price: "$79",
    period: "per month",
    description: "Our most popular plan — enough consistency to build real momentum.",
    features: [
      "3 live 1-to-1 classes weekly (30 min each)",
      "Any course track, including Tajweed & Hifz",
      "Every class recorded",
      "Bi-weekly progress report",
      "Priority teacher matching",
    ],
    highlighted: true,
  },
  {
    name: "Immersive",
    frequency: "5 classes / week",
    price: "$119",
    period: "per month",
    description: "For families pursuing Hifz or wanting daily accountability.",
    features: [
      "5 live 1-to-1 classes weekly (30 min each)",
      "Any course track, including Tajweed & Hifz",
      "Every class recorded",
      "Weekly progress report",
      "Priority teacher matching",
      "Direct line to your evaluation coordinator",
    ],
  },
];
