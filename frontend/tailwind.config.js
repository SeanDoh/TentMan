module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      inner: 'inset 0 0px 4px 0 rgba(0, 0, 0, .5)',
    },
    width: {
      '221px': '221px',
    },
    minHeight: {
      '407px': '407px'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
