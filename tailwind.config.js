/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mandro: {
          bg: "#FDFEFF",          
          primary: "#62A8FF",      
          accent: "#013A81",       
          gray: "#E1E1E1",         
        },
      },
      screens: {
        custom: '740px',
      },
      borderRadius: {
        lg: "1.25rem", 
      },
      fontWeight: {
        bold: "700",
      },
    },
  },
  plugins: [],
}
