// 全局类型定义
export {};

declare global {
  interface Window {
    t: (key: string) => string;
  }
}