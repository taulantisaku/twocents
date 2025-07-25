/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./twocents-web/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bronze: {
          DEFAULT: '#CD7F32',
          dark: '#B8860B'
        },
        silver: {
          DEFAULT: '#C0C0C0',
          dark: '#A9A9A9'
        },
        gold: {
          DEFAULT: '#FFD700',
          dark: '#FFA500'
        },
        platinum: {
          DEFAULT: '#E5E4E2',
          dark: '#D3D3D3'
        }
      }
    },
  },
  plugins: [],
}
