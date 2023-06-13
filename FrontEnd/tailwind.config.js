/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gunmetal: "#292b37",
        arsenic: "#3b3d49",
      },
      fontFamily: {
        gaegu: ["Gaegu", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        mont: ["Mont", "sans-serif"],
        "mont-b": ["Mont-b", "sans-serif"],
      },
      backgroundImage: {
        backgroundImage: "url('./src/assets/Banner.png')",
      },
      maxWidth: {
        "50%": "50%",
      },
      height: {
        118: "28rem",
      },
      width: {
        84: "21rem",
      },
    },
  },
  plugins: [],
};
