import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand — Phosphate Blue
        brand: {
          50: "#e6f4fb",
          100: "#cce9f7",
          200: "#99d3ef",
          300: "#66bde7",
          400: "#33a7df",
          500: "#0975B3", // Primary
          600: "#075e8f",
          700: "#05476b",
          800: "#032f47",
          900: "#021823",
          950: "#010c12",
        },
        // Secondary accent
        azure: {
          400: "#5ab0e3",
          500: "#2191D0", // Secondary
          600: "#1a74a6",
          700: "#14587d",
        },
        // Neutral — warm grey
        neutral: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
          950: "#101214",
        },
        // Semantic colours
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f8f9fa",
          muted: "#f1f3f5",
          inverse: "#021823",
        },
        // Status
        success: { 500: "#2f9e44", 100: "#d3f9d8" },
        warning: { 500: "#e67700", 100: "#fff3bf" },
        error: { 500: "#c92a2a", 100: "#ffc9c9" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        // 1.25 modular scale
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.625rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl": ["3rem", { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem", { lineHeight: "4.25rem" }],
        "7xl": ["4.5rem", { lineHeight: "5rem" }],
      },
      spacing: {
        // Extra spacing tokens
        18: "4.5rem",
        22: "5.5rem",
        88: "22rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgba(9, 117, 179, 0.08)",
        card: "0 4px 24px 0 rgba(9, 117, 179, 0.10)",
        glow: "0 0 32px 0 rgba(9, 117, 179, 0.25)",
        "brand-sm": "0 2px 8px 0 rgba(9, 117, 179, 0.20)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #021823 0%, #032f47 40%, #0975B3 100%)",
        "brand-gradient":
          "linear-gradient(90deg, #0975B3 0%, #2191D0 100%)",
        "section-gradient":
          "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      transitionDuration: {
        250: "250ms",
        350: "350ms",
      },
    },
  },
  plugins: [],
};

export default config;
