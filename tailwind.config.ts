import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        card: "14px",
        inner: "10px",
      },
      colors: {
        navy: "#0B2645",
        "navy-deep": "#071A31",
        "navy-soft": "#1B3B63",
        gold: "#C99B2A",
        "gold-text": "#8A6614",
        ink: "#1C2533",
        muted: "#4A5568",
        "on-navy": "#D6DEEA",
        mist: "#F3F5F9",
        line: "#E3E7EE",
        border: "#DCE2EA",
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          "2xl": "1240px",
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans-3)", "sans-serif"],
        heading: ["var(--font-sora)", "sans-serif"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 5vw, 4.25rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
        section: [
          "clamp(2rem, 3.6vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        card: ["1.25rem", { lineHeight: "1.3" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        lead: ["clamp(1.125rem, 1.4vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      boxShadow: {
        soft: "0 22px 50px rgba(11, 38, 69, 0.16)",
      },
      spacing: {
        section: "7rem",
        "section-mobile": "4.5rem",
      },
    },
  },
  plugins: [typography],
};
export default config;
