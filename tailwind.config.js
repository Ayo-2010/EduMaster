module.exports = {
  content: ['./components', './layouts', './pages', './app.vue'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#0c241a'
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03'
        }
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif']
      }
    }
  },
  plugins: []
}