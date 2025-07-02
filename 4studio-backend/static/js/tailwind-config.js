/* =================================================================
   VoiceTel Admin Panel - Tailwind Configuration
   ================================================================= */

// Tailwind CSS Configuration for VoiceTel Admin Panel
const tailwindConfig = {
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                accent: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7c3aed',
                    800: '#6b21a8',
                    900: '#581c87',
                    950: '#3b0764',
                },
                dark: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'bounce-subtle': 'bounceSubtle 2s infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'spin-slow': 'spin 3s linear infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(168, 85, 247, 0.4)' },
                    '100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)' },
                },
                pulseGlow: {
                    '0%, 100%': { 
                        boxShadow: '0 0 5px rgba(168, 85, 247, 0.5)',
                        transform: 'scale(1)'
                    },
                    '50%': { 
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.6)',
                        transform: 'scale(1.05)'
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glow-sm': '0 0 10px rgba(168, 85, 247, 0.3)',
                'glow': '0 0 20px rgba(168, 85, 247, 0.4)',
                'glow-lg': '0 0 30px rgba(168, 85, 247, 0.5)',
                'glow-xl': '0 0 40px rgba(168, 85, 247, 0.6)',
                'inner-glow': 'inset 0 0 10px rgba(168, 85, 247, 0.3)',
            },
            backdropBlur: {
                xs: '2px',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            fontSize: {
                '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
            screens: {
                'xs': '475px',
                '3xl': '1600px',
                '4xl': '1920px',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            gridTemplateColumns: {
                '16': 'repeat(16, minmax(0, 1fr))',
                '20': 'repeat(20, minmax(0, 1fr))',
                '24': 'repeat(24, minmax(0, 1fr))',
            },
            aspectRatio: {
                '4/3': '4 / 3',
                '3/2': '3 / 2',
                '2/3': '2 / 3',
                '9/16': '9 / 16',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
                'border': 'border-color, border-width',
            },
            transitionDuration: {
                '400': '400ms',
                '600': '600ms',
                '800': '800ms',
                '900': '900ms',
                '1200': '1200ms',
                '1500': '1500ms',
                '2000': '2000ms',
            },
            scale: {
                '102': '1.02',
                '103': '1.03',
                '104': '1.04',
            },
            rotate: {
                '15': '15deg',
                '30': '30deg',
                '60': '60deg',
                '270': '270deg',
            },
            blur: {
                '4xl': '72px',
                '5xl': '96px',
            },
            brightness: {
                '25': '.25',
                '175': '1.75',
                '200': '2',
            },
            contrast: {
                '25': '.25',
                '175': '1.75',
                '200': '2',
            },
            grayscale: {
                '50': '.5',
            },
            hueRotate: {
                '15': '15deg',
                '30': '30deg',
                '60': '60deg',
                '270': '270deg',
            },
            invert: {
                '25': '.25',
                '50': '.5',
                '75': '.75',
            },
            saturate: {
                '25': '.25',
                '75': '.75',
                '175': '1.75',
                '200': '2',
            },
            sepia: {
                '25': '.25',
                '75': '.75',
            },
            backdropBrightness: {
                '25': '.25',
                '175': '1.75',
                '200': '2',
            },
            backdropContrast: {
                '25': '.25',
                '175': '1.75',
                '200': '2',
            },
            backdropGrayscale: {
                '50': '.5',
            },
            backdropHueRotate: {
                '15': '15deg',
                '30': '30deg',
                '60': '60deg',
                '270': '270deg',
            },
            backdropInvert: {
                '25': '.25',
                '50': '.5',
                '75': '.75',
            },
            backdropSaturate: {
                '25': '.25',
                '75': '.75',
                '175': '1.75',
                '200': '2',
            },
            backdropSepia: {
                '25': '.25',
                '75': '.75',
            },
        }
    },
    plugins: [
        // Custom plugin for component utilities
        function({ addUtilities, addComponents, theme }) {
            // Add component utilities
            addComponents({
                // Glass morphism utilities
                '.glass-light': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                },
                '.glass-dark': {
                    background: 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                '.glass-accent': {
                    background: 'rgba(168, 85, 247, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                },
                
                // Gradient utilities
                '.gradient-primary': {
                    background: 'linear-gradient(135deg, #9333ea 0%, #0ea5e9 100%)',
                },
                '.gradient-accent': {
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                },
                '.gradient-dark': {
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                },
                
                // Hover effects
                '.hover-lift': {
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    },
                },
                '.hover-glow': {
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                    },
                },
                
                // Loading states
                '.loading-skeleton': {
                    background: 'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'loading 1.5s ease-in-out infinite',
                },
                
                // Button variants
                '.btn-ghost': {
                    backgroundColor: 'transparent',
                    color: theme('colors.gray.300'),
                    border: `1px solid ${theme('colors.gray.600')}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: theme('colors.gray.800'),
                        color: theme('colors.white'),
                        borderColor: theme('colors.gray.500'),
                    },
                },
                
                // Form utilities
                '.form-floating': {
                    position: 'relative',
                    '& input': {
                        paddingTop: '1.625rem',
                        paddingBottom: '0.625rem',
                    },
                    '& label': {
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        height: '100%',
                        padding: '1rem 0.75rem',
                        pointerEvents: 'none',
                        borderColor: 'transparent',
                        transformOrigin: '0 0',
                        transition: 'opacity 0.1s ease-in-out, transform 0.1s ease-in-out',
                    },
                    '& input:focus ~ label, & input:not(:placeholder-shown) ~ label': {
                        opacity: '0.65',
                        transform: 'scale(0.85) translateY(-0.5rem) translateX(0.15rem)',
                    },
                },
            });
            
            // Add utility classes
            addUtilities({
                // Text selection
                '.select-none': {
                    userSelect: 'none',
                },
                '.select-text': {
                    userSelect: 'text',
                },
                '.select-all': {
                    userSelect: 'all',
                },
                
                // Scroll behavior
                '.scroll-smooth': {
                    scrollBehavior: 'smooth',
                },
                
                // Custom scrollbars
                '.scrollbar-thin': {
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: theme('colors.gray.800'),
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme('colors.gray.600'),
                        borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: theme('colors.gray.500'),
                    },
                },
                
                // Print utilities
                '.print-exact': {
                    colorAdjust: 'exact',
                    '-webkit-print-color-adjust': 'exact',
                },
            });
        },
    ],
    variants: {
        extend: {
            backgroundColor: ['active', 'group-hover', 'group-focus'],
            textColor: ['active', 'group-hover', 'group-focus'],
            borderColor: ['active', 'group-hover', 'group-focus'],
            boxShadow: ['active', 'group-hover', 'group-focus'],
            transform: ['active', 'group-hover', 'group-focus'],
            scale: ['active', 'group-hover', 'group-focus'],
            rotate: ['active', 'group-hover', 'group-focus'],
            translate: ['active', 'group-hover', 'group-focus'],
            skew: ['active', 'group-hover', 'group-focus'],
            opacity: ['disabled'],
            cursor: ['disabled'],
        },
    },
    corePlugins: {
        // Disable core plugins if needed
        // container: false,
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    experimental: {
        // Enable experimental features
        // optimizeUniversalDefaults: true,
    },
};

// Export configuration for use with build tools
if (typeof module !== 'undefined' && module.exports) {
    module.exports = tailwindConfig;
}

// Configure Tailwind if loaded via CDN
if (typeof tailwind !== 'undefined') {
    tailwind.config = tailwindConfig;
}
