/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bauhaus: "Bauhaus",
      },
      colors: {
        tokopedia: "hsl(120,100%,37.5%)",
      },
    },
  },
  plugins: [require("daisyui")],
};
