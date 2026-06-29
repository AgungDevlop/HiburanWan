/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Sora"', '"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        // Brand accent (violet → fuchsia spectrum)
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        // Dark surface palette
        ink: {
          950: "#07070d",
          900: "#0b0b14",
          850: "#111120",
          800: "#16162a",
          700: "#1f1f38",
          600: "#2a2a48",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #f43f5e 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(217,70,239,0.12) 50%, rgba(244,63,94,0.10) 100%)",
        "grid-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.20) 0%, rgba(139,92,246,0) 70%), radial-gradient(50% 50% at 100% 20%, rgba(217,70,239,0.14) 0%, rgba(217,70,239,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(139,92,246,0.25), 0 8px 40px -8px rgba(139,92,246,0.45)",
        "glow-soft": "0 10px 50px -12px rgba(139,92,246,0.35)",
        card: "0 4px 24px -8px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-468px 0" },
          "100%": { backgroundPosition: "468px 0" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in": "scale-in 0.4s ease-out both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.4s linear infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "spin-slow": "spin-slow 1.1s linear infinite",
      },
    },
  },
  plugins: [],
};
