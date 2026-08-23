import type { Config } from "tailwindcss";

// Values ported verbatim from design_handoff_farm_dashboard/tokens/*.css —
// see that directory for the source of truth and the rationale in README.md.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#6C1E27",
        "maroon-deep": "#4E141B",
        "maroon-tint": "#F2E4E2",
        beige: "#D8CBBE",
        "beige-deep": "#C4B4A3",
        ivory: "#F7F2EA",
        cream: "#F1E9DD",
        parchment: "#EDE3D4",
        ink: "#2E2622",
        "ink-soft": "#5A4F47",
        "ink-faint": "#8B7F73",
        gold: "#C0873B",
        "gold-deep": "#A06D28",
        sage: "#6F7355",
        "sage-deep": "#565A40"
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-lato)", "Helvetica Neue", "sans-serif"],
        script: ["var(--font-dancing)", "cursive"]
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        modal: "16px",
        pill: "999px"
      },
      boxShadow: {
        card: "0 2px 8px rgba(46,38,34,.07)",
        slide: "0 12px 34px rgba(46,38,34,.18)",
        dropdown: "0 6px 18px rgba(46,38,34,.14)",
        modal: "0 24px 60px rgba(46,38,34,.35)"
      },
      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-3": "12px",
        "space-4": "14px",
        "space-5": "18px",
        "space-6": "20px",
        "space-7": "26px",
        "space-8": "28px",
        "space-9": "36px",
        "space-10": "48px",
        "space-11": "72px",
        "space-12": "96px"
      },
      maxWidth: {
        content: "1240px"
      }
    }
  },
  plugins: []
};

export default config;
