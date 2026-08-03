/**
 * MERGE THIS into your existing tailwind.config.js theme.extend.
 * Don't replace your whole config — just spread/merge these keys in,
 * since your real config likely has content globs, plugins, etc.
 * that aren't shown here.
 *
 * Because your components already reference semantic classes like
 * bg-surface-0, text-ink-950, border-surface-200, bg-brand-600 —
 * updating just these token values re-themes the entire app without
 * touching a single component file.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488", // primary actions, active nav state
          700: "#0F766E", // primary hover / emphasis
          800: "#115E59",
          900: "#134E4A",
        },
        accent: {
          500: "#10B981",
        },
        success: {
          50: "#F0FDF4",
          500: "#22C55E",
          700: "#15803D",
        },
        danger: {
          50: "#FEF2F2",
          500: "#EF4444",
          700: "#B91C1C",
        },
        warning: {
          50: "#FFFBEB",
          500: "#F59E0B",
          700: "#B45309",
        },
        // Neutrals — backgrounds, cards, borders
        surface: {
          0: "#FFFFFF", // cards
          50: "#F8FAFC", // page background
          100: "#F1F5F9", // hover surfaces, subtle fills
          200: "#E5E7EB", // borders
          300: "#E2E8F0",
        },
        // Text
        ink: {
          950: "#111827", // primary text
          600: "#6B7280", // secondary text
          400: "#9CA3AF", // placeholders, tertiary
        },
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        // Soft, low-contrast elevation — no hard drop shadows
        soft: "0 1px 2px 0 rgba(17, 24, 39, 0.04), 0 6px 16px -4px rgba(17, 24, 39, 0.06)",
        "soft-md": "0 2px 4px 0 rgba(17, 24, 39, 0.05), 0 12px 24px -6px rgba(17, 24, 39, 0.10)",
        "soft-lg": "0 4px 8px 0 rgba(17, 24, 39, 0.06), 0 20px 36px -8px rgba(17, 24, 39, 0.14)",
      },
      fontFamily: {
        // Keep your existing sans stack; just make sure Inter (or your
        // current font) is loaded with the weight range below.
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
      },
      transitionDuration: {
        150: "150ms",
      },
    },
  },
};
