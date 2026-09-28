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
    price: "$29",
    period: "per month",
    description: "A gentle start for younger children or families easing into a routine.",
    features: [
      "2 live 1-to-1 classes weekly (30 min each)",
      "About 8 classes per month",
      "Every class recorded for review",
      "Free trial class before you start",
    ],
  },
  {
    name: "Standard",
    frequency: "3 classes / week",
    price: "$35",
    period: "per month",
    description: "Our most popular plan — enough consistency to build real momentum.",
    features: [
      "3 live 1-to-1 classes weekly (30 min each)",
      "About 12 classes per month",
      "Every class recorded for review",
      "Free trial class before you start",
    ],
    highlighted: true,
  },
  {
    name: "Intensive",
    frequency: "5 classes / week",
    price: "$49",
    period: "per month",
    description: "For families pursuing Hifz or wanting a daily learning routine.",
    features: [
      "5 live 1-to-1 classes weekly (30 min each)",
      "About 20 classes per month",
      "Every class recorded for review",
      "Free trial class before you start",
    ],
  },
];
