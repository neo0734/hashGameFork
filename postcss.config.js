export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 18, // 设计稿宽度的1/10，通常为16px
      propList: ['*'], // 需要转换的属性，*表示所有属性
      selectorBlackList: ['no-rem-'], // 不需要转换的选择器，以no-rem-开头的类名
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  },
}