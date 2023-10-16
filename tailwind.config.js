/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      borderColor: ['responsive', 'hover', 'focus', 'active'],
      colors: {
        'remak-blue': '#1F8CE6',
        'remak-background-gray': '#F4F6F8',
        'topbar-background': '#FEFEFE',
      },
      animation: {
        'infinite-flow': 'infinite-flow 40s linear infinite',
      },
      keyframes: {
        'infinite-flow': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
