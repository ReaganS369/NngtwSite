import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F58A1F',
          white: '#F2EFE7',
          black: '#0C0C0C',
          charcoal: '#141211',
          ember: '#3A1C0A'
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Black', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        orange: '0 0 80px rgba(245, 138, 31, 0.28)'
      },
      backgroundImage: {
        'studio-grid': 'linear-gradient(rgba(242,239,231,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(242,239,231,.06) 1px, transparent 1px)',
        'ember-radial': 'radial-gradient(circle at 50% 0%, rgba(245,138,31,.32), transparent 40%)'
      }
    }
  },
  plugins: []
};

export default config;
