export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // Design Tokens — خلي الـ colors ليها معنى
                brand: {
                    DEFAULT: '#f8d9c5',
                    dark: '#f1a75f',
                    light: '#c18447',
                },
                neutral: {
                    50: '#82aaea',
                    900: '#bfd0f3',
                }
            },
            fontFamily: {
                sans: ['Cairo', 'sans-serif'],
                mono: ['IBM Plex Mono', 'monospace'],
            },
            // 🎯 هنا كل الـ animations + keyframes منظمة صح
            animation: {
                'slide-up': 'slideUp 0.3s ease-out',
                'fade-in': 'fadeIn 0.2s ease-out',
                'pop-bounce': 'popBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                'blur-slide': 'blurSlide 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                'hover-lift': 'hoverLift 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                'heart-pop': 'heartPop 0.4s ease-out',
                'shimmer': 'shimmer 1.5s linear infinite',
                'toast-slide': 'toastSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
            keyframes: {
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                popBounce: {
                    '0%': { opacity: '0', transform: 'scale(0.6) translateY(40px)' },
                    '50%': { transform: 'scale(1.08) translateY(-12px)' },
                    '70%': { transform: 'scale(0.95) translateY(6px)' },
                    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                blurSlide: {
                    '0%': { opacity: '0', transform: 'translateY(30px)', filter: 'blur(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
                },
                hoverLift: {
                    '0%': { transform: 'translateY(0) scale(1)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' },
                    '100%': { transform: 'translateY(-14px) scale(1.03)', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.4)' },
                },
                heartPop: {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.4) rotate(15deg)' },
                    '100%': { transform: 'scale(1) rotate(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                toastSlide: {
                    '0%': { opacity: '0', transform: 'translateX(120%)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
};
