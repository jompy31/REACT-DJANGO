/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "orange-button":'#ff561e',
        "blue-button":"#0000FF",
        "white-button":"#FFF",
        "gold-button":"#efb810"
      }
    },
    boxShadow: {
      navbar: "0px 10px 8px 0px rgba(3, 3, 4, 0.03), 0 1px 2px -1px rgba(3, 3, 4, 0.03)",
    }
  },
  plugins: [
    function ({addUtilities}) {
      const extendUnderline = {
        'underline': {
          'textDecoration': 'underline',
          'text-decoration-color': '#ff561e'
        },
      }
      addUtilities(extendUnderline)
    }
  ],
}

