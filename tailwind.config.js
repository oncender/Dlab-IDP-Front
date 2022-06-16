const defaultTheme = require('tailwindcss/defaultTheme');

const fontFamily = defaultTheme.fontFamily;
fontFamily['sans'] = [
  'Spoqa Han Sans Neo',
  'Roboto',
  'system-ui',
];

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: fontFamily,
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}