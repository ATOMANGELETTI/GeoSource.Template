import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Nord Polar Night + Snow Storm + Frost + Aurora
      colors: {
        // Polar Night (backgrounds, surfaces)
        "nord-0": "#2e3440",  // darkest bg
        "nord-1": "#3b4252",  // elevated surface
        "nord-2": "#434c5e",  // hover surface
        "nord-3": "#4c566a",  // border / muted
        // Snow Storm (text)
        "nord-4": "#d8dee9",  // subtle text
        "nord-5": "#e5e9f0",  // body text
        "nord-6": "#eceff4",  // heading text
        // Frost (accents / interactive)
        "nord-7": "#8fbcbb",  // teal accent
        "nord-8": "#88c0d0",  // primary blue
        "nord-9": "#81a1c1",  // secondary blue
        "nord-10": "#5e81ac", // deep blue
        // Aurora (status)
        "nord-11": "#bf616a", // red (close)
        "nord-12": "#d08770", // orange
        "nord-13": "#ebcb8b", // yellow (minimize)
        "nord-14": "#a3be8c", // green (maximize)
        "nord-15": "#b48ead", // purple
      },
      fontFamily: {
        terminus: ["Terminus", "TerminessNFM", "monospace"],
        mono: ["Terminus", "TerminessNFM", "Consolas", "monospace"],
      },
      fontSize: {
        "2xs": ["10px", { lineHeight: "14px" }],
        xs: ["11px", { lineHeight: "16px" }],
        sm: ["12px", { lineHeight: "18px" }],
        base: ["13px", { lineHeight: "20px" }],
        md: ["14px", { lineHeight: "20px" }],
        lg: ["16px", { lineHeight: "24px" }],
        xl: ["18px", { lineHeight: "28px" }],
        "2xl": ["20px", { lineHeight: "28px" }],
      },
      borderRadius: {
        none: "0px",
        xs: "2px",
        sm: "3px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        full: "9999px",
      },
      spacing: {
        titlebar: "32px",
      },
      height: {
        titlebar: "32px",
      },
      animation: {
        "fade-in": "fadeIn 150ms ease-in-out",
        "scale-in": "scaleIn 100ms ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      boxShadow: {
        "nord-sm": "0 1px 3px rgba(0,0,0,0.4)",
        "nord-md": "0 4px 12px rgba(0,0,0,0.5)",
        "nord-lg": "0 8px 24px rgba(0,0,0,0.6)",
        titlebar: "0 1px 0 rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
