// client/tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand-orange': '#F49700',
        'brand-orange-light': '#ffe3ab',
        'brand-orange-hover': '#F4A22C',

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ]
}