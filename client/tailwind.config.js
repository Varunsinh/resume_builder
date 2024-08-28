/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        light: '1px 1px 4px rgba(0, 0, 0, 0.2)',
      },
      colors:{
        'dynamic-color': "var(--color)",
      },
    },
  },
  plugins: [],
}

