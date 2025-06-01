import { fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Branding
        primary: '#7C3AED',
        'primary-foreground': '#FFFFFF',
        secondary: '#EDE9FE',
        accent: '#D8B4FE',

        // Neutral
        background: '#FFFFFF',
        foreground: '#111827',
        muted: '#F3F4F6',
        'muted-foreground': '#6B7280',

        // UI
        border: '#E5E7EB',
        input: '#F3F4F6',
        card: '#FFFFFF',

        // Feedback
        destructive: '#DC2626',
        'destructive-foreground': '#FFFFFF',
        success: '#10B981',
        warning: '#F59E0B',

        // Dark Mode
        'dark-background': '#0A0A0A',
        'dark-foreground': '#F9FAFB',
        'dark-card': '#1F2937',
        'dark-border': '#374151',
        'dark-input': '#1F2937',
      },

      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },

      fontWeight: {
        hairline: '100',
        thin: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },

      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },

      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        neon: '0 0 8px #00F2FE, 0 0 16px #00F2FE, 0 0 24px #4FACFE',
      },

      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        section: '8rem',
        'section-lg': '12rem',
      },

      zIndex: {
        '1': 1,
        '5': 5,
        '25': 25,
        '50': 50,
        '100': 100,
        auto: 'auto',
      },

      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),

    // Opsional tambahan animasi
    // require('tailwindcss-animate'),

    // Opsional untuk query berbasis ukuran kontainer
    // require('@tailwindcss/container-queries'),
  ],
} 