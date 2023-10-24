/** @type {import('tailwindcss').Config} */
const daisyUI = require("daisyui");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  daisyui: {
    themes: [
      "light",
      "dark",
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [
    daisyUI,
  ],
}

