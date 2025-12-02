/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        secondary: '#6B7280',
        dark: '#1F2937',
        light: '#F9FAFB',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        // 自定义字体配置
        DMSans: ['DMSans', 'sans-serif'],
        KronaOne: ['KronaOne', 'sans-serif'],
        Shuzi: ['Shuzi', 'sans-serif'],
        // chinese: ['ChineseFont', 'sans-serif'],
      },
      fontSize: {
        // 基础字体大小
        tiny: '0.625rem', // 10px
        small: '0.75rem', // 12px
        regular: '1rem', // 16px (默认)
        large: '1.125rem', // 18px
        xlarge: '1.25rem', // 20px

        // 标题字体大小
        h1: '2.5rem', // 40px
        h2: '2rem', // 32px
        h3: '1.75rem', // 28px
        h4: '1.5rem', // 24px
        h5: '1.25rem', // 20px

        // 移动端优化字体大小
        'mobile-h1': '2rem', // 32px
        'mobile-h2': '1.5rem', // 24px
        'mobile-h3': '1.25rem', // 20px
      },
    },
    screens: {
      mobile: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
