import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'serif'],
        sans: ['var(--font-instrument-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        satoshi: 'var(--color-satoshi)',
        '0': 'var(--color-0)',
        '0-80': 'var(--color-0-80)',
        '8': 'var(--color-8)',
        '8-64': 'var(--color-8-64)',
        '16': 'var(--color-16)',
        '32': 'var(--color-32)',
        '44': 'var(--color-44)',
        '56': 'var(--color-56)',
        '56-04': 'var(--color-56-04)',
        '64': 'var(--color-64)',
        '80': 'var(--color-80)',
        '92': 'var(--color-92)',
        '94': 'var(--color-94)',
        '94-50': 'var(--color-94-50)',
        '96': 'var(--color-96)',
        '96-50': 'var(--color-96-50)',
        '98': 'var(--color-98)',
        '100': 'var(--color-100)',
        '100-80': 'var(--color-100-80)',
      },
      fontSize: {
        // Instrument Serif
        'serif-72': ['72px', { lineHeight: '88px' }],
        'serif-72-italic': ['72px', { lineHeight: '88px' }],
        'serif-48': ['48px', { lineHeight: '60px' }],
        'serif-40': ['40px', { lineHeight: '50px' }],
        'serif-32': ['32px', { lineHeight: '40px' }],

        // Instrument Sans
        'sans-22': ['22px', { lineHeight: '36px' }],
        'sans-18': ['18px', { lineHeight: '30px' }],
        'sans-16-semibold': [
          '16px',
          {
            lineHeight: '28px',
            fontWeight: '600',
          },
        ],
        'sans-16-medium': [
          '16px',
          {
            lineHeight: '26px',
            fontWeight: '500',
          },
        ],
        'sans-16-regular': [
          '16px',
          {
            lineHeight: '25px',
            fontWeight: '400',
          },
        ],
        'sans-14': ['14px', { lineHeight: '22px' }],
        'sans-12': ['12px', { lineHeight: '20px' }],
        'sans-12-medium': [
          '12px',
          {
            lineHeight: '20px',
            fontWeight: '500',
          },
        ],
      },
    },
  },
  plugins: [],
};

export default config;

