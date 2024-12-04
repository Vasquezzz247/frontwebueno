/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'D9D9D9': '#D9D9D9',
        '006de2': '#006de2',
        '84AFF5': '#84AFF5', 
        'B5D4E9': '#B5D4E9',
        'EFF0F3': '#EFF0F3',
        'DB2955': '#DB2955',
        'CAF0F8': '#CAF0F8', // Nuevo color superior
      },
      textColor: {
        'B5D4E9': '#B5D4E9',
      },
      boxShadow: {
        custom: "4px 4px 10px rgba(3,4,94,0.6)",
      },
    },
  },
  plugins: [],
}
