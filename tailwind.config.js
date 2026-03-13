/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af",
        secondary: "#9333ea",
        accent: "#22c55e",
        "bg-green": "#36A16B",
        "bg-breakline": "#151717",
        "green-highlight": "#169C64",
        "bg-dark": "#0A0B0B",
        "green-text-bg": "#0a1a13",
      },
    },
  },
  plugins: [],
};
