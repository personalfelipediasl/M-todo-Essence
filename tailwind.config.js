/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#ff7b45',
          500: '#ff5107',
          600: '#e64906',
          700: '#cc4105',
        },
        surface: '#1a1a1a',
        background: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
