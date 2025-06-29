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
      fontSize: {
        'xs': '0.8rem',
        'sm': '0.9rem',
        'base': '1.05rem',
        'lg': '1.2rem',
        'xl': '1.35rem',
        '2xl': '1.65rem',
        '3xl': '2.0rem',
        '4xl': '2.5rem',
        '5xl': '3.25rem',
        '6xl': '4.0rem',
        '7xl': '5.0rem',
        '8xl': '6.5rem',
        '9xl': '8.5rem',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['"Space Grotesk"', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
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
        'menu-open': {
          from: { opacity: '0', transform: 'translateX(1rem) translateY(-0.5rem) scale(0.95)' },
          to: { opacity: '1', transform: 'translateX(0) translateY(0) scale(1)' },
        },
        'menu-close': {
          from: { opacity: '1', transform: 'translateX(0) translateY(0) scale(1)' },
          to: { opacity: '0', transform: 'translateX(1rem) translateY(-0.5rem) scale(0.95)' },
        },
        'spin-slow': {
          'to': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'shake': 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        'float-subtle': 'float-subtle 6s ease-in-out infinite',
        'running-cart': 'running-cart 0.3s ease-in-out infinite',
<<<<<<< HEAD
        'menu-open': 'menu-open 0.2s ease-out',
        'menu-close': 'menu-close 0.2s ease-in',
=======
        'grow-from-top-right': 'grow-from-top-right 0.3s ease-out',
        'shrink-to-top-right': 'shrink-to-top-right 0.2s ease-in',
        'spin-slow': 'spin-slow 20s linear infinite',
>>>>>>> refs/remotes/origin/main
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
