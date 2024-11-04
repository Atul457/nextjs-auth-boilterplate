/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      colors: {
        'custom-blue-1': '#00214A',
        'custom-blue-2': '#00142C'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #00214A, #00142C)'
      }
    }
  }
}
