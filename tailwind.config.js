import clsx from 'clsx';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandPurple: '#6D00FF',
        brandOrange: '#FF6C00',
      },
    },
  },
  plugins: [],
};