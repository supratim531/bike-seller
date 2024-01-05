/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.{js,jsx}",
    './node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1760px',
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin.cjs"),
  ],
};
