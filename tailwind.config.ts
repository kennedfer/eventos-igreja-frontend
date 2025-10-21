import type { Config } from 'tailwindcss'

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    theme:{
        colors:{
            paia: "#f00"
        },
        extend: {
            colors: {
                link: "#ff0000"
            }
        }
    },
    plugins:[]
} satisfies Config;
