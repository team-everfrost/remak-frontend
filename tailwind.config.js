/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      borderColor: ['responsive', 'hover', 'focus', 'active'],
      colors: {
        'remak-blue': '#1F8CE6',
        'remak-background-gray': '#F4F6F8',
        'topbar-background': '#FEFEFE'
      }
    },
  },

  plugins: [],
};
