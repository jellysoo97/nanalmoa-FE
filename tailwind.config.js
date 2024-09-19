/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['var(--font-pretendard)', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.875rem', '1.25rem'],
      sm: ['1rem', '1.5rem'],
      base: ['1.125rem', '1.75rem'],
      lg: ['1.25rem', '1.75rem'],
      xl: ['1.5rem', '2rem'],
      '2xl': ['2.25rem', '2.5rem'],
    },
    extend: {
      colors: {
        primary: {
          50: 'var(--green-50)',
          100: 'var(--green-100)',
          200: 'var(--green-200)',
          300: 'var(--green-300)',
          400: 'var(--green-400)',
          500: 'var(--green-500)',
          base: 'var(--green-600)',
          700: 'var(--green-700)',
          800: 'var(--green-800)',
          900: 'var(--green-900)',
          blue: 'var(--primary-blue)',
          pink: 'var(--primary-pink)',
          gray: 'var(--primary-gray)',
          coral: 'var(--primary-coral)',
          beige: 'var(--primary-beige)',
        },
      },
    },
  },
  plugins: [],
}