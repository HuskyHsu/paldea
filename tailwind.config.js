/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      primary: '#071D3F',
      secondary: '#FFCC02',
      scarlet: '#FA5C32',
      violet: '#A477E8',
      custom: {
        red: '#DB2E2C',
        green: '#4DB040',
        blue: '#0E90D3',
        orange: '#FC8002',
        gold: '#A29834',
        lightgrey: '#FCFAF7',
      },
      type: {
        bug: '#A2A329',
        dark: '#4E4646',
        dragon: '#5871BD',
        electric: '#E2BE2A',
        fairy: '#E28EE3',
        fighting: '#E39423',
        fire: '#E5633F',
        flying: '#77AFD4',
        ghost: '#6C456E',
        grass: '#49983A',
        ground: '#A6753B',
        ice: '#4CCBC8',
        normal: '#848383',
        poison: '#9556CB',
        psychic: '#EA708A',
        rock: '#AFA781',
        steel: '#6EB0C7',
        water: '#339DDF',
      },
    },
    extend: {
      gridTemplateColumns: {
        18: 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
