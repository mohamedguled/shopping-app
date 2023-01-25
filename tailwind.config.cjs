/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "card-bg": "#002b3d",
        "error-color": "#fb6f84",
        "success-color": "#2bd4bd",
        "bg-color": "#0f1729",
        "text-color": "#b3c5ef"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['night']
  }
}