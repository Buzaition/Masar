/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        paper: 'var(--paper)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        border: 'var(--border)',
        muted: {
          DEFAULT: 'var(--muted)',
        },
        status: {
          critical: 'var(--status-critical)',
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          info: 'var(--status-info)'
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'Noto Sans Arabic', 'sans-serif'],
        display: ['Noto Kufi Arabic', 'sans-serif'],
        mono: ['Inter', 'monospace'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      fontSize: {
        'xs': ['0.8125rem', { lineHeight: '1.5' }], // 13px
        'sm': ['0.9375rem', { lineHeight: '1.6' }], // 15px
        'base': ['1.0625rem', { lineHeight: '1.65' }], // 17px
        'lg': ['1.1875rem', { lineHeight: '1.7' }], // 19px
        'xl': ['1.375rem', { lineHeight: '1.75' }], // 22px
        '2xl': ['1.625rem', { lineHeight: '2' }], // 26px
        '3xl': ['2rem', { lineHeight: '2.25' }], // 32px
      }
    },
  },
  plugins: [],
}
