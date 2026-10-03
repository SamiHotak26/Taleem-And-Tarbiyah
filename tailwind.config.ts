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
          DEFAULT: "#1976D2",
          dark: "#0D3B7A",
          light: "#42A5F5",
        },
        clay: {
          DEFAULT: "#E65100",
          dark: "#BF360C",
          light: "#FFE082",
        },
        cream: "#FFFDF7",
        sage: "#2E7D32",
        ink: "#1F2937",
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
