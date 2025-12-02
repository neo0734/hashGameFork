
// 声明模块
declare interface Window {
    t: (key: string) => string;
}

// 全局声明t函数
declare const t: (key: string) => string;