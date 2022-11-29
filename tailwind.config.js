/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    colors: {
      primary: '#071D3F',
      secondary: '#FFCC02',
      scarlet: '#FA5C32',
      violet: '#A477E8'
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
