import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        concrete: '#F5F4F0',
        'concrete-2': '#ECEAE4',
        line: '#D8D6D0',
        graphite: '#1A1A1A',
        slate: '#6B6862',
        copper: '#B87333',
        'copper-deep': '#8E5826',
      },
      fontFamily: {

        grotesk: ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {

        'display-xl': ['clamp(2.75rem, 13vw, 16rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-l': ['clamp(2rem, 8vw, 9rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
        'display-m': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.15rem, 1.6vw, 1.5rem)', { lineHeight: '1.5' }],
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.22em' }],
        mono: ['0.8rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      letterSpacing: {
        label: '0.22em',
      },
      spacing: {
        section: 'clamp(6rem, 12vh, 11rem)',
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
      },
      maxWidth: {
        prose: '62ch',
      },
      borderRadius: {

        none: '0',
      },
      zIndex: {
        base: '10',
        raised: '20',
        overlay: '30',
        case: '40',
        header: '50',
        nav: '60',
        crosshair: '70',
      },
      transitionTimingFunction: {
        forma: 'cubic-bezier(0.16, 1, 0.3, 1)',
        draft: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        slow: '600ms',
        slower: '900ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};

export default config;
