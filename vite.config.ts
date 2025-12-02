import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');

  // 路径解析函数
  const resolvePath = (dir: string) => path.resolve(__dirname, dir);

  return {
    // 路径别名配置
    resolve: {
      alias: {
        '@': resolvePath('./src'),
      },
    },
    // 基础路径配置，可根据环境变量设置
    base: env.VITE_BASE_PATH || '/',

    plugins: [
      react(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
    ],
    css: {
      modules: {
        // 配置less module的命名规则
        generateScopedName: '[name]_[local]_[hash:base64:5]',
      },
      preprocessorOptions: {
        less: {
          // 可以在这里添加全局的less变量或配置
          javascriptEnabled: true,
        },
      },
    },

    // 服务器配置
    server: {
      port: parseInt(env.VITE_PORT || '8003'),
      host: env.VITE_HOST === 'true',
      // 已移除代理配置，直接发起请求
    },

    // 构建配置
    build: {
      // 根据环境决定是否生成sourcemap
      sourcemap: env.VITE_SOURCEMAP === 'true',

      //  chunk大小警告的限制
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        // 可以在这里添加更多rollup配置
      },
    },

    // 环境变量替换
    define: {
      // 暴露UMI_APP_前缀的环境变量
      'process.env': env,
    },
  };
});
