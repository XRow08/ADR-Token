import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red_100: "#FF1249",
        red_200: "#E11D48",
        red_300: "#BE123C",
        red_400: "#9F0832",
        dark_100: "#09090B",
        dark_200: "#131313",
        dark_300: "#19191f",
        dark_400: "#3A3A3A",
        zinc_50: "#FAFAFA",
        neutral_50: "#F5F5FA",
        neutral_100: "#D4D4D8",
        neutral_200: "#A1A1AA",
        neutral_400: "#36363A",
        neutral_500: "#27272A",
        neutral_600: "#1E1E20",
        neutral_700: "#19191B",
        neutral_800: "#111112",
        neutral_900: "#0A0A0B",
      },
    },
  },
  plugins: [scrollbar({ nocompatible: true })],
} satisfies Config;
