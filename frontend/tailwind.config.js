/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
        fontFamily: {
            'sans': ["Roboto", "Arial", "Helvetica", "sans-serif"],
            'brand': ['"Great Vibes"', 'cursive'],
        },
        extend: {},
    },
    plugins: [],
});