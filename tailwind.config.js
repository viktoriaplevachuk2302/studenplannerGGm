/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#956D54',
          light: '#b38e75',
          dark: '#7a5443',
        },
        secondary: {
          DEFAULT: '#F3EBE4',
          dark: '#E6D8CB',
        },
        text: {
          DEFAULT: '#333333',
          light: '#666666',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}