/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
      },
      colors: {
        customBg: '#E5E7EB',
        customGray: '#C9C9C9',
      },
    },
  },
  plugins: [],
}
