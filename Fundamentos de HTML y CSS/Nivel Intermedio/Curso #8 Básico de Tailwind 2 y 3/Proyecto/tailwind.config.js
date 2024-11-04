/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './src/pages/**/*.{html,js,jsx,ts,tsx}',],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ['"Montserrat"', "sans-serif"],
      },
      colors: {
        primary: "#CC2D4A",
        secondary: "#8FA206",
        tertiary: "#61AEC9",
      },
      textColor: {
        primary: "#CC2D4A",
        secondary: "#8FA206",
        tertiary: "#61AEC9",
        light: "#F7F7F7",
        dark: "#333333",
      },
      backgroundImage: {
        sanFranciscoMobile: "url('../Proyecto/public/img/sanfrancisco-home-mobile.jpg')",
        sanFranciscoDesktop: "url('../Proyecto/public/img/sanfrancisco-home-desktop.jpg')",
        yosemite: "url('../Proyecto/public/img/yosemite.jpg')",
        LA: "url('../Proyecto/public/img/angeles.jpg')",
        seattle: "url('../Proyecto/public/img/seattle.jpg')",
        newYork: "url('../Proyecto/public/img/newYork.jpg')",
        norway: "url('../Proyecto/public/img/norway.jpg')",
        sydney: "url('../Proyecto/public/img/sydney.jpg')",
        miami: "url('../Proyecto/public/img/angeles.jpg')",
        switzerland: "url('../Proyecto/public/img/Switzerland.jpg')",
        bali: "url('../Proyecto/public/img/bali.jpg')",
        norway: "url('../Proyecto/public/img/norway.jpg')",
        chicago: "url('../Proyecto/public/img/chicago.jpg')",
        europe: "url('../Proyecto/public/img/europe.jpg')",
        iceland: "url('../Proyecto/public/img/iceland.jpg')",
      },
    },
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitionDuration: {
    '0': '0ms',
    '2000': '2000ms',
    '500': '600ms',
    '600': '600ms',
  },
  scale: {
    200: '2',
  },
  variants: {
    extend: {
      backgroundImage: ['responsive', 'hover', 'focus'],
    },
  },
  corePlugins: {
    forms: {
      // Personaliza la configuración de @tailwindcss/forms
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};