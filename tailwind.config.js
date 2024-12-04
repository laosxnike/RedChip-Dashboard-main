// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode via class strategy
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add any other directories that contain Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors
        'custom-bg': '#111518',
        'custom-border': '#283139',
        'custom-text': '#9cacba',
        'custom-gray': '#3b4954', // Retaining your existing custom-gray color
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Include the forms plugin
    require('@tailwindcss/container-queries'), // Include the container-queries plugin
    // Add other Tailwind plugins here
  ],
};
