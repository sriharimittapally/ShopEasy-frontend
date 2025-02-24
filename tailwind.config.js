// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './index.html', // Include your HTML files
      './src/**/*.{js,jsx,ts,tsx}', // Include your React or other framework files
    ],
    theme: {
      extend: {
        colors: {
          "primary-color": "#2b82e6", // Custom primary color
          "secondary-color": "#f9a8d4", // Custom secondary color
        },
      },
    },
    plugins: [],
  };
  