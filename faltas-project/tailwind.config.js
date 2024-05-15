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
      'grayblack': '#b9b9b9',
      'black': '#000',
      'blacklight':'#404040',
      'red': '#ff9c9c',
      'orange': '#ffdb9c',
      'blue': '#9cd6ff',
      'blueblack': '#3a8abf'
    },
    extend: {},
  },
  plugins: [],
}