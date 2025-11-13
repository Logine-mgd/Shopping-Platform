/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'main': '#0aad0a',
        'light': '#f0f3f2',
        'rating': '#ffc908',
      },
      
      fontFamily: {
        'encode': ['"Encode Sans Expanded"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

