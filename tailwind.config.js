/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-light': '#FFFFFF',
        'primary-dark': '#222831',
        'secondary-light': '#F5F5F5',
        'secondary-dark': '#393E46',
        'accent': '#00ADB5',
        'text-light': '#222831',
        'text-dark': '#EEEEEE',
      },
    },
  },
  plugins: [],
}
