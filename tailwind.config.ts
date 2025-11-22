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
        sans: ['Manrope', 'sans-serif'],
        headline: ['Manrope', 'sans-serif'],
      },
      colors: {
        'brand-blue': 'var(--brand-blue)',
        'brand-dark': 'var(--brand-dark)',
        'brand-bg': 'var(--brand-bg)',
        'text-main': 'var(--text-main)',
        'text-muted': 'var(--text-muted)',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 8px)",
        sm: "calc(var(--radius) - 16px)",
        'full-btn': 'var(--btn-radius)',
        '3xl': 'var(--card-radius)',
        '2xl': 'calc(var(--card-radius) - 8px)',
        xl: 'calc(var(--card-radius) - 16px)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'hover': 'var(--shadow-hover)',
        'search': '0 15px 30px rgba(0,0,0,0.15)',
        'wa-card': '0 20px 40px -10px rgba(30, 41, 59, 0.3)',
      },
      backgroundImage: {
        'hero-gradient': 'var(--hero-gradient)',
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
        'community-graph': {
            '0%, 100%': { height: '20%' },
            '50%': { height: '100%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'community-graph': 'community-graph 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
} satisfies Config;
