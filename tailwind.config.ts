import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(40 50% 95%)',
        foreground: 'hsl(25 35% 25%)',
        card: {
          DEFAULT: 'hsl(40 50% 100%)',
          foreground: 'hsl(25 35% 25%)',
        },
        popover: {
          DEFAULT: 'hsl(40 50% 100%)',
          foreground: 'hsl(25 35% 25%)',
        },
        primary: {
          DEFAULT: 'hsl(30 45% 40%)',
          foreground: 'hsl(40 50% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(35 40% 90%)',
          foreground: 'hsl(25 35% 25%)',
        },
        muted: {
          DEFAULT: 'hsl(35 40% 90%)',
          foreground: 'hsl(30 25% 50%)',
        },
        accent: {
          DEFAULT: 'hsl(30 65% 60%)',
          foreground: 'hsl(25 35% 15%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(210 40% 98%)',
        },
        border: 'hsl(35 30% 85%)',
        input: 'hsl(35 30% 85%)',
        ring: 'hsl(30 45% 40%)',
        chart: {
          '1': 'hsl(12 76% 61%)',
          '2': 'hsl(173 58% 39%)',
          '3': 'hsl(197 37% 24%)',
          '4': 'hsl(43 74% 66%)',
          '5': 'hsl(27 87% 67%)',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'shake': {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        'float-subtle': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) rotate(10deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
        'running-cart': {
          '0%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-5px) rotate(2deg)' },
          '100%': { transform: 'translateY(0px) rotate(-2deg)' },
        },
        'grow-from-top-right': {
          from: { transform: 'scale(0)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'shrink-to-top-right': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'float-subtle': 'float-subtle 6s ease-in-out infinite',
        'running-cart': 'running-cart 0.3s ease-in-out infinite',
        'grow-from-top-right': 'grow-from-top-right 0.3s ease-out',
        'shrink-to-top-right': 'shrink-to-top-right 0.2s ease-in',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
