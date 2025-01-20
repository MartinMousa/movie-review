/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#EEEEEE',
          dark: '#222831'
        },
        secondary: {
          light: '#00ADB5',
          dark: '#393E46'
        },
        accent: '#00ADB5',
        text: {
          light: '#222831',
          dark: '#EEEEEE'
        }
      }
    },
  },
  plugins: [],
}
