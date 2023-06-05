/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    screens: {
      xxs: '390px',
      xs: '450px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
