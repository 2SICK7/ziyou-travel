/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink': '#1A1510',
        'cream': '#F5F0E8',
        'gold': '#C9A961',
        'sand': '#D4764E',
        'terracotta': '#8B4D3B',
        'dark': '#2C2416',
        'warm': '#E8DFD0',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['Inter', '"PingFang SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
