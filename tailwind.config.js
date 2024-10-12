import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      pretendard: ['var(--font-pretendard)', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.875rem', '1.125rem'],
      sm: ['1rem', '1.125rem'],
      base: ['1.125rem', '1.5rem'],
      lg: ['1.25rem', '1.5rem'],
      xl: ['1.5rem', '1.75rem'],
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
          yellow: 'var(--primary-yellow)',
        },
      },
      boxShadow: {
        base: '1px 4px 10px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        'bottom-sheet-up': {
          '0%': { transform: 'translateY(100dvh)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bottom-sheet-down': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100dvh)', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) =>
      addUtilities({
        '.layout': {
          '@apply mx-auto max-w-lg lg:max-w-5xl lg:flex lg:gap-x-10': '',
        },
        '.container': {
          '@apply max-w-lg mx-auto h-dvh overflow-hidden bg-neutral-50': '',
        },
        '.animate-bottom-sheet-up': {
          animation: 'bottom-sheet-up 0.2s ease-in-out',
        },
        '.animate-bottom-sheet-down': {
          animation: 'bottom-sheet-down 0.2s ease-in-out',
        },
      })
    ),
  ],
}
