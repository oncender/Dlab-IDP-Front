const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '128': '32rem',
        '192' : '48rem',
        '256': '64rem',
      }
    },
    fontFamily: {
      'sans' : ['Spoqa Han Sans Neo', 'Roboto', 'system-ui',],
      'blinker' : [ 'Blinker', 'sans-serif'],
    },
    colors: {
      // 'big-btn-green-bf': '#67FFBF',
      // 'big-btn-green-af': '#D0FFEB',
    },
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