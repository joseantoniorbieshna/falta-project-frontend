/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'green': '#dff2cd',
      'gray': '#f0f0f0',
      'black': '#000',
      'blacklight':'#404040'
    },
    extend: {},
  },
  plugins: [],
}