import type { Config } from 'tailwindcss';

/* Site theme: brand colours, fonts, shadows and animations */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50: '#E6F7F5', 500: '#0B7A6F', 600: '#09685F', 700: '#07564F' },
        strip: '#1E2A2E',
        navy: { 700: '#1A2B6D', 800: '#132057', 900: '#0C1640' },
        gold: { 300: '#FFE27A', 400: '#FFC933', 500: '#FFB800', 600: '#F59E0B' },
        live: '#E53935',
        page: '#EEF2F5'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['var(--font-rajdhani)', 'Rajdhani', 'sans-serif']
      },
      boxShadow: {
        card: '0 2px 10px rgba(15,23,42,0.08)',
        lift: '0 10px 25px rgba(11,122,111,0.18)',
        glow: '0 0 20px rgba(255,184,0,0.45)'
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        shimmer: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(100%)' } },
        livepulse: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } }
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 2.5s ease-in-out infinite',
        livepulse: 'livepulse 1.2s ease-in-out infinite'
      }
    }
  }
};
export default config;
