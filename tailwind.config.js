/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfd',
          100: '#ccfbf9',
          200: '#99f6f3',
          300: '#5eede9',
          400: '#2dd4ce',
          500: '#14b8b1',
          600: '#0d9490',
          700: '#0f7774',
          800: '#115e5d',
          900: '#134e4d',
        },
        navy: {
          50: '#f4f6f9',
          100: '#e9ecf2',
          200: '#ced7e3',
          300: '#a6b7cb',
          400: '#7791ae',
          500: '#577394',
          600: '#455b7b',
          700: '#384a64',
          800: '#2f3e54',
          900: '#1a2332',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-10px)' },
          '75%': { transform: 'translateY(-15px) translateX(5px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
