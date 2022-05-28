module.exports = {
  daisyui: {
    themes: false,
  },
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      colors: {
        twilight: '#E0C6DF',
        haiti: '#0E0D37',
        spindle: '#B4D2EC',
        minsk: '#55337F',
        'picton-blue': '#45B7F6',
        'blue-ribbon': '#106CF5',
        heliotrope: '#EE72FE',
        mauve: '#F5A3FA',
        givry: '#F7D5BA',
        'saffron-mango': '#FCC257',
        alto: '#DADADA',
        gallery: '#EFEFEF',
        'maroon-flush': '#CB2452',
        valhalla: '#1F1649',
        mandy: '#E85C5B',
        'vivid-violet': '#743B91',
        celestial: '#00AEEF',
        'celestial-dark': '#40B3E0',
        pink: '#CC4A95',
        gold: '#EDC56C',
        red: '#FF0017',
        aztec: '#FFB548',
        magenta: '#EE72FE',
        byzantium: '#6C388B',
        purple: '#9C49CD',
        'chetwode-blue': '#8A92DF',
      },
      fontFamily: {
        sans: 'Montserrat, sans-serif',
      },
      backgroundImage: {},
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
};
