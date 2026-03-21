/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandPurple: '#6D00FF',
        brandOrange: '#FF6C00',
        surface: '#FAFAFA',
      },
      fontFamily: {
        sans: [
          'Inter', 'ui-sans-serif', '-apple-system', 'BlinkMacSystemFont',
          'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif',
        ],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        'title': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
};
