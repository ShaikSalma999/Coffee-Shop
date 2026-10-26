/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Every Tailwind class is prefixed (tw-flex, tw-bg-coffee, ...) and preflight is
  // disabled, so Tailwind can never clash with the existing hand-written CSS
  // (.grid, .btn, .sheet, .row, hr, button resets, ...).
  prefix: 'tw-',
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        button: ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        coffee: {
          DEFAULT: '#C67C4E',
          light: '#EDD6C8',
          dark: '#313131',
          muted: '#E3E3E3',
          cream: '#F9F2ED',
        },
        surface: '#F9F9F9',
        danger: '#ED5151',
        success: '#36C07E',
        gold: '#FBBE21',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(6px)' },
          to: { opacity: 1, transform: 'none' },
        },
      },
      animation: { 'fade-in': 'fadeIn .25s ease-out' },
    },
  },
  plugins: [],
}
