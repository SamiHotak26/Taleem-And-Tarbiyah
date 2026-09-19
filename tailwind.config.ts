import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lapis: {
          DEFAULT: "#1B3A5C",
          dark: "#122840",
          light: "#2C557F",
        },
        clay: {
          DEFAULT: "#C1622D",
          dark: "#9C4E22",
          light: "#E08B54",
        },
        cream: "#F6EFE4",
        sage: "#6B7A5E",
        ink: "#20211D",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
    },
  },
  plugins: [],
};
export default config;
