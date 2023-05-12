/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      gaegu: ["Gaegu", "sans-serif"],
      lato: ["Lato", "sans-serif"],
      mont: ["Mont", "sans-serif"],
      "mont-b": ["Mont-b", "sans-serif"],
    },
    backgroundImage: {
      backgroundImage: "url('./src/assets/Banner.png')",
    },
  },
  plugins: [],
};
