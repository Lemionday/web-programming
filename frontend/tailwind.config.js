/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require('tailwindcss/plugin')

module.exports = withMT({
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    darkMode: 'class',
    theme: {
        fontFamily: {
            'sans': ["Roboto", "Arial", "Helvetica", "sans-serif"],
            'brand': ['"Great Vibes"', 'cursive'],
        },
        extend: {
            backgroundImage: {
                'hero': "url('./src/assets/images/aston_martin_dbs_gt_zagato_2019_4k_4-HD.jpg')",
            }
        },
    },
    plugins: [],
});