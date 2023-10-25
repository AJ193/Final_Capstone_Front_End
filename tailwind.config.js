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
    extend: {
      colors: {
        newGreen: '#97BF0F',
      },
      maxWidth: {
        'custom': '1100px',
        'sidewidth': '10%',
      },
    },
  },
  plugins: [
    daisyUI,
  ],
}

