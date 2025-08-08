/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
   theme: {
    extend: {
      keyframes: {
        slideBounceFade: {
          '0%': { transform: 'translateY(-100%)', opacity: '1' },
          '50%': { transform: 'translateY(10%)', opacity: '1' },
          '70%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        slideBounceFade: 'slideBounceFade 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
