# 字体文件使用说明

本目录用于存放项目中使用的 TTF 字体文件，并提供字体引入和使用的配置。

## 使用步骤

1. **添加字体文件**
   将您的 TTF 字体文件（如 `CustomFont-Regular.ttf`, `CustomFont-Bold.ttf` 等）复制到本目录下。

2. **配置字体定义**
   打开 `font.css` 文件，取消注释并修改 `@font-face` 规则，替换为您的字体文件名和字体名称。例如：
   
   ```css
   @font-face {
     font-family: 'CustomFont';
     src: url('./CustomFont-Regular.ttf') format('truetype');
     font-weight: normal;
     font-style: normal;
     font-display: swap;
   }
   
   @font-face {
     font-family: 'CustomFont';
     src: url('./CustomFont-Bold.ttf') format('truetype');
     font-weight: bold;
     font-style: normal;
     font-display: swap;
   }
   ```

3. **启用字体变量**
   在 `font.css` 文件中的 `:root` 部分，取消注释并修改字体变量定义：
   
   ```css
   :root {
     --font-family-custom: 'CustomFont', sans-serif;
     --font-family-default: var(--font-family-custom);
   }
   ```

4. **配置 Tailwind CSS**
   打开项目根目录下的 `tailwind.config.js` 文件，取消注释并修改字体配置：
   
   ```javascript
   theme: {
     extend: {
       fontFamily: {
         inter: ['Inter', 'sans-serif'],
         custom: ['CustomFont', 'sans-serif'],
       },
     },
   }
   ```

5. **在项目中使用字体**
   - 使用 CSS 类：
     ```html
     <div class="font-custom">使用自定义字体的文本</div>
     ```
   
   - 使用 CSS 变量：
     ```css
     .my-element {
       font-family: var(--font-family-custom);
     }
     ```

## 字体文件格式说明
- 本项目主要支持 TTF (TrueType Font) 格式字体
- 如果需要支持其他格式，可以在 `@font-face` 规则中添加多个 `src` 声明

## 注意事项
- 确保您有使用这些字体的合法授权
- 字体文件可能会增加项目体积，建议只包含必要的字重和样式
- 使用 `font-display: swap` 可以提高页面加载性能和用户体验

## 字体优化建议
- 对于中文字体，可以考虑使用字体子集化工具减少文件大小
- 优先使用系统预装字体作为回退选项
- 考虑使用字体加载策略，如预加载常用字体