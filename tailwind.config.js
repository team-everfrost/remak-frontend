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
        shake: 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
      },
      keyframes: {
        'infinite-flow': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
