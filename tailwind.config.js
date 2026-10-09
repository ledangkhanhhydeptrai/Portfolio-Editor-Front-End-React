/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--ui-page)",
        surface: "var(--ui-surface)",
        surface2: "var(--ui-surface-2)",
        ink: "var(--ui-ink)",
        muted: "var(--ui-muted)",
        line: "var(--ui-line)",
        accent: {
          DEFAULT: "var(--ui-accent)",
          ink: "var(--ui-accent-ink)",
          soft: "var(--ui-accent-soft)"
        },
        success: {
          DEFAULT: "var(--ui-success)",
          soft: "var(--ui-success-soft)"
        },
        warning: {
          DEFAULT: "var(--ui-warning)",
          soft: "var(--ui-warning-soft)"
        },
        danger: { DEFAULT: "var(--ui-danger)", soft: "var(--ui-danger-soft)" }
      },
      boxShadow: { card: "var(--ui-shadow)" },
      fontFamily: {
        display: [
          '"Bricolage Grotesque"',
          '"Segoe UI"',
          "system-ui",
          "sans-serif"
        ],
        body: ["Manrope", '"Segoe UI"', "system-ui", "sans-serif"]
      },
      keyframes: {
        pop: {
          from: { opacity: "0", transform: "translateY(-4px) scale(0.97)" },
          to: { opacity: "1", transform: "none" }
        },
        fade: { from: { opacity: "0" }, to: { opacity: "1" } },
        rise: {
          from: { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          to: { opacity: "1", transform: "none" }
        }
      },
      animation: {
        pop: "pop 0.16s cubic-bezier(0.2,0.8,0.2,1)",
        fade: "fade 0.2s ease",
        rise: "rise 0.28s cubic-bezier(0.2,0.8,0.2,1)"
      }
    }
  },
  plugins: []
};
