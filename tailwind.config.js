/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      lily: [
        "Lily Script One",
        "Poppins",
        "Segoe UI",
        "San Francisco",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};
