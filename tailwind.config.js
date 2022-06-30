/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        root:"#8a2be2",
        saaral:"#F0F2F5",
        baraan:"#6C6569",
        harBaraan:"#050505"
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
