/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      keyframes: {
        'scroll-dot': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(12px)', opacity: '0.3' }
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'progress': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' }
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        'scroll-dot':  'scroll-dot 1.5s ease-in-out infinite',
        'fade-up':     'fade-up 0.7s ease-out forwards',
        'fade-in':     'fade-in 0.6s ease-out forwards',
        'slide-left':  'slide-left 0.7s ease-out forwards',
        'slide-right': 'slide-right 0.7s ease-out forwards',
        'scale-in':    'scale-in 0.5s ease-out forwards',
        'float':       'float 4s ease-in-out infinite',
        'shimmer':     'shimmer 3s linear infinite',
        'pop-in':      'pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'gradient-x':  'gradient-x 4s ease infinite',
      }
    }
  },
  plugins: []
}
