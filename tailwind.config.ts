import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        authority: { 50: "#EFF6FF", 100: "#DBEAFE", 600: "#2563EB", 700: "#1D4ED8" }
      },
      boxShadow: { panel: "0 6px 20px rgba(15, 23, 42, 0.06)" }
    }
  },
  plugins: []
};
export default config;
