/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This line enables the manual toggle
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', // Main indigo
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Main amber
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        }
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.06)',
        'lifted': '0 2px 8px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.10)',
        'elevated': '0 4px 12px rgba(0,0,0,0.10), 0 20px 40px rgba(0,0,0,0.14)',
        'glow-indigo': '0 2px 8px rgba(79,70,229,0.25), 0 8px 20px rgba(79,70,229,0.15)',
        'glow-amber': '0 2px 8px rgba(245,158,11,0.25), 0 8px 20px rgba(245,158,11,0.15)',
        'glow-indigo-lg': '0 4px 14px rgba(79,70,229,0.35), 0 12px 28px rgba(79,70,229,0.20)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
        'slide-down': 'slide-down 0.3s ease-out both',
      },
      backgroundImage: {
        'gradient-indigo': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        'gradient-amber': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        'gradient-surface-light': 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        'gradient-surface-dark': 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      },
    },
  },
  plugins: [],
}