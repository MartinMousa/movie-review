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
          light: '#ffffff',
          dark: '#1F2937',
        },
        secondary: {
          light: '#f3f4f6',
          dark: '#374151',
        },
        accent: {
          light: '#3B82F6',
          dark: '#60A5FA',
        },
        text: {
          light: '#1F2937',
          dark: '#F9FAFB',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
