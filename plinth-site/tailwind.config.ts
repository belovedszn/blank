import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A0A0A", 900: "#070707", 800: "#171717", 700: "#262626" },
        bone: { DEFAULT: "#FAFAFA", 200: "#F5F5F5" },
        jade: { DEFAULT: "#0FA37F", 100: "#DCF1EA", 400: "#3BC0A1", 600: "#0B8366", 700: "#0A7458" },
        mid: "#737373",
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "72rem" },
      keyframes: {
        nudge: { "0%,100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(4px)" } },
        aurora: {
          "0%": { transform: "translate3d(-4%,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%,-3%,0) scale(1.08)" },
          "100%": { transform: "translate3d(-4%,0,0) scale(1)" },
        },
      },
      animation: { nudge: "nudge 2.4s ease-in-out infinite", aurora: "aurora 22s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
